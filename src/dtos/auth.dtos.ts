import { body, ValidationChain } from "express-validator";

export const registerValidationRules: ValidationChain[] = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).*$/)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    ),
];

export interface RegisterDto {
  username: string;
  email: string;
  password: string;
  isAdmin:boolean
  refreshToken:string
  refreshTokenExpires:string
}

export interface LoginDto {
  email: string;
  password: string;
}
