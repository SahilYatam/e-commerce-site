import { User } from "../models/user.model.js"
import { Session } from "../models/session.model.js"

import { ApiError } from "../utils/responses/ApiError.js"

import { hashPassword, comparePassword } from "../utils/security/password.utils.js";
import { hashToken } from "../utils/security/token.utils.js";

const toPublicUser = (user) => ({
    id: user._id,
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

    return toPublicUser(user)
}

const login = async (data) => {
    const email = data.email.trim().toLowerCase()
    const user = await User.findOne({email});

    if(!user) throw new ApiError(404, "Invalid email");

    const isPasswordValid = await comparePassword(data.password, user.password)

    if(!isPasswordValid) throw new ApiError(401, "Password is incorrect");

    return toPublicUser(user);
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

const changePassword = async(id, data) => {
    const user = await User.findById(id)
    if(!user) throw new ApiError(404, "User not found");

    const isPasswordValid = await comparePassword(data.oldPassword, user.password)
    if(!isPasswordValid) throw new ApiError(401, "Password is incorrect");

    if(data.newPassword !== data.confirmPassword) {
        throw new ApiError(401, "Password does not match with confirm password");
    }

    const newPassword = await hashPassword(data.newPassword)

    user.password = newPassword;

    await user.save();

    return {message: "Password changed successfully"};
}

const changeUserName = async (id, data) => {
    const user = await User.findById(id)
    if(!user) throw new ApiError(404, "User not found");

    user.name = data.name;

    await user.save();

    return {userName: user.name}
}

export const authService = {
    signup,
    login,
    logout,
    getUser,
    changePassword,
    changeUserName
}