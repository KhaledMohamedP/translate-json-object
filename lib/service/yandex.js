const Promise = require('promise');

const hashSimple = '[(.|.)]';
let translateService;

function init(setting) {
	translateService = require('yandex-translate')(setting.yandexApiKey);
}

// eslint-disable-next-line max-params
function translateObject(language, key, destObj, keysArray, valuesArray) {
	return new Promise((resolve, reject) => {
		const valuesStr = valuesArray.join(hashSimple);

		translateService.translate(valuesStr, {
			to: language
		}, (err, res) => {
			if (err || res.code !== 200) {
				reject(err || res);
			} else {
				// Yandex return an array string and so we need split back to the normal vlues
				const result = res.text[0].split(hashSimple);

				for (let i = 0; i < keysArray.length; i++) {
					destObj[key][keysArray[i]] = result[i];
				}

				resolve(destObj);
			}
		});
	});
}

function translateString(language, key, destObj, valueStr) {
	return new Promise((resolve, reject) => {
		translateService.translate(valueStr, {
			to: language
		}, (err, res) => {
			if (err || res.code !== 200) {
				reject(err || res);
			} else {
				// Yandex return an array string and so we need split back to the normal vlues
				destObj[key] = res.text[0];
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
