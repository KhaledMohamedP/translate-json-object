# Translate a JSON Object
↳ Links: [NPM](https://www.npmjs.com/package/translate-json-object) | [GitHub](https://github.com/KhaledMohamedP/translate-json-object)

A Node.js module to translate a JSON object from a detectable language to any other language currently via [google translate API](https://cloud.google.com/translate/docs)

## ⍗ Install

```bash
npm i translate-json-object
```

## Example

#### Setup:

```javascript
var TranslateJSONObject = require('translate-json-object');

// Get an instance
var TJO = TranslateJSONObject();

// Initialize your API
TJO.init({
  googleApiKey: 'googleApiKeyHERE'
});
```

#### Use

```javascript
// A sample object
var srcObj = {
  "name": "Please enter your name",
  "list": ["translate", "object", "made", "easy"],
  "nested": {
    "hello": "hello",
    "world": "world"
    }
};

var promise = TJO.translate(srcObj, 'es');

promise.then(function(data) {
  console.log(data);
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
[✅] Adding yandex service
[❌] Adding bing service
[❌] Unit test


#### Reach out

Feel free to reach out with feedback via [github](https://github.com/KhaledMohamedP/translate-json-object/issues): `issue`, `feature`, `bug`, or `enhancement` inputs are greatly appreciated

____

© MIT
