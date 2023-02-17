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
	submission = await reddit.getSubmission('10mr90y');
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
});
