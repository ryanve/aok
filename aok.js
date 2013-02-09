/*!
 * aok          test suite
 * @link        github.com/ryanve/aok
 * @license     MIT
 * @copyright   2013 Ryan Van Etten
 * @version     0.5.0
 */

/*jslint browser: true, devel: true, node: true, passfail: false, bitwise: true
, continue: true, debug: true, eqeq: true, es5: true, forin: true, newcap: true
, nomen: true, plusplus: true, regexp: true, undef: true, sloppy: true, stupid: true
, sub: true, white: true, indent: 4, maxerr: 180 */

(function (root, name, definition) {// github.com/umdjs/umd
    if ( typeof module != 'undefined' && module['exports'] ) { 
        module['exports'] = definition(); // node / ender / common
    } else { root[name] = definition(); } // browser
}(this, 'aok', function () {
    
    var win = window
      , doc = document
      , console = win.console
      , hasConsole = !!console
      , alert = win.alert
      , join = [].join
      , aok = function () { 
            return aok.run.apply(this, arguments); 
        };

    aok['id'] = function (n) {
        return doc.getElementById(n);
    };

    /**
     * @param  {string}            name
     * @param  {(number|boolean)=} force
     * @return Function
     */ 
    function make (name, force) {
        aok[name] = hasConsole && typeof console[name] == 'function' ? function () { 
            console[name].apply(console, arguments); 
        } : force ? function () { 
            alert(name + ': ' + join.call(arguments)); 
        } : function () {};
    }
    
    make('log');
    make('trace');
    make('info', 1);
    make('warn', 1);
    make('error', 1);
    make('trace', 1);
    
    /**
     * @param {Object|Function}  r     receiver
     * @param {Object|Function}  s     supplier
     */
    function fill (r, s) {
        var k;
        for (k in s) {
            null != s[k] && (r[k] = s[k]);
        } return r;
    }
    
    /**
     * @param {Object|Function}  data
     */
    aok['run'] = function (data) {
        data = typeof data == 'function' ? data() : data;
        if ( typeof data != 'object' ) { throw new TypeError; }
        data = fill({ 'pass': 'Pass', 'fail': 'Fail' }, data);
        if ( typeof data['test'] == 'function' ) { data['test'] = data['test'](); }
        data['test'] = !!data['test'];
        aok['run']['handler'] && aok['run']['handler'].call(data);
    };

    /**
     * @param {Object}  data
     */    
    aok['run']['handler'] = function () {
        var msg = this['test'] ? this['pass'] : this['fail'];
        if ( typeof msg == 'string' ) { aok['log']('' + this['id'] + ':' + msg); }
        else if ( typeof msg == 'function' ) { msg.call(this); }
    };
    
    return aok;

}));