import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios.js";

export const buyNow = createAsyncThunk(
    "order/buyNow",
    async ({ productId, quantity, deliveryAddress }, { rejectWithValue }) => {
        try {
            const res = await axios.post(`/order/buy-now/${productId}`, { quantity, deliveryAddress });
            return {
                order: res.data.data.order,
                message: res.data.message
            }
        } catch (error) {
            const message = error.response?.data?.message || "Error while placing an order"
            return rejectWithValue(message)
        }
    }
)

export const checkoutCart = createAsyncThunk(
    "order/checkoutCart",
    async ({ deliveryAddress }, { rejectWithValue }) => {
        try {
            const res = await axios.post(`/order/checkout`, { deliveryAddress });
            return {
                order: res.data.data.order,
                message: res.data.message
            }
        } catch (error) {
            const message = error.response?.data?.message || "Error while checking out cart"
            return rejectWithValue(message)
        }
    }
)

export const getAllOrdersForUser = createAsyncThunk(
    "order/getAllOrdersForUser",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get("/order/user-orders", {withCredentials: true});
           return res.data.data.orders;
        } catch (error) {
            const message = error.response?.data?.message || "Error while fetching user orders"
            return rejectWithValue(message)
        }
    }
)

export const getOrdersForSeller = createAsyncThunk(
    "order/getOrdersForSeller",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get("/order/orders", {withCredentials: true});
            return res.data.data.orders;
        } catch (error) {
            const message = error.response?.data?.message || "Error while fetching orders"
            return rejectWithValue(message)
        }
    }
)

export const confirmOrder = createAsyncThunk(
    "order/confirmOrder",
    async (orderId, { rejectWithValue }) => {
        try {
            const res = await axios.patch(`/order/confirm-order/${orderId}`);
            return {
                orderId: orderId,
                order:res.data.data.order,
                message: res.data.message
            }
        } catch (error) {
            const message = error.response?.data?.message || "Error while confirming order"
            return rejectWithValue(message)
        }
    }
)

export const rejectOrder = createAsyncThunk(
    "order/rejectOrder",
    async (orderId, { rejectWithValue }) => {
        try {
            const res = await axios.patch(`/order/reject-order/${orderId}`);
            return {
                orderId: orderId,
                order:res.data.data.order,
                message: res.data.message
            }
        } catch (error) {
            const message = error.response?.data?.message || "Error while rejecting order"
            return rejectWithValue(message)
        }
    }
)

export const cancelOrder = createAsyncThunk(
    "order/cancelOrder",
    async (orderId, { rejectWithValue }) => {
        try {
            const res = await axios.patch(`/order/cancel-order/${orderId}`);
            return {
                orderId: orderId,
                message: res.data.message
            }
        } catch (error) {
            const message = error.response?.data?.message || "Error while canceling order"
            return rejectWithValue(message)
        }
    }
)

export const hideOrder = createAsyncThunk(
    "order/hideOrder",
    async (orderId, { rejectWithValue }) => {
        try {
            const res = await axios.patch(`/order/hide-order/${orderId}`);
            return {
                orderId: orderId,
                message: res.data.message
            }
        } catch (error) {
            const message = error.response?.data?.message || "Error while canceling order"
            return rejectWithValue(message)
        }
    }
)
