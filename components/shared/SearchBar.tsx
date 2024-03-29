"use client";

import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";

function SearchBar({
  placeholder = "Search title...",
}: {
  placeholder?: string;
}) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = "";

      if (query) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: query,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["query"],
        });
      }

      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, searchParams, router]);

  return (
    <div className="relative flex flex-row items-center w-full md:max-w-[360px]">
      <Search
        size={22}
        className="text-neutral-600 dark:text-neutral-300 absolute left-3"
      />
      <Input
        type="text"
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
        className="shadow-none border border-neutral-300 ring-0 pl-[45px] focus-visible:ring-transparent focus:border-neutral-800 !py-5"
        disabled
      />
    </div>
  );
}

export default SearchBar;
