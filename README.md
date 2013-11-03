# [aok](https://github.com/ryanve/aok)

#### Extensible JavaScript test suite [module](https://npmjs.org/package/aok)

## API ([1.7](../../releases))

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

##### Shorthand

###### Non-objects become the `.test`

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
- `aok.assert(expression, message)` <b>1.6+</b>
- `aok.trace()`
- `aok.clear()` <b>1.7+</b>

### utilities

- `aok.can(fn)` Get a new function that uses `try`/`catch` to test if `fn` can run.
- `aok.pass(stack, test, scope?, limit?)` Iterate `stack` to count <b>passes</b> until `limit`.
- `aok.fail(stack, test, scope?, limit?)` Iterate `stack` to count <b>fails</b> until `limit`.
- `aok.race(trials, rivals)` Test how long it takes each rival to run `trials` times.
- `aok.perform(trials, fn)` Test how long it takes for `fn` to run `trials` times.
- `aok.explain(item?)` Represent `item` (or `this`) as a string.
- `aok.result(object, key|fn)` Call `object[key]` or `fn.call(object)` if callable.

## License: [MIT](http://en.wikipedia.org/wiki/MIT_License)

Copyright (C) 2013 by [Ryan Van Etten](https://github.com/ryanve)