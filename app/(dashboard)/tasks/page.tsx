import BackButton from "@/components/shared/BackButton";
import Heading from "@/components/shared/Heading";
import PriorityFilter from "@/components/tasks/PriorityFilter";
import SearchTasks from "@/components/tasks/SearchTasks";
import TaskCollection from "@/components/tasks/TaskCollection";
import TaskForm from "@/components/tasks/TaskForm";
import { getAllTasks } from "@/lib/database/actions/task.actions";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";

async function Tasks({ searchParams }: SearchParamProps) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams.query as string) || "";
  const priority = (searchParams?.priority as string) || "";

  const tasks = await getAllTasks({
    query: searchText,
    priority,
    page: page,
    limit: 8,
  });

  return (
    <>
      <section>
        <Heading
          title="Tasks"
          subtitle="Create tasks for projects and assignments to help keep track of your work. Prioritise your work and remeber to hit completed when it's done!"
        />

        <div className="wrapper flex flex-row items-center justify-between gap-8 md:gap-0">
          <BackButton />
          <div className="wrapper hidden md:flex flex-row items-center gap-3 justify-center">
            <SearchTasks />
            <PriorityFilter />
          </div>
          <TaskForm userId={userId} />
        </div>

        <div className="wrapper flex md:hidden flex-col items-center gap-3 justify-center">
          <SearchTasks />
          <PriorityFilter />
        </div>
      </section>

      <TaskCollection
        data={tasks?.data}
        emptyTitle="Good Job!"
        emptyStateSubtext="No tasks to complete"
        limit={6}
        page={page}
        totalPages={tasks?.totalPages}
      />
    </>
  );
}

export default Tasks;
