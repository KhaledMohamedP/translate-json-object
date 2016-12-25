var _ = require('lodash');
var Promise = require('promise');

/**
 * TranslateJSONObject - A Node.js module to translate a JSON object from a detectable language to any other language currently via google translate API
 *
 * @return {Object}  Module API
 */
function TranslateJSONObject() {
	// Set the current available service for translation e.g. google, bing, yandex etc..
	var translateSrv;
	var setting;
	// The list of promises that should be resolve prior to returning the full `Object translation`
	var promises = [];
	var destObj = {};

	/**
   * init - Initialize the setting of your module instance, it takes a setting object
   *
   * @param  {Object} options
   * @return {Undefined} undefined
   */
	function init(options) {
		setting = options || {};

		if (!setting.googleApiKey && !setting.yandexApiKey) {
			return Promise.reject('Please provide a google/yandex api token, make sure to use .init() to initialize your setting');
		}

		if (setting.googleApiKey) {
			translateSrv = require('./service/google.js').init(setting);
		}

		if (setting.yandexApiKey) {
			translateSrv = require('./service/yandex.js');
		}

		translateSrv.init(setting);
	}

	/**
   * translate - Translate an object to any given language, it returns a promise with the translated data
   *
   * @param  {Object} srcObj   The object to be translated
   * @param  {String} language The language code you wish to translate too e.g 'es', 'fr', 'ar' ...
   * @return {Promise}         It returns a promise with the translated data
   */
	function translate(srcObj, language) {
		if (!setting.googleApiKey && !setting.yandexApiKey) {
			return Promise.reject('Please provide a google/yandex api token, make sure to use .init() to initialize your setting');
		}

		function recurisveTranslateObject(destObj, srcObj, language) {
			_.forEach(srcObj, function (value, key) {
				if (_.isPlainObject(value)) {
					destObj[key] = {};
					_.merge(destObj[key], value);
					recurisveTranslateObject(destObj[key], value, language);
					promises.push(translateSrv.string(language, key, destObj));
				} else if (_.isArray(value)) {
					promises.push(translateSrv.array(language, key, destObj, value));
				}
			});
		}
		// Recursivly loop through an object
		recurisveTranslateObject(destObj, {
			data: srcObj
		}, language);

		return new Promise(function (resolve, reject) {
			Promise.all(promises).then(function () {
				resolve(destObj.data);
			}).catch(function (err) {
				reject('Service failed', err);
			});
		});
	}

	return {init: init, translate: translate};
}

module.exports = TranslateJSONObject;
