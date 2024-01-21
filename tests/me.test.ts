/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { describe, beforeAll, it, expect } from 'vitest';
import { Jsrwrap } from '../src/jsrwrap.js';
import { Me } from '../src/me.js';

describe('Subreddit methods', () => {
	let me: Me;

	beforeAll(async () => {
		const reddit = new Jsrwrap({
			accessToken: 'N/A',
			clientId: process.env.CLIENT_ID!,
			clientSecret: process.env.CLIENT_SECRET!,
			userAgent: 'web:JsrwrapApiWrapper:v0.0.1',
			refreshToken: process.env.REFRESH_TOKEN!
		});
		await reddit.refreshAccessToken();
		me = reddit.getMe();
	});

	it("gets the user's subscribed subreddits", async () => {
		const subs = await me.getSubscribedSubreddits();
		expect(subs.at(0)?.display_name_prefixed).toBeTypeOf('string');
	});
});
