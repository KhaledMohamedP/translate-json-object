const Promise = require('promise');
const _ = require('lodash');

let translateService;

function init(setting) {
	translateService = require('google-translate')(setting.googleApiKey);
}

// eslint-disable-next-line max-params
function translateObject(language, key, destObj, keysArray, valuesArray) {
	return new Promise((resolve, reject) => {
		translateService.translate(valuesArray, language, (err, res) => {
			if (err || !res) {
				reject(err);
			} else {
				// Google-translate doesn't return an array if we only send a single string to translate
				res = _.concat(res);
				for (let i = 0; i < keysArray.length; i++) {
					destObj[key][keysArray[i]] = res[i].translatedText;
				}

				resolve(destObj);
			}
		});
	});
}

function translateString(language, key, destObj, valueStr) {
	return new Promise((resolve, reject) => {
		translateService.translate(valueStr, language, (err, res) => {
			if (err || !res) {
				reject(err);
			} else {
				destObj[key] = res.translatedText;
				resolve(destObj);
			}
		});
	});
}

module.exports = {
	init,
	object: translateObject,
	string: translateString
};
