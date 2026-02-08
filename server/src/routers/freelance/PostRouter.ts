import express from "express";
import PostController from "../../controllers/freelance/PostController";

const router = express.Router();

router.get("/", PostController.getPosts);
router.post("/", PostController.createPost);
router.post("/generate-image", PostController.generateImage);

export default router;
