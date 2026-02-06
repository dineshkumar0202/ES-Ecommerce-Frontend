import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Divider,
    Stack,
    Rating,
    Avatar,
    Paper
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../WrapperComponents/Navbar';
import Footer from '../../WrapperComponents/Footer';
import { getProductById, getProductReviews } from '../../../data/productsData';

const ProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(0);
    const [showAllReviews, setShowAllReviews] = useState(false);

    const product = getProductById(Number(id));

    // DEMO: Hydrate reviews with mock images for "All Products" request
    const reviewMockImages = [
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150&h=150&fit=crop",
        "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=150&h=150&fit=crop",
        "https://images.unsplash.com/photo-1574315042633-89a3ee88a6d8?w=150&h=150&fit=crop",
        "https://images.unsplash.com/photo-1555529733-0e670560f7e1?w=150&h=150&fit=crop"
    ];

    const rawReviews = getProductReviews(Number(id));
    const allReviews = rawReviews.map((review, index) => ({
        ...review,
        // If no images exist, assign 1-2 random mock images based on index to verify logic
        images: review.images || reviewMockImages.slice(index % 2, (index % 2) + 2)
    }));

    // Show 3 reviews initially, all when "View More" is clicked
    const displayedReviews = showAllReviews ? allReviews : allReviews.slice(0, 3);

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



    return (
        <Box sx={{ bgcolor: 'white', minHeight: '100vh' }}>
            <Navbar />

            <Container maxWidth="xl" sx={{ mt: 4, mb: 8 }}>
                {/* Product Details Section */}
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mb: 6 }}>

                    {/* Left Column: Images */}
                    <Box sx={{ width: { xs: '100%', md: '40%' }, position: { md: 'sticky' }, top: 100, alignSelf: 'flex-start' }}>
                        <Box
                            sx={{
                                border: '1px solid #e0e0e0',
                                borderRadius: 2,
                                p: 2,
                                mb: 2,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '500px',
                                bgcolor: 'white'
                            }}
                        >
                            <img
                                src={product.images[selectedImage]}
                                alt={product.name}
                                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                            />
                        </Box>

                        {/* Thumbnails */}
                        <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', mb: 4 }}>
                            {product.images.map((img, index) => (
                                <Box
                                    key={index}
                                    onMouseEnter={() => setSelectedImage(index)}
                                    sx={{
                                        width: 60,
                                        height: 60,
                                        border: `2px solid ${selectedImage === index ? '#007185' : '#e0e0e0'}`,
                                        borderRadius: 1,
                                        cursor: 'pointer',
                                        p: 0.5,
                                        '&:hover': { borderColor: '#e47911' }
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
                                startIcon={<ShoppingCartIcon />}
                                sx={{
                                    bgcolor: '#ff9f00',
                                    color: 'white',
                                    py: 2,
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                    '&:hover': { bgcolor: '#f39c12' }
                                }}
                            >
                                Add to Cart
                            </Button>
                            <Button
                                variant="contained"
                                fullWidth
                                startIcon={<FlashOnIcon />}
                                sx={{
                                    bgcolor: '#fb641b',
                                    color: 'white',
                                    py: 2,
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                    '&:hover': { bgcolor: '#e65100' }
                                }}
                            >
                                Buy Now
                            </Button>
                        </Box>
                    </Box>

                    {/* Right Column: Details */}
                    <Box sx={{ width: { xs: '100%', md: '60%' } }}>
                        <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 500, color: '#212121' }}>
                            {product.name}
                        </Typography>

                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                            <Box
                                sx={{
                                    bgcolor: '#388e3c',
                                    color: 'white',
                                    px: 1,
                                    borderRadius: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '0.9rem',
                                    fontWeight: 'bold'
                                }}
                            >
                                {product.rating} ★
                            </Box>
                            <Typography variant="body2" sx={{ color: '#878787', fontWeight: 500 }}>
                                {product.ratingCount.toLocaleString()} Ratings & Reviews
                            </Typography>
                        </Stack>

                        <Typography variant="caption" sx={{ color: '#388e3c', fontWeight: 'bold' }}>
                            Special Price
                        </Typography>

                        <Stack direction="row" alignItems="baseline" spacing={2} sx={{ mb: 2 }}>
                            <Typography variant="h3" sx={{ fontWeight: 600 }}>
                                ₹{product.price.toLocaleString()}
                            </Typography>
                            <Typography variant="h6" sx={{ color: '#878787', textDecoration: 'line-through' }}>
                                ₹{product.mrp.toLocaleString()}
                            </Typography>
                            <Typography variant="h6" sx={{ color: '#388e3c', fontWeight: 'bold' }}>
                                {product.discount}% off
                            </Typography>
                        </Stack>

                        <Box sx={{ mt: 2, mb: 3 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>Available Offers</Typography>
                            <Stack spacing={1}>
                                <Stack direction="row" spacing={1} alignItems="flex-start">
                                    <LocalOfferIcon sx={{ color: '#388e3c', fontSize: 20, mt: 0.2 }} />
                                    <Typography variant="body2">
                                        <b>Bank Offer</b> 5% Unlimited Cashback on Axis Bank Credit Card
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={1} alignItems="flex-start">
                                    <LocalOfferIcon sx={{ color: '#388e3c', fontSize: 20, mt: 0.2 }} />
                                    <Typography variant="body2">
                                        <b>Bank Offer</b> 10% Off on SBI Credit Card, up to ₹1,500
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Box>

                        <Divider sx={{ my: 3 }} />

                        {/* Product Description */}
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>Product Description</Typography>
                            <Typography variant="body1" sx={{ color: '#666' }}>
                                {product.description}
                            </Typography>
                        </Box>

                        <Divider sx={{ my: 3 }} />

                        {/* Specifications/Features */}
                        <Box>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Product Highlights</Typography>
                            <Box component="ul" sx={{ pl: 2 }}>
                                {product.features.map((feature, index) => (
                                    <Box component="li" key={index} sx={{ mb: 1 }}>
                                        <Typography variant="body1">{feature}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>

                        <Divider sx={{ my: 3 }} />

                        <Box sx={{ display: 'flex', gap: 2, border: '1px solid #e0e0e0', p: 2, borderRadius: 1 }}>
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">Brand</Typography>
                                <Typography variant="subtitle1" fontWeight="bold" color="#2874f0">{product.brand}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">Stock Status</Typography>
                                <Typography variant="subtitle1" sx={{ color: product.inStock ? '#388e3c' : '#d32f2f' }}>
                                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                                </Typography>
                            </Box>
                        </Box>

                    </Box>
                </Box>

                {/* Customer Reviews Section */}
                <Box sx={{ mt: 6 }}>
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                        Customer Reviews
                    </Typography>

                    {/* Reviews List */}
                    <Stack spacing={3}>
                        {displayedReviews.map((review) => (
                            <Paper
                                key={review.id}
                                elevation={0}
                                sx={{
                                    p: 3,
                                    border: '1px solid #e0e0e0',
                                    borderRadius: 2,
                                }}
                            >
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    {/* User Avatar */}
                                    <Avatar
                                        sx={{
                                            bgcolor: '#2196f3',
                                            width: 48,
                                            height: 48,
                                            fontSize: '1.25rem',
                                            fontWeight: 600,
                                        }}
                                    >
                                        {review.userName.charAt(0)}
                                    </Avatar>

                                    {/* Review Content */}
                                    <Box sx={{ flex: 1 }}>
                                        {/* User Name and Rating */}
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                                            <Box>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                                                    {review.userName}
                                                </Typography>
                                                <Rating value={review.rating} readOnly size="small" sx={{ color: '#ffb400' }} />
                                            </Box>
                                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                                {new Date(review.date).toLocaleDateString('en-IN', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </Typography>
                                        </Box>

                                        {/* Review Comment */}
                                        <Typography variant="body1" sx={{ mb: 2, color: 'text.primary', lineHeight: 1.6 }}>
                                            {review.comment}
                                        </Typography>

                                        {/* Customer Review Images */}
                                        {review.images && review.images.length > 0 && (
                                            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                                                {review.images.map((img, idx) => (
                                                    <Box
                                                        key={idx}
                                                        component="img"
                                                        src={img}
                                                        alt={`review-img-${idx}`}
                                                        sx={{
                                                            width: 70,
                                                            height: 70,
                                                            borderRadius: 1,
                                                            objectFit: 'cover',
                                                            cursor: 'pointer',
                                                            bgcolor: '#f5f5f5',
                                                            border: '1px solid #eee',
                                                            '&:hover': {
                                                                opacity: 0.9
                                                            }
                                                        }}
                                                    />
                                                ))}
                                            </Stack>
                                        )}

                                        {/* Helpful Button */}
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Button
                                                size="small"
                                                startIcon={<ThumbUpOutlinedIcon />}
                                                sx={{
                                                    color: 'text.secondary',
                                                    textTransform: 'none',
                                                    '&:hover': {
                                                        bgcolor: '#f5f5f5',
                                                    },
                                                }}
                                            >
                                                Helpful ({review.helpful})
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>
                            </Paper>
                        ))}
                    </Stack>

                    {/* View More / Show Less Button */}
                    {allReviews.length > 3 && (
                        <Box sx={{ textAlign: 'center', mt: 3 }}>
                            <Button
                                onClick={() => setShowAllReviews(!showAllReviews)}
                                variant="outlined"
                                size="large"
                                sx={{
                                    px: 4,
                                    py: 1.5,
                                    borderColor: '#212121',
                                    color: '#212121',
                                    fontWeight: 600,
                                    borderRadius: 2,
                                    '&:hover': {
                                        borderColor: '#212121',
                                        bgcolor: '#f5f5f5',
                                    },
                                }}
                            >
                                {showAllReviews ? 'Show Less Reviews' : `View More Reviews (${allReviews.length - 3} more)`}
                            </Button>
                        </Box>
                    )}
                </Box>
            </Container>

            <Footer />
        </Box>
    );
};

export default ProductDetails;
