import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import request from '@/utils/axios-services'

export const getEnum = createAsyncThunk('get/enum', async (url: string) => { 
    const response = await request.get(url)

    return response.data
})

export const appEnumSlice = createSlice({
    name: 'enums',
    initialState: {
        data: {
            task:[],
            calender: [],
            contact: [],
            log: [],
            taskStatus: [],
            confirm: [],
            usersRole: []
        },
        loading: false
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getEnum.pending, (state: any)=> {
            state.loading = true
        })
        builder.addCase(getEnum.fulfilled, (state: any, action: any) => {
            if (action.meta.arg === '/enum/task') {
                state.data.task = action.payload.data
            } else if (action.meta.arg === '/enum/calender') {
                state.data.calender = action.payload.data
            } else if (action.meta.arg === '/enum/contact') {
                state.data.contact = action.payload.data
            } else if (action.meta.arg === '/enum/log') {
                state.data.log = action.payload.data
            } else if (action.meta.arg === '/enum/task-status') {
                state.data.taskStatus = action.payload.data
            } else if (action.meta.arg === '/enum/confirm') {
                state.data.confirm = action.payload.data
            } else if (action.meta.arg === '/enum/users-role') {
                state.data.usersRole = action.payload.data
            }
            state.loading = false
        })
        builder.addCase(getEnum.rejected, (state:any)=>{
            state.loading = false
        })
    },
})

export default appEnumSlice.reducer
