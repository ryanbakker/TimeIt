import GradesPreview from "@/components/shared/GradesPreview";
import NotesCollection from "@/components/shared/NotesCollection";
import WelcomeHeading from "@/components/shared/WelcomeHeading";
import { Button } from "@/components/ui/button";
import { getAllNotes } from "@/lib/database/actions/note.actions";
import { SearchParamProps } from "@/types";
import { Plus, StickyNote } from "lucide-react";
import Link from "next/link";

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const notes = await getAllNotes({
    query: searchText,
    category,
    page: 1,
    limit: 3,
  });

  return (
    <>
      <section className="relative overflow-hidden py-8 -z-10">
        <WelcomeHeading />

        <div className="pattern-dots pattern-indigo-700 pattern-bg-indigo-300 pattern-size-4 pattern-opacity-20 h-screen w-full absolute top-0 left-0 -z-10" />
        <div className="radial-filter" />
      </section>

      <section className="bg-neutral-100 pt-12 pb-20 mb-16">
        <GradesPreview />
      </section>

      <section className="wrapper mt-8">
        <div className="w-fit">
          <h2 className="font-semibold text-2xl text-indigo-900 dark:text-indigo-50 ">
            Tasks
          </h2>
          <div className="h-[2.5px] w-full bg-indigo-800 dark:bg-indigo-50 rounded-full" />
        </div>
      </section>

      <section className="bg-neutral-100 py-10 mt-16 mb-10">
        <div className="wrapper">
          <div className="flex flex-row items-end justify-between">
            <div>
              <h2 className="font-semibold text-2xl text-indigo-900 dark:text-indigo-50">
                Notes
              </h2>
              <div className="h-[2.5px] w-full bg-indigo-800 dark:bg-indigo-50 rounded-full" />
            </div>
            <Button size="lg" asChild>
              <Link
                href="/notes/create"
                className="flex flex-row items-center gap-1"
              >
                <Plus size={18} /> Create Note
              </Link>
            </Button>
          </div>

          <NotesCollection
            data={notes?.data}
            emptyTitle="No Meets Found"
            emptyStateSubtext="Come back later"
            limit={3}
            page={1}
            totalPages={1}
          />

          <Button size="lg" asChild>
            <Link href="/notes" className="flex flex-row items-center gap-2">
              <StickyNote size={18} /> Go to Notes
            </Link>
          </Button>
        </div>
      </section>

      <section className="wrapper mb-16">
        <div className="w-fit">
          <h2 className="font-semibold text-2xl text-indigo-900 dark:text-indigo-50">
            Schedule
          </h2>
          <div className="h-[2.5px] w-full bg-indigo-800 dark:bg-indigo-50 rounded-full" />
        </div>
      </section>
    </>
  );
}
