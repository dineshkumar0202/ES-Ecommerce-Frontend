import { Request, Response } from 'express';
import dotenv from 'dotenv';
import Stripe from 'stripe';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
    apiVersion: '2023-10-16',
} as any);

class PaymentController {
    /**
     * GET /api/payments/config
     * Returns public configuration for payment providers
     */
    async getPaymentConfig(req: Request, res: Response) {
        res.status(200).json({
            stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY || ''
        });
    }

    /**
     * POST /api/payments/create-payment-intent
     * Creates a new Stripe Payment Intent
     */
    async createPaymentIntent(req: Request, res: Response) {
        const { amount } = req.body;

        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: Math.round(Number(amount) * 100), // Amount in paise/cents
                currency: 'inr',
                automatic_payment_methods: {
                    enabled: true,
                },
            });

            res.status(200).json({
                clientSecret: paymentIntent.client_secret,
            });
        } catch (error: any) {
            console.error('[Payment] Stripe Error:', error.message);
            res.status(400).json({
                error: {
                    message: error.message,
                },
            });
        }
    }
}

export default new PaymentController();

