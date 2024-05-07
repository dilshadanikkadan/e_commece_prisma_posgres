import { generateAccessToken } from "../../utils/token.util";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const refreshAccessToken = async (refreshToken: any) => {
  try {
    // Verify the refresh token is valid

    const user = await prisma.user.findFirst({
      where: { refreshToken: refreshToken },
    });

    if (!user) {
      return null;
    }
console.log(user.refreshTokenExpires);
console.log(new Date());

    if (!(user.refreshTokenExpires && user.refreshTokenExpires > new Date())) {
      
      // Refresh token is invalid or expired
      return null;
    }

    // Generate a new access token
    const accessToken = generateAccessToken(user);

    return { accessToken, success: true };
  } catch (error) {
    // Handle token verification and refresh errors
    console.error("Token refresh error:", error);
    return null;
  }
};
