import { api } from "@/store/api";
import { ProfileResponse} from "../types/auth.types";

export const profileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<ProfileResponse, void>({
      query: () => ({
        url: "/auth/profile",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
  }),
});

export const { useGetProfileQuery } = profileApi;