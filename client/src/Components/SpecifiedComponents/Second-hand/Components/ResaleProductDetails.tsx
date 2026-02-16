import { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Stack,
    Paper,
    Avatar,
    Chip,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    CircularProgress
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import Navbar from '../../../WrapperComponents/Navbar';
import Footer from '../../../WrapperComponents/Footer';
import { ResaleService, WishlistService } from '../../../../services/api';
import { toast } from 'react-toastify';

const ResaleProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedImage, setSelectedImage] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchedProduct, setFetchedProduct] = useState<any>(null);
    const [similarProducts, setSimilarProducts] = useState<any[]>([]);
    const [offerDialogOpen, setOfferDialogOpen] = useState(false);
    const [offerAmount, setOfferAmount] = useState('');

    useEffect(() => {
        const load = async () => {
            if (!id) return;
            setIsLoading(true);
            try {
                // Fetch current product
                const { data } = await ResaleService.getById(id);
                setFetchedProduct(data);

                // Check wishlist status
                try {
                    const { data: wishlistData } = await WishlistService.getWishlist();
                    const inWishlist = wishlistData.items?.some((item: any) =>
                        item.product?._id === data._id || item.product === data._id
                    );
                    setIsFavorite(!!inWishlist);
                } catch (e) {
                    console.log("Not logged in or wishlist error");
                }

                // Fetch similar products (same category)
                try {
                    const { data: allResale } = await ResaleService.getAll();
                    const filtered = allResale
                        .filter((p: any) => p._id !== data._id && p.category === data.category)
                        .slice(0, 4);
                    setSimilarProducts(filtered);
                } catch (e) {
                    console.error("Error fetching similar products", e);
                }

            } catch (error) {
                console.error("Error fetching resale product", error);
                toast.error("Failed to load product details");
            } finally {
                setIsLoading(false);
            }
        };
        load();
        window.scrollTo(0, 0);
    }, [id]);

    const product = fetchedProduct || location.state?.product;

    const handleToggleWishlist = async () => {
        if (!product?._id) return;
        try {
            if (isFavorite) {
                await WishlistService.removeFromWishlist(product._id);
                setIsFavorite(false);
                toast.success('Removed from wishlist');
            } else {
                await WishlistService.addToWishlist({
                    productId: product._id,
                    type: 'resale'
                });
                setIsFavorite(true);
                toast.success('Added to wishlist!');
            }
        } catch (error) {
            toast.error('Please login to manage wishlist');
        }
    };

    const handleWhatsAppChat = () => {
        if (!product) return;
        const phone = product.mobile || '1234567890'; // fallback
        const message = encodeURIComponent(`Hi, I'm interested in your "${product.title}" listed on ES-Ecommerce for ₹${product.price}. Is it still available?`);
        window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    };

    const handleMakeOffer = () => {
        if (!offerAmount) {
            toast.error("Please enter an amount");
            return;
        }
        toast.success(`Offer of ₹${offerAmount} sent to seller!`);
        setOfferDialogOpen(false);
        setOfferAmount('');
    };

    const handleDownloadBill = () => {
        if (!product) return;

        const billContent = `
            ES-ECOMMERCE RESALE BILL
            ------------------------
            Item: ${product.title}
            Category: ${product.category}
            Condition: ${product.condition}
            Price: ₹${product.price}
            Seller: ${product.sellerName}
            Phone: ${product.mobile || 'N/A'}
            Email: ${product.email || 'N/A'}
            Location: ${product.location}
            Date: ${new Date().toLocaleDateString()}
            ------------------------
            Thank you for using our platform!
        `;

        const blob = new Blob([billContent], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Bill_${product.title.replace(/\s+/g, '_')}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Bill downloaded successfully!");
    };

    if (isLoading) {
        return (
            <Box sx={{ bgcolor: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Navbar />
                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CircularProgress sx={{ color: '#2563eb' }} />
                </Box>
                <Footer />
            </Box>
        );
    }

    if (!product) {
        return (
            <Box sx={{ bgcolor: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Navbar />
                <Container maxWidth="xl" sx={{ mt: 8, mb: 8, textAlign: 'center', flex: 1 }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>Product Not Found</Typography>
                    <Typography color="text.secondary" sx={{ mb: 4 }}>The item you're looking for might have been sold or removed.</Typography>
                    <Button variant="contained" onClick={() => navigate('/resale')} sx={{ bgcolor: 'black', borderRadius: 2, px: 4 }}>Back to Resale</Button>
                </Container>
                <Footer />
            </Box>
        );
    }

    const productImages = product.images && product.images.length > 0 ? product.images : [product.image];

    return (
        <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh' }}>
            <Navbar />

            <Container maxWidth="lg" sx={{ mt: { xs: 2, md: 6 }, mb: 10 }}>
                {/* Desktop/Tablet Layout */}
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
                    {/* Left Side: Images */}
                    <Box sx={{ width: { xs: '100%', md: '58.333333%' } }}>
                        <Paper elevation={0} sx={{ p: 2, borderRadius: 6, bgcolor: 'white', border: '1px solid #f1f5f9' }}>
                            <Box sx={{
                                position: 'relative',
                                pt: '100%', // 1:1 Aspect Ratio
                                bgcolor: '#f1f5f9',
                                borderRadius: 4,
                                mb: 2,
                                overflow: 'hidden'
                            }}>
                                <Box
                                    component="img"
                                    src={productImages[selectedImage]}
                                    alt={product.title}
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                        p: 2
                                    }}
                                />
                                <Stack direction="row" spacing={1} sx={{ position: 'absolute', top: 20, right: 20 }}>
                                    <IconButton
                                        onClick={() => {
                                            navigator.clipboard.writeText(window.location.href);
                                            toast.info("Link copied to clipboard!");
                                        }}
                                        sx={{ bgcolor: 'white', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', '&:hover': { bgcolor: '#f1f5f9' } }}
                                    >
                                        <ShareIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                        onClick={handleToggleWishlist}
                                        sx={{ bgcolor: 'white', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', '&:hover': { bgcolor: '#f1f5f9' } }}
                                    >
                                        {isFavorite ? <FavoriteIcon sx={{ color: '#ef4444' }} /> : <FavoriteBorderIcon />}
                                    </IconButton>
                                </Stack>
                            </Box>

                            {/* Thumbnails */}
                            <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', py: 1, '::-webkit-scrollbar': { display: 'none' } }}>
                                {productImages.map((img: string, index: number) => (
                                    <Box
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            flexShrink: 0,
                                            border: `3px solid ${selectedImage === index ? '#2563eb' : 'transparent'}`,
                                            borderRadius: 3,
                                            cursor: 'pointer',
                                            overflow: 'hidden',
                                            transition: 'transform 0.2s',
                                            '&:hover': { transform: 'scale(1.05)' }
                                        }}
                                    >
                                        <img src={img} alt={`thumb-${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </Box>
                                ))}
                            </Stack>
                        </Paper>

                        {/* Description Section */}
                        <Paper elevation={0} sx={{ p: 4, borderRadius: 6, bgcolor: 'white', mt: 4, border: '1px solid #f1f5f9' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                                <ArticleOutlinedIcon sx={{ color: '#64748b' }} />
                                <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a' }}>Description</Typography>
                            </Box>
                            <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                                {product.description || "Beautifully crafted custom music photo frame. Perfect for gifting or home decor. Condition is practically brand new with no scratches or damage to the frame or glass."}
                            </Typography>
                        </Paper>

                        {/* Location & Pickup Section */}
                        <Paper elevation={0} sx={{ p: 4, borderRadius: 6, bgcolor: 'white', mt: 4, border: '1px solid #f1f5f9' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                                <LocationOnIcon sx={{ color: '#64748b' }} />
                                <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a' }}>Location & Pickup</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3 }}>
                                <Box sx={{ flex: 1, p: 2.5, bgcolor: '#f8fafc', borderRadius: 4, border: '1px solid #f1f5f9' }}>
                                    <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800, letterSpacing: 1, display: 'block', mb: 1 }}>DETAILED ADDRESS</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#475569', lineHeight: 1.6 }}>
                                        {product.location}<br />
                                        Tamil Nadu, India
                                    </Typography>
                                </Box>
                                <Box sx={{ flex: 1.2, height: 140, bgcolor: '#f1f5f9', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e2e8f0', position: 'relative', overflow: 'hidden' }}>
                                    <LocationOnIcon sx={{ fontSize: 40, color: '#B4D5DC', opacity: 0.5 }} />
                                    <Typography variant="caption" sx={{ position: 'absolute', bottom: 10, right: 10, fontWeight: 700, color: '#94a3b8' }}>{product.location?.toUpperCase()}</Typography>
                                </Box>
                            </Box>

                            <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 3, color: '#64748b', fontWeight: 600 }}>
                                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#10b981' }} />
                                Pickup available Mon-Sat, 10 AM - 7 PM
                            </Typography>
                        </Paper>
                    </Box>

                    {/* Right Side: Details & Actions */}
                    <Box sx={{ width: { xs: '100%', md: '41.666667%' } }}>
                        <Stack spacing={3} sx={{ position: { md: 'sticky' }, top: 100 }}>
                            <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 6, bgcolor: 'white', border: '1px solid #f1f5f9' }}>
                                <Chip
                                    label={product.condition?.toUpperCase()}
                                    size="small"
                                    icon={<Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#0f172a' }} />}
                                    sx={{
                                        bgcolor: '#f1f5f9',
                                        color: '#0f172a',
                                        fontWeight: 800,
                                        fontSize: '0.65rem',
                                        mb: 2,
                                        height: 28,
                                        '& .MuiChip-label': { pl: 1 }
                                    }}
                                />
                                <Typography variant="h4" component="h1" sx={{ fontWeight: 800, color: '#0f172a', mb: 0.5 }}>
                                    {product.title}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600, mb: 3 }}>
                                    <LocationOnIcon sx={{ fontSize: 14, verticalAlign: 'middle', mr: 0.5 }} />
                                    {product.location}
                                </Typography>

                                <Typography variant="h2" sx={{ fontWeight: 900, color: '#0f172a', mb: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>₹</Typography>
                                    {Number(product.price).toLocaleString('en-IN')}
                                </Typography>

                                <Box sx={{ mb: 4, p: 2.5, bgcolor: '#f8fafc', borderRadius: 4, border: '1px solid #f1f5f9' }}>
                                    <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                                        <Avatar sx={{ bgcolor: '#B4D5DC', color: '#0f172a', width: 44, height: 44, fontWeight: 800 }}>
                                            {(product.sellerName || "S")[0]}
                                        </Avatar>
                                        <Box flex={1}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0f172a', lineHeight: 1.2, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                {product.sellerName || "Verified Seller"}
                                                <VerifiedUserIcon sx={{ fontSize: 16, color: '#3b82f6' }} />
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                                                Identity Verified • 4.5 Rating
                                            </Typography>
                                        </Box>
                                    </Stack>

                                    <Stack spacing={1.5}>
                                        <Stack direction="row" spacing={1.5} alignItems="center">
                                            <PhoneIcon sx={{ fontSize: 16, color: '#94a3b8' }} />
                                            <Typography variant="body2" sx={{ color: '#475569', fontWeight: 600 }}>{product.mobile || '+91 93785 43210'}</Typography>
                                        </Stack>
                                        <Stack direction="row" spacing={1.5} alignItems="center">
                                            <EmailIcon sx={{ fontSize: 16, color: '#94a3b8' }} />
                                            <Typography variant="body2" sx={{ color: '#475569', fontWeight: 600 }}>{product.email || 'seller.k@email.com'}</Typography>
                                        </Stack>
                                    </Stack>
                                </Box>

                                <Stack spacing={2}>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        size="large"
                                        startIcon={<WhatsAppIcon />}
                                        onClick={handleWhatsAppChat}
                                        sx={{
                                            bgcolor: '#B4D5DC',
                                            color: '#0f172a',
                                            py: 1.8,
                                            borderRadius: 3,
                                            fontWeight: 800,
                                            fontSize: '0.9rem',
                                            textTransform: 'none',
                                            boxShadow: 'none',
                                            '&:hover': { bgcolor: '#9bc4ce', boxShadow: 'none' }
                                        }}
                                    >
                                        Chat on WhatsApp
                                    </Button>
                                    <Stack direction="row" spacing={2}>
                                        <Button
                                            variant="outlined"
                                            fullWidth
                                            onClick={() => setOfferDialogOpen(true)}
                                            sx={{
                                                py: 1.5,
                                                borderRadius: 3,
                                                color: '#0f172a',
                                                borderColor: '#0f172a',
                                                borderWidth: 1.5,
                                                fontWeight: 800,
                                                textTransform: 'none',
                                                '&:hover': { bgcolor: '#f8fafc', borderColor: '#0f172a', borderWidth: 1.5 }
                                            }}
                                        >
                                            Make Offer
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            fullWidth
                                            startIcon={<ReceiptLongIcon />}
                                            onClick={handleDownloadBill}
                                            sx={{
                                                py: 1.5,
                                                borderRadius: 3,
                                                color: '#0f172a',
                                                borderColor: '#0f172a',
                                                borderWidth: 1.5,
                                                fontWeight: 800,
                                                textTransform: 'none',
                                                '&:hover': { bgcolor: '#f8fafc', borderColor: '#0f172a', borderWidth: 1.5 }
                                            }}
                                        >
                                            Get Bill
                                        </Button>
                                    </Stack>
                                    {product.billUrl && (
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            startIcon={<ReceiptLongIcon />}
                                            onClick={() => {
                                                if (product.billUrl.startsWith('data:')) {
                                                    const win = window.open();
                                                    win?.document.write(`<iframe src="${product.billUrl}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
                                                } else {
                                                    window.open(product.billUrl, '_blank');
                                                }
                                            }}
                                            sx={{
                                                mt: 2,
                                                py: 1.5,
                                                borderRadius: 3,
                                                bgcolor: '#0f172a',
                                                color: 'white',
                                                fontWeight: 800,
                                                textTransform: 'none',
                                                '&:hover': { bgcolor: '#334155' }
                                            }}
                                        >
                                            See Original Bill
                                        </Button>
                                    )}
                                </Stack>
                            </Paper>

                            <Box sx={{ p: 3, bgcolor: '#eff6ff', borderRadius: 4, display: 'flex', gap: 2 }}>
                                <QuestionMarkIcon sx={{ color: '#3b82f6', fontSize: 20, mt: 0.3 }} />
                                <Box>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0f172a', mb: 0.5 }}>
                                        Is this item still available?
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: '#475569', lineHeight: 1.4, display: 'block' }}>
                                        Send a quick message to the seller to confirm availability and arrange a meetup or delivery.
                                    </Typography>
                                </Box>
                            </Box>
                        </Stack>
                    </Box>
                </Box>

                {/* Similar Products */}
                {similarProducts.length > 0 && (
                    <Box sx={{ mt: 10 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                            <Typography variant="h4" sx={{ fontWeight: 900, color: '#0f172a', letterSpacing: -0.5 }}>
                                Similar Items
                            </Typography>
                            <Stack direction="row" spacing={1}>
                                <IconButton size="small" sx={{ border: '1px solid #e2e8f0', bgcolor: 'white' }}><ArrowBackIosNewIcon fontSize="small" /></IconButton>
                                <IconButton size="small" sx={{ border: '1px solid #e2e8f0', bgcolor: 'white' }}><ArrowForwardIosIcon fontSize="small" /></IconButton>
                            </Stack>
                        </Box>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                            {similarProducts.map((p) => (
                                <Box key={p._id} sx={{ width: { xs: 'calc(50% - 12px)', sm: 'calc(33.33% - 16px)', md: 'calc(25% - 18px)' } }}>
                                    <Paper
                                        component={Link}
                                        to={`/resale/product/${p._id}`}
                                        elevation={0}
                                        sx={{
                                            p: 0,
                                            borderRadius: 6,
                                            overflow: 'hidden',
                                            bgcolor: 'transparent',
                                            textDecoration: 'none',
                                            color: 'inherit',
                                            transition: 'all 0.3s ease',
                                            display: 'block',
                                            '&:hover': { transform: 'translateY(-8px)' }
                                        }}
                                    >
                                        <Box sx={{
                                            position: 'relative',
                                            aspectRatio: '1/1',
                                            bgcolor: '#f1f5f9',
                                            borderRadius: 6,
                                            mb: 2,
                                            overflow: 'hidden'
                                        }}>
                                            <img
                                                src={p.image}
                                                alt={p.title}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                            <Box sx={{
                                                position: 'absolute',
                                                bottom: 12,
                                                left: 12,
                                                bgcolor: 'rgba(255,255,255,0.9)',
                                                backdropFilter: 'blur(4px)',
                                                px: 1.5,
                                                py: 0.5,
                                                borderRadius: 2,
                                                boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                                            }}>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 900, color: '#0f172a' }}>
                                                    ₹{p.price.toLocaleString('en-IN')}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={{ px: 1 }}>
                                            <Typography variant="subtitle1" noWrap sx={{ fontWeight: 800, color: '#0f172a', mb: 0.5 }}>{p.title}</Typography>
                                            <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>{p.location}</Typography>
                                        </Box>
                                    </Paper>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                )}
            </Container>

            {/* Offer Dialog */}
            <Dialog
                open={offerDialogOpen}
                onClose={() => setOfferDialogOpen(false)}
                PaperProps={{ sx: { borderRadius: 4, p: 2, maxWidth: 400 } }}
            >
                <DialogTitle sx={{ fontWeight: 900, textAlign: 'center' }}>Make an Offer</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" sx={{ color: '#64748b', mb: 3, textAlign: 'center' }}>
                        Suggest a price to the seller. They can accept, decline, or counter your offer.
                    </Typography>
                    <TextField
                        fullWidth
                        label="Your Offer Amount"
                        type="number"
                        value={offerAmount}
                        onChange={(e) => setOfferAmount(e.target.value)}
                        placeholder={`Listing price: ₹${product.price}`}
                        InputProps={{
                            startAdornment: <Typography sx={{ mr: 1, fontWeight: 700 }}>₹</Typography>,
                            sx: { borderRadius: 3, fontWeight: 700 }
                        }}
                    />
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 3 }}>
                    <Button onClick={() => setOfferDialogOpen(false)} sx={{ color: '#64748b', fontWeight: 700 }}>Cancel</Button>
                    <Button
                        onClick={handleMakeOffer}
                        variant="contained"
                        sx={{ bgcolor: 'black', borderRadius: 2, px: 4, fontWeight: 700, '&:hover': { bgcolor: '#333' } }}
                    >
                        Send Offer
                    </Button>
                </DialogActions>
            </Dialog>

            <Footer />
        </Box>
    );
};

export default ResaleProductDetails;
