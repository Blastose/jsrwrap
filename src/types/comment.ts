import { FlairRichtext, Gildings, SubredditType, MediaMetadata } from './submission.js';
import type { ListingResponseFull, MoreResponse, TResponse } from './redditAPIResponse.js';

export type MoreChildrenResponse = {
	json: {
		errors: unknown[];
		data: {
			things: (TResponse<Omit<Comment, 'replies'> & { replies: '' }> | MoreResponse)[];
		};
	};
};

export type CommentResponse = Omit<Comment, 'replies'> & {
	replies: RepliesResponse;
};
export type RepliesResponse =
	| ListingResponseFull<(TResponse<CommentResponse> | MoreResponse)[]>
	| '';

export type CommentFull =
	| (Comment & { type: 'comment' })
	| (MoreResponse['data'] & { type: 'more' });

export type Replies = CommentFull[];

export interface Comment {
	all_awardings: Awardings[];
	approved_at_utc: number | null;
	approved_by: string | null;
	archived: boolean;
	associated_award: null;
	author: string;
	author_flair_background_color: string | null;
	author_flair_css_class: string | null;
	author_flair_richtext: FlairRichtext[];
	author_flair_template_id: string | null;
	author_flair_text: string | null;
	author_flair_text_color: string | null;
	author_flair_type: 'text' | 'richtext';
	author_fullname: string;
	author_is_blocked: boolean;
	author_patreon_flair: boolean;
	author_premium: boolean;
	awarders: unknown[];
	banned_at_utc: number | null;
	banned_by: string | null;
	body: string;
	body_html: string;
	can_gild: boolean;
	can_mod_post: boolean;
	collapsed: boolean;
	collapsed_because_crowd_control: null;
	collapsed_reason: null;
	collapsed_reason_code: 'deleted' | string | null;
	comment_type: null;
	controversiality: number;
	created: number;
	created_utc: number;
	depth: number;
	distinguished: 'admin' | 'moderator' | null;
	downs: number;
	edited: number | boolean;
	gilded: number;
	gildings: Gildings;
	id: string;
	is_submitter: boolean;
	likes: boolean | null;
	link_author?: string; // from overview endpoint
	link_id: string;
	link_title?: string; // from overview endpoint
	locked: boolean;
	media_metadata?: MediaMetadata;
	mod_note: string | null;
	mod_reason_by: string | null;
	mod_reason_title: string | null;
	mod_reports: string[];
	name: string;
	no_follow: boolean;
	num_comments?: number; // from overview endpoint
	num_reports: number | null;
	parent_id: string;
	permalink: string;
	removal_reason: null;
	replies: Replies;
	report_reasons: null;
	saved: boolean;
	score: number;
	score_hidden: boolean;
	send_replies: boolean;
	stickied: boolean;
	subreddit: string;
	subreddit_id: string;
	subreddit_name_prefixed: string;
	subreddit_type: SubredditType;
	top_awarded_type: null;
	total_awards_received: number;
	treatment_tags: unknown[];
	unrepliable_reason: null;
	ups: number;
	user_reports: unknown[];
}

export interface Awardings {
	award_sub_type: string;
	award_type: string;
	awardings_required_to_grant_benefits: null;
	coin_price: number;
	coin_reward: number;
	count: number;
	days_of_drip_extension: null;
	days_of_premium: null;
	description: string;
	end_date: null;
	giver_coin_reward: null;
	icon_format: string;
	icon_height: number;
	icon_url: string;
	icon_width: number;
	id: string;
	is_enabled: boolean;
	is_new: boolean;
	name: string;
	penny_donate: null;
	penny_price: number;
	resized_icons: ResizedIcon[];
	resized_static_icons: ResizedIcon[];
	start_date: null;
	static_icon_height: number;
	static_icon_url: string;
	static_icon_width: number;
	sticky_duration_seconds: null;
	subreddit_coin_reward: number;
	subreddit_id: null;
	tiers_by_required_awardings: null;
}

export interface ResizedIcon {
	height: number;
	url: string;
	width: number;
}
