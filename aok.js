/*!
 * aok          Test suite API
 * @link        github.com/ryanve/aok
 * @license     MIT
 * @copyright   2013 Ryan Van Etten
 * @version     0.6.2
 */

/*jslint browser: true, devel: true, node: true, passfail: false, bitwise: true
, continue: true, debug: true, eqeq: true, es5: true, forin: true, newcap: true
, nomen: true, plusplus: true, regexp: true, undef: true, sloppy: true, stupid: true
, sub: true, white: true, indent: 4, maxerr: 180 */

(function(root, name, definition) {// github.com/umdjs/umd
    if (typeof module != 'undefined' && module['exports']) {
        module['exports'] = definition(); // common|node|ender
    } else { root[name] = definition(); }
}(this, 'aok', function() {

    var win = window
      , doc = document
      , console = win.console
      , hasConsole = !!console
      , alert = win.alert
      , join = [].join;
      
    /**
     * @constructor 
     * @param  {Object=}  data
     */
    function Aok(data) {
        var k;
        if (null != data) {
            for (k in data) { 
                this[k] = data[k]; 
            }
            this['run']();
        }
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
    
    aok.prototype['pass'] = 'Pass';
    aok.prototype['fail'] = 'Fail';
    
    // run the test and trigger the handler
    aok.prototype['run'] = function() {
        if (!(this instanceof aok)) {
            throw new TypeError; 
        }
        if (typeof this['test'] == 'function') {
            this['test'] = this['test'](); 
        }
        this['test'] = !!this['test'];
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
     * @param {string}  n   
     */
    aok['id'] = function(n) {
        return doc.getElementById(n);
    };
   
    // console methods:
    (function(make) {
        make('log');
        make('trace');
        make('info' , 1);
        make('warn' , 1);
        make('error', 1);
        make('trace', 1);
    }(function(name, force) {
        aok[name] = aok.prototype[name] = hasConsole && typeof console[name] == 'function' ? function() {
            console[name].apply(console, arguments); 
        } : force ? function() {
            alert(name + ': ' + join.call(arguments, ' ')); 
        } : function() {};
    }));
    
    return aok;

}));