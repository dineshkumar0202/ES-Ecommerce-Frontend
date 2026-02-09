import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Divider,
    Stack,
    Rating,
    Avatar,
    Paper,
    CircularProgress,
    IconButton,
    TextField,
    Chip
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../WrapperComponents/Navbar';
import Footer from '../../WrapperComponents/Footer';
import { ProductService, CartService, WishlistService } from '../../../services/api';

const ProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [showAllReviews, setShowAllReviews] = useState(false);
    const [rating, setRating] = useState<number | null>(5);
    const [comment, setComment] = useState('');
    const [isSubmittingReview, setIsSubmittingReview] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
            try {
                const { data } = await ProductService.getById(id);
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = async () => {
        try {
            await CartService.addToCart({ productId: product._id, quantity: 1 });
            alert('Added to cart!');
        } catch (error) {
            console.error("Error adding to cart:", error);
            alert('Failed to add to cart. Please login first.');
        }
    };

    const handleToggleWishlist = async () => {
        try {
            if (isFavorite) {
                // Remove logic if needed
            } else {
                await WishlistService.addToWishlist({ productId: product._id });
                setIsFavorite(true);
                alert('Added to wishlist!');
            }
        } catch (error) {
            console.error("Error with wishlist:", error);
        }
    };

    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!rating || !comment) return;
        setIsSubmittingReview(true);
        try {
            await ProductService.createReview(id!, { rating, comment });
            alert('Review submitted!');
            setComment('');
            // Refresh product to show new review
            const { data } = await ProductService.getById(id!);
            setProduct(data);
        } catch (error: any) {
            alert(error.response?.data?.message || 'Failed to submit review');
        } finally {
            setIsSubmittingReview(false);
        }
    };

    if (isLoading) {
        return (
            <Box sx={{ bgcolor: 'white', minHeight: '100vh' }}>
                <Navbar />
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 20 }}>
                    <CircularProgress color="inherit" />
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
                    <Button onClick={() => navigate('/')} sx={{ mt: 2 }}>Go to Home</Button>
                </Container>
                <Footer />
            </Box>
        );
    }

    const reviews = product.reviews || [];
    const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

    return (
        <Box sx={{ bgcolor: 'white', minHeight: '100vh' }}>
            <Navbar />

            <Container maxWidth="xl" sx={{ mt: 4, mb: 8 }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mb: 6 }}>

                    {/* Left Column: Images */}
                    <Box sx={{ width: { xs: '100%', md: '45%' }, position: { md: 'sticky' }, top: 120, alignSelf: 'flex-start' }}>
                        <Box
                            sx={{
                                border: '1px solid #f1f5f9',
                                borderRadius: 4,
                                p: 2,
                                mb: 2,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: { xs: '350px', md: '500px' },
                                bgcolor: '#f8fafc',
                                position: 'relative'
                            }}
                        >
                            <img
                                src={product.images?.[selectedImage] || 'https://via.placeholder.com/600'}
                                alt={product.title}
                                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                            />
                            <IconButton
                                onClick={handleToggleWishlist}
                                sx={{ position: 'absolute', top: 20, right: 20, bgcolor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            >
                                {isFavorite ? <FavoriteIcon sx={{ color: '#ef4444' }} /> : <FavoriteBorderIcon />}
                            </IconButton>
                        </Box>

                        {/* Thumbnails */}
                        <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', mb: 4, overflowX: 'auto', py: 1 }}>
                            {product.images?.map((img: string, index: number) => (
                                <Box
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    sx={{
                                        width: 70,
                                        height: 70,
                                        border: `2px solid ${selectedImage === index ? 'black' : '#e2e8f0'}`,
                                        borderRadius: 2,
                                        cursor: 'pointer',
                                        p: 0.5,
                                        flexShrink: 0,
                                        bgcolor: 'white',
                                        '&:hover': { borderColor: 'black' }
                                    }}
                                >
                                    <img
                                        src={img}
                                        alt={`thumb-${index}`}
                                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                    />
                                </Box>
                            ))}
                        </Stack>

                        {/* Action Buttons */}
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={handleAddToCart}
                                startIcon={<ShoppingCartIcon />}
                                sx={{
                                    bgcolor: '#212121',
                                    color: 'white',
                                    py: 2,
                                    borderRadius: 3,
                                    fontWeight: 800,
                                    textTransform: 'none',
                                    '&:hover': { bgcolor: '#424242' }
                                }}
                            >
                                Add to Cart
                            </Button>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() => navigate('/checkout')}
                                startIcon={<FlashOnIcon />}
                                sx={{
                                    bgcolor: '#bef264',
                                    color: 'black',
                                    py: 2,
                                    borderRadius: 3,
                                    fontWeight: 800,
                                    textTransform: 'none',
                                    '&:hover': { bgcolor: '#d9f99d' }
                                }}
                            >
                                Buy Now
                            </Button>
                        </Box>
                    </Box>

                    {/* Right Column: Details */}
                    <Box sx={{ width: { xs: '100%', md: '55%' } }}>
                        <Typography variant="overline" sx={{ color: '#64748b', fontWeight: 700, letterSpacing: 1.5 }}>
                            {product.category}
                        </Typography>
                        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 900, mb: 2, color: '#0f172a' }}>
                            {product.title}
                        </Typography>

                        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                            <Stack direction="row" alignItems="center" spacing={0.5} sx={{ bgcolor: '#f1f5f9', px: 1.5, py: 0.5, borderRadius: 2 }}>
                                <Rating value={product.rating || 0} readOnly precision={0.5} size="small" />
                                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{product.rating?.toFixed(1)}</Typography>
                            </Stack>
                            <Divider orientation="vertical" flexItem />
                            <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600 }}>
                                {product.numReviews || 0} Reviews
                            </Typography>
                        </Stack>

                        <Stack direction="row" alignItems="baseline" spacing={2} sx={{ mb: 3 }}>
                            <Typography variant="h3" sx={{ fontWeight: 900, color: '#0f172a' }}>
                                ₹{product.price?.toLocaleString()}
                            </Typography>
                            {product.price < (product.price * 1.2) && (
                                <Typography variant="h6" sx={{ color: '#94a3b8', textDecoration: 'line-through' }}>
                                    ₹{(product.price * 1.5).toFixed(0).toLocaleString()}
                                </Typography>
                            )}
                            <Chip label="Free Delivery" sx={{ bgcolor: '#dcfce7', color: '#166534', fontWeight: 800 }} />
                        </Stack>

                        <Divider sx={{ my: 4 }} />

                        <Box sx={{ mb: 4 }}>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 800 }}>Description</Typography>
                            <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.8 }}>
                                {product.description}
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 4, p: 3, bgcolor: '#f8fafc', borderRadius: 4 }}>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 800 }}>Key Specifications</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>Brand</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 700 }}>{product.brand || 'Generic'}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>Stock Status</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 700, color: product.countInStock > 0 ? '#059669' : '#ef4444' }}>
                                        {product.countInStock > 0 ? `In Stock (${product.countInStock})` : 'Out of Stock'}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>

                        <Divider sx={{ my: 4 }} />

                        {/* Customer Reviews Section */}
                        <Box>
                            <Typography variant="h5" sx={{ mb: 4, fontWeight: 900 }}>
                                Customer Reviews
                            </Typography>

                            {/* Add Review Form */}
                            <Paper elevation={0} sx={{ p: 3, mb: 4, border: '1px solid #e2e8f0', borderRadius: 4 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 2 }}>Write a Review</Typography>
                                <form onSubmit={handleSubmitReview}>
                                    <Stack spacing={2}>
                                        <Box>
                                            <Typography variant="caption" sx={{ color: '#64748b', display: 'block', mb: 1 }}>Rating</Typography>
                                            <Rating
                                                value={rating}
                                                onChange={(event, newValue) => setRating(newValue)}
                                                size="large"
                                            />
                                        </Box>
                                        <TextField
                                            label="Your Comment"
                                            multiline
                                            rows={3}
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            fullWidth
                                            variant="outlined"
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                                        />
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            disabled={isSubmittingReview}
                                            sx={{
                                                bgcolor: 'black',
                                                color: 'white',
                                                borderRadius: 3,
                                                py: 1.5,
                                                fontWeight: 700,
                                                '&:hover': { bgcolor: '#333' }
                                            }}
                                        >
                                            {isSubmittingReview ? 'Submitting...' : 'Post Review'}
                                        </Button>
                                    </Stack>
                                </form>
                            </Paper>

                            {/* Reviews List */}
                            <Stack spacing={3}>
                                {displayedReviews.length === 0 ? (
                                    <Typography sx={{ color: '#94a3b8', fontStyle: 'italic' }}>No reviews yet. Be the first to rate this product!</Typography>
                                ) : (
                                    displayedReviews.map((review: any, idx: number) => (
                                        <Paper
                                            key={idx}
                                            elevation={0}
                                            sx={{
                                                p: 3,
                                                border: '1px solid #f1f5f9',
                                                borderRadius: 4,
                                                bgcolor: '#f8fafc'
                                            }}
                                        >
                                            <Box sx={{ display: 'flex', gap: 2 }}>
                                                <Avatar sx={{ bgcolor: '#bef264', color: 'black', fontWeight: 800 }}>
                                                    {review.name?.charAt(0)}
                                                </Avatar>
                                                <Box sx={{ flex: 1 }}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                                        <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{review.name}</Typography>
                                                        <Typography variant="caption" sx={{ color: '#94a3b8' }}>{new Date(review.createdAt).toLocaleDateString()}</Typography>
                                                    </Box>
                                                    <Rating value={review.rating} readOnly size="small" sx={{ mb: 1 }} />
                                                    <Typography variant="body2" sx={{ color: '#444', lineHeight: 1.6 }}>
                                                        {review.comment}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Paper>
                                    ))
                                )}
                            </Stack>

                            {reviews.length > 3 && (
                                <Box sx={{ textAlign: 'center', mt: 4 }}>
                                    <Button
                                        onClick={() => setShowAllReviews(!showAllReviews)}
                                        variant="text"
                                        sx={{ color: 'black', fontWeight: 800, textTransform: 'none' }}
                                    >
                                        {showAllReviews ? 'Show Less' : `View All ${reviews.length} Reviews`}
                                    </Button>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Container>

            <Footer />
        </Box>
    );
};

export default ProductDetails;
