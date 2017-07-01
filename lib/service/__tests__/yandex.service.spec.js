var translate = require('../yandex');

// Mocked external node_modules
jest.mock('yandex-translate');

// Mocked internal public methods
jest.fn(translate.init);
jest.fn(translate.object);
jest.fn(translate.string);

describe('Yandex service public API', () => {
	it('should exist', () => {
		expect(translate).toBeDefined();
	});

	it('should include init', () => {
		expect(translate.init).toBeDefined();
	});

	it('should include string', () => {
		expect(translate.string).toBeDefined();
	});

	it('should include array', () => {
		expect(translate.object).toBeDefined();
	});
});

describe('Yandex translate.object: ', () => {
	it('should fail due missing language param', () => {
		translate.init({yandexApiKey: 'yandex_token'});
		return translate
						.object(null, {}, {}, [], ['list', 'of', 'elements'])
						.catch(err => {
							expect(err.status).toBe(404);
							expect(err.error).toBe('Invalid language');
						});
	});

	it('should failed due to invalid value', () => {
		translate.init({yandexApiKey: 'yandex_token'});
		return translate
							.object('ar', {}, {}, [], [])
							.catch(err => {
								expect(err).toBe('Something went wrong');
							});
	});
});

describe('Yandex translate.string: ', () => {
	it('should fail due missing language param', () => {
		translate.init({yandexApiKey: 'yandex_token'});
		return translate
						.string(null, 'key', {}, '')
						.catch(err => {
							expect(err.status).toBe(404);
							expect(err.error).toBe('Invalid language');
						});
	});

	it('should failed due to invalid value', () => {
		translate.init({yandexApiKey: 'yandex_token'});
		return translate
							.string('es', 'key', {}, null)
							.catch(err => {
								expect(err).toBe('Something went wrong');
							});
	});
});

