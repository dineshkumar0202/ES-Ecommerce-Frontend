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

        // Check for Missing or Default Stripe Key -> Use Mock Mode
        let isMock = !stripe || !process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes('your_stripe_secret_key_here');

        if (isMock) {
            console.log('Stripe not configured (explicitly). Using Mock Payment Mode.');
            return res.status(200).json({
                id: 'mock_pi_' + Date.now(),
                clientSecret: 'mock_secret_' + Date.now(),
                isMock: true
            });
        }

        try {
            const paymentIntent = await stripe!.paymentIntents.create({
                amount: Math.round(amount * 100), // Stripe expects amount in paise (for INR) or cents
                currency: 'inr',
                automatic_payment_methods: {
                    enabled: true,
                },
            });

            res.status(200).json({
                id: paymentIntent.id,
                clientSecret: paymentIntent.client_secret,
                isMock: false
            });
        } catch (error: any) {
            console.error('Stripe Payment Intent Failed:', error.message);

            // Fallback to mock mode if Stripe fails (e.g., Auth Error, Invalid Key)
            if (error.type === 'StripeAuthenticationError' || error.statusCode === 401) {
                console.log('Stripe Authentication Failed. Falling back to Mock Payment Mode.');
                return res.status(200).json({
                    id: 'mock_pi_' + Date.now(),
                    clientSecret: 'mock_secret_' + Date.now(),
                    isMock: true
                });
            }

            res.status(500).json({ message: `Payment Service Error: ${error.message}` });
        }
    }

    async getStripeConfig(req: Request, res: Response) {
        res.status(200).json({
            publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
        });
    }
}

export default new PaymentController();
