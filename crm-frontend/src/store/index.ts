import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import tokenReducer from "./apps/login/token";
import usersReducer from "./apps/user/index";
import { loginApi } from "../services/login";
import { userApi } from "../services/user";
import { enumsApi } from "../services/enums";
import { taskApi } from "../services/task";
import { calenderApi } from "../services/calender"
import { countryApi } from "../services/country"

export const store = configureStore({
    reducer: {
        tokenState: tokenReducer,
        usersState: usersReducer,
        [loginApi.reducerPath]: loginApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [enumsApi.reducerPath]: enumsApi.reducer,
        [taskApi.reducerPath]: taskApi.reducer,
        [calenderApi.reducerPath]: calenderApi.reducer,
        [countryApi.reducerPath]: countryApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            loginApi.middleware, 
            userApi.middleware, 
            enumsApi.middleware, 
            taskApi.middleware,
            calenderApi.middleware,
            countryApi.middleware
        ),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch




// import { configureStore } from "@reduxjs/toolkit";

// // ** Reducers
// import login from '@/store/apps/login'
// import user from '@/store/apps/user'
// import enums from '@/store/apps/enums'
// import tasks from '@/store/apps/tasks'

// export const store = configureStore({
//     reducer: {
//         login,
//         user,
//         enums,
//         tasks
//     }
// })

// export type AppDispatch = typeof store.dispatch
// export type RootState = ReturnType<typeof store.getState>