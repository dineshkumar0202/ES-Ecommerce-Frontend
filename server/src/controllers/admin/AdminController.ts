import { Request, Response } from 'express';
import User from '../../models/users/UserModel';
import Order from '../../models/retail/OrderModel';
import Product from '../../models/retail/ProductModel';
import WholesaleProduct from '../../models/Wholesale/WholesaleProductModel';
import QProduct from '../../models/q-commerce/QProductModel';
import ResaleProduct from '../../models/Resale/ResaleProductModel';
import Post from '../../models/freelance/PostModel';

class AdminController {
    async getDashboardStats(req: Request, res: Response) {
        try {
            const userCount = await User.countDocuments();
            const orderCount = await Order.countDocuments();

            // Total Selling Amount (sum of totalPrice from paid orders)
            const orders = await Order.find({ isPaid: true });
            const totalSales = orders.reduce((acc, order) => acc + (order.totalPrice || 0), 0);

            // Counts for all segments
            const retailCount = await Product.countDocuments();
            const wholesaleCount = await WholesaleProduct.countDocuments();
            const qCommerceCount = await QProduct.countDocuments();
            const resaleCount = await ResaleProduct.countDocuments();
            const freelanceCount = await Post.countDocuments();

            res.json({
                userCount,
                orderCount,
                totalSales,
                segments: {
                    retail: retailCount,
                    wholesale: wholesaleCount,
                    qCommerce: qCommerceCount,
                    resale: resaleCount,
                    freelance: freelanceCount
                }
            });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllActivities(req: Request, res: Response) {
        try {
            // Recent orders
            const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(10).populate('user', 'username');

            // Recent products added across categories
            const recentRetail = await Product.find().sort({ createdAt: -1 }).limit(5);
            const recentWholesale = await WholesaleProduct.find().sort({ createdAt: -1 }).limit(5);
            const recentResale = await ResaleProduct.find().sort({ createdAt: -1 }).limit(5);

            res.json({
                recentOrders,
                recentRetail,
                recentWholesale,
                recentResale
            });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getRevenueTrends(req: Request, res: Response) {
        try {
            const { period = '7d' } = req.query; // 7d, 30d, 90d, 1y

            let daysBack = 7;
            if (period === '30d') daysBack = 30;
            else if (period === '90d') daysBack = 90;
            else if (period === '1y') daysBack = 365;

            const startDate = new Date();
            startDate.setDate(startDate.getDate() - daysBack);

            // Get daily revenue
            const orders = await Order.find({
                isPaid: true,
                createdAt: { $gte: startDate }
            }).sort({ createdAt: 1 });

            // Group by date
            const revenueByDate: any = {};
            orders.forEach(order => {
                const date = order.createdAt.toISOString().split('T')[0];
                if (!revenueByDate[date]) {
                    revenueByDate[date] = { revenue: 0, orders: 0 };
                }
                revenueByDate[date].revenue += order.totalPrice || 0;
                revenueByDate[date].orders += 1;
            });

            // Convert to array format
            const trends = Object.keys(revenueByDate).map(date => ({
                date,
                revenue: revenueByDate[date].revenue,
                orders: revenueByDate[date].orders
            }));

            res.json({ trends, period });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getUserBehavior(req: Request, res: Response) {
        try {
            // New users in last 30 days
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

            const newUsers = await User.countDocuments({ createdAt: { $gte: thirtyDaysAgo } });
            const totalUsers = await User.countDocuments();

            // Active users (users who placed orders in last 30 days)
            const activeUserIds = await Order.distinct('user', { createdAt: { $gte: thirtyDaysAgo } });
            const activeUsers = activeUserIds.length;

            // User role distribution
            const usersByRole = await User.aggregate([
                { $group: { _id: '$role', count: { $sum: 1 } } }
            ]);

            // Average order value
            const paidOrders = await Order.find({ isPaid: true });
            const avgOrderValue = paidOrders.length > 0
                ? paidOrders.reduce((sum, order) => sum + (order.totalPrice || 0), 0) / paidOrders.length
                : 0;

            res.json({
                totalUsers,
                newUsers,
                activeUsers,
                usersByRole,
                avgOrderValue,
                retentionRate: totalUsers > 0 ? ((activeUsers / totalUsers) * 100).toFixed(2) : 0
            });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getTopProducts(req: Request, res: Response) {
        try {
            const { limit = 10 } = req.query;

            // Get top selling products from orders
            const orders = await Order.find({ isPaid: true });
            const productSales: any = {};

            orders.forEach(order => {
                order.orderItems.forEach((item: any) => {
                    const productId = item.product?.toString() || item._id?.toString();
                    if (!productSales[productId]) {
                        productSales[productId] = {
                            productId,
                            title: item.title || item.name,
                            totalQuantity: 0,
                            totalRevenue: 0
                        };
                    }
                    productSales[productId].totalQuantity += item.quantity || 0;
                    productSales[productId].totalRevenue += (item.price || 0) * (item.quantity || 0);
                });
            });

            const topProducts = Object.values(productSales)
                .sort((a: any, b: any) => b.totalRevenue - a.totalRevenue)
                .slice(0, Number(limit));

            res.json(topProducts);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getSalesByCategory(req: Request, res: Response) {
        try {
            const products = await Product.find();
            const orders = await Order.find({ isPaid: true });

            const categoryStats: any = {};

            orders.forEach(order => {
                order.orderItems.forEach((item: any) => {
                    const product = products.find(p => p._id.toString() === item.product?.toString());
                    if (product) {
                        const category = product.category || 'Uncategorized';
                        if (!categoryStats[category]) {
                            categoryStats[category] = { revenue: 0, count: 0 };
                        }
                        categoryStats[category].revenue += (item.price || 0) * (item.quantity || 0);
                        categoryStats[category].count += item.quantity || 0;
                    }
                });
            });

            const salesByCategory = Object.keys(categoryStats).map(category => ({
                category,
                revenue: categoryStats[category].revenue,
                count: categoryStats[category].count
            })).sort((a, b) => b.revenue - a.revenue);

            res.json(salesByCategory);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getPendingFreelancers(req: Request, res: Response) {
        try {
            const freelancers = await User.find({ 'freelancer.isRegistered': true, 'freelancer.status': 'Pending' });
            res.json(freelancers);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateFreelancerStatus(req: Request, res: Response) {
        try {
            const { status, rejectionReason } = req.body;
            const user = await User.findById(req.params.id);

            if (user && user.freelancer) {
                user.freelancer.status = status;
                if (status === 'Rejected') {
                    user.freelancer.rejectionReason = rejectionReason;
                }
                const updatedUser = await user.save();
                res.json(updatedUser);
            } else {
                res.status(404).json({ message: "User not found or not a freelancer" });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new AdminController();
