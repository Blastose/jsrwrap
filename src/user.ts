import { Jsrwrap } from './jsrwrap.js';
import type { ListingResponseFull, TResponse } from './types/redditAPIResponse.js';
import { SubredditData } from './types/subreddit.js';
import { Comment } from './types/comment.js';
import { RedditUser } from './types/redditAccount.js';

function extractData<T>(res: ListingResponseFull<TResponse<T>[]>) {
	return res.data.children.map((v) => v.data);
}

function extractOverviewData(
	res: ListingResponseFull<TResponse<SubredditData | Comment>[]>
): ((SubredditData & { type: 'post' }) | (Comment & { type: 'comment' }))[] {
	return res.data.children.map((v) => {
		let type: 'comment' | 'post';
		if (v.kind === 't3') {
			type = 'post' as const;
			return { ...v.data, type } as SubredditData & { type: 'post' };
		} else {
			type = 'comment' as const;
			return { ...v.data, type } as Comment & { type: 'comment' };
		}
	});
}

type UserSortOptions = 'hot' | 'new' | 'top' | 'controversial';
type UserTOptions = 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';

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
		const res = await this._reddit.get<ListingResponseFull<TResponse<SubredditData | Comment>[]>>(
			`user/${this.username}/overview`,
			{ ...options }
		);
		return extractOverviewData(res);
	}

	async getSubmitted(options?: GetOptions) {
		const res = await this._reddit.get<ListingResponseFull<TResponse<SubredditData>[]>>(
			`user/${this.username}/submitted`,
			{ ...options }
		);
		return extractData<SubredditData>(res);
	}

	async getComments(options?: GetOptions) {
		const res = await this._reddit.get<ListingResponseFull<TResponse<Comment>[]>>(
			`user/${this.username}/comments`,
			{ ...options }
		);
		return extractData<Comment>(res);
	}

	async getGilded(options?: GetOptions) {
		const res = await this._reddit.get<ListingResponseFull<TResponse<SubredditData | Comment>[]>>(
			`user/${this.username}/gilded`,
			{ ...options }
		);
		return extractOverviewData(res);
	}
}
