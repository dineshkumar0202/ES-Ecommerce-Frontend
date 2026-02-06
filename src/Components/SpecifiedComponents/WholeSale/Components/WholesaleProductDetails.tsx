import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Button, Paper, Chip, Divider, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Navbar from '../../../WrapperComponents/Navbar';
import Footer from '../../../WrapperComponents/Footer';

const WholesaleProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState<any>(null);

    useEffect(() => {
        const storedProducts = localStorage.getItem('wholesaleProducts');
        if (storedProducts) {
            const products = JSON.parse(storedProducts);
            const foundProduct = products.find((p: any) => p.id == id);
            setProduct(foundProduct);
        }
    }, [id]);

    if (!product) {
        return (
            <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
                <Navbar />
                <Container sx={{ mt: 10, textAlign: 'center' }}>
                    <Typography variant="h5">Product not found</Typography>
                    <Button onClick={() => navigate('/wholesale')} sx={{ mt: 2 }}>
                        Back to Wholesale
                    </Button>
                </Container>
                <Footer />
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
            <Navbar />

            <Container maxWidth="xl" sx={{ mt: 4, mb: 8 }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/wholesale')}
                    sx={{ mb: 3, color: '#64748b' }}
                >
                    Back to Wholesale
                </Button>

                <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
                        {/* Image Section */}
                        <Box sx={{
                            width: { xs: '100%', md: '50%' },
                            bgcolor: 'black',
                            minHeight: '500px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Box
                                component="img"
                                src={product.image}
                                alt={product.title}
                                sx={{ maxWidth: '100%', maxHeight: '500px', objectFit: 'contain' }}
                            />
                        </Box>

                        {/* Details Section */}
                        <Box sx={{ width: { xs: '100%', md: '50%' }, p: 5 }}>
                            <Box sx={{ mb: 2 }}>
                                <Chip
                                    label={product.inStock ? "IN STOCK" : "OUT OF STOCK"}
                                    color={product.inStock ? "success" : "default"}
                                    size="small"
                                    sx={{ borderRadius: 1, fontWeight: 700, mb: 2 }}
                                />
                                <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', mb: 1 }}>
                                    {product.title}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#64748b' }}>
                                    SKU: {product.sku}
                                </Typography>
                            </Box>

                            <Typography variant="body1" sx={{ color: '#475569', mb: 4, lineHeight: 1.7 }}>
                                {product.description}
                            </Typography>

                            <Divider sx={{ mb: 4 }} />

                            <Box sx={{ mb: 4, display: 'flex', gap: 4 }}>
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, display: 'block', mb: 0.5 }}>
                                        PRICE PER UNIT
                                    </Typography>
                                    <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a' }}>
                                        ₹{product.pricePerUnit?.toLocaleString('en-IN')}
                                    </Typography>
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, display: 'block', mb: 0.5 }}>
                                        PACK SIZE
                                    </Typography>
                                    <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a' }}>
                                        {product.packSize} Units
                                    </Typography>
                                </Box>
                            </Box>

                            <Box sx={{ p: 3, bgcolor: '#eff6ff', borderRadius: 2, border: '1px solid #bfdbfe', mb: 4 }}>
                                <Typography variant="subtitle2" sx={{ color: '#1e40af', mb: 1 }}>Total Pack Price</Typography>
                                <Typography variant="h3" sx={{ fontWeight: 800, color: '#2563eb' }}>
                                    ₹{(product.pricePerUnit * product.packSize).toLocaleString('en-IN')}
                                </Typography>
                            </Box>

                            <Stack direction="row" spacing={2}>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    startIcon={<ShoppingCartOutlinedIcon />}
                                    sx={{
                                        borderRadius: 2,
                                        height: '56px',
                                        borderColor: '#cbd5e1',
                                        color: '#334155'
                                    }}
                                >
                                    Add to Cart
                                </Button>
                                <Button
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    sx={{
                                        borderRadius: 2,
                                        bgcolor: '#2563eb',
                                        fontWeight: 700,
                                        height: '56px',
                                        '&:hover': { bgcolor: '#1d4ed8' }
                                    }}
                                >
                                    Buy Now
                                </Button>
                            </Stack>
                        </Box>
                    </Box>
                </Paper>
            </Container>

            <Footer />
        </Box>
    );
};

export default WholesaleProductDetails;
