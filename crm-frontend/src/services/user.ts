import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { base } from '@/configs/base'
import { user } from '@/configs/user'
import { setUsers } from '@/store/apps/user'

export const userApi = createApi({
    reducerPath: 'userApi',
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
        getUsers: builder.query<any, string>({
            query: (url) => `${url}`,
            transformResponse: (result: { data: any }) => result,
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUsers(data.data))
                } catch (error) {
                }
            }
        }),
        setUser: builder.mutation({
            query: (body) => ({
                url: user.newUser,
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
export const { useGetUsersQuery, useSetUserMutation } = userApi