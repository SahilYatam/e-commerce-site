import jwt from "jsonwebtoken";
import { generateToken } from "./token.utils.js"

export const generateAccessAndRefreshToken = (user) => {
    const accessToken = jwt.sign({userId: user.id, role: user.role}, process.env.ACCESS_TOKEN, {
        expiresIn: "15m"
    });

    const refreshToken = generateToken();
    
    return {accessToken, refreshToken}
};
