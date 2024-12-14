import { apiSlice } from "../slice/apiSlice";

const dealsApi = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getAllDeals: builder.query({
         query: () => ({
            url: `/api/deal/list/`,
         }),
         providesTags: ["deals"],
      }),
      getDeal: builder.query({
         query: (id) => ({
            url: `/api/deal/list/${id}/`,
         }),
         providesTags: ["deals"],
      }),
      postDeal: builder.mutation({
         query: (newDeal) => ({
            url: `/api/deal/create/`,
            method: "POST",
            body: newDeal,
         }),
         invalidatesTags: ["deals"],
      }),
      dealAssign: builder.mutation({
         query: (newAssign) => ({
            url: `/api/deal/deal-assign/create/`,
            method: "POST",
            body: newAssign,
         }),
         invalidatesTags: ["deals"],
      }),
      stageChange: builder.mutation({
         query: ({ id, stage }) => ({
            url: `/api/deal/update/${id}/`,
            method: "PATCH",
            body: stage,
         }),
         invalidatesTags: ["deals"],
      }),
      deleteDeal: builder.mutation({
         query: (id) => ({
            url: `/api/deal/delete/${id}/`,
            method: "DELETE",
         }),
         invalidatesTags: ["deals"],
      }),
   }),
});

export const {
   useGetDealQuery,
   useGetAllDealsQuery,
   usePostDealMutation,
   useDealAssignMutation,
   useDeleteDealMutation,
   useStageChangeMutation,
} = dealsApi;
