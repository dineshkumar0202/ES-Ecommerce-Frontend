import { Request, Response } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2023-10-16' as any,
    })
    : null;

class PaymentController {
    async createPaymentIntent(req: Request, res: Response) {
        const { amount } = req.body;

        if (!stripe) {
            return res.status(500).json({ message: 'Stripe is not configured. Please add STRIPE_SECRET_KEY to .env file.' });
        }

        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: Math.round(amount * 100), // Stripe expects amount in paise (for INR) or cents
                currency: 'inr',
                automatic_payment_methods: {
                    enabled: true,
                },
            });

            res.status(200).json({
                clientSecret: paymentIntent.client_secret,
            });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getStripeConfig(req: Request, res: Response) {
        res.status(200).json({
            publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
        });
    }
}

export default new PaymentController();
