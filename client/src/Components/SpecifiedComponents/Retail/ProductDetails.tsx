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
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
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
    const [showFullDescription, setShowFullDescription] = useState(false);

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
            navigate('/checkout', { state: { preferredPaymentMethod: 'Razorpay' } });
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
                await WishlistService.addToWishlist({ productId: product._id, type: 'retail' });
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
                    gridTemplateColumns: { xs: '1fr', md: '0.8fr 1.2fr' },
                    gap: { xs: 4, md: 8 },
                    mb: 10
                }}>

                    {/* LEFT COLUMN: INFORMATION */}
                    <Box sx={{ pt: { md: 2 } }}>
                        {/* Breadcrumbs (Moved inside column for alignment) */}
                        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, mb: 1, display: 'block', textTransform: 'uppercase', letterSpacing: 1 }}>
                            Home / {product.category || 'Furniture'} / {product.subCategory || 'Lounge'}
                        </Typography>

                        {/* Title */}
                        <Typography variant="h4" sx={{
                            fontWeight: 900,
                            lineHeight: 1.2,
                            mb: 2,
                            fontSize: { xs: '1.5rem', md: '2rem' }, // Significantly smaller title
                            color: '#1a202c',
                            fontFamily: 'serif'
                        }}>
                            {product.title}
                        </Typography>

                        {/* Price Badge */}
                        <Box sx={{ display: 'inline-block', bgcolor: '#b4d5dc', px: 2, py: 0.5, borderRadius: 5, mb: 4 }}>
                            <Typography variant="h6" sx={{ fontWeight: 800, color: '#1a202c' }}>
                                ₹{(Number(product?.price ?? product?.pricePerUnit ?? 0) || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </Typography>
                        </Box>

                        {/* Specs Grid - Moved here */}
                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: x => x.spacing(4, 8), mb: 6 }}>
                            <Box>
                                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, display: 'block', mb: 1 }}>Material</Typography>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1e293b' }}>Premium Ash Wood</Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, display: 'block', mb: 1 }}>Dimensions</Typography>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1e293b' }}>85cm x 75cm x 90cm</Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, display: 'block', mb: 1 }}>Warranty</Typography>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1e293b' }}>10 Year Structure</Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, display: 'block', mb: 1 }}>Delivery</Typography>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1e293b' }}>White-glove service</Typography>
                            </Box>
                        </Box>

                        {/* Actions */}
                        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 6 }}>
                            {/* Quantity Counter */}
                            <Stack direction="row" alignItems="center" spacing={2} sx={{ bgcolor: '#f8fafc', borderRadius: 3, px: 2, py: 1 }}>
                                <Typography sx={{ cursor: 'pointer', fontWeight: 600, color: '#94a3b8', fontSize: '0.9rem' }}>-</Typography>
                                <Typography sx={{ fontWeight: 800, fontSize: '0.9rem' }}>1</Typography>
                                <Typography sx={{ cursor: 'pointer', fontWeight: 600, color: '#94a3b8', fontSize: '0.9rem' }}>+</Typography>
                            </Stack>

                            <Button
                                onClick={handleAddToCart}
                                variant="contained"
                                size="small"
                                sx={{
                                    bgcolor: '#b4d5dc',
                                    color: '#1a202c',
                                    fontWeight: 800,
                                    py: 1,
                                    px: 3,
                                    borderRadius: 3,
                                    boxShadow: 'none',
                                    letterSpacing: 0.5,
                                    fontSize: '0.85rem',
                                    '&:hover': { bgcolor: '#9bbec9', boxShadow: 'none' }
                                }}>
                                ADD TO CART
                            </Button>
                            <Button
                                onClick={handleBuyNow}
                                variant="outlined"
                                size="small"
                                sx={{
                                    borderColor: '#1a202c',
                                    color: '#1a202c',
                                    fontWeight: 800,
                                    py: 1,
                                    px: 3,
                                    borderRadius: 3,
                                    borderWidth: 2,
                                    letterSpacing: 0.5,
                                    fontSize: '0.85rem',
                                    '&:hover': { bgcolor: 'transparent', borderColor: '#1a202c', borderWidth: 2 }
                                }}>
                                BUY NOW
                            </Button>
                        </Stack>

                        {/* Description */}
                        <Box sx={{ mb: 6 }}>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: '#64748b',
                                    lineHeight: 1.8,
                                    fontWeight: 500,
                                    display: '-webkit-box',
                                    overflow: 'hidden',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: showFullDescription ? 'unset' : 3,
                                    textOverflow: 'ellipsis',
                                    mb: 1
                                }}
                            >
                                {product.description || "An iconic statement piece blending mid-century fluid aesthetics with contemporary ergonomic engineering. Crafted for the modern workspace or living sanctuary."}
                            </Typography>
                            <Typography
                                onClick={() => setShowFullDescription(!showFullDescription)}
                                variant="body2"
                                sx={{
                                    color: '#1a202c',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                    display: 'inline-block'
                                }}
                            >
                                {showFullDescription ? 'See Less' : 'See More'}
                            </Typography>
                        </Box>







                        {/* Footer Badges */}
                        <Stack direction="row" spacing={4}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <VerifiedUserOutlinedIcon sx={{ fontSize: 16, color: '#b4d5dc' }} />
                                <Typography variant="caption" sx={{ fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5 }}>Certified Quality</Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <LocalShippingOutlinedIcon sx={{ fontSize: 16, color: '#b4d5dc' }} />
                                <Typography variant="caption" sx={{ fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5 }}>Free Worldwide Shipping</Typography>
                            </Stack>
                        </Stack>
                    </Box>

                    {/* RIGHT COLUMN: IMAGES */}
                    <Box sx={{ display: 'flex', gap: 3, height: '600px' }}>
                        {/* Vertical Thumbnails */}
                        <Stack spacing={2} sx={{ width: 80, overflowY: 'auto', py: 1, '&::-webkit-scrollbar': { display: 'none' } }}>
                            {(product.images?.length > 0 ? product.images : [product.thumbnail, product.thumbnail, product.thumbnail, product.thumbnail]).map((img: string, index: number) => (
                                <Box
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: 3,
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        border: selectedImage === index ? '2px solid #1e293b' : '2px solid transparent',
                                        opacity: selectedImage === index ? 1 : 0.6,
                                        transition: 'all 0.2s',
                                        flexShrink: 0
                                    }}
                                >
                                    <Box component="img" src={img} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </Box>
                            ))}
                        </Stack>

                        {/* Image Container */}
                        <Box sx={{
                            flex: 1,
                            bgcolor: 'transparent', // Removed background color
                            borderRadius: 6,
                            position: 'relative',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <IconButton
                                onClick={handleToggleWishlist}
                                sx={{ position: 'absolute', top: 24, right: 24, bgcolor: 'white', ml: 'auto', width: 44, height: 44, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', '&:hover': { bgcolor: '#f8fafc' } }}
                            >
                                {isInWishlist ? <FavoriteIcon sx={{ color: '#ef4444' }} /> : <FavoriteBorderIcon />}
                            </IconButton>

                            <Box
                                component="img"
                                src={product.images?.[selectedImage] || product.thumbnail || 'https://via.placeholder.com/600'}
                                alt={product.title}
                                sx={{
                                    width: '80%',
                                    height: 'auto',
                                    maxHeight: '80%',
                                    objectFit: 'contain',
                                    filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))'
                                }}
                            />

                            <IconButton
                                sx={{ position: 'absolute', bottom: 24, right: 24, bgcolor: 'white', ml: 'auto', width: 44, height: 44, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', '&:hover': { bgcolor: '#f8fafc' } }}
                            >
                                <CameraAltOutlinedIcon sx={{ color: 'black' }} />
                            </IconButton>
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
