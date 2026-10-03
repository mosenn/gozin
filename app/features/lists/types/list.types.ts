import { Title } from "@/features/movies/type/movies.type";

export type MyList = {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  tags: string[];
  privacy: "PUBLIC" | "PRIVATE";
  publishedAt: string;
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
