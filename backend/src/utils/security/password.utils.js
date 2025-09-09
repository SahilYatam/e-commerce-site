import bcrypt from "bcrypt";
import {ApiError} from "../responses/ApiError.js"

export const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(12);
        return bcrypt.hash(password, salt);
    } catch (error) {
        throw new ApiError(500, "Password hashing failed", {message: error.message})
    }
};

export const comparePassword = async (password, hashedPassword) => {
    try {
        return bcrypt.compare(password, hashedPassword)
    } catch (error) {
        throw new ApiError(500, "Password comparison failed", {message: error.message})
    }
};


