export interface SubmissionData {
  all_awardings: unknown[];
  allow_live_comments: boolean;
  approved_at_utc: number | null;
  approved_by: string | null;
  archived: boolean;
  author: string;
  author_flair_background_color: string | null;
  author_flair_css_class: string | null;
  author_flair_richtext: FlairRichtext[];
  author_flair_template_id: string | null;
  author_flair_text: string | null;
  author_flair_text_color: string | null;
  author_flair_type: "text" | "richtext";
  author_fullname: string;
  author_is_blocked: boolean;
  author_patreon_flair: boolean;
  author_premium: boolean;
  awarders: unknown[];
  banned_at_utc: number | null;
  banned_by: string | null;
  can_gild: boolean;
  can_mod_post: boolean;
  category: string | null;
  clicked: boolean;
  content_categories: string[] | null;
  contest_mode: boolean;
  created: number;
  created_utc: number;
  discussion_type: null;
  distinguished: "admin" | "moderator" | null;
  domain: string;
  downs: number;
  edited: number | boolean;
  gallery_data?: GalleryData;
  gilded: number;
  gildings: Gildings;
  hidden: boolean;
  hide_score: boolean;
  id: string;
  is_created_from_ads_ui: boolean;
  is_crosspostable: boolean;
  is_gallery?: boolean;
  is_meta: boolean;
  is_original_content: boolean;
  is_reddit_media_domain: boolean;
  is_robot_indexable: boolean;
  is_self: boolean;
  is_video: boolean;
  likes: boolean | null;
  link_flair_background_color: string;
  link_flair_css_class: string | null;
  link_flair_richtext: FlairRichtext[];
  link_flair_template_id: string | null;
  link_flair_text: string | null;
  link_flair_text_color: "dark" | "light";
  link_flair_type: "text" | "richtext";
  locked: boolean;
  media: Media | null;
  media_embed: MediaEmbed;
  media_metadata?: MediaMetadata;
  media_only: boolean;
  mod_note: string;
  mod_reason_by: string;
  mod_reason_title: string;
  mod_reports: string[];
  name: string;
  no_follow: boolean;
  num_comments: number;
  num_crossposts: number;
  num_reports: number;
  over_18: boolean;
  parent_whitelist_status: string;
  permalink: string;
  pinned: boolean;
  post_hint?: string;
  preview: Preview;
  pwls: number;
  quarantine: boolean;
  removal_reason: string | null;
  removed_by: string | null;
  removed_by_category: string | null;
  report_reasons: string[];
  saved: boolean;
  score: number;
  secure_media: Media | null;
  secure_media_embed: SecureMediaEmbed;

  selftext: string;
  selftext_html: string | null;
  send_replies: boolean;
  spoiler: boolean;
  stickied: boolean;
  subreddit: string;
  subreddit_id: string;
  subreddit_name_prefixed: string;
  subreddit_subscribers: number;
  subreddit_type: SubredditType;

  suggested_sort: Sort | null;
  thumbnail: string;
  thumbnail_height: number | null;
  thumbnail_width: number | null;
  title: string;
  top_awarded_type: null;
  total_awards_received: number;
  treatment_tags: unknown[];
  ups: number;
  upvote_ratio: number;
  url: string;
  user_reports: string[];
  view_count: number | null;
  visited: boolean;
  whitelist_status: string;
  wls: number;
}

export interface GalleryData {
  items: { media_id: string; id: number }[];
}

export interface MediaMetadata {
  [media_id: string]: {
    status: string;
    e: string | "Image";
    m: string | "image/png";
    p: AlbumEntry[];
    s: AlbumEntry;
    t?: string | "sticker";
    id: string;
  };
}

export interface AlbumEntry {
  y: string;
  x: string;
  u: string;
}

// https://github.com/not-an-aardvark/snoowrap/blob/c301bd604a16ad035a0dc0f8ba99e2a195957989/src/objects/VoteableContent.d.ts#L16
export interface Gildings {
  // Number of Reddit Silver awarded
  gid_1: number;
  // Number of Reddit Gold awarded
  gid_2: number;
  // Number of Reddit Platinum awarded
  gid_3: number;
}

// https://github.com/not-an-aardvark/snoowrap/blob/c301bd604a16ad035a0dc0f8ba99e2a195957989/src/objects/VoteableContent.d.ts#L5
export interface FlairRichtext {
  a?: string;
  e: "text" | "emoji";
  t?: string;
  u?: string;
}

export interface Preview {
  enabled: boolean;
  images: ImagePreview[];
}

export interface ImagePreview {
  id: string;
  resolutions: Source[];
  source: Source;
  variants: unknown;
}

export interface Source {
  height: number;
  url: string;
  width: number;
}

// https://github.com/not-an-aardvark/snoowrap/blob/62c64fbad3936dc11515f33b6444150947f9790e/src/objects/Submission.d.ts#L7
export interface Media {
  oembed?: {
    // The username of the uploader of the source media
    author_name?: string;
    // URL to the author's profile on the source website
    author_url?: string;
    description?: string;
    height: number;
    html: string;
    // Name of the source website, e.g. "gfycat", "YouTube"
    provider_name: string;
    // URL of the source website, e.g. "https://www.youtube.com"
    provider_url: string;
    thumbnail_height: number;
    thumbnail_url: string;
    thumbnail_width: number;
    // Name of the media on the content site, e.g. YouTube video title
    title: string;
    type: "video" | "rich";
    version: string;
    width: number;
  };
  reddit_video?: {
    dash_url: string;
    duration: number;
    fallback_url: string;
    height: number;
    hls_url: string;
    is_gif: boolean;
    scrubber_media_url: string;
    transcoding_status: string;
  };
  type?: string;
}

// https://github.com/not-an-aardvark/snoowrap/blob/62c64fbad3936dc11515f33b6444150947f9790e/src/objects/Submission.d.ts#L42
export interface MediaEmbed {
  // HTML string of the media, usually an iframe
  content?: string;
  height?: number;
  scrolling?: boolean;
  width?: number;
}

// https://github.com/not-an-aardvark/snoowrap/blob/62c64fbad3936dc11515f33b6444150947f9790e/src/objects/Submission.d.ts#L50
export interface SecureMediaEmbed extends MediaEmbed {
  media_domain_url?: string;
}

// https://github.com/not-an-aardvark/snoowrap/blob/c301bd604a16ad035a0dc0f8ba99e2a195957989/src/objects/VoteableContent.d.ts#L25
export type SubredditType =
  | "gold_restricted"
  | "archived"
  | "restricted"
  | "employees_only"
  | "gold_only"
  | "private"
  | "user"
  | "public";

// https://github.com/not-an-aardvark/snoowrap/blob/498a8d5cb83181c53209a7c60de1c45b36358114/src/snoowrap.d.ts#L191
export type Sort =
  | "confidence"
  | "top"
  | "new"
  | "controversial"
  | "old"
  | "random"
  | "qa";
