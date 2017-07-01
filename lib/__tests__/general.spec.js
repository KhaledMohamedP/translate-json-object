// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
const Translate = require('../translate-json-object');
const mock = require('../fixture/data.fixture');

const TJO = new Translate();
const init = jest.fn(TJO.init);
const translate = jest.fn(TJO.translate);

describe('TJO module to exist', () => {
	it('should TJO to exist', () => {
		expect(TJO).toBeDefined();
	});

	it('should TJO.init to exist', () => {
		expect(TJO.init).toBeDefined();
	});

	it('should TJO.translate to exist', () => {
		expect(TJO.translate).toBeDefined();
	});
});

describe('Translate Module TJO: ', () => {
	it('should init() to have been called', () => {
		init({googleApiKey: 'apiToken'});
		expect(init).toHaveBeenCalled();
	});

	it('should translate() to have been called', () => {
		translate();
		expect(translate).toHaveBeenCalled();
	});

	it('should fail to translate() using unkown service', () => {
		init({unkownApiService: 'apiToken'});
		return translate(mock.dataObject, 'ar')
						.catch(err => {
							expect(err).toBeDefined();
						});
	});

	it('Should fail to translate because of a missing language param: fail', () => {
		init({yandexApiKey: 'apiToken'});
		return translate(mock.dataObject)
						.catch(err => {
							expect(err).toBeDefined();
						});
	});

	it('should TJO.translate fails, becuase of missing google/yandex token', () => {
		init();
		return translate(mock.dataObject, 'ar')
						.catch(err => {
							expect(err).toBeDefined();
						});
	});
});
