import { api } from "@/store/api";
import { User } from "../types/auth.types";

export const profileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<User, void>({
      query: () => ({
        url: "/auth/profile",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProfileQuery } = profileApi;