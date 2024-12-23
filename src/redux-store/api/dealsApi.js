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
      getAssignUsers: builder.query({
         query: (dealId) => ({
            url: `/api/deal/${dealId}/users/`,
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
      editDeal: builder.mutation({
         query: ({ id, editValue }) => ({
            url: `/api/deal/update/${id}/`,
            method: "PATCH",
            body: editValue,
         }),
         invalidatesTags: ["deals"],
      }),
      dealAssign: builder.mutation({
         query: (dealData) => ({
            url: `/api/deal/deal-assign/create/`,
            method: "POST",
            body: dealData,
         }),
         invalidatesTags: ["deals"],
      }),

      dealAssignUpdate: builder.mutation({
         query: ({ dealId, assignData }) => ({
            url: `/api/deal/deal-assign/update/${dealId}/`,
            method: "PATCH",
            body: assignData,
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

      // deal client
      addDealClient: builder.mutation({
         query: ({ dealId, clientData }) => ({
            url: `/api/deal/${dealId}/clients/`,
            method: "POST",
            body: clientData,
         }),
         invalidatesTags: ["deals"],
      }),
      getDealClients: builder.query({
         query: (dealId) => ({
            url: `/api/deal/${dealId}/clients/`,
         }),
         providesTags: ["deals"],
      }),

      deleteDeal: builder.mutation({
         query: (id) => ({
            url: `/api/deal/delete/${id}/`,
            method: "DELETE",
         }),
         invalidatesTags: ["deals"],
      }),
      postDealNote: builder.mutation({
         query: ({ id, data }) => ({
            url: `/api/deal/${id}/note/create/`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: ["deals"],
      }),
      postPrivateNote: builder.mutation({
         query: ({ id, userId, data }) => ({
            url: `/api/deal/1/deal-assign/${id}/user/${userId}/note/create/`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: ["deals"],
      }),
   }),
});

export const {
   useGetDealQuery,
   useAddDealClientMutation,
   useGetDealClientsQuery,
   useEditDealMutation,
   usePostPrivateNoteMutation,
   usePostDealNoteMutation,
   useGetAssignUsersQuery,
   useDealAssignUpdateMutation,
   useGetAllDealsQuery,
   usePostDealMutation,
   useDealAssignMutation,
   useDeleteDealMutation,
   useStageChangeMutation,
} = dealsApi;
