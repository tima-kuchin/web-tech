import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
  endpoints: (builder) => ({
    getFirstFive: builder.query({
      query: () => 'getFirstFive',
    }),
    saveFeedback: builder.mutation({
      query: (feedback) => ({
        url: 'saveFeedback',
        method: 'POST',
        body: feedback,
      }),
    }),
    deleteRecord: builder.mutation({
      query: (index) => ({
        url: `deleteRecord/${index}`,
        method: 'DELETE',
      }),
    }),
    updateRecord: builder.mutation({
      query: ({ index, newData }) => ({
        url: `updateRecord/${index}`,
        method: 'PUT',
        body: newData,
      }),
    }),
  }),
});

export const { useGetFirstFiveQuery, useSaveFeedbackMutation, useDeleteRecordMutation, useUpdateRecordMutation } = postsApi;