import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Card, CardContent, CardMedia, Rating, IconButton, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Navbar from '../WrapperComponents/Navbar';
import Footer from '../WrapperComponents/Footer';
import { ProductService } from '../../services/api';

const AllProducts = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await ProductService.getAll();
                // Handle both old array format and new paginated format
                if (Array.isArray(data)) {
                    setProducts(data);
                } else if (data.products) {
                    setProducts(data.products);
                } else {
                    setProducts([]);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
                setProducts([]);
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
                        All Products
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        Discover our complete collection of premium products
                    </Typography>
                </Box>

                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                        <CircularProgress sx={{ color: 'black' }} />
                    </Box>
                ) : (
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
                                            transform: 'scale(1.02)',
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
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
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
                                                fontSize: '1.1rem',
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
                                                    <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.3rem' }}>
                                                        ₹{(Number(product?.price ?? product?.pricePerUnit ?? 0) || 0).toLocaleString('en-IN')}
                                                    </Typography>
                                                </Box>
                                                <IconButton
                                                    sx={{
                                                        bgcolor: '#212121',
                                                        color: 'white',
                                                        '&:hover': { bgcolor: '#424242' },
                                                    }}
                                                    size="small"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                    }}
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
                )}

                {!isLoading && products.length === 0 && (
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

export default AllProducts;
