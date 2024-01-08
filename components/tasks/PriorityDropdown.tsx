import {
  createPriority,
  getAllPriorities,
} from "@/lib/database/actions/priority.actions";
import { IPriority } from "@/lib/database/models/priority.model";
import { startTransition, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
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
import { Input } from "../ui/input";

type PriorityProps = {
  value?: string;
  onChangeHandler?: () => void;
};

function PriorityDropdown({ value, onChangeHandler }: PriorityProps) {
  const [priorities, setPriorities] = useState<IPriority[]>([]);
  const [newPriority, setNewPriority] = useState("");

  const handleAddPriority = () => {
    createPriority({
      priorityName: newPriority.trim(),
    }).then((priority) => {
      setPriorities((prevState) => [...prevState, priority]);
    });
  };

  useEffect(() => {
    const getPriorities = async () => {
      const priorityList = await getAllPriorities();

      priorityList && setPriorities(priorityList as IPriority[]);
    };

    getPriorities();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger>
        <SelectValue placeholder="Task Priority" />
      </SelectTrigger>
      <SelectContent>
        {priorities.length > 0 &&
          priorities.map((priority) => (
            <SelectItem key={priority._id} value={priority._id}>
              {priority.name}
            </SelectItem>
          ))}

        {/* <AlertDialog>
          <AlertDialogTrigger className="flex w-full rounded-sm py-3 pl-8 text-slate-950 hover:bg-slate-700 hover:text-white bg-slate-400 focus:text-purple-500">
            Add New Priority
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Add New Priority</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  placeholder="Priority level"
                  className="input-field mt-3"
                  onChange={(e) => setNewPriority(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => startTransition(handleAddPriority)}
              >
                Add
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog> */}
      </SelectContent>
    </Select>
  );
}

export default PriorityDropdown;
