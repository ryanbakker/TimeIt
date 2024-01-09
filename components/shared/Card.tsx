import { INote } from "@/lib/database/models/note.model";
import { auth } from "@clerk/nextjs";
import { FileEdit, Trash2 } from "lucide-react";
import Link from "next/link";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { multiFormatDateString } from "@/lib/utils";
import { useState } from "react";
import { markdownToHtml } from "./MarkdownPreview";

type CardProps = {
  note: INote;
  cardType: string;
};

async function Card({ note, cardType }: CardProps) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const isNoteCreator = userId === note.creator._id.toString();
  const content = note.content as string;

  const convertToHtml = async (content: string) => {
    try {
      const htmlContent = await markdownToHtml(content);
      return htmlContent;
    } catch (error) {
      console.error(error);
      return;
    }
  };

  const htmlContent = await convertToHtml(content);

  return (
    <div className="relative">
      <Link href={`/notes/${note._id}`}>
        <div className="px-4 py-4 shadow-sm z-10 bg-gradient-to-tr from-indigo-600 via-indigo-600 to-indigo-500 rounded-t-md">
          <h4 className="text-lg font-semibold text-white dark:text-white line-clamp-1">
            {note.title}
          </h4>
        </div>
        <div className="bg-indigo-300/20 relative px-4 py-3 flex-1 rounded-b-md z-0 min-h-[160px] w-full flex flex-col justify-between">
          {note.category?.name && (
            <p className="bg-slate-600/20 w-fit px-2 py-0.5 rounded-sm text-slate-700 font-medium">
              {note.category.name}
            </p>
          )}
          <section
            className="line-clamp-2 text-base text-slate-800 dark:text-slate-300 font-light"
            dangerouslySetInnerHTML={{ __html: htmlContent || "" }}
          />

          <div className="flex flex-row pt-5 items-center justify-between z-50">
            <p className="font-light text-sm text-slate-600 dark:text-slate-500">
              Created: {multiFormatDateString(note.createdAt.toString())}
            </p>
          </div>

          <div className="pattern-dots pattern-indigo-800 pattern-bg-transparent pattern-size-4 pattern-opacity-5 h-full w-full absolute top-0 left-0 z-10 hover:pattern-opacity-10 hover:pattern-indigo-700 transition-all" />
        </div>
      </Link>

      <div
        className={`absolute flex flex-row gap-2 items-center z-50 right-2 bottom-2 ${
          cardType === "Preview" && "hidden"
        }`}
      >
        <Link
          href={`/notes/${note._id}/edit`}
          className="bg-neutral-100 rounded-md p-1 shadow-md"
          title="Edit Note"
        >
          <FileEdit className="text-neutral-700 hover:text-black transition-all" />
        </Link>
        <DeleteConfirmation noteId={note._id} />
      </div>
    </div>
  );
}

export default Card;
