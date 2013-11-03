!function(aok) {
    var plain = {}, instance = aok();
    function called() {
        return !arguments.length && this;
    }
    function isNatural(n) {
        return 0 < n && n === (n >> 0);
    }
    aok(function() {
        return isNatural(this.id) && (this.id = '.id');
    });
    aok({
        id: 'can',
        test: true === aok.can(aok)() && false === aok.can(function() {
            throw new Error;
        })()
    });
    aok({
        id: 'safeGlobe',
        test:!aok.can(aok().run)()
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
        id: 'instance',
        test: instance instanceof aok
    });
    aok({
        id: 'explain',
        test: '0' === aok.explain(0) && plain.toString.call(aok) === aok.explain()
    });
    aok({
        id: 'cull',
        test: function() {
            var culled = this.cull();
            this.remark = culled;
            return culled === this.pass;
        }
    });
    aok({
        id: '.remark',
        test: function() {
            return this.remark = {};
        }
    });
    aok({
        id: 'resultParams',
        test: aok.result(called) === aok
    });
    aok({
        id: 'resultReturn',
        test: 1 === aok.result(1) && 1 === aok.result([1], 0)
    });
    aok({
        id: 'resultDirect',
        test: aok.result(instance, called) === instance
    });
    aok({
        id: '.result',
        test: 1 === aok.prototype.result.call([1], 0)
    });
    aok({
        id: 'console',
        test:function() {
            var n, a, o = aok.console;
            if (!o) return;
            for (a = ['log', 'info', 'warn', 'error', 'trace', 'assert']; n = a.pop();) {
                if (typeof o[n] != 'function' || o[n] !== aok[n]) return;
                if (typeof o[n].force != 'boolean') return;
            }
            return true;
        }
    });
}(this.aok || require('../src'));














