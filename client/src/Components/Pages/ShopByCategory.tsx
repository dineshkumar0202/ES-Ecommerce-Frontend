import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Card, CardContent, CardMedia, Rating, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Navbar from '../WrapperComponents/Navbar';
import Footer from '../WrapperComponents/Footer';
import { ProductService } from '../../services/api';
import { useState, useEffect } from 'react';

const ShopByCategory = () => {
    const navigate = useNavigate();

    const [displayProducts, setDisplayProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const { data } = await ProductService.getAll();
                let products = [];
                if (Array.isArray(data)) {
                    products = data;
                } else if (data.products) {
                    products = data.products;
                }

                // Filter or select specific products if needed, otherwise show all or a subset
                // For now, let's just show the first 8 products to match the previous behavior of showing a subset
                setDisplayProducts(products.slice(0, 8));
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <Box sx={{ bgcolor: 'white', minHeight: '100vh' }}>
            <Navbar />

            <Container maxWidth="xl" sx={{ mt: 4, mb: 8 }}>
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                        Shop By Category
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        Essentials across Beauty, Grocery, Pets, and Automotive
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
                    {displayProducts.map((product) => (
                        <Box
                            key={product._id || product.id}
                            sx={{
                                width: { xs: '100%', sm: 'calc(50% - 24px)', md: 'calc(33.33% - 24px)', lg: 'calc(25% - 24px)' },
                                mb: 2
                            }}
                        >
                            <Card
                                onClick={() => navigate(`/product/${product._id || product.id}`)}
                                sx={{
                                    border: 'none',
                                    boxShadow: 'none',
                                    bgcolor: '#f8f9fa',
                                    borderRadius: 4,
                                    p: 2,
                                    cursor: 'pointer',
                                    height: '420px', // STRICT 420px
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
                                        image={product.images?.[0] || product.image}
                                        alt={product.title || product.name}
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
                                        onClick={(e) => { e.stopPropagation(); }}
                                    >
                                        <FavoriteBorderIcon fontSize="small" />
                                    </IconButton>
                                    {product.discount > 0 && (
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: 10,
                                                left: 10,
                                                bgcolor: '#388e3c',
                                                color: 'white',
                                                px: 1.5,
                                                py: 0.5,
                                                borderRadius: 1,
                                                fontWeight: 700,
                                                fontSize: '0.875rem',
                                            }}
                                        >
                                            {product.discount}% OFF
                                        </Box>
                                    )}
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
                                        {product.title || product.name}
                                    </Typography>

                                    <Box sx={{ mt: 'auto' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                            <Rating value={product.rating} readOnly size="small" sx={{ color: '#ffb400', mr: 0.5 }} />
                                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                                ({(product.numReviews || product.ratingCount || 0).toLocaleString()})
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Box>
                                                <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.3rem' }}> {/* INCREASED FONT SIZE */}
                                                    ₹{product.price.toLocaleString()}
                                                </Typography>
                                            </Box>
                                            <IconButton
                                                sx={{
                                                    bgcolor: '#212121',
                                                    color: 'white',
                                                    '&:hover': { bgcolor: '#424242' },
                                                }}
                                                size="small"
                                                onClick={(e) => { e.stopPropagation(); }}
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

                {displayProducts.length === 0 && (
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                        <Typography variant="h5" sx={{ color: 'text.secondary' }}>
                            No products found
                        </Typography>
                    </Box>
                )}
            </Container>

            <Footer />
        </Box>
    );
};

export default ShopByCategory;
