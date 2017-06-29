// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
const {mockDataObject} = require('mock-data'); // Note mock-data live under __mocks__ dir
const Translate = require('../../lib/translate-json-object');

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
		return translate(mockDataObject, 'ar')
						.catch(err => {
							expect(err).toBeDefined();
						});
	});

	it('should TJO.translate fails, becuase of missing google/yandex token', () => {
		init();
		return translate(mockDataObject, 'ar')
						.catch(err => {
							expect(err).toBeDefined();
						});
	});
});
