import express from "express";
import OrderController from "../../controllers/retail/OrderController";
import { protect, admin } from "../../middleware/authMiddleware";

const router = express.Router();

router.post("/", protect, OrderController.addOrderItems);
router.get("/myorders", protect, OrderController.getMyOrders);
router.get("/:id", protect, OrderController.getOrderById);
router.put("/:id/pay", protect, OrderController.updateOrderToPaid);
router.put("/:id/deliver", protect, admin, OrderController.updateOrderToDelivered);
router.get("/", protect, admin, OrderController.getOrders);

export default router;
