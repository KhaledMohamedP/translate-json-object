var translate = require('../../lib/service/google');

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
		expect(translate.array).toBeDefined();
	});
});

describe('google service init', () => {
	it('should initalize the google-translate service', () => {
		var init = jest.fn(translate.init);
		init({googleApiKey: 'apiToken'});
		expect(init).toHaveBeenCalled();
	});
});
