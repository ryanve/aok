module.exports = function(grunt) {
  var web, htm, open
    , path = require('path')
    , a = require('../').prototype
    , b = require('../src').prototype
    , passed = 0
    , failed = 0;

  a.pass = b.pass = function() {
    passed++ || grunt.verbose.or.writeln('Use --verbose if you want details');
    grunt.verbose.ok('Ok @ ' + this.id);
  };

  a.fail = b.fail = function() {
    failed++;
    grunt.log.warn('Fail @ ' + this.id);
  };

  try {
    open = require(path.resolve('node_modules/open'));
    web = /^https?\:\/\//i;
    htm = /\.html?$/i;
  } catch(e) { open = 0; }

  grunt.registerMultiTask('aok', function() {
    var done = this.async();
    grunt.log.subhead('Running tests...');

    [].concat(this.data).some(function bulk(id) {
      if (Array.isArray(id)) id.some(bulk);
      else if (open && web.test(id)) open(id);
      else (open && htm.test(id) ? open : require)(path.resolve(id));
    });

    setTimeout(function() {
      grunt.log.subhead((passed + failed) + ' tests ran.');
      passed && grunt.log.ok(passed + ' tests passed.');
      failed && grunt.log.warn(failed + ' tests failed.');
      failed && grunt.fail.warn('Fail.');
      done();
    }, 0);
  });
};