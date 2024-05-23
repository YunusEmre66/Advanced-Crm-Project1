import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
    token: ''
}

export const loginSlice = createSlice({
    initialState,
    name: 'login',
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            localStorage.setItem('token', action.payload)
            state.token = action.payload
        }
    }
})

export default loginSlice.reducer

export const {setToken} = loginSlice.actions