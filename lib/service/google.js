var Promise = require('promise');
var _ = require('lodash');

var translateService;

function init(setting) {
	translateService = require('google-translate')(setting.googleApiKey);
}

function translateObject(language, key, destObj) {
  // Find the keys of the current object that has string value (str is translatable)
	var objKeys = _.pickBy(destObj[key], _.isString);
	var keysArray = _.keys(objKeys);
	var valuesArray = _.concat(_.values(objKeys));

	return new Promise(function (resolve, reject) {
		translateService.translate(valuesArray, language, function (err, res) {
			if (err || !res) {
				reject('Translation service failed', err);
			} else {
				// Google-translate doesn't return an array if we only send a single string to translate
				res = _.concat(res);
				for (var i = 0; i < keysArray.length; i++) {
					destObj[key][keysArray[i]] = res[i].translatedText;
				}

				resolve(destObj);
			}
		});
	});
}

function translateString(language, key, destObj, valueStr) {
	return new Promise(function (resolve, reject) {
		translateService.translate(valueStr, language, function (err, res) {
			if (err || !res) {
				reject('Google translation service failed', err);
			} else {
				destObj[key] = res.translatedText;
				resolve(destObj);
			}
		});
	});
}

module.exports = {
	init: init,
	object: translateObject,
	string: translateString
};
