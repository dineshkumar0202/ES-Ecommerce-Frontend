import express from "express";
import PostController from "../../controllers/freelance/PostController";
import TryOnController from "../../controllers/freelance/TryOnController";

import { protect } from "../../middleware/authMiddleware";

const router = express.Router();

// Static routes MUST come before /:id to avoid conflicts
router.get("/", PostController.getPosts);
router.post("/", protect, PostController.createPost);
router.post("/generate-image", protect, PostController.generateImage);

// Virtual Try-On routes
router.post("/try-on", protect, TryOnController.startTryOn);
router.get("/try-on/status/:id", protect, TryOnController.getTryOnStatus);

// Dynamic :id routes AFTER static routes
router.get("/:id", PostController.getPostById);
router.post("/:id/interest", protect, PostController.submitInterest);
router.put("/:id", protect, PostController.updatePost);
router.put("/:id/status", protect, PostController.updatePostStatus);
router.delete("/:id", protect, PostController.deletePost);

export default router;
