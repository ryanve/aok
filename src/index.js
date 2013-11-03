(function(root, name, make) {
    typeof module != 'undefined' && module['exports'] ? module['exports'] = make() : root[name] = make();
}(this, 'aok', function() {

    var implement
      , globe = this
      , plain = {}
      , owns = plain.hasOwnProperty
      , toString = plain.toString
      , win = typeof window != 'undefined' && window
      , doc = typeof document != 'undefined' && document
      , nativeConsole = typeof console != 'undefined' && console
      , hasAlert = win && 'alert' in win
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
     * @param {*=} data
     */
    function Aok(data) {
        // Own 'test' unless instantiated w/o args,
        // or unless `data` is 'object' w/o 'test'.
        // Running proceeds only if 'test' is owned.
        if (typeof data == 'object' && data) assign(this, data);
        else if (arguments.length) this['test'] = data;
        this['init']();
    }

    /**
     * @param {*=} data
     * @return {Aok}
     */
    function aok(data) {
        return arguments.length ? new Aok(data) : new Aok; 
    }
    
    // Sync the prototypes and alias to local.
    implement = aok.prototype = Aok.prototype;
    
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
        abstracts('assert', 1, function(exp, msg) {
            exp || abstracted['warn'](msg);
        });
        return abstracted;
    }({}, nativeConsole, hasAlert, win)));
    
    // Alias the "express" method to the prototype for usage with tests.
    implement['express'] = aok['express'] = clone(aok['log']);
    
    // Default messages
    implement['pass'] = 'Pass';
    implement['fail'] = 'Fail';
    
    /**
     * @param {*=} item
     * @return {string}
     */
    implement['explain'] = aok['explain'] = function(item) {
        item = arguments.length ? item : this;
        return item === Object(item) ? toString.call(item) : '' + item;
    };
    
    /**
     * @param {*} o
     * @param {(string|number|Function)=} k
     * @param {Object=} guard array methods
     * @example result([1], 0) // 1
     */
    function result(o, k, guard) {
        guard || k === guard ? (k = o, o = this) : (typeof k == 'function' ? k : k = o[k]);
        return typeof k == 'function' ? k.call(o) : k;
    }
    aok['result'] = result;

    /**
     * Get a new function that uses try/catch to test if `fn` can run.
     * @param {Function|string} fn callback or key
     * @return {Function}
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
     * @this {Aok|Object}
     * @return {Aok|Object}
     */
    implement['init'] = function() {
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
    implement['run'] = function() {
        if (this === globe) throw new Error('@this');
        this['test'] = !!result(this, 'test');
        return this['handler']();
    };
    
    /**
     * @this {Aok|Object}
     * @param {(string|number)=} key
     */
    implement['cull'] = function(key) {
        return this[this[null == key ? 'test' : key] ? 'pass' : 'fail'];
    };

    /**
     * default handler can be overridden
     * @return {Aok}
     */
    implement['handler'] = function() {
        var msg = this['cull']();
        if (typeof msg == 'function') msg.call(this);
        else this['express']('#' + this['id'] + ': ' + this['explain'](msg));
        return this;
    };
    
    /**
     * @param {string} n   
     * @return {Node|boolean}
     */
    aok['id'] = function(n) {
        return doc.getElementById(n) || false;
    };

    return aok;
}));