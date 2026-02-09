import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Card, CardContent, CardMedia, Button, Stack, Chip, IconButton } from '@mui/material';
import Navbar from '../WrapperComponents/Navbar';
import Footer from '../WrapperComponents/Footer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';

import { useEffect, useState } from 'react';
import { QProductService } from '../../services/api';

const QAllProducts = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await QProductService.getAll();
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products", error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
            <Navbar />

            <Container maxWidth="xl" sx={{ mt: 4, mb: 8 }}>
                {/* Header */}
                <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton onClick={() => navigate('/quick')} sx={{ bgcolor: 'white', border: '1px solid #e2e8f0' }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b' }}>
                            All Q-Commerce Products
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#64748b' }}>
                            {products.length} Products Found
                        </Typography>
                    </Box>
                </Box>

                {/* Product Grid - STRICT SIZING */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                    {products.map((item: any) => (
                        <Box
                            key={item._id || item.id}
                            sx={{
                                width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(25% - 18px)' },
                                flexGrow: 0,
                                flexShrink: 0
                            }}
                        >
                            <Card
                                elevation={0}
                                sx={{
                                    height: '420px', // STRICT HEIGHT
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderRadius: 3,
                                    border: '1px solid #e2e8f0',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 10px 20px rgba(0,0,0,0.05)'
                                    }
                                }}
                            >
                                {/* Image Container - STRICT HEIGHT */}
                                <Box sx={{
                                    height: '200px',
                                    width: '100%',
                                    position: 'relative',
                                    bgcolor: '#ffffff',
                                    p: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderBottom: '1px solid #f1f5f9',
                                    cursor: 'pointer' // Add visual cue
                                }}
                                    onClick={() => navigate(`/quick/product/${item._id || item.id}`)}
                                >
                                    {item.discount > 0 && (
                                        <Chip
                                            label={`${item.discount}% OFF`}
                                            size="small"
                                            sx={{
                                                position: 'absolute',
                                                top: 12,
                                                left: 12,
                                                bgcolor: '#ef4444',
                                                color: 'white',
                                                fontWeight: 800,
                                                fontSize: '0.7rem',
                                                height: '24px',
                                                borderRadius: 1
                                            }}
                                        />
                                    )}
                                    <CardMedia
                                        component="img"
                                        image={item.image}
                                        alt={item.name}
                                        sx={{
                                            maxWidth: '100%',
                                            maxHeight: '100%',
                                            objectFit: 'contain' // Ensures image fits within the box
                                        }}
                                    />
                                </Box>

                                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
                                    <Typography variant="overline" sx={{ color: '#94a3b8', lineHeight: 1.2, fontWeight: 700 }}>
                                        {item.brand}
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a', mb: 1, lineHeight: 1.3 }}>
                                        {item.name}
                                    </Typography>

                                    {/* Price Section */}
                                    <Stack direction="row" spacing={1} alignItems="baseline" sx={{ mt: 'auto', mb: 2 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 900, color: '#0f172a' }}>
                                            ₹{item.price.toLocaleString()}
                                        </Typography>
                                        {item.mrp > item.price && (
                                            <Typography variant="caption" sx={{ textDecoration: 'line-through', color: '#94a3b8', fontWeight: 600 }}>
                                                ₹{item.mrp.toLocaleString()}
                                            </Typography>
                                        )}
                                    </Stack>

                                    <Stack direction="row" spacing={1} sx={{ mt: 'auto' }}>
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            startIcon={<AddIcon />}
                                            sx={{
                                                borderColor: '#22c55e',
                                                color: '#16a34a',
                                                fontWeight: 800,
                                                textTransform: 'none',
                                                fontSize: '0.8rem',
                                                '&:hover': { bgcolor: '#f0fdf4', borderColor: '#16a34a' }
                                            }}
                                        >
                                            Add
                                        </Button>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            sx={{
                                                bgcolor: '#22c55e',
                                                color: 'black',
                                                fontWeight: 800,
                                                textTransform: 'none',
                                                boxShadow: 'none',
                                                fontSize: '0.8rem',
                                                '&:hover': { bgcolor: '#16a34a', boxShadow: 'none' }
                                            }}
                                        >
                                            Buy Now
                                        </Button>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </Box>
            </Container>

            <Footer />
        </Box>
    );
};

export default QAllProducts;
