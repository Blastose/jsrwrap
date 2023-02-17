import { Jsrwrap } from 'jsrwarp';
import type { Sort, Submission as SubmissionType } from 'jsrwarp/types/submission';
import type { ListingResponseFull, MoreResponse, TResponse } from 'jsrwarp/types/redditAPIResponse';
import type { Comment, CommentResponse } from 'jsrwarp/types/comment';

type SubmissionResponse = ListingResponseFull<[TResponse<SubmissionType>]>;
type SubmissionResponseComments = ListingResponseFull<
	(TResponse<CommentResponse> | MoreResponse)[]
>;

type GetSubmissionOptions = {
	comment?: string;
	context: number;
	depth?: number;
	limit?: number;
	showedits: boolean;
	showmedia: boolean;
	showtitle: boolean;
	sort: Sort;
	threaded: boolean;
	truncate: number;
};

function extractSubmissionInfo(res: SubmissionResponse) {
	return res.data.children[0].data;
}

function flattenComments(res: CommentResponse): Comment & { type: 'comment' } {
	if (res.replies === '') {
		return { ...(res as Comment), type: 'comment' as const };
	}
	const replies = res.replies.data.children.map((v) => {
		if (v.kind === 'more') {
			return { ...v.data, type: 'more' as const };
		}
		return flattenComments(v.data);
	});
	return { ...res, replies: replies, type: 'comment' as const };
}

function extractComments(
	res: SubmissionResponseComments
): ((Comment & { type: 'comment' }) | (MoreResponse['data'] & { type: 'more' }))[] {
	return res.data.children.map((item) => {
		if (item.kind !== 'more') {
			return { ...flattenComments(item.data) };
		} else {
			return { ...item.data, type: 'more' as const };
		}
	});
}

export class Submission {
	private _reddit: Jsrwrap;

	constructor(_reddit: Jsrwrap, public submissionId: string) {
		this._reddit = _reddit;
	}

	async fetch(options?: GetSubmissionOptions) {
		const [submission, comments] = await this._reddit.get<
			[SubmissionResponse, SubmissionResponseComments]
		>(`/comments/${this.submissionId}`, options);

		return {
			...extractSubmissionInfo(submission),
			comments: extractComments(comments)
		};
	}
}
