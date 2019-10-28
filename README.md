# Translate a JSON Object
[![Build Status](https://travis-ci.org/KhaledMohamedP/translate-json-object.svg?branch=master)](https://travis-ci.org/KhaledMohamedP/translate-json-object) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/fd5819795ed745d2b793787849b5400d)](https://www.codacy.com/app/khaledmohamedp/translate-json-object?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=KhaledMohamedP/translate-json-object&amp;utm_campaign=Badge_Grade)  [![Version](https://img.shields.io/npm/v/translate-json-object.svg?style=flat)](https://www.npmjs.com/package/translate-json-object)   [![Downloads](http://img.shields.io/npm/dm/translate-json-object.svg?style=flat)](https://www.npmjs.com/package/translate-json-object)

↳ Links: [NPM](https://www.npmjs.com/package/translate-json-object) | [GitHub](https://github.com/KhaledMohamedP/translate-json-object)

A Node.js module to translate a JSON object from a detectable language to any other language via
* Google: [translate](https://translate.google.com/) | [API](https://cloud.google.com/translate/docs)
* Yandex: [translate](https://translate.yandex.com/) | [API](https://tech.yandex.com/translate/)

## ⍗ Install

```bash
npm i translate-json-object
```

## Example

```javascript
// Require the module and instantiate instance
var TJO = require('translate-json-object')();

// Choose the service to use google/yandex,
// if you provide both yandex will be used as the default
TJO.init({
  googleApiKey: 'api_key',
  yandexApiKey: 'api_key'
});

// An example scenario (json) object
var example = {
  "name": "Please enter your name",
  "list": ["translate", "object", "made", "easy"],
  "nested": {
    "hello": "hello",
    "world": "world"
    }
};

// Translate method takes (source object, and language code)
TJO.translate(example, 'es')
    .then(function(data) {
      console.log(data);
    }).catch(function(err) {
      console.log('error ', err)
    });
```

RESULT ↴

```javascript
{ name: 'por favor, escriba su nombre',
 list: [ 'traducir', 'objeto', 'hecho', 'fácil' ],
 nested: { hello: 'Hola', world: 'mundo' }
}
```

## ◉ API
See [API Doc](https://github.com/KhaledMohamedP/translate-json-object/blob/master/docs/api.md)

## ✼ Others

#### TODO 🔧
    ✔︎ Adding yandex service v2.1.0
    ✔︎ Unit test v2.1.4
    ✔︎ JS Linting v2.1.3
    ✔︎ semantic-release-cli v2.2.0
    ☐ Adding bing translate service
    ☐ Adding cli utility

#### Reach Out ☮
* ⚐ Feedback via [GitHub Issues](https://github.com/KhaledMohamedP/translate-json-object/issues)
* ♡ Welcome all [Contribution](https://github.com/KhaledMohamedP/translate-json-object/blob/master/CONTRIBUTING.md)

____

[![License](https://img.shields.io/npm/l/translate-json-object.svg?style=flat)](https://www.npmjs.com/package/translate-json-object) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)  
