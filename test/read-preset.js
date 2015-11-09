'use strict';
import register from 'babel-core/register';
import test from 'ava';
import readPreset from '../lib/read-preset';

register({experimental: true, optional: ['runtime']});

test('read all babel presets', async t => {
	t.plan(1);
	// just read them all to make sure it does not throw.
	// plugins need to stay simple (without logic) for the current hack to work.

	const presets = {
		es2015: await readPreset(require.resolve('babel-preset-es2015')),
		stage0: await readPreset(require.resolve('babel-preset-stage-0')),
		stage1: await readPreset(require.resolve('babel-preset-stage-1')),
		stage2: await readPreset(require.resolve('babel-preset-stage-2')),
		stage3: await readPreset(require.resolve('babel-preset-stage-3')),
		stage4: await readPreset(require.resolve('babel-preset-react'))
	};

	// console.log(JSON.stringify(presets, null, 4));
	t.ok(presets);
	t.end();
});

test('fixture preset', async t => {
	t.plan(1);

	t.same(
		await readPreset(require.resolve('./fixtures/babel-preset-fixture-0')),
		require('./fixtures/babel-preset-fixture-0-expected')
	);
});
