module.exports = function () {
	return {
		translate: (value, lang, fn) => {
			if (value) {
				var translatedList = value + '-' + lang.to;
				fn(null, {text: [translatedList]});
			} else {
				fn({error: 'provide value'});
			}
		}
	};
};
