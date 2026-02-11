import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import postRoutes from "./src/routers/freelance/PostRouter";
import authRoutes from "./src/routers/users/AuthRouter";
import productRoutes from "./src/routers/retail/ProductRouter";
import cartRoutes from "./src/routers/retail/CartRouter";
import userRoutes from "./src/routers/users/UserRouter";
import wishlistRoutes from "./src/routers/retail/WishlistRouter";
import orderRoutes from "./src/routers/retail/OrderRouter";
import qProductRoutes from "./src/routers/q-commerce/QProductRouter";
import resaleRoutes from "./src/routers/Resale/ResaleProductRouter";
import wholesaleRoutes from "./src/routers/Wholesale/WholesaleProductRouter";
import adminRoutes from "./src/routers/admin/AdminRouter";
import uploadRoutes from "./src/routers/uploadRouter";
import paymentRoutes from "./src/routers/paymentRouter";
import notificationRoutes from "./src/routers/users/NotificationRouter";
import testEmailRoutes from "./src/routers/testEmailRouter";
import googleAuthRoutes from "./src/routers/auth/GoogleAuthRouter";
import session from "express-session";
import passport from "./src/config/passport";
import User from "./src/models/users/UserModel";
import Product from "./src/models/retail/ProductModel";
import QProduct from "./src/models/q-commerce/QProductModel";


import { Server } from "socket.io";
import http from "http";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // In production, specify the client URL
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 5000;

// Socket connection
io.on("connection", (socket) => {
    // console.log("New client connected:", socket.id);

    socket.on("join", (userId) => {
        socket.join(userId);
        // console.log(`User ${userId} joined room`);
    });

    socket.on("disconnect", () => {
        // console.log("Client disconnected");
    });
});

// Attach io to request object for use in controllers
app.use((req: any, res, next) => {
    req.io = io;
    next();
});

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5175',
    credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Session middleware for Passport
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'fallback_secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false, // Set to true in production with HTTPS
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        }
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth/google", googleAuthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/posts", postRoutes); // Freelancer posts
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/users", userRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/q-commerce", qProductRoutes);
app.use("/api/resale", resaleRoutes);
app.use("/api/wholesale", wholesaleRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/test", testEmailRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("API is running...");
});

// Database Connection and Server Startup
const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("MongoDB Connected 🌱");

        const serverInstance = server.listen(PORT, () => {
            console.log(`Server running on port ${PORT} ✅🚀`);
        });

        // Sync indexes to ensure 'sparse' option is applied to indexes (Non-blocking)
        User.syncIndexes().catch(err => console.error("User Index Sync failed:", err));
        Product.syncIndexes().catch(err => console.error("Product Index Sync failed:", err));
        QProduct.syncIndexes().catch(err => console.error("QProduct Index Sync failed:", err));
        // console.log("Database Index Sync initiated ⏳");

        // Handle server errors
        serverInstance.on('error', (error: any) => {
            if (error.code === 'EADDRINUSE') {
                console.error(`Error: Port ${PORT} is already in use.`);
            } else {
                console.error('Server error:', error);
            }
        });

    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
};

startServer();
