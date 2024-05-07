import { PrismaClient, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import PrismaConnection from "../config/prisma.connection";
import { ProductDto } from "dtos/product.dto";

class ProductRepositories extends PrismaConnection {
  constructor() {
    super();
    this.prisma = this.getPrismaClient();
  }

  async saveProduct(productData: any): Promise<any> {
    try {
      return this.prisma.products.create({
        data: productData,
      });
    } catch (error) {
        console.log(error);
        
    }
  }
}

export default ProductRepositories;
