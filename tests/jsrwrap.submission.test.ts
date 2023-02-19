/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Jsrwrap } from '../src/jsrwrap/index';
import { Submission } from '../src/jsrwrap/objects/submission';
import type { Replies } from '../src/jsrwrap/types/comment';

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
	submission = reddit.getSubmission('10mr90y');
});

function printReplies(replies: Replies) {
	if (replies !== '') {
		replies.forEach((c) => {
			if (c.type === 'comment') {
				// console.log(c.body);
				c.body;
				printReplies(c.replies);
			} else {
				// console.log(`Load ${c.count} more comments`);
				c.count;
			}
		});
	}
}

function printCommentTree(response: Awaited<ReturnType<typeof submission.fetch>>) {
	const comments = response.comments;
	comments.forEach((comm) => {
		if (comm.type === 'comment') {
			// console.log(comm.body);
			comm.body;
			printReplies(comm.replies);
		}
	});
}

describe('Submission methods', () => {
	it('fetches submission response and parses it', async () => {
		const submissionResult = await submission.fetch();
		expect(() => {
			printCommentTree(submissionResult);
		}).not.toThrow();
	});

	it('gets more children comments', async () => {
		const children = await submission.getMoreChildren('1135sc2', {
			children: [
				'j8py668',
				'j8qwy1n',
				'j8qmron',
				'j8pgj4s',
				'j8ownzd',
				'j8piyml',
				'j8pz6mm',
				'j8p7pe9',
				'j8qayoi',
				'j8q9ok7',
				'j8q8dx5',
				'j8qyrbt',
				'j8pig1n',
				'j8py4ik',
				'j8q1b1b'
			],
			limit_children: false,
			sort: 'confidence'
		});
		expect(children.length).toBe(15);
	});
});
