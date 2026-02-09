import express from "express";
import AuthController from "../../controllers/users/AuthController";
import { protect } from "../../middleware/authMiddleware";

const router = express.Router();

// Legacy
router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUser);

// New Routes for Split Login/Register
router.post("/send-otp", AuthController.sendOtp);
router.post("/verify-otp", AuthController.verifyOtp);

router.post("/register/buyer", AuthController.registerBuyer);
router.post("/register/seller", AuthController.registerSeller);
router.post("/login/buyer", AuthController.loginBuyer);
router.post("/login/seller", AuthController.loginSeller);
router.post("/login/admin", AuthController.loginAdmin);
router.get("/me", protect, AuthController.getMe);

export default router;
