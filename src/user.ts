import { Jsrwrap } from './jsrwrap.js';
import type { ListingResponseFull, TResponse } from './types/redditAPIResponse.js';
import { SubmissionData } from './types/submission.js';
import { Comment } from './types/comment.js';
import { RedditUser } from './types/redditAccount.js';

function extractData<T>(res: ListingResponseFull<TResponse<T>[]>) {
	return res.data.children.map((v) => v.data);
}

function extractOverviewData(
	res: ListingResponseFull<TResponse<SubmissionData | Comment>[]>
): ((SubmissionData & { type: 'post' }) | (Comment & { type: 'comment' }))[] {
	return res.data.children.map((v) => {
		let type: 'comment' | 'post';
		if (v.kind === 't3') {
			type = 'post' as const;
			return { ...v.data, type } as SubmissionData & { type: 'post' };
		} else {
			type = 'comment' as const;
			return { ...v.data, type } as Comment & { type: 'comment' };
		}
	});
}

export type UserSortOptions = 'hot' | 'new' | 'top' | 'controversial';
export type UserTOptions = 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';

type GetOptions = {
	context?: number;
	show?: 'given';
	t?: UserTOptions;
	type?: 'links' | 'comments';
	sort?: UserSortOptions;
	after?: string;
	before?: string;
	count?: number;
	limit?: number;
};

export class User {
	private _reddit: Jsrwrap;

	constructor(_reddit: Jsrwrap, public username: string) {
		this._reddit = _reddit;
	}

	async getAbout() {
		const res = await this._reddit.get<TResponse<RedditUser>>(`user/${this.username}/about`);
		return res.data;
	}

	async getOverview(options?: GetOptions) {
		const res = await this._reddit.get<ListingResponseFull<TResponse<SubmissionData | Comment>[]>>(
			`user/${this.username}/overview`,
			{ ...options }
		);

		return {
			data: extractOverviewData(res),
			before: res.data.before,
			after: res.data.after,
			dist: res.data.dist
		};
	}

	async getSubmitted(options?: GetOptions) {
		const res = await this._reddit.get<ListingResponseFull<TResponse<SubmissionData>[]>>(
			`user/${this.username}/submitted`,
			{ ...options }
		);
		return {
			data: extractData<SubmissionData>(res).map((v) => {
				return { ...v, type: 'post' };
			}) as (SubmissionData & { type: 'post' })[],
			before: res.data.before,
			after: res.data.after,
			dist: res.data.dist
		};
	}

	async getComments(options?: GetOptions) {
		const res = await this._reddit.get<
			ListingResponseFull<TResponse<Comment & { type: 'comment' }>[]>
		>(`user/${this.username}/comments`, { ...options });
		return {
			data: extractData<Comment & { type: 'comment' }>(res),
			before: res.data.before,
			after: res.data.after,
			dist: res.data.dist
		};
	}

	// Does not work anymore since Reddit removed gold
	async getGilded(options?: GetOptions) {
		const res = await this._reddit.get<ListingResponseFull<TResponse<SubmissionData | Comment>[]>>(
			`user/${this.username}/gilded`,
			{ ...options }
		);
		return extractOverviewData(res);
	}
}
