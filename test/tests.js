(function(aok) {
    var plain = {}, instance = aok();
    aok(function() {
        return isFinite(this.id);
    });
    aok({
        id: 'handler',
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
        id: 'remark',
        test: function() {
            return this.remark = {};
        }
    });
    aok({
        id: 'resultParams',
        test: aok.result(function() {
            return !arguments.length && aok === this;
        })
    });
    aok({
        id: 'resultReturn',
        test: 1 === aok.result(1) && 1 === aok.result([1], 0)
    });
    aok({
        id: 'resultProto',
        test: 1 === aok.prototype.result.call([1], 0)
    });
    aok({
        id: 'can',
        test: true === aok.can(aok)() && false === aok.can(function() {
            throw new Error;
        })()
    });
}(this.aok));