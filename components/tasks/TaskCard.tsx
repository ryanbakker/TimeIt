import { ITask } from "@/lib/database/models/task.model";
import { formatSimpleDate } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import PriorityLabel from "./PriorityLabel";
import TaskAlertFooter from "./TaskAlertFooter";

type CardProps = {
  task: ITask;
};

async function TaskCard({ task }: CardProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="relative cursor-pointer">
          <div className="px-4 py-4 shadow-sm z-10 bg-gradient-to-tr from-indigo-600 via-indigo-600 to-indigo-500 rounded-t-md">
            <h4 className="text-lg font-semibold text-white dark:text-white line-clamp-1">
              {task.title}
            </h4>
          </div>
          <div className="bg-indigo-50 dark:bg-slate-700 relative px-4 py-3 flex-1 rounded-b-md z-0 min-h-[140px] w-full flex flex-col justify-between">
            <div className="flex flex-col z-50 justify-between gap-3 flex-1 py-2">
              <p className="line-clamp-2 font-light">{task.description}</p>
              <div className="flex flex-row justify-between md:flex-col lg:flex-row gap-1">
                <PriorityLabel label={task.priority.name} />
                <p className="py-1 px-3 bg-neutral-300/80 text-neutral-700 rounded-sm text-sm font-medium">
                  Due: {formatSimpleDate(task.deadline.toString())}
                </p>
              </div>
            </div>
          </div>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="dark:bg-slate-800">
        <AlertDialogHeader>
          <AlertDialogTitle>{task.title}</AlertDialogTitle>
          <AlertDialogDescription>{task.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <TaskAlertFooter taskId={task._id} />
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default TaskCard;
