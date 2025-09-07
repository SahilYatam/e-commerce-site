import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    sellerId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },

    productName: {
        type: String,
        required: true,
    },

    productImage: {
        type: String,
        required: true,
    },

    price: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    }

}, {timestamps: true});

export const Product = mongoose.model("Product", productSchema);
