import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NEXT_PUBLIC_API_URL ||
      "https://api.gozin.ir/api/v1",

    credentials: "include",
  }),

  endpoints: () => ({}),
});