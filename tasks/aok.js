module.exports = function(grunt) {
    grunt.registerMultiTask('aok', function() {
        [].concat(this.data).some(function load(path) {
            this.isArray(path) ? path.some(load) : null == path || require(path);
        }, Array);
    });
};