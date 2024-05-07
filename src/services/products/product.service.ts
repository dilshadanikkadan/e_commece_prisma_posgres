import { ProductDto } from "dtos/product.dto";
import { NextFunction } from "express";
import ProductRepositories from "../../repositories/product.repository";


class ProductService{
   async create(productData:ProductDto,next:NextFunction):Promise<any>{
       const {category,description,image,price,stock,title} = productData
       try {
           const save_product = await ProductRepositories.prototype.saveProduct({
            ...productData
           })
        } catch (error) {
            
        }
    }
}

export default new ProductService();