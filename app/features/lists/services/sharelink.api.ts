
import { api } from "@/store/api";

export const shareApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createShareLink: builder.mutation<
      {
        id: string;
        shareSlug: string;
        shareExpiry: string | null;
        privacy: string;
      },
      {
        id: string;
        expiresAt: string;
      }
    >({
      query: ({ id, expiresAt }) => ({
        url: `/lists/my-lists/${id}/share`,
        method: "POST",
        body: { expiresAt },
      }),

      invalidatesTags: (_result, _error, { id }) => [
        { type: "MyList", id },
      ],
    }),
    deleteShareLink: builder.mutation<void, string>({
  query: (id) => ({
    url: `/lists/my-lists/${id}/share`,
    method: "DELETE",
  }),
  invalidatesTags: (_result, _error, id) => [
    { type: "MyList", id },
  ],
}),
  }),
});

export const { useCreateShareLinkMutation, useDeleteShareLinkMutation, } = shareApi;
