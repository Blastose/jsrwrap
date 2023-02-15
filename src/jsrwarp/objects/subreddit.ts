import { Jsrwrap } from 'jsrwarp';
import { Submission } from 'jsrwarp/types/submission';

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

type RedditListingResponse<T> = {
	kind: 'listing';
	data: {
		before: string | null;
		after: string | null;
		dis: number;
		modhash: string;
		geo_filter: string;
		children: ChildData<T>[];
	};
};

type ChildData<T> = {
	kind: string;
	data: T;
};

function parseListingResponse<T>(res: RedditListingResponse<T>) {
	return res.data.children.map((child) => {
		return child.data;
	});
}

export class Subreddit {
	private _reddit: Jsrwrap;

	constructor(_reddit: Jsrwrap, public subreddit: string) {
		this._reddit = _reddit;
	}

	async getSubmissions(options: GetSubmissionOptions) {
		const res = await this._reddit.get<RedditListingResponse<Submission>>(
			`r/${this.subreddit}/${options.sort}`,
			options.params
		);
		return parseListingResponse<Submission>(res);
	}
}
