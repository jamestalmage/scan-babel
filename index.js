'use strict';
// import assert from 'assert';
// import {withPlugins} from './lib/scan-for-options';
import scanForPresets from './lib/scan-for-presets';

// works in 6.1.3

export default async function () {
	// console.log(JSON.stringify(await withPlugins(), null, 4));

	console.log(JSON.stringify(await scanForPresets(), null, 4));
}

