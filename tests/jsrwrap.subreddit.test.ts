/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Jsrwrap } from '../src/jsrwarp/index';
import { Subreddit } from '../src/jsrwarp/objects/subreddit';

let subreddit: Subreddit;

beforeAll(async () => {
	const reddit = new Jsrwrap(
		'N/A',
		process.env.CLIENT_ID!,
		process.env.CLIENT_SECRET!,
		'web:JsrwrapApiWrapper:v0.0.1',
		process.env.REFRESH_TOKEN!
	);
	await reddit.refreshAccessToken();
	subreddit = await reddit.getSubreddit('python');
});

describe('Subreddit methods', () => {
	// Test may fail if a new post becomes the top of all time
	it.only('should get Top submissions of all time', async () => {
		const python = await subreddit.getSubmissions({ sort: 'top', params: { t: 'all' } });
		python.forEach((v) => {
			console.log(`${v.title}, by ${v.author}`);
		});
		expect(python[0].title).toBe(
			`Lad wrote a Python script to download Alexa voice recordings, he didn't expect this email.`
		);
	});

	it('should only get 5 submissions', async () => {
		const python = await subreddit.getSubmissions({ sort: 'new', params: { limit: 5 } });
		expect(python.length).toBe(5);
	});
});
