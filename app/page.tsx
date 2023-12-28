import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import SignInButton from "./components/signinButton";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <SignInButton botUsername={process.env.BOT_USERNAME as string} />
      </main>
    );
  } else {
    const { user } = session;
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="flex flex-col items-center mt-10">
          loged in
          <h1>{user?.name}</h1>
          <h1 className="truncate max-w-[300px]">{user?.image}</h1>
          <h1>{user?.id}</h1>
        </div>
      </main>
    );
  }
}
