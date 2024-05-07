import * as express from "express";
import authRoutes from "./routes/auth.route";
import productRoutes from './routes/product.route'
import errorHandlerMiddleware from "./exceptions/error.handler.middleware";
import * as cookieParser from "cookie-parser";
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);

// Error handling middleware
app.use(errorHandlerMiddleware);

export default app;
