import { Router, Request, Response } from 'express';
import EmailService from '../services/EmailService';

const router = Router();

// Test email configuration
router.get('/test-email', async (req: Request, res: Response) => {
    try {
        const testEmail = req.query.email as string || 'dhinesh.dk093@gmail.com';
        const result = await EmailService.testEmailConfiguration(testEmail);

        if (result.success) {
            res.status(200).json({
                success: true,
                message: result.message,
            });
        } else {
            res.status(500).json({
                success: false,
                message: result.message,
            });
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Email test failed',
            error: error.message,
        });
    }
});

// Send welcome email (for testing)
router.post('/send-welcome', async (req: Request, res: Response) => {
    try {
        const { email, name } = req.body;

        if (!email || !name) {
            return res.status(400).json({
                success: false,
                message: 'Email and name are required',
            });
        }

        await EmailService.sendWelcomeEmail(email, name);

        res.status(200).json({
            success: true,
            message: `Welcome email sent to ${email}`,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Failed to send welcome email',
            error: error.message,
        });
    }
});

export default router;
