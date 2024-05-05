import * as jwt from "jsonwebtoken";
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

  //   const payload = verifyAccessToken(token);
  const payload = jwt.verify(token, ACCESS_TOKEN_SECRET);
  //   console.log("payload",payload);

  const userId = typeof payload === "string" ? null : payload?.id;
  if (!payload) {
    // Invalid access token
    return res.status(401).json({ error: "Invalid access token" });
  }

  // Attach user data to the request object
  req.user = { userId: userId };

  next();
};
