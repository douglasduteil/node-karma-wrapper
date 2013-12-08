;(function() {
  'use strict';

  var assign = require('lodash.assign');
  var gulp = require('gulp');
  var karma = require('./index.js');

  gulp.task('default', function(cb){
    function testConfig(configFile, customOptions){
      var options = { configFile: configFile, singleRun: true };
      var travisOptions = process.env.TRAVIS && { browsers: [ 'Firefox', 'PhantomJS'], reporters: ['dots'] };
      return assign(options, customOptions, travisOptions);
    }

    karma(testConfig('./test/karma.conf.js'), cb);
  });

})();

