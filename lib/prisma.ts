import { TelegramUserData } from "@telegram-auth/server";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function createUserOrUpdate(user: TelegramUserData) {
  if (typeof user.id !== "number") {
    user.id = parseInt(user.id);
  }

  return prisma.user.upsert({
    where: {
      telegramId: user.id,
    },
    create: {
      telegramId: user.id,
      name: user.first_name,
      image: user.photo_url,
    },
    update: {
      name: user.first_name,
      image: user.photo_url,
    },
  });
}
