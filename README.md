# local-caching

[![Version](https://img.shields.io/npm/v/local-caching.svg)](https://www.npmjs.com/package/local-caching)
[![Downloads](https://img.shields.io/npm/dm/local-caching.svg)](https://npmcharts.com/compare/local-caching?minimal=true)
[![License](https://img.shields.io/npm/l/local-caching.svg)](https://www.npmjs.com/package/local-caching)

A programmatic data caching wrapper for browsers, based on localStorage.

## Installation

### Node.js

```sh
$ npm install --save local-caching
```

### Browser via CDN

```html
<script src="https://cdn.jsdelivr.net/npm/local-caching/dist/index.umd.js"></script>
```

## Usage

### Instance

```js
import LocalCaching from 'local-caching'

const localCaching = new LocalCaching()
localCaching.init()
```

### Set cache data

```js
localCaching.set('foo', 'bar', 300e3) // 5 minues
localCaching.set('numberValue', 12138, 300e3)
localCaching.set('booleanValue', true, 300e3)
localCaching.set('nullValue', null, 300e3)
localCaching.set('arrayValue', ['bar', 12138, null, true], 300e3)
localCaching.set('objectValue', { foo: 'bar' }, 300e3)
```

### Get cache data

```js
const foo          = localCaching.get('foo')
const numberValue  = localCaching.get('numberValue')
const booleanValue = localCaching.get('booleanValue')
const nullValue    = localCaching.get('nullValue')
const arrayValue   = localCaching.get('arrayValue')
const objectValue  = localCaching.get('objectValue')
```

### Flush all items

```js
localCaching.flushAll()
```

### Flush only expired items

```js
localCaching.flushExpired()
```

## Constructor

```js
new LocalCaching(options)
```

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `storeKeyPrefix` | string | `'cache::'` | Key prefix for cache items. |
| `storeMetaKeyPrefix` | string | `'cachemeta::'` | Key prefix for cache meta items. |

## License

[MIT](http://opensource.org/licenses/MIT)
