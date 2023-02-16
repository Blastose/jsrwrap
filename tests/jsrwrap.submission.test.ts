/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Jsrwrap } from '../src/jsrwarp/index';
import { Submission } from '../src/jsrwarp/objects/submission';

let submission: Submission;

beforeAll(async () => {
	const reddit = new Jsrwrap(
		'N/A',
		process.env.CLIENT_ID!,
		process.env.CLIENT_SECRET!,
		'web:JsrwrapApiWrapper:v0.0.1',
		process.env.REFRESH_TOKEN!
	);
	await reddit.refreshAccessToken();
	submission = await reddit.getSubmission('10mr90y');
});

describe('Subreddit methods', () => {
	it('f', async () => {
		const su = await submission.get();
		console.log(su.title);
		su.comments.forEach((i) => {
			if (i.type === 'comment') console.log(`${i.ups} - ${i.body} by ${i.author}`);
		});
		expect('a').toBe(
			`Lad wrote a Python script to download Alexa voice recordings, he didn't expect this email.`
		);
	});
});
