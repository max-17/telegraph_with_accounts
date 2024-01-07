/**
`Account` object represents a Telegraph account.

`short_name` (String)
Account name, helps users with several accounts remember which they are currently using. Displayed to the user above the "Edit/Publish" button on Telegra.ph, other users don't see this name.

`author_name` (String)
Default author name used when creating new articles.

`author_url` (String)
Profile link, opened when users click on the author's name below the title. Can be any link, not necessarily to a Telegram profile or channel.

`access_token` (String)
Optional. Only returned by the createAccount and revokeAccessToken method. Access token of the Telegraph account.

`auth_url` (String)
Optional. URL to authorize a browser on telegra.ph and connect it to a Telegraph account. This URL is valid for only one use and for 5 minutes only.

`page_count` (Integer)
Optional. Number of pages belonging to the Telegraph account.
 */

export interface Account {
  short_name: string;
  author_name?: string;
  author_url?: string;
  access_token?: string;
  auth_url?: string;
  page_count?: number;
}

/**
TNodeElement object represents a `DOM element node**`.

`tag` (String)
Name of the DOM element. Available tags: `a`, `aside`, `b`, `blockquote`, `br`, `code`, `em`, `figcaption`, `figure`, `h3`, `h4`, `hr`, `i`, `iframe`, `img`, `li`, `ol`, `p`, `pre`, `s`, `strong`, `u`, `ul`, `video`.

`attrs` (Object)
Optional. Attributes of the DOM element. Key of object represents name of attribute, value represents value of attribute. Available attributes: `href`, `src`.

`children` (Array of Node)
Optional. List of child nodes for the DOM element.
**/

export interface TNodeElement {
  tag: string;
  // arrts extends NamedNodeMap and has src, href only
  attrs?: { src?: string; href?: string; [key: string]: string | undefined };
  children?: (string | TNodeElement)[];
}

/**
  `Page` object represents a page on Telegraph.
 
 `path` (String)
  Path to the page.
 
  `url` (String)
  URL of the page.
 
  `title` (String)
  Title of the page.
 
  `description` (String)
  Description of the page.
 
  `author_name` (String, Optional)
  Name of the author, displayed below the title.
 
  `author_url` (String, Optional)
  Profile link, opened when users click on the author's name below the title. Can be any link, not necessarily to a Telegram profile or channel.
 
  `image_url` (String, Optional)
  Image URL of the page.
 
  `content` (Array of Node, Optional)
  Content of the page.
 
  `views` (Integer)
  Number of page views for the page.
 
  `can_edit` (Boolean, Optional)
  Only returned if access_token passed. True, if the target Telegraph account can edit the page.
 */

export interface Page {
  path: string;
  url: string;
  title: string;
  description: string;
  author_name?: string;
  author_url?: string;
  image_url?: string;
  content?: Node[];
  views: number;
  can_edit?: boolean;
}

/**
 `PageList` object represents a list of Telegraph articles belonging to an account. Most recently created articles first.
 
 `total_count` (Integer)
 Total number of pages belonging to the target Telegraph account.
 
 `pages` (Array of Page)
 Requested pages of the target Telegraph account.
 **/

export type PageList = {
  total_count: number;
  pages: Page[];
};
