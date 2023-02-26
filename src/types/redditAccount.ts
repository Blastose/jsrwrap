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

export interface User {
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

export interface Prefs {
  beta: boolean;
  default_theme_sr: null;
  threaded_messages: boolean;
  email_comment_reply: boolean;
  private_feeds: boolean;
  activity_relevant_ads: boolean;
  email_messages: boolean;
  profile_opt_out: boolean;
  video_autoplay: boolean;
  email_private_message: boolean;
  geopopular: string;
  show_link_flair: boolean;
  hide_ups: boolean;
  show_trending: boolean;
  send_welcome_messages: boolean;
  country_code: string;
  design_beta: boolean;
  monitor_mentions: boolean;
  hide_downs: boolean;
  clickgadget: boolean;
  lang: string;
  ignore_suggested_sort: boolean;
  show_presence: boolean;
  email_upvote_comment: boolean;
  email_digests: boolean;
  layout: string;
  num_comments: number;
  feed_recommendations_enabled: boolean;
  label_nsfw: boolean;
  research: boolean;
  use_global_defaults: boolean;
  show_snoovatar: boolean;
  over_18: boolean;
  legacy_search: boolean;
  live_orangereds: boolean;
  highlight_controversial: boolean;
  no_profanity: boolean;
  domain_details: boolean;
  collapse_left_bar: boolean;
  email_community_discovery: boolean;
  bad_comment_autocollapse: string;
  live_bar_recommendations_enabled: boolean;
  third_party_data_personalized_ads: boolean;
  email_chat_request: boolean;
  allow_clicktracking: boolean;
  hide_from_robots: boolean;
  show_twitter: boolean;
  compress: boolean;
  accept_pms: string;
  store_visits: boolean;
  threaded_modmail: boolean;
  email_upvote_post: boolean;
  min_link_score: number;
  media_preview: string;
  email_user_new_follower: boolean;
  nightmode: boolean;
  enable_default_themes: boolean;
  third_party_site_data_personalized_content: boolean;
  third_party_site_data_personalized_ads: boolean;
  survey_last_seen_time: null;
  show_stylesheets: boolean;
  enable_followers: boolean;
  email_new_user_welcome: boolean;
  public_votes: boolean;
  email_post_reply: boolean;
  collapse_read_messages: boolean;
  show_flair: boolean;
  mark_messages_read: boolean;
  search_include_over_18: boolean;
  hide_ads: boolean;
  third_party_personalized_ads: boolean;
  email_username_mention: boolean;
  top_karma_subreddits: boolean;
  newwindow: boolean;
  numsites: number;
  min_comment_score: number;
  send_crosspost_messages: boolean;
  media: string;
  public_server_seconds: boolean;
  show_gold_expiration: boolean;
  highlight_new_comments: boolean;
  email_unsubscribe_all: boolean;
  default_comment_sort: string;
  show_location_based_recommendations: boolean;
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
  previous_names: unknown[];
  over_18: boolean;
  icon_size: number[];
  primary_color: string;
  icon_img: string;
  description: string;
  allowed_media_in_comments: unknown[];
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
