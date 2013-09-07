[aok](https://github.com/ryanve/aok)
===

## api

### `aok(testObject)`

#### `testObject` properties

- **id**: identifier or name for the test (defaults to a positive integer)
- **test**: result or callback (called in `testObject`'s scope)
- **pass**: message or callback (default: "Pass")
- **fail**: message or callback (default: "Fail")
- **handler**: defaults to [`aok.prototype.handler`](./aok.js)
- **express**: defaults to [`aok.prototype.express`](./aok.js)
- **run**: defaults to [`aok.prototype.run`](./aok.js)
- **cull**: defaults to [`aok.prototype.cull`](./aok.js)
- **init**: defaults to [`aok.prototype.init`](./aok.js)

#### syntax

```js
aok({
    id: 'example'
  , test: function() {
        return 'example' === this.id;
    }
});
```

#### shorthand

If `testObject` is a non-object, then its value becomes the `.test`:

```js
aok(typeof aok == 'function');
aok(aok instanceof aok);
aok(function() {
    return isFinite(this.id);
});
```

### console methods

- `aok.log(message)`
- `aok.info(message)`
- `aok.warn(message)`
- `aok.error(message)`
- `aok.trace()`

### utilities

- `aok.can(fn)` Get a new function that uses `try`/`catch` to test if `fn` can run.
- `aok.explain(item)` - Represent `item` as a string.
- `aok.result(object, key)` or `aok.result.call(scope, item)` - Call `item` if it is a function.

## license

### [aok](http://github.com/ryanve/aok) is available under the [MIT license](http://en.wikipedia.org/wiki/MIT_License)

Copyright (C) 2013 by [Ryan Van Etten](https://github.com/ryanve)