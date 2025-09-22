import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["buyer", "seller"],
        default: "buyer"
    },

    resetPasswordToken: {
        type: String,
        unique: true
    },

    resetPasswordExpiresAt: {
        type: Date,
    },

}, {timestamps: true});

export const User = mongoose.model("User", userSchema)