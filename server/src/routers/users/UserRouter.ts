import express from "express";
import UserController from "../../controllers/users/UserController";
import { protect, admin } from "../../middleware/authMiddleware";

const router = express.Router();

router
    .route("/profile")
    .get(protect, UserController.getUserProfile)
    .put(protect, UserController.updateUserProfile);

router.route("/").get(protect, admin, UserController.getUsers);

router
    .route("/:id")
    .delete(protect, admin, UserController.deleteUser)
    .get(protect, admin, UserController.getUserById)
// .put(protect, admin, UserController.updateUser); // Method name clash? No.

export default router;
