#!/usr/bin/env node
'use strict';
require('./lib/babel-register');
require('loud-rejection')();
require('./')();

/*
var meow = require('meow');
var cli = meow([
	'Usage',
	'  $ scan-babel [input]',
	'',
	'Options',
	'  --foo  Lorem ipsum. [Default: false]',
	'',
	'Examples',
	'  $ scan-babel',
	'  unicorns & rainbows',
	'  $ scan-babel ponies',
	'  ponies & rainbows'
]);

console.log(scanBabel(cli.input[0] || 'unicorns'));
 */
