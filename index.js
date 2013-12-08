/*jshint node:true */

'use strict';

var runner = require('karma').runner;
var path = require('path');
var spawn = require('child_process').spawn;

function karmaPlugin(opts, cb){

  if( opts && opts.configFile){
    opts.configFile = path.join(process.cwd(), opts.configFile);
  }

  var args = [path.join(__dirname , 'lib', 'server_process.js'), JSON.stringify(opts)];
  if( opts && ! opts.background){
    spawn('node', args, { stdio: 'inherit' }, function(){ cb(); } );
  }else{
    spawn('node', args);
    cb();
  }

}

karmaPlugin.run = function(opts, cb){

  if( opts && opts.configFile){
    opts.configFile = path.join(process.cwd(), opts.configFile);
  }

  runner.run(opts, function() { cb(); });

};

module.exports = karmaPlugin;
