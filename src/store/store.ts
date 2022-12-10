import {configureStore} from "@reduxjs/toolkit";
import appSlice from "./reducers/appSlice";

const rootReducer = appSlice;

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>;