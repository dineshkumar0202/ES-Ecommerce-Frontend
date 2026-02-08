import express from "express";
import ProductController from "../../controllers/retail/ProductController";
import { protect, admin } from "../../middleware/authMiddleware";

const router = express.Router();

router.get("/", ProductController.getProducts);
router.get("/:id", ProductController.getProductById);
router.post("/", protect, ProductController.createProduct);
router.put("/:id", protect, ProductController.updateProduct);
router.delete("/:id", protect, ProductController.deleteProduct);

export default router;
