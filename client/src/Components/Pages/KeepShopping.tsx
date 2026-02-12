import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Card, CardContent, CardMedia, IconButton, Grid, CircularProgress } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Navbar from '../WrapperComponents/Navbar';
import Footer from '../WrapperComponents/Footer';
import { ProductService } from '../../services/api';
import { useState, useEffect } from 'react';

const KeepShopping = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await ProductService.getAll({ limit: 12 });
                if (Array.isArray(data)) {
                    setProducts(data);
                } else if (data.products) {
                    setProducts(data.products);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <Box sx={{ bgcolor: 'white', minHeight: '100vh' }}>
            <Navbar />

            <Container maxWidth="xl" sx={{ mt: 8, mb: 12 }}>
                <Box sx={{ mb: 6, textAlign: 'center' }}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            letterSpacing: -1,
                            fontFamily: 'sans-serif',
                            mb: 1
                        }}
                    >
                        Keep Shopping
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                        Pick up where you left off with our latest recommendations
                    </Typography>
                </Box>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                        <CircularProgress sx={{ color: 'black' }} />
                    </Box>
                ) : (
                    <Grid container spacing={4}>
                        {products.map((product) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product._id}>
                                <Card
                                    onClick={() => navigate(`/product/${product._id}`)}
                                    sx={{
                                        border: 'none',
                                        boxShadow: 'none',
                                        bgcolor: 'transparent',
                                        cursor: 'pointer',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        '&:hover .product-image': { transform: 'scale(1.05)' }
                                    }}
                                >
                                    <Box sx={{ bgcolor: '#f4f4f5', borderRadius: 4, overflow: 'hidden', mb: 2, position: 'relative' }}>
                                        <CardMedia
                                            component="img"
                                            height="300"
                                            image={product.images?.[0] || 'https://via.placeholder.com/400'}
                                            alt={product.title}
                                            className="product-image"
                                            sx={{ transition: 'transform 0.5s ease', objectFit: 'contain', p: 4 }}
                                        />
                                        <IconButton
                                            sx={{ position: 'absolute', top: 15, right: 15, bgcolor: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                                            onClick={(e) => { e.stopPropagation(); }}
                                        >
                                            <FavoriteBorderIcon fontSize="small" />
                                        </IconButton>
                                    </Box>

                                    <CardContent sx={{ p: 0 }}>
                                        <Typography variant="caption" sx={{ color: '#a1a1aa', fontWeight: 700, textTransform: 'uppercase' }}>
                                            {product.category}
                                        </Typography>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 0.5, textTransform: 'uppercase' }}>
                                            {product.title}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Typography variant="h6" sx={{ fontWeight: 900 }}>
                                                ₹{(Number(product?.price ?? product?.pricePerUnit ?? 0) || 0).toLocaleString('en-IN')}
                                            </Typography>
                                            <IconButton sx={{ bgcolor: 'black', color: 'white', '&:hover': { bgcolor: '#27272a' } }} size="small">
                                                <ShoppingCartOutlinedIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>

            <Footer />
        </Box>
    );
};

export default KeepShopping;
