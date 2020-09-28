// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
const Translate = require('../translate-json-object');
const mock = require('../fixture/data.fixture');

const TJO = new Translate();
const init = jest.fn(TJO.init);
const translate = jest.fn(TJO.translate);

describe('TJO Yandex Translate Service', () => {
	it('Should translate object: success', () => {
		init({yandexApiKey: 'apiToken'});
		return translate(mock.dataObject, 'es').then(e => {
			expect(e).toBeDefined();
			expect(e).toEqual(mock.translatedES);
		});
	});

	it('Should not translate number: success', () => {
		init({yandexApiKey: 'apiToken'});
		return translate({num: 33}, 'es').then(e => {
			expect(e).toBeDefined();
			expect(e).toEqual({num: 33});
		});
	});

	it('Should not translate boolean: success', () => {
		init({yandexApiKey: 'apiToken'});
		return translate({bool: true}, 'es').then(e => {
			expect(e).toBeDefined();
			expect(e).toEqual({bool: true});
		});
	});

	it('Should translate multiple languages async', () => {
		init({yandexApiKey: 'apiToken'});
		const languages = ['es', 'ar'];
		const all = Promise.all(
			languages.map(lang => translate(mock.dataObject, lang))
		);

		all.then(data => {
			expect(data).toEqual([mock.translatedES, mock.translatedAR]);
		});
	});
});
