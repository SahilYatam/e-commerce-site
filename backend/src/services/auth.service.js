import { User } from "../models/user.model.js"
import { Session } from "../models/session.model.js"

import { ApiError } from "../utils/responses/ApiError.js"

import { hashPassword, comparePassword } from "../utils/security/password.utils.js";
import { generateToken, hashToken } from "../utils/security/token.utils.js";

const toPublicUser = (user) => ({
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role || "buyer"
});

const signup = async (data) => {
    const email = data.email.trim().toLowerCase()
    const existingUser = await User.findOne({email});

    if(existingUser) throw new ApiError(400, "An account with this email already exists");

    const hashedPassword = await hashPassword(data.password);

    const user = new User ({
        name: data.name,
        email: data.email,
        password: hashedPassword,
    });

    await user.save();

    return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    }
}

const login = async (data) => {
    const email = data.email.trim().toLowerCase()
    const user = await User.findOne({email});

    if(!user) throw new ApiError(404, "Invalid email");

    const isPasswordValid = await comparePassword(data.password, user.password)

    if(!isPasswordValid) throw new ApiError(401, "Password is incorrect");

    return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    }
}

const logout = async (refreshToken) => {
    const hashedToken = hashToken(refreshToken)
    const session = await Session.findOneAndDelete({refreshToken: hashedToken});

    if(!session) throw new ApiError(403, "Unauthorized request");

    return { message: "Session invalidated successfully" };
}

const getUser = async(id) => {
    const user = await User.findById(id)
    if(!user) throw new ApiError(404, "User not found");

    return toPublicUser(user)
}

const forgetPasswordRequest = async (data) => {
    const email = data.email.toLowerCase().trim();
    const user = await User.findOne({email});

    if(!user) throw new ApiError(404, "User with this email does not exist");

    const rawToken = generateToken();
    const resetTokenExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    const hashedToken = hashToken(rawToken)

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    return {email: user.email, token: rawToken, userId: user._id}
}

const resetPassword = async(token, password) => {
    const hashedToken = hashToken(token)
    const user = await User.findOne({resetPasswordToken: hashedToken})

    if(!user || user.resetPasswordExpiresAt.getTime()  < Date.now()) {
        throw new ApiError(403, "Invalid or Expired reset token");
    }

    const newPassword = await hashPassword(password)
    user.password = newPassword;

    await user.save();

    return {email: user.email, userId: user._id};
}

export const authService = {
    signup,
    login,
    logout,
    getUser,
    forgetPasswordRequest,
    resetPassword
}