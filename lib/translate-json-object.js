const _ = require('lodash');
const Promise = require('promise');
const constant = require('./util/constant');
const isValidLang = require('./util/valid-lang');

/**
 * TranslateJSONObject - A Node.js module to translate a JSON object from a detectable language to any other language currently via google or yandex translate API
 *
 * @return {Object}  Module API
 */
function TranslateJSONObject() {
	// Set the current available service for translation e.g. google, bing, yandex etc..
	let translateSrv;
	let setting;
	// The list of promises that should be resolve prior to returning the full `Object translation`
	const promises = [];
	const destObj = {};
	let serviceType;

	/**
	 * Init - Initialize the setting of your module instance, it takes a setting object
	 *
	 * @param  {Object} options define keys for either yandex or google translate
	 * @return {boolean} indicate if the module is configured properly
	 */
	function init(options) {
		setting = options || {};

		if (!setting.googleApiKey && !setting.yandexApiKey) {
			console.warn(constant.ERROR.MISSING_TOKEN);
			return false;
		}

		if (setting.yandexApiKey) {
			serviceType = constant.YANDEX_NAME;
			translateSrv = require('./service/yandex.js');
		} else {
			serviceType = constant.GOOGLE_NAME;
			translateSrv = require('./service/google.js');
		}

		translateSrv.init(setting);

		return true;
	}

	/**
	 * Translate - Translate an object to any given language, it returns a promise with the translated object
	 *
	 * @param  {Object} srcObj   The object to be translated
	 * @param  {String} language The language you wish to translate too, accept the code e.g 'es', 'fr', 'ar' ...
	 * @return {Promise}         It returns a promise with the translated object
	 */
	function translate(srcObj, language) {
		if (!setting.googleApiKey && !setting.yandexApiKey) {
			return Promise.reject(constant.ERROR.MISSING_TOKEN);
		}

		if (!_.isString(language)) {
			return Promise.reject(new Error('Please provide a language param [type String] e.g. translate(obj, es)'));
		}

		if (!isValidLang(language, serviceType)) {
			return Promise.reject(new Error(serviceType + ' doesn\'t support the language code you specified [' + language + '], please try another language code (ISO-639-1)'));
		}

		const ARRAY_ROOT_TYPE = _.isArray(srcObj);

		if (ARRAY_ROOT_TYPE) {
			srcObj = {
				arrayType: srcObj
			};
		}

		function recurisveTranslateObject(destObj, srcObj) {
			// Loop through the entire object collection
			_.forEach(srcObj, loopHandler);

			function loopHandler(value, key) {
				if (_.isPlainObject(value)) {
					translateObjectProps(value, key, destObj);
				} else if (_.isArray(value)) {
					_.forEach(value, (value, keyarr) => {
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
			} else if (_.isString(value) && value !== '') {
				promises.push(translateSrv.string(language, key, destObj, value));
			}
		}

		/**
		 * @private
		 * @param {*} value value of the key property
		 * @param {*} key key of the object
		 * @param {*} destObj the location of the parent object
		 */
		function translateObjectProps(value, key, destObj) {
			destObj[key] = {};
			_.merge(destObj[key], value);
			recurisveTranslateObject(destObj[key], value);

			// Find the keys of the current object that has string value (str is translatable)
			const objKeys = _.pickBy(destObj[key], _.isString);
			const keysArray = _.keys(objKeys);
			const valuesArray = _.concat(_.values(objKeys));

			if (valuesArray.length !== 0) {
				promises.push(translateSrv.object(language, key, destObj, keysArray, valuesArray));
			}
		}

		// Recursivly loop through an object
		recurisveTranslateObject(destObj, {
			ROOT: srcObj
		}, language);

		return new Promise((resolve, reject) => {
			Promise.all(promises)
				.then(() => {
					if (ARRAY_ROOT_TYPE) {
						resolve(destObj.ROOT.arrayType);
					} else {
						resolve(destObj.ROOT);
					}
				})
				.catch(reject);
		});
	}

	return {
		init,
		translate
	};
}

module.exports = TranslateJSONObject;
