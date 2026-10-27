import { api } from "@/store/api";

import { CreateListFormValues, CreateListResponse } from "../types/list.types";

export const createListApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createList: builder.mutation<
      CreateListResponse,
      CreateListFormValues
    >({
      query: (data) => ({
        url: "/lists",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateListMutation } = createListApi;