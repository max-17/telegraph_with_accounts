"use client";

import { Toggle } from "@/components/ui/toggle";
import {
  useEditor,
  EditorContent,
  FloatingMenu,
  BubbleMenu,
} from "@tiptap/react";
import Image from "@tiptap/extension-image";
import StarterKit from "@tiptap/starter-kit";
import { uploadImage } from "../actions/actions";
import React, { useCallback } from "react";

// define your extension array
const extensions = [StarterKit, Image];

const content = `<p>This is a basic example of implementing images. Drag to re-order.</p>
<img src="https://source.unsplash.com/8xznAGy4HcY/800x400" />
<img src="https://source.unsplash.com/K9QHL52rE2k/800x400" />`;

const Tiptap = () => {
  const editor = useEditor({
    extensions,
    content,
    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
    },
  });

  const addImage = async (e: React.FormEvent<HTMLInputElement>) => {
    if (!editor) return;
    e.preventDefault();
    const form = new FormData();
    const input = e.target as HTMLInputElement;
    if (input.files) {
      form.append("file", input.files[0]);
    } else throw "no file";

    try {
      const imgUrl = await uploadImage(form);
      editor
        .chain()
        .focus()
        .setImage({ src: `https://telegra.ph/${imgUrl}` })
        .run();
    } catch (e) {
      console.error(e);
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <>
      <EditorContent
        className="h-min-96 border border-gray-500"
        editor={editor}
      />

      <FloatingMenu editor={editor} className="absolute-left">
        <div className="flex flex-row">
          <input
            id="img"
            className="hidden-input"
            type="file"
            onChange={addImage}
          />
          <label
            htmlFor="img"
            className="bg-slate-500 p-2"
            onClick={() => console.log("add image label")}
          >
            add image
          </label>
          <button>asdada</button>
        </div>
        {/* <button onClick={() => addImage()}>add image</button> */}
      </FloatingMenu>

      <BubbleMenu className="bg-slate-600" editor={editor}>
        <Toggle
          size="sm"
          pressed={editor.isActive("heading")}
          onPressedChange={() => {
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
        >
          H<sub>2</sub>
        </Toggle>
      </BubbleMenu>
      <button onClick={() => console.log(editor.getJSON().content)}>log</button>
    </>
  );
};

export default Tiptap;
