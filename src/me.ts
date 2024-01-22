import { Jsrwrap } from './jsrwrap.js';
import { ListingResponse } from './types/redditAPIResponse.js';
import type { SubredditData } from './types/subreddit.js';
import { parseListingResponse } from './subreddit.js';
import { RedditUser } from './types/redditAccount.js';

export class Me {
	private _reddit: Jsrwrap;

	constructor(_reddit: Jsrwrap) {
		this._reddit = _reddit;
	}

	async getMe() {
		const res = await this._reddit.get<RedditUser>('api/v1/me');
		return res;
	}

	async getSubscribedSubreddits() {
		const res = await this._reddit.get<ListingResponse<SubredditData>>(`subreddits/mine`);
		const subs = parseListingResponse(res);
		return subs;
	}
}
