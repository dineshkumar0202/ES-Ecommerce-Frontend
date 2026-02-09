import { Request, Response } from 'express';
import Notification from '../../models/NotificationModel';

interface IAuthRequest extends Request {
    user?: any;
}

class NotificationController {
    async getMyNotifications(req: IAuthRequest, res: Response) {
        try {
            const notifications = await Notification.find({ user: req.user._id })
                .sort({ createdAt: -1 })
                .limit(20);
            res.json(notifications);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async markAsRead(req: IAuthRequest, res: Response) {
        try {
            const notification = await Notification.findById(req.params.id);
            if (notification) {
                notification.isRead = true;
                await notification.save();
                res.json({ message: 'Notification marked as read' });
            } else {
                res.status(404).json({ message: 'Notification not found' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async markAllAsRead(req: IAuthRequest, res: Response) {
        try {
            await Notification.updateMany({ user: req.user._id }, { isRead: true });
            res.json({ message: 'All notifications marked as read' });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new NotificationController();
