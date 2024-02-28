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
import { publishArticle, uploadImage } from "../actions/actions";
import { createPage, domToNode } from "@/lib/telegraphAPI/telegraphAPI";
// import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { useRef } from "react";

// define your extension array
const extensions = [StarterKit, Image];

const content = `Content...`;

const Tiptap = ({ session }: { session: Session }) => {
  const editor = useEditor({
    extensions,
    content,
    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
    },
  });

  const titleRef = useRef<HTMLInputElement>(null);

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
      <h3>
        <input
          className="bg-inherit my-4 w-full"
          placeholder="Title..."
          ref={titleRef}
          required
          type="text"
          id="title"
          name="title"
        />
      </h3>

      <EditorContent className="h-min-96" editor={editor} />

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
      <button
        onClick={async () => {
          const content = domToNode(editor.view.dom);
          if (!content || !content?.children) {
            console.error("content cannot be empty!");
          } else
            publishArticle(
              content.children,
              titleRef.current?.value || "",
              session.user.id
            );
        }}
      >
        publish
      </button>
    </>
  );
};

export default Tiptap;
