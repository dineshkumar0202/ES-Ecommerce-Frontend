import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Button, Paper, Divider, Stack, Dialog, Rating, Avatar, IconButton, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import CloseIcon from '@mui/icons-material/Close';
import Navbar from '../../../WrapperComponents/Navbar';
import Footer from '../../../WrapperComponents/Footer';

const WholesaleProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState<any>(null);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [openImageDialog, setOpenImageDialog] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Review Form State
    const [reviewName, setReviewName] = useState('');
    const [reviewRating, setReviewRating] = useState<number | null>(0);
    const [reviewComment, setReviewComment] = useState('');

    useEffect(() => {
        const storedProducts = localStorage.getItem('wholesaleProducts_v1.2');
        if (storedProducts) {
            const products = JSON.parse(storedProducts);
            const foundProduct = products.find((p: any) => p.id == id);
            if (foundProduct) {
                // Ensure images array exists, fallback to single image if needed
                if (!foundProduct.images && foundProduct.image) {
                    foundProduct.images = [foundProduct.image];
                }
                setProduct(foundProduct);
            }
        }
    }, [id]);

    // Auto-slide functionality
    useEffect(() => {
        if (!product?.images || product.images.length <= 1 || isHovered) return;

        const interval = setInterval(() => {
            setActiveImageIndex((prev) => (prev + 1) % product.images.length);
        }, 3000); // Slide every 3 seconds

        return () => clearInterval(interval);
    }, [product, isHovered]);

    const handleSubmitReview = () => {
        if (!reviewName || !reviewRating || !reviewComment) return;

        const newReview = {
            user: reviewName,
            rating: reviewRating,
            comment: reviewComment
        };

        const updatedProduct = { ...product, reviews: [newReview, ...(product.reviews || [])] };
        setProduct(updatedProduct);

        // Update local storage
        const storedProducts = localStorage.getItem('wholesaleProducts_v1.2');
        if (storedProducts) {
            const products = JSON.parse(storedProducts);
            const updatedProducts = products.map((p: any) => p.id == product.id ? updatedProduct : p);
            localStorage.setItem('wholesaleProducts_v1.2', JSON.stringify(updatedProducts));
        }

        // Reset form
        setReviewName('');
        setReviewRating(0);
        setReviewComment('');
    };

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

    const activeImageSrc = product.images && product.images.length > 0 ? product.images[activeImageIndex] : product.image;

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
            <Navbar />

            <Container maxWidth="lg" sx={{ mt: 4, mb: 12 }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/wholesale')}
                    sx={{ mb: 2, color: '#64748b' }}
                >
                    Back to Wholesale
                </Button>

                <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>

                        {/* LEFT COLUMN: Images & Write Review */}
                        <Box sx={{ width: { xs: '100%', md: '50%' }, borderRight: { md: '1px solid #e2e8f0' }, p: 4 }}>
                            {/* Simple Main Image + Auto Slide Logic */}
                            <Box sx={{
                                width: '100%',
                                height: '400px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mb: 2,
                                bgcolor: '#fff',
                                borderRadius: 2,
                                border: '1px solid #f1f5f9',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                position: 'relative'
                            }}
                                onClick={() => setOpenImageDialog(true)}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                <Box
                                    component="img"
                                    src={activeImageSrc}
                                    sx={{
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        objectFit: 'contain',
                                        transition: 'transform 0.3s',
                                        '&:hover': { transform: 'scale(1.05)' }
                                    }}
                                />
                                {product.images.length > 1 && (
                                    <Box sx={{ position: 'absolute', bottom: 10, display: 'flex', gap: 0.5 }}>
                                        {product.images.map((_: any, index: number) => (
                                            <Box
                                                key={index}
                                                sx={{
                                                    width: 6,
                                                    height: 6,
                                                    borderRadius: '50%',
                                                    bgcolor: activeImageIndex === index ? '#2563eb' : '#cbd5e1',
                                                    transition: 'background-color 0.3s'
                                                }}
                                            />
                                        ))}
                                    </Box>
                                )}
                            </Box>

                            {/* Thumbnail Gallery (Simple Row) */}
                            {product.images && product.images.length > 1 && (
                                <Stack direction="row" spacing={2} sx={{ mb: 4, overflowX: 'auto', pb: 1 }}>
                                    {product.images.map((img: string, index: number) => (
                                        <Box
                                            key={index}
                                            onClick={() => setActiveImageIndex(index)}
                                            onMouseEnter={() => setIsHovered(true)}
                                            onMouseLeave={() => setIsHovered(false)}
                                            sx={{
                                                width: 70,
                                                height: 70,
                                                borderRadius: 2,
                                                border: activeImageIndex === index ? '2px solid #2563eb' : '1px solid #e2e8f0',
                                                cursor: 'pointer',
                                                overflow: 'hidden',
                                                opacity: activeImageIndex === index ? 1 : 0.6,
                                                transition: 'all 0.2s',
                                                '&:hover': { opacity: 1 }
                                            }}
                                        >
                                            <Box
                                                component="img"
                                                src={img}
                                                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        </Box>
                                    ))}
                                </Stack>
                            )}

                            {/* Price / Pack Size Info */}
                            <Box sx={{ mt: 4, mb: 6, p: 3, bgcolor: '#f8fafc', borderRadius: 2 }}>
                                <Box sx={{ display: 'flex', gap: 4 }}>
                                    <Box>
                                        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, display: 'block', mb: 0.5 }}>
                                            PACK SIZE
                                        </Typography>
                                        <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a' }}>
                                            {product.packSize} Units
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>

                            {/* Write a Review - Moved to Left Column */}
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', mb: 2 }}>
                                    Write a Review
                                </Typography>
                                <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                                    <Stack spacing={2}>
                                        <TextField
                                            label="Your Name"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            value={reviewName}
                                            onChange={(e) => setReviewName(e.target.value)}
                                        />
                                        <Box>
                                            <Typography component="legend" variant="caption">Rating</Typography>
                                            <Rating
                                                name="simple-controlled"
                                                value={reviewRating}
                                                onChange={(_event, newValue) => {
                                                    setReviewRating(newValue);
                                                }}
                                            />
                                        </Box>
                                        <TextField
                                            label="Your Comment"
                                            multiline
                                            rows={2}
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            value={reviewComment}
                                            onChange={(e) => setReviewComment(e.target.value)}
                                        />
                                        <Button
                                            variant="contained"
                                            onClick={handleSubmitReview}
                                            disabled={!reviewName || !reviewRating || !reviewComment}
                                            sx={{ alignSelf: 'flex-start', textTransform: 'none', bgcolor: '#0f172a' }}
                                        >
                                            Submit Review
                                        </Button>
                                    </Stack>
                                </Paper>
                            </Box>
                        </Box>

                        {/* RIGHT COLUMN: Product Details + Customer Reviews List */}
                        <Box sx={{ width: { xs: '100%', md: '50%' }, p: 4 }}>

                            {/* Company Name */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <BusinessIcon sx={{ color: '#2563eb', fontSize: 20 }} />
                                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#2563eb' }}>
                                    {product.companyName || "Verified Seller"}
                                </Typography>
                            </Box>

                            {/* Title + Pack Size */}
                            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a', mb: 1, lineHeight: 1.3 }}>
                                {product.title}
                                {product.packSize && <Typography component="span" sx={{ fontSize: 'inherit', fontWeight: 400, color: '#64748b' }}> - Box of {product.packSize}</Typography>}
                            </Typography>

                            {/* Rating and Reviews */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                <Rating value={product.rating || 0} precision={0.1} readOnly size="medium" />
                                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600 }}>
                                    ({product.reviews?.length || 0} Reviews)
                                </Typography>
                            </Box>

                            {/* Status & SKU */}
                            <Stack direction="row" spacing={3} alignItems="center" sx={{ mb: 3 }}>
                                <Typography variant="subtitle2" sx={{ color: product.inStock ? '#16a34a' : '#dc2626', fontWeight: 800, letterSpacing: '0.05em' }}>
                                    {product.inStock ? "IN STOCK" : "OUT OF STOCK"}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#64748b', fontFamily: 'monospace' }}>
                                    SKU: {product.sku || "WHS-0000"}
                                </Typography>
                            </Stack>

                            {/* Description */}
                            <Box sx={{ mb: 4 }}>
                                <Typography variant="subtitle1" sx={{ color: '#0f172a', fontWeight: 800, mb: 1 }}>
                                    Description
                                </Typography>
                                <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.8 }}>
                                    {product.description}
                                </Typography>
                            </Box>

                            <Divider sx={{ mb: 4 }} />

                            {/* Contact Details */}
                            <Paper variant="outlined" sx={{ p: 3, bgcolor: '#f8fafc', mb: 4, borderRadius: 2 }}>
                                <Stack spacing={2}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <LocationOnIcon sx={{ color: '#64748b' }} />
                                        <Typography variant="body1" sx={{ fontWeight: 500, color: '#334155' }}>
                                            {product.location}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <PhoneIcon sx={{ color: '#64748b' }} />
                                        <Typography variant="body1" sx={{ fontWeight: 500, color: '#334155' }}>
                                            {product.phoneNumber}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <EmailIcon sx={{ color: '#64748b' }} />
                                        <Typography variant="body1" sx={{ fontWeight: 500, color: '#334155' }}>
                                            {product.email || "N/A"}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Paper>

                            {/* Action Buttons */}
                            <Stack direction="row" spacing={2} sx={{ mb: 6 }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    startIcon={<PhoneIcon />}
                                    fullWidth
                                    onClick={() => window.location.href = `tel:${product.phoneNumber}`}
                                    sx={{ bgcolor: '#2563eb', fontWeight: 700, textTransform: 'none', height: 56 }}
                                >
                                    Call Now
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    startIcon={<ShoppingCartOutlinedIcon />}
                                    fullWidth
                                    sx={{ borderColor: '#cbd5e1', color: '#334155', textTransform: 'none', height: 56 }}
                                >
                                    Add to Cart
                                </Button>
                            </Stack>

                            <Divider sx={{ mb: 4 }} />

                            {/* Customer Reviews List */}
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', mb: 2 }}>
                                    Customer Reviews
                                </Typography>
                                <Stack spacing={2}>
                                    {product.reviews && product.reviews.length > 0 ? (
                                        product.reviews.map((review: any, index: number) => (
                                            <Paper key={index} elevation={0} sx={{ p: 2, bgcolor: '#f1f5f9', borderRadius: 2 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
                                                    <Avatar sx={{ width: 28, height: 28, bgcolor: '#94a3b8', fontSize: '0.8rem' }}>
                                                        {review.user ? review.user.charAt(0).toUpperCase() : 'U'}
                                                    </Avatar>
                                                    <Box>
                                                        <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.9rem' }}>
                                                            {review.user}
                                                        </Typography>
                                                        <Rating value={review.rating} size="small" readOnly sx={{ fontSize: '0.8rem' }} />
                                                    </Box>
                                                </Box>
                                                <Typography variant="body2" sx={{ color: '#475569', fontSize: '0.9rem' }}>
                                                    {review.comment}
                                                </Typography>
                                            </Paper>
                                        ))
                                    ) : (
                                        <Typography variant="body2" sx={{ color: '#94a3b8' }}>No reviews yet. Be the first!</Typography>
                                    )}
                                </Stack>
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            </Container>

            {/* Full Screen Image Carousel Dialog */}
            <Dialog
                open={openImageDialog}
                onClose={() => setOpenImageDialog(false)}
                maxWidth="lg"
                fullWidth
                PaperProps={{
                    sx: {
                        bgcolor: 'black',
                        boxShadow: 'none',
                        m: 2,
                        maxHeight: '90vh',
                        borderRadius: 2,
                        overflow: 'hidden'
                    }
                }}
            >
                <Box sx={{ position: 'relative', width: '100%', height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconButton
                        onClick={() => setOpenImageDialog(false)}
                        sx={{ position: 'absolute', top: 10, right: 10, color: 'white', zIndex: 10 }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <Box
                        component="img"
                        src={activeImageSrc}
                        sx={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain'
                        }}
                    />
                </Box>
            </Dialog>

            <Footer />
        </Box>
    );
};

export default WholesaleProductDetails;
