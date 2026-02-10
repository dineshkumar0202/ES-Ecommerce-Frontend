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
router.get('/freelancers/verified', protect, admin, (req: any, res: any) => AdminController.getVerifiedFreelancers(req, res));
router.get('/freelancers/all', protect, admin, (req: any, res: any) => AdminController.getAllFreelancers(req, res));
router.put('/freelancers/:id/status', protect, admin, (req: any, res: any) => AdminController.updateFreelancerStatus(req, res));

router.get('/freelance/interests', protect, admin, (req: any, res: any) => AdminController.getFreelanceInterests(req, res));
router.put('/freelance/interests/:id/status', protect, admin, (req: any, res: any) => AdminController.updateInterestStatus(req, res));

export default router;
