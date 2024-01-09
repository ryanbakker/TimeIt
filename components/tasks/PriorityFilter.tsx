"use client";

import { getAllPriorities } from "@/lib/database/actions/priority.actions";
import { IPriority } from "@/lib/database/models/priority.model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Filter } from "lucide-react";

function PriorityFilter() {
  const [priorities, setPriorities] = useState<IPriority[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getPriorities = async () => {
      const priorityList = await getAllPriorities();

      priorityList && setPriorities(priorityList as IPriority[]);
    };

    getPriorities();
  }, []);

  const onSelectedPriority = (priority: string) => {
    let newUrl = "";

    if (priority && priority !== "All") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "priority",
        value: priority,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["priority"],
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="w-full md:max-w-[360px] flex flex-row items-center relative">
      <Filter
        size={22}
        className="text-neutral-600 dark:text-neutral-300 absolute left-3"
      />
      <Select onValueChange={(value: string) => onSelectedPriority(value)}>
        <SelectTrigger className="w-full md:max-w-[360px] shadow-none border border-neutral-300 ring-0 pl-[45px] focus-visible:ring-transparent focus:border-neutral-800 focus:ring-0 py-5">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All</SelectItem>

          {priorities.map((priority) => (
            <SelectItem value={priority.name} key={priority._id}>
              {priority.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default PriorityFilter;
