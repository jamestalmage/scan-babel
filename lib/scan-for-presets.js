'use strict';

import globby from 'globby';
import readPreset from './read-preset';
import assert from 'assert';

export default async function () {
	const files = await globby('packages/babel-preset-*/index.js');
	return await Promise.all(files.map(async file => {
		return {file, preset: await (readPreset(file).then(preset => {
			const handlePreset = stripRequire.bind(null, 'presets');

			return {
				presets: preset.presets && preset.presets.map(handlePreset),
				plugins: preset.plugins && preset.plugins.map(handlePlugin)
			};

			function stripRequire(arrayName, requireCall, index) {
				assert(requireCall.hasOwnProperty('require'), `${file}:${arrayName}:${index} expected a require call`);
				return requireCall.require;
			}

			function handlePlugin(plugin, index) {
				if (Array.isArray(plugin)) {
					return [stripRequire('plugins', plugin[0], index)].concat(plugin.slice(1));
				} else {
					return stripRequire('plugins', plugin, index);
				}
			}
		}))};
	}));
}
