import { Request, Response, NextFunction } from "express";
import authService from "../services/auth/auth.service";
import { successMessage } from "../handlers/response.handler";
import { LoginDto, RegisterDto } from "../dtos/auth.dtos";
import { validationResult } from "express-validator";
import { createError } from "../handlers/error.handler";
import { validate_err } from "../utils/messages/log.message";

class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const userData: RegisterDto = req.body;
      const errors = validationResult(req);
      const err_msg = validate_err(req);
      if (!errors.isEmpty()) {
        return next(createError(400, err_msg));
      }

      const result = await authService.register(userData, next);
      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        // Other cookie options...
      });
      return successMessage(res, 201, result);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const credentials: LoginDto = req.body;
      const result = await authService.login(credentials, next);

      if (result?.success) return successMessage(res, 200, result);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
