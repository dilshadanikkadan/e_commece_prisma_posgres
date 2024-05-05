import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthenticationError } from "../exceptions/auth-exceptions";
interface DecodedToken {
  userId: string;
  email: string;
  // Add other properties as needed
}

declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return next(new AuthenticationError("No token provided"));
  }

  try {
    const decoded = jwt.verify(token, "your-secret-key") as DecodedToken;
    req.user = decoded;
    next();
  } catch (error) {
    next(new AuthenticationError("Invalid token"));
  }
};

export default authMiddleware;
