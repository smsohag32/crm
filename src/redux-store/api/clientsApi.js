import { apiSlice } from "../slice/apiSlice";

const clientsApi = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getAllClients: builder.query({
         query: () => ({
            url: `/api/clients/`,
         }),
         providesTags: ["clients"],
      }),
   }),
});

export const { useGetTestQuery } = clientsApi;
