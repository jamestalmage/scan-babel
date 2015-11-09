'use strict';

module.exports = {
	presets: [
		{require: 'babel-preset-fixture-1'}
	],
	plugins: [
		{require: 'babel-plugin-transform-fixture-0'},
		[{require:'babel-plugin-transform-fixture-1'}, 'arg1', 'arg2']
	]
};
