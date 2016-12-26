# Translate a JSON Object
↳ Links: [NPM](https://www.npmjs.com/package/translate-json-object) | [GitHub](https://github.com/KhaledMohamedP/translate-json-object)

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/fd5819795ed745d2b793787849b5400d)](https://www.codacy.com/app/khaledmohamedp/translate-json-object?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=KhaledMohamedP/translate-json-object&amp;utm_campaign=Badge_Grade)  [![Version](https://img.shields.io/npm/v/translate-json-object.svg?style=flat-square)](https://www.npmjs.com/package/translate-json-object)  [![License](https://img.shields.io/npm/l/translate-json-object.svg?style=flat-square)](https://www.npmjs.com/package/translate-json-object)  [![Downloads](http://img.shields.io/npm/dm/translate-json-object.svg?style=flat-square)](https://www.npmjs.com/package/translate-json-object)

A Node.js module to translate a JSON object from a detectable language to any other language currently via [google translate API](https://cloud.google.com/translate/docs) | [yandex translate](https://tech.yandex.com/translate/)

## ⍗ Install

```bash
npm i translate-json-object
```

## Example

#### Setup:

```javascript
// Require the module and instantiate instance
var TJO = require('translate-json-object')();

// Choose the service to use google/yandex, if you provide both yandex will be used as the default
TJO.init({
  googleApiKey: 'api_key',
  yandexApiKey: 'api_key'
});

// An example scenario (json) object
var srcObj = {
  "name": "Please enter your name",
  "list": ["translate", "object", "made", "easy"],
  "nested": {
    "hello": "hello",
    "world": "world"
    }
};

TJO.translate(srcObj, 'es').then(function(data) {
  console.log(data);
  // RESULT ->
  // { name: 'por favor, escriba su nombre',
  //   list: [ 'traducir', 'objeto', 'hecho', 'fácil' ],
  //   nested: { hello: 'Hola', world: 'mundo' }
  // }
}).catch(function(err) {
  console.log('error ', err)
});

```
## ◉ API

```javascript
var api = require('translate-json-object')();
```

### | `api.init(setting)`

Initialize the setting of your module instance, it takes a [`setting`](#setting) object

#### || setting

| properties    | Type      | Description  
| ------------- |---------- | --------------
| googleApiKey  | `String`  | Google translate api token key


### | `api.translate(sourceObject, language)`

Translate an object to any given language, it returns a promise with the translated data

| Parameters    | Type     | Description  
| ------------- | -------- | --------------
| sourceObject  | `Object` | The object to be translated
| language      | `String` | The `language code` you wish to translate too e.g `'es', 'fr', 'ar' ...` - [see list](https://tech.yandex.com/translate/doc/dg/concepts/langs-docpage)

## What's next?
#### TODO
* [✅] Adding yandex service v2.1.0
* [❌] Adding bing service
* [❌] Unit test
* [✅] JS Linting

#### Reach out

Feel free to reach out with feedback via [github](https://github.com/KhaledMohamedP/translate-json-object/issues): `issue`, `feature`, `bug`, or `enhancement` inputs are greatly appreciated

____

© MIT
