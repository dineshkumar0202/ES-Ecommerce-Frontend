import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Box, Container, Typography, Paper, Button, Divider, List, ListItem, ListItemText, CircularProgress, Avatar, Chip, Stack } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Navbar from '../WrapperComponents/Navbar';
import Footer from '../WrapperComponents/Footer';
import { OrderService } from '../../services/api';

const PaymentSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const orderId = new URLSearchParams(location.search).get('orderId');

    useEffect(() => {
        if (!orderId) {
            navigate('/');
            return;
        }

        const fetchOrder = async () => {
            try {
                const { data } = await OrderService.getOrderById(orderId);
                setOrder(data);
            } catch (error) {
                console.error("Failed to fetch order", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId, navigate]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)' }}>
                <CircularProgress sx={{ color: '#bef264' }} />
            </Box>
        );
    }

    return (
        <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', pb: 10 }}>
            <Navbar />
            <Container maxWidth="md" sx={{ py: 8 }}>
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 4, md: 8 },
                        borderRadius: 8,
                        textAlign: 'center',
                        border: '1px solid #e2e8f0',
                        position: 'relative',
                        overflow: 'hidden',
                        bgcolor: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.05)'
                    }}
                >
                    <Box sx={{
                        position: 'absolute', top: 0, left: 0, right: 0, height: 8,
                        background: 'linear-gradient(90deg, #bef264 0%, #d9f99d 100%)'
                    }} />

                    <CheckCircleOutlineIcon sx={{ fontSize: 100, color: '#bef264', mb: 3 }} />
                    <Typography variant="h3" sx={{ fontWeight: 900, mb: 1, letterSpacing: -1 }}>
                        Order Confirmed!
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#64748b', mb: 5, fontWeight: 500 }}>
                        Your payment was successful and your order is on its way.
                    </Typography>

                    <Box sx={{ textAlign: 'left', bgcolor: '#f8fafc', p: 4, borderRadius: 6, border: '1px solid #f1f5f9' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                            <Box>
                                <Typography variant="overline" sx={{ color: '#94a3b8', fontWeight: 800 }}>Order Number</Typography>
                                <Typography variant="h6" sx={{ fontWeight: 800 }}>#{order?._id.slice(-8).toUpperCase()}</Typography>
                            </Box>
                            <Chip label="Processing" sx={{ bgcolor: '#fef3c7', color: '#b45309', fontWeight: 800 }} />
                        </Box>

                        <Divider sx={{ mb: 4, borderStyle: 'dashed' }} />

                        <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 2 }}>Order Details</Typography>
                        <List disablePadding>
                            {order?.orderItems?.map((item: any) => {
                                if (!item) return null;
                                return (
                                    <ListItem key={item._id} sx={{ px: 0, py: 2 }}>
                                        <Avatar src={item.image} variant="rounded" sx={{ width: 50, height: 50, mr: 2, borderRadius: 2 }} />
                                        <ListItemText
                                            primary={item.title || item.name}
                                            primaryTypographyProps={{ fontWeight: 700 }}
                                            secondary={`Quantity: ${item.quantity}`}
                                        />
                                        <Typography sx={{ fontWeight: 800 }}>
                                            ₹{(item.price * item.quantity).toLocaleString()}
                                        </Typography>
                                    </ListItem>
                                );
                            })}
                        </List>

                        <Stack spacing={2} sx={{ mt: 4, p: 3, bgcolor: 'white', borderRadius: 4, border: '1px solid #e2e8f0' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ color: '#64748b' }}>Subtotal</Typography>
                                <Typography sx={{ fontWeight: 600 }}>₹{order?.itemsPrice.toLocaleString()}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ color: '#64748b' }}>Shipping</Typography>
                                <Typography sx={{ fontWeight: 600 }}>₹{order?.shippingPrice.toLocaleString()}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ color: '#64748b' }}>Tax (GST)</Typography>
                                <Typography sx={{ fontWeight: 600 }}>₹{order?.taxPrice.toLocaleString()}</Typography>
                            </Box>
                            <Divider />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontWeight: 800, fontSize: '1.2rem' }}>Total Amount</Typography>
                                <Typography sx={{ fontWeight: 900, fontSize: '1.2rem', color: '#000' }}>₹{order?.totalPrice.toLocaleString()}</Typography>
                            </Box>
                        </Stack>

                        <Box sx={{ mt: 4, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
                            <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>Delivering to</Typography>
                                <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.6 }}>
                                    {order?.shippingAddress.address}<br />
                                    {order?.shippingAddress.city}, {order?.shippingAddress.postalCode}<br />
                                    {order?.shippingAddress.country}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>Payment Method</Typography>
                                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ p: 2, border: '1px solid #e2e8f0', borderRadius: 3, display: 'inline-flex', bgcolor: 'white' }}>
                                    <CreditCardIcon sx={{ color: '#000' }} />
                                    <Box>
                                        <Typography variant="body2" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
                                            {order?.paymentMethod || 'Credit Card'}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>
                                            Ending in •••• 4242
                                        </Typography>
                                    </Box>
                                    <Chip label="PAID" size="small" color="success" sx={{ height: 24, fontSize: '0.7rem', fontWeight: 800, borderRadius: 1 }} />
                                </Stack>
                            </Box>
                        </Box>
                    </Box>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mt: 8 }}>
                        <Button
                            component={Link}
                            to="/profile"
                            variant="contained"
                            fullWidth
                            sx={{
                                bgcolor: '#000',
                                color: 'white',
                                py: 2,
                                px: 4,
                                borderRadius: 4,
                                fontWeight: 800,
                                fontSize: '1rem',
                                textTransform: 'none',
                                '&:hover': { bgcolor: '#1e293b' }
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
                                borderColor: '#e2e8f0',
                                color: '#000',
                                py: 2,
                                px: 4,
                                borderRadius: 4,
                                fontWeight: 800,
                                fontSize: '1rem',
                                textTransform: 'none',
                                '&:hover': { borderColor: '#000', bgcolor: 'transparent' }
                            }}
                        >
                            Continue Shopping
                        </Button>
                    </Stack>
                </Paper>
            </Container>
            <Footer />
        </Box>
    );
};

export default PaymentSuccess;
