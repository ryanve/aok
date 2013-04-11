/*!
 * aok          Test suite API
 * @link        github.com/ryanve/aok
 * @license     MIT
 * @copyright   2013 Ryan Van Etten
 * @version     0.9.0
 */

/*jslint browser: true, devel: true, node: true, passfail: false, bitwise: true
, continue: true, debug: true, eqeq: true, es5: true, forin: true, newcap: true
, nomen: true, plusplus: true, regexp: true, undef: true, sloppy: true, stupid: true
, sub: true, white: true, indent: 4, maxerr: 100 */

(function(root, name, definition) {// github.com/umdjs/umd
    if (typeof module != 'undefined' && module['exports']) {
        module['exports'] = definition(); // common|node|ender
    } else { root[name] = definition(); }
}(this, 'aok', function() {

    var win = window
      , doc = document
      , console = win.console
      , alert = win.alert
      , uid = 1;
      
    /**
     * @constructor 
     * @param  {(Object|Function|Boolean|*)=}  data
     */
    function Aok(data) {
        var k;
        if (typeof data != 'object' || !data) {
            this['test'] = data;
        } else for (k in data) {
            this[k] = data[k]; 
        }
        this['run']();
    }

    /**
     * @param  {Object=}  data
     * @return {Aok}
     */
    function aok(data) { 
        return new Aok(data); 
    }
    
    // sync the prototypes
    aok.prototype = Aok.prototype;
    
    // default messages
    aok.prototype['pass'] = 'Pass';
    aok.prototype['fail'] = 'Fail';
    
    // run the test and trigger the handler
    aok.prototype['run'] = function() {
        if (!(this instanceof aok)) { throw new TypeError; }
        null == this['id'] && (this['id'] = uid++);
        this['test'] = !!(typeof this['test'] == 'function' ? this['test']() : this['test']);
        this['handler'] && this['handler']();
    };

    // default handler can be overridden
    aok.prototype['handler'] = function() {
        var msg = this[this['test'] ? 'pass' : 'fail'];
        if (typeof msg == 'string') {
            aok['log']('#' + this['id'] + ': ' + msg);
        } else if (typeof msg == 'function') { 
            msg.call(this); 
        }
    };
    
    /**
     * @param  {string}  n   
     * @return {Node|boolean}
     */
    aok['id'] = function(n) {
        return doc.getElementById(n) || false;
    };
   
    // console methods:
    (function(make) {
        make('log');
        make('trace');
        make('info' , 1);
        make('warn' , 1);
        make('error', 1);
    }(function(name, force) {
        aok[name] = console && typeof console[name] == 'function' ? function() {
            console[name].apply(console, arguments); 
        } : force ? function() {
            alert(name + ': ' + [].join.call(arguments, ' ')); 
        } : function() {};
    }));
    
    return aok;
}));