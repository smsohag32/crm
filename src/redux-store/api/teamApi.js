import { apiSlice } from "../slice/apiSlice";

const userApi = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getAllTeam: builder.query({
         query: () => ({
            url: `/api/users/team/list/`,
         }),
         providesTags: ["teams"],
      }),
      getTeam: builder.query({
         query: (id) => ({
            url: `/api/users/team/list/${id}/`,
         }),
         providesTags: ["teams"],
      }),
      updateTeam: builder.mutation({
         query: ({ id, updateData }) => ({
            url: `/api/users/team/update/${id}/`,
            method: "PATCH",
            body: updateData,
         }),
         invalidatesTags: ["teams"],
      }),
      addTeam: builder.mutation({
         query: (team) => ({
            url: `/api/users/team/create/`,
            method: "POST",
            body: team,
         }),
         invalidatesTags: ["teams"],
      }),
      teamDelete: builder.mutation({
         query: (id) => ({
            url: `/api/users/team/delete/${id}/`,
            method: "DELETE",
         }),
         invalidatesTags: ["teams"],
      }),
      addTeamNote: builder.mutation({
         query: ({ id, note }) => ({
            url: `/api/users/team/${id}/team-note/create/`,
            method: "POST",
            body: note,
         }),
         invalidatesTags: ["teams"],
      }),
      deleteTeamNote: builder.mutation({
         query: ({ teamId, noteId }) => ({
            url: `/api/users/team/${teamId}/note/${noteId}/delete/`,
            method: "DELETE",
         }),
         invalidatesTags: ["teams"],
      }),
   }),
});

export const {
   useGetAllTeamQuery,
   useDeleteTeamNoteMutation,
   useAddTeamNoteMutation,
   useUpdateTeamMutation,
   useTeamDeleteMutation,
   useAddTeamMutation,
   useGetTeamQuery,
} = userApi;
