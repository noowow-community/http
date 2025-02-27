[**HTTP Core Documentation v0.0.34**](../../README.md)

***

[HTTP Core Documentation](../../modules.md) / [HttpResponse](../README.md) / fileHttpResponse

# Function: fileHttpResponse()

> **fileHttpResponse**(`file`, `statusCode`, `headers`, `contentDispositionType`, `autoEtag`, `autoLastModified`): [`BinaryFileResponse`](../../BinaryFileResponse/classes/BinaryFileResponse.md)

Defined in: [src/HttpResponse.ts:177](https://github.com/stonemjs/http-core/blob/424f80742be298e137f118c0e2e80266a8a78f3c/src/HttpResponse.ts#L177)

Create a 200(OK) file OutgoingHttpResponse.

## Parameters

### file

The file to send as the response.

`string` | [`File`](../../file/File/classes/File.md)

### statusCode

`number` = `HTTP_OK`

The status code of the response.

### headers

[`HeadersType`](../../declarations/type-aliases/HeadersType.md) = `{}`

The headers for the response.

### contentDispositionType

The content disposition type (e.g., "inline" or "attachment").

`null` | `string`

### autoEtag

`boolean` = `false`

Whether to automatically generate an ETag.

### autoLastModified

`boolean` = `true`

Whether to automatically set the Last-Modified header.

## Returns

[`BinaryFileResponse`](../../BinaryFileResponse/classes/BinaryFileResponse.md)

A new instance of BinaryFileResponse.
