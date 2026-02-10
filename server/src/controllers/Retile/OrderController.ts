import { Request, Response } from 'express';
import OrderService from '../../services/retail/OrderService';
import Notification from '../../models/NotificationModel';

interface IAuthRequest extends Request {
    user?: any;
    io?: any;
}

class OrderController {
    async addOrderItems(req: IAuthRequest, res: Response) {
        try {
            const order = await OrderService.createOrder(req.user._id as string, req.body);

            // Save notification to DB
            const notification = new Notification({
                user: req.user._id,
                type: 'ORDER_CREATED',
                message: `Order #${order._id} placed successfully!`,
                orderId: order._id
            });
            await notification.save();

            // Emit notification to user
            if (req.io) {
                req.io.to(req.user._id.toString()).emit('notification', {
                    id: notification._id,
                    type: 'ORDER_CREATED',
                    message: notification.message,
                    orderId: order._id
                });

                // Also notify admin
                req.io.emit('admin_notification', {
                    type: 'NEW_ORDER',
                    message: `New order received from ${req.user.username}`,
                    orderId: order._id
                });
            }

            res.status(201).json(order);
        } catch (error: any) {
            console.error('Order Creation Failed:', error);
            console.error('Request Body:', JSON.stringify(req.body, null, 2));
            res.status(400).json({ message: `Order Failed: ${error.message}` });
        }
    }

    async updateOrderStatus(req: IAuthRequest, res: Response) {
        const { status } = req.body;
        try {
            const order = await OrderService.getOrderById(req.params.id as string, req.user._id, req.user.role);
            if (order) {
                order.status = status;
                if (status === 'Delivered') {
                    order.isDelivered = true;
                    order.deliveredAt = new Date();
                }
                const updatedOrder = await order.save();

                // Save notification to DB
                const notification = new Notification({
                    user: order.user._id,
                    type: 'ORDER_STATUS_UPDATE',
                    message: `Your order #${order._id} is now ${status.toUpperCase()}`,
                    orderId: order._id
                });
                await notification.save();

                // Notify User
                if (req.io) {
                    req.io.to(order.user._id.toString()).emit('notification', {
                        id: notification._id,
                        type: 'ORDER_STATUS_UPDATE',
                        message: notification.message,
                        orderId: order._id
                    });
                }

                res.json(updatedOrder);
            } else {
                res.status(404).json({ message: "Order not found" });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getOrderById(req: IAuthRequest, res: Response) {
        try {
            const order = await OrderService.getOrderById(req.params.id as string, req.user._id as string, req.user.role);
            if (order) {
                res.json(order);
            } else {
                res.status(404).json({ message: "Order not found or not authorized" });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateOrderToPaid(req: Request, res: Response) {
        try {
            const order = await OrderService.updateOrderToPaid(req.params.id as string, req.body);
            if (order) {
                res.json(order);
            } else {
                res.status(404).json({ message: "Order not found" });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateOrderToDelivered(req: Request, res: Response) {
        try {
            const order = await OrderService.updateOrderToDelivered(req.params.id as string);
            if (order) {
                res.json(order);
            } else {
                res.status(404).json({ message: "Order not found" });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getMyOrders(req: IAuthRequest, res: Response) {
        try {
            const orders = await OrderService.getMyOrders(req.user._id as string);
            res.json(orders);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getOrders(req: Request, res: Response) {
        try {
            const orders = await OrderService.getAllOrders();
            res.json(orders);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new OrderController();
