[**HTTP Core Documentation v0.0.34**](../../../README.md)

***

[HTTP Core Documentation](../../../modules.md) / [options/HttpConfig](../README.md) / HttpCorsConfig

# Interface: HttpCorsConfig

Defined in: [src/options/HttpConfig.ts:8](https://github.com/stonemjs/http-core/blob/424f80742be298e137f118c0e2e80266a8a78f3c/src/options/HttpConfig.ts#L8)

## Properties

### allowedHeaders

> **allowedHeaders**: `string` \| `string`[]

Defined in: [src/options/HttpConfig.ts:32](https://github.com/stonemjs/http-core/blob/424f80742be298e137f118c0e2e80266a8a78f3c/src/options/HttpConfig.ts#L32)

The headers that are allowed in CORS requests.

***

### credentials

> **credentials**: `boolean`

Defined in: [src/options/HttpConfig.ts:24](https://github.com/stonemjs/http-core/blob/424f80742be298e137f118c0e2e80266a8a78f3c/src/options/HttpConfig.ts#L24)

Whether credentials are allowed in CORS requests.

***

### exposedHeaders

> **exposedHeaders**: `string` \| `string`[]

Defined in: [src/options/HttpConfig.ts:28](https://github.com/stonemjs/http-core/blob/424f80742be298e137f118c0e2e80266a8a78f3c/src/options/HttpConfig.ts#L28)

The headers that are exposed to the client in CORS responses.

***

### maxAge

> **maxAge**: `null` \| `number`

Defined in: [src/options/HttpConfig.ts:20](https://github.com/stonemjs/http-core/blob/424f80742be298e137f118c0e2e80266a8a78f3c/src/options/HttpConfig.ts#L20)

The maximum age for preflight requests.

***

### methods

> **methods**: `string` \| `string`[]

Defined in: [src/options/HttpConfig.ts:16](https://github.com/stonemjs/http-core/blob/424f80742be298e137f118c0e2e80266a8a78f3c/src/options/HttpConfig.ts#L16)

The allowed methods for CORS requests.

***

### origin

> **origin**: `string` \| `string`[]

Defined in: [src/options/HttpConfig.ts:12](https://github.com/stonemjs/http-core/blob/424f80742be298e137f118c0e2e80266a8a78f3c/src/options/HttpConfig.ts#L12)

The allowed origins for CORS requests.

***

### preflightStop

> **preflightStop**: `boolean`

Defined in: [src/options/HttpConfig.ts:40](https://github.com/stonemjs/http-core/blob/424f80742be298e137f118c0e2e80266a8a78f3c/src/options/HttpConfig.ts#L40)

Whether to stop processing preflight requests.

***

### successStatus

> **successStatus**: `number`

Defined in: [src/options/HttpConfig.ts:36](https://github.com/stonemjs/http-core/blob/424f80742be298e137f118c0e2e80266a8a78f3c/src/options/HttpConfig.ts#L36)

The HTTP status code to use for successful preflight requests.
