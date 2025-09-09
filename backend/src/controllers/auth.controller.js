import { asyncHandler } from "../utils/handlers/asyncHandler.js"
import { ApiResponse } from "../utils/responses/ApiResponse.js"

import { setCookies, clearCookies } from "../utils/handlers/cookies.js";

import { authService } from "../services/auth.service.js"
import { createSession } from "../services/session.service.js";

const signup = asyncHandler(async(req, res) => {
    const user = await authService.signup(req.body);

    const {accessToken, refreshToken} = await createSession(user)

    setCookies(res, accessToken, refreshToken)

    return res.status(201).json(new ApiResponse(201, {user}, "Account created successfully"));
});

const login = asyncHandler(async (req, res) => {
    const user = await authService.login(req.body);

    const {accessToken, refreshToken} = await createSession(user)

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

const changePassword = asyncHandler(async(req, res) => {
    const id = req.user?._id

    const result = await authService.changePassword(id, req.body)

    return res.status(200).json(new ApiResponse(200, {result}, "Password changed successfully"));
});

const changeUserName = asyncHandler(async(req, res) => {
    const id = req.user?._id

    const {userName} = await authService.changeUserName(id, req.body)

    return res.status(200).json(new ApiResponse(200, {userName}, "Named changed successfully"));
})



export const authController = {
    signup,
    login,
    logout,
    getUser,
    changePassword,
    changeUserName
}