import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },

    productId: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true
    },

    status: {
        type: String,
        enum: ["Placed", "Shipped", "Delivered", "Canceled"],
        default: "Placed",
    }

}, {timestamps: true})