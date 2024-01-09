"use client";

import { getAllCategories } from "@/lib/database/actions/category.actions";
import { ICategory } from "@/lib/database/models/category.model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { Filter } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

function NoteFilter({ userId }: { userId: string }) {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories({ userId });

      categoryList && setCategories(categoryList as ICategory[]);
    };

    getCategories();
  }, []);

  const onSelectedCategory = (category: string) => {
    let newUrl = "";

    if (category && category !== "All") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "category",
        value: category,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["category"],
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
      <Select onValueChange={(value: string) => onSelectedCategory(value)}>
        <SelectTrigger className="w-full md:max-w-[360px] shadow-none border border-neutral-300 ring-0 pl-[45px] focus-visible:ring-transparent focus:border-neutral-800 focus:ring-0 py-5">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All</SelectItem>

          {categories.map((category) => (
            <SelectItem value={category.name} key={category._id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default NoteFilter;
