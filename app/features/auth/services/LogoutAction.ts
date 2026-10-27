import { api } from "@/store/api";

export const logoutApi = api.injectEndpoints({
    endpoints:(builder)=> ({
        logout: builder.mutation<void,void>({
            query: ()=>({
                url: "/auth/logout",
        method: "POST",
            }),
             invalidatesTags: ["Profile"],
        })
    })
})
export const { useLogoutMutation } = logoutApi;