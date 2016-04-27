# Translate a JSON Object

A Node.js module to translate a JSON object from a detectable language to any other language currently via [google translate API](https://cloud.google.com/translate/docs)

## ⍗ Install

```bash
npm install -S translate-json-object
```

## Example

#### Setup:

```javascript
// Get the module
var translate = require('translate-json-object');

// Get an instance
translateObject = translate();

// Initialize your API
translateObject.init({
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

var promise = api.translate(srcObj, 'es');

promise.then(function(data) {
  console.log(data);
  // { name: 'por favor, escriba su nombre',
  //   list: [ 'traducir', 'objeto', 'hecho', 'fácil' ],
  //   nested: { hello: 'Hola', world: 'mundo' }
  // }
});

```
## ◉ API

```javascript
var api = require('translate-json-object')();
```

### | `init`
| Function     | Type          | Returns      | Description  
| ------------ | ------------- | ------------ | --------------
| init         | `Function`    | `undefined`  |  `api.init` Initialize the setting of your module instance, it takes a [`setting`](#setting-object) object

```javascript
var setting = {
  googleApiKey: 'googleApiKeyHere'
}

api.init(setting)
```

~ `setting`: Object

| properties    | Type      | Description  
| ------------- |---------- | --------------
| googleApiKey  | `String`  | Google translate api token key


### | `translate`

```javascript
api.translate(sourceObject, language)
```

| Function     | Type          | Returns      | Description  
| ------------ | ------------- | ------------ | --------------
| translate    | `Function`    | `Promise`    |  Translate an object and returns a promise with the translated data

| Parameters    | Type     | Description  
| ------------- | -------- | --------------
| sourceObject  | `Object` | The object to be translated
| language      | `String` | The `language code` you wish to translate too [e.g 'es', 'fr', 'ar'...] - [see list](https://tech.yandex.com/translate/doc/dg/concepts/langs-docpage)

## What's next?
### TODO

* Allow the use of other translate services such as yandex & bing
* Unit test


### Reach out

Feel free to reach out with feedback via [github](https://github.com/KhaledMohamedP/translate-json-object/issues): `issue`, `feature`, `bug`, or `enhancement` inputs are greatly appreciated
