import * as express from "express";
import authController from "../controllers/auth.controller";
import { registerLimiter } from "../middlewares/limiter/limiter";
import { registerValidationRules } from "../dtos/auth.dtos";
import { verifyAccessToken } from "../middlewares/auth/decode.token";

const router = express.Router();

router.post("/register", registerLimiter, registerValidationRules,authController.register);
router.post("/login",authController.login);

router.get("/check",verifyAccessToken,(req:any,res:any)=>{
res.send("hei you allowed to this page")
})
export default router;
