module.exports = function () {
	return {
		translate: (value, lang, fn) => {
			if (value) {
				var translatedList = {translatedText: value + '-' + lang};
				fn(null, translatedList);
			} else {
				fn({error: 'provide value'});
			}
		}
	};
};
