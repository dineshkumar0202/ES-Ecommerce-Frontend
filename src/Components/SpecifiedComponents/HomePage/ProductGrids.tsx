import { useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardContent, CardMedia, Rating, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const products = [
    {
        id: 1,
        title: "Classic Denim Jacket",
        price: "$89.99",
        rating: 4.5,
        reviews: 120,
        image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        category: "Fashion"
    },
    {
        id: 2,
        title: "Ergonomic Office Chair",
        price: "$249.99",
        rating: 4.8,
        reviews: 85,
        image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        category: "Furniture"
    },
    {
        id: 3,
        title: "Organic Skincare Set",
        price: "$64.99",
        rating: 4.7,
        reviews: 210,
        image: "https://images.unsplash.com/photo-1556228720-1957be979ea3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        category: "Beauty"
    },
    {
        id: 4,
        title: "Minimalist Coffee Table",
        price: "$129.99",
        rating: 4.2,
        reviews: 45,
        image: "https://images.unsplash.com/photo-1532372320572-cda5a60424b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        category: "Furniture"
    },
    {
        id: 5,
        title: "Bluetooth Portable Speaker",
        price: "$59.99",
        rating: 4.6,
        reviews: 156,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        category: "Electronics"
    },
    {
        id: 6,
        title: "Running Sneakers",
        price: "$119.99",
        rating: 4.9,
        reviews: 320,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        category: "Sports"
    }
];

const ProductGrids = () => {
    const navigate = useNavigate();

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
                {products.map((product) => (
                    <Box
                        key={product.id}
                        sx={{
                            width: { xs: '100%', sm: 'calc(50% - 24px)', md: 'calc(33.33% - 24px)' },
                            mb: 2
                        }}
                    >
                        <Card
                            onClick={() => navigate(`/product/${product.id}`)}
                            sx={{
                                border: 'none',
                                boxShadow: 'none',
                                cursor: 'pointer',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                '&:hover .product-image': {
                                    transform: 'scale(1.05)',
                                },
                            }}
                        >
                            <Box sx={{ position: 'relative', borderRadius: 4, overflow: 'hidden', mb: 2 }}>
                                <CardMedia
                                    component="img"
                                    height="280"
                                    image={product.image}
                                    alt={product.title}
                                    className="product-image"
                                    sx={{
                                        transition: 'transform 0.5s ease',
                                        bgcolor: '#f5f5f5',
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

                            <CardContent sx={{ p: 1, flexGrow: 1 }}>
                                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
                                    {product.category}
                                </Typography>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                    {product.title}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Rating value={product.rating} readOnly size="small" sx={{ color: '#ffb400', mr: 0.5 }} />
                                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                        ({product.reviews})
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 'auto' }}>
                                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                                        {product.price}
                                    </Typography>
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
                            </CardContent>
                        </Card>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default ProductGrids;
