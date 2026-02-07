import { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Divider,
    Stack,
    Paper,
    Avatar,
    Chip
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../../../WrapperComponents/Navbar';
import Footer from '../../../WrapperComponents/Footer';

const ResaleProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedImage, setSelectedImage] = useState(0);

    // In a real app, you would fetch the product details by ID.
    // Here we'll use the location state passed from the previous page,
    // or fallback to a lookup if accessed directly (mocked here for simplicity).

    // Attempt to get product from state (passed from SHRecentlyListed)
    let product = location.state?.product;

    // Fallback Mock Data if state is missing (e.g. direct URL access)
    // This replicates the default items logic from SHRecentlyListed
    // Fallback Mock Data if state is missing (e.g. direct URL access)
    // This replicates the default items logic from SHRecentlyListed (ensure mock data is defined)

    const defaultProducts = [
        {
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
        },
        {
            id: 3,
            title: "Nike Air Max 270",
            price: "120",
            condition: "GREAT VALUE",
            location: "Brooklyn, NY",
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80",
            images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80"],
            tagColor: "#bef264",
            description: "Only worn twice. Great value for the price.",
            seller: "SneakerHead NYC"
        },
        {
            id: 4,
            title: "MacBook Pro M1 13\"",
            price: "950",
            condition: "CERTIFIED REFURBISHED",
            location: "Seattle, WA",
            image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=400&q=80",
            images: ["https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=400&q=80"],
            tagColor: "#bef264",
            description: "Factory refurbished M1 MacBook Pro with 1 year warranty.",
            seller: "Apple Certified Refurb"
        },
        {
            id: 6,
            title: "Dyson V15 Detect",
            price: "450",
            condition: "LIKE NEW",
            location: "Chicago, IL",
            image: "https://images.unsplash.com/photo-1558317374-a35c202f4369?auto=format&fit=crop&w=400&q=80",
            images: ["https://images.unsplash.com/photo-1558317374-a35c202f4369?auto=format&fit=crop&w=400&q=80"],
            tagColor: "#f1f5f9",
            description: "Powerful cordless vacuum. Includes all attachments.",
            seller: "Home Goods Resale"
        },
        {
            id: 7,
            title: "Canon EOS R6 Body",
            price: "1800",
            condition: "USED - GOOD",
            location: "Miami, FL",
            image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80",
            images: ["https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80"],
            tagColor: "#bef264",
            description: "Low shutter count. Perfect for photography enthusiasts.",
            seller: "Camera Exchange"
        },
        {
            id: 8,
            title: "PS5 Disc Edition",
            price: "400",
            condition: "OPEN BOX",
            location: "Houston, TX",
            image: "https://images.unsplash.com/photo-1606318548125-527137a54139?auto=format&fit=crop&w=400&q=80",
            images: ["https://images.unsplash.com/photo-1606318548125-527137a54139?auto=format&fit=crop&w=400&q=80"],
            tagColor: "#f1f5f9",
            description: "Unused PS5 console. Box opened only to check contents.",
            seller: "Gamer's Paradise"
        },
        {
            id: 9,
            title: "iPad Air 5th Gen",
            price: "480",
            condition: "CERTIFIED REFURBISHED",
            location: "Boston, MA",
            image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=400&q=80",
            images: ["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=400&q=80"],
            tagColor: "#bef264",
            description: "Sleek and powerful tablet. Perfect for creativity and productivity.",
            seller: "Tech Deals"
        }
    ];

    if (!product) {
        product = defaultProducts.find(p => p.id === Number(id));
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

    // Ensure images array exists
    const productImages = product.images && product.images.length > 0 ? product.images : [product.image];

    return (
        <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh' }}>
            <Navbar />

            <Container maxWidth="xl" sx={{ mt: 4, mb: 8 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>

                    {/* Left Column: Images */}
                    <Box sx={{ width: { xs: '100%', md: '58%' } }}>
                        <Paper elevation={0} sx={{ p: 2, borderRadius: 3, bgcolor: 'white', mb: 2 }}>
                            <Box
                                sx={{
                                    height: '500px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    bgcolor: '#f1f5f9',
                                    borderRadius: 2,
                                    mb: 2,
                                    overflow: 'hidden'
                                }}
                            >
                                <img
                                    src={productImages[selectedImage]}
                                    alt={product.title}
                                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                />
                            </Box>
                            <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', py: 1 }}>
                                {productImages.map((img: string, index: number) => (
                                    <Box
                                        key={index}
                                        onMouseEnter={() => setSelectedImage(index)}
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            flexShrink: 0,
                                            border: `2px solid ${selectedImage === index ? '#2563eb' : 'transparent'}`,
                                            borderRadius: 2,
                                            cursor: 'pointer',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        <img
                                            src={img}
                                            alt={`thumb-${index}`}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </Box>
                                ))}
                            </Stack>
                        </Paper>

                        {/* Description for mobile/desktop layout flow */}
                        <Paper elevation={0} sx={{ p: 4, borderRadius: 3, bgcolor: 'white' }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Description</Typography>
                            <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.7 }}>
                                {product.description || "No detailed description provided by the seller."}
                            </Typography>
                        </Paper>
                    </Box>

                    {/* Right Column: Details & Seller Info */}
                    <Box sx={{ width: { xs: '100%', md: '38%' } }}>
                        <Paper elevation={0} sx={{ p: 4, borderRadius: 3, bgcolor: 'white', height: '100%' }}>

                            <Chip
                                label={product.condition}
                                sx={{
                                    bgcolor: product.tagColor || '#e2e8f0',
                                    color: '#0f172a',
                                    fontWeight: 700,
                                    mb: 2
                                }}
                            />

                            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 800, color: '#0f172a' }}>
                                {product.title}
                            </Typography>

                            <Typography variant="h3" sx={{ fontWeight: 800, color: '#2563eb', mb: 3 }}>
                                ₹{product.price}
                            </Typography>

                            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 4 }}>
                                <LocationOnIcon sx={{ color: '#64748b' }} />
                                <Typography variant="body1" sx={{ color: '#64748b', fontWeight: 500 }}>
                                    {product.location}
                                </Typography>
                            </Stack>

                            <Divider sx={{ my: 3 }} />

                            <Box sx={{ mb: 4 }}>
                                <Typography variant="subtitle2" sx={{ color: '#64748b', mb: 1 }}>Seller</Typography>
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <Avatar sx={{ bgcolor: '#2563eb', width: 48, height: 48 }}>
                                        {product.seller ? product.seller.charAt(0) : 'S'}
                                    </Avatar>
                                    <Box>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                            {product.seller || "Verified Seller"}
                                        </Typography>
                                        <Stack direction="row" alignItems="center" spacing={0.5}>
                                            <VerifiedUserIcon sx={{ fontSize: 16, color: '#10b981' }} />
                                            <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 600 }}>
                                                Identity Verified
                                            </Typography>
                                        </Stack>
                                    </Box>
                                </Stack>
                            </Box>

                            <Stack spacing={2}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    size="large"
                                    startIcon={<WhatsAppIcon />}
                                    sx={{
                                        bgcolor: '#25d366',
                                        color: 'white',
                                        py: 1.5,
                                        fontWeight: 700,
                                        fontSize: '1.1rem',
                                        textTransform: 'none',
                                        '&:hover': { bgcolor: '#128c7e' }
                                    }}
                                >
                                    Chat on WhatsApp
                                </Button>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    size="large"
                                    sx={{
                                        py: 1.5,
                                        color: '#0f172a',
                                        borderColor: '#cbd5e1',
                                        fontWeight: 700,
                                        textTransform: 'none',
                                        '&:hover': { bgcolor: '#f1f5f9', borderColor: '#94a3b8' }
                                    }}
                                >
                                    Make an Offer
                                </Button>
                            </Stack>

                            <Box sx={{ mt: 4, p: 2, bgcolor: '#eff6ff', borderRadius: 2 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1e40af', mb: 1 }}>
                                    Is this item still available?
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#1e3a8a' }}>
                                    Send a message to the seller to confirm availability and arrange a meetup.
                                </Typography>
                            </Box>

                        </Paper>
                    </Box>

                </Box>
            </Container>

            <Footer />
        </Box>
    );
};

export default ResaleProductDetails;
