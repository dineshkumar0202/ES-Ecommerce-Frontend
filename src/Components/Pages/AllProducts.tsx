import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Card, CardContent, CardMedia, Rating, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Navbar from '../WrapperComponents/Navbar';
import Footer from '../WrapperComponents/Footer';
import { allProducts } from '../../data/productsData';

const AllProducts = () => {
    const navigate = useNavigate();

    // Show all products NOT shown on home page
    // Excluded IDs:
    // - One Day Offer: 2, 4, 6, 7
    // - T-Shirts: 9, 11, 12, 14
    // - Keep Shopping: 15, 3, 5, 1
    // - Just For You: 8, 10, 13, 16, 17, 19, 21, 23
    const homePageProductIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 21, 23];

    const displayProducts = allProducts.filter(p => !homePageProductIds.includes(p.id));

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

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
                    {displayProducts.map((product) => (
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
                                        onClick={(e) => {
                                            e.stopPropagation();
                                        }}
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

export default AllProducts;
