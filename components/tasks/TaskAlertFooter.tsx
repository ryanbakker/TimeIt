"use client";

import React, { useTransition } from "react";
import { AlertDialogAction, AlertDialogFooter } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { deleteTask } from "@/lib/database/actions/task.actions";
import { usePathname } from "next/navigation";
import { runFireworks } from "@/lib/confetti";

function TaskAlertFooter({ taskId }: { taskId: string }) {
  const pathname = usePathname();
  let [isPending, startTransition] = useTransition();

  return (
    <AlertDialogFooter className="flex flex-row !justify-between w-full">
      <Button
        onClick={() =>
          startTransition(async () => {
            await deleteTask({ taskId, path: pathname });

            runFireworks();
          })
        }
        className="bg-transparent border border-indigo-700 dark:border-indigo-500 dark:text-indigo-500 hover:dark:bg-indigo-500 text-indigo-700 hover:bg-indigo-700 hover:text-white transition-all"
      >
        Completed
      </Button>
      <AlertDialogAction>Close</AlertDialogAction>
    </AlertDialogFooter>
  );
}

export default TaskAlertFooter;
