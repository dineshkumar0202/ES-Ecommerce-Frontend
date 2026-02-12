import { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Divider,
    Stack,
    Paper,
    Avatar,
    Chip,
    IconButton
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
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

    // Fallback Mock Data
    const defaultProducts = [
        {
            _id: 'mock1',
            id: 1,
            title: "iPhone 13 Pro, 256GB",
            price: "599",
            condition: "CERTIFIED REFURBISHED",
            location: "San Francisco, CA",
            image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=400&q=80",
            images: ["https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=400&q=80"],
            tagColor: "#bef264",
            description: "Pristine condition iPhone 13 Pro. Battery health 98%. Comes with original box and cable. No scratches or dents.",
            seller: "TechResale Pro"
        },
        {
            _id: 'mock2',
            id: 2,
            title: "Herman Miller Aeron",
            price: "850",
            condition: "LIKE NEW",
            location: "Austin, TX",
            image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=400&q=80",
            images: ["https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=400&q=80"],
            tagColor: "#f1f5f9",
            description: "Fully loaded Herman Miller Aeron size B. PostureFit SL, tilt limiter, fully adjustable arms. Manufactured 2023.",
            seller: "Office Furniture Oulet"
        }
    ];

    useEffect(() => {
        const load = async () => {
            if (!id) return;
            try {
                const { data } = await ResaleService.getById(id);
                setFetchedProduct(data);
            } catch (error) {
                console.error("Error fetching resale product", error);
            } finally {
                setIsLoading(false);
            }
        };
        load();
    }, [id]);

    const product = fetchedProduct || location.state?.product || defaultProducts.find(p => p.id === Number(id));

    const handleToggleWishlist = async () => {
        if (!product?._id) {
            toast.error('Product ID not available.');
            return;
        }
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
            console.error(error);
            toast.error('Please login to manage wishlist');
        }
    };

    if (isLoading && !product) {
        return (
            <Box sx={{ bgcolor: 'white', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography>Loading...</Typography>
            </Box>
        );
    }

    if (!product) {
        return (
            <Box sx={{ bgcolor: 'white', minHeight: '100vh' }}>
                <Navbar />
                <Container maxWidth="xl" sx={{ mt: 4, mb: 8, textAlign: 'center' }}>
                    <Typography variant="h4">Product not found</Typography>
                    <Button onClick={() => navigate('/resale')} sx={{ mt: 2 }}>Back to Resale</Button>
                </Container>
                <Footer />
            </Box>
        );
    }

    const productImages = product.images && product.images.length > 0 ? product.images : [product.image];

    return (
        <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh' }}>
            <Navbar />
            <Container maxWidth="xl" sx={{ mt: 4, mb: 8 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    <Box sx={{ width: { xs: '100%', md: '58%' } }}>
                        <Paper elevation={0} sx={{ p: 2, borderRadius: 3, bgcolor: 'white', mb: 2 }}>
                            <Box sx={{ height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: '#f1f5f9', borderRadius: 2, mb: 2, overflow: 'hidden', position: 'relative' }}>
                                <img src={productImages[selectedImage]} alt={product.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                                <IconButton
                                    onClick={handleToggleWishlist}
                                    sx={{ position: 'absolute', top: 20, right: 20, bgcolor: 'white', p: 1.5, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', '&:hover': { bgcolor: '#f8fafc' } }}
                                >
                                    {isFavorite ? <FavoriteIcon sx={{ color: '#ef4444' }} /> : <FavoriteBorderIcon />}
                                </IconButton>
                            </Box>
                            <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', py: 1 }}>
                                {productImages.map((img: string, index: number) => (
                                    <Box key={index} onMouseEnter={() => setSelectedImage(index)} sx={{ width: 80, height: 80, flexShrink: 0, border: `2px solid ${selectedImage === index ? '#2563eb' : 'transparent'}`, borderRadius: 2, cursor: 'pointer', overflow: 'hidden' }}>
                                        <img src={img} alt={`thumb-${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </Box>
                                ))}
                            </Stack>
                        </Paper>
                        <Paper elevation={0} sx={{ p: 4, borderRadius: 3, bgcolor: 'white' }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Description</Typography>
                            <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.7 }}>{product.description || "No detailed description provided by the seller."}</Typography>
                        </Paper>
                    </Box>
                    <Box sx={{ width: { xs: '100%', md: '38%' } }}>
                        <Paper elevation={0} sx={{ p: 4, borderRadius: 3, bgcolor: 'white', height: '100%' }}>
                            <Chip label={product.condition} sx={{ bgcolor: product.tagColor || '#e2e8f0', color: '#0f172a', fontWeight: 700, mb: 2 }} />
                            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 800, color: '#0f172a' }}>{product.title}</Typography>
                            <Typography variant="h3" sx={{ fontWeight: 800, color: '#2563eb', mb: 3 }}>₹{product.price}</Typography>
                            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 4 }}><LocationOnIcon sx={{ color: '#64748b' }} /><Typography variant="body1" sx={{ color: '#64748b', fontWeight: 500 }}>{product.location}</Typography></Stack>
                            <Divider sx={{ my: 3 }} />
                            <Box sx={{ mb: 4 }}>
                                <Typography variant="subtitle2" sx={{ color: '#64748b', mb: 1 }}>Seller</Typography>
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <Avatar sx={{ bgcolor: '#2563eb', width: 48, height: 48 }}>{product.sellerName?.[0] || (typeof product.seller === 'string' ? product.seller[0] : (product.seller?.username?.[0] || 'S'))}</Avatar>
                                    <Box><Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{product.sellerName || (typeof product.seller === 'string' ? product.seller : (product.seller?.username || "Verified Seller"))}</Typography><Stack direction="row" alignItems="center" spacing={0.5}><VerifiedUserIcon sx={{ fontSize: 16, color: '#10b981' }} /><Typography variant="caption" sx={{ color: '#10b981', fontWeight: 600 }}>Identity Verified</Typography></Stack></Box>
                                </Stack>
                            </Box>
                            <Stack spacing={2}>
                                <Button variant="contained" fullWidth size="large" startIcon={<WhatsAppIcon />} sx={{ bgcolor: '#25d366', color: 'white', py: 1.5, fontWeight: 700, fontSize: '1.1rem', textTransform: 'none', '&:hover': { bgcolor: '#128c7e' } }}>Chat on WhatsApp</Button>
                                <Button variant="outlined" fullWidth size="large" sx={{ py: 1.5, color: '#0f172a', borderColor: '#cbd5e1', fontWeight: 700, textTransform: 'none', '&:hover': { bgcolor: '#f1f5f9', borderColor: '#94a3b8' } }}>Make an Offer</Button>
                            </Stack>
                            <Box sx={{ mt: 4, p: 2, bgcolor: '#eff6ff', borderRadius: 2 }}><Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1e40af', mb: 1 }}>Is this item still available?</Typography><Typography variant="body2" sx={{ color: '#1e3a8a' }}>Send a message to the seller to confirm availability and arrange a meetup.</Typography></Box>
                        </Paper>
                    </Box>
                </Box>
            </Container>
            <Footer />
        </Box>
    );
};

export default ResaleProductDetails;
