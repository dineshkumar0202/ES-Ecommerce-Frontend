import { useState, useEffect } from 'react';
import { Box, Container, Typography, TextField, Button, Paper, Stack, Divider, CircularProgress, IconButton, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';

import Navbar from '../WrapperComponents/Navbar';
import Footer from '../WrapperComponents/Footer';
import { CartService, OrderService, PaymentService } from '../../services/api';
import { toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../SpecifiedComponents/Profile/CheckoutForm';

const Checkout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [cart, setCart] = useState<any>(null);
    const [paymentMethod, setPaymentMethod] = useState(location.state?.preferredPaymentMethod || 'COD');
    const channel = location.state?.channel || 'retail';
    const [stripePromise, setStripePromise] = useState<any>(null);
    const [clientSecret, setClientSecret] = useState("");

    // Form state
    const [shippingAddress, setShippingAddress] = useState({
        address: '',
        city: '',
        postalCode: '',
        country: 'India'
    });

    useEffect(() => {
        fetchCart();
        initPaymentConfig();
    }, []);

    useEffect(() => {
        if (paymentMethod === 'Stripe' && cart && cart.totalPrice > 0) {
            createPaymentIntent();
        }
    }, [paymentMethod, cart]);

    const initPaymentConfig = async () => {
        try {
            const { data } = await PaymentService.getConfig();
            if (data.stripePublishableKey) {
                setStripePromise(loadStripe(data.stripePublishableKey));
            }
        } catch (error) {
            console.error("Payment config failed", error);
        }
    };

    const createPaymentIntent = async () => {
        try {
            const totalAmount = (Number(cart.totalPrice) || 0) * 1.18;
            const { data } = await PaymentService.createPaymentIntent(totalAmount);
            setClientSecret(data.clientSecret);
        } catch (error) {
            console.error("Failed to create payment intent", error);
            toast.error("Failed to initialize payment.");
        }
    };

    const fetchCart = async () => {
        try {
            const { data } = await CartService.getCart();
            if (!data.cartItems || data.cartItems.length === 0) {
                navigate('/retail');
                toast.info('Your cart is empty!');
                return;
            }
            setCart(data);
        } catch (error) {
            console.error("Error fetching cart:", error);
            navigate('/login');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
    };

    const handleConfirmPay = () => {
        if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode) {
            toast.warning('Please fill in all shipping details first');
            return;
        }

        if (paymentMethod === 'COD') {
            handlePlaceOrder();
        } else if (paymentMethod === 'Stripe') {
            // Trigger the hidden submit button in the CheckoutForm
            const form = document.getElementById('stripe-payment-form') as HTMLFormElement;
            if (form) {
                form.requestSubmit();
            } else {
                toast.error("Payment form not ready. Please wait.");
            }
        }
    };

    const handlePlaceOrder = async (paymentId?: string) => {
        setIsSubmitting(true);
        try {
            const orderData = {
                orderItems: cart.cartItems.map((item: any) => {
                    if (!item || !item.product) return null;
                    return {
                        title: item.product.title,
                        quantity: item.quantity,
                        image: item.product.images?.[0] || item.product.image || "https://via.placeholder.com/150",
                        price: Number(item.product?.price ?? item.product?.pricePerUnit ?? 0) || 0,
                        product: item.product._id
                    };
                }).filter(Boolean),
                shippingAddress,
                paymentMethod: paymentId ? 'Stripe' : paymentMethod,
                paymentResult: paymentId ? { id: paymentId, status: 'succeeded' } : undefined,
                itemsPrice: cart.totalPrice,
                shippingPrice: 0,
                taxPrice: cart.totalPrice * 0.18,
                totalPrice: cart.totalPrice * 1.18,
                isPaid: !!paymentId,
                paidAt: paymentId ? new Date() : undefined
            };

            const { data } = await OrderService.create(orderData);
            toast.success('Order placed successfully!');
            navigate(`/payment-success?orderId=${data._id}&channel=${channel}`);
        } catch (error) {
            console.error("Error placing order:", error);
            toast.error('Failed to place order.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress color="inherit" />
            </Box>
        );
    }

    const totalAmount = ((Number(cart.totalPrice) || 0) * 1.18);

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
            <Navbar />

            <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 1 }}>
                    <IconButton onClick={() => navigate(-1)} size="small" sx={{ bgcolor: 'white', '&:hover': { bgcolor: '#f1f5f9' }, p: 1 }}>
                        <ArrowBackIcon fontSize="small" />
                    </IconButton>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a' }}>
                        Checkout
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4, alignItems: 'flex-start' }}>

                    {/* Left Column: Shipping & Payment */}
                    <Box sx={{ flex: 1, width: '100%' }}>

                        {/* Shipping Address Card */}
                        <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 4, bgcolor: 'white', border: '1px solid #f1f5f9', mb: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                                <LocalShippingOutlinedIcon sx={{ color: '#94a3b8' }} />
                                <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', fontSize: '1.1rem' }}>Shipping Address</Typography>
                            </Box>

                            <Stack spacing={2.5}>
                                <TextField
                                    fullWidth
                                    label="Full Address"
                                    name="address"
                                    value={shippingAddress.address}
                                    onChange={handleInputChange}
                                    placeholder="Pallipalayam, Namakkal, Tamilnadu, India"
                                    variant="outlined"
                                    InputProps={{ sx: { borderRadius: 3, bgcolor: '#f8fafc' } }}
                                    sx={{ '& fieldset': { borderColor: '#e2e8f0' } }}
                                />
                                <TextField
                                    fullWidth
                                    label="City"
                                    name="city"
                                    value={shippingAddress.city}
                                    onChange={handleInputChange}
                                    placeholder="Namakkal"
                                    variant="outlined"
                                    InputProps={{ sx: { borderRadius: 3, bgcolor: '#f8fafc' } }}
                                    sx={{ '& fieldset': { borderColor: '#e2e8f0' } }}
                                />
                                <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                                    <TextField
                                        fullWidth
                                        label="Postal Code"
                                        name="postalCode"
                                        value={shippingAddress.postalCode}
                                        onChange={handleInputChange}
                                        placeholder="638008"
                                        variant="outlined"
                                        InputProps={{ sx: { borderRadius: 3, bgcolor: '#f8fafc' } }}
                                        sx={{ '& fieldset': { borderColor: '#e2e8f0' } }}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Country"
                                        name="country"
                                        value={shippingAddress.country}
                                        disabled
                                        variant="outlined"
                                        InputProps={{ sx: { borderRadius: 3, bgcolor: '#f8fafc' } }}
                                        sx={{ '& fieldset': { borderColor: '#e2e8f0' } }}
                                    />
                                </Box>
                            </Stack>
                        </Paper>

                        {/* Payment Method Card */}
                        <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 4, bgcolor: 'white', border: '1px solid #f1f5f9' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                                <PaymentOutlinedIcon sx={{ color: '#94a3b8' }} />
                                <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', fontSize: '1.1rem' }}>Select Payment Method</Typography>
                            </Box>

                            <FormControl component="fieldset" fullWidth>
                                <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>

                                    {/* COD Option */}
                                    <Paper
                                        elevation={0}
                                        variant="outlined"
                                        sx={{
                                            p: 2.5, mb: 2, borderRadius: 3,
                                            border: paymentMethod === 'COD' ? '2px solid #0f172a' : '1px solid #e2e8f0',
                                            transition: 'all 0.2s ease',
                                            cursor: 'pointer',
                                            bgcolor: 'white'
                                        }}
                                        onClick={() => setPaymentMethod('COD')}
                                    >
                                        <FormControlLabel
                                            value="COD"
                                            control={<Radio sx={{ color: '#cbd5e1', '&.Mui-checked': { color: '#0f172a' } }} />}
                                            label={
                                                <Box sx={{ ml: 1 }}>
                                                    <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>Cash on Delivery (COD)</Typography>
                                                    <Typography variant="caption" sx={{ color: '#64748b', display: 'block', mt: 0.5 }}>Pay when your order reaches your doorstep.</Typography>
                                                </Box>
                                            }
                                            sx={{ width: '100%', m: 0, alignItems: 'flex-start' }}
                                        />
                                    </Paper>

                                    {/* Stripe Option */}
                                    <Paper
                                        elevation={0}
                                        variant="outlined"
                                        sx={{
                                            p: 2.5, mb: 2, borderRadius: 3,
                                            border: paymentMethod === 'Stripe' ? '2px solid #0f172a' : '1px solid #e2e8f0',
                                            transition: 'all 0.2s ease',
                                            cursor: 'pointer',
                                            bgcolor: 'white'
                                        }}
                                        onClick={() => setPaymentMethod('Stripe')}
                                    >
                                        <FormControlLabel
                                            value="Stripe"
                                            control={<Radio sx={{ color: '#cbd5e1', '&.Mui-checked': { color: '#0f172a' } }} />}
                                            label={
                                                <Box sx={{ ml: 1 }}>
                                                    <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>Credit / Debit Card (Stripe)</Typography>
                                                    <Typography variant="caption" sx={{ color: '#64748b', display: 'block', mt: 0.5 }}>Secure payment via Stripe.</Typography>
                                                </Box>
                                            }
                                            sx={{ width: '100%', m: 0, alignItems: 'flex-start', mb: paymentMethod === 'Stripe' && clientSecret ? 2 : 0 }}
                                        />

                                        {/* Stripe Elements Container */}
                                        {paymentMethod === 'Stripe' && (
                                            <Box sx={{ pl: { sm: 6 }, pr: 1, pb: 1 }}>
                                                {clientSecret && stripePromise ? (
                                                    <Box sx={{
                                                        bgcolor: '#f8fafc',
                                                        p: 3,
                                                        borderRadius: 3,
                                                        border: '1px dashed #cbd5e1'
                                                    }}>
                                                        <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe', variables: { colorPrimary: '#0f172a' } } }}>
                                                            {/* hideButton=true means we control submit externally */}
                                                            <CheckoutForm onSuccess={(id) => handlePlaceOrder(id)} amount={totalAmount} hideButton={true} />
                                                        </Elements>
                                                    </Box>
                                                ) : (
                                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4, bgcolor: '#f8fafc', borderRadius: 3 }}>
                                                        <CircularProgress size={24} sx={{ color: '#94a3b8', mb: 2 }} />
                                                        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600, letterSpacing: 1 }}>
                                                            SECURE PAYMENT GATEWAY LOADING...
                                                        </Typography>
                                                    </Box>
                                                )}
                                            </Box>
                                        )}
                                    </Paper>
                                </RadioGroup>
                            </FormControl>
                        </Paper>
                    </Box>

                    {/* Right Column: Order Summary */}
                    <Box sx={{ width: { xs: '100%', lg: 400 }, minWidth: { lg: 350 } }}>
                        <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 4, bgcolor: 'white', border: '1px solid #f1f5f9', position: 'sticky', top: 100 }}>
                            <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, color: '#0f172a', fontSize: '1.1rem' }}>Your Order</Typography>

                            <Stack spacing={3} sx={{ mb: 4 }}>
                                {cart.cartItems.map((item: any) => {
                                    if (!item || !item.product) return null;
                                    const price = Number(item.product?.price ?? item.product?.pricePerUnit ?? 0) || 0;
                                    const qty = Number(item.quantity) || 0;
                                    const lineTotal = price * qty;
                                    const img = item.product.images?.[0] || item.product.image || "https://placehold.co/100";

                                    return (
                                        <Box key={item.product._id} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                                            <Box
                                                component="img"
                                                src={img}
                                                alt={item.product.title}
                                                sx={{ width: 48, height: 48, borderRadius: 2, objectFit: 'cover', bgcolor: '#f1f5f9' }}
                                            />
                                            <Box sx={{ flex: 1 }}>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.3, mb: 0.5, color: '#1e293b' }}>
                                                    {item.product.title}
                                                </Typography>
                                                <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 500 }}>
                                                    Quantity: {qty}
                                                </Typography>
                                            </Box>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0f172a' }}>
                                                ₹{lineTotal.toLocaleString()}
                                            </Typography>
                                        </Box>
                                    );
                                })}
                            </Stack>

                            <Divider sx={{ my: 3, borderColor: '#f1f5f9' }} />

                            <Stack spacing={1.5} sx={{ mb: 4 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>Subtotal</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#1e293b' }}>₹{(Number(cart.totalPrice) || 0).toLocaleString()}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>GST (18%)</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#1e293b' }}>₹{((Number(cart.totalPrice) || 0) * 0.18).toLocaleString()}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>Shipping</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 800, color: '#10b981' }}>FREE</Typography>
                                </Box>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 2, mt: 1, borderTop: '1px dashed #e2e8f0' }}>
                                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', fontSize: '1.1rem' }}>Total</Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', fontSize: '1.25rem' }}>₹{totalAmount.toLocaleString()}</Typography>
                                </Box>
                            </Stack>

                            <Button
                                fullWidth
                                variant="contained"
                                size="large"
                                disabled={isSubmitting}
                                onClick={handleConfirmPay}
                                sx={{
                                    bgcolor: '#B4D5DC',
                                    color: '#0f172a',
                                    borderRadius: 3,
                                    py: 1.8,
                                    fontWeight: 800,
                                    textTransform: 'none',
                                    fontSize: '0.9rem',
                                    boxShadow: '0 4px 6px -1px rgba(180, 213, 220, 0.4)',
                                    '&:hover': { bgcolor: '#9cc3cd', boxShadow: '0 10px 15px -3px rgba(180, 213, 220, 0.5)' }
                                }}
                            >
                                {isSubmitting ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    'CONFIRM & PAY'
                                )}
                            </Button>

                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mt: 2 }}>
                                <HttpsOutlinedIcon sx={{ fontSize: 14, color: '#94a3b8' }} />
                                <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.7rem', fontWeight: 500 }}>
                                    Secure encrypted checkout
                                </Typography>
                            </Box>
                        </Paper>
                    </Box>

                </Box>
            </Container>
            <Footer />
        </Box>
    );
};

export default Checkout;
