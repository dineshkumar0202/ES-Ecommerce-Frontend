import { useState, useEffect } from 'react';
import { Box, Container, Grid, Typography, Stack, Tab, Tabs, CircularProgress, Card, CardMedia, CardContent, IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

import Navbar from '../WrapperComponents/Navbar';
import Footer from '../WrapperComponents/Footer';
import RetailOffers from '../SpecifiedComponents/Retail/RetailOffers';
import { ProductService, WishlistService, CartService } from '../../services/api';
import { toast } from 'react-toastify';

const Retail = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTab, setSelectedTab] = useState('All');

    const categories = ['All', 'Electronics', 'Lifestyle', 'Fashion'];

    // Muted/Earthy Pastel tones matching the reference image (Beige, Peach, Warm Grey)
    const bgColors = ['#EAE0D5', '#F3E5D8', '#F8DEC8', '#F1F5F9', '#E2E8F0', '#E7E5E4', '#D6D3D1', '#F5E6D3'];

    useEffect(() => {
        fetchProducts();
    }, [selectedTab]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const params: any = { limit: 8 };
            if (selectedTab !== 'All') {
                params.category = selectedTab;
            }

            const { data } = await ProductService.getAll(params);

            if (data.products) {
                setProducts(data.products);
            } else if (Array.isArray(data)) {
                setProducts(data);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
        setSelectedTab(newValue);
    };

    const handleAddToWishlist = async (e: React.MouseEvent, productId: string) => {
        e.stopPropagation();
        try {
            await WishlistService.addToWishlist({ productId });
            toast.success("Added to wishlist");
        } catch (error) {
            console.error(error);
            toast.error("Please login to add to wishlist");
        }
    };

    const handleAddToCart = async (e: React.MouseEvent, productId: string) => {
        e.stopPropagation();
        try {
            await CartService.addToCart({ productId, quantity: 1, type: 'Retail' });
            toast.success("Added to cart");
        } catch (error) {
            console.error(error);
            toast.error("Please login to add to cart");
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'white' }}>
            <Navbar />

            <Container maxWidth="xl" sx={{ mt: 4, mb: 12 }}>
                {/* Hero Section */}
                <RetailOffers />

                {/* Featured Products Header */}
                <Box sx={{ mt: 10, mb: 6 }}>
                    <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="flex-end" spacing={2} sx={{ mb: 4 }}>
                        <Typography variant="h3" sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: -1, fontFamily: 'sans-serif' }}>
                            Featured Products
                        </Typography>

                        <Tabs
                            value={selectedTab}
                            onChange={handleTabChange}
                            textColor="inherit"
                            sx={{
                                '& .MuiTabs-indicator': { bgcolor: 'black', height: 4 },
                                '& .MuiTab-root': {
                                    textTransform: 'uppercase',
                                    fontWeight: 700,
                                    color: '#94a3b8',
                                    fontSize: '0.9rem',
                                    letterSpacing: 1,
                                    minWidth: 'auto',
                                    mx: 1.5,
                                    pb: 1.5,
                                    '&.Mui-selected': { color: 'black' }
                                }
                            }}
                        >
                            {categories.map((cat) => (
                                <Tab key={cat} label={cat} value={cat} />
                            ))}
                        </Tabs>
                    </Stack>
                </Box>

                {/* Products Grid */}
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                        <CircularProgress sx={{ color: 'black' }} />
                    </Box>
                ) : (
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(3, 1fr)'
                        },
                        gap: 4
                    }}>
                        {products.map((product, index) => (
                            <Box key={product._id}>
                                <Card
                                    elevation={0}
                                    onClick={() => navigate(`/product/${product._id}`)}
                                    sx={{
                                        cursor: 'pointer',
                                        borderRadius: 0,
                                        bgcolor: 'transparent',
                                        position: 'relative',
                                        overflow: 'visible',
                                        '&:hover .action-buttons': { opacity: 1, transform: 'translateY(0)' },
                                        '&:hover .product-card-bg': { transform: 'scale(1.02)' }
                                    }}
                                >
                                    {/* Image Container with Muted Pastel Background */}
                                    <Box
                                        className="product-card-bg"
                                        sx={{
                                            position: 'relative',
                                            bgcolor: bgColors[index % bgColors.length],
                                            borderRadius: 8,
                                            overflow: 'hidden',
                                            pt: '100%', // 1:1 Aspect Ratio (Square)
                                            mb: 3,
                                            transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            image={product.images?.[0] || product.thumbnail || 'https://via.placeholder.com/300'}
                                            alt={product.title}
                                            sx={{
                                                position: 'absolute',
                                                top: '60%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%)',
                                                width: '140%', // User requested size
                                                height: '140%', // User requested size
                                                objectFit: 'contain',
                                                filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.15))'
                                            }}
                                        />

                                        {/* Action Buttons Overlay - Top Right or Bottom Right */}
                                        <Box
                                            className="action-buttons"
                                            sx={{
                                                position: 'absolute',
                                                bottom: 20,
                                                right: 20,
                                                display: 'flex',
                                                gap: 1.5,
                                                opacity: 0,
                                                transform: 'translateY(10px)',
                                                transition: 'all 0.3s ease',
                                                zIndex: 2
                                            }}
                                        >
                                            <Tooltip title="Add to Cart" arrow>
                                                <IconButton
                                                    onClick={(e) => handleAddToCart(e, product._id)}
                                                    sx={{
                                                        bgcolor: 'white',
                                                        color: 'black',
                                                        width: 45,
                                                        height: 45,
                                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                                        '&:hover': { bgcolor: 'black', color: 'white' }
                                                    }}
                                                >
                                                    <ShoppingBagOutlinedIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Wishlist" arrow>
                                                <IconButton
                                                    onClick={(e) => handleAddToWishlist(e, product._id)}
                                                    sx={{
                                                        bgcolor: 'white',
                                                        color: 'black',
                                                        width: 45,
                                                        height: 45,
                                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                                        '&:hover': { bgcolor: '#ef4444', color: 'white' }
                                                    }}
                                                >
                                                    <FavoriteBorderIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </Box>

                                    {/* Typography matching the minimalist uppercase reference */}
                                    <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 900,
                                                fontSize: '1rem',
                                                textTransform: 'uppercase',
                                                letterSpacing: 0.5,
                                                mb: 0.5,
                                                color: '#18181b', // Almost Black
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                fontFamily: 'sans-serif'
                                            }}
                                        >
                                            {product.title}
                                        </Typography>

                                        <Typography variant="body2" sx={{ fontWeight: 500, color: '#9ca3af', fontSize: '0.9rem' }}>
                                            ₹{product.price.toFixed(2)}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                        ))}
                    </Box>
                )}
            </Container>

            <Footer />
        </Box>
    );
};

export default Retail;
