import { apiSlice } from "../slice/apiSlice";

const userApi = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getUsers: builder.query({
         query: () => ({
            url: `/api/users/user_list/`,
         }),
         transformResponse: (res) => {
            return res?.reverse();
         },
      }),
      getProfile: builder.query({
         query: () => ({
            url: `/api/users/profile/`,
         }),
      }),
      updateProfile: builder.mutation({
         query: (formData) => ({
            url: `/api/users/upload-image/`,
            method: "POST",
            body: formData,
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

export const {
   usePostUserMutation,
   useGetUsersQuery,
   useUpdateProfileMutation,
   useDeleteUserMutation,
   useGetProfileQuery,
} = userApi;
