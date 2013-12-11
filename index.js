/*jshint node:true */

'use strict';

var runner = require('karma').runner;
var path = require('path');
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
    console.log(_this.config);
    var args = [path.join(__dirname , 'lib', 'server_process.js'), JSON.stringify(_this.config)];
    spawn('node', args, { stdio: 'inherit' })
      .on('close', function (code) {
        done && done(code);
      });
  };

  _this.run = function (done) {
    runner.run(_this.config, function() { done && done(); });
  };

  return _this;
};

module.exports =  karmaPlugin;
