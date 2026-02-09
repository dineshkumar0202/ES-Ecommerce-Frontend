import { useState, useEffect } from 'react';
import { Box, Container, Typography, TextField, Button, Paper, Stack, Divider, CircularProgress, IconButton, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Navbar from '../WrapperComponents/Navbar';
import Footer from '../WrapperComponents/Footer';
import { CartService, OrderService, PaymentService } from '../../services/api';
import CheckoutForm from '../SpecifiedComponents/Profile/CheckoutForm';

const Checkout = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [cart, setCart] = useState<any>(null);
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [stripePromise, setStripePromise] = useState<any>(null);
    const [clientSecret, setClientSecret] = useState('');

    // Form state
    const [shippingAddress, setShippingAddress] = useState({
        address: '',
        city: '',
        postalCode: '',
        country: 'India'
    });

    useEffect(() => {
        fetchCart();
        initStripe();
    }, []);

    const initStripe = async () => {
        try {
            const { data } = await PaymentService.getConfig();
            if (data.publishableKey) {
                setStripePromise(loadStripe(data.publishableKey));
            }
        } catch (error) {
            console.error("Stripe config failed", error);
        }
    };

    const fetchCart = async () => {
        try {
            const { data } = await CartService.getCart();
            if (!data.cartItems || data.cartItems.length === 0) {
                navigate('/retail');
                alert('Your cart is empty!');
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

    useEffect(() => {
        if (paymentMethod === 'Stripe' && cart) {
            createIntent();
        }
    }, [paymentMethod, cart]);

    const createIntent = async () => {
        try {
            const { data } = await PaymentService.createPaymentIntent(cart.totalPrice * 1.18);
            setClientSecret(data.clientSecret);
        } catch (error) {
            console.error("Failed to create intent", error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = async (stripePaymentId?: string) => {
        if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode) {
            alert('Please fill in all shipping details');
            return;
        }

        setIsSubmitting(true);
        try {
            const orderData = {
                orderItems: cart.cartItems.map((item: any) => ({
                    name: item.product.title,
                    quantity: item.quantity,
                    image: item.product.images[0],
                    price: item.product.price,
                    product: item.product._id
                })),
                shippingAddress,
                paymentMethod: paymentMethod,
                paymentResult: stripePaymentId ? { id: stripePaymentId, status: 'succeeded' } : undefined,
                itemsPrice: cart.totalPrice,
                shippingPrice: 0,
                taxPrice: cart.totalPrice * 0.18,
                totalPrice: cart.totalPrice * 1.18,
                isPaid: !!stripePaymentId,
                paidAt: stripePaymentId ? new Date() : undefined
            };

            const { data } = await OrderService.create(orderData);
            alert('Order placed successfully!');
            navigate(`/payment-success?orderId=${data._id}`);
        } catch (error) {
            console.error("Error placing order:", error);
            alert('Failed to place order.');
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

    const appearance = { theme: 'stripe' as const };
    const options = { clientSecret, appearance };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
            <Navbar />

            <Container maxWidth="lg" sx={{ py: 6 }}>
                <IconButton onClick={() => navigate(-1)} sx={{ mb: 2, bgcolor: 'white', '&:hover': { bgcolor: '#f1f5f9' } }}>
                    <ArrowBackIcon />
                </IconButton>

                <Typography variant="h3" sx={{ fontWeight: 900, mb: 5, color: '#0f172a' }}>
                    Checkout
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>

                    {/* Left: Shipping & Payment */}
                    <Box sx={{ flex: 1 }}>
                        <Paper elevation={0} sx={{ p: 4, borderRadius: 6, border: '1px solid #e2e8f0', mb: 4 }}>
                            <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Shipping Address</Typography>
                            <Stack spacing={3}>
                                <TextField fullWidth label="Full Address" name="address" value={shippingAddress.address} onChange={handleInputChange} variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
                                <TextField fullWidth label="City" name="city" value={shippingAddress.city} onChange={handleInputChange} variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <TextField fullWidth label="Postal Code" name="postalCode" value={shippingAddress.postalCode} onChange={handleInputChange} variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
                                    <TextField fullWidth label="Country" name="country" value={shippingAddress.country} disabled variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
                                </Box>
                            </Stack>
                        </Paper>

                        <Paper elevation={0} sx={{ p: 4, borderRadius: 6, border: '1px solid #e2e8f0' }}>
                            <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Select Payment Method</Typography>
                            <FormControl component="fieldset" fullWidth>
                                <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                                    <Paper variant="outlined" sx={{ p: 2, mb: 2, borderRadius: 3, border: paymentMethod === 'COD' ? '2px solid black' : '1px solid #e2e8f0' }}>
                                        <FormControlLabel value="COD" control={<Radio color="default" />} label={
                                            <Box>
                                                <Typography sx={{ fontWeight: 700 }}>Cash on Delivery (COD)</Typography>
                                                <Typography variant="caption" sx={{ color: '#64748b' }}>Pay when your order reaches your doorstep.</Typography>
                                            </Box>
                                        } sx={{ width: '100%', m: 0 }} />
                                    </Paper>
                                    <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, border: paymentMethod === 'Stripe' ? '2px solid black' : '1px solid #e2e8f0' }}>
                                        <FormControlLabel value="Stripe" control={<Radio color="default" />} label={
                                            <Box>
                                                <Typography sx={{ fontWeight: 700 }}>Online Payment (Stripe)</Typography>
                                                <Typography variant="caption" sx={{ color: '#64748b' }}>Secure payment via Credit/Debit Cards or UPI.</Typography>
                                            </Box>
                                        } sx={{ width: '100%', m: 0 }} />

                                        {paymentMethod === 'Stripe' && clientSecret && stripePromise && (
                                            <Box sx={{ mt: 3, p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
                                                <Elements options={options} stripe={stripePromise}>
                                                    <CheckoutForm amount={cart.totalPrice * 1.18} onSuccess={handlePlaceOrder} />
                                                </Elements>
                                            </Box>
                                        )}
                                    </Paper>
                                </RadioGroup>
                            </FormControl>
                        </Paper>
                    </Box>

                    {/* Right: Order Summary */}
                    <Box sx={{ width: { xs: '100%', md: 400 } }}>
                        <Paper elevation={0} sx={{ p: 4, borderRadius: 6, border: '1px solid #e2e8f0', bgcolor: 'white', position: 'sticky', top: 120 }}>
                            <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Order Summary</Typography>
                            <Stack spacing={2} sx={{ mb: 3 }}>
                                {cart.cartItems.map((item: any) => (
                                    <Box key={item.product._id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{item.product.title} x {item.quantity}</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 700 }}>₹{(item.price * item.quantity).toLocaleString()}</Typography>
                                    </Box>
                                ))}
                            </Stack>
                            <Divider sx={{ my: 3 }} />
                            <Stack spacing={2}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color="textSecondary">Subtotal</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 700 }}>₹{cart.totalPrice.toLocaleString()}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color="textSecondary">GST (18%)</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 700 }}>₹{(cart.totalPrice * 0.18).toLocaleString()}</Typography>
                                </Box>
                                <Divider />
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="h6" sx={{ fontWeight: 900 }}>Total</Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 900 }}>₹{(cart.totalPrice * 1.18).toLocaleString()}</Typography>
                                </Box>
                            </Stack>

                            {paymentMethod === 'COD' && (
                                <Button
                                    fullWidth variant="contained" size="large"
                                    disabled={isSubmitting}
                                    onClick={() => handlePlaceOrder()}
                                    sx={{ bgcolor: 'black', color: 'white', borderRadius: 4, py: 2, mt: 4, fontWeight: 800 }}
                                >
                                    {isSubmitting ? 'Processing...' : 'Place Order (COD)'}
                                </Button>
                            )}
                        </Paper>
                    </Box>
                </Box>
            </Container>
            <Footer />
        </Box>
    );
};

export default Checkout;
