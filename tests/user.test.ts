/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { describe, beforeAll, it, expect } from 'vitest';
import { Jsrwrap } from '../src/jsrwrap.js';
import { User } from '../src/user.js';

describe('Subreddit methods', () => {
	let user: User;

	beforeAll(async () => {
		const reddit = new Jsrwrap(
			'N/A',
			process.env.CLIENT_ID!,
			process.env.CLIENT_SECRET!,
			'web:JsrwrapApiWrapper:v0.0.1',
			process.env.REFRESH_TOKEN!
		);
		await reddit.refreshAccessToken();
		user = reddit.getUser('AutoShonenpon');
	});

	it('TODO', async () => {
		const overview = await user.getOverview();

		expect(overview[0].type).toBe('comment');

		overview.map((v) => {
			if (v.type === 'post') {
				console.log(v.title);
			} else {
				console.log(v.body);
			}
		});
	});
});
