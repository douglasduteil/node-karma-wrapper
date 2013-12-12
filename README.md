# node-karma-wrapper [![Build Status](https://travis-ci.org/douglasduteil/node-karma-wrapper.png)](https://travis-ci.org/douglasduteil/node-karma-wrapper) [![NPM version](https://badge.fury.io/js/node-karma-wrapper.png)](http://badge.fury.io/js/node-karma-wrapper)

I'm just wrapping the [the karma public API](http://karma-runner.github.io/0.10/dev/public-api.html) here.

## Information

<table>
<tr>
<td>Package</td><td>node-karma-wrapper</td>
</tr>
<tr>
<td>Description</td>
<td>Karma test runner helper</td>
</tr>
<tr>
<td>Node Version</td>
<td>>= 0.8</td>
</tr>
</table>

## Usage

```javascript
var karma = require('node-karma-wrapper');

// Preconfig you server
var aKarmaTestServer = karma({ configFile : './test/karma.conf.js');

// Then run once
aKarmaTestServer.simpleRun();

// Run in background
aKarmaTestServer.inBackground();

// Normal launch
aKarmaTestServer.start();

// Run the tests using the already started karma server
aKarmaTestServer.run();
```

## Api

### karma(configs)

Defines a karma server with a specific configuration (see [the official api](http://karma-runner.github.io/0.10/config/configuration-file.html)).
Return a « Karma Helper Object »


### « Karma Helper Object » methods

#### kho.start([callback])

Equivalent of karma start.

#### kho.run(callback)

Equivalent of karma run.

#### kho.inBackground([callback])

On continuous integration you can start the karma server without blocking the main process and without logging anything.

#### kho.simpleRun([callback])

Equivalent of karma start with the *singleRun* option on.

## Travis CI trick

Here is a way to run specific config on Travis :

```javascript
var assign = require('lodash.assign');

// TRAVIS TRICKS
function testConfig(configFile, customOptions){
  var options = { configFile: configFile };
  var travisOptions = process.env.TRAVIS && { browsers: [ 'Firefox', 'PhantomJS'], reporters: ['dots'] };
  return assign(options, customOptions, travisOptions);
}
```




