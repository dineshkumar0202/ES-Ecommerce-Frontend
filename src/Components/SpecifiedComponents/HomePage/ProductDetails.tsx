import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Rating,
    Divider,
    Stack,
    IconButton,
    Paper
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Navbar from '../../WrapperComponents/Navbar';
import Footer from '../../WrapperComponents/Footer';

// Mock Data
const productData = {
    id: 1,
    title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones, 30 Hours Battery Life - Black",
    rating: 4.5,
    ratingCount: 12453,
    price: 29990,
    mrp: 34990,
    discount: 14,
    images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1572569028738-411a508d09e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    features: [
        "Industry Leading Noise Cancellation",
        "Magnificent Sound, engineered to perfection",
        "Crystal clear hands-free calling",
        "Up to 30-hour battery life with quick charging (3 min charge for 3 hours of playback)",
        "Ultra-comfortable, lightweight design with soft fit leather"
    ]
};

const ProductDetails = () => {
    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <Box sx={{ bgcolor: 'white', minHeight: '100vh' }}>
            <Navbar />

            <Container maxWidth="xl" sx={{ mt: 4, mb: 8 }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>

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
                                src={productData.images[selectedImage]}
                                alt={productData.title}
                                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                            />
                        </Box>

                        {/* Thumbnails */}
                        <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', mb: 4 }}>
                            {productData.images.map((img, index) => (
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
                            {productData.title}
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
                                {productData.rating} ★
                            </Box>
                            <Typography variant="body2" sx={{ color: '#878787', fontWeight: 500 }}>
                                {productData.ratingCount.toLocaleString()} Ratings & Reviews
                            </Typography>
                        </Stack>

                        <Typography variant="caption" sx={{ color: '#388e3c', fontWeight: 'bold' }}>
                            Special Price
                        </Typography>

                        <Stack direction="row" alignItems="baseline" spacing={2} sx={{ mb: 2 }}>
                            <Typography variant="h3" sx={{ fontWeight: 600 }}>
                                ₹{productData.price.toLocaleString()}
                            </Typography>
                            <Typography variant="h6" sx={{ color: '#878787', textDecoration: 'line-through' }}>
                                ₹{productData.mrp.toLocaleString()}
                            </Typography>
                            <Typography variant="h6" sx={{ color: '#388e3c', fontWeight: 'bold' }}>
                                {productData.discount}% off
                            </Typography>
                        </Stack>

                        <Box sx={{ mt: 2, mb: 3 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>Available Offers</Typography>
                            <Stack spacing={1}>
                                <Stack direction="row" spacing={1} alignItems="flex-start">
                                    <LocalOfferIcon sx={{ color: '#388e3c', fontSize: 20, mt: 0.2 }} />
                                    <Typography variant="body2">
                                        <b>Bank Offer</b> 5% Unlimited Cashback on Flipkart Axis Bank Credit Card
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

                        {/* Specifications/Features */}
                        <Box>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Product Highlights</Typography>
                            <Box component="ul" sx={{ pl: 2 }}>
                                {productData.features.map((feature, index) => (
                                    <Box component="li" key={index} sx={{ mb: 1 }}>
                                        <Typography variant="body1">{feature}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>

                        <Divider sx={{ my: 3 }} />

                        <Box sx={{ display: 'flex', gap: 2, border: '1px solid #e0e0e0', p: 2, borderRadius: 1 }}>
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">Seller</Typography>
                                <Typography variant="subtitle1" fontWeight="bold" color="#2874f0">RetailNet</Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">Warranty</Typography>
                                <Typography variant="subtitle1">1 Year Manufacturer Warranty</Typography>
                            </Box>
                        </Box>

                    </Box>
                </Box>
            </Container>

            <Footer />
        </Box>
    );
};

export default ProductDetails;
