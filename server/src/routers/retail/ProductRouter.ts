import express from "express";
import ProductController from "../../controllers/Retail/ProductController";
import { protect, admin } from "../../middleware/authMiddleware";

const router = express.Router();

router.get("/", ProductController.getProducts);
router.get("/categories", ProductController.getCategories);
router.get("/brands", ProductController.getBrands);
router.get("/top", ProductController.getTopRatedProducts);
router.get("/:id", ProductController.getProductById);
router.post("/:id/reviews", protect, ProductController.createProductReview);
router.post("/", protect, ProductController.createProduct);
router.put("/:id", protect, ProductController.updateProduct);
router.delete("/:id", protect, ProductController.deleteProduct);

export default router;
