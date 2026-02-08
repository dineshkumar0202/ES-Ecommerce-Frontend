import express from "express";
import WishlistController from "../../controllers/retail/WishlistController";
import { protect } from "../../middleware/authMiddleware";

const router = express.Router();

router.get("/", protect, WishlistController.getWishlist);
router.post("/", protect, WishlistController.addToWishlist);
router.delete("/:id", protect, WishlistController.removeFromWishlist);

export default router;
