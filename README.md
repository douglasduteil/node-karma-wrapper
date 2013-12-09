# node-karma-wrapper [![Build Status](https://travis-ci.org/douglasduteil/node-karma-wrapper.png)](https://travis-ci.org/douglasduteil/node-karma-wrapper) [![NPM version](https://badge.fury.io/js/node-karma-wrapper.png)](http://badge.fury.io/js/node-karma-wrapper)

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

// Run the tests once
karma({ configFile : './test/karma.conf.js', singleRun: true });

// Launch a karma serve in background
karma({ configFile : './test/karma.conf.js', background: true });

// Run the tests using the already running karma server
karma.run({ configFile : './test/karma.conf.js'});
```

## Api

Just some Karma helper function that uses [the karma public API](http://karma-runner.github.io/0.10/dev/public-api.html).

#### karma(configs[, done])

Equivalent of karma start.

#### karma.run(configs[, done])

Equivalent of karma run.

## Background option

On continuous integration you can use the `background: true` option to start the karma server without blocking the main process.

## Travis CI trick

Like Travis
```




