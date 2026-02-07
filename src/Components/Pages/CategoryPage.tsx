import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Card, CardContent, CardMedia, Button, Rating, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Navbar from '../WrapperComponents/Navbar';
import Footer from '../WrapperComponents/Footer';
import { allProducts } from '../../data/productsData';

const CategoryPage = () => {
    const { categoryName } = useParams<{ categoryName: string }>();
    const navigate = useNavigate();

    // Logic to filter products based on the category name from URL
    const filterProducts = () => {
        if (!categoryName) return [];
        const term = categoryName.toLowerCase();

        let filtered = allProducts.filter(product => {
            const cat = product.category.toLowerCase();
            const name = product.name.toLowerCase();

            // Map specific UI terms to data categories
            if (term === 'home appliances' && cat === 'home') return true;
            if (term === 'stationary' && (cat === 'stationary' || name.includes('pen') || name.includes('book'))) return true;
            if (term === 'makeup' && (cat === 'beauty' || name.includes('lipstick'))) return true;
            if (term === 'bag' && (cat === 'bag' || name.includes('bag') || name.includes('luggage'))) return true;


            return cat.includes(term) || name.includes(term) || cat === term;
        });

        // Special handling for Fruits & Veg: Exact 4 items, no mocks
        if (term === 'fruits-veg' || term === 'fruits & veg') {
            return filtered.slice(0, 4);
        }

        // ENFORCE EXACTLY 8 PRODUCTS (Fill with mocks if needed)
        const targetCount = 8;

        if (filtered.length < targetCount) {
            const needed = targetCount - filtered.length;
            const mocks = Array.from({ length: needed }).map((_, i) => ({
                id: 99000 + i, // Unique IDs for mocks
                name: `${categoryName} Best Seller ${i + 1}`,
                category: categoryName || 'Generic',
                price: Math.floor(Math.random() * 5000) + 999,
                mrp: Math.floor(Math.random() * 8000) + 6000,
                discount: Math.floor(Math.random() * 40) + 10,
                rating: 4.0 + (Math.random() * 1),
                ratingCount: Math.floor(Math.random() * 500) + 50, // More realistic count
                description: `High quality ${categoryName} for your needs.`,
                features: [],
                brand: "Premium Selection",
                inStock: true,
                image: getCategoryMockImage(term, i),
                images: []
            }));
            filtered = [...filtered, ...mocks];
        } else if (filtered.length > targetCount) {
            filtered = filtered.slice(0, targetCount);
        }

        return filtered;
    };

    // Helper to get consistent attractive mock images
    const getCategoryMockImage = (term: string, index: number) => {
        // ... (Helper remains same, but verifying access)
        const keywords: Record<string, string> = {
            'fitness': 'gym',
            'watches': 'wrist-watch',
            'sneakers': 'sneakers',
            'toys': 'toys',
            'kitchen': 'cookware',
            'makeup': 'cosmetics',
            'stationary': 'stationery',
            'bag': 'handbag',
            'electronics': 'gadget',
            'home': 'furniture' // Better keyword
        };
        const keyword = Object.keys(keywords).find(k => term.includes(k)) || term;
        // Use unsplash source with sig to ensure variety
        return `https://source.unsplash.com/400x400/?${keywords[keyword] || keyword}&sig=${index + Date.now()}`;
    };

    const relatedProducts = filterProducts();

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            <Container maxWidth="xl" sx={{ flex: 1, py: 4 }}>
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ fontWeight: 800, color: '#2d3436', mb: 1 }}>
                        {categoryName?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Collection
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#636e72' }}>
                        Hand-picked products just for you
                    </Typography>
                </Box>

                {relatedProducts.length > 0 ? (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
                        {relatedProducts.map((product) => (
                            <Box
                                key={product.id}
                                sx={{
                                    width: { xs: '100%', sm: 'calc(50% - 24px)', md: 'calc(33.33% - 24px)', lg: 'calc(25% - 24px)' },
                                    mb: 2
                                }}
                            >
                                <Card
                                    onClick={() => navigate(`/product/${product.id}`)}
                                    sx={{
                                        border: 'none',
                                        boxShadow: 'none',
                                        bgcolor: '#f8f9fa',
                                        borderRadius: 4,
                                        p: 2,
                                        cursor: 'pointer',
                                        height: '420px', // STRICT 420px HEIGHT
                                        display: 'flex',
                                        flexDirection: 'column',
                                        transition: 'transform 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            bgcolor: '#f1f3f5',
                                        },
                                        '&:hover .product-image': {
                                            transform: 'scale(1.02)', // MINIMIZED ZOOM
                                        },
                                    }}
                                >
                                    <Box sx={{ position: 'relative', borderRadius: 4, overflow: 'hidden', mb: 2, pt: '100%', width: '100%' }}>
                                        <CardMedia
                                            component="img"
                                            image={product.image}
                                            alt={product.name}
                                            className="product-image"
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                transition: 'transform 0.5s ease',
                                                bgcolor: '#f5f5f5',
                                                objectFit: 'cover',
                                            }}
                                        />
                                        <IconButton
                                            sx={{
                                                position: 'absolute',
                                                top: 10,
                                                right: 10,
                                                bgcolor: 'white',
                                                '&:hover': { bgcolor: 'white', color: '#e91e63' },
                                            }}
                                            size="small"
                                        >
                                            <FavoriteBorderIcon fontSize="small" />
                                        </IconButton>
                                    </Box>

                                    <CardContent sx={{ p: 1, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5, textTransform: 'uppercase' }}>
                                            {product.category}
                                        </Typography>
                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                fontWeight: 'bold',
                                                fontSize: '1.1rem', // INCREASED FONT SIZE
                                                mb: 0.5,
                                                height: '2.6em',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                lineHeight: '1.3em'
                                            }}
                                        >
                                            {product.name}
                                        </Typography>

                                        <Box sx={{ mt: 'auto' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                <Rating value={product.rating} readOnly size="small" sx={{ color: '#ffb400', mr: 0.5 }} />
                                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                                    ({product.ratingCount})
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <Box>
                                                    <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.3rem' }}> {/* INCREASED FONT SIZE */}
                                                        ₹{product.price.toLocaleString()}
                                                    </Typography>
                                                    {product.mrp > product.price && (
                                                        <Typography variant="caption" sx={{ textDecoration: 'line-through', color: '#b2bec3' }}>
                                                            ₹{product.mrp.toLocaleString()}
                                                        </Typography>
                                                    )}
                                                </Box>
                                                <IconButton
                                                    sx={{
                                                        bgcolor: '#212121',
                                                        color: 'white',
                                                        '&:hover': { bgcolor: '#424242' },
                                                    }}
                                                    size="small"
                                                >
                                                    <ShoppingCartOutlinedIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Box>
                        ))}
                    </Box>
                ) : (
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                        <Typography variant="h5" sx={{ color: '#b2bec3', mb: 2 }}>No products found in this category.</Typography>
                        <Button variant="contained" onClick={() => navigate('/')}>Back to Home</Button>
                    </Box>
                )}
            </Container>

            <Footer />
        </Box>
    );
};

export default CategoryPage;
