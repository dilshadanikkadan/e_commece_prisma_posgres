import * as bcrypt from "bcrypt";
import userRepository from "../../repositories/user.repository";
import { AuthenticationError } from "../../exceptions/auth-exceptions";
import { LoginDto, RegisterDto } from "dtos/auth.dtos";
import { successMessage } from "../../handlers/response.handler";
import { NextFunction, response } from "express";
import { createError } from "../../handlers/error.handler";
import { Sign_ } from "../../utils/messages/log.message";
import {
  REFRESH_TOKEN_EXPIRATION,
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/token.util";

class AuthService {
  async register(userData: RegisterDto, next: NextFunction): Promise<any> {
    const { email, password, username } = userData;

    // Check if user already exists
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      return next(createError(400, Sign_.EMAIL_EXISTS));
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    
    const user = await userRepository.create({
      email,
      password: hashedPassword,
      username,
    });
    
    // Generate access and refresh tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken();
    // Hash the refresh token before storing it
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);


    
    //update in databse the token
    const saveInDb = userRepository.updateToken(user, {
      refreshToken: hashedRefreshToken,
      REFRESH_TOKEN_EXPIRATION,
    });
    return {
      ...saveInDb,
      token:accessToken
    };
  }

  async login(credentials: LoginDto, next: NextFunction): Promise<any> {
    const { email, password } = credentials;

    // console.log("user", user);
    try {
      const user = await userRepository.findByEmail(email);
      if (!user) {
        return next(createError(400, "user no  exist !!!"));
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) return next(createError(400, "password is not matching"));
      return { success: true, user };
    } catch (error) {}
  }
}

export default new AuthService();
