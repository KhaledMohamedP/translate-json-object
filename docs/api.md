<a name="TranslateJSONObject"></a>

## TranslateJSONObject() ⇒ <code>Object</code>
TranslateJSONObject - A Node.js module to translate a JSON object from a detectable language to any other language currently via google or yandex translate API

**Kind**: global function  
**Returns**: <code>Object</code> - Module API  

* [TranslateJSONObject()](#TranslateJSONObject) ⇒ <code>Object</code>
    * [~init(options)](#TranslateJSONObject..init) ⇒ <code>boolean</code>
    * [~translate(srcObj, language)](#TranslateJSONObject..translate) ⇒ <code>Promise</code>

<a name="TranslateJSONObject..init"></a>

### TranslateJSONObject~init(options) ⇒ <code>boolean</code>
init - Initialize the setting of your module instance, it takes a setting object

**Kind**: inner method of <code>[TranslateJSONObject](#TranslateJSONObject)</code>  
**Returns**: <code>boolean</code> - indicate if the module is configured properly  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

<a name="TranslateJSONObject..translate"></a>

### TranslateJSONObject~translate(srcObj, language) ⇒ <code>Promise</code>
translate - Translate an object to any given language, it returns a promise with the translated object

**Kind**: inner method of <code>[TranslateJSONObject](#TranslateJSONObject)</code>  
**Returns**: <code>Promise</code> - It returns a promise with the translated object  

| Param | Type | Description |
| --- | --- | --- |
| srcObj | <code>Object</code> | The object to be translated |
| language | <code>String</code> | The language you wish to translate too, accept the code e.g 'es', 'fr', 'ar' ... |

