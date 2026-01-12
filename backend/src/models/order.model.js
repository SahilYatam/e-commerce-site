import mongoose from "mongoose";
import { Counter } from "./counter.model.js";

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        unique: true,
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },

    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        productName: String,
        description: String,
        quantity: Number,
        priceAtPurchase: Number,
        itemTotal: Number,
        productImage: String,
    }],

    totalAmount: {
        type: Number,
        required: true
    },

    deliveryAddress: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ["pending", "confirmed", "canceled", "reject"],
        default: "pending",
        index: true
    },

    paymentStatus: {
        type: String,
        enum: ["unpaid", "paid"],
        default: "unpaid",
        index: true
    },

    isHiddenByUser: {
        type: Boolean,
        default: false,
        index: true
    },

    hiddenAt: Date

}, { timestamps: true });

orderSchema.index({ userId: 1, createdAt: -1 });
orderSchema.index({ userId: 1, status: 1 });
orderSchema.index({ status: 1, createdAt: -1 });


orderSchema.pre("save", async function (next) {
    if (!this.isNew) return next();

    const counter = await Counter.findOneAndUpdate(
        { _id: "orderId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );

    const padded = String(counter.seq).padStart(3, "0");
    this.orderId = `ORD-${padded}`;

    next();
});

export const Order = mongoose.model("Order", orderSchema);
