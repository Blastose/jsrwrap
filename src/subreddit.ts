import { Jsrwrap } from './jsrwrap.js';
import type { SubmissionData } from './types/submission.js';
import type { SubredditData, SubredditGatewayData, Widget } from './types/subreddit.js';
import type { ListingResponse, TResponse } from './types/redditAPIResponse.js';

type ListingParams = {
	before?: string;
	after?: string;
	count?: number;
	limit?: number;
};

type Time = 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';

type GetSubmissionOptions = {
	sort: 'top' | 'controversial' | 'hot' | 'best' | 'rising' | 'new';
	params?: ListingParams & { t?: Time };
};

type SearchParamsSort = 'relevance' | 'hot' | 'top' | 'new' | 'comments';
type SearchParams = ListingParams & {
	sort?: SearchParamsSort;
	t?: Time;
	q?: string;
	restrict_sr?: boolean;
};

function parseListingResponse<T>(res: ListingResponse<T>) {
	return res.data.children.map((child) => {
		return child.data;
	});
}

function extractData<T>(res: TResponse<T>) {
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

// Unused - Keeping for if it could be used later for getSidebar
// function getAboutFromGatewayData(data: SubredditGatewayData) {
// 	const id = Object.keys(data.subredditAboutInfo)[0];
// 	const about = data.subredditAboutInfo[id];
// 	const subredditInfo = data.subreddits[id];
// 	const style = data.structuredStyles.data.style;

// 	return {
// 		subscribers: about.subscribers,
// 		description: about.publicDescription,
// 		created: about.created,
// 		accountsActive: about.accountsActive,
// 		bannerBackgroundImage: style.bannerBackgroundImage,
// 		mobileBannerImage: style.mobileBannerImage,
// 		communityIcon: style.communityIcon
// 	};
// }

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

	async getSidebar() {
		const res = await fetch(
			`https://gateway.reddit.com/desktopapi/v1/subreddits/${this.subreddit}?allow_over18=1&include=structuredStyles`
		);

		const subGatewayData = (await res.json()) as SubredditGatewayData;
		const widgets = parseWidgets(subGatewayData);
		return widgets;
	}

	async search(params: SearchParams) {
		const res = await this._reddit.get<ListingResponse<SubmissionData>>(
			`r/${this.subreddit}/search`,
			params
		);
		return parseListingResponse(res);
	}
}
