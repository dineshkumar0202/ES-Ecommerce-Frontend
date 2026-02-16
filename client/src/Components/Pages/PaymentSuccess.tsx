import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
    Box, Container, Typography, Paper, Button, CircularProgress, Chip, Stack, IconButton
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ShareIcon from '@mui/icons-material/Share';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import StorefrontIcon from '@mui/icons-material/Storefront';
import BoltIcon from '@mui/icons-material/Bolt';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { OrderService, ProductService, QProductService } from '../../services/api';

// Channel configuration
const channelConfig: Record<string, { label: string; color: string; bgColor: string; icon: React.ReactNode; shopPath: string; shopLabel: string }> = {
    retail: {
        label: 'Retail',
        color: '#0f172a',
        bgColor: '#dbeafe',
        icon: <StorefrontIcon sx={{ fontSize: 18 }} />,
        shopPath: '/retail',
        shopLabel: 'Continue Shopping',
    },
    'q-commerce': {
        label: 'Q-Commerce',
        color: '#7c3aed',
        bgColor: '#ede9fe',
        icon: <BoltIcon sx={{ fontSize: 18 }} />,
        shopPath: '/quick',
        shopLabel: 'Continue Shopping',
    },
};

const PaymentSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [recommendedProducts, setRecommendedProducts] = useState<any[]>([]);

    const params = new URLSearchParams(location.search);
    const orderId = params.get('orderId');
    const channel = params.get('channel') || 'retail';
    const config = channelConfig[channel] || channelConfig.retail;

    useEffect(() => {
        if (!orderId) {
            navigate('/');
            return;
        }

        const fetchData = async () => {
            try {
                const { data: orderData } = await OrderService.getOrderById(orderId);
                setOrder(orderData);

                // Fetch recommended products based on channel
                try {
                    if (channel === 'q-commerce') {
                        const { data: productData } = await QProductService.getAll();
                        setRecommendedProducts(Array.isArray(productData) ? productData.slice(0, 3) : []);
                    } else {
                        const { data: productData } = await ProductService.getAll();
                        setRecommendedProducts(Array.isArray(productData) ? productData.slice(0, 3) : []);
                    }
                } catch {
                    // ignore recommendation errors
                }
            } catch (error) {
                console.error("Failed to fetch data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [orderId, navigate, channel]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f8fafc' }}>
                <CircularProgress sx={{ color: 'black' }} />
            </Box>
        );
    }

    const subtotal = Number(order?.itemsPrice) || 0;
    const shipping = Number(order?.shippingPrice) || 0;
    const tax = Number(order?.taxPrice) || 0;
    const total = Number(order?.totalPrice) || 0;
    const orderNumber = `ORD-${(order?._id || '').slice(-8).toUpperCase()}`;
    const userName = order?.user?.username || order?.user?.profile?.name || localStorage.getItem('userName') || 'Customer';
    const userEmail = order?.user?.email || 'customer@example.com';

    return (
        <Box sx={{
            minHeight: '100vh',
            bgcolor: '#f8fafc',
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
                        bgcolor: config.bgColor,
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}>
                        <CheckIcon sx={{ fontSize: 40, color: config.color, stroke: config.color, strokeWidth: 1 }} />
                    </Box>
                    <Typography variant="h3" sx={{ fontWeight: 900, color: '#0f172a', mb: 1, letterSpacing: -1 }}>
                        Order Confirmed!
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#64748b' }}>
                        Your payment was successful and your order is on its way.
                    </Typography>
                    {/* Channel Badge */}
                    <Chip
                        icon={config.icon}
                        label={config.label}
                        size="small"
                        sx={{
                            mt: 2,
                            bgcolor: config.bgColor,
                            color: config.color,
                            fontWeight: 800,
                            fontSize: '0.75rem',
                            borderRadius: 3,
                            height: 32,
                            px: 1,
                            '& .MuiChip-icon': { color: config.color }
                        }}
                    />
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
                                    #{orderNumber}
                                </Typography>
                            </Box>
                            <Chip
                                label={order?.isDelivered ? 'DELIVERED' : 'Processing'}
                                size="small"
                                sx={{
                                    bgcolor: order?.isDelivered ? '#dcfce7' : '#f1f5f9',
                                    color: order?.isDelivered ? '#166534' : '#475569',
                                    fontWeight: 700,
                                    borderRadius: 4,
                                    height: 32,
                                    px: 1
                                }}
                            />
                        </Box>

                        {/* Pricing Breakdown & Delivery Details - Side by Side */}
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 4, mb: 4 }}>

                            {/* Pricing Breakdown */}
                            <Box>
                                <Typography variant="subtitle2" sx={{ color: '#94a3b8', fontWeight: 700, mb: 2, letterSpacing: 0.5, textTransform: 'uppercase', fontSize: '0.7rem' }}>
                                    Pricing Breakdown
                                </Typography>
                                <Stack spacing={2}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="body2" sx={{ color: '#64748b' }}>Subtotal</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#0f172a' }}>₹{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="body2" sx={{ color: '#64748b' }}>Shipping</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#0f172a' }}>
                                            {shipping === 0 ? '₹0.00' : `₹${shipping.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="body2" sx={{ color: '#64748b' }}>Tax (GST 18%)</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#0f172a' }}>₹{tax.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 2, borderTop: '1px solid #f1f5f9' }}>
                                        <Typography variant="body1" sx={{ fontWeight: 800, color: '#0f172a' }}>Total</Typography>
                                        <Typography variant="h6" sx={{ fontWeight: 900, color: '#0f172a' }}>₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</Typography>
                                    </Box>
                                </Stack>
                            </Box>

                            {/* Delivery Details */}
                            <Box sx={{ bgcolor: '#f8fafc', borderRadius: 4, p: 3 }}>
                                <Typography variant="subtitle2" sx={{ color: '#94a3b8', fontWeight: 700, mb: 2, letterSpacing: 0.5, textTransform: 'uppercase', fontSize: '0.7rem' }}>
                                    Delivery Details
                                </Typography>
                                <Stack spacing={2}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                        <PersonOutlineIcon sx={{ color: '#94a3b8', fontSize: 18 }} />
                                        <Box>
                                            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, fontSize: '0.6rem', display: 'block' }}>Recipient</Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 700, color: '#0f172a' }}>{userName}</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                        <PhoneIcon sx={{ color: '#94a3b8', fontSize: 18 }} />
                                        <Box>
                                            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, fontSize: '0.6rem', display: 'block' }}>Mobile Number</Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 700, color: '#0f172a' }}>
                                                {order?.user?.phone || order?.user?.profile?.phone || '+91 98765 43210'}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                        <EmailOutlinedIcon sx={{ color: '#94a3b8', fontSize: 18 }} />
                                        <Box>
                                            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, fontSize: '0.6rem', display: 'block' }}>Email Address</Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 700, color: '#0f172a' }}>{userEmail}</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                                        <LocationOnOutlinedIcon sx={{ color: '#94a3b8', fontSize: 18, mt: 0.25 }} />
                                        <Box>
                                            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, fontSize: '0.6rem', display: 'block' }}>Shipping Address</Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#0f172a', lineHeight: 1.6 }}>
                                                {order?.shippingAddress?.address || '123 Silicon Valley Way, Tech Hub'}<br />
                                                {order?.shippingAddress?.city || 'San Francisco'}, {order?.shippingAddress?.postalCode || 'CA 94105'}<br />
                                                {order?.shippingAddress?.country || 'India'}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Stack>
                            </Box>
                        </Box>

                        {/* Payment Method */}
                        <Box sx={{ mb: 4 }}>
                            <Typography variant="subtitle2" sx={{ color: '#94a3b8', fontWeight: 700, mb: 1.5, letterSpacing: 0.5, textTransform: 'uppercase', fontSize: '0.7rem' }}>
                                Payment Method
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, border: '1px solid #f1f5f9', borderRadius: 3 }}>
                                <CreditCardIcon sx={{ color: '#0f172a' }} />
                                <Box>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f172a' }}>
                                        {order?.paymentMethod === 'Stripe' ? 'Credit Card' : order?.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Credit Card'}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: '#64748b' }}>
                                        {order?.paymentMethod === 'Stripe' ? 'Ending in **** 4242' : order?.paymentMethod === 'COD' ? 'Pay on delivery' : 'ENDING IN **** 4242'}
                                    </Typography>
                                </Box>
                                <Chip
                                    label={order?.isPaid ? 'PAID' : 'PENDING'}
                                    size="small"
                                    sx={{
                                        ml: 'auto',
                                        bgcolor: order?.isPaid ? '#dcfce7' : '#f1f5f9',
                                        color: order?.isPaid ? '#166534' : '#0f172a',
                                        fontWeight: 800,
                                        fontSize: '0.65rem'
                                    }}
                                />
                            </Box>
                        </Box>

                        {/* Action Buttons */}
                        <Stack direction={{ xs: 'column-reverse', sm: 'row' }} spacing={2}>
                            <Button
                                component={Link}
                                to={`/profile?view=orders`}
                                variant="contained"
                                fullWidth
                                startIcon={<LocalShippingOutlinedIcon />}
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
                                to={config.shopPath}
                                variant="outlined"
                                fullWidth
                                startIcon={<StorefrontIcon />}
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
                                {config.shopLabel}
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
                                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#0f172a' }}>hub.com/refer/{userName.toLowerCase().replace(/\s/g, '-')}</Typography>
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

                        {/* Quick Delivery Info for Q-Commerce */}
                        {channel === 'q-commerce' && (
                            <Paper elevation={0} sx={{ p: 3, borderRadius: 4, bgcolor: '#ede9fe', display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                <BoltIcon sx={{ color: '#7c3aed' }} />
                                <Box>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0f172a', mb: 0.5 }}>
                                        Express Delivery
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.5 }}>
                                        Your order is being prepared for ultra-fast delivery. Estimated arrival: <strong>10–30 minutes</strong>.
                                    </Typography>
                                </Box>
                            </Paper>
                        )}
                    </Stack>
                </Box>

                {/* Recommended Section */}
                {recommendedProducts.length > 0 && (
                    <Box sx={{ mt: 8 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a' }}>Recommended for You</Typography>
                            <Stack direction="row" spacing={1}>
                                <IconButton size="small" sx={{ border: '1px solid #e2e8f0' }}><ArrowBackIosNewIcon fontSize="small" /></IconButton>
                                <IconButton size="small" sx={{ border: '1px solid #e2e8f0' }}><ArrowForwardIosIcon fontSize="small" /></IconButton>
                            </Stack>
                        </Box>

                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
                            {recommendedProducts.map((product) => {
                                const productPath = channel === 'q-commerce' ? `/quick/product/${product._id}` : `/product/${product._id}`;
                                return (
                                    <Paper
                                        key={product._id}
                                        elevation={0}
                                        component={Link}
                                        to={productPath}
                                        sx={{
                                            p: 0, borderRadius: 4, overflow: 'hidden', bgcolor: 'transparent',
                                            textDecoration: 'none', color: 'inherit',
                                            transition: 'transform 0.2s',
                                            '&:hover': { transform: 'translateY(-4px)' }
                                        }}
                                    >
                                        <Box sx={{ position: 'relative', aspectRatio: '1/1', bgcolor: '#f1f5f9', borderRadius: 4, mb: 2, overflow: 'hidden' }}>
                                            <img
                                                src={product.images?.[0] || product.image || 'https://via.placeholder.com/300'}
                                                alt={product.title || product.name}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                            <Chip
                                                label={`₹${product.price || product.pricePerUnit || 0}`}
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
                                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0f172a' }}>{product.title || product.name}</Typography>
                                        <Typography variant="caption" sx={{ color: '#64748b' }}>{product.category || 'Accessories'}</Typography>
                                    </Paper>
                                );
                            })}
                        </Box>
                    </Box>
                )}

            </Container>
        </Box>
    );
};

export default PaymentSuccess;
