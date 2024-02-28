import { JSONContent } from "@tiptap/react";
import { z } from "zod";

export const accountSchema = z.object({
  short_name: z.string(),
  author_name: z.string().optional(),
  author_url: z.string().optional(),
  access_token: z.string().optional(),
  auth_url: z.string().optional(),
  page_count: z.number().optional(),
});

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

@params short_name: string
@params author_name: string
@params author_url: string
@params access_token: string
@params auth_url: string
@params page_count: number

@see https://telegra.ph/api#Account
 */

export type Account = z.infer<typeof accountSchema>;

const baseNodeSchema = z.union([
  z.string(),
  z.object({
    tag: z.string(),
    attrs: z
      .object({
        src: z.string().optional(),
        href: z.string().optional(),
      })
      .and(z.record(z.string()))
      .optional(),
  }),
]);

/**
TNodeElement object represents a `DOM element node*`.

`tag` (String)
Name of the DOM element. Available tags: `a`, `aside`, `b`, `blockquote`, `br`, `code`, `em`, `figcaption`, `figure`, `h3`, `h4`, `hr`, `i`, `iframe`, `img`, `li`, `ol`, `p`, `pre`, `s`, `strong`, `u`, `ul`, `video`.

`attrs` (Object)
Optional. Attributes of the DOM element. Key of object represents name of attribute, value represents value of attribute. Available attributes: `href`, `src`.

`children` (Array of Node)
Optional. List of child nodes for the DOM element.

@params tag: string
@params attrs: z.record(z.string()).optional()
@params children: z.lazy(() => TNodeElementSchema.array())

@see https://telegra.ph/api#NodeElement
**/
export type TNodeElement = z.infer<typeof baseNodeSchema> & {
  children?: TNodeElement[];
};

const TNodeElementSchema: z.ZodType<TNodeElement> = z.lazy(
  () => baseNodeSchema
);

export const pageSchema = z.object({
  path: z.string(),
  url: z.string(),
  title: z.string(),
  description: z.string(),
  author_name: z.string().optional(),
  author_url: z.string().optional(),
  image_url: z.string().optional(),
  content: z.lazy(() => TNodeElementSchema.array()).optional(),
  views: z.number(),
  can_edit: z.boolean().optional(),
});

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
 
  `content` (Array of TNodeElement, Optional)
  Content of the page.
 
  `views` (Integer)
  Number of page views for the page.
 
  `can_edit` (Boolean, Optional)
  Only returned if access_token passed. True, if the target Telegraph account can edit the page.

  @params path: string
  @params url: string
  @params title: string
  @params description: string
  @params author_name: string
  @params author_url: string
  @params image_url: string
  @params content: TNodeElement[]
  @params views: number
  @params can_edit: boolean

  @see https://telegra.ph/api#Page
 */

export type Page = z.infer<typeof pageSchema>;

export const pageListSchema = z.object({
  total_count: z.number(),
  pages: z.array(pageSchema),
});

/**
 `PageList` object represents a list of Telegraph articles belonging to an account. Most recently created articles first.
 
 `total_count` (Integer)
 Total number of pages belonging to the target Telegraph account.
 
 `pages` (Array of Page)
 Requested pages of the target Telegraph account.

  @params total_count: number
  @params pages: Page[]
  
  @see https://telegra.ph/api#PageList
 **/

export type PageList = z.infer<typeof pageListSchema>;
