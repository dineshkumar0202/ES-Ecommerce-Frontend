import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Card, CardContent, CardMedia, Rating, IconButton, CircularProgress, Stack, Button } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Navbar from '../WrapperComponents/Navbar';
import Footer from '../WrapperComponents/Footer';
import { ProductService, CartService } from '../../services/api';

const CategoryPage = () => {
    const { categoryName } = useParams<{ categoryName: string }>();
    const navigate = useNavigate();
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            setIsLoading(true);
            try {
                const { data } = await ProductService.getAll({ category: categoryName });

                // If the backend doesn't filter by query, filter here
                const filtered = data.filter((p: any) =>
                    p.category.toLowerCase() === categoryName?.toLowerCase().replace(/-/g, ' ') ||
                    p.category.toLowerCase().includes(categoryName?.toLowerCase() || '')
                );

                setProducts(filtered);
            } catch (error) {
                console.error("Error fetching category products:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCategoryProducts();
    }, [categoryName]);

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            <Container maxWidth="xl" sx={{ flex: 1, py: 6 }}>
                <Box sx={{ mb: 6, textAlign: 'center' }}>
                    <Typography variant="overline" sx={{ color: '#64748b', fontWeight: 800, letterSpacing: 2 }}>
                        COLLECTION
                    </Typography>
                    <Typography variant="h2" sx={{ fontWeight: 900, color: '#0f172a', mb: 2, textTransform: 'capitalize' }}>
                        {categoryName?.replace(/-/g, ' ')}
                    </Typography>
                </Box>

                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                        <CircularProgress color="inherit" />
                    </Box>
                ) : products.length > 0 ? (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
                        {products.map((product) => (
                            <Box
                                key={product._id}
                                sx={{
                                    width: { xs: '100%', sm: 'calc(50% - 24px)', md: 'calc(33.33% - 24px)', lg: 'calc(25% - 24px)' },
                                    mb: 2
                                }}
                            >
                                <Card
                                    onClick={() => navigate(`/product/${product._id}`)}
                                    sx={{
                                        border: 'none',
                                        boxShadow: 'none',
                                        bgcolor: 'white',
                                        borderRadius: 5,
                                        p: 2,
                                        cursor: 'pointer',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        '&:hover': {
                                            transform: 'translateY(-10px)',
                                            boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
                                        },
                                        '&:hover .product-image': {
                                            transform: 'scale(1.05)',
                                        },
                                    }}
                                >
                                    <Box sx={{ position: 'relative', borderRadius: 4, overflow: 'hidden', mb: 2, pt: '100%', width: '100%' }}>
                                        <CardMedia
                                            component="img"
                                            image={product.images?.[0] || 'https://via.placeholder.com/400'}
                                            alt={product.title}
                                            className="product-image"
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                transition: 'transform 0.6s ease',
                                                bgcolor: '#f1f5f9',
                                                objectFit: 'cover',
                                            }}
                                        />
                                        <IconButton
                                            sx={{
                                                position: 'absolute',
                                                top: 15,
                                                right: 15,
                                                bgcolor: 'white',
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                                '&:hover': { bgcolor: 'white', color: '#ef4444' },
                                            }}
                                            size="small"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <FavoriteBorderIcon fontSize="small" />
                                        </IconButton>
                                    </Box>

                                    <CardContent sx={{ p: 1 }}>
                                        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>
                                            {product.category}
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 800,
                                                mt: 0.5,
                                                mb: 1,
                                                height: '2.8rem',
                                                overflow: 'hidden',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                lineHeight: 1.2
                                            }}
                                        >
                                            {product.title}
                                        </Typography>

                                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                                            <Rating value={product.rating || 0} readOnly size="small" precision={0.5} />
                                            <Typography variant="caption" sx={{ fontWeight: 600, color: '#64748b' }}>
                                                ({product.numReviews || 0})
                                            </Typography>
                                        </Stack>

                                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                                            <Typography variant="h5" sx={{ fontWeight: 900 }}>
                                                ₹{product.price?.toLocaleString()}
                                            </Typography>
                                            <IconButton
                                                sx={{
                                                    bgcolor: '#212121',
                                                    color: 'white',
                                                    '&:hover': { bgcolor: 'black' },
                                                    borderRadius: 2
                                                }}
                                                size="small"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    CartService.addToCart({ productId: product._id, quantity: 1 });
                                                }}
                                            >
                                                <ShoppingCartOutlinedIcon fontSize="small" />
                                            </IconButton>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Box>
                        ))}
                    </Box>
                ) : (
                    <Box sx={{ textAlign: 'center', py: 10, bgcolor: 'white', borderRadius: 6 }}>
                        <Typography variant="h5" sx={{ color: '#94a3b8', mb: 3, fontWeight: 700 }}>No products found in this category.</Typography>
                        <Button
                            variant="contained"
                            onClick={() => navigate('/retail')}
                            sx={{ bgcolor: 'black', color: 'white', px: 4, py: 1.5, borderRadius: 3, fontWeight: 700 }}
                        >
                            Back to Retail
                        </Button>
                    </Box>
                )}
            </Container>

            <Footer />
        </Box>
    );
};

export default CategoryPage;
