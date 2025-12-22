import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../api/axios.js"

export const signUp = createAsyncThunk(
    "auth/signup",
    async ({name, email, password}, {rejectWithValue}) => {
        try {
            const res = await axios.post("/auth/signup", {name, email, password});
            return res.data.data.user
        } catch (error) {
            const message = error.response?.data?.message || "Email already registered"
            return rejectWithValue(message)
        }
    }
)

export const login = createAsyncThunk(
    "auth/login",
    async ({email, password}, {rejectWithValue}) => {
        try {
            const res = await axios.post("/auth/login", {email, password});
            return res.data.data.user
        } catch (error) {
            const message = error.response?.data?.message || "Email already registered"
            return rejectWithValue(message)
        }
    }
)

export const logoutUser = createAsyncThunk(
    "auth/logout",
    async () => {
        const res = await axios.post("/auth/logout");
        return res.data
    }
)

export const loadUser = createAsyncThunk(
    "auth/user",
    async () => {
        const res = await axios.get("/auth/user", {
            withCredentials: true
        })
        return res.data.data.user;
    }
)

