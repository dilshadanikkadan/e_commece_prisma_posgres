import * as express from "express"
import productController from "../controllers/product.controller";
const router = express.Router();

router.post('/createProduct',productController.addNewProduct)

export default router;