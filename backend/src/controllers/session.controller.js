import { asyncHandler } from "../utils/handlers/asyncHandler.js"

import { setCookies } from "../utils/handlers/cookies.js";
import { ApiError } from "../utils/responses/ApiError.js";
import { refreshAccessToken } from "../services/session.service.js";

export const handleRefreshAccessToken = asyncHandler(async(req, res) => {
    const  token = req.cookies.refreshToken;

    if (!token) {
        throw new ApiError(401, "Refresh token not found in cookies");
    }

    const {accessToken, refreshToken} = await refreshAccessToken(token);

    setCookies(res, accessToken, refreshToken)

    return res.status(200).json({message: "Token refreshed successfully"})
})