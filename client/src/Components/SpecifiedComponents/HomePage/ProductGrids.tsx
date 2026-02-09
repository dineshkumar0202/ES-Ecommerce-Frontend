import { useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardContent, CardMedia, Rating, IconButton, Button, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { ProductService } from '../../../services/api';

const ProductGrids = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await ProductService.getAll();
                const productsArray = Array.isArray(data) ? data : (data?.products || []);
                // Take first 8 for home page grid
                setProducts(productsArray.slice(0, 8));
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleViewAll = () => {
        navigate('/products/all');
    };

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress sx={{ color: '#212121' }} />
            </Box>
        );
    }

    return (
        <Box sx={{ mt: 8, mb: 4 }}>
            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                    Trending Products
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    Handpicked items based on your preferences
                </Typography>
            </Box>

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
                                bgcolor: '#f8f9fa',
                                borderRadius: 4,
                                p: 2,
                                cursor: 'pointer',
                                height: '420px',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    bgcolor: '#f1f3f5',
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
                                    {product.title}
                                </Typography>

                                <Box sx={{ mt: 'auto' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <Rating value={product.rating || 0} readOnly size="small" sx={{ color: '#ffb400', mr: 0.5 }} />
                                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                            ({product.numReviews || 0})
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Box>
                                            <Typography variant="h6" sx={{ fontWeight: 800 }}>
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

            <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Button
                    onClick={handleViewAll}
                    variant="outlined"
                    size="large"
                    sx={{
                        px: 6,
                        py: 1.5,
                        borderColor: '#212121',
                        color: '#212121',
                        fontWeight: 600,
                        fontSize: '1rem',
                        borderRadius: 2,
                        '&:hover': {
                            borderColor: '#212121',
                            bgcolor: '#212121',
                            color: 'white',
                        },
                    }}
                >
                    View All Products →
                </Button>
            </Box>
        </Box>
    );
};

export default ProductGrids;
