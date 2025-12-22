import jwt from "jsonwebtoken";

import { ApiError } from "../utils/responses/ApiError.js";
import logger from "../utils/logger/logger.js";

import { User } from "../models/user.model.js";

export const authentication = async(req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const tokenFromHeader = authHeader?.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null;

        const accessToken = req.cookies.accessToken || tokenFromHeader;
        
        if (!accessToken)
            throw new ApiError(401, "Unauthorized - No access token provided");

        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN)
        if(!decoded) throw new ApiError(403, "Invalid request");

        let userId = decoded.userId || decoded.id || decoded.sub;

        if (!userId) {
            logger.error("❌ Token payload missing user identifier", {
                payload: decoded,
                availableKeys: Object.keys(decoded)
            })
            throw new ApiError(401, "Invalid token payload - missing user identifier");
        }

        const user = await User.findById(userId)
        if (!user) {
            logger.error("❌ User not found in database", { userId });
            throw new ApiError(401, "Invalid token - user not found");
        }

        
        req.user = user;
        next()
    } catch (error) {
        logger.error("❌ Authentication middleware error", {
            message: error.message,
            stack: error.stack,
            name: error.name
        });

        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
            });
        }

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                success: false,
                message: "Invalid token",
                errorMessage: error.message
            });
        }

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Token expired",
                errorMessage: error.message
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error",
            errorMessage: error.message
        });
    }
}

export const authorizeRole = (...role) => {
    return (req, res, next) => {
        if(!role.includes(req.user.role)) {
            throw new ApiError(403, "Forbidden: Access denied");
        }
        next()
    }
}