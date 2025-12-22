import { asyncHandler } from "../utils/handlers/asyncHandler.js"
import { ApiResponse } from "../utils/responses/ApiResponse.js"
import logger from "../utils/logger/logger.js";

import { setCookies, clearCookies } from "../utils/handlers/cookies.js";

import { authService } from "../services/auth.service.js"
import { createSession } from "../services/session.service.js";

import { sendPasswordResetEmail, sendPasswResetSuccessEmail } from "../services/email.service.js";

const signup = asyncHandler(async(req, res) => {
    const user = await authService.signup(req.body);

    const {accessToken, refreshToken} = await createSession(user.id)

    setCookies(res, accessToken, refreshToken)

    return res.status(201).json(new ApiResponse(201, {user}, "Account created successfully"));
});

const login = asyncHandler(async (req, res) => {
    const user = await authService.login(req.body);

    const {accessToken, refreshToken} = await createSession(user.id)

    setCookies(res, accessToken, refreshToken)

    return res.status(200).json(new ApiResponse(200, {user}, "Login successful"));
});

const logout = asyncHandler(async(req, res) => {
    const refreshToken = req.cookies.refreshToken;

    await authService.logout(refreshToken)
    clearCookies(res);

    return res.status(200).json(new ApiResponse(200, {}, "Logout successful"))
});

const getUser = asyncHandler(async(req, res) => {
    const id = req.user?._id
    const user = await authService.getUser(id)

    return res.status(200).json(new ApiResponse(200, {user}, "User account fetched successfully"));
});

const forgetPasswordRequest = asyncHandler(async(req, res) => {
    const user = await authService.forgetPasswordRequest(req.body);
    const resetLink = `${process.env.CLIENT_URL}/forget-password/${user.token}`;

    await sendPasswordResetEmail(user.email, resetLink);

    logger.info("Password reset link generated from this Id: ", { userId: user.userId });

    return res.status(200).json(new ApiResponse(200, {}, "Password reset email send successfully"));
})

const resetPassword = asyncHandler(async(req, res) => {
    const token = req.params.token;

    const user = await authService.resetPassword(token, req.body);
    await sendPasswResetSuccessEmail(user.email);

    logger.info("Password reset successful from this Id: ", { userId: user.userId });
    return res.status(200).json(new ApiResponse(200, {}, "Password reset successfull"));
})

export const authController = {
    signup,
    login,
    logout,
    getUser,
    forgetPasswordRequest,
    resetPassword
}