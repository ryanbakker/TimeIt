"use client";

import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { deleteSelectedCategory } from "@/lib/database/actions/category.actions";
import { useTransition } from "react";

function DeleteCategory({ categoryId }: { categoryId: string }) {
  let [isPending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className="bg-neutral-100 rounded-md p-1 shadow-md"
        title="Delete Note"
      >
        <Trash2 className="text-red-400 hover:text-red-500 transition-all" />
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>
            This will permenantly delete this category
          </AlertDialogTitle>
          <AlertDialogDescription className="p-regular-16 text-grey-600">
            Changes will take effect after the page reloads
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={() =>
              startTransition(async () => {
                await deleteSelectedCategory({ categoryId });
              })
            }
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteCategory;
