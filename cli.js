#!/usr/bin/env node
'use strict';

// So we can invoke from scan-babel directory, when installed alongside babel
if (process.cwd() === __dirname) {
	process.chdir(require('path').join(__dirname, '../babel'));
}

require('./lib/babel-register');
require('loud-rejection')();
require('./')();
