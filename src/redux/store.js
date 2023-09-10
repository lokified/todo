import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./feauters/authSlice"
import todoReducer from "./feauters/todoSlice"

export const store = configureStore({
    reducer: {
        authReducer,
        todoReducer
    }
})