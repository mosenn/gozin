import { api } from "@/store/api";
import { GetMyListResponse } from "../types/list.types";


export const myListApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyListById: builder.query<GetMyListResponse, string>({
      query: (id) => ({
        url: `/lists/my-lists/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [
        { type: "MyList", id },
      ],
    }),

    updateMyList: builder.mutation<
      unknown,
      {
        id: string;
        title?: string;
        description?: string;
        coverUrl?: string;
        tags?: string[];
        privacy?:string;

      }
    >({
      query: ({ id, ...body }) => ({
        url: `/lists/my-lists/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "MyList", id },
      ],
    }),
  }),
});

export const {
  useLazyGetMyListByIdQuery,
  useUpdateMyListMutation,
} = myListApi;
