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

        // More robust Mock Mode detection
        const secretKey = process.env.STRIPE_SECRET_KEY || '';
        const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY || '';

        const isMock = !stripe ||
            !secretKey.startsWith('sk_') ||
            !publishableKey.startsWith('pk_');

        if (isMock) {
            // console.log('Stripe not configured correctly. Using Mock Payment Mode.');
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
                // console.log('Stripe Authentication Failed. Falling back to Mock Payment Mode.');
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
        const pk = process.env.STRIPE_PUBLISHABLE_KEY || '';
        const isMock = !pk.startsWith('pk_');
        res.status(200).json({
            publishableKey: pk,
            isMock
        });
    }


    async createRazorpayOrder(req: Request, res: Response) {
        const Razorpay = require('razorpay');
        const { amount } = req.body;

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_YourKeyHere', // Default test key
            key_secret: process.env.RAZORPAY_KEY_SECRET || 'YourSecretHere',
        });

        const options = {
            amount: Math.round(amount * 100), // amount in the smallest currency unit (paise)
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        };

        try {
            const order = await razorpay.orders.create(options);
            res.json(order);
        } catch (error: any) {
            console.error("Razorpay Error:", error);
            res.status(500).json({ message: error.message });
        }
    }
}

export default new PaymentController();
