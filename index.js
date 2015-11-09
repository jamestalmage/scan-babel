'use strict';
const mapObj = require('map-obj');
const assert = require('assert');
const globby = require('globby');
const fs = require('fs');

const foundPlugins = {};

module.exports = () => {
	globby([
		'packages/**/test/**/*{.js,.json}',
		'!**/node_modules/**',
		'!**/babylon/**'
	]).then(files => {
		const options = files.filter(isOptions);

		options.forEach(file => {
			const contents = fs.readFileSync(file, 'utf8');
			const obj = JSON.parse(contents);
			if (obj.plugins) {
				obj.plugins.forEach(val => {
					const name = pluginName(val);
					if (!foundPlugins[name]) {
						foundPlugins[name] = [];
					}
					foundPlugins[name].push({
						file,
						contents: obj
					});
				});
			}
		});

		const shortest = mapObj(foundPlugins, (key, val) => {
			return [key, val.map(toPlugins).reduce((prev, curr) => {
				return curr.length < prev.length ? curr : prev;
			})];
		});

		console.log(JSON.stringify(shortest, null, 4));
	});
};

function isOptions(file) {
	return /options\.json$/.test(file);
}

function toPlugins(obj) {
	return obj.contents.plugins;
}

function pluginName(val) {
	let name = val;
	if (Array.isArray(val)) {
		name = val[0];
	}
	assert.strictEqual(typeof name, 'string', `plugin should be a string, or an Array with a string at index 0: ${JSON.strigify(val)}`);
	return name;
}
