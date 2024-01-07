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

export const columnsLite: ColumnDef<Grades>[] = [
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
];
