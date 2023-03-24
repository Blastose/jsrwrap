import { Jsrwrap } from './jsrwrap.js';
import type { SubmissionData } from './types/submission.js';
import type { SubredditData } from './types/subreddit.js';
import type { ListingResponse, TResponse } from './types/redditAPIResponse.js';

type ListingParams = {
	before?: string;
	after?: string;
	count?: number;
	limit?: number;
};

type Time = 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';

type GetSubmissionOptions =
	| { sort: 'top' | 'controversial'; params: ListingParams & { t: Time } }
	| { sort: 'hot' | 'best' | 'rising' | 'new'; params: ListingParams };

function parseListingResponse<T>(res: ListingResponse<T>) {
	return res.data.children.map((child) => {
		return child.data;
	});
}

function extractData<T>(res: TResponse<T>) {
	return res.data;
}

export class Subreddit {
	private _reddit: Jsrwrap;

	constructor(_reddit: Jsrwrap, public subreddit: string) {
		this._reddit = _reddit;
	}

	async getAbout() {
		const res = await this._reddit.get<TResponse<SubredditData>>(`r/${this.subreddit}/about`);
		return extractData(res);
	}

	async getSubmissions(options: GetSubmissionOptions) {
		const res = await this._reddit.get<ListingResponse<SubmissionData>>(
			`r/${this.subreddit}/${options.sort}`,
			options.params
		);
		return parseListingResponse(res);
	}
}
