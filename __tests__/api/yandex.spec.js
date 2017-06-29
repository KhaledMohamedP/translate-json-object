// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
const {mockDataObject, transaltedES} = require('mock-data');
const Translate = require('../../lib/translate-json-object');

const TJO = new Translate();
const init = jest.fn(TJO.init);
const translate = jest.fn(TJO.translate);

describe('TJO Yandex Translate Service', () => {
	it('Should transalte object: success', () => {
		init({yandexApiKey: 'apiToken'});
		return translate(mockDataObject, 'es')
						.then(e => {
							expect(e).toBeDefined();
							expect(e).toEqual(transaltedES);
						});
	});

	it('Should not transalte number: success', () => {
		init({yandexApiKey: 'apiToken'});
		return translate({num: 33}, 'es')
						.then(e => {
							expect(e).toBeDefined();
							expect(e).toEqual({num: 33});
						});
	});

	it('Should not boolean: success', () => {
		init({yandexApiKey: 'apiToken'});
		return translate({bool: true}, 'es')
						.then(e => {
							expect(e).toBeDefined();
							expect(e).toEqual({bool: true});
						});
	});
});
