import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios.js";

export const addItemInCart = createAsyncThunk(
    "cart/addItemInCart",
    async ({ productId, quantity }, { rejectWithValue }) => {
        try {
            const res = await axios.post(`/cart/add/${productId}`, { quantity });
            return {
                cartProduct: res.data.data.cartProduct,
                message: res.data.message,
            };
        } catch (error) {
            const message =
                error.response?.data?.message || "Error while adding product in cart";
            return rejectWithValue(message);
        }
    }
);

export const updateCartQuantity = createAsyncThunk(
    "cart/updateCartQuantity",
    async ({ productId, quantity }, { rejectWithValue }) => {
        try {
            const res = await axios.patch(`/cart/update-quantity/${productId}`, {
                quantity,
            });
            return {
                productId: productId,
                cartProduct: res.data.data.cartProduct,
                removed: res.data.data.removed || false,
            };
        } catch (error) {
            const message =
                error.response?.data?.message ||
                "Error while updating product quantity in cart";
            return rejectWithValue(message);
        }
    }
);

export const getCartItems = createAsyncThunk(
    "cart/getCartItems",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get("/cart/cart-items", {
                headers: {
                    "Cache-Control": "no-store",
                    "Pragma": "no-cache",
                },
            });
            const data = res.data.data;

            return {
                cartItems: Array.isArray(data.cartItems) ? data.cartItems : [],
                grandTotal: data.grandTotal || 0,
            };
        } catch (error) {
            const message =
                error.response?.data?.message || "Error while fetching cart items";
            return rejectWithValue(message);
        }
    }
);

export const removeCartItem = createAsyncThunk(
    "cart/removeCartItme",
    async (cartItemId, { rejectWithValue }) => {
        try {
            const res = await axios.delete(`/cart/delete/${cartItemId}`);
            return {
                cartItemId: cartItemId,
                message: res.data.message,
            };
        } catch (error) {
            const message =
                error.response?.data?.message || "Error while removing cart item";
            return rejectWithValue(message);
        }
    }
);
