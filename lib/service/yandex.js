var Promise = require('promise');
var _ = require('lodash');

var hashSimple = '@@@';
var translateService;

function init(setting) {
	translateService = require('yandex-translate')(setting.yandexApiKey);
}

// eslint-disable-next-line max-params
function translateObject(language, key, destObj, keysArray, valuesArray) {
	return new Promise(function (resolve, reject) {
		var valuesStr = valuesArray.join(hashSimple);

		translateService.translate(valuesStr, {to: language}, function (err, res) {
			if (err || res.code !== 200) {
				reject(err || res);
			} else {
        // yandex return an array string and so we need split back to the normal vlues
				var result = res.text[0].split(hashSimple);
				for (var i = 0; i < keysArray.length; i++) {
					destObj[key][keysArray[i]] = result[i];
				}

				resolve(destObj);
			}
		});
	});
}

function translateString(language, key, destObj, valueStr) {
	return new Promise(function (resolve, reject) {
		translateService.translate(valueStr, {to: language}, function (err, res) {
			if (err || res.code !== 200) {
				reject(err || res);
			} else {
        // yandex return an array string and so we need split back to the normal vlues
				destObj[key] = res.text[0];
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
