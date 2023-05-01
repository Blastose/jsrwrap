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

	it(`gets the user's posts and comments`, async () => {
		const overview = await user.getOverview();
		expect(overview[0].type).toBe('comment');
	});

	it("gets the user's posts", async () => {
		const submitted = await user.getSubmitted({ limit: 3, sort: 'top' });
		expect(submitted[0].title).toBe('[DISC] Goodbye, Eri - Oneshot');
	});

	it("gets the user's comments", async () => {
		const comments = await user.getComments({ limit: 3, sort: 'top' });
		expect(comments.length).toBe(3);
	});
});
