import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./feauters/authSlice"

export const store = configureStore({
    reducer: {
        authReducer,
    }
})