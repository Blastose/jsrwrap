import type { FlairRichtext, Sort, SubredditType } from './submission.js';

export interface SubredditData {
	accept_followers: boolean;
	accounts_active: number;
	accounts_active_is_fuzzed: boolean;
	active_user_count: number;
	advertiser_category: string | null;
	all_original_content: boolean;
	allow_chat_post_creation: boolean;
	allow_discovery: boolean;
	allow_galleries: boolean;
	allow_images: boolean;
	allow_polls: boolean;
	allow_prediction_contributors: boolean;
	allow_predictions: boolean;
	allow_predictions_tournament: boolean;
	allow_talks: boolean;
	allow_videogifs: boolean;
	allow_videos: boolean;
	allowed_media_in_comments: AllowedMediaTypes[];
	banner_background_color: string;
	banner_background_image: string;
	banner_img: string;
	banner_size: [number, number] | null;
	can_assign_link_flair: boolean;
	can_assign_user_flair: boolean;
	collapse_deleted_comments: boolean;
	comment_contribution_settings: CommentContributionSettings;
	comment_score_hide_mins: number;
	community_icon: string;
	community_reviewed: boolean;
	created: number;
	created_utc: number;
	description: string;
	description_html: string;
	disable_contributor_requests: boolean;
	display_name: string;
	display_name_prefixed: string;
	emojis_custom_size: [number, number] | null;
	emojis_enabled: boolean;
	free_form_reports: boolean;
	has_menu_widget: boolean;
	header_img: string;
	header_size: [number, number] | null;
	header_title: string | null;
	hide_ads: boolean;
	icon_img: string;
	icon_size: [number, number] | null;
	id: string;
	is_chat_post_feature_enabled: boolean;
	is_crosspostable_subreddit: boolean | null;
	is_enrolled_in_new_modmail: boolean | null;
	key_color: string;
	lang: string;
	link_flair_enabled: boolean;
	link_flair_position: '' | 'left' | 'right';
	mobile_banner_image: string;
	name: string;
	notification_level: string | null;
	original_content_tag_enabled: boolean;
	over18: boolean;
	prediction_leaderboard_entry_type: string;
	primary_color: string;
	public_description: string;
	public_description_html: string;
	public_traffic: boolean;
	quarantine: boolean;
	restrict_commenting: boolean;
	restrict_posting: boolean;
	should_archive_posts: boolean;
	should_show_media_in_comments_setting: boolean;
	show_media: boolean;
	show_media_preview: boolean;
	spoilers_enabled: boolean;
	submission_type: string;
	submit_link_label: string;
	submit_text: string;
	submit_text_html: string | null;
	submit_text_label: string;
	subreddit_type: SubredditType;
	subscribers: number;
	suggested_comment_sort: Sort | null;
	title: string;
	url: string;
	user_can_flair_in_sr: boolean;
	user_flair_background_color: string | null;
	user_flair_css_class: string | null;
	user_flair_enabled_in_sr: boolean;
	user_flair_position: '' | 'left' | 'right';
	user_flair_richtext: FlairRichtext[];
	user_flair_template_id: string | null;
	user_flair_text: string | null;
	user_flair_text_color: 'dark' | 'light' | null;
	user_flair_type: string;
	user_has_favorited: boolean;
	user_is_banned: boolean;
	user_is_contributor: boolean;
	user_is_moderator: boolean;
	user_is_muted: boolean;
	user_is_subscriber: boolean;
	user_sr_flair_enabled: boolean;
	user_sr_theme_enabled: boolean;
	videostream_links_count: number;
	whitelist_status: string;
	wiki_enabled: boolean;
	wls: number;
}

type AllowedMediaTypes = 'giphy' | 'static' | 'animated';

export interface CommentContributionSettings {
	allowed_media_types: AllowedMediaTypes[];
}

export interface SubredditGatewayData {
	subreddits: {
		[key: string]: {
			title: string;
			displayText: string;
			name: string;
			url: string;
			isNSFW: boolean;
		};
	};
	subredditAboutInfo: {
		[key: string]: {
			accountsActive: number;
			publicDescription: string;
			created: number;
			subscribers: number;
		};
	};
	structuredStyles: StructuredStyles;
}

export interface WidgetBase {
	styles: {
		headerColor: string;
		backgroundColor: string;
	};
	shortName: string;
	id: string;
}

export type WidgetTextarea = WidgetBase & {
	kind: 'textarea';
	textHtml: string;
	text: string;
};

export type WidgetButton = WidgetBase & {
	kind: 'button';
	description: string;
	buttons: {
		url: string;
		text: string;
		kind: 'text';
		color: string;
	}[];
	descriptionHtml: string;
};

export type WidgetCommunityList = WidgetBase & {
	kind: 'community-list';
	data: {
		iconUrl: string;
		name: string;
		prefixedName: string;
		primaryColor: string;
		isSubscriber: boolean;
		type: 'subreddit';
		subscribers: number;
		communityIcon: string;
		isNSFW: boolean;
	}[];
};

export type WidgetPostFlair = WidgetBase & {
	kind: 'post-flair';
	templates: {
		[key: string]: {
			text: string;
			richtext: { e: string; t: string }[];
			backgroundColor: string;
			templateId: string;
			textColor: 'light' | 'dark';
			type: 'richtext';
		};
	};
	display: string;
};

export type WidgetModerators = WidgetBase & {
	kind: 'moderators';
	mods: unknown[];
	totalMods: number;
};

export type WidgetMenu = Omit<WidgetBase, 'shortName'> & {
	kind: 'menu';
	data: {
		url?: string;
		children?: { url: string; text: string }[];
		text: string;
	}[];
	showWiki: boolean;
};

export type WidgetIdCard = WidgetBase & {
	kind: 'id-card';
	description: string;
	subscribersText: string | null;
	currentlyViewingCount: number;
	subscribersCount: number;
	currentlyViewingText: string | null;
};

export type WidgetSubredditRules = WidgetBase & {
	kind: 'subreddit-rules';
	data: {
		violationReason: string;
		description: string;
		createdUtc: number;
		priority: number;
		descriptionHtml: string;
		shortName: string;
	}[];
	display: string;
};

export type WidgetImage = WidgetBase & {
	kind: 'image';
	data: {
		url: string;
		width: number;
		linkUrl: string | null;
		height: string;
	}[];
};

export type WidgetCalendar = WidgetBase & {
	kind: 'calendar';
	requiresSync: boolean;
	configuration: {
		showDescription: boolean;
		numEvents: number;
		showTime: boolean;
		showLocation: boolean;
		showTitle: boolean;
		showData: boolean;
	};
	data: {
		titleHtml: string;
		locationHtml: string;
		allDay: boolean;
		description: string | null;
		title: string;
		location: string;
		startTime: number;
		endTime: number;
	}[];
};

export type Widget =
	| WidgetTextarea
	| WidgetButton
	| WidgetCommunityList
	| WidgetPostFlair
	| WidgetModerators
	| WidgetMenu
	| WidgetIdCard
	| WidgetSubredditRules
	| WidgetImage
	| WidgetCalendar;

export interface StructuredStyles {
	data: {
		content: {
			widgets: {
				items: {
					[key: string]: Widget;
				};
				layout: {
					idCardWidget: string;
					topbar: {
						order: string[];
					};
					sidebar: {
						order: string[];
					};
					moderatorWidget: string;
				};
			};
		};
		style: StructuredStylesStyle;
	};
}

export interface StructuredStylesStyle {
	menuBackgroundBlur: null;
	bannerShowCommunityIcon: string;
	postDownvoteIconInactive: string;
	bannerCommunityNameFormat: string;
	postUpvoteIconInactive: string;
	highlightColor: null;
	menuBackgroundOpacity: string;
	postUpvoteCountColor: null;
	bannerHeight: string;
	postBackgroundColor: null;
	mobileBannerImage: string;
	bannerOverlayColor: string;
	bannerCommunityName: null;
	postDownvoteIconActive: string;
	postUpvoteIconActive: string;
	menuBackgroundColor: null;
	postBackgroundImagePosition: string;
	backgroundImage: string;
	backgroundImagePosition: string;
	backgroundColor: null;
	submenuBackgroundStyle: string;
	bannerBackgroundImagePosition: null;
	menuLinkColorInactive: string;
	bannerBackgroundColor: null;
	submenuBackgroundColor: string;
	sidebarWidgetHeaderColor: string;
	bannerPositionedImagePosition: null;
	bannerBackgroundImage: string;
	postDownvoteCountColor: null;
	postPlaceholderImagePosition: null;
	menuLinkColorHover: string;
	primaryColor: null;
	sidebarWidgetBackgroundColor: string;
	mobileKeyColor: string;
	menuPosition: string;
	postVoteIcons: string;
	menuLinkColorActive: string;
	bannerPositionedImage: null;
	secondaryBannerPositionedImage: null;
	menuBackgroundImage: null;
	postBackgroundImage: string;
	postPlaceholderImage: string;
	communityIcon: string;
	postTitleColor: null;
}
