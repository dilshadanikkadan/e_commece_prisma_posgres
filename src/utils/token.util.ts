import bcrypt from "bcrypt";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "your-access-token-secret";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "your-refresh-token-secret";

export const ACCESS_TOKEN_EXPIRATION = "15m"; // 15 minutes
export const REFRESH_TOKEN_EXPIRATION = "7d"; // 7 days

interface UserData {
  id: number;
  email: string;
  password: string;
  isAdmin: Boolean;
  refreshToken?:string;
  refreshTokenExpires?:Date;
}
// In-memory storage for refresh tokens (ideally use a secure database or cache)
const refreshTokens: { [key: string]: string } = {};

// Generate a secure random string for token
export const generateRandomString = (length: number) => {
  return crypto.randomBytes(length).toString("hex");
};

export const generateAccessToken = (user: UserData) => {
  return jwt.sign(
    { userId: user.id, isAdmin: user.isAdmin },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRATION,
    }
  );
};

export const generateRefreshToken = () => {
  return crypto.randomBytes(64).toString("hex");
};

export const verifyRefreshToken = (token: string) => {
  const userId = refreshTokens[token];
  if (!userId) {
    return null;
  }
  return userId;
};
