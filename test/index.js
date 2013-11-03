!function(aok) {
    var plain = {}, instance = aok(), browse = typeof window != 'undefined', es5 = 'reduce' in [];
    function called() {
        return !arguments.length && this;
    }
    function isNatural(n) {
        return 0 < n && n === (n >> 0);
    }
    aok({
        id: '#can',
        test: true === aok.can(aok)() && false === aok.can(function() {
            throw new Error;
        })()
    });
    aok({
        id: 'safe',
        test:!aok.can(aok().run)()
    });
    aok({
        id: 'instance',
        test: instance instanceof aok
    });
    aok(function() {
        return isNatural(this.id) && (this.id = '.id');
    });
    aok({
        id: '.handler',
        test: false,
        handler: function() {
            this.test = this instanceof aok;
            return aok.prototype.handler.call(this);
        }
    });
    aok({
        id: '.cull',
        test: function() {
            var culled = this.cull();
            this.remark = culled;
            return culled === this.pass;
        }
    });
    aok({
        id: '#pass',
        test: 1 === aok.pass([0], function(v, i, a) {
            var ones = [1, 1], emp = [], mix = [0, 1, 0, 1, 1];
            if (2 !== aok.pass(ones, isNatural)) return;
            if (0 !== aok.pass(emp, isNatural)) return;
            if (2 !== aok.pass(mix, isNatural, null, 2)) return;
            if (es5 && !ones.every(aok.pass)) return;
            if (es5 && mix.filter(aok.pass).length !== aok.pass(mix, aok.pass)) return;
            return this === aok && a[i] === v;
        }, aok)
    });
    aok({
        id: '#fail',
        test: 1 === aok.pass([0], function(v, i, a) {
            var zeds = [0, 0], emp = [], mix = [0, 1, 0, 1, 1];
            if (2 !== aok.fail(zeds, isNatural)) return;
            if (0 !== aok.fail(emp, isNatural)) return;
            if (2 !== aok.fail(mix, isNatural, null, 2)) return;
            if (es5 && !zeds.every(aok.fail)) return;
            if (es5 && mix.filter(aok.fail).length !== aok.pass(mix, aok.fail)) return;
            return this === aok && a[i] === v;
        }, aok)
    });
    aok({
        id: '#result',
        test: !aok.fail([
            aok.result(called) === aok
          , aok.result(instance, called) === instance
          , 1 === aok.result(1)
          , 1 === aok.result([1], 0)
        ], aok.pass)
    });
    aok({
        id: '#explain',
        test: '0' === aok.explain(0) && plain.toString.call(aok) === aok.explain()
    });
    aok({
        id: '#console',
        test:function() {
            if (!aok.console) return;
            browse && aok.info('#' + this.id + ':');
            return !aok.fail(['trace', 'assert', 'error', 'warn', 'info', 'log'], function(n) {
                var f = this.console[n];
                if (typeof f == 'function' && f === this[n] && typeof f.force == 'boolean') {
                    browse && f('...' + n);
                    return true;
                }
            }, aok, 1);
        }
    });
}(this.aok || require('../src'));