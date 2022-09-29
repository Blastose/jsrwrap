export interface Features {
	mod_service_mute_writes: boolean;
	promoted_trend_blanks: boolean;
	show_amp_link: boolean;
	chat: boolean;
	is_email_permission_required: boolean;
	mod_awards: boolean;
	mweb_xpromo_revamp_v3: Mweb;
	mweb_xpromo_revamp_v2: Mweb;
	awards_on_streams: boolean;
	mweb_xpromo_modal_listing_click_daily_dismissible_ios: boolean;
	chat_subreddit: boolean;
	cookie_consent_banner: boolean;
	modlog_copyright_removal: boolean;
	do_not_track: boolean;
	mod_service_mute_reads: boolean;
	chat_user_settings: boolean;
	use_pref_account_deployment: boolean;
	mweb_xpromo_interstitial_comments_ios: boolean;
	mweb_xpromo_modal_listing_click_daily_dismissible_android: boolean;
	premium_subscriptions_table: boolean;
	mweb_xpromo_interstitial_comments_android: boolean;
	crowd_control_for_post: boolean;
	noreferrer_to_noopener: boolean;
	chat_group_rollout: boolean;
	resized_styles_images: boolean;
	spez_modal: boolean;
	mweb_sharing_clipboard: Mweb;
	expensive_coins_package: boolean;
}

export interface Mweb {
	owner: string;
	variant: string;
	experiment_id: number;
}

export interface Blocked {
	date: number;
	rel_id: string;
	name: string;
	id: string;
}

export interface Trophy {
	icon_70: string;
	granted_at: number;
	url: null;
	icon_40: string;
	name: string;
	award_id: null;
	id: null;
	description: null;
}

export interface Karma {
	sr: string;
	comment_karma: number;
	link_karma: number;
}

export interface Subreddit {
	default_set: boolean;
	user_is_contributor: boolean;
	banner_img: string;
	restrict_posting: boolean;
	user_is_banned: boolean;
	free_form_reports: boolean;
	community_icon: null;
	show_media: boolean;
	icon_color: string;
	user_is_muted: null;
	display_name: string;
	header_img: null;
	title: string;
	coins: number;
	previous_names: any[];
	over_18: boolean;
	icon_size: number[];
	primary_color: string;
	icon_img: string;
	description: string;
	allowed_media_in_comments: any[];
	submit_link_label: string;
	header_size: null;
	restrict_commenting: boolean;
	subscribers: number;
	submit_text_label: string;
	is_default_icon: boolean;
	link_flair_position: string;
	display_name_prefixed: string;
	key_color: string;
	name: string;
	is_default_banner: boolean;
	url: string;
	quarantine: boolean;
	banner_size: null;
	user_is_moderator: boolean;
	accept_followers: boolean;
	public_description: string;
	link_flair_enabled: boolean;
	disable_contributor_requests: boolean;
	subreddit_type: string;
	user_is_subscriber: boolean;
}
