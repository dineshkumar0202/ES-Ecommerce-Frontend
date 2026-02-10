import { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Divider,
    Stack,
    Paper,
    CircularProgress,
    IconButton,
    Chip
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import Navbar from '../../../WrapperComponents/Navbar';
import Footer from '../../../WrapperComponents/Footer';
import { WholesaleService, WishlistService, CartService } from '../../../../services/api';
import { toast } from 'react-toastify';

const WholesaleProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
            try {
                const { data } = await WholesaleService.getById(id);
                setProduct(data);
            } catch (error) {
                console.error("Error fetching wholesale product:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleToggleWishlist = async () => {
        try {
            if (isFavorite) {
                setIsFavorite(false);
            } else {
                await WishlistService.addToWishlist({ productId: product._id, type: 'Wholesale' });
                setIsFavorite(true);
                toast.success('Added to wishlist!');
            }
        } catch (error) {
            console.error("Error with wishlist:", error);
            toast.error('Please login to add to wishlist');
        }
    };

    const handleAddToCart = async () => {
        try {
            await CartService.addToCart({
                productId: product._id,
                quantity: product.packSize || 1,
                type: 'Wholesale'
            });
            toast.success('Added to Wholesale Cart!');
        } catch (error) {
            toast.error('Login to add to cart');
        }
    };

    if (isLoading) {
        return (
            <Box sx={{ bgcolor: 'white', minHeight: '100vh' }}>
                <Navbar />
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 20 }}>
                    <CircularProgress sx={{ color: '#bef264' }} />
                </Box>
                <Footer />
            </Box>
        );
    }

    if (!product) {
        return (
            <Box sx={{ bgcolor: 'white', minHeight: '100vh' }}>
                <Navbar />
                <Container maxWidth="xl" sx={{ mt: 4, mb: 8, textAlign: 'center' }}>
                    <Typography variant="h4">Product not found</Typography>
                    <Button onClick={() => navigate('/wholesale')} sx={{ mt: 2, color: 'black', fontWeight: 700 }}>Go to Wholesale</Button>
                </Container>
                <Footer />
            </Box>
        );
    }

    const images = product.images || [product.image];

    return (
        <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh' }}>
            <Navbar />

            <Container maxWidth="xl" sx={{ mt: 4, mb: 8 }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>

                    {/* Left Column: Images */}
                    <Box sx={{ width: { xs: '100%', md: '45%' }, position: { md: 'sticky' }, top: 120, alignSelf: 'flex-start' }}>
                        <Paper
                            elevation={0}
                            sx={{
                                border: '1px solid #e2e8f0',
                                borderRadius: 4,
                                p: 2,
                                mb: 2,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: { xs: '350px', md: '500px' },
                                bgcolor: 'white',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <img
                                src={images[selectedImage]}
                                alt={product.title}
                                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                            />
                            <IconButton
                                onClick={handleToggleWishlist}
                                sx={{ position: 'absolute', top: 20, right: 20, bgcolor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', '&:hover': { bgcolor: '#f1f5f9' } }}
                            >
                                {isFavorite ? <FavoriteIcon sx={{ color: '#ef4444' }} /> : <FavoriteBorderIcon />}
                            </IconButton>
                        </Paper>

                        {/* Thumbnails */}
                        {images.length > 1 && (
                            <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', mb: 4, overflowX: 'auto', py: 1 }}>
                                {images.map((img: string, index: number) => (
                                    <Box
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        sx={{
                                            width: 70,
                                            height: 70,
                                            border: `2px solid ${selectedImage === index ? '#bef264' : '#e2e8f0'}`,
                                            borderRadius: 2,
                                            cursor: 'pointer',
                                            p: 0.5,
                                            flexShrink: 0,
                                            bgcolor: 'white',
                                            '&:hover': { borderColor: '#bef264' }
                                        }}
                                    >
                                        <img
                                            src={img}
                                            alt={`thumb-${index}`}
                                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                        />
                                    </Box>
                                ))}
                            </Stack>
                        )}

                        {/* Action Buttons */}
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() => window.location.href = `tel:${product.phoneNumber || "+919876543210"}`}
                                startIcon={<PhoneIcon />}
                                sx={{
                                    bgcolor: '#bef264',
                                    color: 'black',
                                    py: 2,
                                    borderRadius: 3,
                                    fontWeight: 800,
                                    textTransform: 'none',
                                    '&:hover': { bgcolor: '#d9f99d' }
                                }}
                            >
                                Contact Seller
                            </Button>
                            <Button
                                variant="outlined"
                                fullWidth
                                onClick={handleAddToCart}
                                startIcon={<ShoppingCartOutlinedIcon />}
                                sx={{
                                    borderColor: '#cbd5e1',
                                    color: '#334155',
                                    py: 2,
                                    borderRadius: 3,
                                    fontWeight: 800,
                                    textTransform: 'none',
                                    '&:hover': { bgcolor: '#f1f5f9', borderColor: '#94a3b8' }
                                }}
                            >
                                Add to Cart
                            </Button>
                        </Box>
                    </Box>

                    {/* Right Column: Details */}
                    <Box sx={{ width: { xs: '100%', md: '55%' } }}>
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                            <BusinessIcon sx={{ color: '#2563eb', fontSize: 20 }} />
                            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#2563eb', letterSpacing: 1 }}>
                                {product.companyName || "VERIFIED WHOLESALE SUPPLIER"}
                            </Typography>
                        </Stack>

                        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 900, mb: 2, color: '#0f172a' }}>
                            {product.title}
                        </Typography>

                        <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                            {product.category && <Chip label={product.category} sx={{ bgcolor: '#f1f5f9', color: '#475569', fontWeight: 700 }} />}
                            {product.inStock && <Chip label="In Stock" sx={{ bgcolor: '#dcfce7', color: '#166534', fontWeight: 800 }} />}
                        </Stack>

                        <Paper elevation={0} sx={{ p: 4, bgcolor: 'white', borderRadius: 4, border: '1px solid #e2e8f0', mb: 4 }}>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                                <Box sx={{ flex: '1 1 200px' }}>
                                    <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, display: 'block', mb: 1 }}>
                                        WHOLESALE PRICE
                                    </Typography>
                                    <Typography variant="h3" sx={{ fontWeight: 900, color: '#0f172a' }}>
                                        ₹{product.pricePerUnit || product.price || 0}
                                        <Typography component="span" variant="subtitle1" sx={{ color: '#94a3b8', fontWeight: 600, ml: 1 }}>
                                            / Unit
                                        </Typography>
                                    </Typography>
                                </Box>
                                <Box sx={{ flex: '1 1 200px' }}>
                                    <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, display: 'block', mb: 1 }}>
                                        MINIMUM ORDER QUANTITY
                                    </Typography>
                                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
                                        {product.packSize || 1} Units
                                        <Typography component="span" variant="subtitle2" sx={{ color: '#94a3b8', fontWeight: 600, ml: 1, display: 'block' }}>
                                            (Standard Pack)
                                        </Typography>
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>

                        <Box sx={{ mb: 4 }}>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 800 }}>Product Description</Typography>
                            <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.8 }}>
                                {product.description}
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 4, p: 3, bgcolor: '#f1f5f9', borderRadius: 4, border: '1px solid #e2e8f0' }}>
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 800 }}>Vendor Information</Typography>
                            <Stack spacing={2.5}>
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <Box sx={{ bgcolor: 'white', p: 1, borderRadius: 2, border: '1px solid #e2e8f0' }}>
                                        <LocationOnIcon sx={{ color: '#64748b' }} />
                                    </Box>
                                    <Box>
                                        <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>Location</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{product.location}</Typography>
                                    </Box>
                                </Stack>
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <Box sx={{ bgcolor: 'white', p: 1, borderRadius: 2, border: '1px solid #e2e8f0' }}>
                                        <EmailIcon sx={{ color: '#64748b' }} />
                                    </Box>
                                    <Box>
                                        <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>Email Address</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{product.email || "Contact for Email"}</Typography>
                                    </Box>
                                </Stack>
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <Box sx={{ bgcolor: 'white', p: 1, borderRadius: 2, border: '1px solid #e2e8f0' }}>
                                        <PhoneIcon sx={{ color: '#64748b' }} />
                                    </Box>
                                    <Box>
                                        <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>Phone Number</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{product.phoneNumber || "Contact for Phone"}</Typography>
                                    </Box>
                                </Stack>
                            </Stack>
                        </Box>

                        <Divider sx={{ my: 4 }} />

                        <Box sx={{ mb: 4 }}>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 800 }}>Bulk Quantity Discounts</Typography>
                            <Typography variant="body2" sx={{ color: '#64748b', mb: 2 }}>Contact seller for additional discounts on orders larger than 500 units.</Typography>
                            <Stack direction="row" spacing={2}>
                                <Paper sx={{ p: 2, textAlign: 'center', border: '1px solid #e2e8f0', flex: 1 }}>
                                    <Typography variant="subtitle2" fontWeight={800}>10-50 Units</Typography>
                                    <Typography variant="h6" color="#22c55e">5% Off</Typography>
                                </Paper>
                                <Paper sx={{ p: 2, textAlign: 'center', border: '1px solid #e2e8f0', flex: 1 }}>
                                    <Typography variant="subtitle2" fontWeight={800}>50-100 Units</Typography>
                                    <Typography variant="h6" color="#22c55e">10% Off</Typography>
                                </Paper>
                                <Paper sx={{ p: 2, textAlign: 'center', border: '1px solid #e2e8f0', flex: 1 }}>
                                    <Typography variant="subtitle2" fontWeight={800}>100+ Units</Typography>
                                    <Typography variant="h6" color="#22c55e">15% Off</Typography>
                                </Paper>
                            </Stack>
                        </Box>
                    </Box>
                </Box>
            </Container>

            <Footer />
        </Box>
    );
};

export default WholesaleProductDetails;
