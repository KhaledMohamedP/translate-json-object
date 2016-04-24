# Translate a JSON Object
`Please note this package is still under development`


# Install 
`npm install -S translate-json-object`

# API 

`var translateObject = require('translate-json-object')` 

`translateObject(srcObject, langageuString, googleTranslateAPITokenString)`

*  srcObject: `Object` It's the object you want to translate 
*  langageuString: `String` the language you wish to translate too (e.g 'es', 'fr', 'ar'...) 
*  googleTranslateAPITokenString: `String` your google api key for translate service


# Example 
First install: 

`npm install -S translate-json-object`

then use: 

```javascript
var translateObject = require('translate-json-object');

var obj = {
  "name": "Please enter your name",
    "click": "click here",
    "nested": {
      "hello": "hello",
      "world": "world"
    }
};

var promise = translateObject(obj, 'es', 'googleTranslateAPIToken');

promise.then(function(data) {
  console.log(data);
    // { name: 'por favor, escriba su nombre',
    //   click: 'haga clic aquí',
    //   nested: { hello: 'Hola', world: 'mundo' } }
});

``` 
