import { ITask } from "@/lib/database/models/task.model";
import Pagination from "../shared/Pagination";
import TaskCard from "./TaskCard";

type TaskCollectionProps = {
  data: ITask[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
};

function TaskCollection({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  urlParamName,
}: TaskCollectionProps) {
  return (
    <>
      {data.length > 0 ? (
        <div className="pb-6">
          <ul className="wrapper grid grid-cols-1 gap-5 sm:grid-cols-3 md:grid-cols-4 xl:gap-10">
            {data.map((task) => (
              <li
                key={task._id}
                className="border border-indigo-800/30 shadow-md rounded-md hover:shadow-lg transition-all scale-100 hover:scale-[1.004] ease-in-out w-full"
              >
                <TaskCard task={task} />
              </li>
            ))}
          </ul>

          {totalPages > 1 && (
            <Pagination
              urlParamName={urlParamName}
              page={page}
              totalPages={totalPages}
            />
          )}
        </div>
      ) : (
        <section className="wrapper">
          <div className="flex items-center justify-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-lg bg-gradient-to-tr from-indigo-950 to-indigo-800 text-white py-28 text-center">
            <h3 className="font-semibold text-xl">{emptyTitle}</h3>
            <p className="text-slate-200">{emptyStateSubtext}</p>
          </div>
        </section>
      )}
    </>
  );
}

export default TaskCollection;
