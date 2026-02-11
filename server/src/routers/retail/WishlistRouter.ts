import express from "express";
import WishlistController from "../../controllers/Retail/WishlistController";
import { protect } from "../../middleware/authMiddleware";

const router = express.Router();

router.get("/", protect, WishlistController.getWishlist);
router.post("/", protect, WishlistController.addToWishlist);
router.delete("/:id", protect, WishlistController.removeFromWishlist);

export default router;
