/*!
 * aok 1.2.1+201309051739
 * https://github.com/ryanve/aok
 * MIT License 2013 Ryan Van Etten
 */

(function(root, name, make) {
    typeof module != 'undefined' && module['exports'] ? module['exports'] = make() : root[name] = make();
}(this, 'aok', function() {

    var globe = (function() { return this; }())
      , plain = {}
      , owns = plain.hasOwnProperty
      , toString = plain.toString
      , nativeConsole = typeof console != 'undefined' && console
      , nativeAlert = typeof alert == 'function' && alert
      , doc = typeof document != 'undefined' && document
      , uid = 0;
      
    /**
     * @constructor 
     * @param  {*=}  data
     */
    function Aok(data) {
        // Own 'test' unless instantiated w/o args,
        // or unless `data` is 'object' w/o 'test'.
        // Running proceeds only if 'test' is owned.
        if (data && typeof data == 'object')
            for (var k in data) owns.call(data, k) && (this[k] = data[k]); 
        else arguments.length && (this['test'] = data);
        this['init']();
    }

    /**
     * @param  {*=}  data
     * @return {Aok}
     */
    function aok(data) {
        return arguments.length ? new Aok(data) : new Aok; 
    }
    
    // Sync the prototypes
    aok.prototype = Aok.prototype;
    
    // Default messages
    aok.prototype['pass'] = 'Pass';
    aok.prototype['fail'] = 'Fail';
    
    // Console abstractions
    (function(target, console, alert) {
        /**
         * @param  {string}            name
         * @param  {(boolean|number)=} force
         * @param  {string=}           key
         */
        function assign(name, force, key) {
            var method = console ? function() {
                console[name].apply(console, arguments);
            } : function() {
                method['force'] && alert(name + ': ' + [].join.call(arguments, ' '));
            };
            method['force'] = !!force;
            target[key || name] = method;
        }
        
        assign('info', 1);
        assign('warn', 1);
        assign('error', 1);
        assign('trace');
        assign('log');
        assign('log', 0, 'express');
    }(aok, nativeConsole, nativeAlert));
    
    // Alias the "express" method. `aok.prototype.express` is used in the 
    // default handler. Override it as needed for customization.
    aok.prototype['express'] = aok['express'];
    
    /**
     * @param  {*}  item
     * @return {string}
     */
    function explain(item) {
        return '' + (item === Object(item) ? toString.call(item) : item);
    }
    aok['explain'] = explain;
    
    /**
     * @param    {*} o  is an Object or mixed value
     * @param    {(string|number)=}  k  
     * @example  result(0)               // 0
     * @example  result([1], 0)          // 1
     */
    function result(o, k) {
        return 2 == arguments.length ? result.call(o, o[k]) : typeof o == 'function' ? o.call(this) : o;
    }
    aok['result'] = result;

    /**
     * @return {Aok}
     */
    aok.prototype['init'] = function() {
        if (this === globe) throw new Error('@this');
        owns.call(this, 'id') || (this['id'] = ++uid);
        owns.call(this, 'test') && this['run']();
        return this;
    };
    
    /**
     * @return {Aok}
     */
    aok.prototype['run'] = function() {
        if (this === globe) throw new Error('@this');
        this['test'] = !!result(this, 'test'); // Run the test.
        return this['handler'](); // Trigger the handler.
    };
    
    /**
     * @param  {(string|number)=}    key
     */
    aok.prototype['cull'] = function(key) {
        return this[this[null == key ? 'test' : key] ? 'pass' : 'fail'];
    };

    /**
     * default handler can be overridden
     * @return {Aok}
     */
    aok.prototype['handler'] = function() {
        var msg = this['cull']();
        if (typeof msg == 'function') {
            msg.call(this);
        } else {
            msg = explain(msg);
            owns.call(this, 'remark') && (msg += ' (' + explain(this['remark']) + ')');
            this['express']('#' + this['id'] + ': ' + msg); 
        }
        return this;
    };
    
    /**
     * @param  {string}  n   
     * @return {Node|boolean}
     */
    aok['id'] = function(n) {
        return doc.getElementById(n) || false;
    };

    return aok;
}));