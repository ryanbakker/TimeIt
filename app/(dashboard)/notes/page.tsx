import Heading from "@/components/shared/Heading";
import NotesCollection from "@/components/shared/NotesCollection";
import { Button } from "@/components/ui/button";
import { getAllNotes } from "@/lib/database/actions/note.actions";
import { SearchParamProps } from "@/types";
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
      <Heading
        title="Notes"
        subtitle="Create and store all your class notes in one place"
      />

      <div className="wrapper !pt-0">
        <Button asChild size="lg" className="hover:bg-indigo-700">
          <Link href="/notes/create">Create Note</Link>
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
