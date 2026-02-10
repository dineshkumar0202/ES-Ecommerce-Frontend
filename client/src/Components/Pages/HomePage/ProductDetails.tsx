import { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Stack,
    Rating,
    IconButton,
    Chip,
    CircularProgress,
    Divider
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import LockIcon from '@mui/icons-material/Lock';

import Navbar from '../../WrapperComponents/Navbar';
import Footer from '../../WrapperComponents/Footer';
import ProductReviews from '../../SpecifiedComponents/Retail/ProductReviews';
import { ProductService, CartService, WishlistService } from '../../../services/api';
import { toast } from 'react-toastify';

const ProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isInWishlist, setIsInWishlist] = useState(false);

    useEffect(() => {
        if (id) {
            fetchProduct(id);
        }
    }, [id]);

    const fetchProduct = async (productId: string) => {
        try {
            const { data } = await ProductService.getById(productId);
            setProduct(data);
        } catch (error) {
            console.error("Error fetching product:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async () => {
        try {
            await CartService.addToCart({ productId: product._id, quantity: 1, type: 'Retail' });
            toast.success("Added to cart");
        } catch (error) {
            console.error(error);
            toast.error("Please login to add to cart");
        }
    };

    const handleBuyNow = async () => {
        if (!localStorage.getItem('token')) {
            toast.error('Please login to buy');
            navigate('/login');
            return;
        }

        try {
            await CartService.addToCart({ productId: product._id, quantity: 1, type: 'Retail' });
            navigate('/checkout', { state: { preferredPaymentMethod: 'Stripe' } });
        } catch (error: any) {
            console.error(error);
            toast.error('Failed to proceed to checkout');
        }
    };

    const handleToggleWishlist = async () => {
        try {
            if (isInWishlist) {
                await WishlistService.removeFromWishlist(product._id);
                setIsInWishlist(false);
                toast.info("Removed from wishlist");
            } else {
                await WishlistService.addToWishlist({ productId: product._id });
                setIsInWishlist(true);
                toast.success("Added to wishlist");
            }
        } catch (error) {
            console.error(error);
            toast.error("Please login to manage wishlist");
        }
    };

    const handleReviewAdded = () => {
        if (id) fetchProduct(id);
    };

    if (loading) {
        return (
            <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'white' }}>
                <Navbar />
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress sx={{ color: 'black' }} />
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
                    <Typography variant="h4">Product Not Found</Typography>
                </Container>
                <Footer />
            </Box>
        );
    }

    // Mock specs for the grid layout
    const specs = [
        { label: 'Brand', value: product.brand || 'Premium Brand' },
        { label: 'Category', value: product.category || 'General' },
        { label: 'Stock Status', value: product.stock > 0 ? 'In Stock' : 'sold out' },
        { label: 'Warranty', value: '2 Year Warranty' },
    ];

    return (
        <Box sx={{ minHeight: '90vh', bgcolor: 'white', color: '#18181b' }}>
            <Navbar />

            <Container maxWidth="xl" sx={{ py: 8 }}>
                {/* CSS Grid Layout - 2 Columns on Desktop */}
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1.2fr 1fr' },
                    gap: 8,
                    mb: 12
                }}>

                    {/* LEFT COLUMN: IMAGES */}
                    <Box>
                        {/* Main Image Stage */}
                        <Box sx={{
                            bgcolor: '#f4f4f5', // Light gray background
                            borderRadius: 4,
                            position: 'relative',
                            overflow: 'hidden',
                            aspectRatio: '1/1',
                            mb: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {/* Badges Overlay */}
                            <Stack direction="row" spacing={1} sx={{ position: 'absolute', bottom: 24, left: 24, zIndex: 2 }}>
                                <Chip label="NEW RELEASE" sx={{ bgcolor: '#d9f99d', color: '#3f6212', fontWeight: 800, borderRadius: 1.5, height: 28, fontSize: '0.7rem' }} />
                                <Chip label="PRO SERIES" sx={{ bgcolor: '#27272a', color: 'white', fontWeight: 800, borderRadius: 1.5, height: 28, fontSize: '0.7rem' }} />
                            </Stack>

                            <IconButton
                                onClick={handleToggleWishlist}
                                sx={{ position: 'absolute', top: 24, right: 24, bgcolor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', '&:hover': { bgcolor: '#f1f5f9' } }}
                            >
                                {isInWishlist ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                            </IconButton>

                            <Box
                                component="img"
                                src={product.images?.[selectedImage] || product.thumbnail || 'https://via.placeholder.com/600'}
                                alt={product.title}
                                sx={{ width: '85%', height: '85%', objectFit: 'contain', filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.15))' }}
                            />
                        </Box>

                        {/* Thumbnails Row */}
                        {product.images?.length > 1 && (
                            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
                                {product.images.map((img: string, index: number) => (
                                    <Box
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        sx={{
                                            bgcolor: '#f4f4f5',
                                            borderRadius: 2,
                                            border: selectedImage === index ? '2px solid #000' : '2px solid transparent',
                                            cursor: 'pointer',
                                            aspectRatio: '1/1',
                                            p: 1,
                                            overflow: 'hidden'
                                        }}
                                    >
                                        <Box component="img" src={img} sx={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </Box>

                    {/* RIGHT COLUMN: INFORMATION */}
                    <Box sx={{ pt: 2 }}>
                        {/* Rating Header */}
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                            <Rating value={product.rating || 0} readOnly size="small" sx={{ color: '#000' }} />
                            <Typography variant="caption" sx={{ fontWeight: 700, color: '#71717a' }}>
                                4.8 ({product.numReviews} Reviews)
                            </Typography>
                        </Stack>

                        {/* Title */}
                        <Typography variant="h2" sx={{
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            lineHeight: 0.95,
                            mb: 1,
                            fontSize: { xs: '2.5rem', md: '3.5rem' },
                            fontFamily: 'sans-serif'
                        }}>
                            {product.title}
                        </Typography>

                        <Typography variant="overline" sx={{ color: '#a1a1aa', fontWeight: 600, letterSpacing: 1.5, display: 'block', mb: 3 }}>
                            SKU: {product._id.substring(0, 8).toUpperCase()} | DESIGNED FOR EXCELLENCE
                        </Typography>

                        {/* Price Section */}
                        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4, p: 2, bgcolor: '#f4f4f5', borderRadius: 3, display: 'inline-flex' }}>
                            <Typography variant="h3" sx={{ fontWeight: 800, color: '#65a30d' }}>
                                ₹{product.price}
                            </Typography>
                            {product.oldPrice && (
                                <>
                                    <Typography variant="h5" sx={{ textDecoration: 'line-through', color: '#a1a1aa', fontWeight: 500 }}>
                                        ₹{product.oldPrice}
                                    </Typography>
                                    <Chip label="SAVE 15%" size="small" sx={{ bgcolor: '#3f6212', color: 'white', fontWeight: 700, borderRadius: 1 }} />
                                </>
                            )}
                        </Stack>

                        <Typography paragraph sx={{ color: '#52525b', fontWeight: 500, lineHeight: 1.7, mb: 4, fontSize: '1.05rem' }}>
                            {product.description}
                        </Typography>

                        {/* Action Buttons */}
                        <Stack direction="row" spacing={2} sx={{ mb: 5 }}>
                            <Button
                                onClick={handleAddToCart}
                                variant="contained"
                                sx={{
                                    bgcolor: '#bef264', // Lime Green accent
                                    color: 'black',
                                    fontWeight: 900,
                                    py: 2.2,
                                    px: 4,
                                    flex: 1,
                                    fontSize: '1rem',
                                    borderRadius: 2,
                                    boxShadow: 'none',
                                    letterSpacing: 1,
                                    '&:hover': { bgcolor: '#a3e635' }
                                }}>
                                ADD TO CART
                            </Button>
                            <Button
                                onClick={handleBuyNow}
                                variant="outlined"
                                sx={{
                                    color: 'black',
                                    borderColor: '#e4e4e7',
                                    fontWeight: 900,
                                    py: 2.2,
                                    px: 4,
                                    flex: 1,
                                    fontSize: '1rem',
                                    borderRadius: 2,
                                    borderWidth: 2,
                                    letterSpacing: 1,
                                    '&:hover': { borderColor: 'black', bgcolor: 'transparent' }
                                }}>
                                BUY NOW
                            </Button>
                        </Stack>

                        {/* Payment Methods */}
                        <Box sx={{ mb: 5, p: 2.5, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #f4f4f5' }}>
                            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                                <LockIcon sx={{ fontSize: 16, color: '#16a34a' }} />
                                <Typography variant="caption" sx={{ fontWeight: 800, color: '#16a34a', letterSpacing: 0.5, textTransform: 'uppercase' }}>
                                    Guaranteed Safe Checkout
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
                                {['VISA', 'MASTERCARD', 'PAYPAL', 'UPI', 'RUPAY'].map((method) => (
                                    <Box key={method} sx={{
                                        border: '1px solid #e4e4e7',
                                        borderRadius: 1.5,
                                        px: 2,
                                        py: 1,
                                        bgcolor: 'white',
                                        fontWeight: 900,
                                        fontSize: '0.7rem',
                                        color: '#3f3f46',
                                        letterSpacing: 1,
                                        boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
                                    }}>
                                        {method}
                                    </Box>
                                ))}
                            </Stack>
                        </Box>

                        {/* Trust Badges */}
                        <Stack direction="row" spacing={3} sx={{ mb: 5, color: '#71717a' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <VerifiedUserOutlinedIcon fontSize="small" />
                                <Typography variant="caption" fontWeight={600}>2 Year Warranty</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LocalShippingOutlinedIcon fontSize="small" />
                                <Typography variant="caption" fontWeight={600}>Free Express Shipping</Typography>
                            </Box>
                        </Stack>

                        {/* Specs Grid */}
                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                            {specs.map((spec, i) => (
                                <Box key={i} sx={{ bgcolor: '#f4f4f5', p: 2.5, borderRadius: 2 }}>
                                    <Typography variant="caption" sx={{ fontWeight: 800, color: '#a1a1aa', display: 'block', mb: 0.5, letterSpacing: 0.5 }}>
                                        {spec.label.toUpperCase()}
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.95rem' }}>
                                        {spec.value}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>

                <Divider sx={{ mb: 8 }} />

                {/* Reviews Section */}
                <Box>
                    <ProductReviews
                        productId={product._id}
                        reviews={product.reviews || []}
                        averageRating={product.rating || 0}
                        totalReviews={product.numReviews || 0}
                        onReviewAdded={handleReviewAdded}
                    />
                </Box>
            </Container>

            <Footer />
        </Box>
    );
};

export default ProductDetails;
