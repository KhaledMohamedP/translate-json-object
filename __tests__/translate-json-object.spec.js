var Translate = require('../lib/translate-json-object');

var TJO = new Translate();
var init = jest.fn(TJO.init);
var translate = jest.fn(TJO.translate);

var mockDataObject = {name: 'name', addressField: ['city', 'state', 'zipdecode'], bool: true, num: 33};
var transaltedES = {name: 'name-es', addressField: ['city-es', 'state-es', 'zipdecode-es'], bool: true, num: 33};

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

describe('TJO Google Translate Service', () => {
	it('Should transalte object: sucess', () => {
		init({googleApiKey: 'apiToken'});
		return translate(mockDataObject, 'es')
						.then(e => {
							expect(e).toBeDefined();
							expect(e).toEqual(transaltedES);
						});
	});

	it('Should not transalte number: success', () => {
		init({googleApiKey: 'apiToken'});
		return translate({num: 33}, 'es')
						.then(e => {
							expect(e).toBeDefined();
							expect(e).toEqual({num: 33});
						});
	});

	it('Should not boolean: success', () => {
		init({googleApiKey: 'apiToken'});
		return translate({bool: true}, 'es')
						.then(e => {
							expect(e).toBeDefined();
							expect(e).toEqual({bool: true});
						});
	});
});

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
