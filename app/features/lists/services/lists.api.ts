import { api } from "@/store/api";
import { AddToListResponse, GetMyListsResponse } from "../types/list.types";

export const listsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyLists: builder.query<GetMyListsResponse, void>({
      query: () => ({
        url: "/lists/my-lists",
        method: "GET",
      }),
    }),

    addToList: builder.mutation<
      AddToListResponse,
      {
        listId: string;
        titleId: string;
        order: number;
        note: string;
        status: string;
      }
    >({
      query: ({ listId, ...body }) => ({
        url: `/lists/my-lists/${listId}/items`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLazyGetMyListsQuery,
  useAddToListMutation,
} = listsApi;