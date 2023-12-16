export interface Features {
	awards_on_streams: boolean;
	chat: boolean;
	chat_group_rollout: boolean;
	chat_subreddit: boolean;
	chat_user_settings: boolean;
	cookie_consent_banner: boolean;
	crowd_control_for_post: boolean;
	do_not_track: boolean;
	expensive_coins_package: boolean;
	is_email_permission_required: boolean;
	mod_awards: boolean;
	mod_service_mute_reads: boolean;
	mod_service_mute_writes: boolean;
	modlog_copyright_removal: boolean;
	mweb_sharing_clipboard: Mweb;
	mweb_xpromo_interstitial_comments_android: boolean;
	mweb_xpromo_interstitial_comments_ios: boolean;
	mweb_xpromo_modal_listing_click_daily_dismissible_android: boolean;
	mweb_xpromo_modal_listing_click_daily_dismissible_ios: boolean;
	mweb_xpromo_revamp_v2: Mweb;
	mweb_xpromo_revamp_v3: Mweb;
	noreferrer_to_noopener: boolean;
	premium_subscriptions_table: boolean;
	promoted_trend_blanks: boolean;
	resized_styles_images: boolean;
	show_amp_link: boolean;
	spez_modal: boolean;
	use_pref_account_deployment: boolean;
}

export interface Mweb {
	experiment_id: number;
	owner: string;
	variant: string;
}

export interface User {
	date: number;
	id: string;
	name: string;
	rel_id: string;
}

export interface Trophy {
	award_id: null;
	description: null;
	granted_at: number;
	icon_40: string;
	icon_70: string;
	id: null;
	name: string;
	url: null;
}

export interface Karma {
	comment_karma: number;
	link_karma: number;
	sr: string;
}

export interface Prefs {
	accept_pms: string;
	activity_relevant_ads: boolean;
	allow_clicktracking: boolean;
	bad_comment_autocollapse: string;
	beta: boolean;
	clickgadget: boolean;
	collapse_left_bar: boolean;
	collapse_read_messages: boolean;
	compress: boolean;
	country_code: string;
	default_comment_sort: string;
	default_theme_sr: null;
	design_beta: boolean;
	domain_details: boolean;
	email_chat_request: boolean;
	email_comment_reply: boolean;
	email_community_discovery: boolean;
	email_digests: boolean;
	email_messages: boolean;
	email_new_user_welcome: boolean;
	email_post_reply: boolean;
	email_private_message: boolean;
	email_unsubscribe_all: boolean;
	email_upvote_comment: boolean;
	email_upvote_post: boolean;
	email_user_new_follower: boolean;
	email_username_mention: boolean;
	enable_default_themes: boolean;
	enable_followers: boolean;
	feed_recommendations_enabled: boolean;
	geopopular: string;
	hide_ads: boolean;
	hide_downs: boolean;
	hide_from_robots: boolean;
	hide_ups: boolean;
	highlight_controversial: boolean;
	highlight_new_comments: boolean;
	ignore_suggested_sort: boolean;
	label_nsfw: boolean;
	lang: string;
	layout: string;
	legacy_search: boolean;
	live_bar_recommendations_enabled: boolean;
	live_orangereds: boolean;
	mark_messages_read: boolean;
	media: string;
	media_preview: string;
	min_comment_score: number;
	min_link_score: number;
	monitor_mentions: boolean;
	newwindow: boolean;
	nightmode: boolean;
	no_profanity: boolean;
	num_comments: number;
	numsites: number;
	over_18: boolean;
	private_feeds: boolean;
	profile_opt_out: boolean;
	public_server_seconds: boolean;
	public_votes: boolean;
	research: boolean;
	search_include_over_18: boolean;
	send_crosspost_messages: boolean;
	send_welcome_messages: boolean;
	show_flair: boolean;
	show_gold_expiration: boolean;
	show_link_flair: boolean;
	show_location_based_recommendations: boolean;
	show_presence: boolean;
	show_snoovatar: boolean;
	show_stylesheets: boolean;
	show_trending: boolean;
	show_twitter: boolean;
	store_visits: boolean;
	survey_last_seen_time: null;
	third_party_data_personalized_ads: boolean;
	third_party_personalized_ads: boolean;
	third_party_site_data_personalized_ads: boolean;
	third_party_site_data_personalized_content: boolean;
	threaded_messages: boolean;
	threaded_modmail: boolean;
	top_karma_subreddits: boolean;
	use_global_defaults: boolean;
	video_autoplay: boolean;
}

export interface SubredditUser {
	accept_followers: boolean;
	allowed_media_in_comments: unknown[];
	banner_img: string;
	banner_size: null;
	coins: number;
	community_icon: null;
	default_set: boolean;
	description: string;
	disable_contributor_requests: boolean;
	display_name: string;
	display_name_prefixed: string;
	free_form_reports: boolean;
	header_img: null;
	header_size: null;
	icon_color: string;
	icon_img: string;
	icon_size: number[];
	is_default_banner: boolean;
	is_default_icon: boolean;
	key_color: string;
	link_flair_enabled: boolean;
	link_flair_position: string;
	name: string;
	over_18: boolean;
	previous_names: unknown[];
	primary_color: string;
	public_description: string;
	quarantine: boolean;
	restrict_commenting: boolean;
	restrict_posting: boolean;
	show_media: boolean;
	submit_link_label: string;
	submit_text_label: string;
	subreddit_type: string;
	subscribers: number;
	title: string;
	url: string;
	user_is_banned: boolean;
	user_is_contributor: boolean;
	user_is_moderator: boolean;
	user_is_muted: null;
	user_is_subscriber: boolean;
}

export interface RedditUser {
	accept_chats: boolean;
	accept_followers: boolean;
	accept_pms: boolean;
	awardee_karma: number;
	awarder_karma: number;
	comment_karma: number;
	created: number;
	created_utc: number;
	has_subscribed: boolean;
	has_verified_email: boolean;
	hide_from_robots: boolean;
	icon_img: string;
	id: string;
	is_blocked: boolean;
	is_employee: boolean;
	is_friend: boolean;
	is_gold: boolean;
	is_mod: boolean;
	is_suspended?: boolean;
	link_karma: number;
	name: string;
	pref_show_snoovatar: boolean;
	snoovatar_img: string;
	snoovatar_size: number[] | null;
	subreddit: RedditUserSubreddit;
	total_karma: number;
	verified: boolean;
}

export interface RedditUserSubreddit {
	accept_followers: boolean;
	allowed_media_in_comments: unknown[];
	banner_img: string;
	banner_size: null;
	community_icon: null;
	default_set: boolean;
	description: string;
	disable_contributor_requests: boolean;
	display_name: string;
	display_name_prefixed: string;
	free_form_reports: boolean;
	header_img: null;
	header_size: null;
	icon_color: string;
	icon_img: string;
	icon_size: [number, number];
	is_default_banner: boolean;
	is_default_icon: boolean;
	key_color: string;
	link_flair_enabled: boolean;
	link_flair_position: string;
	name: string;
	over_18: boolean;
	previous_names: unknown[];
	primary_color: string;
	public_description: string;
	quarantine: boolean;
	restrict_commenting: boolean;
	restrict_posting: boolean;
	show_media: boolean;
	submit_link_label: string;
	submit_text_label: string;
	subreddit_type: string;
	subscribers: number;
	title: string;
	url: string;
	user_is_banned: boolean;
	user_is_contributor: boolean;
	user_is_moderator: boolean;
	user_is_muted: null;
	user_is_subscriber: boolean;
}
