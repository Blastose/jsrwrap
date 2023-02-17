/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Jsrwrap } from '../src/jsrwarp/index';
import { Submission } from '../src/jsrwarp/objects/submission';
import type { Comment, CommentResponse, RepliesResponse } from '../src/jsrwarp/types/comment';

let submission: Submission;

const testJsonComment = {
	subreddit_id: 't5_2qh1i',
	approved_at_utc: null,
	author_is_blocked: false,
	comment_type: null,
	awarders: [],
	mod_reason_by: null,
	banned_by: null,
	author_flair_type: 'text',
	total_awards_received: 0,
	subreddit: 'AskReddit',
	author_flair_template_id: null,
	likes: null,
	replies: {
		kind: 'Listing',
		data: {
			after: null,
			dist: null,
			modhash: null,
			geo_filter: '',
			children: [
				{
					kind: 't1',
					data: {
						subreddit_id: 't5_2qh1i',
						approved_at_utc: null,
						author_is_blocked: false,
						comment_type: null,
						awarders: [],
						mod_reason_by: null,
						banned_by: null,
						author_flair_type: 'text',
						total_awards_received: 0,
						subreddit: 'AskReddit',
						author_flair_template_id: null,
						likes: null,
						replies: {
							kind: 'Listing',
							data: {
								after: null,
								dist: null,
								modhash: null,
								geo_filter: '',
								children: [
									{
										kind: 't1',
										data: {
											subreddit_id: 't5_2qh1i',
											approved_at_utc: null,
											author_is_blocked: false,
											comment_type: null,
											awarders: [],
											mod_reason_by: null,
											banned_by: null,
											author_flair_type: 'text',
											total_awards_received: 0,
											subreddit: 'AskReddit',
											author_flair_template_id: null,
											likes: null,
											replies: {
												kind: 'Listing',
												data: {
													after: null,
													dist: null,
													modhash: null,
													geo_filter: '',
													children: [
														{
															kind: 't1',
															data: {
																subreddit_id: 't5_2qh1i',
																approved_at_utc: null,
																author_is_blocked: false,
																comment_type: null,
																awarders: [],
																mod_reason_by: null,
																banned_by: null,
																author_flair_type: 'text',
																total_awards_received: 0,
																subreddit: 'AskReddit',
																author_flair_template_id: null,
																likes: null,
																replies: {
																	kind: 'Listing',
																	data: {
																		after: null,
																		dist: null,
																		modhash: null,
																		geo_filter: '',
																		children: [
																			{
																				kind: 't1',
																				data: {
																					subreddit_id: 't5_2qh1i',
																					approved_at_utc: null,
																					author_is_blocked: false,
																					comment_type: null,
																					awarders: [],
																					mod_reason_by: null,
																					banned_by: null,
																					author_flair_type: 'text',
																					total_awards_received: 0,
																					subreddit: 'AskReddit',
																					author_flair_template_id: null,
																					distinguished: null,
																					likes: null,
																					replies: {
																						kind: 'Listing',
																						data: {
																							after: null,
																							dist: null,
																							modhash: null,
																							geo_filter: '',
																							children: [
																								{
																									kind: 't1',
																									data: {
																										subreddit_id: 't5_2qh1i',
																										approved_at_utc: null,
																										author_is_blocked: false,
																										comment_type: null,
																										awarders: [],
																										mod_reason_by: null,
																										banned_by: null,
																										author_flair_type: 'text',
																										total_awards_received: 0,
																										subreddit: 'AskReddit',
																										author_flair_template_id: null,
																										distinguished: null,
																										likes: null,
																										replies: '',
																										user_reports: [],
																										saved: false,
																										id: 'j8qw4ol',
																										banned_at_utc: null,
																										mod_reason_title: null,
																										gilded: 0,
																										archived: false,
																										collapsed_reason_code: null,
																										no_follow: true,
																										author: 'snp3rk',
																										can_mod_post: false,
																										send_replies: true,
																										parent_id: 't1_j8qixu2',
																										score: 14,
																										author_fullname: 't2_ics93',
																										approved_by: null,
																										mod_note: null,
																										all_awardings: [],
																										body: 'Same mid 90s, as I was graduating highschool smoking was really frowned upon my peers as something really lame, and now barely a decade later and almost every 18-29 year old that I interact with is vaping.',
																										edited: false,
																										gildings: {},
																										downs: 0,
																										author_flair_css_class: null,
																										name: 't1_j8qw4ol',
																										is_submitter: false,
																										collapsed: false,
																										author_flair_richtext: [],
																										author_patreon_flair: false,
																										body_html:
																											'&lt;div class="md"&gt;&lt;p&gt;Same mid 90s, as I was graduating highschool smoking was really frowned upon my peers as something really lame, and now barely a decade later and almost every 18-29 year old that I interact with is vaping.&lt;/p&gt;\n&lt;/div&gt;',
																										removal_reason: null,
																										collapsed_reason: null,
																										link_id: 't3_1135sc2',
																										associated_award: null,
																										stickied: false,
																										author_premium: false,
																										can_gild: true,
																										top_awarded_type: null,
																										unrepliable_reason: null,
																										author_flair_text_color: null,
																										score_hidden: false,
																										permalink:
																											'/r/AskReddit/comments/1135sc2/whats_something_the_us_does_better_than_europe/j8qw4ol/',
																										subreddit_type: 'public',
																										locked: false,
																										report_reasons: null,
																										created: 1676536047.0,
																										author_flair_text: null,
																										treatment_tags: [],
																										created_utc: 1676536047.0,
																										subreddit_name_prefixed: 'r/AskReddit',
																										controversiality: 0,
																										depth: 5,
																										author_flair_background_color: null,
																										collapsed_because_crowd_control: null,
																										mod_reports: [],
																										num_reports: null,
																										ups: 14
																									}
																								},
																								{
																									kind: 'more',
																									data: {
																										count: 1,
																										name: 't1_j8r5dme',
																										id: 'j8r5dme',
																										parent_id: 't1_j8qixu2',
																										depth: 5,
																										children: ['j8r5dme']
																									}
																								}
																							],
																							before: null
																						}
																					},
																					user_reports: [],
																					saved: false,
																					id: 'j8qixu2',
																					banned_at_utc: null,
																					mod_reason_title: null,
																					gilded: 0,
																					archived: false,
																					collapsed_reason_code: null,
																					no_follow: true,
																					author: 'jquiggles',
																					can_mod_post: false,
																					send_replies: true,
																					parent_id: 't1_j8prsqu',
																					score: 75,
																					author_fullname: 't2_wdrsc',
																					removal_reason: null,
																					approved_by: null,
																					mod_note: null,
																					all_awardings: [],
																					body: "God it's sad. Born in the mid 90s, I feel like no one from my class smoked. Now every Gen Z kid I see has a vape.",
																					edited: false,
																					author_flair_css_class: null,
																					name: 't1_j8qixu2',
																					is_submitter: false,
																					downs: 0,
																					author_flair_richtext: [],
																					author_patreon_flair: false,
																					body_html:
																						'&lt;div class="md"&gt;&lt;p&gt;God it&amp;#39;s sad. Born in the mid 90s, I feel like no one from my class smoked. Now every Gen Z kid I see has a vape.&lt;/p&gt;\n&lt;/div&gt;',
																					gildings: {},
																					collapsed_reason: null,
																					link_id: 't3_1135sc2',
																					associated_award: null,
																					stickied: false,
																					author_premium: false,
																					can_gild: true,
																					top_awarded_type: null,
																					unrepliable_reason: null,
																					author_flair_text_color: null,
																					treatment_tags: [],
																					score_hidden: false,
																					permalink:
																						'/r/AskReddit/comments/1135sc2/whats_something_the_us_does_better_than_europe/j8qixu2/',
																					subreddit_type: 'public',
																					locked: false,
																					report_reasons: null,
																					created: 1676526152.0,
																					author_flair_text: null,
																					collapsed: false,
																					created_utc: 1676526152.0,
																					subreddit_name_prefixed: 'r/AskReddit',
																					controversiality: 0,
																					depth: 4,
																					author_flair_background_color: null,
																					collapsed_because_crowd_control: null,
																					mod_reports: [],
																					num_reports: null,
																					ups: 75
																				}
																			},
																			{
																				kind: 'more',
																				data: {
																					count: 5,
																					name: 't1_j8q5neo',
																					id: 'j8q5neo',
																					parent_id: 't1_j8prsqu',
																					depth: 4,
																					children: ['j8q5neo', 'j8qrzxk', 'j8r9klp']
																				}
																			}
																		],
																		before: null
																	}
																},
																user_reports: [],
																saved: false,
																id: 'j8prsqu',
																banned_at_utc: null,
																mod_reason_title: null,
																gilded: 0,
																archived: false,
																collapsed_reason_code: null,
																no_follow: true,
																author: 'mogul_w',
																can_mod_post: false,
																send_replies: true,
																parent_id: 't1_j8pi6nz',
																score: 198,
																author_fullname: 't2_3ywfdfzr',
																removal_reason: null,
																approved_by: null,
																mod_note: null,
																all_awardings: [],
																collapsed: false,
																body: 'Gen Z was almost the first generation without a nicotine addiction then e-cigs showed up',
																edited: false,
																top_awarded_type: null,
																author_flair_css_class: null,
																name: 't1_j8prsqu',
																is_submitter: false,
																downs: 0,
																author_flair_richtext: [],
																author_patreon_flair: false,
																body_html:
																	'&lt;div class="md"&gt;&lt;p&gt;Gen Z was almost the first generation without a nicotine addiction then e-cigs showed up&lt;/p&gt;\n&lt;/div&gt;',
																gildings: {},
																collapsed_reason: null,
																distinguished: null,
																associated_award: null,
																stickied: false,
																author_premium: false,
																can_gild: true,
																link_id: 't3_1135sc2',
																unrepliable_reason: null,
																author_flair_text_color: null,
																score_hidden: false,
																permalink:
																	'/r/AskReddit/comments/1135sc2/whats_something_the_us_does_better_than_europe/j8prsqu/',
																subreddit_type: 'public',
																locked: false,
																report_reasons: null,
																created: 1676512368.0,
																author_flair_text: null,
																treatment_tags: [],
																created_utc: 1676512368.0,
																subreddit_name_prefixed: 'r/AskReddit',
																controversiality: 0,
																depth: 3,
																author_flair_background_color: null,
																collapsed_because_crowd_control: null,
																mod_reports: [],
																num_reports: null,
																ups: 198
															}
														},
														{
															kind: 'more',
															data: {
																count: 3,
																name: 't1_j8pj0u8',
																id: 'j8pj0u8',
																parent_id: 't1_j8pi6nz',
																depth: 3,
																children: ['j8pj0u8', 'j8qop6s']
															}
														}
													],
													before: null
												}
											},
											user_reports: [],
											saved: false,
											id: 'j8pi6nz',
											banned_at_utc: null,
											mod_reason_title: null,
											gilded: 0,
											archived: false,
											collapsed_reason_code: null,
											no_follow: true,
											author: 'valgatiag',
											can_mod_post: false,
											send_replies: true,
											parent_id: 't1_j8pe6tg',
											score: 121,
											author_fullname: 't2_5cl31',
											removal_reason: null,
											approved_by: null,
											mod_note: null,
											all_awardings: [],
											body: 'Smoking is always what I think of when I see this question too. Though, I’d be curious to see what effect the rise of vaping has had on overall usage rates.',
											edited: false,
											top_awarded_type: null,
											downs: 0,
											author_flair_css_class: null,
											name: 't1_j8pi6nz',
											is_submitter: false,
											collapsed: false,
											author_flair_richtext: [],
											author_patreon_flair: false,
											body_html:
												'&lt;div class="md"&gt;&lt;p&gt;Smoking is always what I think of when I see this question too. Though, I’d be curious to see what effect the rise of vaping has had on overall usage rates.&lt;/p&gt;\n&lt;/div&gt;',
											gildings: {},
											collapsed_reason: null,
											distinguished: null,
											associated_award: null,
											stickied: false,
											author_premium: false,
											can_gild: true,
											link_id: 't3_1135sc2',
											unrepliable_reason: null,
											author_flair_text_color: null,
											score_hidden: false,
											permalink:
												'/r/AskReddit/comments/1135sc2/whats_something_the_us_does_better_than_europe/j8pi6nz/',
											subreddit_type: 'public',
											locked: false,
											report_reasons: null,
											created: 1676508045.0,
											author_flair_text: null,
											treatment_tags: [],
											created_utc: 1676508045.0,
											subreddit_name_prefixed: 'r/AskReddit',
											controversiality: 0,
											depth: 2,
											author_flair_background_color: null,
											collapsed_because_crowd_control: null,
											mod_reports: [],
											num_reports: null,
											ups: 121
										}
									},
									{
										kind: 'more',
										data: {
											count: 34,
											name: 't1_j8rfcjk',
											id: 'j8rfcjk',
											parent_id: 't1_j8pe6tg',
											depth: 2,
											children: [
												'j8rfcjk',
												'j8q3x42',
												'j8qz8py',
												'j8qvrs6',
												'j8pwoiw',
												'j8q6fr0',
												'j8pun64',
												'j8qphnx',
												'j8qjbta',
												'j8qvch9',
												'j8qaoqw',
												'j8pu69e',
												'j8pwx9w',
												'j8radiu',
												'j8qz2bt',
												'j8qb3rt',
												'j8qh857',
												'j8pkxb0',
												'j8r52l8',
												'j8qnm2m'
											]
										}
									}
								],
								before: null
							}
						},
						user_reports: [],
						saved: false,
						id: 'j8pe6tg',
						banned_at_utc: null,
						mod_reason_title: null,
						gilded: 0,
						archived: false,
						collapsed_reason_code: null,
						no_follow: true,
						author: 'foolofatooksbury',
						can_mod_post: false,
						created_utc: 1676506259.0,
						send_replies: false,
						parent_id: 't1_j8obh4s',
						score: 494,
						author_fullname: 't2_1tnp6ffo',
						removal_reason: null,
						approved_by: null,
						mod_note: null,
						all_awardings: [],
						body: 'The ways those feckers smoke, im not surpised. In fact; a lot of items on the list that the US leads in i would argue are not objectively good (like ice in drinks, massive portions, urban sprawl) but the rates of smoking are undeniably a good thing',
						edited: false,
						top_awarded_type: null,
						author_flair_css_class: null,
						name: 't1_j8pe6tg',
						is_submitter: false,
						downs: 0,
						author_flair_richtext: [],
						author_patreon_flair: false,
						body_html:
							'&lt;div class="md"&gt;&lt;p&gt;The ways those feckers smoke, im not surpised. In fact; a lot of items on the list that the US leads in i would argue are not objectively good (like ice in drinks, massive portions, urban sprawl) but the rates of smoking are undeniably a good thing&lt;/p&gt;\n&lt;/div&gt;',
						gildings: {},
						collapsed_reason: null,
						distinguished: null,
						associated_award: null,
						stickied: false,
						author_premium: false,
						can_gild: true,
						link_id: 't3_1135sc2',
						unrepliable_reason: null,
						author_flair_text_color: null,
						score_hidden: false,
						permalink:
							'/r/AskReddit/comments/1135sc2/whats_something_the_us_does_better_than_europe/j8pe6tg/',
						subreddit_type: 'public',
						locked: false,
						report_reasons: null,
						created: 1676506259.0,
						author_flair_text: null,
						treatment_tags: [],
						collapsed: false,
						subreddit_name_prefixed: 'r/AskReddit',
						controversiality: 0,
						depth: 1,
						author_flair_background_color: null,
						collapsed_because_crowd_control: null,
						mod_reports: [],
						num_reports: null,
						ups: 494
					}
				},
				{
					kind: 'more',
					data: {
						count: 51,
						name: 't1_j8qq41c',
						id: 'j8qq41c',
						parent_id: 't1_j8obh4s',
						depth: 1,
						children: [
							'j8qq41c',
							'j8r9yff',
							'j8qcrr8',
							'j8pf546',
							'j8oweef',
							'j8qm7m0',
							'j8r7amk',
							'j8oj84r',
							'j8qoj8s',
							'j8qk5n1',
							'j8r69bi',
							'j8qplxp',
							'j8q7umo',
							'j8on4r6',
							'j8qz1zn',
							'j8r2hkx',
							'j8qnpqt',
							'j8qw9pz',
							'j8r8mas',
							'j8qqm0r'
						]
					}
				}
			],
			before: null
		}
	},
	user_reports: [],
	saved: false,
	id: 'j8obh4s',
	banned_at_utc: null,
	mod_reason_title: null,
	gilded: 0,
	archived: false,
	collapsed_reason_code: null,
	no_follow: true,
	author: 'YuckBrusselSprouts',
	can_mod_post: false,
	created_utc: 1676490856.0,
	send_replies: true,
	parent_id: 't3_1135sc2',
	score: 1107,
	author_fullname: 't2_v0n8kds3',
	approved_by: null,
	mod_note: null,
	all_awardings: [],
	collapsed: false,
	body: 'Cancer survival rates are higher in American than in Europe',
	edited: false,
	top_awarded_type: null,
	author_flair_css_class: null,
	name: 't1_j8obh4s',
	is_submitter: false,
	downs: 0,
	author_flair_richtext: [],
	author_patreon_flair: false,
	body_html:
		'&lt;div class="md"&gt;&lt;p&gt;Cancer survival rates are higher in American than in Europe&lt;/p&gt;\n&lt;/div&gt;',
	removal_reason: null,
	collapsed_reason: null,
	distinguished: null,
	associated_award: null,
	stickied: false,
	author_premium: false,
	can_gild: true,
	gildings: {},
	unrepliable_reason: null,
	author_flair_text_color: null,
	score_hidden: false,
	permalink:
		'/r/AskReddit/comments/1135sc2/whats_something_the_us_does_better_than_europe/j8obh4s/',
	subreddit_type: 'public',
	locked: false,
	report_reasons: null,
	created: 1676490856.0,
	author_flair_text: null,
	treatment_tags: [],
	link_id: 't3_1135sc2',
	subreddit_name_prefixed: 'r/AskReddit',
	controversiality: 0,
	depth: 0,
	author_flair_background_color: null,
	collapsed_because_crowd_control: null,
	mod_reports: [],
	num_reports: null,
	ups: 1107
};

const testJsonReply = {
	kind: 'Listing',
	data: {
		after: null,
		dist: null,
		modhash: null,
		geo_filter: '',
		children: [
			{
				kind: 't1',
				data: {
					subreddit_id: 't5_2qh1i',
					approved_at_utc: null,
					author_is_blocked: false,
					comment_type: null,
					awarders: [],
					mod_reason_by: null,
					banned_by: null,
					author_flair_type: 'text',
					total_awards_received: 0,
					subreddit: 'AskReddit',
					author_flair_template_id: null,
					distinguished: null,
					likes: null,
					replies: '',
					user_reports: [],
					saved: false,
					id: 'j8qw4ol',
					banned_at_utc: null,
					mod_reason_title: null,
					gilded: 0,
					archived: false,
					collapsed_reason_code: null,
					no_follow: true,
					author: 'snp3rk',
					can_mod_post: false,
					send_replies: true,
					parent_id: 't1_j8qixu2',
					score: 14,
					author_fullname: 't2_ics93',
					approved_by: null,
					mod_note: null,
					all_awardings: [],
					body: 'Same mid 90s, as I was graduating highschool smoking was really frowned upon my peers as something really lame, and now barely a decade later and almost every 18-29 year old that I interact with is vaping.',
					edited: false,
					gildings: {},
					downs: 0,
					author_flair_css_class: null,
					name: 't1_j8qw4ol',
					is_submitter: false,
					collapsed: false,
					author_flair_richtext: [],
					author_patreon_flair: false,
					body_html:
						'&lt;div class="md"&gt;&lt;p&gt;Same mid 90s, as I was graduating highschool smoking was really frowned upon my peers as something really lame, and now barely a decade later and almost every 18-29 year old that I interact with is vaping.&lt;/p&gt;\n&lt;/div&gt;',
					removal_reason: null,
					collapsed_reason: null,
					link_id: 't3_1135sc2',
					associated_award: null,
					stickied: false,
					author_premium: false,
					can_gild: true,
					top_awarded_type: null,
					unrepliable_reason: null,
					author_flair_text_color: null,
					score_hidden: false,
					permalink:
						'/r/AskReddit/comments/1135sc2/whats_something_the_us_does_better_than_europe/j8qw4ol/',
					subreddit_type: 'public',
					locked: false,
					report_reasons: null,
					created: 1676536047.0,
					author_flair_text: null,
					treatment_tags: [],
					created_utc: 1676536047.0,
					subreddit_name_prefixed: 'r/AskReddit',
					controversiality: 0,
					depth: 5,
					author_flair_background_color: null,
					collapsed_because_crowd_control: null,
					mod_reports: [],
					num_reports: null,
					ups: 14
				}
			},
			{
				kind: 'more',
				data: {
					count: 1,
					name: 't1_j8r5dme',
					id: 'j8r5dme',
					parent_id: 't1_j8qixu2',
					depth: 5,
					children: ['j8r5dme']
				}
			}
		],
		before: null
	}
};

beforeAll(async () => {
	const reddit = new Jsrwrap(
		'N/A',
		process.env.CLIENT_ID!,
		process.env.CLIENT_SECRET!,
		'web:JsrwrapApiWrapper:v0.0.1',
		process.env.REFRESH_TOKEN!
	);
	await reddit.refreshAccessToken();
	submission = await reddit.getSubmission('10mr90y');
});

function flat2(res: CommentResponse): any {
	if (res.replies === '') {
		return res;
	}
	const replies = res.replies.data.children.map((v) => {
		if (v.kind === 'more') {
			return { ...v.data, type: 'more' };
		}
		return flat2(v.data);
	});
	return { ...res, replies, type: 'comment' };
}

describe('Subreddit methods', () => {
	it.only('flattens comment', () => {
		const comment = testJsonComment as unknown as CommentResponse;
		const reply = testJsonReply as unknown as RepliesResponse;
		// console.log(comment);
		// console.log(flattenReplies(comment));

		// console.dir(flattenReplies(comment), { depth: null });
		console.dir(flat2(comment), { depth: null });
		expect('a').toBe('b');
	});

	it('f', async () => {
		const su = await submission.get();
		// console.log(su.title);
		// su.comments.forEach((i) => {
		// 	if (i.type === 'comment') console.log(`${i.ups} - ${i.body} by ${i.author}`);
		// });

		if (su.comments[0].type === 'comment') console.log(su.comments[0].replies);
		expect('a').toBe(
			`Lad wrote a Python script to download Alexa voice recordings, he didn't expect this email.`
		);
	});
});
