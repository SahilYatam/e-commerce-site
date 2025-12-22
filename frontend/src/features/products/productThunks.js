import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const addProduct = createAsyncThunk(
    "product/addProducts",
    async ({ productImage, productName, price, description, category, stock }, { rejectWithValue }) => {
        try {
            const formData = new FormData();

            formData.append("productImage", productImage);
            formData.append("productName", productName);
            formData.append("price", price);
            formData.append("description", description);
            formData.append("category", category);
            formData.append("stock", stock);


            const res = await axios.post("/product/add-products", formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            return res.data.data.product;
        } catch (error) {
            const message = error.response?.data?.message || "Something went wrong while creating product"
            return rejectWithValue(message);
        }

    }
)

export const updateProduct = createAsyncThunk(
    "product/updateProduct",
    async ({ id, productName, price, description, category }, { rejectWithValue }) => {
        try {
            const res = await axios.patch(`/product/update/${id}`, { productName, price, description, category });
            return { updatedProduct: res.data.data.updatedProduct, productId: id, successMsg: "Product updated!" };
        } catch (error) {
            const message = error.response?.data?.message || "Something went wrong while updating product"
            return rejectWithValue(message)
        }
    }
)

export const deleteProduct = createAsyncThunk(
    "product/deleteProduct",
    async ({ id }, { rejectWithValue }) => {
        try {
            const res = await axios.delete(`/product/delete/${id}`)
            return {productId: id, successMsg: res.data.message}
        } catch (error) {
            const message = error.response?.data?.message || "Something went wrong while deleting product"
            return rejectWithValue(message)
        }
    }
)

export const loadAllProducts = createAsyncThunk(
    "product/getAllProducts",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get("/product/all-products")
            return {
                products: res.data.data.products,
                message: res.data.message
            }
        } catch (error) {
            const message = error.response?.data?.message || "Error while fetching products"
            return rejectWithValue(message)
        }
    }
)

export const loadProductsByCategory = createAsyncThunk(
    "product/categoryProduct",
    async (category, { rejectWithValue }) => {
        try {
            const res = await axios.get("/product/product-category", {
                params: {category}
            });

            return {
                products: res.data.data.products,
                metaData: res.data.meta
            }
        } catch (error) {
            const message = error.response?.data?.message || "Error while fetching category products"
            return rejectWithValue(message)
        }
    }
)

export const searchProducts = createAsyncThunk(
    "product/searchProducts",
    async (productName, { rejectWithValue }) => {
        try {
            const res = await axios.get("/product/search", {
                params: {productName}
            });

            return {
                result : res.data.data.results,
                metaData: res.data.meta
            };
        } catch (error) {
            const message = error.response?.data?.message || "Error while searching products";
            return rejectWithValue(message);
        }
    }
)

export const getProductById = createAsyncThunk(
    "product/produtById",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.get(`/product/${id}`, {withCredentials: true});
            return res.data.data.product;
        } catch (error) {
            const message = error.response?.data?.message || "Error while getting product by id";
            return rejectWithValue(message);
        }
    }
)

