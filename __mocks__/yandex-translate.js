module.exports = function () {
	return {
		translate: (value, lang, fn) => {
			if (value && lang.to) {
				var translatedList = value + '-' + lang.to;
				fn(null, {code: 200, text: [translatedList]});
			} else if (lang.to === null) {
				fn(null, {status: 404, error: 'Invalid language'});
			} else {
				fn('Something went wrong');
			}
		}
	};
};
