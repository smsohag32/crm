import { apiSlice } from "../slice/apiSlice";

const dealsApi = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getAllDeals: builder.query({
         query: () => ({
            url: `/api/deal/list/`,
         }),
         providesTags: ["deals"],
      }),
   }),
});

export const { useGetAllDealsQuery } = dealsApi;
