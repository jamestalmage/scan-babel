'use strict';
import globby from 'globby';
import pify from 'pify';
import {readFile} from 'fs';
const readFileAsync = pify(readFile);

async function getOptionsFilesAsync() {
	const files = await globby([
		'packages/**/test/**/*{.js,.json}',
		'!**/node_modules/**',
		'!**/babylon/**'
	]);

	return await Promise.all(files.filter(isOptions).map(async file => {
		const contents = JSON.parse(await readFileAsync(file, 'utf8'));
		return {file, contents};
	}));
}

let optionsFiles = null;

export function getOptionsFiles() {
	return optionsFiles || (optionsFiles = getOptionsFilesAsync());
}

export async function withPlugins() {
	return (await getOptionsFiles()).filter(hasPlugins);
}

export async function fixtureOptions() {
	return (await withPlugins()).filter(isFixtureOptions);
}

function isOptions(file) {
	return /options\.json$/.test(file);
}

function toPlugins(obj) {
	return obj.contents.plugins;
}

function isFixtureOptions(optionsFile) {
	return /\/fixtures\//.test(optionsFile.file);
}

function hasPlugins(obj) {
	return Boolean(toPlugins(obj));
}
