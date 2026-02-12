import Order from '../../models/retail/OrderModel';
import Payment from '../../models/PaymentModel';

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
            status: 'Placed'
        };

        // Only add paymentResult if it exists and has basic fields
        if (paymentResult && paymentResult.id) {
            finalOrderData.paymentResult = paymentResult;
        }

        const order = new Order(finalOrderData);

        return await order.save();
    }

    async getOrderById(orderId: string, userId: string, role: string) {
        const order = await Order.findById(orderId).populate("user", "username email mobile");
        if (order) {
            if (role === 'Admin') return order;
            if (order.user._id.toString() === userId) return order;

            if (role === 'Seller') {
                const productIds = order.orderItems.map(i => i.product);

                // Check Retail
                const Product = await import('../../models/retail/ProductModel').then(m => m.default);
                const retailOwned = await Product.exists({ _id: { $in: productIds }, seller: userId });
                if (retailOwned) return order;

                // Check Wholesale
                const WholesaleProduct = await import('../../models/Wholesale/WholesaleProductModel').then(m => m.default);
                const wholesaleOwned = await WholesaleProduct.exists({ _id: { $in: productIds }, seller: userId });
                if (wholesaleOwned) return order;
            }
            return null;
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

            // Create and save Payment record
            try {
                const payment = new Payment({
                    user: order.user,
                    order: order._id,
                    paymentMethod: 'PayPal', // Defaulting to PayPal as per typical paymentResult structure, could be dynamic
                    amount: order.totalPrice,
                    currency: 'USD', // Default, should ideally come from order
                    status: 'Completed',
                    transactionId: paymentResult.id || `TXN-${Date.now()}`,
                    metadata: paymentResult
                });
                await payment.save();
            } catch (error) {
                console.error("Failed to save Payment record:", error);
                // Continue execution, don't fail the order update
            }

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

    async getOrdersBySeller(sellerId: string) {
        // Find Retail products
        const Product = await import('../../models/retail/ProductModel').then(m => m.default);
        const retailProducts = await Product.find({ seller: sellerId }).select('_id');

        // Find Wholesale products
        const WholesaleProduct = await import('../../models/Wholesale/WholesaleProductModel').then(m => m.default);
        const wholesaleProducts = await WholesaleProduct.find({ seller: sellerId }).select('_id');

        const productIds = [
            ...retailProducts.map(p => p._id),
            ...wholesaleProducts.map(p => p._id)
        ];

        // Find orders containing these products
        return await Order.find({
            'orderItems.product': { $in: productIds }
        }).populate("user", "username email mobile").sort({ createdAt: -1 });
    }

    async getAllOrders() {
        return await Order.find({}).populate("user", "id username");
    }
}

export default new OrderService();
