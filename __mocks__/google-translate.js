module.exports = function () {
	return {
		translate: (value, lang, fn) => {
			if (Array.isArray(value)) {
				var translatedList = value.map(e => {
					return {translatedText: e + '-' + lang};
				});
				fn(null, translatedList);
			} else {
				fn({error: 'provide value'});
			}
		}
	};
};
