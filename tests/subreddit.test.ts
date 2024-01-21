/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { describe, beforeAll, it, expect } from 'vitest';
import { Jsrwrap } from '../src/jsrwrap.js';
import { Subreddit } from '../src/subreddit.js';

describe('Subreddit methods', () => {
	let subreddit: Subreddit;

	beforeAll(async () => {
		const reddit = new Jsrwrap({
			accessToken: 'N/A',
			clientId: process.env.CLIENT_ID!,
			clientSecret: process.env.CLIENT_SECRET!,
			userAgent: 'web:JsrwrapApiWrapper:v0.0.1',
			refreshToken: process.env.REFRESH_TOKEN!
		});
		await reddit.refreshAccessToken();
		subreddit = reddit.getSubreddit('python');
	});

	// Test may fail if a new post becomes the top of all time
	it('gets Top submissions of all time', async () => {
		const python = await subreddit.getSubmissions({
			sort: 'top',
			params: { t: 'all' }
		});
		expect(python[0].title).toBe(
			"Lad wrote a Python script to download Alexa voice recordings, he didn't expect this email."
		);
	});

	it('only gets 5 submissions', async () => {
		const python = await subreddit.getSubmissions({
			sort: 'new',
			params: { limit: 5 }
		});
		expect(python.length).toBe(5);
	});

	it('gets the subreddit about info', async () => {
		const about = await subreddit.getAbout();
		expect(about.title).toBe('Python');
	});

	it('gets the subreddit sidebar info', async () => {
		const sidebar = await subreddit.getSidebar();
		expect(sidebar?.length).toBeGreaterThan(0);
	});

	it('gets the subreddit moderator list', async () => {
		const moderators = await subreddit.getModerators();
		expect(moderators.at(0)?.name).toBeTypeOf('string');
	});
});

describe.only('Frontpage subreddit', () => {
	let subreddit: Subreddit;

	beforeAll(async () => {
		const reddit = new Jsrwrap({
			accessToken: 'N/A',
			clientId: process.env.CLIENT_ID!,
			clientSecret: process.env.CLIENT_SECRET!,
			userAgent: 'web:JsrwrapApiWrapper:v0.0.1',
			refreshToken: process.env.REFRESH_TOKEN!
		});
		await reddit.refreshAccessToken();
		subreddit = reddit.getSubreddit();
	});

	it('gets Top submissions of all time', async () => {
		const best = await subreddit.getSubmissions({
			sort: 'best'
		});
		expect(best[0].title).toBeTypeOf('string');
	});
});
