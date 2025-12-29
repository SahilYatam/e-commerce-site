import { Session } from "../models/session.model.js"

import { hashToken, tokenExpiresAt } from "../utils/security/token.utils.js"
import { generateAccessAndRefreshToken } from "../utils/security/generateAccessAndRefreshToken.js"

import logger from "../utils/logger/logger.js"
import { ApiError } from "../utils/responses/ApiError.js"

export const createSession = async (userId) => {
    try {
        const { accessToken, refreshToken: rawToken } = generateAccessAndRefreshToken(userId)

        const hashedToken = hashToken(rawToken)

        const expiresAt = tokenExpiresAt();

        const session = new Session({
            userId,
            refreshToken: hashedToken,
            expiresAt
        });

        await session.save();

        return { accessToken, refreshToken: rawToken }
    } catch (error) {
        logger.error("❌ Error while creating session", { message: error.message, stack: error.stack })
        throw new ApiError(500, "Error while creating session")
    }
}

const getSessionByRefreshToken = async (refreshToken) => {
    try {
        const hashedToken = hashToken(refreshToken)
        const session = await Session.findOne({ refreshToken: hashedToken })

        if (!session) {
            logger.warn("⚠️ Session not found for refresh token");
            throw new ApiError(401, "Invalid refresh token - session not found")
        }

        if (session.expiresAt.getTime() < Date.now()) {
            logger.warn("⚠️ Refresh token expired", {
                expiresAt: session.expiresAt,
                now: new Date()
            });
            throw new ApiError(401, "Refresh token expired - please login again")
        }

        return session;
    } catch (error) {
        if (error instanceof ApiError) throw error;

        logger.error("❌ Error getting session by refresh token", {
            message: error.message,
            stack: error.stack
        });
        throw new ApiError(500, "Error validating refresh token");
    }
}

export const refreshAccessToken = async (refreshToken) => {
    try {
        if (!refreshToken) {
            throw new ApiError(401, "Refresh token is required");
        }

        const session = await getSessionByRefreshToken(refreshToken)

        const {accessToken, refreshToken: rawRefreshToken} = generateAccessAndRefreshToken(session.userId)

        const newRefreshToken = hashToken(rawRefreshToken);

        session.refreshToken = newRefreshToken;
        session.expiresAt = tokenExpiresAt();

        await session.save()

        logger.info("✅ Access token refreshed successfully", {userId: session.userId});

        return {accessToken, refreshToken: rawRefreshToken}
    } catch (error) {
        if (error instanceof ApiError) throw error;
        
        logger.error("❌ Error refreshing access token", {
            message: error.message,
            stack: error.stack
        });
        throw new ApiError(500, "Error refreshing access token");
    }
}