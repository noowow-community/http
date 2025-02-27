[**HTTP Core Documentation v0.0.34**](../../../README.md)

***

[HTTP Core Documentation](../../../modules.md) / [decorators/JsonpHttpResponse](../README.md) / JsonpHttpResponse

# Function: JsonpHttpResponse()

> **JsonpHttpResponse**\<`T`\>(`statusCode`, `headers`): `MethodDecorator`

Defined in: [src/decorators/JsonpHttpResponse.ts:26](https://github.com/stonemjs/http-core/blob/424f80742be298e137f118c0e2e80266a8a78f3c/src/decorators/JsonpHttpResponse.ts#L26)

Decorator to mark a class method as a JsonP outgoing http response.

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
import { JsonpHttpResponse } from '@stone-js/http-core';

class UserController {
  @JsonpHttpResponse()
  getUsers() {
    return { name: 'John Doe' };
  }
}
```
