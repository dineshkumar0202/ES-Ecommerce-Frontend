import express from "express";
import PostController from "../../controllers/freelance/PostController";

import { protect } from "../../middleware/authMiddleware";

const router = express.Router();

router.get("/", PostController.getPosts);
router.get("/:id", PostController.getPostById);
router.post("/", protect, PostController.createPost);
router.put("/:id", protect, PostController.updatePost);
router.put("/:id/status", protect, PostController.updatePostStatus);
router.delete("/:id", protect, PostController.deletePost);
router.post("/generate-image", protect, PostController.generateImage);

export default router;
