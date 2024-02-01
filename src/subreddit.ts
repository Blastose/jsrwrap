import { Jsrwrap } from './jsrwrap.js';
import type { SubmissionData } from './types/submission.js';
import type { SubredditData, SubredditGatewayData, Widget } from './types/subreddit.js';
import type { ListingResponse, TResponse } from './types/redditAPIResponse.js';

export type ListingParams = {
	before?: string;
	after?: string;
	count?: number;
	limit?: number;
};

export type Time = 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';

type GetSubmissionOptions = {
	sort: 'top' | 'controversial' | 'hot' | 'best' | 'rising' | 'new';
	params?: ListingParams & { t?: Time };
};

export type SubbredditSearchParamsSort = 'relevance' | 'hot' | 'top' | 'new' | 'comments';
export type SubbredditSearchParams = ListingParams & {
	sort?: SubbredditSearchParamsSort;
	t?: Time;
	q?: string;
	restrict_sr?: boolean;
	include_over_18?: 'on';
};

export function parseListingResponse<T>(res: ListingResponse<T>) {
	return res.data.children.map((child) => {
		return child.data;
	});
}

export function extractData<T>(res: TResponse<T>) {
	return res.data;
}

function parseWidgets(data: SubredditGatewayData) {
	const widgets: Widget[] = [];
	const widgetItems = data.structuredStyles.data.content.widgets.items;
	const widgetLayoutInfo = data.structuredStyles.data.content.widgets.layout;

	widgets.push(widgetItems[widgetLayoutInfo.idCardWidget]);
	for (const item of widgetLayoutInfo.topbar.order) {
		widgets.push(widgetItems[item]);
	}
	for (const item of widgetLayoutInfo.sidebar.order) {
		widgets.push(widgetItems[item]);
	}
	return widgets;
}

export class Subreddit {
	private _reddit: Jsrwrap;

	constructor(_reddit: Jsrwrap, public subreddit: string | undefined) {
		this._reddit = _reddit;
	}

	async getAbout() {
		const res = await this._reddit.get<TResponse<SubredditData>>(`r/${this.subreddit}/about`);
		return extractData(res);
	}

	async getSubmissions(options: GetSubmissionOptions) {
		if (this.subreddit === undefined) {
			const res = await this._reddit.get<ListingResponse<SubmissionData>>(
				`${options.sort}`,
				options.params
			);
			return parseListingResponse(res);
		}

		const res = await this._reddit.get<ListingResponse<SubmissionData>>(
			`r/${this.subreddit}/${options.sort}`,
			options.params
		);
		return parseListingResponse(res);
	}

	async getSidebar() {
		const res = await fetch(
			`https://gateway.reddit.com/desktopapi/v1/subreddits/${this.subreddit}?allow_over18=1&include=structuredStyles`
		);

		let subGatewayData = (await res.json()) as unknown as any;
		if (subGatewayData?.data?.account === null) {
			return null;
		}
		subGatewayData = subGatewayData as SubredditGatewayData;
		const widgets = parseWidgets(subGatewayData);
		return widgets;
	}

	async getModerators() {
		type AboutModeratorsResponse = {
			kind: 'UserList';
			data: {
				children: {
					name: string;
					author_flair_text: string;
					mod_permissions: string[];
					date: number;
					rel_id: string;
					id: string;
					author_flair_css_class: null;
				}[];
			};
		};

		const res = await this._reddit.get<AboutModeratorsResponse>(
			`r/${this.subreddit}/about/moderators`
		);

		return res.data.children;
	}

	async search(params: SubbredditSearchParams) {
		const res = await this._reddit.get<ListingResponse<SubmissionData>>(
			`r/${this.subreddit}/search`,
			params
		);
		return {
			data: parseListingResponse(res),
			before: res.data.before,
			after: res.data.after,
			dist: res.data.dist
		};
	}
}
