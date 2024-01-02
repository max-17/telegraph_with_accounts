import { log } from "console";

const baseApiUrl: string = "https://api.telegra.ph/";

// API methods

/**
Account object represents a Telegraph account.  
short_name (String)
Account name, helps users with several accounts remember which they are currently using. Displayed to the user above the "Edit/Publish" button on Telegra.ph, other users don't see this name.
author_name (String)
Default author name used when creating new articles.
author_url (String)
Profile link, opened when users click on the author's name below the title. Can be any link, not necessarily to a Telegram profile or channel.
access_token (String)
Optional. Only returned by the createAccount and revokeAccessToken method. Access token of the Telegraph account.
auth_url (String)
Optional. URL to authorize a browser on telegra.ph and connect it to a Telegraph account. This URL is valid for only one use and for 5 minutes only.
page_count (Integer)
Optional. Number of pages belonging to the Telegraph account.
 */

interface Account {
  short_name: string;
  author_name?: string;
  author_url?: string;
  access_token?: string;
  auth_url?: string;
  page_count?: number;
}

/**
Request
short_name (String, 1-32 characters)
Required. Account name, helps users with several accounts remember which they are currently using. Displayed to the user above the "Edit/Publish" button on Telegra.ph, other users don't see this name.
author_name (String, 0-128 characters)
Default author name used when creating new articles.
author_url (String, 0-512 characters)
Default profile link, opened when users click on the author's name below the title. Can be any link, not necessarily to a Telegram profile or channel.
Sample request
 */

async function createAccount({
  short_name,
  author_name,
  author_url,
}: {
  short_name: string;
  author_name?: string;
  author_url?: string;
}): Promise<Account> {
  console.log(`url: createAcount?short_name=${short_name}`);

  const queryString = new URLSearchParams({
    short_name,
    ...(author_name && { author_name }),
    ...(author_url && { author_url }),
  }).toString();
  const response = await fetch(baseApiUrl + `createAccount?${queryString}`);

  return response.json();
}

/**
TNodeElement object represents a [DOM element node]**.

tag (String)
Name of the DOM element. Available tags: a, aside, b, blockquote, br, code, em, figcaption, figure, h3, h4, hr, i, iframe, img, li, ol, p, pre, s, strong, u, ul, video.
attrs (Object)
Optional. Attributes of the DOM element. Key of object represents name of attribute, value represents value of attribute. Available attributes: href, src.
children (Array of Node)
Optional. List of child nodes for the DOM element.
  */

interface TNodeElement {
  tag: string;
  // arrts extends NamedNodeMap and has src, href only
  attrs?: { src?: string; href?: string; [key: string]: string | undefined };
  children?: (string | TNodeElement)[];
}

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

// type AjaxSettings = {
//   data: {
//     access_token: string;
//     title: string;
//     content: string;
//     return_content: boolean;
//   };
//   type: string;
//   dataType: string;
//   success: (data: any) => void;
// };

// let article = document.getElementById("article");
// if (article) {
//   let content = domToNode(article).children;
//   let settings: AjaxSettings = {
//     data: {
//       access_token: "%access_token%",
//       title: "Title of page",
//       content: JSON.stringify(content),
//       return_content: true,
//     },
//     type: "POST",
//     dataType: "json",
//     success: function (data) {
//       if (data.content) {
//         while (article.firstChild) {
//           article.removeChild(article.firstChild);
//         }
//         article.appendChild(nodeToDom({ children: data.content }));
//       }
//     },
//   };
//   $.ajax("https://api.telegra.ph/createPage", settings);
// }

/**
Page object represents a page on Telegraph.

path (String)
Path to the page.
url (String)
URL of the page.
title (String)
Title of the page.
description (String)
Description of the page.
author_name (String)
Optional. Name of the author, displayed below the title.
author_url (String)
Optional. Profile link, opened when users click on the author's name below the title.  Can be any link, not necessarily to a Telegram profile or channel.
image_url (String)
Optional. Image URL of the page.
content (Array of Node)
Optional. Content of the page.
views (Integer)
Number of page views for the page.
can_edit (Boolean)
Optional. Only returned if access_token passed. True, if the target Telegraph account can edit the page.
 */

interface Page {
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
access_token (String)
Required. Access token of the Telegraph account.
title (String, 1-256 characters)
Required. Page title.
author_name (String, 0-128 characters)
Author name, displayed below the article's title.
author_url (String, 0-512 characters)
Profile link, opened when users click on the author's name below the title. Can be any link, not necessarily to a Telegram profile or channel.
content (Array of Node, up to 64 KB)
Required. Content of the page. 
return_content (Boolean, default = false)
If true, a content field will be returned in the Page object (see: Content format). 
**/
async function createPage(
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

  return response.json();
}

// ... other API methods

export {
  createAccount,
  createPage,
  // ... other API methods
};
