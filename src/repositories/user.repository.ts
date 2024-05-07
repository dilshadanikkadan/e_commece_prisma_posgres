import { PrismaClient, User } from "@prisma/client";
import { createError } from "../handlers/error.handler";
import { Sign_ } from "../utils/messages/log.message";
import  ms =require("ms")
class UserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findFirst({ where: { email } });
  }

  async create(userData: any): Promise<any> {
    try {
      const saved_user = await this.prisma.user.create({ data: userData });
      console.log(saved_user, "saved info");

      return saved_user;
    } catch (error) {
      console.log(error);
    }
  }

  async updateToken(user: User, data: any) {
 
    try {
      return this.prisma.user.update({
        where: { id: user.id },
        data: {
          refreshToken: data.refreshToken,
          refreshTokenExpires: new Date(
            Date.now() + ms("7d")
          ),
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new UserRepository();
