import { Jsrwrap } from 'jsrwarp';
import type { Sort, Submission as SubmissionType } from '../../jsrwarp/types/submission';
import type {
	ListingResponse,
	ListingResponseFull,
	MoreResponse,
	TResponse
} from '../../jsrwarp/types/redditAPIResponse';
import type {
	Comment,
	CommentResponse,
	Replies,
	RepliesResponse
} from '../../jsrwarp/types/comment';

type SubmissionResponse = ListingResponse<SubmissionType>;

type SubmissionResponseChildren = TResponse<CommentResponse> | MoreResponse;

type SubmissionCommentResponse = ListingResponseFull<SubmissionResponseChildren[]>;

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

function flattenComments(res: CommentResponse): any {
	if (res.replies === '') {
		return res;
	}
	const replies = res.replies.data.children.map((v) => {
		if (v.kind === 'more') {
			return { ...v.data, type: 'more' };
		}
		return flattenComments(v.data);
	});
	return { ...res, replies, type: 'comment' };
}

function extractComments(res: SubmissionCommentResponse) {
	return res.data.children.map((item) => {
		if (item.kind !== 'more') {
			return { ...item.data, type: 'comment' as const };
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

	async get(options?: GetSubmissionOptions) {
		const res = await this._reddit.get<[SubmissionResponse, SubmissionCommentResponse]>(
			`/comments/${this.submissionId}`,
			options
		);

		const [submission, comments] = res;

		return {
			...extractSubmissionInfo(submission),
			comments: extractComments(comments)
		};
	}
}
