var hash = '[(.|.)]';

module.exports = function () {
	return {
		translate: (value, lang, fn) => {
			var result = value.split(hash);
			if (Array.isArray(result)) {
				var translatedList = result.map(e => {
					return e + '-' + lang.to;
				});
				fn(null, {text: [translatedList.join(hash)]});
			} else {
				fn({error: 'provide value'});
			}
		}
	};
};
