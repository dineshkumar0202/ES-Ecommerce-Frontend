import { useEffect, useState } from 'react';
import { Box, Container, Typography, Card, CardContent, CardMedia, Rating, IconButton, CircularProgress, Stack, Chip, TextField, InputAdornment } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchIcon from '@mui/icons-material/Search';
import Navbar from '../WrapperComponents/Navbar';
import Footer from '../WrapperComponents/Footer';
import { ProductService } from '../../services/api';

const Retail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('All');
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const search = queryParams.get('search') || '';
        if (search) setSearchTerm(search);

        fetchProducts();
        fetchCategories();
    }, [location.search]);

    const fetchProducts = async () => {
        setIsLoading(true);
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

    const fetchCategories = async () => {
        try {
            const { data } = await ProductService.getCategories();
            if (data) {
                setCategories(['All', ...data]);
            } else {
                setCategories(['All']);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
            setCategories(['All']);
        }
    };

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = category === 'All' || p.category === category;
        return matchesSearch && matchesCategory;
    });

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
            <Navbar />

            <Container maxWidth="xl" sx={{ mt: 4, mb: 8 }}>
                {/* Retail Hero */}
                <Box sx={{
                    bgcolor: '#212121',
                    borderRadius: 4,
                    p: { xs: 4, md: 6 },
                    mb: 5,
                    position: 'relative',
                    overflow: 'hidden',
                    color: 'white'
                }}>
                    <Stack spacing={2} sx={{ position: 'relative', zIndex: 1, maxWidth: 600 }}>
                        <Chip label="B2C Marketplace" sx={{ bgcolor: '#bef264', color: 'black', fontWeight: 800, width: 'fit-content' }} />
                        <Typography variant="h3" sx={{ fontWeight: 900 }}>Retail Excellence</Typography>
                        <Typography variant="h6" sx={{ color: '#94a3b8', fontWeight: 400 }}>
                            Explore our premium collection of products delivered right to your doorstep.
                        </Typography>
                    </Stack>
                </Box>

                {/* Filters Row */}
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 5 }} alignItems="center" justifyContent="space-between">
                    <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: 1, width: { xs: '100%', md: 'auto' } }}>
                        {categories.map(cat => (
                            <Chip
                                key={cat}
                                label={cat}
                                onClick={() => setCategory(cat)}
                                sx={{
                                    bgcolor: category === cat ? 'black' : 'white',
                                    color: category === cat ? 'white' : 'black',
                                    fontWeight: 600,
                                    '&:hover': { bgcolor: category === cat ? 'black' : '#f1f5f9' },
                                    border: '1px solid #e2e8f0'
                                }}
                            />
                        ))}
                    </Stack>
                    <TextField
                        placeholder="Search products..."
                        size="small"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#94a3b8' }} /></InputAdornment>
                        }}
                        sx={{
                            width: { xs: '100%', md: 300 },
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 3,
                                bgcolor: 'white',
                                '& fieldset': { borderColor: '#e2e8f0' }
                            }
                        }}
                    />
                </Stack>

                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                        <CircularProgress sx={{ color: 'black' }} />
                    </Box>
                ) : (
                    <Box sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 3,
                        justifyContent: { xs: 'center', sm: 'flex-start' }
                    }}>
                        {filteredProducts.map((product) => (
                            <Box
                                key={product._id}
                                sx={{
                                    width: {
                                        xs: '100%',
                                        sm: 'calc(50% - 12px)',
                                        md: 'calc(33.333% - 16px)',
                                        lg: 'calc(25% - 18px)'
                                    },
                                    minWidth: { xs: '280px', sm: '0' }
                                }}
                            >
                                <Card
                                    onClick={() => navigate(`/product/${product._id}`)}
                                    sx={{
                                        border: 'none',
                                        boxShadow: 'none',
                                        bgcolor: 'white',
                                        borderRadius: 4,
                                        p: 2,
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: '0 12px 24px rgba(0,0,0,0.05)'
                                        }
                                    }}
                                >
                                    <Box sx={{ position: 'relative', borderRadius: 3, overflow: 'hidden', pt: '100%' }}>
                                        <CardMedia
                                            component="img"
                                            image={product.images?.[0] || 'https://via.placeholder.com/400'}
                                            alt={product.title}
                                            sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                        <IconButton sx={{ position: 'absolute', top: 10, right: 10, bgcolor: 'white', '&:hover': { bgcolor: '#f1f5f9' } }} size="small">
                                            <FavoriteBorderIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                    <CardContent sx={{ px: 1, pt: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>{product.category}</Typography>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1, height: '3rem', overflow: 'hidden' }}>{product.title}</Typography>
                                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                                            <Rating value={product.rating || 0} readOnly size="small" />
                                            <Typography variant="caption">({product.numReviews || 0})</Typography>
                                        </Stack>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 'auto' }}>
                                            <Typography variant="h6" sx={{ fontWeight: 900 }}>₹{product.price.toLocaleString()}</Typography>
                                            <IconButton sx={{ bgcolor: 'black', color: 'white', '&:hover': { bgcolor: '#333' } }} size="small">
                                                <ShoppingCartOutlinedIcon fontSize="small" />
                                            </IconButton>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Box>
                        ))}
                    </Box>
                )}

                {!isLoading && filteredProducts.length === 0 && (
                    <Box sx={{ textAlign: 'center', py: 10 }}>
                        <Typography variant="h6" color="textSecondary">No products found matching your criteria.</Typography>
                    </Box>
                )}
            </Container>

            <Footer />
        </Box>
    );
};

export default Retail;
