import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },

    productName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        index: true
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
        default: "other",
        index: true // ✅ category filtering
    }

}, { timestamps: true });

/* ======================
   Compound Indexes
   ====================== */

// ✅ Category pages sorted by newest
productSchema.index({ category: 1, createdAt: -1 });

// ✅ Seller dashboard sorted by newest
productSchema.index({ sellerId: 1, createdAt: -1 });

export const Product = mongoose.model("Product", productSchema);
