import { apiSlice } from "../slice/apiSlice";

const clientsApi = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      // Query to fetch all clients with pagination info
      getAllClients: builder.query({
         query: () => ({
            url: `/api/clients/`,
         }),
         providesTags: ["clients"],
      }),
      getClient: builder.query({
         query: (id) => ({
            url: `/api/clients/${id}/`,
         }),
         providesTags: ["clients"],
      }),
      getClientDeals: builder.query({
         query: (id) => ({
            url: `/api/clients/${id}/deals/`,
         }),
         providesTags: ["clients"],
      }),

      // Lazy query to fetch paginated clients (next/prev)
      getClientsByPage: builder.query({
         query: (url) => ({
            url: url,
         }),
         providesTags: ["clients"],
      }),

      // Mutation to add a new client
      postClient: builder.mutation({
         query: (newClient) => ({
            url: `/api/clients/`,
            method: "POST",
            body: newClient,
         }),
         providesTags: ["clients"],
      }),
      deleteClient: builder.mutation({
         query: (id) => ({
            url: `/api/clients/${id}/`,
            method: "DELETE",
         }),
         providesTags: ["clients"],
      }),
      updateClient: builder.mutation({
         query: (id) => ({
            url: `/api/clients/${id}/`,
            method: "PUT",
         }),
         providesTags: ["clients"],
      }),
   }),
});

// Export hooks for queries and mutations
export const {
   useGetAllClientsQuery,
   useLazyGetClientsByPageQuery,
   useDeleteClientMutation,
   useUpdateClientMutation,
   useGetClientDealsQuery,
   usePostClientMutation,
   useGetClientQuery,
} = clientsApi;
