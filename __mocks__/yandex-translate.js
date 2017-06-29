module.exports = function () {
	return {
		translate: (value, lang, fn) => {
			if (value) {
				var translatedList = value + '-' + lang.to;
				fn(null, {code: 200, text: [translatedList]});
			} else {
				fn({error: 'provide value'});
			}
		}
	};
};
