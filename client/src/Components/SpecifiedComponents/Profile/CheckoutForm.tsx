import { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Box, Typography, CircularProgress } from '@mui/material';

interface CheckoutFormProps {
    onSuccess: (paymentIntentId: string) => void;
    amount: number;
}

const CheckoutForm = ({ onSuccess, amount }: CheckoutFormProps) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Return URL is required for some payment methods
                return_url: window.location.origin + '/profile',
            },
            redirect: 'if_required',
        });

        if (error) {
            setMessage(error.message || "An unexpected error occurred.");
            setIsLoading(false);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            onSuccess(paymentIntent.id);
        } else {
            setMessage("Payment processing...");
            setIsLoading(false);
        }
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" />
            <Box sx={{ mt: 3 }}>
                <Button
                    fullWidth
                    variant="contained"
                    disabled={isLoading || !stripe || !elements}
                    type="submit"
                    sx={{
                        bgcolor: 'black',
                        color: 'white',
                        py: 1.5,
                        fontWeight: 800,
                        '&:hover': { bgcolor: '#333' }
                    }}
                >
                    {isLoading ? <CircularProgress size={24} color="inherit" /> : `Pay ₹${amount.toLocaleString()}`}
                </Button>
            </Box>
            {message && (
                <Typography color="error" variant="caption" sx={{ mt: 2, display: 'block', textAlign: 'center' }}>
                    {message}
                </Typography>
            )}
        </form>
    );
};

export default CheckoutForm;
