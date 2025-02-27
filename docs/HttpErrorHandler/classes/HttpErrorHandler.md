[**HTTP Core Documentation v0.0.34**](../../README.md)

***

[HTTP Core Documentation](../../modules.md) / [HttpErrorHandler](../README.md) / HttpErrorHandler

# Class: HttpErrorHandler

Defined in: [src/HttpErrorHandler.ts:17](https://github.com/stonemjs/http-core/blob/424f80742be298e137f118c0e2e80266a8a78f3c/src/HttpErrorHandler.ts#L17)

Class representing an HttpErrorHandler.

## Implements

- `IErrorHandler`\<[`IncomingHttpEvent`](../../IncomingHttpEvent/classes/IncomingHttpEvent.md), [`OutgoingHttpResponse`](../../OutgoingHttpResponse/classes/OutgoingHttpResponse.md)\>

## Constructors

### new HttpErrorHandler()

> **new HttpErrorHandler**(`options`): [`HttpErrorHandler`](HttpErrorHandler.md)

Defined in: [src/HttpErrorHandler.ts:25](https://github.com/stonemjs/http-core/blob/424f80742be298e137f118c0e2e80266a8a78f3c/src/HttpErrorHandler.ts#L25)

Create an HttpErrorHandler.

#### Parameters

##### options

[`HttpErrorHandlerOptions`](../interfaces/HttpErrorHandlerOptions.md)

HttpErrorHandler options.

#### Returns

[`HttpErrorHandler`](HttpErrorHandler.md)

## Methods

### handle()

> **handle**(`error`, `_event`): [`OutgoingHttpResponse`](../../OutgoingHttpResponse/classes/OutgoingHttpResponse.md)

Defined in: [src/HttpErrorHandler.ts:40](https://github.com/stonemjs/http-core/blob/424f80742be298e137f118c0e2e80266a8a78f3c/src/HttpErrorHandler.ts#L40)

Handle an error.

#### Parameters

##### error

`Error`

The error to handle.

##### \_event

[`IncomingHttpEvent`](../../IncomingHttpEvent/classes/IncomingHttpEvent.md)

The incoming http event.

#### Returns

[`OutgoingHttpResponse`](../../OutgoingHttpResponse/classes/OutgoingHttpResponse.md)

The outgoing http response.

#### Implementation of

`IErrorHandler.handle`
