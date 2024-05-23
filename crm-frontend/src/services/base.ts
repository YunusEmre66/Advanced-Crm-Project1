import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { base } from '@/configs/base'

export const baseApi = createApi({
    reducerPath: 'baseApi',
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
        getApi: builder.query<any, string>({
            query: (url) => `${url}`
        }),
        setApi: builder.mutation({
            query: (body) => ({
                url: '/****',
                method: 'POST',
                body,
            }),
            transformResponse: (result: { token: string }) => result,
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                    // const { data } = await queryFulfilled;
                    // dispatch(setToken(data.token))
                } catch (error) {
                }
            }
        }),
    }),
})
export const { useGetApiQuery, useSetApiMutation } = baseApi