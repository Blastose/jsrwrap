import { Jsrwrap } from './jsrwrap.js';
import type { ListingResponseFull, TResponse } from './types/redditAPIResponse.js';
import { SubredditData } from './types/subreddit.js';
import { Comment } from './types/comment.js';

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

export class User {
	private _reddit: Jsrwrap;

	constructor(_reddit: Jsrwrap, public username: string) {
		this._reddit = _reddit;
	}

	async getOverview() {
		const res = await this._reddit.get<ListingResponseFull<TResponse<SubredditData | Comment>[]>>(
			`user/${this.username}/overview`
		);
		return extractOverviewData(res);
	}
}
