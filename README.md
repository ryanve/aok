# [aok](https://github.com/ryanve/aok)

#### Extensible JavaScript test suite [module](https://npmjs.org/package/aok)

## API ([1.7](../../releases))

### aok(testObject)

#### <var>testObject</var> properties

- **id**: identifier or name for the test (defaults to a positive integer)
- **test**: result or callback (called in <var>testObject</var>'s scope)
- **pass**: message or callback (default: "Pass")
- **fail**: message or callback (default: "Fail")
- **handler**: defaults to `aok.prototype.handler`
- **express**: defaults to `aok.prototype.express`
- **explain**: defaults to `aok.prototype.explain`
- **run**: defaults to `aok.prototype.run`
- **cull**: defaults to `aok.prototype.cull`
- **init**: defaults to `aok.prototype.init`

#### Syntax

##### Objects

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

### Console methods

- `aok.log(message)`
- `aok.info(message)`
- `aok.warn(message)`
- `aok.error(message)`
- `aok.assert(expression, message)` <b>1.6+</b>
- `aok.trace()`
- `aok.clear()` <b>1.7+</b>

### Utilities

- `aok.can(fn)` Get a new function that uses `try`/`catch` to test if <var>fn</var> can run.
- `aok.explain(item?)` Represent <var>item</var> (or self) as a string.
- `aok.perform(trials, fn)` Test how many milliseconds it takes for <var>fn</var> to run <var>trials</var> times.
- `aok.race(trials, rivals)` Test how many milliseconds it takes each rival to run <var>trials</var> times.
- `aok.pass(stack, test, scope?, limit?)` Iterate <var>stack</var> to count <b>passes</b> until <var>limit</var>.
- `aok.fail(stack, test, scope?, limit?)` Iterate <var>stack</var> to count <b>fails</b> until `limit`.
- `aok.result(object, key|fn)` Get `object[key]` or its method's result if callable.

## License: [MIT](http://en.wikipedia.org/wiki/MIT_License)

Copyright (C) 2013 by [Ryan Van Etten](https://github.com/ryanve)