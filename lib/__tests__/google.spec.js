// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
const Translate = require('../translate-json-object');
const mock = require('../fixture/data.fixture');

const TJO = new Translate();
const init = jest.fn(TJO.init);
const translate = jest.fn(TJO.translate);

describe('TJO Google Translate Service', () => {
	it('Should translate object: success', () => {
		init({googleApiKey: 'apiToken'});
		return translate(mock.dataObject, 'es').then(e => {
			expect(e).toEqual(mock.translatedES);
		});
	});

	it('Should not translate number: success', () => {
		init({googleApiKey: 'apiToken'});
		return translate({num: 33}, 'es').then(e => {
			expect(e).toEqual({num: 33});
		});
	});

	it('Should not translate boolean: success', () => {
		init({googleApiKey: 'apiToken'});
		return translate({bool: true}, 'es').then(e => {
			expect(e).toEqual({bool: true});
		});
	});
});
