import TaskSlice from "../slice/taskSlice";
import {configureStore} from "@reduxjs/toolkit";
import UserSlice from "../slice/userSlice";

export const store = configureStore({
    reducer: {
        userReducer:UserSlice,
        tasks:TaskSlice

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;