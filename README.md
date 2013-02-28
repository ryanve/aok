[aok](https://github.com/ryanve/aok)
===

## api

### `aok(testObject)`

#### `testObject` properties

- **id**: identifier or name for the test
- **test**: boolean or function to be called in scope of `testObj`
- **pass**: message (default: "Pass")
- **fail**: message (default: "Fail")
- **handler**: defaults to [`aok.prototype.handler`](https://github.com/ryanve/aok/blob/master/aok.js)
- **run**: defaults to [`aok.prototype.run`](https://github.com/ryanve/aok/blob/master/aok.js)

#### simple example

```js
aok({
    id: 'example'
  , test: function() {
        return 'example' === this.id;
    }
});
```

### console methods

```js
aok.log(message)
aok.info(message)
aok.warn(message)
aok.error(message)
aok.trace();
```

## license

### [aok](http://github.com/ryanve/aok) is available under the [MIT license](http://en.wikipedia.org/wiki/MIT_License)

Copyright (C) 2013 by [Ryan Van Etten](https://github.com/ryanve)