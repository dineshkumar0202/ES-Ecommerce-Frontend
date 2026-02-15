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
                // If the WishlistService supports deletion by ID, call it here.
                // Assuming removeFromWishlist is available.
                await WishlistService.removeFromWishlist(product._id);
                setIsFavorite(false);
                toast.success('Removed from wishlist');
            } else {
                await WishlistService.addToWishlist({ productId: product._id, type: 'wholesale' });
                setIsFavorite(true);
                toast.success('Added to wishlist!');
            }
        } catch (err: any) {
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
                <Box sx={{ mb: 3 }}>
                    <Breadcrumbs
                        separator={<NavigateNextIcon fontSize="small" />}
                        sx={{ '& .MuiTypography-root': { fontSize: '0.85rem', color: '#64748b' } }}
                    >
                        <Link href="/" underline="hover" color="inherit">Home</Link>
                        <Link href="/wholesale" underline="hover" color="inherit">{product.category || 'Wholesale'}</Link>
                        <Typography color="text.primary" sx={{ fontWeight: 600 }}>{product.title}</Typography>
                    </Breadcrumbs>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 6 }}>
                    {/* Left Side: Image Gallery */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Box sx={{ position: 'sticky', top: 100 }}>
                            <Box sx={{
                                borderRadius: 4,
                                bgcolor: '#ffffff',
                                border: '1px solid #e2e8f0',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '500px',
                                position: 'relative',
                                mb: 3,
                                overflow: 'hidden',
                                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
                            }}>
                                <img
                                    src={images[selectedImage]}
                                    alt={product.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <IconButton
                                    onClick={handleToggleWishlist}
                                    sx={{
                                        position: 'absolute',
                                        top: 16,
                                        right: 16,
                                        bgcolor: 'white',
                                        p: 1,
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                        '&:hover': { bgcolor: '#f8fafc' }
                                    }}
                                >
                                    {isFavorite ? <FavoriteIcon sx={{ color: '#ef4444', fontSize: 20 }} /> : <FavoriteBorderIcon sx={{ fontSize: 20 }} />}
                                </IconButton>
                            </Box>

                            {/* Thumbnails */}
                            <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', pb: 1, mb: 4 }}>
                                {images.map((img: string, index: number) => (
                                    <Box
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            borderRadius: 2,
                                            border: `2px solid ${selectedImage === index ? '#0f172a' : '#e2e8f0'}`,
                                            cursor: 'pointer',
                                            overflow: 'hidden',
                                            flexShrink: 0,
                                            opacity: selectedImage === index ? 1 : 0.7,
                                            transition: 'all 0.2s',
                                            '&:hover': { opacity: 1, borderColor: '#94a3b8' }
                                        }}
                                    >
                                        <img src={img} alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </Box>
                                ))}
                            </Stack>

                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 900, mb: 2, color: '#0f172a', textTransform: 'uppercase', fontSize: '1rem', letterSpacing: 0.5 }}>Product Description</Typography>
                                <Typography sx={{ color: '#64748b', lineHeight: 1.7, fontSize: '0.95rem' }}>
                                    {product.description}
                                </Typography>
                                <Typography sx={{ mt: 2, color: '#64748b', fontStyle: 'italic', fontSize: '0.9rem' }}>
                                    Good Product and call and WhatsApp...!
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* Right Side: Details and Forms */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', fontSize: { xs: '2rem', md: '2.5rem' }, lineHeight: 1.2, width: '70%' }}>
                                    {product.title}
                                </Typography>
                                <Box sx={{ textAlign: 'right' }}>
                                    <Chip
                                        label="IN STOCK"
                                        size="small"
                                        sx={{
                                            bgcolor: '#dcfce7',
                                            color: '#166534',
                                            fontWeight: 800,
                                            borderRadius: 1,
                                            fontSize: '0.65rem',
                                            height: 24,
                                            mb: 0.5
                                        }}
                                    />
                                    <Typography variant="caption" display="block" sx={{ color: '#cbd5e1', fontWeight: 600, fontSize: '0.65rem' }}>
                                        ID: {product._id?.slice(-8).toUpperCase() || 'XYZ-88022'}
                                    </Typography>
                                </Box>
                            </Box>

                            <Typography variant="body1" sx={{ color: '#64748b', fontWeight: 500, mb: 4 }}>
                                Bulk Wholesale Supply
                            </Typography>

                            {/* Order Info Cards */}
                            <Stack direction="row" spacing={2} sx={{ mb: 5 }}>
                                <Paper elevation={0} sx={{ flex: 1, py: 3, px: 2, bgcolor: '#f8fafc', borderRadius: 3, textAlign: 'center' }}>
                                    <Typography variant="caption" sx={{ fontWeight: 800, color: '#94a3b8', fontSize: '0.65rem', letterSpacing: 0.5, textTransform: 'uppercase' }}>MIN. ORDER</Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 800, mt: 0.5, color: '#1e293b' }}>{product.packSize || 12} Units</Typography>
                                </Paper>
                                <Paper elevation={0} sx={{ flex: 1, py: 3, px: 2, bgcolor: '#f8fafc', borderRadius: 3, textAlign: 'center' }}>
                                    <Typography variant="caption" sx={{ fontWeight: 800, color: '#94a3b8', fontSize: '0.65rem', letterSpacing: 0.5, textTransform: 'uppercase' }}>STANDARD PACK</Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 800, mt: 0.5, color: '#1e293b' }}>Carton Box</Typography>
                                </Paper>
                            </Stack>

                            {/* Quote Form */}
                            <Paper elevation={0} sx={{
                                p: 0,
                                borderRadius: 0,
                                bgcolor: 'transparent'
                                // Removed border and shadow to match clean look of screenshot
                            }}>
                                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: '#0f172a' }}>Request for Bulk Quote</Typography>
                                <Typography variant="body2" sx={{ color: '#64748b', mb: 3, fontSize: '0.9rem' }}>
                                    Enter your details to receive our latest wholesale price list and lead times.
                                </Typography>

                                <Stack spacing={2.5}>
                                    <Stack direction="row" spacing={2}>
                                        <Box sx={{ flex: 1 }}>
                                            <Typography variant="caption" sx={{ fontWeight: 700, mb: 0.5, display: 'block', color: '#94a3b8', fontSize: '0.65rem', letterSpacing: 0.5 }}>QUANTITY NEEDED</Typography>
                                            <TextField
                                                fullWidth
                                                placeholder="e.g. 100"
                                                value={quoteData.quantity}
                                                onChange={(e) => handleQuoteChange('quantity', e.target.value)}
                                                InputProps={{ sx: { bgcolor: '#f8fafc', borderRadius: 2, fontSize: '0.9rem' } }}
                                                size="small"
                                            />
                                        </Box>
                                        <Box sx={{ flex: 1 }}>
                                            <Typography variant="caption" sx={{ fontWeight: 700, mb: 0.5, display: 'block', color: '#94a3b8', fontSize: '0.65rem', letterSpacing: 0.5 }}>TIMELINE</Typography>
                                            <TextField
                                                select
                                                fullWidth
                                                value={quoteData.timeline}
                                                onChange={(e) => handleQuoteChange('timeline', e.target.value)}
                                                InputProps={{ sx: { bgcolor: '#f8fafc', borderRadius: 2, fontSize: '0.9rem' } }}
                                                size="small"
                                            >
                                                <MenuItem value="Immediate">Immediate</MenuItem>
                                                <MenuItem value="15 Days">Within 15 Days</MenuItem>
                                                <MenuItem value="30 Days">30+ Days</MenuItem>
                                            </TextField>
                                        </Box>
                                    </Stack>

                                    <Box>
                                        <Typography variant="caption" sx={{ fontWeight: 700, mb: 0.5, display: 'block', color: '#94a3b8', fontSize: '0.65rem', letterSpacing: 0.5 }}>NOTES / REQUIREMENTS</Typography>
                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={3}
                                            placeholder="Specific size requests or branding..."
                                            value={quoteData.notes}
                                            onChange={(e) => handleQuoteChange('notes', e.target.value)}
                                            InputProps={{ sx: { bgcolor: '#f8fafc', borderRadius: 2, fontSize: '0.9rem' } }}
                                        />
                                    </Box>

                                    <Button
                                        variant="contained"
                                        fullWidth
                                        onClick={handleGetCustomQuote}
                                        sx={{
                                            bgcolor: '#abcdd3', // Matched color from screenshot usually
                                            color: '#164e63',
                                            py: 1.5,
                                            mt: 1,
                                            borderRadius: 2,
                                            fontWeight: 800,
                                            fontSize: '0.85rem',
                                            boxShadow: 'none',
                                            textTransform: 'uppercase',
                                            letterSpacing: 0.5,
                                            '&:hover': { bgcolor: '#9cc0c7', boxShadow: 'none' }
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
                                            borderColor: '#1e293b',
                                            color: '#1e293b',
                                            py: 1.5,
                                            borderRadius: 2,
                                            fontWeight: 800,
                                            fontSize: '0.85rem',
                                            textTransform: 'none',
                                            '&:hover': { bgcolor: '#f8fafc', borderColor: '#0f172a' }
                                        }}
                                    >
                                        Buy Sample Now — Call seller
                                    </Button>
                                </Stack>
                            </Paper>

                            {/* Vendor Information */}
                            <Box sx={{ mt: 5, p: 0 }}>
                                <Typography variant="caption" sx={{ fontWeight: 800, mb: 3, display: 'block', color: '#64748b', letterSpacing: 1, textTransform: 'uppercase' }}>VENDOR INFORMATION</Typography>
                                <Stack spacing={3}>
                                    <Stack direction="row" spacing={2} alignItems="flex-start">
                                        <Box sx={{ bgcolor: '#f1f5f9', p: 1, borderRadius: '50%', display: 'flex' }}>
                                            <LocationOnOutlinedIcon sx={{ color: '#64748b', fontSize: 18 }} />
                                        </Box>
                                        <Box>
                                            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, display: 'block', fontSize: '0.6rem', letterSpacing: 0.5, textTransform: 'uppercase' }}>Location</Typography>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1e293b', fontSize: '0.85rem' }}>{product.location || 'Erode, Tamil Nadu, India'}</Typography>
                                        </Box>
                                    </Stack>
                                    <Stack direction="row" spacing={2} alignItems="flex-start">
                                        <Box sx={{ bgcolor: '#f1f5f9', p: 1, borderRadius: '50%', display: 'flex' }}>
                                            <EmailOutlinedIcon sx={{ color: '#64748b', fontSize: 18 }} />
                                        </Box>
                                        <Box>
                                            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, display: 'block', fontSize: '0.6rem', letterSpacing: 0.5, textTransform: 'uppercase' }}>Email Address</Typography>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1e293b', fontSize: '0.85rem' }}>{product.email || 'wholesale@decorhub.xyz'}</Typography>
                                        </Box>
                                    </Stack>
                                    <Stack direction="row" spacing={2} alignItems="flex-start">
                                        <Box sx={{ bgcolor: '#f1f5f9', p: 1, borderRadius: '50%', display: 'flex' }}>
                                            <PhoneEnabledOutlinedIcon sx={{ color: '#64748b', fontSize: 18 }} />
                                        </Box>
                                        <Box>
                                            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, display: 'block', fontSize: '0.6rem', letterSpacing: 0.5, textTransform: 'uppercase' }}>Direct Line</Typography>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1e293b', fontSize: '0.85rem' }}>{product.phoneNumber || '+91 80802 21133'}</Typography>
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
