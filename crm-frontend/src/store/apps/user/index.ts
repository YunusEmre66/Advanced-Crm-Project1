import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
    users: []
}

export const usersSlice = createSlice({
    initialState,
    name: 'users',
    reducers: {
        setUsers: (state, action: PayloadAction<[]>) => {
            state.users = action.payload
        }
    }
})

export default usersSlice.reducer

export const {setUsers} = usersSlice.actions