"use client";
import { createAccount } from "@/lib/telegraphAPI";
import type { Session } from "next-auth";
import { useRef } from "react";

export const CreateAccountButton = ({ session }: { session: Session }) => {
  const createTelegraphAccount = async () => {
    const response = await createAccount({
      short_name: "test-acc",
      author_name: "Anonymus",
    });
    console.log(response);
  };
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <input className="text-black" ref={inputRef} type="text" />
      <button
        onClick={() => createTelegraphAccount()}
        className="bg-blue-700 p-2 rounded-full"
      >
        create telegraph account
      </button>
    </>
  );
};
