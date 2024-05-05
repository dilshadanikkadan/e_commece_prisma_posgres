import { generateAccessToken } from "utils/token.util";
import * as jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "your-refresh-token-secret";
const prisma = new PrismaClient();
async function refreshAccessToken(refreshToken: any) {
  try {
    // Verify the refresh token
    const payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    const userId = typeof payload === "string" ? null : payload?.id;

    // Retrieve user data from the database
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      // User not found
      return null;
    }

    // Check if the refresh token is still valid
    const isRefreshTokenValid = await bcrypt.compare(
      refreshToken,
      user.refreshToken
    );

    if (
      !isRefreshTokenValid ||
      (user.refreshTokenExpires && user.refreshTokenExpires < new Date())
    ) {
      // Refresh token is invalid or expired
      return null;
    }

    // Generate a new access token
    const accessToken = generateAccessToken(user);

    return accessToken;
  } catch (error) {
    // Handle token verification and refresh errors
    console.error("Token refresh error:", error);
    return null;
  }
}
