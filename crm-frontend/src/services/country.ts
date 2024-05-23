import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { base } from '@/configs/base'

export const countryApi = createApi({
    reducerPath: 'countryApi',
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
        getCountry: builder.query<any, string>({
            query: (url) => `${url}`
        }),
    }),
})
export const { useGetCountryQuery } = countryApi