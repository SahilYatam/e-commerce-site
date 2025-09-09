import { asyncHandler } from "../utils/handlers/asyncHandler.js"

import { setCookies } from "../utils/handlers/cookies.js";

import { refreshAccessToken } from "../services/session.service.js";

export const handleRefreshAccessToken = asyncHandler(async(req, res) => {
    const  token = req.cookies.refreshToken
    const {accessToken, refreshToken} = await refreshAccessToken(token);

    setCookies(res, accessToken, refreshToken)

    return res.status(200).json({message: "Token refreshed successfully"})
})