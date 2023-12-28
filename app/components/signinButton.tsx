"use client";

import { LoginButton } from "@telegram-auth/react";
import { signIn } from "next-auth/react";

export default function SignInButton({ botUsername }: { botUsername: string }) {
  return (
    <LoginButton
      botUsername={botUsername}
      onAuthCallback={(data) => {
        signIn("telegram-login", { callbackUrl: "/" }, data as any);
      }}
    />
  );
}
