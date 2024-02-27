import { JSONContent } from "@tiptap/react";
import { Account, TNodeElement, Page, PageList, accountSchema } from "./types";

const baseApiUrl: string = "https://api.telegra.ph/";

// createAccount

/**
 * Use this method to create a new Telegraph account. Most users only need one account, but this can be useful for channel administrators who would like to keep individual author names and profile links for each of their channels. On success, returns an Account object with the regular fields and an additional access_token field.
 *
 * `short_name` (String, 1-32 characters)
 * Required. Account name, helps users with several accounts remember which they are currently using. Displayed to the user above the "Edit/Publish" button on Telegra.ph, other users don't see this name.
 *
 * `author_name` (String, 0-128 characters)
 * Default author name used when creating new articles.
 *
 * `author_url` (String, 0-512 characters)
 * Default profile link, opened when users click on the author's name below the title. Can be any link, not necessarily to a Telegram profile or channel.
 *
 * @param short_name
 * @param author_name
 * @param author_url
 *
 * @see https://telegra.ph/api#createAccount
 */

export async function createAccount(
  short_name: string,
  author_name?: string,
  author_url?: string
): Promise<Account> {
  const queryString = new URLSearchParams({
    short_name,
    ...(author_name && { author_name }),
    ...(author_url && { author_url }),
  }).toString();

  const response = await fetch(baseApiUrl + `createAccount?${queryString}`);

  const { result } = await response.json();

  accountSchema.parse(result);

  return await result;
}
/**
 
export function domToNode(domNode: Element): TNodeElement | string | false {
  if (domNode.nodeType == Node.TEXT_NODE) {
    return domNode.nodeValue || "";
  }
  if (domNode.nodeType != Node.ELEMENT_NODE) {
    return false;
  }
  let nodeElement: TNodeElement = { tag: "", attrs: {} };
  nodeElement.tag = domNode.nodeName.toLowerCase();
  for (const i in domNode.attributes) {
    const attrName = domNode.attributes[i].name;
    if (attrName == "href" || attrName == "src") {
      if (!nodeElement.attrs) {
        nodeElement.attrs = {};
      }
      nodeElement.attrs[attrName] = domNode.attributes[i].value;
    }
  }
  if (domNode.childNodes.length > 0) {
    nodeElement.children = [];
    for (let i = 0; i < domNode.childNodes.length; i++) {
      const child: Element = domNode.children[i];
      const childNode = domToNode(child);
      if (typeof childNode !== "boolean") {
        nodeElement.children.push(childNode);
      }
    }
  }
  return nodeElement;
}

export function nodeToDom(node: string | TNodeElement): Node {
  if (typeof node === "string") {
    return document.createTextNode(node);
  }
  let domNode: Element | DocumentFragment;
  if (node.tag) {
    domNode = document.createElement(node.tag);
    if (node.attrs) {
      for (const name in node.attrs) {
        const value = node.attrs[name] as string;
        domNode.setAttribute(name, value);
      }
    }
  } else {
    domNode = document.createDocumentFragment();
  }
  if (node.children) {
    for (let i = 0; i < node.children.length; i++) {
      let child = node.children[i];
      domNode.appendChild(nodeToDom(child));
    }
  }
  return domNode;
}

 */

// getAccountInfo

/**
 * Use this method to get information about a Telegraph account. Returns an Account object on success.
 *
 * `access_token` (String)
 * Required. Access token of the Telegraph account.
 *
 * `fields` (Array of String, default = ["short_name", "author_name", "author_url"])
 * List of account fields to return. Available fields: short_name, author_name, author_url, auth_url, page_count.
 *
 * @param access_token
 * @param fields
 *
 * @see https://telegra.ph/api#getAccountInfo
 */

export async function getAccountInfo(): Promise<Account> {
  //https://api.telegra.ph/getAccountInfo?access_token=d3b25feccb89e508a9114afb82aa421fe2a9712b963b387cc5ad71e58722&fields=["short_name","page_count"]

  const response = await fetch(baseApiUrl + `getAccountInfo`);

  return {
    short_name: "",
    author_name: "",
    author_url: "",
    auth_url: "",
    page_count: 0,
  };
}

// editAccountInfo

/**
 * Use this method to update information about a Telegraph account. Pass only the parameters that you want to edit. On success, returns an Account object with the default fields.
 *
 * `short_name` (String, 1-32 characters)
 * New account name.
 *
 * `author_name` (String, 0-128 characters)
 * New default author name used when creating new articles.
 *
 * `author_url` (String, 0-512 characters)
 * New default profile link, opened when users click on the author's name below the title. Can be any link, not necessarily to a Telegram profile or channel.
 *
 * @param short_name
 * @param author_name
 * @param author_url
 *
 * @see https://telegra.ph/api#EditAccountInfo
 */

export async function editAccountInfo(): Promise<Account> {
  //https://api.telegra.ph/editAccountInfo?access_token=d3b25feccb89e508a9114afb82aa421fe2a9712b963b387cc5ad71e58722&short_name=Sample-Account&author_name=Anonymous%20&author_url=http://anonymous.org/

  const response = await fetch(baseApiUrl + `editAccountInfo`);

  return {
    short_name: "",
    author_name: "",
    author_url: "",
    auth_url: "",
    page_count: 0,
  };
}

// createPage

/**
  Use this method to create a new Telegraph page. On success, returns a Page object.

  `access_token` (String)
  Required. Access token of the Telegraph account.
  
  `title` (String, 1-256 characters)
  Required. Page title.
  
  `author_name` (String, 0-128 characters)
  Author name, displayed below the article's title.

  `author_url` (String, 0-512 characters)
  Profile link, opened when users click on the author's name below the title. Can be any link, not necessarily to a Telegram profile or channel.

  `content` (Array of Node, up to 64 KB)
  Required. Content of the page.

  `return_content` (Boolean, default = false)
  If true, a content field will be returned in the Page object (see: Content format).

  @param access_token
  @param title
  @param content
  @param author_name
  @param author_url
  @param return_content
  
  @see https://telegra.ph/api#createPage
 **/
export async function createPage(
  access_token: string,
  title: string,
  content: Node[],
  author_name?: string,
  author_url?: string
): Promise<Page> {
  const queryString = new URLSearchParams({
    access_token,
    title,
    content: JSON.stringify(content),
    ...(author_name && { author_name }),
    ...(author_url && { author_url }),
  }).toString();

  const response = await fetch(baseApiUrl + `createPage?${queryString}`, {
    method: "POST",
  });

  const data: Page = await response.json();

  return data;
}

// getPage

/**
 * Use this method to get a Telegraph page. Returns a Page object on success.
 * 
 * `path` (String)
 * Required. Path to the Telegraph page (in the format Title-12-31, i.e. everything that comes after http://telegra.ph/).
 * 
 * `return_content` (Boolean, default = false)
 * If true, content field will be returned in Page object.
 * 
 * @param path
 * @param return_content
 * 
 * @see https://telegra.ph/api#GetPage
 
 **/

export async function getPage(): Promise<Page> {
  //https://api.telegra.ph/getPage/Sample-Page-12-15?return_content=true

  const response = await fetch(baseApiUrl + `getPage/`);

  return {
    path: "",
    url: "",
    title: "",
    description: "",
    views: 0,
  };
}

// editPage

/**
 * Use this method to edit an existing Telegraph page. On success, returns a Page object with the default fields.
 *
 * `access_token` (String)
 * Required. Access token of the Telegraph account.
 *
 * `path` (String)
 * Required. Path to the page.
 *
 * `title` (String, 1-256 characters)
 * Required. Page title.
 *
 * `content` (Array of Node, up to 64 KB)
 * Required. Content of the page.
 *
 * `author_name` (String, 0-128 characters)
 * Author name, displayed below the article's title.
 *
 * `author_url` (String, 0-512 characters)
 * Profile link, opened when users click on the author's name below the title. Can be any link, not necessarily to a Telegram profile or channel.
 *
 * `return_content` (Boolean, default = false)
 * If true, a content field will be returned in the Page object (see: Content format).
 *
 * @param access_token
 * @param path
 * @param title
 * @param content
 * @param author_name
 * @param author_url
 * @param return_content
 *
 * @see https://telegra.ph/api#EditPage
 */

export async function editPage(): Promise<Page> {
  //https://api.telegra.ph/editPage/Sample-Page-12-15?access_token=d3b25feccb89e508a9114afb82aa421fe2a9712b963b387cc5ad71e58722&title=Sample+Page&author_name=Anonymous&content=[{"tag":"p","children":["Hello,+world!"]}]&return_content=true

  const response = await fetch(baseApiUrl + `editPage`);

  return {
    path: "",
    url: "",
    title: "",
    description: "",
    views: 0,
  };
}

// getViews

/***
 * Use this method to get the number of views for a Telegraph article. Returns a PageViews object on success. By default, the total number of page views will be returned.
 *
 * `path` (String)
 * Required. Path to the Telegraph page (in the format Title-12-31, where 12 is the month and 31 the day the article was first published).
 *
 * `year` (Integer)
 * Required if month is passed. If passed, the number of page views for the requested year will be returned.
 *
 * `month` (Integer)
 * Required if day is passed. If passed, the number of page views for the requested month will be returned.
 *
 * `day` (Integer)
 * Required if hour is passed. If passed, the number of page views for the requested day will be returned.
 *
 * `hour` (Integer)
 * If passed, the number of page views for the requested hour will be returned.
 *
 * @param path
 * @param year
 * @param month
 * @param day
 * @param hour
 *
 * @see https://telegra.ph/api#GetViews
 */

export async function getViews(): Promise<number> {
  //https://api.telegra.ph/getViews/Sample-Page-12-15?year=2016&month=12

  const response = await fetch(baseApiUrl + `getViews`);
  return 0;
}

// getPageList

/**
 * Use this method to get a list of pages belonging to a Telegraph account. Returns a PageList object, sorted by most recently created pages first.
 *
 * `access_token` (String)
 * Required. Access token of the Telegraph account.
 *
 * `offset` (Integer, default = 0)
 * Sequential number of the first page to be returned.
 *
 * `limit` (Integer, 1-200, default = 50)
 * Limits the number of pages to be retrieved.
 *
 * @param access_token
 * @param offset
 * @param limit
 *
 * @see https://telegra.ph/api#GetPageList
 */

export async function getPageList(): Promise<PageList> {
  //https://api.telegra.ph/getPageList?access_token=d3b25feccb89e508a9114afb82aa421fe2a9712b963b387cc5ad71e58722&limit=3

  const response = await fetch(baseApiUrl + `getPageList`);

  return {
    total_count: 0,
    pages: [],
  };
}

// revokeAccessToken

/**
 * Use this method to revoke access_token and generate a new one, for example, if the user would like to reset all connected sessions, or you have reasons to believe the token was compromised. On success, returns an Account object with new access_token and auth_url fields.
 *
 * `access_token` (String)
 * Required. Access token of the Telegraph account.
 *
 * @param access_token
 *
 * @see https://telegra.ph/api#RevokeAccessToken
 */

export async function revokeAccessToken(accessToken: string): Promise<Account> {
  //https://api.telegra.ph/revokeAccessToken?access_token=d3b25feccb89e508a9114afb82aa421fe2a9712b963b387cc5ad71e58722

  const response = await fetch(baseApiUrl + `revokeAccessToken`);

  return {
    short_name: "",
    author_name: "",
    author_url: "",
    auth_url: "",
    page_count: 0,
  };
}

/**
 * JSONContent
 * [
    {
        "type": "paragraph",
        "content": [
            {
                "type": "text",
                "text": "This is a basic example of implementing images. Drag to re-order."
            }
        ]
    },
    {
        "type": "image",
        "attrs": {
            "src": "https://source.unsplash.com/8xznAGy4HcY/800x400",
            "alt": null,
            "title": null
        }
    },
    {
        "type": "paragraph",
        "content": [
            {
                "type": "text",
                "text": "sdsadasds"
            }
        ]
    },
]
 */

export function domToNode(content: Element): TNodeElement | false {
  if (content.nodeType === Node.TEXT_NODE) {
    return content.textContent || "";
  }
  if (content.nodeType != Node.ELEMENT_NODE) {
    return false;
  }
  let nodeElement: TNodeElement = { tag: "" };
  nodeElement.tag = content.nodeName.toLowerCase();
  for (const attr of Array.from(content.attributes).filter(
    (attr) => attr.name == "href" || attr.name == "src"
  )) {
    nodeElement.attrs = {};
    nodeElement.attrs[attr.name] = attr.value;
  }

  if (content.childNodes.length > 0) {
    for (let i = 0; i < content.childNodes.length; i++) {
      const child = content.children[i];
      const childNode = domToNode(child);
      if (typeof childNode !== "boolean") {
        if (!nodeElement.children) {
          nodeElement.children = [childNode];
        } else nodeElement.children.push(childNode);
      }
    }
  }
  return nodeElement;
}
