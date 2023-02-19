import { buildQueryString } from '../src/jsrwrap/utils/buildQueryString';

describe('buildQueryString', () => {
	it('should get build the query string', () => {
		const result = buildQueryString({ t: 'all', after: 't3qwert', count: 24 });
		expect(result).toBe('t=all&after=t3qwert&count=24');
	});

	it('should return an empty string when params are undefined', () => {
		const result = buildQueryString(undefined);
		expect(result).toBe('');
	});
});
