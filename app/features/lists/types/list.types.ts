import { Title } from "@/features/movies/type/movies.type";
import { createListSchema } from "../schemas/list.schema";
import z from "zod";

export type MyList = {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  tags: string[];
  privacy: "PUBLIC" | "PRIVATE"|"LINK_ONLY"|"MEMBERS_ONLY";
  publishedAt: string|null;
  shareExpiry: string | null;
  shareSlug: string | null;
  userId: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  _count: {
    comments: number;
    items: number;
    reactions: number;
    saves: number;
  };
};

export type GetMyListsResponse = {
  items: MyList[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export type AddToListResponse = {
  id: string;
  listId: string;
  titleId: string;
  order: number;
  note: string;
  status: string;
  title: Title;
};


export type CreateListFormValues = z.infer<typeof createListSchema>;

export type CreateListResponse = {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  tags: string[];
  privacy: "PUBLIC" | "PRIVATE";
  userId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  shareExpiry: string | null;
  shareSlug: string | null;
  viewCount: number;
  user: {
    id: string;
    username: string;
    displayName: string | null;
    avatarUrl: string;
  };
};

export type MyListItem = {
  id: string;
  listId: string;
  titleId: string;
  order: number;
  note: string;
  status: string;
  title: Title;
};

export type GetMyListResponse = MyList & {
  items: MyListItem[];
};