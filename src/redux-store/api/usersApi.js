import { apiSlice } from "../slice/apiSlice";

const userApi = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getUsers: builder.query({
         query: () => ({
            url: `/api/users/user_list/`,
         }),
      }),
      postUser: builder.mutation({
         query: (newUser) => ({
            url: `/api/users/register/`,
            method: "POST",
            body: newUser,
         }),
      }),
   }),
});

export const { usePostUserMutation, useGetUsersQuery } = userApi;
