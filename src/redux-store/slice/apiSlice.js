import { getCookie, setCookie } from "@/utils/helper";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logoutUser } from "./authSlice";

const baseQueryWithAuth = async (args, api, extraOptions) => {
   const baseQuery = fetchBaseQuery({
      baseUrl: "http://127.0.0.1:8000",
      prepareHeaders: (headers) => {
         const accessToken = getCookie("access_token");

         if (accessToken) {
            headers.set("Authorization", `Bearer ${accessToken}`);
         }
         return headers;
      },
   });

   let result = await baseQuery(args, api, extraOptions);

   if (result.error && (result.error.status === 401 || result.error.status === 403)) {
      const refreshToken = getCookie("refresh_token");

      if (refreshToken) {
         const refreshResult = await fetchBaseQuery({
            // baseUrl: "http://127.0.0.1:8000",
         })(
            {
               url: "/api/users/auth/token/refresh",
               method: "POST",
               body: { refresh: refreshToken },
            },
            api,
            extraOptions
         );

         if (refreshResult.data) {
            const { access } = refreshResult.data;
            setCookie("access_token", access);
            result = await baseQuery(args, api, extraOptions);
         } else {
            api.dispatch(logoutUser());
            window.location.href = "/authentication/login";
         }
      } else {
         api.dispatch(logoutUser());
         window.location.href = "/authentication/login";
      }
   }

   return result;
};

export const apiSlice = createApi({
   reducerPath: "api",
   baseQuery: baseQueryWithAuth,
   tagTypes: ["clients", "users", "deals", "tasks", "teams"],
   endpoints: () => ({}),
});
