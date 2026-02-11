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
        <Box sx={{ minHeight: '90vh', bgcolor: 'white', color: '#1a202c' }}>
            <Navbar />

            <Container maxWidth="xl" sx={{ py: 4 }}>
                {/* Breadcrumbs */}
                <Stack direction="row" spacing={1} sx={{ mb: 4, opacity: 0.6 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, cursor: 'pointer', '&:hover': { color: 'black' } }} onClick={() => navigate('/')}>Home</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>/</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 600, cursor: 'pointer', '&:hover': { color: 'black' } }}>{product.category || 'Women\'s Fashion'}</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>/</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: 'black' }}>{product.title}</Typography>
                </Stack>

                {/* Main Product Section */}
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1.2fr 1fr' },
                    gap: { xs: 4, md: 8 },
                    mb: 10
                }}>

                    {/* LEFT COLUMN: IMAGES */}
                    <Box>
                        {/* Main Image Stage */}
                        <Box sx={{
                            bgcolor: '#f8fafc',
                            borderRadius: 4,
                            position: 'relative',
                            overflow: 'hidden',
                            aspectRatio: '1/1.1',
                            mb: 3,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid #f1f5f9'
                        }}>
                            {/* Badges Overlay */}
                            <Stack spacing={1} sx={{ position: 'absolute', top: 24, left: 24, zIndex: 2 }}>
                                <Chip label="NEW RELEASE" sx={{ bgcolor: '#d1e6eb', color: '#1a202c', fontWeight: 800, borderRadius: 1.5, height: 26, fontSize: '0.65rem' }} />
                                <Chip label="PRO SERIES" sx={{ bgcolor: 'black', color: 'white', fontWeight: 800, borderRadius: 1.5, height: 26, fontSize: '0.65rem' }} />
                            </Stack>

                            <IconButton
                                onClick={handleToggleWishlist}
                                sx={{ position: 'absolute', top: 24, right: 24, bgcolor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', '&:hover': { bgcolor: '#f8fafc' } }}
                            >
                                {isInWishlist ? <FavoriteIcon sx={{ color: '#ef4444' }} /> : <FavoriteBorderIcon />}
                            </IconButton>

                            <Box
                                component="img"
                                src={product.images?.[selectedImage] || product.thumbnail || 'https://via.placeholder.com/600'}
                                alt={product.title}
                                sx={{ width: '90%', height: '90%', objectFit: 'contain' }}
                            />
                        </Box>

                        {/* Thumbnails Row */}
                        <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 1, '&::-webkit-scrollbar': { display: 'none' } }}>
                            {(product.images?.length > 0 ? product.images : [product.thumbnail]).map((img: string, index: number) => (
                                <Box
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    sx={{
                                        minWidth: '80px',
                                        height: '80px',
                                        bgcolor: '#f8fafc',
                                        borderRadius: 2,
                                        border: selectedImage === index ? '2px solid #adc9d1' : '1px solid #f1f5f9',
                                        cursor: 'pointer',
                                        p: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    <Box component="img" src={img} sx={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    {/* RIGHT COLUMN: INFORMATION */}
                    <Box sx={{ pt: { md: 2 } }}>
                        {/* Rating Header */}
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                            <Rating value={product.rating || 0} readOnly size="small" sx={{ color: '#fbbf24' }} />
                            <Typography variant="caption" sx={{ fontWeight: 700, color: '#718096' }}>
                                {product.rating?.toFixed(1) || '0.0'} ({product.numReviews || 0} Reviews)
                            </Typography>
                        </Stack>

                        {/* Title */}
                        <Typography variant="h3" sx={{
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            lineHeight: 1.1,
                            mb: 2,
                            fontSize: { xs: '2rem', md: '2.5rem' },
                            color: '#1a202c'
                        }}>
                            {product.title}
                        </Typography>

                        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800, letterSpacing: 1, display: 'block', mb: 4 }}>
                            SKU: {product._id?.substring(0, 8).toUpperCase() || 'N/A'} &nbsp; • &nbsp; DESIGNED FOR EXCELLENCE
                        </Typography>

                        {/* Price Section */}
                        <Box sx={{ mb: 4, p: 3, bgcolor: '#f8fafc', borderRadius: 3, border: '1px solid #f1f5f9' }}>
                            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1.5 }}>
                                <Typography variant="h3" sx={{ fontWeight: 800, color: '#1a202c' }}>
                                    ₹{product.price}
                                </Typography>
                                {product.oldPrice && (
                                    <>
                                        <Typography variant="h5" sx={{ textDecoration: 'line-through', color: '#cbd5e1', fontWeight: 600 }}>
                                            ₹{product.oldPrice}
                                        </Typography>
                                        <Chip label={`${Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF`} size="small" sx={{ bgcolor: '#f0fff4', color: '#38a169', fontWeight: 800, borderRadius: 1 }} />
                                    </>
                                )}
                            </Stack>
                            <Typography variant="body2" sx={{ color: '#718096', lineHeight: 1.6, fontStyle: 'italic' }}>
                                {product.description}
                            </Typography>
                        </Box>

                        {/* Action Buttons */}
                        <Stack direction="row" spacing={2} sx={{ mb: 5 }}>
                            <Button
                                onClick={handleAddToCart}
                                variant="contained"
                                sx={{
                                    bgcolor: '#adc9d1',
                                    color: '#1a202c',
                                    fontWeight: 800,
                                    py: 1.8,
                                    flex: 1,
                                    borderRadius: 3,
                                    boxShadow: 'none',
                                    '&:hover': { bgcolor: '#9bbec9', boxShadow: 'none' }
                                }}>
                                ADD TO CART
                            </Button>
                            <Button
                                onClick={handleBuyNow}
                                variant="outlined"
                                sx={{
                                    color: '#1a202c',
                                    borderColor: '#e2e8f0',
                                    fontWeight: 800,
                                    py: 1.8,
                                    flex: 1,
                                    borderRadius: 3,
                                    borderWidth: '1.5px',
                                    '&:hover': { borderColor: '#1a202c', bgcolor: 'transparent', borderWidth: '1.5px' }
                                }}>
                                BUY NOW
                            </Button>
                        </Stack>

                        {/* Trust & Payment section */}
                        <Box sx={{ mb: 4, p: 3, bgcolor: '#f8fafc', borderRadius: 3, border: '1px solid #f1f5f9' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, color: '#38a169' }}>
                                <LockIcon sx={{ fontSize: 16 }} />
                                <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase' }}>
                                    Guaranteed Safe Checkout
                                </Typography>
                            </Box>

                            <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
                                {['VISA', 'MASTERCARD', 'PAYPAL', 'UPI', 'RUPAY'].map((method) => (
                                    <Box key={method} sx={{
                                        border: '1px solid #e2e8f0',
                                        borderRadius: 1.5,
                                        px: 1.5,
                                        py: 0.8,
                                        bgcolor: 'white',
                                        fontWeight: 800,
                                        fontSize: '0.6rem',
                                        color: '#64748b'
                                    }}>
                                        {method}
                                    </Box>
                                ))}
                            </Stack>

                            <Stack direction="row" spacing={3} sx={{ color: '#64748b' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <VerifiedUserOutlinedIcon sx={{ fontSize: 16 }} />
                                    <Typography variant="caption" sx={{ fontWeight: 700 }}>2 Year Warranty</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <LocalShippingOutlinedIcon sx={{ fontSize: 16 }} />
                                    <Typography variant="caption" sx={{ fontWeight: 700 }}>Free Express Shipping</Typography>
                                </Box>
                            </Stack>
                        </Box>

                        {/* Specs Grid */}
                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                            {specs.map((spec, i) => (
                                <Box key={i} sx={{ bgcolor: '#f8fafc', p: 2.5, borderRadius: 2, border: '1px solid #f1f5f9' }}>
                                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#94a3b8', display: 'block', mb: 0.5 }}>
                                        {spec.label.toUpperCase()}
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 800 }}>
                                        {spec.value}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>

                <Divider sx={{ mb: 8, borderColor: '#f1f5f9' }} />

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
