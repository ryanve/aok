module.exports = function(grunt) {
    grunt.registerMultiTask('aok', function() {
        [].concat(this.data).some(function load(id) {
            Array.isArray(id) ? id.some(load) : null == id || require(this.resolve(id));
        }, require('path'));
    });
};