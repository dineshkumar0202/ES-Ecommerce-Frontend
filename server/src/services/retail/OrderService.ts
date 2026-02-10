import Order from '../../models/retail/OrderModel';

class OrderService {
    async createOrder(userId: string, orderData: any) {
        // Validation
        if (!orderData.orderItems || orderData.orderItems.length === 0) {
            throw new Error('No order items found');
        }

        // Clean undefined fields
        const { paymentResult, ...rest } = orderData;

        const finalOrderData = {
            ...rest,
            user: userId,
            status: 'Ordered'
        };

        // Only add paymentResult if it exists and has basic fields
        if (paymentResult && paymentResult.id) {
            finalOrderData.paymentResult = paymentResult;
        }

        const order = new Order(finalOrderData);

        return await order.save();
    }

    async getOrderById(orderId: string, userId: string, role: string) {
        const order = await Order.findById(orderId).populate("user", "username email");
        if (order) {
            if (order.user._id.toString() !== userId && role !== 'Admin') {
                return null;
            }
            return order;
        }
        return null;
    }

    async updateOrderToPaid(orderId: string, paymentResult: any) {
        const order = await Order.findById(orderId);
        if (order) {
            order.isPaid = true;
            // @ts-ignore
            order.paidAt = Date.now();
            order.paymentResult = {
                id: paymentResult.id,
                status: paymentResult.status,
                update_time: paymentResult.update_time,
                email_address: paymentResult.email_address,
            };
            return await order.save();
        }
        return null;
    }

    async updateOrderToDelivered(orderId: string) {
        const order = await Order.findById(orderId);
        if (order) {
            order.isDelivered = true;
            // @ts-ignore
            order.deliveredAt = Date.now();
            return await order.save();
        }
        return null;
    }

    async getMyOrders(userId: string) {
        return await Order.find({ user: userId });
    }

    async getAllOrders() {
        return await Order.find({}).populate("user", "id username");
    }
}

export default new OrderService();
