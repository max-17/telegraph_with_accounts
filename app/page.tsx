import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import SignInButton from "./components/signinButton";
import { CreateAccountButton } from "./components/telegraph";
import { prisma } from "@/lib/prisma";
import ImageUpload from "./components/imageUploader";
import { Editor } from "@tiptap/react";
import Tiptap from "./components/tipTap";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <SignInButton botUsername={process.env.BOT_USERNAME as string} />
        <div className="flex flex-col editor-div container max-w-[732px]">
          {/* <ImageUpload /> */}
          <Tiptap />
        </div>
      </main>
    );
  }

  const user = await prisma.user.findUnique({
    where: { telegramId: parseInt(session.user.id) },
  });
  if (!user) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <SignInButton botUsername={process.env.BOT_USERNAME as string} />
        <div className="flex flex-col editor-div container max-w-[732px]">
          <embed
            src="https://telegra.ph/Test-Image-01-14"
            width="680"
            height="480"
          ></embed>
        </div>
      </main>
    );
  }
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="flex flex-col items-center p-2 border border-b-2 w-screen">
        loged in
        <h1>{user.name}</h1>
        <h1 className="truncate max-w-[300px]">{user?.image}</h1>
        <h1>{user.telegramId}</h1>
      </div>
      {!user.telegraphToken && <CreateAccountButton session={session} />}
      <div className="flex flex-col editor-div container max-w-[732px]">
        <ImageUpload />
        <br />
        <Tiptap />
      </div>
    </main>
  );
}
