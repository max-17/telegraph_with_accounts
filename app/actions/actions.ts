"use server";

import { prisma } from "@/lib/prisma";
import { createAccount } from "@/lib/telegraphAPI/telegraphAPI";
import { Session } from "next-auth";

export const createTelegraphAccount = async (session: Session) => {
  console.log("sesion: ", session);
  const response = await createAccount("short_name", "Anonymus");
  console.log(response);
  try {
    await prisma.user.update({
      where: { telegramId: parseInt(session.user?.id) },
      data: { telegraphToken: response.result.access_token },
    });
  } catch (error) {
    console.log("prisma error: ", error);
  }
};
