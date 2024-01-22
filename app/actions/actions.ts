"use server";

import { prisma } from "@/lib/prisma";
import { createAccount } from "@/lib/telegraphAPI/telegraphAPI";
import { Account, imageUploadResponse } from "@/lib/telegraphAPI/types";
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
  const response = await fetch("https://telegra.ph/upload", {
    method: "POST",
    body: form,
  });
  const data = await response.json();
  // console.log(data[0].src);

  return data[0].src;
};
