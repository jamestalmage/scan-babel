# scan-babel [![Build Status](https://travis-ci.org/jamestalmage/scan-babel.svg?branch=master)](https://travis-ci.org/jamestalmage/scan-babel)

> My ultimate module


## Install

```
$ npm install --save scan-babel
```


## Usage

```js
const scanBabel = require('scan-babel');

scanBabel('unicorns');
//=> 'unicorns & rainbows'
```


## API

### scanBabel(input, [options])

#### input

Type: `string`

Lorem ipsum.

#### options

##### foo

Type: `boolean`  
Default: `false`

Lorem ipsum.


## CLI

```
$ npm install --global scan-babel
```

```
$ scan-babel --help

  Usage
    scan-babel [input]

  Options
    --foo  Lorem ipsum. [Default: false]

  Examples
    $ scan-babel
    unicorns & rainbows
    $ scan-babel ponies
    ponies & rainbows
```


## License

MIT © [James Talmage](http://github.com/jamestalmage)
