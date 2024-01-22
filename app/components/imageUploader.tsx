"use client";

import { FormEvent, useRef, useState } from "react";
import { uploadImage } from "../actions/actions";

export default function ImageUpload() {
  //state to manage file upload
  const [imgUrl, setImgUrl] = useState(null);
  const imgRef = useRef<HTMLImageElement>(null);
  return (
    <>
      <form
        encType="multipart/form-data"
        target="_blank"
        onSubmit={async (e: FormEvent) => {
          e.preventDefault();
          const form = new FormData(e.target as HTMLFormElement);
          const imgUrl = await uploadImage(form);

          if (imgRef.current)
            imgRef.current.src = `https://telegra.ph/${imgUrl}`;
          console.log(imgUrl);
        }}
      >
        <label htmlFor="select-file">Select Image(&lt;5M):</label>
        <input id="select-file" name="file0" type="file" />
        <input value="click to upload" type="submit" />
        <img src="" ref={imgRef} alt="img" />
      </form>
    </>
  );
}
