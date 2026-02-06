import { useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardContent, CardMedia, Rating, IconButton, Button } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { allProducts } from '../../../data/productsData';

const ProductGrids = () => {
    const navigate = useNavigate();

    // Get unique products for "Just For You" section (not used in other sections)
    // Show 8 products initially (excluded IDs from other sections: 1, 2, 3, 4, 5, 6, 7, 9, 11, 12, 14, 15)
    const justForYouProducts = [
        allProducts.find(p => p.id === 8),   // Adidas Shoes
        allProducts.find(p => p.id === 10),  // Women's Graphic T-Shirt
        allProducts.find(p => p.id === 13),  // Women's V-Neck T-Shirt
        allProducts.find(p => p.id === 16),  // Bose Headphones
        allProducts.find(p => p.id === 17),  // MacBook Pro
        allProducts.find(p => p.id === 19),  // iPad Air
        allProducts.find(p => p.id === 21),  // Samsung Galaxy Watch
        allProducts.find(p => p.id === 23),  // AirPods Pro
    ].filter((p): p is NonNullable<typeof p> => p !== undefined);

    const handleViewAll = () => {
        navigate('/products/all');
    };

    return (
        <Box sx={{ mt: 8, mb: 4 }}>
            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                    Just For You
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    Handpicked items based on your preferences
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
                {justForYouProducts.map((product) => (
                    <Box
                        key={product.id}
                        sx={{
                            width: { xs: '100%', sm: 'calc(50% - 24px)', md: 'calc(33.33% - 24px)', lg: 'calc(25% - 24px)' }, // 4 per row on Large
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
                                    transform: 'scale(1.05)',
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
                                        objectFit: 'cover', // COVER
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

            {/* View All Button */}
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
