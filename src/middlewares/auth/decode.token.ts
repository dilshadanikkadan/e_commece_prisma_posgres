import * as jwt from "jsonwebtoken";
import { refreshAccessToken } from "./refresh.check";

const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "access-token-secret";

export const verifyAccessToken = async (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    // No authorization header provided
    return res.status(401).json({ error: "Authorization header missing" });
  }

  const [tokenType, token] = authHeader.split(" ");

  if (tokenType !== "Bearer" || !token) {
    // Invalid authorization header format
    return res.status(401).json({ error: "Invalid authorization header" });
  }

  try {
    // Verify the access token
    const payload = jwt.verify(token, ACCESS_TOKEN_SECRET);

    // Extract user ID from the payload
    const userId = typeof payload === "string" ? null : payload?.id;

    // Attach user data to the request object
    req.user = { userId: userId };

    next();
  } catch (error) {
    // Check if the error is TokenExpiredError
    if (error.name === "TokenExpiredError") {
      // Access token has expired
      const refreshToken = req.cookies.refreshToken;
      if (refreshToken) {
        const checkValidity = await refreshAccessToken(refreshToken);
        console.log("cheking", checkValidity);

        if (checkValidity?.success) {
          // If refresh token is valid, call next() to continue middleware chain
          return next();
        }
      }
      return res.status(401).json({ error: "Access token has expired" });
    } else {
      // Other JWT verification errors
      return res.status(401).json({ error: "Invalid access token" });
    }
  }
};
