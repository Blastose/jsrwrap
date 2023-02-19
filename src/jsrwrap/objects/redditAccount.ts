import { Jsrwrap } from '../../../src/jsrwrap/index.js';
import { Features, Subreddit, User, Trophy, Karma, Prefs } from '../types/redditAccount.js';
import { extractData, Data } from '../utils/extractData.js';

export class RedditAccount {
	private _reddit: Jsrwrap;
	constructor(
		_reddit: Jsrwrap,
		public is_employee: boolean,
		public seen_layout_switch: boolean,
		public has_visited_new_profile: boolean,
		public pref_no_profanity: boolean,
		public has_external_account: boolean,
		public pref_geopopular: string,
		public seen_redesign_modal: boolean,
		public pref_show_trending: boolean,
		public subreddit: Subreddit,
		public pref_show_presence: boolean,
		public snoovatar_img: string,
		public snoovatar_size: null,
		public gold_expiration: null,
		public has_gold_subscription: boolean,
		public is_sponsor: boolean,
		public num_friends: number,
		public features: Features,
		public can_edit_name: boolean,
		public verified: boolean,
		public new_modmail_exists: boolean,
		public pref_autoplay: boolean,
		public coins: number,
		public has_paypal_subscription: boolean,
		public has_subscribed_to_premium: boolean,
		public id: string,
		public has_stripe_subscription: boolean,
		public oauth_client_id: string,
		public can_create_subreddit: boolean,
		public over_18: boolean,
		public is_gold: boolean,
		public is_mod: boolean,
		public awarder_karma: number,
		public suspension_expiration_utc: null,
		public has_verified_email: boolean,
		public is_suspended: boolean,
		public pref_video_autoplay: boolean,
		public in_chat: boolean,
		public has_android_subscription: boolean,
		public in_redesign_beta: boolean,
		public icon_img: string,
		public has_mod_mail: boolean,
		public pref_nightmode: boolean,
		public awardee_karma: number,
		public hide_from_robots: boolean,
		public password_set: boolean,
		public link_karma: number,
		public force_password_reset: boolean,
		public total_karma: number,
		public seen_give_award_tooltip: boolean,
		public inbox_count: number,
		public seen_premium_adblock_modal: boolean,
		public pref_top_karma_subreddits: boolean,
		public has_mail: boolean,
		public pref_show_snoovatar: boolean,
		public name: string,
		public pref_clickgadget: number,
		public created: number,
		public gold_creddits: number,
		public created_utc: number,
		public has_ios_subscription: boolean,
		public pref_show_twitter: boolean,
		public in_beta: boolean,
		public comment_karma: number,
		public accept_followers: boolean,
		public has_subscribed: boolean,
		public linked_identities: any[],
		public seen_subreddit_chat_ftux: boolean
	) {
		this._reddit = _reddit;
	}

	setJsrwrap(r: Jsrwrap) {
		this._reddit = r;
	}

	async getKarmaBreakdown() {
		const data = (await this._reddit.get('api/v1/me/karma')) as Data;
		return data.data as Karma[];
	}

	// TODO: This endpoint is a listing
	async getBlocked() {
		const data = (await this._reddit.get('prefs/blocked')) as Data;
		return data.data.children as User[];
	}

	async getTrophies() {
		const data = (await this._reddit.get('api/v1/me/trophies')) as Data;
		return extractData(data.data.trophies) as Trophy[];
	}

	async getPrefs() {
		const data = (await this._reddit.get('api/v1/me/prefs')) as Prefs;
		return data;
	}

	async updatePrefs(prefs: Prefs) {
		await this._reddit.patch('api/v1/me/prefs', JSON.stringify(prefs));
	}

	// TODO: This endpoint is a listing
	async getFriends() {
		const data = (await this._reddit.get('api/v1/me/friends')) as Data;
		return data.data.children as User[];
	}
}
