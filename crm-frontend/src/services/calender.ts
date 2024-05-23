import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { base } from '@/configs/base'
import { calender } from '@/configs/calender'

export const calenderApi = createApi({
    reducerPath: 'calenderApi',
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
        getCalenders: builder.query<any, string>({
            query: (url) => `${url}`
        }),
        setCalender: builder.mutation({
            query: (body) => ({
                url: calender.newCalender,
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
export const { useGetCalendersQuery, useSetCalenderMutation } = calenderApi