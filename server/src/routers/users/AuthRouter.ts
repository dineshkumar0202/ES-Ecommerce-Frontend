import express from "express";
import AuthController from "../../controllers/users/AuthController";
import { protect } from "../../middleware/authMiddleware";

const router = express.Router();

router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUser);
router.get("/me", protect, AuthController.getMe);

export default router;
