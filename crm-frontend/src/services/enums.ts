import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { base } from '@/configs/base'

export const enumsApi = createApi({
    reducerPath: 'enumsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: base.base,
        prepareHeaders: (headers, { getState, endpoint }) => {
            const token = localStorage.getItem('token') as string
            if (token !== '') {
                headers.set('Authorization', token)
            }
            return headers
        },
    }),
    endpoints: (builder) => ({
        getTask: builder.query<any, string>({
            query: (url) => `${url}`
        }),
        getTaskStatus: builder.query<any, string>({
            query: (url) => `${url}`
        }),
        getContactEnum: builder.query<any, string>({
            query: (url) => `${url}`
        }),
    }),
})
export const { useGetTaskQuery, useGetTaskStatusQuery, useGetContactEnumQuery } = enumsApi