"use server";

import { prisma } from "@/lib/prisma";
import {
  createAccount,
  createPage,
  domToNode,
} from "@/lib/telegraphAPI/telegraphAPI";
import { Account, TNodeElement } from "@/lib/telegraphAPI/types";
import { Session } from "next-auth";

export const createTelegraphAccount = async (session: Session) => {
  if (!session.user) {
    throw new Error("No user session found");
  }

  const response: Account = await createAccount(session.user.name);
  try {
    await prisma.user.update({
      where: { telegramId: parseInt(session.user.id) },
      data: { telegraphToken: response.access_token },
    });
  } catch (error) {
    throw new Error(`prisma error: ${error}`);
  }
};

export const uploadImage = async (form: FormData) => {
  try {
    const response = await fetch("https://telegra.ph/upload", {
      method: "POST",
      body: form,
    });
    if (!response.ok) {
      throw new Error(`image upload error: ${response.statusText}`);
    }
    const imageUrl = (await response.json())[0].src as string;
    return imageUrl;
  } catch (error) {
    throw new Error(`image upload error: ${error}`);
  }
};

export const publishArticle = async (
  content: TNodeElement[],
  title: string,
  userId: string
) => {
  // const node = domToNode(content);
  if (content.length === 0 || title == "") {
    throw new Error("content and title cannot be empty!");
  }

  const user = await prisma.user.findUnique({
    where: { telegramId: parseInt(userId) },
  });
  // console.log(user?.telegraphToken, title, content, user?.name || undefined);
  if (user?.telegraphToken) {
    try {
      const response = await createPage(
        user.telegraphToken,
        title,
        content,
        user.name || undefined
      );
      console.log(await response.json());

      if (!response.ok) {
        throw new Error(`Error in publishing article: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Publishing error: ${error}`);
    }
  }
};
