import { ProductDto } from "dtos/product.dto";
import { NextFunction, Request, Response } from "express";
import productService from "../services/products/product.service";

class ProductController {
  async addNewProduct(req: Request, res: Response, next: NextFunction): Promise<any> {
    const productData: ProductDto = req.body;
    try {

        const res = await productService.create(productData,next)
    } catch (error) {}
  }
}

export default new ProductController();
