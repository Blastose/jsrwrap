/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { describe, beforeAll, it, expect } from 'vitest';
import { Jsrwrap } from '../src/jsrwrap.js';
import { User } from '../src/user.js';

describe('Subreddit methods', () => {
	let user: User;

	beforeAll(async () => {
		const reddit = new Jsrwrap({
			accessToken: 'N/A',
			clientId: process.env.CLIENT_ID!,
			clientSecret: process.env.CLIENT_SECRET!,
			userAgent: 'web:JsrwrapApiWrapper:v0.0.1',
			refreshToken: process.env.REFRESH_TOKEN!
		});
		await reddit.refreshAccessToken();
		user = reddit.getUser('AutoShonenpon');
	});

	it("gets the user's about", async () => {
		const about = await user.getAbout();
		expect(about.name).toBe('AutoShonenpon');
	});

	it("gets the user's posts and comments", async () => {
		const overview = await user.getOverview({ sort: 'top' });
		expect(overview.data[0].type).toBe('post');
	});

	it("gets the user's posts", async () => {
		const submitted = await user.getSubmitted({ limit: 3, sort: 'top' });
		expect(submitted.data[0].title).toBe('[DISC] Goodbye, Eri - Oneshot');
	});

	it("gets the user's comments", async () => {
		const comments = await user.getComments({ limit: 3, sort: 'top' });
		expect(comments.data.length).toBe(3);
	});

	// Gold has been removed from reddit
	// it("gets the user's gilded posts and comments", async () => {
	// 	const gilded = await user.getGilded();
	// 	expect(gilded[0].type).toBe('post');
	// });
});
