import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: {
        isAuth: false,
        uid: "",
        email: ""
    }
}

export const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logOut: () => {
            return initialState
        },

        login: (state, action) => {
            return {
                user: {
                    isAuth: true,
                    uid: action.payload.uid,
                    email: action.payload.email
                }
            }
        }
    }
})

export const { login, logOut} = auth.actions
export default auth.reducer