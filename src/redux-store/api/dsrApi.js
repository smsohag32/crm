import { apiSlice } from "../slice/apiSlice";

const dsrApi = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getDsr: builder.query({
         query: () => ({
            url: ``,
         }),
         providesTags: ["dsr"],
      }),
   }),
});

export const { useGetDsrQuery } = dsrApi;
