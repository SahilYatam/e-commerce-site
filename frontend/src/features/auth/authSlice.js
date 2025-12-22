import {createSlice} from "@reduxjs/toolkit"
import { loadUser, login, logoutUser, signUp } from "./authThunks"


const storedUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: storedUser || null,
    loading: false,
    error: null,
    successMessage: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        logout: (state) => {
            state.user = null
        },
        clearMessages: (state) => {
            state.error = null,
            state.successMessage = null,
            state.loading = false
        }
    },

    extraReducers: (builder) => {
        builder
            // Signup
            .addCase(signUp.pending, (state) => {
                state.loading = true
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload
                localStorage.setItem("user", JSON.stringify(action.payload));
            })
            .addCase(signUp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })

            // Login
            .addCase(login.pending, (state) => {
                state.loading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                localStorage.setItem("user", JSON.stringify(action.payload));
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Logout
            .addCase(logoutUser.pending, (state) => {
                state.loading = true
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                localStorage.removeItem("user");
            })

            // Load user
            .addCase(loadUser.pending, (state) => {
                state.loading = true
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })

    }

})

export const { clearMessages, logout } = authSlice.actions;
export default authSlice.reducer; 

