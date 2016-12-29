#!/usr/bin/env node

var store = require('../lib/store-file');

store['git-username'] = null;
store['git-token'] = null;

console.log('Your session has been reset.');

process.exit();