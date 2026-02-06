import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Grid, Paper, Button, Stack } from '@mui/material';
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
                    <Grid container spacing={3}>
                        {relatedProducts.map((product) => (
                            <Grid item xs={12} sm={6} md={3} key={product.id}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 2,
                                        borderRadius: 3,
                                        height: '420px', // STRICT FIXED HEIGHT
                                        display: 'flex',
                                        flexDirection: 'column',
                                        position: 'relative', // For absolute positioning if needed
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-5px)',
                                            boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                                        },
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => navigate(`/product/${product.id}`)}
                                >
                                    <Box
                                        sx={{
                                            position: 'relative',
                                            paddingTop: '100%', // 1:1 Aspect Ratio
                                            width: '100%',
                                            mb: 2,
                                            borderRadius: 2,
                                            overflow: 'hidden',
                                            bgcolor: '#f8f9fa'
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={product.image}
                                            alt={product.name}
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover', // Force fill
                                                transition: 'transform 0.5s ease',
                                                '&:hover': { transform: 'scale(1.1)' }
                                            }}
                                        />
                                    </Box>

                                    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                fontWeight: 600,
                                                mb: 1,
                                                height: '2.6em', // Fixed height for exactly 2 lines
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

                                        <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Box>
                                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                                    ₹{product.price.toLocaleString()}
                                                </Typography>
                                                {product.mrp > product.price && (
                                                    <Typography variant="caption" sx={{ textDecoration: 'line-through', color: '#b2bec3' }}>
                                                        ₹{product.mrp.toLocaleString()}
                                                    </Typography>
                                                )}
                                            </Box>
                                            <Typography variant="caption" sx={{ bgcolor: '#d63031', color: 'white', px: 1, py: 0.5, borderRadius: 1, fontWeight: 700 }}>
                                                {product.discount}% OFF
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
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
