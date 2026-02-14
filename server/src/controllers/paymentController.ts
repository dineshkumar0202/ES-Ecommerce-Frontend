import { Request, Response } from 'express';
import dotenv from 'dotenv';
import Razorpay from 'razorpay';

dotenv.config();

class PaymentController {
    /**
     * GET /api/payments/config
     * Returns public configuration for payment providers
     */
    async getPaymentConfig(req: Request, res: Response) {
        const rzpKey = process.env.RAZORPAY_KEY_ID || '';

        // Detection for mock mode (test/placeholder keys)
        const isMock = !rzpKey || rzpKey === 'rzp_test_placeholder';

        res.status(200).json({
            razorpayKey: rzpKey,
            isMock
        });
    }

    /**
     * POST /api/payments/create-razorpay-order
     * Creates a new Razorpay order
     */
    async createRazorpayOrder(req: Request, res: Response) {
        const { amount } = req.body;
        const keyId = process.env.RAZORPAY_KEY_ID || '';
        const keySecret = process.env.RAZORPAY_KEY_SECRET || '';

        // Detection for mock mode
        const isMock = !keyId || keyId === 'rzp_test_placeholder' || !keySecret || keySecret === 'rzp_secret_placeholder';

        if (isMock) {
            console.log('[Payment] Razorpay in MOCK mode (keys missing or placeholders)');
            return res.status(200).json({
                id: 'order_mock_' + Date.now(),
                amount: Math.round(Number(amount) * 100),
                currency: 'INR',
                receipt: `receipt_${Date.now()}`,
                isMock: true,
            });
        }

        try {
            const razorpay = new Razorpay({
                key_id: keyId,
                key_secret: keySecret
            });

            const options = {
                amount: Math.round(Number(amount) * 100), // Razorpay expects amount in paise
                currency: 'INR',
                receipt: `receipt_${Date.now()}`,
            };

            const order = await razorpay.orders.create(options);
            res.status(200).json({
                ...order,
                isMock: false
            });
        } catch (error: any) {
            console.error('[Payment] Razorpay Error:', error?.message || error);

            // Fallback to mock so checkout doesn't break during development
            return res.status(200).json({
                id: 'order_mock_' + Date.now(),
                amount: Math.round(Number(amount) * 100),
                currency: 'INR',
                receipt: `receipt_${Date.now()}`,
                isMock: true,
            });
        }
    }
}

export default new PaymentController();
