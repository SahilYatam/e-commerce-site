import crypto from "crypto"

export const generateToken = () => {
    return crypto.randomBytes(32).toString("hex")
}

export const hashToken = (token) => {
    return crypto.createHash("sha256").update(token).digest("hex")
}

export const tokenExpiresAt = () => {
    return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
}