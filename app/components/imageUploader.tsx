"use client";

import { useRef, useState } from "react";
import { uploadImage } from "../actions/actions";

export default function ImageUpload() {
  const [imgUrl, setImgUrl] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const form = new FormData();
    const input = e.target as HTMLInputElement;
    if (input.files) {
      form.append("file", input.files[0]);
    } else throw "no file";

    try {
      const imgUrl = await uploadImage(form);
      setImgUrl(`https://telegra.ph/${imgUrl}`);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <input
        id="file-input"
        className="hidden"
        type="file"
        onInput={handleUpload}
      />
      <label htmlFor="file-input" className="border bg-green-500 w-fit p-2">
        upload image
      </label>

      <img hidden={!imgUrl} src={imgUrl} alt="img" />
    </>
  );
}
