[**HTTP Core Documentation v0.0.34**](../../../README.md)

***

[HTTP Core Documentation](../../../modules.md) / [decorators/RedirectHttpResponse](../README.md) / RedirectHttpResponse

# Function: RedirectHttpResponse()

> **RedirectHttpResponse**\<`T`\>(`statusCode`, `headers`): `MethodDecorator`

Defined in: [src/decorators/RedirectHttpResponse.ts:26](https://github.com/stonemjs/http-core/blob/424f80742be298e137f118c0e2e80266a8a78f3c/src/decorators/RedirectHttpResponse.ts#L26)

Decorator to mark a class method as a redirect outgoing http response.

## Type Parameters

• **T** *extends* `Function` = `Function`

## Parameters

### statusCode

`number` = `HTTP_OK`

The status code of the response.

### headers

[`HeadersType`](../../../declarations/type-aliases/HeadersType.md) = `{}`

The headers for the response.

## Returns

`MethodDecorator`

A method decorator.

## Example

```typescript
import { RedirectHttpResponse } from '@stone-js/http-core';

class UserController {
  @RedirectHttpResponse()
  getUsers() {
    return new URL('https://www.google.com');
  }
}
```
