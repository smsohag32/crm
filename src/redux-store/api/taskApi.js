import { apiSlice } from "../slice/apiSlice";

const taskApi = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getTaskByDeal: builder.query({
         query: (dealId) => ({
            url: `/api/deal/${dealId}/tasks/`,
         }),
         providesTags: "tasks",
      }),
      postTask: builder.mutation({
         query: ({ dealId, task }) => ({
            url: `/api/deal/${dealId}/tasks/`,
            method: "POST",
            body: task,
         }),
         invalidatesTags: ["tasks"],
      }),
      deleteTask: builder.mutation({
         query: ({ dealId, taskId }) => ({
            url: `/api/deal/${dealId}/tasks/${taskId}/`,
            method: "DELETE",
         }),
         invalidatesTags: ["tasks"],
      }),
   }),
});

export const { useGetTaskByDealQuery, usePostTaskMutation, useDeleteTaskMutation } = taskApi;
