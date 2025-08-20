import jwt from "jsonwebtoken";

export function generateAccessToken(payload: { id: string; role: string }) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {
        expiresIn: "15m",
    });
}

export function generateRefreshToken(payload: { id: string }) {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, {
        expiresIn: "7d",
    });
}


