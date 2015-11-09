'use strict';
import {readFile} from 'fs';
import pify from 'pify';
const readFileAsync = pify(readFile);

/*
All the presets published by babel are very simple, with no internal logic:

```js
module.exports = {
  presets: [require('preset-1')]
  plugins: [[require('plugin-1'), 'arg1', 'arg2']
}
```

This allows us to pass in a proxy for `require` that is a simple identity/wrapper function,
and get back the following:

 ```js
 module.exports = {
   presets: [{require: 'preset-1'}],
   plugins: [[{require: 'plugin-1'}, 'arg1', 'arg2']],
 }
 ```
*/

export default async function(path) {
	const contents = await readFileAsync(path);
	return ____readPresetDoEval____([
		'var module = {exports: {}};',
		'function require(path) {return {require:path};}',
		contents,
		';module.exports'
	].join(''));
};

function ____readPresetDoEval____(____readPresetEvalTarget____) {
	return eval(____readPresetEvalTarget____); // eslint-disable-line no-eval
}
