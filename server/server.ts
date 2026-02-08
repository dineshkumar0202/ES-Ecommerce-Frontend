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


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes); // Freelancer posts
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/users", userRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);


app.get("/", (req: Request, res: Response) => {
    res.send("API is running...");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
