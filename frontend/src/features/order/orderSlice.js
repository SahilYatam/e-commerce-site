import { createSlice } from "@reduxjs/toolkit";
import {
    buyNow,
    checkoutCart,
    getAllOrdersForUser,
    getOrdersForSeller,
    confirmOrder,
    cancelOrder,
    hideOrder,
    rejectOrder
} from "./orderThunks.js";

const initialState = {
    orders: [],
    currentOrder: null,
    deliveryAddress: null,
    loading: false,
    successMessage: null,
    error: null
};

const orderSlice = createSlice({
    name: "order",
    initialState,

    reducers: {
        saveDeliveryAddress: (state, action) => {
            state.deliveryAddress = action.payload;
        },

        clearMessages: (state) => {
            state.successMessage = null;
            state.error = null;
        }
    },


    extraReducers: (builder) => {
        builder
            // Buy Now
            .addCase(buyNow.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(buyNow.fulfilled, (state, action) => {
                state.loading = false;
                state.orders.unshift(action.payload.order); // Add to beginning
                state.successMessage = action.payload.message;
            })
            .addCase(buyNow.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Checkout Cart
            .addCase(checkoutCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkoutCart.fulfilled, (state, action) => {
                state.loading = false;
                state.orders.unshift(action.payload.order);
                state.successMessage = action.payload.message;
            })
            .addCase(checkoutCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get All Orders For User
            .addCase(getAllOrdersForUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllOrdersForUser.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(getAllOrdersForUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get Orders For Seller
            .addCase(getOrdersForSeller.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOrdersForSeller.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(getOrdersForSeller.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Confirm Order
            .addCase(confirmOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(confirmOrder.fulfilled, (state, action) => {
                state.loading = false;
                const { orderId, order, message } = action.payload;

                // Update order in array
                const index = state.orders.findIndex(o => o._id === orderId);
                if (index !== -1) {
                    state.orders[index] = order;
                }

                state.successMessage = message;
            })
            .addCase(confirmOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Reject order
            .addCase(rejectOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(rejectOrder.fulfilled, (state, action) => {
                state.loading = false;
                const { orderId, order, message } = action.payload;

                // Update order in array
                const index = state.orders.findIndex(o => o._id === orderId);
                if (index !== -1) {
                    state.orders[index] = order;
                }

                state.successMessage = message;
            })
            .addCase(rejectOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Cancel Order
            .addCase(cancelOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(cancelOrder.fulfilled, (state, action) => {
                state.loading = false;
                const { orderId, order, message } = action.payload;

                // Update order in array
                const index = state.orders.findIndex(o => o._id === orderId);
                if (index !== -1) {
                    state.orders[index] = order;
                }

                state.successMessage = message;
            })
            .addCase(cancelOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Hide Order
            .addCase(hideOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(hideOrder.fulfilled, (state, action) => {
                state.loading = false;
                const { orderId, message } = action.payload;

                // Remove hidden order from list
                state.orders = state.orders.filter(o => o._id !== orderId);

                state.successMessage = message;
            })
            .addCase(hideOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export const { saveDeliveryAddress, clearMessages } = orderSlice.actions;
export default orderSlice.reducer;