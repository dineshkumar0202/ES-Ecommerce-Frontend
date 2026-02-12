import { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Stack,
    Paper,
    CircularProgress,
    IconButton,
    Chip,
    TextField,
    MenuItem,
    Breadcrumbs,
    Link
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneEnabledOutlinedIcon from '@mui/icons-material/PhoneEnabledOutlined';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Navbar from '../../../WrapperComponents/Navbar';
import Footer from '../../../WrapperComponents/Footer';
import { WholesaleService, WishlistService } from '../../../../services/api';
import { toast } from 'react-toastify';

/** Normalize phone to digits for tel: and WhatsApp (e.g. +91 80802 21133 -> 918080221133). */
const toWhatsAppNumber = (phone: string | undefined) => {
    if (!phone) return '';
    const digits = phone.replace(/\D/g, '');
    return digits.startsWith('91') ? digits : '91' + digits;
};

const WholesaleProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);

    // Quote Selection State
    const [quoteData, setQuoteData] = useState({
        quantity: '',
        timeline: 'Immediate',
        notes: ''
    });

    const handleQuoteChange = (field: string, value: string) => {
        setQuoteData(prev => ({ ...prev, [field]: value }));
    };

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
                await WishlistService.addToWishlist({ productId: product._id });
                setIsFavorite(true);
                toast.success('Added to wishlist!');
            }
        } catch (err: any) {
            const status = err?.response?.status;
            if (status === 404 || err?.response?.data?.message === 'Product not found') {
                toast.info('Wishlist is for retail products. Use WhatsApp or call to save this wholesale item.');
                return;
            }
            console.error('Wishlist error:', err);
            toast.error('Please login to add to wishlist');
        }
    };

    const sellerPhone = product?.phoneNumber || '+918080221133';
    const whatsappNum = toWhatsAppNumber(sellerPhone);
    const telHref = `tel:${sellerPhone.replace(/\s/g, '')}`;

    const handleGetCustomQuote = () => {
        const text = encodeURIComponent(
            `Hi, I'm interested in a custom quote for *${product?.title}*.\n` +
            `Quantity: ${quoteData.quantity || '—'}\nTimeline: ${quoteData.timeline}\nNotes: ${quoteData.notes || '—'}`
        );
        window.open(`https://wa.me/${whatsappNum}?text=${text}`, '_blank', 'noopener,noreferrer');
        toast.success('Opening WhatsApp to get your quote');
    };

    const handleBuyNow = () => {
        window.location.href = telHref;
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
        <Box sx={{ bgcolor: '#ffffff', minHeight: '100vh' }}>
            <Navbar />

            <Container maxWidth="xl" sx={{ mt: 3, mb: 8 }}>
                {/* Header: Breadcrumbs and Status */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Breadcrumbs
                        separator={<NavigateNextIcon fontSize="small" />}
                        sx={{ '& .MuiTypography-root': { fontSize: '0.85rem', color: '#64748b' } }}
                    >
                        <Link href="/" underline="hover" color="inherit">Home</Link>
                        <Link href="/wholesale" underline="hover" color="inherit">{product.category || 'Wholesale'}</Link>
                        <Typography color="text.primary" sx={{ fontWeight: 600 }}>{product.title}</Typography>
                    </Breadcrumbs>

                    <Stack direction="row" spacing={2} alignItems="center">
                        <Chip
                            label="IN STOCK"
                            size="small"
                            sx={{
                                bgcolor: '#dcfce7',
                                color: '#166534',
                                fontWeight: 800,
                                borderRadius: 1.5,
                                fontSize: '0.7rem'
                            }}
                        />
                        <Typography sx={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>
                            ID: {product._id?.slice(-8).toUpperCase() || 'XYZ-88022'}
                        </Typography>
                    </Stack>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 6 }}>
                    {/* Left Side: Image Gallery */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Box sx={{ position: 'sticky', top: 100 }}>
                            <Box sx={{
                                borderRadius: 6,
                                bgcolor: '#fdf2f2', // Matching the pale peach/pinkish bg in image
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '600px',
                                position: 'relative',
                                mb: 3,
                                overflow: 'hidden'
                            }}>
                                <img
                                    src={images[selectedImage]}
                                    alt={product.title}
                                    style={{ width: '80%', height: '80%', objectFit: 'contain' }}
                                />
                                <IconButton
                                    onClick={handleToggleWishlist}
                                    sx={{
                                        position: 'absolute',
                                        top: 24,
                                        right: 24,
                                        bgcolor: 'white',
                                        p: 1.5,
                                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                        '&:hover': { bgcolor: '#f8fafc' }
                                    }}
                                >
                                    {isFavorite ? <FavoriteIcon sx={{ color: '#ef4444' }} /> : <FavoriteBorderIcon />}
                                </IconButton>
                            </Box>

                            {/* Thumbnails */}
                            <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', pb: 1 }}>
                                {images.map((img: string, index: number) => (
                                    <Box
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        sx={{
                                            width: 120,
                                            height: 120,
                                            borderRadius: 4,
                                            border: `2px solid ${selectedImage === index ? '#b2d8d8' : 'transparent'}`,
                                            bgcolor: '#f1f5f9',
                                            cursor: 'pointer',
                                            p: 1,
                                            flexShrink: 0,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            transition: 'all 0.2s',
                                            '&:hover': { bgcolor: '#e2e8f0' }
                                        }}
                                    >
                                        <img src={img} alt="thumb" style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
                                    </Box>
                                ))}
                            </Stack>

                            <Box sx={{ mt: 6 }}>
                                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, color: '#1e293b' }}>Product Description</Typography>
                                <Typography sx={{ color: '#475569', lineHeight: 1.8, fontSize: '1.05rem' }}>
                                    {product.description}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* Right Side: Details and Forms */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Box>
                            <Typography variant="h2" sx={{ fontWeight: 900, mb: 1, color: '#0f172a', fontSize: '3.5rem' }}>
                                {product.title}
                            </Typography>
                            <Typography variant="h6" sx={{ color: '#94a3b8', fontWeight: 600, mb: 4 }}>
                                Bulk Wholesale Supply
                            </Typography>

                            {/* Order Info Cards */}
                            <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                                <Paper elevation={0} sx={{ flex: 1, p: 3, bgcolor: '#f8fafc', borderRadius: 4, textAlign: 'center' }}>
                                    <Typography variant="caption" sx={{ fontWeight: 800, color: '#94a3b8', fontSize: '0.65rem' }}>MIN. ORDER</Typography>
                                    <Typography variant="h5" sx={{ fontWeight: 900, mt: 0.5 }}>{product.packSize || 12} Units</Typography>
                                </Paper>
                                <Paper elevation={0} sx={{ flex: 1, p: 3, bgcolor: '#f8fafc', borderRadius: 4, textAlign: 'center' }}>
                                    <Typography variant="caption" sx={{ fontWeight: 800, color: '#94a3b8', fontSize: '0.65rem' }}>STANDARD PACK</Typography>
                                    <Typography variant="h5" sx={{ fontWeight: 900, mt: 0.5 }}>Carton Box</Typography>
                                </Paper>
                            </Stack>

                            {/* Quote Form */}
                            <Paper elevation={0} sx={{
                                p: 4,
                                borderRadius: 6,
                                border: '1px solid #e2e8f0',
                                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.04)'
                            }}>
                                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>Request for Bulk Quote</Typography>
                                <Typography variant="body2" sx={{ color: '#64748b', mb: 4 }}>
                                    Enter your details to receive our latest wholesale price list and lead times.
                                </Typography>

                                <Stack spacing={3}>
                                    <Stack direction="row" spacing={2}>
                                        <Box sx={{ flex: 1 }}>
                                            <Typography variant="caption" sx={{ fontWeight: 800, mb: 1, display: 'block', color: '#475569' }}>QUANTITY NEEDED</Typography>
                                            <TextField
                                                fullWidth
                                                placeholder="e.g. 100"
                                                value={quoteData.quantity}
                                                onChange={(e) => handleQuoteChange('quantity', e.target.value)}
                                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3, bgcolor: '#f8fafc' } }}
                                            />
                                        </Box>
                                        <Box sx={{ flex: 1 }}>
                                            <Typography variant="caption" sx={{ fontWeight: 800, mb: 1, display: 'block', color: '#475569' }}>TIMELINE</Typography>
                                            <TextField
                                                select
                                                fullWidth
                                                value={quoteData.timeline}
                                                onChange={(e) => handleQuoteChange('timeline', e.target.value)}
                                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3, bgcolor: '#f8fafc' } }}
                                            >
                                                <MenuItem value="Immediate">Immediate</MenuItem>
                                                <MenuItem value="15 Days">Within 15 Days</MenuItem>
                                                <MenuItem value="30 Days">30+ Days</MenuItem>
                                            </TextField>
                                        </Box>
                                    </Stack>

                                    <Box>
                                        <Typography variant="caption" sx={{ fontWeight: 800, mb: 1, display: 'block', color: '#475569' }}>NOTES / REQUIREMENTS</Typography>
                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={3}
                                            placeholder="Specific size requests or branding..."
                                            value={quoteData.notes}
                                            onChange={(e) => handleQuoteChange('notes', e.target.value)}
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3, bgcolor: '#f8fafc' } }}
                                        />
                                    </Box>

                                    <Button
                                        variant="contained"
                                        fullWidth
                                        onClick={handleGetCustomQuote}
                                        sx={{
                                            bgcolor: '#b2d8d8',
                                            color: '#1e293b',
                                            py: 2,
                                            borderRadius: 4,
                                            fontWeight: 900,
                                            fontSize: '1rem',
                                            boxShadow: 'none',
                                            '&:hover': { bgcolor: '#9bc4c4', boxShadow: 'none' }
                                        }}
                                    >
                                        Get Custom Quote
                                    </Button>

                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        component="a"
                                        href={telHref}
                                        sx={{
                                            mt: 2,
                                            borderColor: '#0f172a',
                                            color: '#0f172a',
                                            py: 2,
                                            borderRadius: 4,
                                            fontWeight: 900,
                                            fontSize: '1rem',
                                            textTransform: 'none',
                                            '&:hover': { bgcolor: '#f1f5f9', borderColor: '#0f172a' }
                                        }}
                                    >
                                        Buy Sample Now — Call seller
                                    </Button>


                                </Stack>
                            </Paper>

                            {/* Vendor Information */}
                            <Box sx={{ mt: 4, p: 4, bgcolor: '#f8fafc', borderRadius: 6 }}>
                                <Typography variant="h6" sx={{ fontWeight: 800, mb: 4, color: '#1e293b' }}>VENDOR INFORMATION</Typography>
                                <Stack spacing={4}>
                                    <Stack direction="row" spacing={3} alignItems="center">
                                        <Box sx={{ bgcolor: 'white', p: 1.5, borderRadius: 3, display: 'flex' }}>
                                            <LocationOnOutlinedIcon sx={{ color: '#94a3b8' }} />
                                        </Box>
                                        <Box>
                                            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800, display: 'block' }}>Location</Typography>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{product.location || 'Erode, Tamil Nadu, India'}</Typography>
                                        </Box>
                                    </Stack>
                                    <Stack direction="row" spacing={3} alignItems="center">
                                        <Box sx={{ bgcolor: 'white', p: 1.5, borderRadius: 3, display: 'flex' }}>
                                            <EmailOutlinedIcon sx={{ color: '#94a3b8' }} />
                                        </Box>
                                        <Box>
                                            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800, display: 'block' }}>Email Address</Typography>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{product.email || 'wholesale@decorhub.xyz'}</Typography>
                                        </Box>
                                    </Stack>
                                    <Stack direction="row" spacing={3} alignItems="center">
                                        <Box sx={{ bgcolor: 'white', p: 1.5, borderRadius: 3, display: 'flex' }}>
                                            <PhoneEnabledOutlinedIcon sx={{ color: '#94a3b8' }} />
                                        </Box>
                                        <Box>
                                            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800, display: 'block' }}>Direct Line</Typography>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{product.phoneNumber || '+91 80802 21133'}</Typography>
                                        </Box>
                                    </Stack>
                                </Stack>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Container>

            <Footer />
        </Box>
    );
};

export default WholesaleProductDetails;
