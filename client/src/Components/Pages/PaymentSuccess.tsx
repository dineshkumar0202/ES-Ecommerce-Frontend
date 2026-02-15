import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Box, Container, Typography, Paper, Button, Divider, CircularProgress, Chip, Stack, TextField, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ShareIcon from '@mui/icons-material/Share';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { OrderService, ProductService } from '../../services/api';

const PaymentSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [recommendedProducts, setRecommendedProducts] = useState<any[]>([]);

    const orderId = new URLSearchParams(location.search).get('orderId');

    useEffect(() => {
        if (!orderId) {
            navigate('/');
            return;
        }

        const fetchData = async () => {
            try {
                const { data: orderData } = await OrderService.getOrderById(orderId);
                setOrder(orderData);

                // Fetch some products for recommendation
                const { data: productData } = await ProductService.getAll();
                setRecommendedProducts(productData.slice(0, 3));
            } catch (error) {
                console.error("Failed to fetch data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [orderId, navigate]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: 'white' }}>
                <CircularProgress sx={{ color: 'black' }} />
            </Box>
        );
    }

    return (
        <Box sx={{
            minHeight: '100vh',
            bgcolor: '#f8fafc', // Very light grey/white background
            pb: 10,
            pt: { xs: 4, md: 6 }
        }}>
            <Container maxWidth="lg">

                {/* Header Section */}
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Box sx={{
                        display: 'inline-flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mb: 2,
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        bgcolor: '#dbeafe', // Light blue
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}>
                        <CheckIcon sx={{ fontSize: 40, color: 'black', stroke: 'black', strokeWidth: 1 }} />
                    </Box>
                    <Typography variant="h3" sx={{ fontWeight: 900, color: '#0f172a', mb: 1, letterSpacing: -1 }}>
                        Order Confirmed!
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#64748b' }}>
                        Your payment was successful and your order is on its way.
                    </Typography>
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1.5fr 1fr' }, gap: 4 }}>

                    {/* LEFT COLUMN: Order Details */}
                    <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 6, bgcolor: 'white', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
                        {/* Order Number & Status */}
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 4,
                            pb: 4,
                            borderBottom: '1px dashed #e2e8f0'
                        }}>
                            <Box>
                                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, letterSpacing: 1, display: 'block', mb: 0.5, textTransform: 'uppercase' }}>
                                    Order Number
                                </Typography>
                                <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a' }}>
                                    #{order?._id.slice(-8).toUpperCase()}
                                </Typography>
                            </Box>
                            <Chip
                                label="PROCESSING"
                                size="small"
                                sx={{
                                    bgcolor: '#f1f5f9',
                                    color: '#475569',
                                    fontWeight: 700,
                                    borderRadius: 4,
                                    height: 32,
                                    px: 1
                                }}
                            />
                        </Box>

                        <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, color: '#0f172a' }}>Order Summary</Typography>

                        <Stack spacing={2} sx={{ mb: 4 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2" sx={{ color: '#64748b' }}>Subtotal</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#0f172a' }}>₹{(Number(order?.itemsPrice) || 0).toLocaleString('en-IN')}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2" sx={{ color: '#64748b' }}>Shipping</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#0f172a' }}>
                                    {order?.shippingPrice === 0 ? 'Free' : `₹${order?.shippingPrice}`}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2" sx={{ color: '#64748b' }}>Tax (GST 18%)</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#0f172a' }}>₹{(Number(order?.taxPrice) || 0).toLocaleString('en-IN')}</Typography>
                            </Box>
                        </Stack>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 3, borderTop: '1px solid #f1f5f9', mb: 6 }}>
                            <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a' }}>Total Amount</Typography>
                            <Typography variant="h5" sx={{ fontWeight: 900, color: '#0f172a' }}>₹{(Number(order?.totalPrice) || 0).toLocaleString('en-IN')}</Typography>
                        </Box>

                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 4, mb: 6 }}>
                            <Box>
                                <Typography variant="subtitle2" sx={{ color: '#94a3b8', fontWeight: 700, mb: 1.5, letterSpacing: 0.5, textTransform: 'uppercase' }}>
                                    Delivering To
                                </Typography>
                                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0f172a', mb: 0.5 }}>
                                    John Doe
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.6 }}>
                                    {order?.shippingAddress.address}<br />
                                    {order?.shippingAddress.postalCode} {order?.shippingAddress.city}<br />
                                    {order?.shippingAddress.country}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle2" sx={{ color: '#94a3b8', fontWeight: 700, mb: 1.5, letterSpacing: 0.5, textTransform: 'uppercase' }}>
                                    Payment Method
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, border: '1px solid #f1f5f9', borderRadius: 3 }}>
                                    <CreditCardIcon sx={{ color: '#0f172a' }} />
                                    <Box>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f172a' }}>Credit Card</Typography>
                                        <Typography variant="caption" sx={{ color: '#64748b' }}>Ending in **** 4242</Typography>
                                    </Box>
                                    <Chip label="PAID" size="small" sx={{ ml: 'auto', bgcolor: '#f1f5f9', color: '#0f172a', fontWeight: 800, fontSize: '0.65rem' }} />
                                </Box>
                            </Box>
                        </Box>

                        <Stack direction={{ xs: 'column-reverse', sm: 'row' }} spacing={2}>
                            <Button
                                component={Link}
                                to={`/profile?view=orders`}
                                variant="contained"
                                fullWidth
                                sx={{
                                    bgcolor: 'black',
                                    color: 'white',
                                    py: 2,
                                    borderRadius: 3,
                                    fontWeight: 700,
                                    textTransform: 'none',
                                    '&:hover': { bgcolor: '#333' }
                                }}
                            >
                                Track Your Order
                            </Button>
                            <Button
                                component={Link}
                                to="/"
                                variant="outlined"
                                fullWidth
                                sx={{
                                    borderColor: 'black',
                                    color: 'black',
                                    py: 2,
                                    borderRadius: 3,
                                    borderWidth: 2,
                                    fontWeight: 700,
                                    textTransform: 'none',
                                    '&:hover': { borderWidth: 2, bgcolor: '#f8fafc' }
                                }}
                            >
                                Continue Shopping
                            </Button>
                        </Stack>
                    </Paper>

                    {/* RIGHT COLUMN: Referrals & Trust */}
                    <Stack spacing={4}>
                        {/* Referral Card */}
                        <Paper elevation={0} sx={{ p: 4, borderRadius: 6, bgcolor: '#b4dcd6', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                            <Box sx={{ mb: 2, display: 'inline-flex', p: 1.5, bgcolor: 'rgba(255,255,255,0.2)', borderRadius: '50%' }}>
                                <LocalShippingOutlinedIcon sx={{ fontSize: 30, color: '#0f172a' }} />
                            </Box>
                            <Typography variant="h5" sx={{ fontWeight: 900, color: '#0f172a', mb: 1 }}>
                                REFER A FRIEND & GET 20% OFF
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#334155', mb: 4, lineHeight: 1.6 }}>
                                Give your friends 15% off their first order and get 20% off your next purchase.
                            </Typography>

                            <Box sx={{ bgcolor: 'rgba(255,255,255,0.4)', p: 1, borderRadius: 2, display: 'flex', alignItems: 'center', mb: 3 }}>
                                <Box sx={{ flex: 1, textAlign: 'left', pl: 1 }}>
                                    <Typography variant="caption" sx={{ display: 'block', color: '#475569', fontSize: '0.7rem', fontWeight: 700, letterSpacing: 0.5 }}>YOUR UNIQUE LINK</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#0f172a' }}>hub.com/refer/alex-827</Typography>
                                </Box>
                                <Button size="small" sx={{ bgcolor: 'black', color: 'white', borderRadius: 1.5, minWidth: 'auto', px: 2, py: 0.5, fontWeight: 700, '&:hover': { bgcolor: '#333' } }}>
                                    COPY
                                </Button>
                            </Box>

                            <Stack direction="row" spacing={2}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{ bgcolor: 'black', borderRadius: 2, py: 1.5, '&:hover': { bgcolor: '#333' } }}
                                >
                                    <ShareIcon />
                                </Button>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{ bgcolor: 'white', color: 'black', borderRadius: 2, py: 1.5, fontWeight: 700, textTransform: 'none', '&:hover': { bgcolor: '#f8fafc' } }}
                                >
                                    Invite Now
                                </Button>
                            </Stack>
                        </Paper>

                        {/* Satisfaction Guarantee */}
                        <Paper elevation={0} sx={{ p: 3, borderRadius: 4, bgcolor: 'white', display: 'flex', alignItems: 'flex-start', gap: 2, boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
                            <VerifiedUserOutlinedIcon sx={{ color: '#94a3b8' }} />
                            <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0f172a', mb: 0.5 }}>
                                    Satisfaction Guarantee
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.5, mb: 1 }}>
                                    If you're not 100% satisfied with your order, we'll make it right. No questions asked.
                                </Typography>
                                <Typography variant="body2" component={Link} to="#" sx={{ color: '#0f172a', fontWeight: 600, textDecoration: 'underline' }}>
                                    Learn more about our policy
                                </Typography>
                            </Box>
                        </Paper>
                    </Stack>
                </Box>

                {/* Recommended Section */}
                <Box sx={{ mt: 8 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                        <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a' }}>Recommended for You</Typography>
                        <Stack direction="row" spacing={1}>
                            <IconButton size="small" sx={{ border: '1px solid #e2e8f0' }}><ArrowBackIosNewIcon fontSize="small" /></IconButton>
                            <IconButton size="small" sx={{ border: '1px solid #e2e8f0' }}><ArrowForwardIosIcon fontSize="small" /></IconButton>
                        </Stack>
                    </Box>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
                        {recommendedProducts.map((product) => (
                            <Paper key={product._id} elevation={0} sx={{ p: 0, borderRadius: 4, overflow: 'hidden', bgcolor: 'transparent' }}>
                                <Box sx={{ position: 'relative', aspectRatio: '1/1', bgcolor: '#f1f5f9', borderRadius: 4, mb: 2, overflow: 'hidden' }}>
                                    <img
                                        src={product.images?.[0] || 'https://via.placeholder.com/300'}
                                        alt={product.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    <Chip
                                        label={`₹${product.price}`}
                                        sx={{
                                            position: 'absolute',
                                            top: 16,
                                            right: 16,
                                            bgcolor: 'rgba(255,255,255,0.9)',
                                            backdropFilter: 'blur(4px)',
                                            fontWeight: 800,
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                        }}
                                    />
                                </Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0f172a' }}>{product.title}</Typography>
                                <Typography variant="caption" sx={{ color: '#64748b' }}>{product.category || 'Accessories'}</Typography>
                            </Paper>
                        ))}
                    </Box>
                </Box>

            </Container>
        </Box>
    );
};

export default PaymentSuccess;
