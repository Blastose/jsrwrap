import type { ListingResponse } from './types/redditAPIResponse.js';
import { Jsrwrap } from './jsrwrap.js';
import type { ListingParams, SubbredditSearchParamsSort, Time } from './subreddit.js';
import type { RedditUser } from './types/redditAccount.js';
import type { SubmissionData } from './types/submission.js';
import type { SubredditData } from './types/subreddit.js';

function parseListingResponseWithType(
	res: ListingResponse<SubmissionData | RedditUser | SubredditData>
):
	| { data: SubmissionData[]; type: 'post' }
	| { data: SubredditData[]; type: 'subreddit' }
	| { data: RedditUser[]; type: 'user' } {
	let data = res.data.children.map((child) => {
		return child.data;
	});
	let type: 'post' | 'subreddit' | 'user';
	if (res.data.children.at(0)?.kind === 't3') {
		type = 'post';
		data = data as SubmissionData[];
	} else if (res.data.children.at(0)?.kind === 't5') {
		type = 'subreddit';
		data = data as SubredditData[];
	} else if (res.data.children.at(0)?.kind === 't2') {
		type = 'user';
		data = data as RedditUser[];
	} else {
		type = 'post';
		data = data as SubmissionData[];
	}

	return { data, type } as
		| { data: SubmissionData[]; type: 'post' }
		| { data: SubredditData[]; type: 'subreddit' }
		| { data: RedditUser[]; type: 'user' };
}

export class Search {
	private _reddit: Jsrwrap;

	constructor(_reddit: Jsrwrap) {
		this._reddit = _reddit;
	}

	async search(params: SearchParams) {
		const res = await this._reddit.get<SearchResponse>(`search`, params);
		if (Array.isArray(res)) {
			throw new Error('Unsupported');
		}
		const data = parseListingResponseWithType(res);

		return {
			data: data,
			before: res.data.before,
			after: res.data.after,
			dist: res.data.dist
		};
	}
}

type SearchResponse =
	| ListingResponse<SubmissionData | RedditUser | SubredditData>
	| ListingResponse<SubmissionData | RedditUser | SubredditData>[];

export type SearchParamsSort = SubbredditSearchParamsSort;
export type SearchParams = ListingParams & {
	sort?: SubbredditSearchParamsSort;
	t?: Time;
	q?: string;
	restrict_sr?: boolean;
	type?: string;
	include_over_18?: 'on';
};
