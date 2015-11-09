'use strict';

import globby from 'globby';
import readPreset from './read-preset';

export default async function () {
	const files = await globby('packages/babel-preset-*/index.js');
	return await Promise.all(files.map(readPreset));
}
