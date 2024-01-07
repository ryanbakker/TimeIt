import BackButton from "@/components/shared/BackButton";
import { FullDeleteConfirmation } from "@/components/shared/FullDeleteConfirmation";
import { markdownToHtml } from "@/components/shared/MarkdownPreview";
import { Button } from "@/components/ui/button";
import { getNoteById } from "@/lib/database/actions/note.actions";
import { multiFormatDateString } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import { FileEdit } from "lucide-react";
import Link from "next/link";

async function Note({ params: { id }, searchParams }: SearchParamProps) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const note = await getNoteById(id);
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
    <>
      <section className="wrapper flex flex-row justify-between items-end w-full">
        <div>
          <div className="relative w-fit pt-8 flex flex-row items-center pb-8">
            <h1 className="text-3xl font-semibold text-indigo-900 dark:text-indigo-50 line-clamp-2">
              {note.title}
            </h1>
          </div>

          <BackButton />
        </div>
        <div className="!py-0 flex flex-col gap-2 w-fit items-end">
          <p className="bg-indigo-800/10 px-5 py-1 rounded-md w-fit font-semibold text-indigo-700">
            {note.category.name}
          </p>
          <p className="bg-indigo-800/10 px-5 py-1 rounded-md w-fit font-semibold text-indigo-700">
            Created: {multiFormatDateString(note.createdAt.toString())}
          </p>
        </div>
      </section>

      <section className="mt-2 border-t border-b bg-white dark:bg-slate-800 border-neutral-300 dark:border-neutral-700 !p-1">
        <div
          dangerouslySetInnerHTML={{ __html: htmlContent || "" }}
          className="wrapper blog-post-content py-5 rounded-lg min-h-[400px]"
        />
      </section>

      <div className="wrapper flex flex-row gap-2 items-center z-50 mb-12">
        <Link
          href={`/notes/${note._id}/edit`}
          className="flex flex-row gap-1.5 items-center rounded-md py-2 px-8 bg-slate-500 text-white hover:bg-slate-600"
        >
          <FileEdit size={18} /> Edit
        </Link>
        <FullDeleteConfirmation noteId={note._id} />
      </div>
    </>
  );
}

export default Note;
