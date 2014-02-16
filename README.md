# [aok](../../)

#### Extensible JavaScript test suite [module](https://npmjs.org/package/aok)

- [<b>API</b>](#api)
- [<b>grunt aok</b>](#grunt-aok)
- [<b>Resources</b>](#resources)
- [<b>Developers</b>](#developers)
- [<b>Fund</b>](#fund)
- [<b>License</b>](#license)

<a name="api"></a>
## API ([1.8](../../releases))

- [<b>aok(</b><b>)</b>](#aok-function)
- [<b>Console methods</b>](#console-methods)
- [<b>Utilities</b>](#utilities)

<a name="aok-function"></a>
### aok() &rarr; `aok` instance
#### Syntaxes

- [`aok(object)`](#verbose-syntax)
- [`aok(test)`](#anonymous-syntax)
- [`aok(id, test)`](#pair-syntax)
- [`aok()`](#idle-syntax)

#### Properties
- **id**: identifier or name for the test (defaults to a positive integer)
- **test**: result or callback (called in the instance's scope)
- **pass**: message or callback (default: "Pass")
- **fail**: message or callback (default: "Fail")
- **handler**: defaults to `aok.prototype.handler`
- **express**: defaults to `aok.prototype.express`
- **explain**: defaults to `aok.prototype.explain`
- **run**: defaults to `aok.prototype.run`
- **cull**: defaults to `aok.prototype.cull`
- **init**: defaults to `aok.prototype.init`

#### Verbose syntax
##### `aok(object)`

```js
aok({
  id: 'example',
  test: function() {
    return 'example' === this.id;
  }
});
```

#### Anonymous syntax
##### `aok(test)` for non-object tests

```js
aok(true);
aok(aok instanceof aok);
aok(function() {
  return isFinite(this.id);
});
```

#### Pair syntax
##### `aok(id, test)` [1.8+](../../issues/1)

```js
aok('example', true);
aok('example', function() {
  return true;
});
```

#### Idle syntax
##### Calling `aok()` without arguments creates an idle instance that can manually be run later.

```js
var o = aok();
o.test = true;
o.run();
```

### Console methods
#### uses [native `console`](https://developers.google.com/chrome-developer-tools/docs/console-api) where available

- `aok.log(message)`
- `aok.info(message)`
- `aok.warn(message)`
- `aok.error(message)`
- `aok.assert(expression, message)` <b>1.6+</b>
- `aok.trace()`
- `aok.clear()` <b>1.7+</b>

### Utilities

#### aok.can(fn)
- Get a new function that uses `try`/`catch` to test if <var>fn</var> can run.
- &rArr; Function (&rArr; boolean)

#### aok.pass(stack, fn, scope?, limit?)
- Iterate <b>stack</b> to count <b>passes</b> until <b>limit</b>. ([example](../../commit/5e9273f34bc113bd540534a137fce1302bdb4db4#commitcomment-4498304))
- &rArr; number

#### aok.fail(stack, fn, scope?, limit?) 
- Iterate <var>stack</var> to count <b>fails</b> until <var>limit</var>. ([example](../../commit/5e9273f34bc113bd540534a137fce1302bdb4db4#commitcomment-4498304))
- &rArr; number

#### aok.perform(trials, fn)
- Test how many milliseconds it takes <var>fn</var> to run <var>trials</var> times.
- &rArr; number

#### aok.race(trials, rivals)
- Test how many milliseconds it takes each rival to run <var>trials</var> times.
- &rArr; Array

#### aok.result(object, key|fn)
- Get `object[key]` or its method's result if callable.
- &rArr; *

#### aok.explain(item?)
- Represent <var>item</var> (or self) as a string.
- &rArr; string

***

## grunt aok
#### aok 1.5+ includes a simple grunt [task](./tasks) for running tests via [grunt](http://gruntjs.com/)
##### Configure files to [require](http://nodejs.org/api/globals.html#globals_require)

```js
grunt.initConfig({
  aok: {
    test: ['./test/'],
    extras: ['./test/extras'] 
  }
});
```

##### Load task `'aok'`
```js
grunt.loadNpmTasks('aok');
```

##### Run `'aok'` tasks

```sh
$ grunt aok
$ grunt aok:test
$ grunt aok:extras
```
## Resources
- See a [<b>universal</b> GruntFile](https://github.com/ryanve/universal/blob/master/GruntFile.js) and [test dir](https://github.com/ryanve/universal/tree/master/test) for a solid setup
- See test dirs in [<b>ryanve</b> packages](https://npmjs.org/~ryanve) for examples

## Developers
#### <b>Contribute</b> edits to [`/src`](./src) or report [issues](../../issues)

```sh
$ npm install       # install dependencies
$ grunt jshint:sub  # lint sub dirs
$ grunt aok         # run tests
```

Builds have <b>+</b>timestamp in the [version](http://semver.org/) number and are made later via `grunt`.

## Fund

<b>[Tip the developer](https://www.gittip.com/ryanve/)</b> =)

## License

[MIT](package.json)