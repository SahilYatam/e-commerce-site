import jwt from "jsonwebtoken";
import { generateToken } from "./token.utils.js"

export const generateAccessAndRefreshToken = (user) => {
    let userId;
    if (user._id) {
        userId = user._id.toString();
    } else if (user.id) {
        userId = typeof user.id === 'string' ? user.id : user.id.toString();
    } else {
        throw new Error('User object missing ID');
    }
    
    const accessToken = jwt.sign(
        { userId, role: user.role }, 
        process.env.ACCESS_TOKEN, 
        { expiresIn: "15m" }
    );

    const refreshToken = generateToken();
    
    return { accessToken, refreshToken };
};