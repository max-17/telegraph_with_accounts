"use client";
import {
  createAccount,
  createPage,
  editAccountInfo,
  editPage,
} from "@/lib/telegraphAPI/telegraphAPI";
import type { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { createTelegraphAccount } from "../actions/actions";

export const CreateAccountButton = ({ session }: { session: Session }) => {
  return (
    <>
      <button
        onClick={async () => {
          await createTelegraphAccount(session)
            .then(() => console.log("click"))
            .catch((err) => console.log(err));
        }}
        className="bg-blue-700 p-2 rounded-full"
      >
        create telegraph account
      </button>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  );
};
