import { createSlice } from "@reduxjs/toolkit";
import { addProduct, deleteProduct, getProductById, loadAllProducts, loadProductsByCategory, searchProducts, updateProduct } from "./productThunks.js";

const initialState = {
    products:[],
    searchResults:[],
    relatedProducts:[],
    categoryProducts:[],
    pagination: {
        page: 1,
        limit: 10,
        total: 0
    },
    product: null,
    loading: false,
    error: null,
    successMessage: null
}

const productSlice = createSlice({
    name: "products",
    initialState,

    reducers: {
        clearMessages(state){
            state.error = null,
            state.successMessage = null
        }
    },

    extraReducers: (builder) => {
        builder
            // Create Product
            .addCase(addProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products.push(action.payload)
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update Product
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                const {productId, updatedProduct} = action.payload

                const index = state.products.findIndex((product) => product._id === productId)

                if(index !== -1){
                    state.products[index] = updatedProduct;
                    state.successMessage = action.payload.successMsg
                }

                if(state.product?._id === productId){
                    state.product = updatedProduct
                    state.successMessage = action.payload.successMsg
                }


            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete product
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                const {productId, successMsg} = action.payload;

                state.products = state.products.filter((product) => product._id !== productId);
                state.successMessage = successMsg

                // Clear single product view if it was deleted
                if(state.product?._id === productId){
                    state.product = null
                }

            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Load all products
            .addCase(loadAllProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(loadAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
            })
            .addCase(loadAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Load category products
            .addCase(loadProductsByCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(loadProductsByCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categoryProducts = action.payload.products;
                state.pagination = action.payload.metaData;
            })
            .addCase(loadProductsByCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Search products
            .addCase(searchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(searchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.searchResults = action.payload.result.searchResults;
                state.relatedProducts = action.payload.result.relatedCategoryResults;
                state.pagination = action.payload.metaData;

            })
            .addCase(searchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Product by Id
            .addCase(getProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    }

});

export const {clearMessages} = productSlice.actions;
export default productSlice.reducer;

