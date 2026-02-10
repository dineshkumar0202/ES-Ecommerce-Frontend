import { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Divider,
    Stack,
    Paper,
    CircularProgress,
    IconButton,
    Chip,
    Rating
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VerifiedIcon from '@mui/icons-material/Verified';

import Navbar from '../../../WrapperComponents/Navbar';
import Footer from '../../../WrapperComponents/Footer';
import { QProductService, CartService } from '../../../../services/api';
import { toast } from 'react-toastify';

const QProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
            try {
                const { data } = await QProductService.getById(id);
                setProduct(data);
            } catch (error) {
                console.error("Error fetching quick commerce product:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = async () => {
        try {
            await CartService.addToCart({ productId: product._id, quantity: 1, type: 'Quick' });
            toast.success('Added to your quick basket!');
        } catch (error) {
            console.error("Error adding to cart:", error);
            toast.error('Failed to add to basket. Please login first.');
        }
    };

    if (isLoading) {
        return (
            <Box sx={{ bgcolor: 'white', minHeight: '100vh' }}>
                <Navbar />
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 20 }}>
                    <CircularProgress sx={{ color: '#22c55e' }} />
                </Box>
                <Footer />
            </Box>
        );
    }

    if (!product) {
        return (
            <Box sx={{ bgcolor: 'white', minHeight: '100vh' }}>
                <Navbar />
                <Container maxWidth="xl" sx={{ mt: 4, mb: 8, textAlign: 'center' }}>
                    <Typography variant="h4">Product not found</Typography>
                    <Button onClick={() => navigate('/quick')} sx={{ mt: 2, color: '#22c55e', fontWeight: 700 }}>Go to Quick Commerce</Button>
                </Container>
                <Footer />
            </Box>
        );
    }

    return (
        <Box sx={{ bgcolor: '#f1f5f9', minHeight: '100vh' }}>
            <Navbar />

            <Container maxWidth="xl" sx={{ mt: 4, mb: 8 }}>
                <Paper elevation={0} sx={{ p: { xs: 2, md: 5 }, borderRadius: 5, bgcolor: 'white', border: '1px solid #e2e8f0' }}>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 6 }}>

                        {/* Left Column: Image Area */}
                        <Box sx={{ width: { xs: '100%', md: '45%' } }}>
                            <Box
                                sx={{
                                    bgcolor: '#f8fafc',
                                    borderRadius: 4,
                                    p: 4,
                                    height: { xs: '300px', md: '450px' },
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative'
                                }}
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                />
                                {product.discount > 0 && (
                                    <Chip
                                        label={`${product.discount}% OFF`}
                                        sx={{ position: 'absolute', top: 20, left: 20, bgcolor: '#ef4444', color: 'white', fontWeight: 900 }}
                                    />
                                )}
                                <IconButton
                                    onClick={() => setIsFavorite(!isFavorite)}
                                    sx={{ position: 'absolute', top: 20, right: 20, bgcolor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                                >
                                    {isFavorite ? <FavoriteIcon sx={{ color: '#ef4444' }} /> : <FavoriteBorderIcon />}
                                </IconButton>
                            </Box>

                            <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
                                <Paper elevation={0} sx={{ flex: 1, p: 2, bgcolor: '#f0fdf4', borderRadius: 3, border: '1px solid #dcfce7', textAlign: 'center' }}>
                                    <AccessTimeIcon sx={{ color: '#16a34a', mb: 1 }} />
                                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#166534', fontSize: '1rem' }}>10-15 Min</Typography>
                                    <Typography variant="caption" sx={{ color: '#16a34a', fontWeight: 600 }}>FAST DELIVERY</Typography>
                                </Paper>
                                <Paper elevation={0} sx={{ flex: 1, p: 2, bgcolor: '#eff6ff', borderRadius: 3, border: '1px solid #dbeafe', textAlign: 'center' }}>
                                    <VerifiedIcon sx={{ color: '#2563eb', mb: 1 }} />
                                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e40af', fontSize: '1rem' }}>Verified</Typography>
                                    <Typography variant="caption" sx={{ color: '#2563eb', fontWeight: 600 }}>QUALITY CHECKED</Typography>
                                </Paper>
                            </Stack>
                        </Box>

                        {/* Right Column: Details Area */}
                        <Box sx={{ width: { xs: '100%', md: '55%' } }}>
                            <Box sx={{ mb: 1 }}>
                                <Typography variant="caption" sx={{ color: '#22c55e', fontWeight: 800, letterSpacing: 1 }}>
                                    {product.brand?.toUpperCase()}
                                </Typography>
                            </Box>
                            <Typography variant="h3" sx={{ fontWeight: 900, mb: 2, color: '#0f172a' }}>
                                {product.name}
                            </Typography>

                            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                                <Rating value={4.5} readOnly size="small" />
                                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600 }}>4.5 (120 Ratings)</Typography>
                                <Divider orientation="vertical" flexItem />
                                <Typography variant="body2" sx={{ color: '#22c55e', fontWeight: 700 }}>In Stock</Typography>
                            </Stack>

                            <Stack direction="row" alignItems="baseline" spacing={2} sx={{ mb: 4 }}>
                                <Typography variant="h3" sx={{ fontWeight: 900, color: '#0f172a' }}>
                                    ₹{product.price}
                                </Typography>
                                {product.mrp > product.price && (
                                    <Typography variant="h5" sx={{ textDecoration: 'line-through', color: '#94a3b8', fontWeight: 600 }}>
                                        ₹{product.mrp}
                                    </Typography>
                                )}
                            </Stack>

                            <Divider sx={{ mb: 4 }} />

                            <Box sx={{ mb: 4 }}>
                                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Product Details</Typography>
                                <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.8 }}>
                                    {product.description || "No specific details available for this product beyond the immediate category and brand specifications. All our quick commerce products are fresh and quality-checked before dispatch."}
                                </Typography>
                            </Box>

                            <Box sx={{ mb: 4, p: 3, bgcolor: '#f8fafc', borderRadius: 4 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 2 }}>Highlights</Typography>
                                <Stack spacing={1.5}>
                                    <Typography variant="body2" sx={{ color: '#475569', display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Box sx={{ width: 6, height: 6, bgcolor: '#22c55e', borderRadius: '50%' }} /> Category: {product.category}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#475569', display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Box sx={{ width: 6, height: 6, bgcolor: '#22c55e', borderRadius: '50%' }} /> Brand: {product.brand}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#475569', display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Box sx={{ width: 6, height: 6, bgcolor: '#22c55e', borderRadius: '50%' }} /> Delivery within 15 minutes
                                    </Typography>
                                </Stack>
                            </Box>

                            <Stack direction="row" spacing={2}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={handleAddToCart}
                                    startIcon={<ShoppingBagIcon />}
                                    sx={{
                                        bgcolor: 'black',
                                        color: 'white',
                                        borderRadius: 3,
                                        py: 2,
                                        fontWeight: 800,
                                        fontSize: '1rem',
                                        textTransform: 'none',
                                        '&:hover': { bgcolor: '#333' }
                                    }}
                                >
                                    Add to Cart
                                </Button>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={() => navigate('/checkout')}
                                    startIcon={<FlashOnIcon />}
                                    sx={{
                                        bgcolor: '#22c55e',
                                        color: 'white',
                                        borderRadius: 3,
                                        py: 2,
                                        fontWeight: 800,
                                        fontSize: '1rem',
                                        textTransform: 'none',
                                        '&:hover': { bgcolor: '#16a34a' }
                                    }}
                                >
                                    Order Now
                                </Button>
                            </Stack>
                        </Box>
                    </Box>
                </Paper>
            </Container>

            <Footer />
        </Box>
    );
};

export default QProductDetails;
