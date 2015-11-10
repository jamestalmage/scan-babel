'use strict';
// import assert from 'assert';
import {withPlugins} from './lib/scan-for-options';
import scanForPresets from './lib/scan-for-presets';

// works in 6.1.3

export default async function () {
	// console.log(JSON.stringify(await withPlugins(), null, 4));

	console.log(JSON.stringify(await scanForPresets(), null, 4));
}

   /*
function pluginName(val) {
	let name = val;
	if (Array.isArray(val)) {
		name = val[0];
	}
	assert.strictEqual(typeof name, 'string', `plugin should be a string, or an Array with a string at index 0: ${JSON.stringify(val)}`);
	return name;
}  */
