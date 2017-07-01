module.exports = function () {
	return {
		translate: (value, lang, fn) => {
			if (value && lang) {
				var translatedList = {translatedText: value + '-' + lang};
				fn(null, translatedList);
			} else if (lang === null) {
				fn('You missed to pass the languge');
			} else {
				fn('Something went wrong');
			}
		}
	};
};
