import express from "express";
import CartController from "../../controllers/retail/CartController";
import { protect } from "../../middleware/authMiddleware";

const router = express.Router();

router.get("/", protect, CartController.getCart);
router.post("/", protect, CartController.addToCart);
router.delete("/:productId", protect, CartController.removeFromCart);
router.put("/:productId", protect, CartController.updateCartItemQuantity);

export default router;
