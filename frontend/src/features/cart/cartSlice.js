import { createSlice } from "@reduxjs/toolkit";
import { getCartItems, addItemInCart, updateCartQuantity, removeCartItem } from "./cartThunks.js";

const initialState = {
    cartItems: [],
    grandTotal: 0,
    loading: false,
    updating: false,
    successMessage: null,
    error: null
}

const cartSlice = createSlice({
    name: "cart",
    initialState,

    reducers: {
        clearMessages(state) {
            state.successMessage = null;
            state.error = null;
        }
    },

    extraReducers: (builder) => {
        builder

            // Add item in cart
            .addCase(addItemInCart.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(addItemInCart.fulfilled, (state, action) => {
                state.loading = false;
                const newItem = action.payload.cartProduct;

                // If item already exisits
                const existingIndex = state.cartItems.findIndex(
                    item => item.product._id === newItem.product._id
                );

                if (existingIndex !== -1) {
                    // Updating existing item
                    state.cartItems[existingIndex] = newItem;
                } else {
                    // Add new item
                    state.cartItems.push(newItem)
                }

                state.successMessage = action.payload.message;
            })
            .addCase(addItemInCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })

            // Get cart items
            .addCase(getCartItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCartItems.fulfilled, (state, action) => {
                state.loading = false;

                const items = Array.isArray(action.payload.cartItems)
                    ? action.payload.cartItems
                    : [];

                state.cartItems = items.map(item => ({
                    _id: item._id,
                    quantity: item.quantity,
                    itemTotal: item.itemTotal,
                    product: item.productId,
                    productId: item.productId?._id,
                }));

                state.grandTotal = action.payload.grandTotal;
            })
            .addCase(getCartItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })

            // Update quantity
            .addCase(updateCartQuantity.pending, (state) => {
                state.updating = true;
                state.error = null;
            })
            .addCase(updateCartQuantity.fulfilled, (state, action) => {
                state.updating = false;

                const { productId, removed, cartProduct } = action.payload;

                if (removed) {
                    state.cartItems = state.cartItems.filter(
                        item => item.product._id !== productId
                    );

                    // Recalculating grand total after removal
                    state.grandTotal = state.cartItems.reduce(
                        (sum, item) => sum + (item.itemTotal || 0),
                        0
                    )
                    state.successMessage = "Item removed from cart";
                    return
                } else {
                    const index = state.cartItems.findIndex(
                        item => item.product._id === productId
                    );

                    if (index !== -1) {
                        state.cartItems[index] = {
                            ...state.cartItems[index],  
                            quantity: cartProduct.quantity,
                            itemTotal: cartProduct.itemTotal || (cartProduct.quantity * state.cartItems[index].product.price),
                            _id: cartProduct._id,
                        };
                    }
                }

                // Recalculate grand total
                state.grandTotal = state.cartItems.reduce(
                    (sum, item) => sum + (item.itemTotal || 0),
                    0
                )
            })
            .addCase(updateCartQuantity.rejected, (state, action) => {
                state.updating = false;
                state.error = action.payload
            })

            // Remove item from cart
            .addCase(removeCartItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeCartItem.fulfilled, (state, action) => {
                state.loading = false;
                const { cartItemId } = action.payload;

                state.cartItems = state.cartItems.filter(
                    item => item._id !== cartItemId
                );

                state.grandTotal = state.cartItems.reduce(
                    (sum, item) => sum + (item.itemTotal || 0),
                    0
                );

                state.successMessage = "Item removed from cart";
            })
            .addCase(removeCartItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    }
});

export const { clearMessages } = cartSlice.actions;
export default cartSlice.reducer;