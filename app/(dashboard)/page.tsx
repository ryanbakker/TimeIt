import Link from "next/link";
import ActionButton from "@/components/shared/ActionButton";
import GradeChart from "@/components/shared/GradeChart";
import NotesCollection from "@/components/shared/NotesCollection";
import WelcomeHeading from "@/components/shared/WelcomeHeading";
import TaskCollection from "@/components/tasks/TaskCollection";
import { columnsLite } from "@/components/gradesTable/columns-lite";
import { GradeTableLite } from "@/components/gradesTable/grade-table-lite";
import { Button } from "@/components/ui/button";
import { getAllNotes } from "@/lib/database/actions/note.actions";
import { getAllTasks } from "@/lib/database/actions/task.actions";
import { getData } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import { Calendar, Hourglass, MoveRight, Plus } from "lucide-react";

export default async function Home({ searchParams }: SearchParamProps) {
  const searchText = (searchParams.query as string) || "";
  const category = (searchParams?.category as string) || "";
  const priority = (searchParams?.priority as string) || "";

  const notes = await getAllNotes({
    query: searchText,
    category,
    page: 1,
    limit: 4,
  });

  const tasks = await getAllTasks({
    query: searchText,
    priority,
    page: 1,
    limit: 4,
  });

  const data = await getData();

  return (
    <>
      <section className="relative overflow-hidden py-8 -z-10">
        <WelcomeHeading />

        <div className="pattern-dots pattern-indigo-700 pattern-bg-indigo-300 pattern-size-4 pattern-opacity-20 h-screen w-full absolute top-0 left-0 -z-10" />

        <div className="radial-filter visible dark:hidden" />
        <div className="radial-dark invisible dark:visible" />
      </section>

      <section className="bg-white dark:bg-[#121827] pt-12 pb-20 shadow-md">
        <div className="wrapper grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col gap-10">
            <div className="w-fit">
              <h2 className="font-semibold text-3xl text-indigo-900 dark:text-indigo-50">
                Grades
              </h2>
              <div className="h-[2.5px] w-full bg-indigo-800 dark:bg-indigo-50 rounded-full" />
            </div>

            <GradeTableLite columns={columnsLite} data={data} />

            <ActionButton title="Go to Grades" icon="Award" route="/grades" />
          </div>
          <GradeChart grades={data} size="sm" />
        </div>
      </section>

      <section className="pt-24 pb-28 shadow-inner dark:bg-slate-800">
        <div className="wrapper">
          <div className="flex flex-row items-center md:items-end justify-between">
            <div>
              <h2 className="font-semibold text-3xl text-indigo-900 dark:text-indigo-50">
                Tasks
              </h2>
              <div className="h-[2.5px] w-full bg-indigo-800 dark:bg-indigo-50 rounded-full" />
            </div>

            <Button
              size="lg"
              asChild
              className="bg-indigo-600 hover:bg-indigo-900 dark:text-white"
            >
              <Link
                href="/tasks?priority=Urgent"
                className="flex flex-row items-center gap-2"
              >
                Urgent Tasks <MoveRight size={18} />
              </Link>
            </Button>
          </div>
        </div>

        <TaskCollection
          data={tasks?.data}
          emptyTitle="Good job! All tasks completed"
          emptyStateSubtext="Create new tasks to see them here"
          limit={4}
          page={1}
          totalPages={1}
        />

        <div className="wrapper">
          <ActionButton title="Go to Tasks" icon="Todo" route="/tasks" />
        </div>
      </section>

      <section className="bg-white dark:bg-[#121827] pt-24 pb-28 shadow-md">
        <div className="wrapper">
          <div className="flex flex-row items-center md:items-end justify-between">
            <div>
              <h2 className="font-semibold text-3xl text-indigo-900 dark:text-indigo-50">
                Notes
              </h2>
              <div className="h-[2.5px] w-full bg-indigo-800 dark:bg-indigo-50 rounded-full" />
            </div>
            <Button
              size="lg"
              asChild
              className="bg-indigo-600 hover:bg-indigo-900 dark:text-white"
            >
              <Link
                href="/notes/create"
                className="flex flex-row items-center gap-1"
              >
                <Plus size={18} /> Create Note
              </Link>
            </Button>
          </div>
        </div>

        <NotesCollection
          data={notes?.data}
          emptyTitle="No Notes Found"
          emptyStateSubtext="Come back later"
          limit={3}
          page={1}
          totalPages={1}
        />

        <div className="wrapper">
          <ActionButton title="Go to Notes" icon="Note" route="/notes" />
        </div>
      </section>

      <section className="bg-gradient-to-tr from-indigo-950 to-indigo-600 py-12 relative z-0">
        <div className="wrapper z-50 relative">
          <div className="w-fit mb-6">
            <h2 className="font-semibold text-3xl text-white">Schedule</h2>
            <div className="h-[2.5px] w-full bg-white rounded-full" />
          </div>

          <Button
            size="lg"
            asChild
            className="bg-white hover:bg-indigo-100 transition-all text-indigo-800"
          >
            <Link href="/schedule" className="flex flex-row items-center gap-2">
              <Calendar size={18} /> Go to Schedule
            </Link>
          </Button>

          <Hourglass
            className="absolute right-5 -bottom-[130px] text-indigo-600"
            size={250}
            fill="#4f46e5"
          />
        </div>

        <div className="pattern-dots pattern-indigo-600 pattern-bg-transparent pattern-size-4 pattern-opacity-20 h-full w-full absolute top-0 left-0 -z-10" />
      </section>
    </>
  );
}
