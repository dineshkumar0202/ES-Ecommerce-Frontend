import express from 'express';
import PaymentController from '../controllers/paymentController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/config', protect, PaymentController.getPaymentConfig);
router.post('/create-payment-intent', protect, PaymentController.createPaymentIntent);

export default router;
