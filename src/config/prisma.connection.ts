// config/prisma.connection.ts
import { PrismaClient } from "@prisma/client";

class PrismaConnection {
    protected prisma: PrismaClient;

    constructor() {
        this.prisma = this.getPrismaClient();
    }

     getPrismaClient(): PrismaClient {
        return new PrismaClient();
    }
}

export default PrismaConnection;
