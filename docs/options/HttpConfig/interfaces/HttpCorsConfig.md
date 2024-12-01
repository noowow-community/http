[**HTTP Core Documentation v0.0.0**](../../../README.md)

***

[HTTP Core Documentation](../../../modules.md) / [options/HttpConfig](../README.md) / HttpCorsConfig

# Interface: HttpCorsConfig

## Properties

### allowedHeaders

> **allowedHeaders**: `string` \| `string`[]

The headers that are allowed in CORS requests.

#### Defined in

[options/HttpConfig.ts:29](https://github.com/stonemjs/http-core/blob/24dd4b3f1e59fc19fb65fa5316121fe4b68e4f41/src/options/HttpConfig.ts#L29)

***

### credentials

> **credentials**: `boolean`

Whether credentials are allowed in CORS requests.

#### Defined in

[options/HttpConfig.ts:21](https://github.com/stonemjs/http-core/blob/24dd4b3f1e59fc19fb65fa5316121fe4b68e4f41/src/options/HttpConfig.ts#L21)

***

### exposedHeaders

> **exposedHeaders**: `string` \| `string`[]

The headers that are exposed to the client in CORS responses.

#### Defined in

[options/HttpConfig.ts:25](https://github.com/stonemjs/http-core/blob/24dd4b3f1e59fc19fb65fa5316121fe4b68e4f41/src/options/HttpConfig.ts#L25)

***

### maxAge

> **maxAge**: `null` \| `number`

The maximum age for preflight requests.

#### Defined in

[options/HttpConfig.ts:17](https://github.com/stonemjs/http-core/blob/24dd4b3f1e59fc19fb65fa5316121fe4b68e4f41/src/options/HttpConfig.ts#L17)

***

### methods

> **methods**: `string` \| `string`[]

The allowed methods for CORS requests.

#### Defined in

[options/HttpConfig.ts:13](https://github.com/stonemjs/http-core/blob/24dd4b3f1e59fc19fb65fa5316121fe4b68e4f41/src/options/HttpConfig.ts#L13)

***

### origin

> **origin**: `string` \| `string`[]

The allowed origins for CORS requests.

#### Defined in

[options/HttpConfig.ts:9](https://github.com/stonemjs/http-core/blob/24dd4b3f1e59fc19fb65fa5316121fe4b68e4f41/src/options/HttpConfig.ts#L9)

***

### preflightStop

> **preflightStop**: `boolean`

Whether to stop processing preflight requests.

#### Defined in

[options/HttpConfig.ts:37](https://github.com/stonemjs/http-core/blob/24dd4b3f1e59fc19fb65fa5316121fe4b68e4f41/src/options/HttpConfig.ts#L37)

***

### successStatus

> **successStatus**: `number`

The HTTP status code to use for successful preflight requests.

#### Defined in

[options/HttpConfig.ts:33](https://github.com/stonemjs/http-core/blob/24dd4b3f1e59fc19fb65fa5316121fe4b68e4f41/src/options/HttpConfig.ts#L33)
