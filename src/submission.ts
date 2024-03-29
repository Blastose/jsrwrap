import { Jsrwrap } from './jsrwrap.js';
import type { Sort, SubmissionData } from './types/submission.js';
import type { ListingResponseFull, MoreResponse, TResponse } from './types/redditAPIResponse.js';
import type {
	Comment,
	CommentFull,
	CommentResponse,
	MoreChildrenResponse,
	Replies
} from './types/comment.js';

type SubmissionResponse = ListingResponseFull<[TResponse<SubmissionData>]>;
type SubmissionResponseComments = ListingResponseFull<
	(TResponse<CommentResponse> | MoreResponse)[]
>;

type GetSubmissionOptions = {
	comment?: string;
	context?: number;
	depth?: number;
	limit?: number;
	showedits?: boolean;
	showmedia?: boolean;
	showtitle?: boolean;
	sort?: Sort;
	threaded?: boolean;
	truncate?: number;
};

type MorechildrenOptions = {
	children: string[];
	limit_children: boolean;
	sort?: Sort;
};

function extractSubmissionInfo(res: SubmissionResponse) {
	return res.data.children[0].data;
}

function flattenComments(res: CommentResponse): Comment & { type: 'comment' } {
	if (res.replies === '') {
		return {
			...(res as unknown as Comment),
			replies: [],
			type: 'comment' as const
		};
	}
	const replies = res.replies.data.children.map((v) => {
		if (v.kind === 'more') {
			return { ...v.data, type: 'more' as const };
		}
		return flattenComments(v.data);
	});
	return { ...res, replies: replies, type: 'comment' as const };
}

function extractComments(res: SubmissionResponseComments): CommentFull[] {
	return res.data.children.map((item) => {
		if (item.kind !== 'more') {
			return { ...flattenComments(item.data) };
		} else {
			return { ...item.data, type: 'more' as const };
		}
	});
}

function removePrefix(text: string, textToRemove: string) {
	return text.replace(textToRemove, '');
}

function buildMoreChildrenTree(
	things: (TResponse<Omit<Comment, 'replies'> & { replies: '' }> | MoreResponse)[]
) {
	const commentData = things.map((thing) => {
		if (thing.kind === 'more') {
			return { ...thing.data, type: 'more' as const };
		} else {
			return {
				...thing.data,
				replies: [] as Replies,
				type: 'comment' as const
			};
		}
	});

	const commentMap = new Map<string, (typeof commentData)[number]>();

	const treeArray = commentData.reduce((resultArray, currentItem) => {
		commentMap.set(currentItem.id, currentItem);

		const parentComment = commentMap.get(removePrefix(currentItem.parent_id, 't1_'));
		if (parentComment) {
			if (parentComment.type !== 'more') {
				if (currentItem.type === 'more') {
					parentComment.replies.push(currentItem);
				} else {
					parentComment.replies.push(currentItem);
				}
			}
		} else {
			resultArray.push(currentItem);
		}
		return resultArray;
	}, [] as CommentFull[]);

	return treeArray;
}

function buildChildrenString(children: string[]) {
	return children.join(',');
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

	async getMoreChildren(params: MorechildrenOptions) {
		const res = await this._reddit.post<MoreChildrenResponse>(`api/morechildren`, {
			...params,
			api_type: 'json',
			link_id: `t3_${this.submissionId}`,
			children: buildChildrenString(params.children)
		});

		return buildMoreChildrenTree(res.json.data.things);
	}
}
