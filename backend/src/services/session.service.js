import { Session } from "../models/session.model.js"

import { hashToken, tokenExpiresAt } from "../utils/security/token.utils.js"
import { generateAccessAndRefreshToken } from "../utils/security/generateAccessAndRefreshToken.js"

import logger from "../utils/logger/logger.js"
import { ApiError } from "../utils/responses/ApiError.js"

export const createSession = async (user) => {
    try {
        const {accessToken, refreshToken: rawToken} = generateAccessAndRefreshToken(user)
    
        const hashedToken = hashToken(rawToken)
    
        const expiresAt = tokenExpiresAt();
    
        const session = new Session({
            userId: user.id,
            refreshToken: hashedToken,
            expiresAt
        });
    
        await session.save();
    
        return {accessToken, refreshToken: rawToken}
    } catch (error) {
        logger.error("Error while creating session", {message: error.message, stack: error.stack})
        throw new ApiError(500, "Error while creating session")
    }
}

const getSessionByRefreshToken = async(refreshToken) => {
    const hashedToken = hashToken(refreshToken)
    const session = await Session.findOne({refreshToken: hashedToken})

    if(!session || session.expiresAt.getTime() < Date.now()) {
        throw new ApiError(401, "Session not found or refresh token is expired")
    };

    return session;
}

export const refreshAccessToken = async (refreshToken) => {
    const session = await getSessionByRefreshToken(refreshToken)

    const {accessToken, refreshToken: rawRefreshToken} = generateAccessAndRefreshToken(session.userId)

    const newRefreshToken = hashToken(rawRefreshToken);

    session.refreshToken = newRefreshToken;
    session.expiresAt = tokenExpiresAt();

    await session.save()

    return {accessToken, refreshToken: rawRefreshToken}
}
