import * as express from "express";
import authRoutes from './routes/auth.route';
import errorHandlerMiddleware from './exceptions/error.handler.middleware';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use(errorHandlerMiddleware);

export default app;