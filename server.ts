// server.ts
import express from 'express';
import customerRoutes from "./routers/customer-routes";
import carRouters from "./routers/car-routers";
import bookingRoutes from "./routers/booking-routes";
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes, { authenticateToken } from "./routers/auth-routes";

// Load environment variables
dotenv.config();

// Check if required environment variables are present
if (!process.env.SECRET_KEY || !process.env.REFRESH_TOKEN || !process.env.DATABASE_URL) {
    console.error("Missing required environment variables. Please check your .env file.");
    process.exit(1);
}

const app = express();
//============
app.use(express.json()); // ADD THIS TO PARSE JSON REQUESTS


// Middlewares
app.use(express.json());

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5175', 'http://localhost:5174'],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true,
}));

// Routes
app.use('/auth', authRoutes);

// Protected routes
app.use('/customer', authenticateToken, customerRoutes);
app.use('/car', authenticateToken, carRouters);
app.use('/booking', authenticateToken, bookingRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// 404 Middleware (Keep at the bottom)
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ error: "Something went wrong" });
});