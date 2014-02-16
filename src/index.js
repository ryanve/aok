(function(root, name, make) {
  if (typeof module != 'undefined' && module['exports']) module['exports'] = make();
  else root[name] = make();
}(this, 'aok', function() {

  // Sync the prototype and use local alias
  var model = aok.prototype = Aok.prototype
    , globe = this
    , plain = {}
    , owns = plain.hasOwnProperty
    , toString = plain.toString
    , win = typeof window != 'undefined' && window
    , nativeConsole = typeof console != 'undefined' && console
    , hasAlert = win && 'alert' in win
    , performance = win['performance']
    , uid = 0
    , has = function(o, k) {
        return owns.call(o, k);
      }
    , assign = function(to, from) {
        for (var k in from) has(from, k) && (to[k] = from[k]);
        return to;
      }
    , clone = function(fn) {
        return assign(function() {
          fn.apply(this, arguments);
        }, fn);
      };
    
  /**
   * @constructor
   * (), (test), (id, test), (data), or (data, test)
   * @param {*=} data
   * @param {*=} test
   */
  function Aok(data, test) {
    // Own 'test' unless called w/o args or unless `data` is 'object' w/o 'test'
    // Running proceeds only if `this` owns 'test'
    var n = arguments.length;
    if (2 == n) this['test'] = test;
    if (typeof data == 'object' && data) assign(this, data);
    else if (n) this[2 == n ? 'id' : 'test'] = data;
  }

  /**
   * (), (test), (id, test), (data), or (data, test)
   * @return {Aok}
   */
  function aok() {
    var o = new Aok;
    Aok.apply(o, arguments);
    o['init']();
    return o;
  }
  
  // Console abstractions
  assign(aok, aok['console'] = (function(abstracted, console, hasAlert, win) {
    function abstracts(name, force, fallback) {
      var method = console && typeof console[name] == 'function' ? function() {
        console[name].apply(console, arguments);
      } : fallback ? fallback : hasAlert ? function() {
        method['force'] && win.alert(name + ': ' + [].join.call(arguments, ' '));
      } : function() {};
      method['force'] = !!force;
      abstracted[name] = method;
    }

    abstracts('log');
    abstracts('trace');
    abstracts('info', 1);
    abstracts('warn', 1);
    abstracts('error', 1);
    abstracts('clear', 0, function() {});
    abstracts('assert', 1, function(exp, msg) {
      exp || abstracted['warn'](msg);
    });
    return abstracted;
  }({}, nativeConsole, hasAlert, win)));
  
  // Alias the "express" method to the prototype for usage with tests.
  model['express'] = aok['express'] = clone(aok['log']);
  
  // Default messages
  model['pass'] = 'Pass';
  model['fail'] = 'Fail';

  /**
   * @this {Aok|Object}
   * @return {Aok|Object}
   */
  model['init'] = function() {
    if (this === globe) throw new Error('@this');
    has(this, 'id') || (this['id'] = ++uid);
    has(this, 'test') && this['run']();
    return this;
  };
  
  /**
   * Run test and trigger its handler.
   * @this {Aok|Object}
   * @return {Aok|Object}
   */
  model['run'] = function() {
    if (this === globe) throw new Error('@this');
    this['test'] = !!aok['result'](this, 'test');
    return this['handler']();
  };
  
  /**
   * @this {Aok|Object}
   * @param {(string|number)=} key
   */
  model['cull'] = function(key) {
    return this[this[null == key ? 'test' : key] ? 'pass' : 'fail'];
  };

  /**
   * default handler can be overridden
   * @return {Aok}
   */
  model['handler'] = function() {
    var msg = this['cull']();
    if (typeof msg == 'function') msg.call(this);
    else this['express']('#' + this['id'] + ': ' + this['explain'](msg));
    return this;
  };
  
  /**
   * @param {*=} item
   * @return {string}
   */
  model['explain'] = aok['explain'] = function(item) {
    item = arguments.length ? item : this;
    return item === Object(item) ? toString.call(item) : '' + item;
  };
  
  /**
   * @param {*} o
   * @param {(string|number|Function)=} k
   * @param {Object=} guard array methods
   * @example result([1], 0) // 1
   */
  aok['result'] = function(o, k, guard) {
    guard || k === guard ? (k = o, o = this) : (typeof k == 'function' ? k : k = o[k]);
    return typeof k == 'function' ? k.call(o) : k;
  };
  
  /**
   * @param {{length:number}} stack
   * @param {Function|number} fn
   * @param {*=} scope
   * @param {number=} limit
   * @return {number} passes
   */
  aok['pass'] = function(stack, fn, scope, limit) {
    if (typeof fn == 'number') return stack ? 1 : 0;
    var l = stack.length, i = 0, n = 0;
    while (i < l) if (fn.call(scope, stack[i], i++, stack) && ++n === limit) break;
    return n;
  };
  
  /**
   * @param {{length:number}} stack
   * @param {Function|number} fn
   * @param {*=} scope
   * @param {number=} limit
   * @return {number} fails
   */
  aok['fail'] = function(stack, fn, scope, limit) {
    if (typeof fn == 'number') return stack ? 0 : 1;
    var l = stack.length, i = 0, n = 0;
    while (i < l) if (!fn.call(scope, stack[i], i++, stack) && ++n === limit) break;
    return n;
  };
  
  /**
   * @this {*} scope to run in
   * @param {number} trials
   * @param {Function} fn
   * @return {number} millisecond time for `fn` to run `trials` times
   */
  function perform(trials, fn) {
    var i = 0, precise = perform['precise'], time = precise ? performance.now() : +new Date;
    while (i++ < trials) fn.call(this);
    return (precise ? performance.now() : +new Date)-time;
  }
  perform['precise'] = !!performance && 'now' in performance;
  aok['perform'] = perform;
  
  /**
   * @this {*} scope to run in
   * @param {number} trials
   * @param {Array|Function} rivals
   * @return {Array} millisecond map of each `rivals` item's time
   */
  aok['race'] = function(trials, rivals) {
    rivals = [].concat(rivals); // map
    for (var go = aok['perform'], l = rivals.length, i = 0; i < l;)
      rivals[i] = go.call(this, trials, rivals[i++]);
    return rivals; // scores
  };

  /**
   * @param {Function|string} fn callback or key
   * @return {Function} uses try/catch to test if `fn` can run
   */
  aok['can'] = function(fn) {
    return function() {
      try {
        (typeof fn == 'string' ? this[fn] : fn).apply(this, arguments);
      } catch (e) { return false; }
      return true;
    };
  };
  
  /**
   * @param {string} n   
   * @return {Node|boolean}
   */
  aok['id'] = function(n) {
    return document.getElementById(n) || false;
  };

  return aok;
}));