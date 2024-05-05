import { Request } from "express";
import { validationResult } from "express-validator";
export const validate_err = (requests: Request) => {
  const errors = validationResult(requests);
  let err = {
    errors: errors.array(),
  }?.errors[0]?.msg;

  return err;
};

export const messageLogin = {
  SIGN_IN_ATTEMPT: "User attempting to sign in",
  SIGN_IN_ERROR: "Error occurred while signing in user: ",
  INCORRECT_EMAIL: "Incorrect email",
  INCORRECT_PASSWORD: "Incorrect password",
  DEVICE_BLOCKED: "Sign in attempt from blocked device",
  CONTEXT_DATA_VERIFY_ERROR: "Context data verification failed",
  MULTIPLE_ATTEMPT_WITHOUT_VERIFY:
    "Multiple sign in attempts detected without verifying identity.",
  LOGOUT_SUCCESS: "User has logged out successfully",
};

export const Sign_ = {
  REGISTER_ATTEMPT: "User attempting to register",
  REGISTER_SUCCESS: "User registered successfully",
  REGISTER_ERROR: "Error occurred while registering user: ",
  EMAIL_EXISTS: "Email already exists, please use a different email",
  WEAK_PASSWORD: "Password must be at least 8 characters long",
  PASSWORDS_NOT_MATCH: "Passwords do not match",
  USER_CREATION_FAILED: "Failed to create user, please try again later",
};
