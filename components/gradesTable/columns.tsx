"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ChevronsUpDown, Trash2 } from "lucide-react";
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
import { deleteGrade } from "@/lib/database/actions/grade.actions";

export type Grades = {
  id: string;
  assignment: string;
  credits: number;
  grade: string;
};

export const columns: ColumnDef<Grades>[] = [
  {
    accessorKey: "assignment",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center flex-row gap-1 !pl-0"
        >
          Assignment
          <ChevronsUpDown size={14} />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("assignment")}</div>
    ),
  },
  {
    accessorKey: "grade",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center flex-row gap-1 !pl-0"
        >
          Grade
          <ChevronsUpDown size={14} />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("grade")}</div>
    ),
  },
  {
    accessorKey: "credits",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center flex-row gap-1 !pl-0"
        >
          Credits
          <ChevronsUpDown size={14} />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("credits")}</div>,
  },
  {
    accessorKey: "created",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center flex-row gap-1 !pl-0"
        >
          Created
          <ChevronsUpDown size={14} />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("created")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const gradeId = row.original.id;

      const handleDelete = async () => {
        try {
          await deleteGrade({ gradeId, path: "/grade" });
        } catch (error) {
          console.error(error);
        }
      };

      return (
        <div className="min-w-[1px] text-end">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 p-0 hover:text-red-500 transition-all"
                title="Delete Grade"
              >
                <span className="sr-only">Open menu</span>
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are your sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete this grade
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
