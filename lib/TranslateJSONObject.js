var _ = require('lodash');
var Promise = require('promise');

/**
 * TranslateJsonObject - A Node.js module to translate a JSON object from a detectable language to any other language currently via google translate API
 *
 * @return {Object}  Module API
 */ 
function TranslateJsonObject() {
  // Set the current avaliable service for translation e.g. google, bing, yandex etc..
  var translateService;
  // The list of promises that should be reoslve prior to returning the full `Object translation`
  var promises = [];
  // Module setting
  var setting = {};


  /**
   * init - Initialize the setting of your module instance, it takes a setting object
   *
   * @param  {Object} setting
   * @return {Object} undefined
   */
  function init(setting) {
    setting.googleApiKey = setting.googleApiKey;
    translateService = require('google-translate')(googleApiKey);
  }


  /**
   * translate - Translate an object to any given language, it returns a promise with the translated data
   *
   * @param  {Object} srcObj   The object to be translated
   * @param  {String} language The language code you wish to translate too e.g 'es', 'fr', 'ar' ...
   * @return {Promise}         It returns a promise with the translated data
   */
  function translate(srcObj, language) {
    if (!googleApiKey ) {
      return Promise.reject("Please provide google translate api token, use (init) to initalize the Service");
    }

    promises = [];
    var destObj = {};

    // Recursivly loop through an object
    recurisveTranslateObject(destObj, {
      data: srcObj
    }, language);

    return new Promise(function promise(resolve, reject) {
      Promise.all(promises).then(function() {
        resolve(destObj.data);
      }).catch(function(err) {
        reject('Service failed', err);
      });
    });
  }

  function recurisveTranslateObject(destObj, srcObj, language) {
    var promise;
    _.forEach(srcObj, function(value, key) {
      if (_.isPlainObject(value)) {
        destObj[key] = {};
        _.merge(destObj[key], value);
        recurisveTranslateObject(destObj[key], value, language);

        // Find the keys of the current object that has string value (str is translatable)
        var objKeys = _.pickBy(destObj[key], _.isString);
        var keysArray = _.keys(objKeys);
        var valuesArray = _.values(objKeys);
        valuesArray = _.concat(valuesArray);

        promise = new Promise(function(resolve, reject) {
          translateService.translate(valuesArray, language, function(err, res) {
            if (err || !res) {
              reject('Service failed', err);
            }
            // Google-translate doesn't return an array if we only send a single string to translate
            res = _.concat(res);
            for (var i = 0; i < keysArray.length; i++) {
              destObj[key][keysArray[i]] = res[i].translatedText;
            }

            resolve();
          });
        });
        promises.push(promise);

        // Handles cases when the value in the JSON property is actually an array ["..", "...."]
      } else if (_.isArray(value)) {
        promise = new Promise(function(resolve, reject) {
          translateService.translate(value, language, function(err, res) {
            if (err || !res) {
              reject('Service failed', err);
            }

            var translatedArray = [];
            for (var i = 0; i < res.length; i++) {
              translatedArray.push(res[i].translatedText);
            }
            destObj[key] = translatedArray;

            resolve();
          });
        });

        promises.push(promise);
      }
    });
  }

  return {
      init: init,
      translate: translate
    };
}

module.exports = TranslateJsonObject;
