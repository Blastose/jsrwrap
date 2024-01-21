/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { describe, beforeAll, it, expect } from 'vitest';
import { Jsrwrap } from '../src/jsrwrap.js';
import { Submission } from '../src/submission.js';
import type { Replies } from '../src/types/comment.js';

function printReplies(replies: Replies) {
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

function printCommentTree(response: Awaited<ReturnType<Submission['fetch']>>) {
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
	let reddit: Jsrwrap;

	beforeAll(async () => {
		reddit = new Jsrwrap({
			accessToken: 'N/A',
			clientId: process.env.CLIENT_ID!,
			clientSecret: process.env.CLIENT_SECRET!,
			userAgent: 'web:JsrwrapApiWrapper:v0.0.1',
			refreshToken: process.env.REFRESH_TOKEN!
		});
		await reddit.refreshAccessToken();
	});

	it('fetches submission response and parses it', async () => {
		// Normal submission
		const submissionNextJs = await reddit.getSubmission('10mr90y').fetch();
		printCommentTree(submissionNextJs);

		// Submission with continue this thread
		const submissionCounting = await reddit.getSubmission('116gtzi').fetch();
		printCommentTree(submissionCounting);

		// Submission with load more comments as direct child
		const submissionAskreddit = await reddit.getSubmission('1135sc2').fetch();

		printCommentTree(submissionAskreddit);
	});

	it('gets more children comments', async () => {
		const childrenNextJs = await reddit.getSubmission('1135sc2').getMoreChildren({
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
		expect(childrenNextJs.length).toBe(15);
	});

	it('gets more children comments', async () => {
		await reddit.getSubmission('11fifjy').getMoreChildren({
			children: ['jakiqc4'],
			limit_children: false,
			sort: 'confidence'
		});
	});
});
