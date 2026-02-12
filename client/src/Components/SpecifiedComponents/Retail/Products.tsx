import { useState, useEffect } from 'react';
import { Box, Typography, Stack, Tab, Tabs, CircularProgress, Card, CardMedia, CardContent, IconButton, Tooltip, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { ProductService, WishlistService, CartService } from '../../../services/api';
import { toast } from 'react-toastify';

const Products = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTab, setSelectedTab] = useState('All');

    const categoriesList = ['All', 'Electronics', 'Lifestyle', 'Fashion'];
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
            if (data.products) setProducts(data.products);
            else if (Array.isArray(data)) setProducts(data);
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
            toast.error("Please login to add to wishlist");
        }
    };

    const handleAddToCart = async (e: React.MouseEvent, productId: string) => {
        e.stopPropagation();
        try {
            await CartService.addToCart({ productId, quantity: 1, type: 'Retail' });
            toast.success("Added to cart");
        } catch (error) {
            toast.error("Please login to add to cart");
        }
    };

    const getRandomBadge = (index: number) => {
        const badges = ["GOOD", "LIST NEW", "EXCELLENT", "PREMIUM"];
        return badges[index % badges.length];
    };

    return (
        <Box>
            {/* Featured Products Tabbed Section Header */}
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
                            '& .MuiTabs-indicator': { bgcolor: 'black', height: 3 },
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
                        {categoriesList.map((cat) => (
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
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: 3,
                }}>
                    {products.map((product, index) => (
                        <Card
                            key={product._id}
                            elevation={0}
                            onClick={() => navigate(`/product/${product._id}`)}
                            sx={{
                                cursor: 'pointer',
                                borderRadius: 4,
                                border: '1px solid #f3f4f6',
                                overflow: 'visible',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 12px 24px -10px rgba(0,0,0,0.1)'
                                }
                            }}
                        >
                            {/* Image Container */}
                            <Box
                                className="product-card-bg"
                                sx={{
                                    height: 320, // Slightly reduced height from 340 for better ratio with new width
                                    bgcolor: bgColors[index % bgColors.length],
                                    borderRadius: 4,
                                    position: 'relative',
                                    overflow: 'hidden',
                                    mb: 2,
                                    '&:hover .action-buttons': { opacity: 1, transform: 'translateY(0)' }
                                }}
                            >
                                {/* Badge */}
                                <Chip
                                    label={getRandomBadge(index)}
                                    size="small"
                                    sx={{
                                        position: 'absolute',
                                        top: 12,
                                        left: 12,
                                        bgcolor: 'rgba(255,255,255,0.9)',
                                        borderRadius: 1,
                                        fontSize: '0.65rem',
                                        fontWeight: 800,
                                        height: 20,
                                        zIndex: 2,
                                        backdropFilter: 'blur(4px)'
                                    }}
                                />

                                <CardMedia
                                    component="img"
                                    image={product.images?.[0] || product.thumbnail || 'https://via.placeholder.com/300'}
                                    alt={product.title}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        objectPosition: 'top center',
                                        transition: 'transform 0.5s ease',
                                        '&:hover': { transform: 'scale(1.05)' }
                                    }}
                                />

                                {/* Old Style Overlay Buttons */}
                                <Box
                                    className="action-buttons"
                                    sx={{
                                        position: 'absolute',
                                        bottom: 15,
                                        right: 15,
                                        display: 'flex',
                                        gap: 1,
                                        opacity: 0,
                                        transform: 'translateY(10px)',
                                        transition: 'all 0.3s ease',
                                        zIndex: 2
                                    }}
                                >
                                    <Tooltip title="Visual Search" arrow>
                                        <IconButton
                                            sx={{
                                                bgcolor: 'white', color: 'black', width: 40, height: 40,
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                                '&:hover': { bgcolor: 'black', color: 'white' }
                                            }}
                                        >
                                            <CameraAltOutlinedIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Add to Cart" arrow>
                                        <IconButton
                                            onClick={(e) => handleAddToCart(e, product._id)}
                                            sx={{
                                                bgcolor: 'white', color: 'black', width: 40, height: 40,
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                                '&:hover': { bgcolor: 'black', color: 'white' }
                                            }}
                                        >
                                            <ShoppingCartOutlinedIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Wishlist" arrow>
                                        <IconButton
                                            onClick={(e) => handleAddToWishlist(e, product._id)}
                                            sx={{
                                                bgcolor: 'white', color: 'black', width: 40, height: 40,
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                                '&:hover': { bgcolor: '#ef4444', color: 'white' }
                                            }}
                                        >
                                            <FavoriteBorderIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Box>

                            {/* Content */}
                            <CardContent sx={{ p: 1 }}>
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        fontWeight: 800,
                                        mb: 0.5,
                                        color: '#1e293b',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {product.title}
                                </Typography>

                                {/* Location Line */}
                                <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 1 }}>
                                    <LocationOnIcon sx={{ fontSize: 14, color: '#f43f5e' }} />
                                    <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                                        {product.location || 'Global Shipping'}
                                    </Typography>
                                </Stack>

                                <Typography variant="h6" sx={{ fontWeight: 900, color: '#0f172a' }}>
                                    ₹{product.price.toFixed(2)}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default Products;