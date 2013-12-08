# gulp-karma [![Build Status](https://travis-ci.org/douglasduteil/gulp-karma.png)](https://travis-ci.org/douglasduteil/gulp-karma) [![NPM version](https://badge.fury.io/js/gulp-karma.png)](http://badge.fury.io/js/gulp-karma)

## Information

<table>
<tr>
<td>Package</td><td>gulp-karma</td>
</tr>
<tr>
<td>Description</td>
<td>Karma test runner for Gulp.</td>
</tr>
<tr>
<td>Node Version</td>
<td>>= 0.6</td>
</tr>
</table>

## Usage

```javascript
var karma = require('gulp-karma');

gulp.task('test', function(cb){
  // Run the tests once
  karma({ configFile : './test/karma.conf.js', singleRun: true }, cb);
});

gulp.task('serve', function(){
  // Launch a karma serve in background
  karma({ configFile : './test/karma.conf.js', background: true }, function(){});

  gulp.task('continuous testing', function(cb){
    // Run the tests using the already running karma server
    karma.run({ configFile : './test/karma.conf.js'}, cb);
  });

  // watch the tests
  gulp.watch('./test/**', function(){
    gulp.run('continuous testing');
  });

});
```
