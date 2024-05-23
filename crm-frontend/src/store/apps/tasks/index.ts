import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// ** Config **
import { task } from '@/configs/task'

// ** Utils **
import axiosService from '@/utils/axios-services'

export const getTasks = createAsyncThunk('getTask', async() => {
    const response = await axiosService.get(task.allTask)

    return response.data
})

export const setNewTask = createAsyncThunk('setInsertTask', async (payload: any) => {
    const response = await axiosService.post(task.newTask, payload)

    return response.data
})

export const setUpdateTask = createAsyncThunk('setUpdateTask', async (payload: any) => {
    const response = await axiosService.put(task.updateTask + payload.id, payload)

    return response.data
})

export const appTaskSlice = createSlice({
    name: 'task',
    initialState: {
        data: [],
        loading: false,
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(setNewTask.pending, (state) => {
            state.loading = true
        })
        builder.addCase(setNewTask.fulfilled, (state, action: any) => {
            state.loading = false
        })
        builder.addCase(setNewTask.rejected, (state) => {
            state.loading = false
        })
        
        builder.addCase(getTasks.fulfilled, (state, action: any) => {
            state.data = action.payload.data
        })

        builder.addCase(setUpdateTask.fulfilled, (state, action: any) => {
        })
    }
})

export default appTaskSlice.reducer