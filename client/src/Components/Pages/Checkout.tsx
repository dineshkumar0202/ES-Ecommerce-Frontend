import { useState, useEffect } from 'react';
import { Box, Container, Typography, TextField, Button, Paper, Stack, Divider, CircularProgress, IconButton, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Navbar from '../WrapperComponents/Navbar';
import Footer from '../WrapperComponents/Footer';
import { CartService, OrderService, PaymentService } from '../../services/api';
import { toast } from 'react-toastify';

const Checkout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [cart, setCart] = useState<any>(null);
    const [paymentMethod, setPaymentMethod] = useState(location.state?.preferredPaymentMethod || 'COD');
    const [razorpayKey, setRazorpayKey] = useState('');

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

    const initPaymentConfig = async () => {
        try {
            const { data } = await PaymentService.getConfig();
            if (data.razorpayKey) setRazorpayKey(data.razorpayKey);
        } catch (error) {
            console.error("Payment config failed", error);
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

    const handlePlaceOrder = async (paymentId?: string) => {
        if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode) {
            toast.warning('Please fill in all shipping details');
            return;
        }

        setIsSubmitting(true);
        try {
            const orderData = {
                orderItems: cart.cartItems.map((item: any) => {
                    if (!item || !item.product) return null;
                    return {
                        title: item.product.title,
                        quantity: item.quantity,
                        image: item.product.images?.[0] || "https://via.placeholder.com/150",
                        price: Number(item.product?.price ?? item.product?.pricePerUnit ?? 0) || 0,
                        product: item.product._id
                    };
                }).filter(Boolean),
                shippingAddress,
                paymentMethod: paymentMethod,
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
            navigate(`/payment-success?orderId=${data._id}`);
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

    const loadRazorpaySDK = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleRazorpayPayment = async () => {
        if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode) {
            toast.warning('Please fill in all shipping details first');
            return;
        }

        setIsSubmitting(true);
        const res = await loadRazorpaySDK();
        if (!res) {
            toast.error('Razorpay SDK failed to load. Are you online?');
            setIsSubmitting(false);
            return;
        }

        try {
            const { data: order } = await PaymentService.createRazorpayOrder(cart.totalPrice * 1.18);

            if (order.isMock) {
                toast.info("Payment is in demo mode. Placing order.");
                await handlePlaceOrder('mock_' + order.id);
                return;
            }

            const options = {
                key: razorpayKey || "rzp_test_placeholder",
                amount: order.amount,
                currency: order.currency,
                name: "AtoZ Marketplace",
                description: "Transaction",
                order_id: order.id,
                handler: async function (response: any) {
                    handlePlaceOrder(response.razorpay_payment_id);
                },
                prefill: {
                    name: localStorage.getItem('userName') || "Guest User",
                    email: "user@example.com",
                    contact: "9999999999"
                },
                theme: {
                    color: "#0f172a"
                }
            };
            const rzp1 = new (window as any).Razorpay(options);
            rzp1.open();
        } catch (error) {
            console.error("Razorpay Error:", error);
            toast.error("Payment initiation failed");
        } finally {
            setIsSubmitting(false);
        }
    };

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

                                    <Paper variant="outlined" sx={{ p: 2, mb: 2, borderRadius: 3, border: paymentMethod === 'Razorpay' ? '2px solid black' : '1px solid #e2e8f0' }}>
                                        <FormControlLabel value="Razorpay" control={<Radio color="default" />} label={
                                            <Box>
                                                <Typography sx={{ fontWeight: 700 }}>Razorpay (UPI / Cards / NetBanking)</Typography>
                                                <Typography variant="caption" sx={{ color: '#64748b' }}>Instant and secure payment via Razorpay.</Typography>
                                            </Box>
                                        } sx={{ width: '100%', m: 0 }} />
                                        {paymentMethod === 'Razorpay' && (
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                disabled={isSubmitting}
                                                onClick={handleRazorpayPayment}
                                                sx={{ mt: 2, bgcolor: '#0f172a', color: 'white', fontWeight: 800, py: 1.5, borderRadius: 3, '&:hover': { bgcolor: '#1e293b' } }}
                                            >
                                                {isSubmitting ? 'Initializing...' : 'Pay with Razorpay'}
                                            </Button>
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
                                {cart.cartItems.map((item: any) => {
                                    if (!item || !item.product) return null;
                                    const price = Number(item.product?.price ?? item.product?.pricePerUnit ?? 0) || 0;
                                    const qty = Number(item.quantity) || 0;
                                    const lineTotal = price * qty;
                                    return (
                                        <Box key={item.product._id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{item.product.title} x {qty}</Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 700 }}>₹{lineTotal.toLocaleString()}</Typography>
                                        </Box>
                                    );
                                })}
                            </Stack>
                            <Divider sx={{ my: 3 }} />
                            <Stack spacing={2}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color="textSecondary">Subtotal</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 700 }}>₹{(Number(cart.totalPrice) || 0).toLocaleString()}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color="textSecondary">GST (18%)</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 700 }}>₹{((Number(cart.totalPrice) || 0) * 0.18).toLocaleString()}</Typography>
                                </Box>
                                <Divider />
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="h6" sx={{ fontWeight: 900 }}>Total</Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 900 }}>₹{((Number(cart.totalPrice) || 0) * 1.18).toLocaleString()}</Typography>
                                </Box>
                            </Stack>

                            {paymentMethod === 'COD' && (
                                <Button
                                    fullWidth variant="contained" size="large"
                                    disabled={isSubmitting}
                                    onClick={() => handlePlaceOrder()}
                                    sx={{ bgcolor: '#B4D5DC', color: 'black', borderRadius: 4, py: 2, mt: 4, fontWeight: 800, '&:hover': { bgcolor: '#9cc3cd' } }}
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
