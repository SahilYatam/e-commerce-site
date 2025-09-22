import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },

    quantity: {
        type: Number,
        default: 1
    },

    priceAtPurchase: {   
        type: Number,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    status: {
        type: String,
        enum: ["pending", "confirmed", "shipped", "delivered", "canceled"],
        default: "pending"
    }

}, {timestamps: true});

export const Order = mongoose.model("Order", orderSchema)