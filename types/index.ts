// User Params

import { INote } from "@/lib/database/models/note.model";

export type CreateUserParams = {
  clerkId: string;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  photo: string;
};

// Note Params

export type CreateNoteParams = {
  userId: string;
  note: {
    title: string;
    content: string;
    categoryId: string;
  };
  path: string;
};

export type UpdateNoteParams = {
  userId: string;
  note: {
    _id: string;
    title: string;
    content: string;
    categoryId: string;
  };
  path: string;
};

export type DeleteNoteParams = {
  noteId: string;
  path: string;
};

export type GetAllNotesParams = {
  query: string;
  category: string;
  limit: number;
  page: number;
};

export type GetNotesByUserParams = {
  userId: string;
  limit?: number;
  page: number;
};

export type GetRelatedNotesByCategoryParams = {
  categoryId: string;
  noteId: string;
  limit?: number;
  page: number | string;
};

export type Note = {
  _id: string;
  title: string;
  content: string;
  creator: {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
  };
  category: {
    _id: string;
    name: string;
  };
};

// Category Params
export type CreateCategoryParams = {
  categoryName: string;
};

// URL Query Params
export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

export type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// Props

export type NoteFormProps = {
  userId: string;
  type: "Create" | "Update";
  note?: INote;
  noteId?: string;
};

export type NoteCollectionProps = {
  data: INote[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  collectionType?: "All_Notes" | "Preview_Notes";
};
