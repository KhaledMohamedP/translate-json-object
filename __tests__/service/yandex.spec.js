var translate = require('../../lib/service/yandex');

describe('yandex service existance', () => {
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

var init = jest.fn(translate.init);

describe('yandex service init', () => {
	it('should initalize the yandex-translate service', () => {
		init({yandexApiKey: 'apiToken'});
		expect(init).toHaveBeenCalled();
	});
});
