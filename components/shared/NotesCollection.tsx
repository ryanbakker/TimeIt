import { NoteCollectionProps } from "@/types";
import React from "react";
import Card from "./Card";
import Pagination from "./Pagination";

function NotesCollection({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
}: NoteCollectionProps) {
  return (
    <>
      {data.length > 0 ? (
        <div className="pb-6">
          <ul className="wrapper grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {data.map((note) => (
              <li
                key={note._id}
                className="border border-indigo-800/30 shadow-md rounded-md hover:shadow-lg transition-all scale-100 hover:scale-[1.004] ease-in-out w-full"
              >
                <Card note={note} />
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
        <div className="flex items-center justify-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-lg bg-slate-800 text-white py-28 text-center">
          <h3 className="font-semibold text-xl">{emptyTitle}</h3>
          <p className="text-slate-200">{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
}

export default NotesCollection;
