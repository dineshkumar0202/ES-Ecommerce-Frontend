import { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button, Chip, Stack, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { QProductService, CartService } from '../../../../services/api';
import { toast } from 'react-toastify';

const QProductFeed = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await QProductService.getAll();
                // Take top 8 products for the feed section
                setProducts(data.slice(0, 8));
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress size={40} sx={{ color: 'black' }} />
            </Box>
        );
    }

    if (products.length === 0) {
        return null;
    }

    return (
        <Box sx={{ mb: 6 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 800 }}>Best Sellers</Typography>
                <Button
                    onClick={() => navigate('/quick/all')}
                    sx={{ color: '#22c55e', fontWeight: 800, textTransform: 'none' }}
                >
                    View All
                </Button>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                {products.map((item) => (
                    <Box key={item._id} sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(25% - 18px)' }, flexGrow: 0, flexShrink: 0 }}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 2,
                                borderRadius: 3,
                                bgcolor: 'white',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'relative',
                                transition: 'transform 0.2s',
                                '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }
                            }}
                        >
                            {item.discount > 0 && (
                                <Chip
                                    label={`${item.discount}% OFF`}
                                    size="small"
                                    sx={{
                                        position: 'absolute',
                                        top: 16,
                                        left: 16,
                                        bgcolor: '#ef4444',
                                        color: 'white',
                                        fontWeight: 800,
                                        fontSize: '0.65rem',
                                        height: '22px',
                                        borderRadius: 1,
                                        zIndex: 2
                                    }}
                                />
                            )}

                            <Box
                                onClick={() => navigate(`/quick/product/${item._id}`)}
                                sx={{
                                    height: 180,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mb: 2,
                                    overflow: 'hidden',
                                    borderRadius: 2,
                                    cursor: 'pointer',
                                    bgcolor: '#f8fafc'
                                }}
                            >
                                <Box component="img" src={item.image} alt={item.name} sx={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            </Box>

                            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0f172a' }}>{item.name}</Typography>
                            </Stack>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', mb: 2, display: 'block' }}>{item.brand}</Typography>

                            <Stack direction="row" spacing={1} alignItems="baseline" sx={{ mb: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 900, color: '#0f172a' }}>₹{item.price}</Typography>
                                {item.mrp > item.price && (
                                    <Typography variant="caption" sx={{ textDecoration: 'line-through', color: '#94a3b8', fontWeight: 600 }}>₹{item.mrp}</Typography>
                                )}
                            </Stack>

                            <Stack direction="column" spacing={1} sx={{ mt: 'auto' }}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={() => navigate(`/quick/product/${item._id}`)}
                                    sx={{
                                        height: '46px',
                                        bgcolor: 'black',
                                        color: 'white',
                                        fontWeight: 900,
                                        borderRadius: '10px',
                                        textTransform: 'none',
                                        boxShadow: 'none',
                                        '&:hover': { bgcolor: '#333', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }
                                    }}
                                >
                                    BUY NOW
                                </Button>

                                <Button
                                    fullWidth
                                    variant="outlined"
                                    onClick={async (e) => {
                                        e.stopPropagation();
                                        try {
                                            await CartService.addToCart({
                                                productId: item._id,
                                                quantity: 1,
                                                type: 'Quick'
                                            });
                                            toast.success('Added to Quick Basket!');
                                        } catch (error) {
                                            toast.error('Login to add to basket');
                                        }
                                    }}
                                    startIcon={<AddIcon />}
                                    sx={{
                                        height: '46px',
                                        bgcolor: 'transparent',
                                        borderColor: '#22c55e',
                                        color: '#16a34a',
                                        fontWeight: 900,
                                        borderRadius: '10px',
                                        textTransform: 'none',
                                        boxShadow: 'none',
                                        '&:hover': {
                                            bgcolor: '#f0fdf4',
                                            borderColor: '#16a34a',
                                            boxShadow: 'none'
                                        }
                                    }}
                                >
                                    ADD TO CART
                                </Button>
                            </Stack>
                        </Paper>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default QProductFeed;
