import { 
  BaseQueryFn, 
  createApi, 
  FetchArgs, 
  fetchBaseQuery, 
  FetchBaseQueryError, 
} from "@reduxjs/toolkit/query/react"; 
 
const baseQuery = fetchBaseQuery({ 
  baseUrl: process.env.NEXT_PUBLIC_API_URL, 
  credentials: "include", 
  
 
  prepareHeaders: (headers) => { 
    headers.set("Content-Type", "application/json"); 
 
    return headers; 
  }, 
}); 
 
const baseQueryWithReauth: BaseQueryFn< 
  string | FetchArgs, 
  unknown, 
  FetchBaseQueryError 
> = async (args, api, extraOptions) => { 
  let result = await baseQuery(args, api, extraOptions); 
 
  if (result.error?.status === 401) { 
    const refreshResult = await baseQuery( 
      { 
        url: "/auth/refresh", 
        method: "POST", 
      }, 
      api, 
      extraOptions 
    ); 
 
    if (refreshResult.data) { 
      result = await baseQuery(args, api, extraOptions); 
    } 
  } 
 
  return result; 
}; 
 
export const api = createApi({ 
  reducerPath: "api", 
  tagTypes: ["Profile"],
 
  baseQuery: baseQueryWithReauth, 
 
  endpoints: () => ({}), 
});