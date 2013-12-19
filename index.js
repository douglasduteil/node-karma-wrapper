/*jshint node:true */

'use strict';

var runner = require('karma').runner;
var path = require('path');
var es = require('event-stream');
var spawn = require('child_process').spawn;

function karmaPlugin(opts){
  var _this = this || {};

  if( opts && opts.configFile){
    opts.configFile = path.join(process.cwd(), opts.configFile);
  }

  _this.config = opts;

  _this.start = function (done) {
    var args = [path.join(__dirname , 'lib', 'server_process.js'), JSON.stringify(_this.config)];
    spawn('node', args, { stdio: 'inherit' })
      .on('close', function (code) {
        done && done(code);
      });
  };

  _this.inBackground = function (done) {
    var args = [path.join(__dirname , 'lib', 'server_process.js'), JSON.stringify(_this.config)];
    spawn('node', args)
      .on('close', function (code) {
        console.log('The background karma server stops. code ' + code);
      });
    done && done();
  };

  _this.simpleRun = function (done) {
    _this.config.singleRun = true;
    var args = [path.join(__dirname , 'lib', 'server_process.js'), JSON.stringify(_this.config)];
    spawn('node', args, { stdio: 'inherit' })
      .on('close', function (code) {
        done && done(code);
      });
  };

  _this.run = function (done) {
    runner.run(_this.config, function() { done && done(); });
  };

  _this.stremTest = function(){

    return es.map(function (file, done) {
      _this.config.singleRun = true;
      _this.config.files = (_this.config.files || []).concat([file.path]);
      _this.config.reporters = ['json'];
      var args = [path.join(__dirname , 'lib', 'server_process.js'), JSON.stringify(_this.config)];

      es.child(spawn('node', args))
        .on('close', function () { done(null, file); })
        .pipe( es.map(function (raw, callback) {
          if (raw[0] !== 123){// doesn't begin with '{'
            process.stdout.write(raw.toString());
          }else{
            file.karma = JSON.parse(raw.toString());
          }
          callback();
        }));
      });

  };

  return _this;
}


var URL_REGEXP = new RegExp('http:\\/\\/[^\\/]*' +
                            '\\/(base|absolute)([^\\?\\s\\:]*)(\\?\\w*)?', 'g');

karmaPlugin.formatError = function(msg, indentation) {
  // remove domain and timestamp from source files
  // and resolve base path / absolute path urls into absolute path
  msg = (msg || '').replace(URL_REGEXP, function(full, prefix, path) {
    if (prefix === 'base') {
      return '/' + path;
    } else if (prefix === 'absolute') {
      return path;
    }
  });

  // indent every line
  if (indentation) {
    msg = indentation + msg.replace(/\n/g, '\n' + indentation);
  }

  return msg + '\n';
};

karmaPlugin.loadReporter = function(reporter) {

  // we want the function
  if (typeof reporter === 'function') return reporter;

  // object reporters
  if (typeof reporter === 'object' && typeof reporter.reporter === 'function') return karmaPlugin.loadReporter(reporter.reporter);

  // load jshint built-in reporters
  if (typeof reporter === 'string') {
    try {
      return karmaPlugin.loadReporter(require(path.join(__dirname, 'reporters', reporter)));
    } catch (err) {}
  }

  // load full-path or module reporters
  if (typeof reporter === 'string') {
    try {
      return karmaPlugin.loadReporter(require(reporter));
    } catch (err) {}
  }
};


karmaPlugin.reporter = function(reporter){

  if (!reporter) reporter = 'default';
  var rpt = karmaPlugin.loadReporter(reporter);

  if (typeof rpt !== 'function') {
    throw new Error('Invalid reporter');
  }

  // return stream that reports stuff
  return es.map(function (file, cb) {

    // nothing to report
    if (!file.karma) return cb(null, file);

    rpt(file.karma);
    return cb(null, file);
  });
};

module.exports =  karmaPlugin;
