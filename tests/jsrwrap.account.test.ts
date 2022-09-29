/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Jsrwrap } from '../src/jsrwarp/index';
import { RedditAccount } from '../src/jsrwarp/objects/redditAccount';

let account: RedditAccount;

beforeAll(async () => {
	const reddit = new Jsrwrap(
		'N/A',
		process.env.CLIENT_ID!,
		process.env.CLIENT_SECRET!,
		'web:JsrwrapApiWrapper:v0.0.1',
		process.env.REFRESH_TOKEN!
	);
	await reddit.refreshAccessToken();
	account = await reddit.getMe();
});

describe('Account methods', () => {
	it("should get the current user's account ", async () => {
		expect(account.name).toBe('Blastose');
	});

	it('should get blocked users', async () => {
		expect((await account.getBlocked())[0].name).toBe('AlbertMendez44');
	});

	it("should get the user's trophies", async () => {
		expect((await account.getTrophies())[0].name).toBe('Seven-Year Club');
	});

	it("should get the user's karma breakdown", async () => {
		expect((await account.getKarmaBreakdown())[0].comment_karma).toBe(15);
	});

	it("should get the user's prefs", async () => {
		expect((await account.getPrefs()).beta).toBe(false);
	});
});
