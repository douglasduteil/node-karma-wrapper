;(function() {
  'use strict';

  var gulp = require('gulp');
  var karma = require('./index.js');

  gulp.task('default', function(cb){
    karma({ configFile : './test/karma.conf.js'}, cb);
  });

})();

