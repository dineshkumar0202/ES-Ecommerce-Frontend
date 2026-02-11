import express from "express";
import OrderController from "../../controllers/Retail/OrderController";
import { protect, admin, seller } from "../../middleware/authMiddleware";

const router = express.Router();

router.post("/", protect, OrderController.addOrderItems);
router.get("/myorders", protect, OrderController.getMyOrders);
router.get("/seller/orders", protect, seller, OrderController.getSellerOrders);
router.get("/:id", protect, OrderController.getOrderById);
router.put("/:id/pay", protect, OrderController.updateOrderToPaid);
router.put("/:id/deliver", protect, admin, OrderController.updateOrderToDelivered);
router.put("/:id/status", protect, seller, OrderController.updateOrderStatus);
router.get("/", protect, admin, OrderController.getOrders);

export default router;
