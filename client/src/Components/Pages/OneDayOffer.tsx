import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Card, CardContent, CardMedia, Rating, IconButton, Grid } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Navbar from '../WrapperComponents/Navbar';
import Footer from '../WrapperComponents/Footer';
import { allProducts } from '../../data/productsData';

const OneDayOffer = () => {
    const navigate = useNavigate();

    // Show exactly 20 products (Electronics & Gadgets)
    // IDs: 18, 20, 22, 24 (New individual items) + 25-40 (New categories)
    const selectedProductIds = [
        18, 20, 22, 24, // Laptop, Tablet, Watch, Buds
        25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40 // Cameras, Consoles, etc.
    ];

    const displayProducts = allProducts.filter(p => selectedProductIds.includes(p.id));

    return (
        <Box sx={{ bgcolor: 'white', minHeight: '100vh' }}>
            <Navbar />

            <Container maxWidth="xl" sx={{ mt: 4, mb: 8 }}>
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                        One Day Offer - 30% OFF
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        Limited time deals on premium electronics and gadgets
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    {displayProducts.map((product) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
                            <Card
                                onClick={() => navigate(`/product/${product.id}`)}
                                sx={{
                                    border: 'none',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                    cursor: 'pointer',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                                    },
                                    '&:hover .product-image': {
                                        transform: 'scale(1.05)',
                                    },
                                }}
                            >
                                <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden' }}>
                                    <CardMedia
                                        component="img"
                                        height="280"
                                        image={product.image}
                                        alt={product.name}
                                        className="product-image"
                                        sx={{
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
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 10,
                                            left: 10,
                                            bgcolor: '#ff6b6b',
                                            color: 'white',
                                            px: 1.5,
                                            py: 0.5,
                                            borderRadius: 1,
                                            fontWeight: 700,
                                            fontSize: '0.875rem',
                                        }}
                                    >
                                        30% OFF
                                    </Box>
                                </Box>

                                <CardContent sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5, textTransform: 'uppercase', fontWeight: 600 }}>
                                        {product.category}
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', minHeight: '3em' }}>
                                        {product.name}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <Rating value={product.rating} readOnly size="small" precision={0.1} sx={{ color: '#ffb400', mr: 0.5 }} />
                                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                            ({product.ratingCount.toLocaleString()})
                                        </Typography>
                                    </Box>
                                    <Box sx={{ mt: 'auto' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 0.5 }}>
                                            <Typography variant="h6" sx={{ fontWeight: 800, color: '#212121' }}>
                                                ₹{product.price.toLocaleString()}
                                            </Typography>
                                            {product.mrp > product.price && (
                                                <Typography variant="body2" sx={{ color: '#878787', textDecoration: 'line-through' }}>
                                                    ₹{product.mrp.toLocaleString()}
                                                </Typography>
                                            )}
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Typography variant="caption" sx={{ color: '#388e3c', fontWeight: 700 }}>
                                                Save ₹{(product.mrp - product.price).toLocaleString()}
                                            </Typography>
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
                        </Grid>
                    ))}
                </Grid>

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

export default OneDayOffer;
