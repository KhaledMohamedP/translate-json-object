var translate = require('../google');

// Mocked external node_modules
jest.mock('google-translate');

// Mocked internal public methods
jest.fn(translate.init);
jest.fn(translate.object);
jest.fn(translate.string);

describe('google service existance', () => {
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

describe('Google translate.object: ', () => {
	it('should fail due missing language param', () => {
		translate.init({googleApiKey: 'google_token'});
		return translate
						.object(null, {}, {}, ['key1', 'key2'], ['list', 'of', 'elements'])
						.catch(err => {
							expect(err).toBe('You missed to pass the languge');
						});
	});

	it('should fail to transalte object due to invalid value', () => {
		translate.init({googleApiKey: 'google_token'});
		return translate
							.object('ar', {}, {}, [], [])
							.catch(err => {
								expect(err).toBe('Something went wrong');
							});
	});
});

describe('Google translate.string: ', () => {
	it('should fail due missing language param', () => {
		translate.init({googleApiKey: 'google_token'});
		return translate
						.string(null, 'key', {}, '')
						.catch(err => {
							expect(err).toBe('You missed to pass the languge');
						});
	});

	it('should failed due to invalid value', () => {
		translate.init({googleApiKey: 'google_token'});
		return translate
							.string('es', 'key', {}, null)
							.catch(err => {
								expect(err).toBe('Something went wrong');
							});
	});
});
