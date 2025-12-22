import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    productName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },

    productImage: {
        type: String,
    },

    price: {
        type: Number,
        required: true,
    },

    stock: {
        type: Number,
        default: 1,
        min: 1,
    },

    description: {
        type: String,
        required: true,
    },

    category: {
        type: String,
        lowercase: true,
        enum: [
            "electronics",
            "clothing",
            "home & kitchen",
            "books",
            "beauty & personal care",
            "sports & outdoors",
            "other"
        ],
        default: "other"
    }

}, { timestamps: true });

export const Product = mongoose.model("Product", productSchema);
