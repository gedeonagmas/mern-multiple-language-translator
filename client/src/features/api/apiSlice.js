import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),
  endpoints: (builder) => ({
    //signup
    createUsers: builder.mutation({
      query: (data) => ({
        url: `/create/users`,
        method: "POST",
        body: data,
      }),
    }),
    //login
    login: builder.mutation({
      query: (data) => ({
        url: `/login`,
        method: "POST",
        body: data,
      }),
    }),
    //get history data
    getHistory: builder.query({
      query: (arg) => ({
        url: `/get/history`,
        method: "GET",
        headers: { token: arg.token },
      }),
      transformResponse: (res) => res.sort((a, b) => b.date - a.date),
    }),
    //translate
    translate: builder.mutation({
      query: (data) => ({
        url: `/translate`,
        method: "POST",
        body: data,
        headers: { token: data.token },
      }),
    }),
  }),
});

export const {
  useCreateUsersMutation,
  useLoginMutation,
  useGetHistoryQuery,
  useTranslateMutation,
} = apiSlice;
