# [aok](https://github.com/ryanve/aok)

#### Extensible JavaScript test suite [module](https://npmjs.org/package/aok)

## API ([1.6](../../releases))

### `aok(testObject)`

#### `testObject` properties

- **id**: identifier or name for the test (defaults to a positive integer)
- **test**: result or callback (called in `testObject`'s scope)
- **pass**: message or callback (default: "Pass")
- **fail**: message or callback (default: "Fail")
- **handler**: defaults to `aok.prototype.handler`
- **express**: defaults to `aok.prototype.express`
- **explain**: defaults to `aok.prototype.explain`
- **run**: defaults to `aok.prototype.run`
- **cull**: defaults to `aok.prototype.cull`
- **init**: defaults to `aok.prototype.init`

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
- `aok.assert(expression, message)` @since [1.6.0](../../releases/tag/1.6.0)
- `aok.trace()`

### utilities

- `aok.can(fn)` Get a new function that uses `try`/`catch` to test if `fn` can run.
- `aok.explain(item?)` Represent `item` (or `this`) as a string.
- `aok.result(object, key|fn)` Call `fn.call(object)` or `object[key]` if callable.

## [MIT License](http://en.wikipedia.org/wiki/MIT_License)

Copyright (C) 2013 by [Ryan Van Etten](https://github.com/ryanve)