import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    hashPassword: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["buyer", "seller"],
        default: "buyer"
    },

    shopName: {
        type: String
    },

    shopAddress: {
        type: String
    }

}, {timestamps: true});

export const User = mongoose.model("User", userSchema)