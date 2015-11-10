'use strict';

import globby from 'globby';
import readPreset from './read-preset';
import assert from 'assert';
import mabObj from 'map-obj';

export default async function () {
	const files = await globby('packages/babel-preset-*/index.js');

	const fileList = await Promise.all(files.map(async file => {
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
				}
				return stripRequire('plugins', plugin, index);
			}
		}))};
	}));

	return mabObj(fileList, (key, value) => [/babel-preset-([^\/]+)/.exec(value.file)[1], value]);
}
