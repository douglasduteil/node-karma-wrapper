    /* jshint node: true */

'use strict';

var assign = require('lodash.assign');
var gulp = require('gulp');
var karma = require('./index.js');

// TRAVIS TRICKS
function testConfig(configFile, customOptions){
  var options = { configFile: configFile };
  var travisOptions = process.env.TRAVIS && { browsers: [ 'Firefox', 'PhantomJS'], reporters: ['dots'] };
  return assign(options, customOptions, travisOptions);
}

var myKarmaServer = karma(testConfig('./test/karma.conf.js'));

gulp.task('default', function(cb){
  myKarmaServer.simpleRun(cb);
});

gulp.task('serve', function(cb){
  myKarmaServer.inBackground();

  gulp.watch('./test/foo.spec.js', function(){
    myKarmaServer.run();
  });

});


