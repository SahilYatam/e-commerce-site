import mongoose from "mongoose";
import { Counter } from "./counter.model.js";

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        unique: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },

        productName: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true,
        },

        quantity: {
            type: Number,
            default: 1,
            min: 1
        },

        priceAtPurchase: {
            type: Number,
            required: true
        },

        itemTotal: {
            type: Number,
            required: true
        },

        productImage: {
            type: String,
        },

    }],

    totalAmount: {
        type: Number,
        required: true
    },

    deliveryAddress: { type: String, required: true },

    status: {
        type: String,
        enum: ["pending", "confirmed", "canceled", "reject"],
        default: "pending"
    },

    paymentStatus: {
        type: String,
        enum: ["unpaid", "paid"],
        default: "unpaid"
    },

    isHiddenByUser: { type: Boolean, default: false },

    hiddenAt: Date

}, { timestamps: true });

orderSchema.pre("save", async function (next) {
    // Only generate orderId for new orders
    if (!this.isNew) return next();

    const counter = await Counter.findOneAndUpdate(
        { _id: "orderId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );

    const padded = String(counter.seq).padStart(3, "0");
    this.orderId = `ORD-${padded}`;

    next()
})

orderSchema.index({ userId: 1, createdAt: -1 });

export const Order = mongoose.model("Order", orderSchema)