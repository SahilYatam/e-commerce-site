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
        required: true,
    },

    price: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    category: {
        type: String,
        enum: [
            "Electronics",
            "Clothing",
            "Home & Kitchen",
            "Books",
            "Beauty & Personal Care",
            "Sports & Outdoors",
            "Other"
        ],
        default: "Other"
    }

}, {timestamps: true});

export const Product = mongoose.model("Product", productSchema);
