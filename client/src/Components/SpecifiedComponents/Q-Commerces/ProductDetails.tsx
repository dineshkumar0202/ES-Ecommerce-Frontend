import { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Stack,
    Paper,
    CircularProgress,
    IconButton,
    Chip
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';

import Navbar from '../../WrapperComponents/Navbar';
import Footer from '../../WrapperComponents/Footer';
import { QProductService, WishlistService, CartService } from '../../../services/api';
import { toast } from 'react-toastify';

const QProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setIsLoading(true);
                const { data } = await QProductService.getById(id!);
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
                toast.error('Product not found');
                navigate('/quick');
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id, navigate]);

    const handleAddToCart = async () => {
        try {
            await CartService.addToCart({
                productId: product._id,
                quantity,
                type: 'QCommerce'
            });
            toast.success('Added to cart!');
        } catch (error) {
            toast.error('Please login to add to cart');
        }
    };

    const handleBuyNow = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Please login to buy');
            navigate('/login');
            return;
        }

        try {
            await CartService.addToCart({
                productId: product._id,
                quantity,
                type: 'QCommerce'
            });
            navigate('/checkout', { state: { preferredPaymentMethod: 'Razorpay' } });
        } catch (error) {
            console.error(error);
            toast.error('Failed to proceed to checkout');
        }
    };

    const handleToggleWishlist = async () => {
        try {
            if (isFavorite) {
                await WishlistService.removeFromWishlist(product._id);
                setIsFavorite(false);
                toast.success('Removed from wishlist');
            } else {
                await WishlistService.addToWishlist({
                    productId: product._id,
                    type: 'q-commerce'
                });
                setIsFavorite(true);
                toast.success('Added to wishlist!');
            }
        } catch (error) {
            console.error("Error with wishlist:", error);
            toast.error('Please login to add to wishlist');
        }
    };

    if (isLoading) {
        return (
            <Box sx={{ bgcolor: 'white', minHeight: '100vh' }}>
                <Navbar />
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 20 }}>
                    <CircularProgress sx={{ color: '#B4D5DC' }} />
                </Box>
                <Footer />
            </Box>
        );
    }

    if (!product) {
        return null;
    }

    const images = product.images || [product.image];

    return (
        <Box sx={{ bgcolor: '#ffffff', minHeight: '100vh' }}>
            <Navbar />
            <Container maxWidth="xl" sx={{ py: 6 }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 6 }}>
                    {/* Left Side: Image Gallery */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Box sx={{ position: 'sticky', top: 100 }}>
                            <Box sx={{
                                borderRadius: 6,
                                bgcolor: '#f8f9fa',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '500px',
                                position: 'relative',
                                mb: 3,
                                overflow: 'hidden'
                            }}>
                                <img
                                    src={images[selectedImage]}
                                    alt={product.name}
                                    style={{ width: '80%', height: '80%', objectFit: 'contain' }}
                                />
                                <IconButton
                                    onClick={handleToggleWishlist}
                                    sx={{
                                        position: 'absolute',
                                        top: 24,
                                        right: 24,
                                        bgcolor: 'white',
                                        p: 1.5,
                                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                        '&:hover': { bgcolor: '#f8fafc' }
                                    }}
                                >
                                    {isFavorite ? <FavoriteIcon sx={{ color: '#ef4444' }} /> : <FavoriteBorderIcon />}
                                </IconButton>
                            </Box>

                            {/* Thumbnails */}
                            <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', pb: 1 }}>
                                {images.map((img: string, index: number) => (
                                    <Box
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        sx={{
                                            width: 100,
                                            height: 100,
                                            borderRadius: 3,
                                            border: `2px solid ${selectedImage === index ? '#B4D5DC' : 'transparent'}`,
                                            bgcolor: '#f1f5f9',
                                            cursor: 'pointer',
                                            p: 1,
                                            flexShrink: 0,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            transition: 'all 0.2s',
                                            '&:hover': { bgcolor: '#e2e8f0' }
                                        }}
                                    >
                                        <img src={img} alt="thumb" style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
                                    </Box>
                                ))}
                            </Stack>
                        </Box>
                    </Box>

                    {/* Right Side: Product Details */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Box>
                            <Typography variant="h3" sx={{ fontWeight: 900, mb: 1, color: '#0f172a' }}>
                                {product.name}
                            </Typography>
                            <Typography variant="h6" sx={{ color: '#94a3b8', fontWeight: 600, mb: 3 }}>
                                {product.unit}
                            </Typography>

                            {/* Price Section */}
                            <Paper elevation={0} sx={{ p: 4, bgcolor: '#f8fafc', borderRadius: 4, mb: 4 }}>
                                <Stack spacing={3}>
                                    <Box>
                                        <Typography variant="h4" sx={{ fontWeight: 900, color: '#0f172a', mb: 1 }}>
                                            ₹{product.price}
                                        </Typography>
                                        {product.discount && (
                                            <Chip
                                                label={`${product.discount}% OFF`}
                                                sx={{ bgcolor: '#ef4444', color: 'white', fontWeight: 800 }}
                                            />
                                        )}
                                    </Box>

                                    {/* Quantity Selector */}
                                    <Box>
                                        <Typography variant="caption" sx={{ fontWeight: 800, color: '#64748b', mb: 1, display: 'block' }}>
                                            QUANTITY
                                        </Typography>
                                        <Stack direction="row" spacing={2} alignItems="center">
                                            <IconButton
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                sx={{
                                                    bgcolor: 'white',
                                                    border: '2px solid #e2e8f0',
                                                    '&:hover': { bgcolor: '#f8fafc' }
                                                }}
                                            >
                                                <RemoveIcon />
                                            </IconButton>
                                            <Typography sx={{ fontWeight: 800, fontSize: '1.2rem', minWidth: '40px', textAlign: 'center' }}>
                                                {quantity}
                                            </Typography>
                                            <IconButton
                                                onClick={() => setQuantity(quantity + 1)}
                                                sx={{
                                                    bgcolor: 'white',
                                                    border: '2px solid #e2e8f0',
                                                    '&:hover': { bgcolor: '#f8fafc' }
                                                }}
                                            >
                                                <AddIcon />
                                            </IconButton>
                                        </Stack>
                                    </Box>

                                    <Stack direction="row" spacing={2}>
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            onClick={handleAddToCart}
                                            sx={{
                                                bgcolor: '#B4D5DC',
                                                color: 'black',
                                                py: 2,
                                                borderRadius: 3,
                                                fontWeight: 900,
                                                fontSize: '1rem',
                                                flex: 1,
                                                '&:hover': { bgcolor: '#9bc4c4' }
                                            }}
                                        >
                                            ADD TO CART
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            fullWidth
                                            onClick={handleBuyNow}
                                            sx={{
                                                borderColor: '#0f172a',
                                                color: '#0f172a',
                                                py: 2,
                                                borderRadius: 3,
                                                fontWeight: 900,
                                                fontSize: '1rem',
                                                borderWidth: 2,
                                                flex: 1,
                                                '&:hover': { borderWidth: 2, bgcolor: '#f1f5f9' }
                                            }}
                                        >
                                            BUY NOW
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Paper>

                            {/* Delivery Info */}
                            <Stack spacing={2} sx={{ mb: 4 }}>
                                <Paper elevation={0} sx={{ p: 3, bgcolor: '#f0fdf4', borderRadius: 3, border: '1px solid #bbf7d0' }}>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <LocalShippingOutlinedIcon sx={{ color: '#16a34a' }} />
                                        <Box>
                                            <Typography sx={{ fontWeight: 800, color: '#15803d' }}>
                                                Express Delivery in 15 Minutes
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: '#16a34a' }}>
                                                Order now and get it delivered super fast!
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Paper>

                                <Paper elevation={0} sx={{ p: 3, bgcolor: '#eff6ff', borderRadius: 3, border: '1px solid #bfdbfe' }}>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <VerifiedUserOutlinedIcon sx={{ color: '#2563eb' }} />
                                        <Box>
                                            <Typography sx={{ fontWeight: 800, color: '#1e40af' }}>
                                                100% Fresh Guarantee
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: '#2563eb' }}>
                                                Quality checked before delivery
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Paper>
                            </Stack>

                            {/* Product Description */}
                            <Box sx={{ mt: 4 }}>
                                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, color: '#1e293b' }}>
                                    Product Description
                                </Typography>
                                <Typography sx={{ color: '#475569', lineHeight: 1.8, fontSize: '1rem' }}>
                                    {product.description || 'Fresh and high-quality product delivered straight to your doorstep.'}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Container>
            <Footer />
        </Box>
    );
};

export default QProductDetails;
