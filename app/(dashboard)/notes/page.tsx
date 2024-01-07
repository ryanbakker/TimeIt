import Heading from "@/components/shared/Heading";
import NotesCollection from "@/components/shared/NotesCollection";
import { Button } from "@/components/ui/button";
import { getAllNotes } from "@/lib/database/actions/note.actions";
import { SearchParamProps } from "@/types";
import { Plus } from "lucide-react";
import Link from "next/link";

async function Notes({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const notes = await getAllNotes({
    query: searchText,
    category,
    page: page,
    limit: 6,
  });

  return (
    <>
      <div className="wrapper flex flex-row items-end justify-between mt-12">
        <div>
          <div className="w-fit">
            <h1 className="text-3xl font-semibold text-indigo-900 dark:text-indigo-50">
              Notes
            </h1>

            <div className="h-[3px] w-full bg-indigo-900 dark:bg-indigo-50 rounded-full" />
          </div>
          <h2 className="pt-2 text-slate-600 dark:text-slate-400 font-light">
            Create and store all your class notes in one place
          </h2>
        </div>

        <Button
          asChild
          size="lg"
          className="hover:bg-indigo-700 flex flex-row gap-1.5 items-center"
        >
          <Link href="/notes/create">
            <Plus size={18} /> Create Note
          </Link>
        </Button>
      </div>

      <section>
        <NotesCollection
          data={notes?.data}
          emptyTitle="No Meets Found"
          emptyStateSubtext="Come back later"
          limit={6}
          page={page}
          totalPages={notes?.totalPages}
        />
      </section>
    </>
  );
}

export default Notes;
