import { buildQueryString } from '../src/utils/buildQueryString.js';
import { getRedditVideoLinks } from '../src/utils/getRedditVideoLinks.js';
import { describe, it, expect } from 'vitest';

describe('buildQueryString', () => {
	it('builds query string', () => {
		const result = buildQueryString({ t: 'all', after: 't3qwert', count: 24 });
		expect(result).toBe('t=all&after=t3qwert&count=24');
	});

	it('returns an empty string when params are undefined', () => {
		const result = buildQueryString(undefined);
		expect(result).toBe('');
	});
});

describe.only('getRedditVideoLinks', () => {
	it('getRedditVideoLinks', async () => {
		await getRedditVideoLinks('https://v.redd.it/40fvh634rmsa1/');
	});
});
