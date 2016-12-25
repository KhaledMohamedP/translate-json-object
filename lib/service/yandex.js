var Promise = require('promise');
var _ = require('lodash');

var hashSimple = '[(.|.)]';
var translateService;

function init(setting) {
	translateService = require('yandex-translate')(setting.yandexApiKey);
}

function translateString(language, key, destObj) {
  // Find the keys of the current object that has string value (str is translatable)
	var objKeys = _.pickBy(destObj[key], _.isString);
	var keysArray = _.keys(objKeys);
	var valuesArray = _.concat(_.values(objKeys));

	return new Promise(function (resolve, reject) {
		var valuesStr = valuesArray.join(hashSimple);
		translateService.translate(valuesStr, {to: language}, function (err, res) {
			if (err || !res) {
				reject('Yandex translation service failed', err);
			} else {
        // yandex return an array string and so we need split back to the normal vlues
				var result = res.text[0].split(hashSimple);
				for (var i = 0; i < keysArray.length; i++) {
					destObj[key][keysArray[i]] = result[i];
				}

				resolve();
			}
		});
	});
}

function translateArray(language, key, destObj, valuesArray) {
	return new Promise(function (resolve, reject) {
		var valuesStr = valuesArray.join(hashSimple);
		translateService.translate(valuesStr, {to: language}, function (err, res) {
			if (err || !res) {
				reject('Yandex translation service failed', err);
			} else {
        // yandex return an array string and so we need split back to the normal vlues
				var result = res.text[0].split(hashSimple);
				var translatedArray = [];
				for (var i = 0; i < result.length; i++) {
					translatedArray.push(result[i]);
				}

				destObj[key] = translatedArray;
				resolve();
			}
		});
	});
}

module.exports = {
	init: init,
	array: translateArray,
	string: translateString
};
