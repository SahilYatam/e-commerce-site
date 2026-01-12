import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },

    refreshToken: {
        type: String,
        required: true,
        unique: true,
        index: true
    },

    expiresAt: {
        type: Date,
        required: true,
        index: true
    },

}, { timestamps: true });

// ✅ TTL index → auto delete expired sessions
sessionSchema.index(
    { expiresAt: 1 },
    { expireAfterSeconds: 0 }
);

export const Session = mongoose.model("Session", sessionSchema);
