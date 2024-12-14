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
      deleteUser: builder.mutation({
         query: (id) => ({
            url: `/api/users/${id}`,
            method: "DELETE",
         }),
      }),
   }),
});

export const { usePostUserMutation, useGetUsersQuery, useDeleteUserMutation } = userApi;
