// User Params

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

// Category

export type CreateCategoryParams = {
  categoryName: string;
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
  organizer: {
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
