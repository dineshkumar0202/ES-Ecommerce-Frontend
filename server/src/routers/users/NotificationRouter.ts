import express from 'express';
import NotificationController from '../../controllers/users/NotificationController';
import { protect } from '../../middleware/authMiddleware';

const router = express.Router();

router.get('/', protect, NotificationController.getMyNotifications);
router.put('/:id/read', protect, NotificationController.markAsRead);
router.put('/read-all', protect, NotificationController.markAllAsRead);

export default router;
