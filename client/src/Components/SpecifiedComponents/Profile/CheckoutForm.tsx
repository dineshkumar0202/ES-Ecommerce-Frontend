import { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Box, Typography, CircularProgress } from '@mui/material';

interface CheckoutFormProps {
    onSuccess: (paymentIntentId: string) => void;
    amount: number;
    hideButton?: boolean;
}

const CheckoutForm = ({ onSuccess, amount, hideButton }: CheckoutFormProps) => {
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
        <form id="stripe-payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" />
            <Box sx={{ mt: 3, display: hideButton ? 'none' : 'block' }}>
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

            {/* Development Helper for Test Cards */}
            <Box sx={{ mt: 2, p: 2, bgcolor: '#f0f9ff', borderRadius: 2, border: '1px dashed #0ea5e9' }}>
                <Typography variant="caption" sx={{ display: 'block', fontWeight: 700, color: '#0ea5e9', mb: 1 }}>
                    TEST MODE ACTIVE
                </Typography>
                <Typography variant="caption" sx={{ display: 'block', color: '#64748b' }}>
                    Use the following test card details:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1, p: 1, bgcolor: 'white', borderRadius: 1, border: '1px solid #e2e8f0' }}>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 600, color: '#0f172a' }}>
                        4242 4242 4242 4242
                    </Typography>
                    <Button
                        size="small"
                        sx={{ minWidth: 'auto', p: 0.5, fontSize: '0.7rem' }}
                        onClick={() => {
                            navigator.clipboard.writeText('4242424242424242');
                        }}
                    >
                        COPY
                    </Button>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                    <Typography variant="caption" sx={{ color: '#64748b' }}>Date: Any future (e.g. 12/34)</Typography>
                    <Typography variant="caption" sx={{ color: '#64748b' }}>CVC: Any 3 digits (e.g. 123)</Typography>
                </Box>
            </Box>
        </form>
    );
};

export default CheckoutForm;
