import express from 'express';
import AdminController from '../../controllers/admin/AdminController';
import { protect, admin } from '../../middleware/authMiddleware';

const router = express.Router();

router.get('/stats', protect, admin, AdminController.getDashboardStats);
router.get('/activities', protect, admin, AdminController.getAllActivities);
router.get('/analytics/revenue-trends', protect, admin, AdminController.getRevenueTrends);
router.get('/analytics/user-behavior', protect, admin, AdminController.getUserBehavior);
router.get('/analytics/top-products', protect, admin, AdminController.getTopProducts);
router.get('/analytics/sales-by-category', protect, admin, AdminController.getSalesByCategory);

router.get('/freelancers/pending', protect, admin, (req: any, res: any) => AdminController.getPendingFreelancers(req, res));
router.put('/freelancers/:id/status', protect, admin, (req: any, res: any) => AdminController.updateFreelancerStatus(req, res));

export default router;
