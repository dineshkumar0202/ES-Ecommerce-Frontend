import { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Stack,
    IconButton,
    Chip,
    CircularProgress,
    Divider,
    Paper
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';

import Navbar from '../../WrapperComponents/Navbar';
import Footer from '../../WrapperComponents/Footer';
import { QProductService, CartService } from '../../../services/api';
import { toast } from 'react-toastify';

const QCommerceProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [similarProducts, setSimilarProducts] = useState<any[]>([]);

    useEffect(() => {
        if (id) {
            fetchProductData(id);
        }
    }, [id]);

    const fetchProductData = async (productId: string) => {
        try {
            setLoading(true);
            const { data } = await QProductService.getById(productId);
            setProduct(data);

            // Fetch similar products in the same category
            const { data: allProducts } = await QProductService.getAll();
            const filtered = allProducts
                .filter((p: any) => p._id !== productId && p.category === data.category)
                .slice(0, 5);
            setSimilarProducts(filtered);
        } catch (error) {
            console.error("Error fetching Q-Commerce product:", error);
            toast.error("Failed to load product details");
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async () => {
        try {
            await CartService.addToCart({
                productId: product._id,
                quantity: 1,
                type: 'QCommerce'
            });
            toast.success("Added to cart!");
        } catch (error) {
            console.error(error);
            toast.error("Please login to add to cart");
        }
    };

    if (loading) {
        return (
            <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'white' }}>
                <Navbar />
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress sx={{ color: '#B4D5DC' }} />
                </Box>
                <Footer />
            </Box>
        );
    }

    if (!product) {
        return (
            <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'white' }}>
                <Navbar />
                <Container sx={{ flex: 1, py: 8, textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 800 }}>Product Not Found</Typography>
                    <Button
                        onClick={() => navigate('/quick')}
                        sx={{ mt: 2, color: '#1a202c', fontWeight: 700 }}
                    >
                        Back to Store
                    </Button>
                </Container>
                <Footer />
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
            <Navbar />

            <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
                {/* Back Button */}
                <IconButton
                    onClick={() => navigate(-1)}
                    sx={{ mb: 2, bgcolor: 'white', '&:hover': { bgcolor: '#f1f5f9' } }}
                >
                    <ArrowBackIcon />
                </IconButton>

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
                    {/* Left: Product Image */}
                    <Box sx={{ flex: 1 }}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 4,
                                borderRadius: 6,
                                bgcolor: 'white',
                                border: '1px solid #f1f5f9',
                                textAlign: 'center',
                                position: 'sticky',
                                top: 100
                            }}
                        >
                            <Box
                                component="img"
                                src={product.image}
                                alt={product.name}
                                sx={{
                                    width: '100%',
                                    maxHeight: '400px',
                                    objectFit: 'contain',
                                    filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.05))'
                                }}
                            />
                        </Paper>
                    </Box>

                    {/* Right: Product Details */}
                    <Box sx={{ flex: 1.2 }}>
                        <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 6, bgcolor: 'white', border: '1px solid #f1f5f9' }}>
                            <Stack spacing={3}>
                                <Box>
                                    <Chip
                                        label={product.category || "Express"}
                                        size="small"
                                        sx={{
                                            bgcolor: '#B4D5DC',
                                            color: '#0f172a',
                                            fontWeight: 800,
                                            fontSize: '0.65rem',
                                            mb: 1.5
                                        }}
                                    />
                                    <Typography variant="h3" sx={{ fontWeight: 900, color: '#0f172a', letterSpacing: -1, mb: 1 }}>
                                        {product.name}
                                    </Typography>
                                    <Typography variant="h6" sx={{ color: '#64748b', fontWeight: 600 }}>
                                        {product.unit}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Typography variant="h4" sx={{ fontWeight: 900, color: '#0f172a' }}>
                                        ₹{product.price}
                                    </Typography>
                                    {product.discount && (
                                        <Chip
                                            label={`${product.discount}% OFF`}
                                            size="small"
                                            sx={{ bgcolor: '#ef4444', color: 'white', fontWeight: 800 }}
                                        />
                                    )}
                                </Box>

                                <Divider />

                                {/* Q-Commerce Special Features */}
                                <Stack direction="row" spacing={3}>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <TimerOutlinedIcon sx={{ color: '#10b981' }} />
                                        <Box>
                                            <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700, display: 'block' }}>Delivery time</Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 800, color: '#10b981' }}>10 - 15 MINS</Typography>
                                        </Box>
                                    </Stack>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <VerifiedUserOutlinedIcon sx={{ color: '#2563eb' }} />
                                        <Box>
                                            <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700, display: 'block' }}>Quality Check</Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 800, color: '#2563eb' }}>Store Verified</Typography>
                                        </Box>
                                    </Stack>
                                </Stack>

                                <Box sx={{ pt: 2 }}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        size="large"
                                        onClick={handleAddToCart}
                                        startIcon={<ShoppingCartOutlinedIcon />}
                                        sx={{
                                            bgcolor: '#B4D5DC',
                                            color: '#0f172a',
                                            py: 2,
                                            borderRadius: 4,
                                            fontWeight: 900,
                                            fontSize: '1rem',
                                            boxShadow: '0 8px 20px -8px rgba(180, 213, 220, 0.6)',
                                            '&:hover': { bgcolor: '#9bc4ce', boxShadow: 'none' }
                                        }}
                                    >
                                        ADD TO CART
                                    </Button>
                                </Box>

                                <Box>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1, color: '#0f172a' }}>Product Highlights</Typography>
                                    <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.7 }}>
                                        {product.description || "Freshly picked and sourced directly from verified local stores to ensure maximum quality and freshness. Delivered to your doorstep in minutes."}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Paper>
                    </Box>
                </Box>

                {/* Similar Items Horizontal Scroll */}
                {similarProducts.length > 0 && (
                    <Box sx={{ mt: 8 }}>
                        <Typography variant="h5" sx={{ fontWeight: 900, mb: 3, color: '#0f172a' }}>Similar Items to Quick-Add</Typography>
                        <Stack
                            direction="row"
                            spacing={2}
                            sx={{
                                overflowX: 'auto',
                                pb: 2,
                                '::-webkit-scrollbar': { display: 'none' }
                            }}
                        >
                            {similarProducts.map((p) => (
                                <Paper
                                    key={p._id}
                                    onClick={() => navigate(`/quick/product/${p._id}`)}
                                    elevation={0}
                                    sx={{
                                        minWidth: 180,
                                        p: 2,
                                        borderRadius: 4,
                                        bgcolor: 'white',
                                        border: '1px solid #f1f5f9',
                                        cursor: 'pointer',
                                        transition: 'transform 0.2s',
                                        '&:hover': { transform: 'translateY(-4px)' }
                                    }}
                                >
                                    <Box sx={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                                        <img src={p.image} alt={p.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                                    </Box>
                                    <Typography variant="subtitle2" noWrap sx={{ fontWeight: 800, color: '#0f172a' }}>{p.name}</Typography>
                                    <Typography variant="caption" sx={{ color: '#64748b', display: 'block', mb: 1 }}>{p.unit}</Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 900 }}>₹{p.price}</Typography>
                                        <IconButton size="small" sx={{ bgcolor: '#f1f5f9' }}>
                                            <ShoppingCartOutlinedIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </Paper>
                            ))}
                        </Stack>
                    </Box>
                )}
            </Container>

            <Footer />
        </Box>
    );
};

export default QCommerceProductDetails;
