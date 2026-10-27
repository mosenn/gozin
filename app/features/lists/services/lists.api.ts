import { api } from "@/store/api";
import {
  AddToListResponse,
  GetMyListsResponse,
} from "../types/list.types";

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

    updateListItem: builder.mutation<
      unknown,
      {
        listId: string;
        itemId: string;
        status?: string;
        order?: number;
        note?: string;
      }
    >({
      query: ({ listId, itemId, ...body }) => ({
        url: `/lists/my-lists/${listId}/items/${itemId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { listId }) => [
        { type: "MyList", id: listId },
      ],
    }),

    deleteListItem: builder.mutation<
      unknown,
      {
        listId: string;
        itemId: string;
      }
    >({
      query: ({ listId, itemId }) => ({
        url: `/lists/my-lists/${listId}/items/${itemId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { listId }) => [
        { type: "MyList", id: listId },
      ],
    }),

    moveListItem: builder.mutation<
      unknown,
      {
        listId: string;
        itemId: string;
        targetListId: string;
        order: number;
      }
    >({
      query: ({ listId, itemId, targetListId, order }) => ({
        url: `/lists/my-lists/${listId}/items/${itemId}/move`,
        method: "PATCH",
        body: {
          targetListId,
          order,
        },
      }),
      invalidatesTags: (
        _result,
        _error,
        { listId, targetListId }
      ) => [
        { type: "MyList", id: listId },
        { type: "MyList", id: targetListId },
      ],
    }),

    reorderListItems: builder.mutation<
      unknown,
      {
        listId: string;
        items: {
          id: string;
          order: number;
        }[];
      }
    >({
      query: ({ listId, items }) => ({
        url: `/lists/my-lists/${listId}/items/reorder`,
        method: "PATCH",
        body: { items },
      }),
      invalidatesTags: (_result, _error, { listId }) => [
        { type: "MyList", id: listId },
      ],
    }),
  }),
});

export const {
  useGetMyListsQuery,
  useLazyGetMyListsQuery,
  useAddToListMutation,
  useUpdateListItemMutation,
  useDeleteListItemMutation,
  useMoveListItemMutation,
  useReorderListItemsMutation,
} = listsApi;