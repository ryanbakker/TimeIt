import BackButton from "@/components/shared/BackButton";
import Heading from "@/components/shared/Heading";
import NoteFilter from "@/components/shared/NoteFilter";
import NotesCollection from "@/components/shared/NotesCollection";
import SearchBar from "@/components/shared/SearchBar";
import { Button } from "@/components/ui/button";
import { getAllNotes } from "@/lib/database/actions/note.actions";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Link from "next/link";

async function Notes({ searchParams }: SearchParamProps) {
  const { sessionClaims } = auth();
  const creator = sessionClaims?.userId as string;
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const notes = await getAllNotes({
    creator: creator,
    query: searchText,
    category,
    page: page,
    limit: 8,
  });

  return (
    <>
      <section>
        <Heading
          title="Notes"
          subtitle="All your notes in one place. Create, edit, search and filter through your notes to never lose information. Notes can be created using markdown."
        />

        <div className="wrapper flex flex-row items-center justify-between gap-8 md:gap-0">
          <BackButton />
          <div className="wrapper hidden md:flex flex-row items-center gap-3 justify-center">
            <SearchBar />
            <NoteFilter userId={creator} />
          </div>
          <Button
            asChild
            size="lg"
            className="flex flex-row items-center gap-2 w-full md:w-fit"
          >
            <Link href="/notes/create">
              <Plus size={18} /> Create Note
            </Link>
          </Button>
        </div>

        <div className="wrapper flex md:hidden flex-col items-center gap-3 justify-center">
          <SearchBar />
          <NoteFilter userId={creator} />
        </div>
      </section>

      <section>
        <NotesCollection
          data={notes?.data}
          emptyTitle="You have no notes"
          emptyStateSubtext="Create new notes to see them here"
          limit={6}
          page={page}
          totalPages={notes?.totalPages}
          collectionType="Main"
        />
      </section>
    </>
  );
}

export default Notes;
