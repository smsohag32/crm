import { apiSlice } from "../slice/apiSlice";

const noteApi = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      editDealNote: builder.mutation({
         query: ({ dealId, noteId, data }) => ({
            url: `/api/deal/${dealId}/note/${noteId}/update/`,
            method: "PATCH",
            body: data,
         }),
      }),
      dealNoteDelete: builder.mutation({
         query: ({ dealId, noteId }) => ({
            url: `/api/deal/${dealId}/note/${noteId}/delete/`,
            method: "DELETE",
         }),
      }),
   }),
});

export const { useEditDealNoteMutation, useDealNoteDeleteMutation } = noteApi;
