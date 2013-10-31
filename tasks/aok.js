module.exports = function(grunt) {
    var web, htm, open, path = require('path');
    try {
        open = require(path.resolve('node_modules/open'));
        web = /^https?\:\/\//i;
        htm = /\.html?$/i;
    } catch(e) { open = 0; }

    grunt.registerMultiTask('aok', function() {
        [].concat(this.data).some(function bulk(id) {
            if (Array.isArray(id)) id.some(bulk);
            else if (open && web.test(id)) open(id);
            else (open && htm.test(id) ? open : require)(path.resolve(id));
        });
    });
};