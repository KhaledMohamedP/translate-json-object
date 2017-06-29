var _ = require('lodash');
var Promise = require('promise');

/**
 * TranslateJSONObject - A Node.js module to translate a JSON object from a detectable language to any other language currently via google or yandex translate API
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
	 * @return {boolean} indicate if the module is configured properly
	 */
	function init(options) {
		setting = options || {};

		if (!setting.googleApiKey && !setting.yandexApiKey) {
			console.warn('Please provide a google or yandex api token');
			return false;
		} else if (setting.yandexApiKey) {
			translateSrv = require('./service/yandex.js');
		} else {
			translateSrv = require('./service/google.js');
		}

		translateSrv.init(setting);
		return true;
	}

	/**
	 * translate - Translate an object to any given language, it returns a promise with the translated object
	 *
	 * @param  {Object} srcObj   The object to be translated
	 * @param  {String} language The language you wish to translate too, accept the code e.g 'es', 'fr', 'ar' ...
	 * @return {Promise}         It returns a promise with the translated object
	 */
	function translate(srcObj, language) {
		if (!setting.googleApiKey && !setting.yandexApiKey) {
			return Promise.reject(
				'Please provide a googleApiKey / yandexApiKey api token key, make sure to call init() method to initialize your setting'
			);
		}

		if (_.isString(language)) {
			return Promise.reject('Please provide a language param [type String] e.g. translate(obj, es)');
		}

		function recurisveTranslateObject(destObj, srcObj) {
			// Loop through the entire object collection
			_.forEach(srcObj, loopHandler);

			function loopHandler(value, key) {
				if (_.isPlainObject(value)) {
					translateObjectProps(value, key, destObj);
				} else if (_.isArray(value)) {
					_.forEach(value, function (value, keyarr) {
						handleArrayType(value, keyarr, destObj[key]);
					});
				}
			}
		}

		/**
		 * @private
		 * @param {*} value value of the key property
		 * @param {*} key key of the object
		 * @param {*} destObj the location of the parent object
		 */
		function handleArrayType(value, key, destObj) {
			if (_.isPlainObject(value)) {
				translateObjectProps(value, key, destObj);
			} else if (_.isString(value)) {
				promises.push(translateSrv.string(language, key, destObj, value));
			}
		}

		/**
		 * @private
		 * @param {*} value value of the key property
		 * @param {*} key key of the object
		 * @param {*} destObj the location of the parent object
		 */
		function translateObjectProps(value, key, dest) {
			dest[key] = {};
			_.merge(dest[key], value);
			recurisveTranslateObject(dest[key], value);
			promises.push(translateSrv.object(language, key, dest));
		}

		// Recursivly loop through an object
		recurisveTranslateObject(destObj, {
			data: srcObj
		}, language);

		return new Promise(function (resolve, reject) {
			Promise.all(promises).then(function () {
				resolve(destObj.data);
			}).catch(function (err) {
				reject(err);
			});
		});
	}

	return {
		init: init,
		translate: translate
	};
}

module.exports = TranslateJSONObject;
