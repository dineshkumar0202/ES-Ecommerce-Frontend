import { Request, Response } from 'express';
import OrderService from '../../services/retail/OrderService';

interface IAuthRequest extends Request {
    user?: any;
}

class OrderController {
    async addOrderItems(req: IAuthRequest, res: Response) {
        try {
            const order = await OrderService.createOrder(req.user._id as string, req.body);
            res.status(201).json(order);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
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
