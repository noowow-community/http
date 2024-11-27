import send from 'send'
import bytes from 'bytes'
import Busboy from 'busboy'
import typeIs from 'type-is'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import onFinished from 'on-finished'
import contentType from 'content-type'
import { randomUUID } from 'node:crypto'
import ipRangeCheck from 'ip-range-check'
import { createWriteStream } from 'node:fs'
import { HttpError } from './errors/HttpError'
import { UploadedFile } from './file/UploadedFile'
import { IncomingMessage, OutgoingMessage } from 'http'
import { IncomingHttpHeaders } from 'node:http'
import { File } from './file/File'

/**
 * Check if multipart message.
 *
 * @param value - The incoming message or content type string.
 * @returns True if the content type is multipart.
 */
export function isMultipart (value: IncomingMessage | string): boolean {
  return typeof value === 'string'
    ? typeIs.is(value, ['multipart']) === 'multipart'
    : typeIs(value, ['multipart']) === 'multipart'
}

/**
 * Get message content type.
 *
 * @param value - The incoming message or content type string.
 * @param fallback - Fallback content type if parsing fails.
 * @returns The content type of the message.
 */
export function getType (value: IncomingMessage | string, fallback: string = 'text/plain'): string {
  try {
    return contentType.parse(value).type
  } catch (_) {
    return fallback
  }
}

/**
 * Get message content charset.
 *
 * @param value - The incoming message or content type string.
 * @param fallback - Fallback charset if parsing fails.
 * @returns The charset of the message.
 */
export function getCharset (value: IncomingMessage | string, fallback: string = 'utf-8'): string {
  try {
    return contentType.parse(value).parameters.charset
  } catch (_) {
    return fallback
  }
}

/**
 * Check if IP is trusted or not.
 *
 * @param trusted - Array of trusted IPs or wildcard.
 * @param untrusted - Array of untrusted IPs or wildcard.
 * @returns A function to verify if a given IP is trusted.
 */
export function isIpTrusted (trusted: string | string[], untrusted: string | string[] = []): (ip: string) => boolean {
  return (ip: string): boolean => {
    if (untrusted.includes('*') || ipRangeCheck(ip, untrusted)) {
      return false
    }

    return trusted.includes('*') || ipRangeCheck(ip, trusted)
  }
}

/**
 * Get protocol.
 *
 * @param ip - The IP address of the request.
 * @param headers - The headers from the incoming request.
 * @param encrypted - Whether the connection is encrypted (HTTPS).
 * @param options - Options for trusted and untrusted IPs.
 * @returns The protocol (http or https).
 */
export function getProtocol (ip: string, headers: Record<string, string>, encrypted: boolean, { trustedIp, untrustedIp }: { trustedIp: string[], untrustedIp: string[] }): string {
  let protocol = encrypted ? 'https' : 'http'

  if (isIpTrusted(trustedIp, untrustedIp)(ip)) {
    protocol = (headers['X-Forwarded-Proto'] ?? headers['x-forwarded-proto'] ?? '').split(',').shift()?.trim() || protocol
  }

  return protocol
}

/**
 * Get hostname.
 *
 * @param ip - The IP address of the request.
 * @param headers - The headers from the incoming request.
 * @param options - Options for trusted IPs, fallback, etc.
 * @returns The hostname from the request.
 */
export function getHostname (ip: string, headers: Record<string, string>, { trusted, trustedIp, untrustedIp }: { trusted: Array<string | RegExp>, trustedIp: string[], untrustedIp: string[] }): string {
  let hostname = headers.host ?? headers.Host

  if (isIpTrusted(trustedIp, untrustedIp)(ip)) {
    hostname = (headers['X-Forwarded-Host'] ?? headers['x-forwarded-host'] ?? '').split(',').shift() || hostname
  }

  if (hostname === undefined) return hostname

  const match = hostname.match(/\[([0-9a-fA-F:]+)\]/) ?? undefined

  if (match !== undefined) {
    hostname = `[${match[1]}]`
  } else {
    hostname = hostname.trim().replace(/:\d+$/, '').toLowerCase()
  }

  if (!/^[[]?(?![0-9]+$)(?!-)(?:[a-zA-Z0-9-:\]]{1,63}\.?)+$/.test(hostname)) {
    throwSuspiciousOperationError('Invalid Host', ip, hostname)
  }

  if (trusted?.length > 0) {
    const isValid = trusted.some((pattern) => (pattern instanceof RegExp && pattern.test(hostname)) || pattern === hostname)

    if (!isValid) {
      throwSuspiciousOperationError('Untrusted Host', ip, hostname)
    }
  }

  return hostname
}

/**
 * Get file uploads.
 *
 * Get streamed or pre-read(not streamed) file upload.
 *
 * @param event - The incoming event containing the file data.
 * @param options - The options for file upload limits.
 * @returns A promise that resolves with the uploaded files and fields.
 */
export async function getFilesUploads (
  event: IncomingMessage | { headers: IncomingHttpHeaders, body: unknown },
  options: Record<string, any>
): Promise<{ files: Record<string, UploadedFile[]>, fields: Record<string, string> }> {
  return await new Promise((resolve, reject) => {
    options.limits ??= {}
    options.limits.fileSize = bytes.parse(options.limits.fileSize) ?? Infinity
    options.limits.fieldSize = bytes.parse(options.limits.fieldSize) ?? Infinity
    options.limits.fieldNameSize = bytes.parse(options.limits.fieldNameSize) ?? Infinity

    const busboy = Busboy({ headers: event.headers, ...options })
    const result: { files: Record<string, UploadedFile[]>, fields: Record<string, string> } = { files: {}, fields: {} }

    busboy
      .on('close', () => resolve(result))
      .on('error', (error: any) => reject(getHttpError(500, 'Cannot upload files.', error.message, `HTTP_FILE-${error.code}`, error)))
      .on('field', (fieldname, value) => {
        result.fields[fieldname] = value
      })
      .on('file', (fieldname, file, info) => {
        result.files[fieldname] ??= []
        const { filename, mimeType } = info
        const filepath = join(tmpdir(), `${options.prefix ?? 'file'}-${randomUUID()}`)
        const writeStream = createWriteStream(filepath)

        file.on('close', () => {
          result.files[fieldname].push(UploadedFile.createFile(filepath, filename, mimeType))
        })

        writeStream.on('error', (error: any) => {
          reject(getHttpError(500, 'Error writing file.', error.message, `HTTP_FILE-${error.code}`, error))
        })

        file.pipe(writeStream)
      })

    if (event instanceof IncomingMessage) { // Handle streamed file uploads.
      event.pipe(busboy)
      event.on('error', (error: any) => {
        reject(getHttpError(500, 'Incoming message error.', error.message, `HTTP_MSG-${error.code}`, error))
      })
    } else { // Handle pre-read file uploads.
      busboy.write(event.body)
      busboy.end()
    }
  })
}

/**
 * Stream files from the file system as an HTTP response.
 *
 * Only for node http server.
 *
 * @param message - The incoming message.
 * @param response - The outgoing response.
 * @param fileResponse - The binary file response to be streamed.
 * @param options - The options for streaming.
 * @returns A promise that resolves when the file streaming is complete.
 */
export async function streamFile (
  message: IncomingMessage,
  response: OutgoingMessage,
  fileResponse: File,
  options: send.SendOptions & { headers: Record<string, string> }
): Promise<void> {
  return await new Promise((resolve, reject) => {
    let streaming = false
    const file = send(message, fileResponse.getEncodedPath(), options)
    const onaborted = () => reject(getHttpError(400, 'Request aborted.', 'Request aborted.', 'HTTP_FILE-ECONNABORTED'))

    onFinished(response, (error: any) => {
      if (error !== undefined) {
        if (error.code === 'ECONNRESET') return onaborted()
        return reject(getHttpError(500, 'An unexpected error has occurred.', error.message, `HTTP_FILE-${error.code}`, error))
      }

      setImmediate(() => { streaming ? onaborted() : resolve() })
    })

    file
      .on('error', (error) => reject(getHttpError(500, 'An unexpected error has occurred.', error.message, `HTTP_FILE-${error.code}`, error)))
      .on('directory', () => reject(getHttpError(404, 'This file cannot be found.', 'EISDIR, read', 'HTTP_FILE-EISDIR')))
      .on('headers', (resp) => Object.entries(options.headers).forEach(([key, value]) => resp.setHeader(key, value)))
      .on('stream', () => { streaming = true })
      .on('file', () => { streaming = false })
      .on('end', () => resolve())
      .pipe(response)
  })
}

/**
 * Throw Suspicious Operation Error.
 *
 * @param message - The error message.
 * @param ip - The IP address involved.
 * @param host - The hostname involved.
 * @throws HttpError with appropriate details.
 */
export function throwSuspiciousOperationError (message: string, ip: string, host: string): void {
  throw getHttpError(400, `${message} ${host}`, `SuspiciousOperation: ${message} ${host} with ip(${ip})`)
}

/**
 * Return HttpError instance.
 *
 * @param statusCode - The HTTP status code.
 * @param body - The response body.
 * @param message - The error message.
 * @param code - A custom error code.
 * @param cause - Optional cause of the error.
 * @returns An instance of HttpError.
 */
export function getHttpError (statusCode: number, body: string, message: string, code?: string, cause?: Error): HttpError {
  return new HttpError(message, { statusCode, body, code, cause })
}
