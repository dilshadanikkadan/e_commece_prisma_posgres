import { Request, Response, NextFunction } from "express";
import { AuthenticationError } from "./auth-exceptions";

const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.statusCode || 500).json({
    message: err.message,
  });
};

export default errorHandlerMiddleware;
