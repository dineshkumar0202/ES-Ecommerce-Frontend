import { useEffect, useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Paper, Box, Typography, Button, Pagination, Chip, IconButton } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { WholesaleService, WishlistService, CartService } from '../../../../services/api';
import { toast } from 'react-toastify';

const WholesaleFeed = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await WholesaleService.getAll();
                const formatted = data.map((p: any) => ({
                    ...p,
                    id: p._id
                }));
                setProducts(formatted || []);
            } catch (error) {
                console.error("Failed to fetch wholesale products", error);
            }
        };
        fetchProducts();
    }, []);

    const handleChange = (_event: ChangeEvent<unknown>, value: number) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const count = Math.ceil(products.length / itemsPerPage);
    const displayedProducts = products.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <Box sx={{ py: 6 }}>
            {/* Header Section */}
            <Box sx={{ mb: 6 }}>
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 800,
                        color: '#1a202c',
                        mb: 1,
                        fontSize: { xs: '2rem', md: '2.5rem' }
                    }}
                >
                    Wholesale Product Feed
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: '#718096',
                        fontSize: '1.1rem'
                    }}
                >
                    Discover premium supplies for your retail business.
                </Typography>
            </Box>

            <Stack spacing={4}>
                {displayedProducts.length > 0 ? (
                    displayedProducts.map((item) => (
                        <ProductCard key={item.id} item={item} />
                    ))
                ) : (
                    <Box sx={{ textAlign: 'center', py: 10 }}>
                        <Typography variant="h6" color="text.secondary">No products found</Typography>
                    </Box>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
                    <Pagination
                        count={count}
                        page={page}
                        onChange={handleChange}
                        color="primary"
                        showFirstButton
                        showLastButton
                    />
                </Box>
            </Stack>
        </Box>
    );
};

const ProductCard = ({ item }: { item: any }) => {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const navigate = useNavigate();

    const imagesList = item.images || [item.image || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"];

    useEffect(() => {
        if (imagesList.length <= 1 || isHovered) return;
        const interval = setInterval(() => {
            setActiveImageIndex((prev) => (prev + 1) % imagesList.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [imagesList.length, isHovered]);

    const handleWishlist = async (e: any) => {
        e.stopPropagation();
        try {
            if (isWishlisted) {
                setIsWishlisted(false);
            } else {
                await WishlistService.addToWishlist({
                    productId: item._id || item.id,
                    type: 'Wholesale'
                });
                setIsWishlisted(true);
                toast.success('Added to Wishlist!');
            }
        } catch (error) {
            toast.error('Login to add to wishlist');
        }
    };

    const activeImage = imagesList[activeImageIndex];

    return (
        <Paper
            elevation={0}
            onClick={() => navigate(`/wholesale/product/${item._id || item.id}`)}
            sx={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                p: { xs: 2, md: 4 },
                borderRadius: 4,
                bgcolor: 'white',
                border: '1px solid #f1f5f9',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
                '&:hover': {
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                    transform: 'translateY(-4px)'
                }
            }}
        >
            {/* Image Container */}
            <Box
                sx={{
                    width: { xs: '100%', md: '320px' },
                    height: { xs: '240px', md: '300px' },
                    borderRadius: 3,
                    overflow: 'hidden',
                    position: 'relative',
                    bgcolor: '#f3e8df', // Soft beige from image
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <IconButton
                    onClick={handleWishlist}
                    sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        zIndex: 2,
                        bgcolor: 'white',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        '&:hover': { bgcolor: '#f8fafc' }
                    }}
                >
                    {isWishlisted ? (
                        <FavoriteIcon sx={{ color: '#ef4444', fontSize: 20 }} />
                    ) : (
                        <FavoriteBorderIcon sx={{ color: '#64748b', fontSize: 20 }} />
                    )}
                </IconButton>

                <Box
                    component="img"
                    src={activeImage}
                    alt={item.title}
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        transition: 'transform 0.5s ease',
                        transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                    }}
                />
            </Box>

            {/* Content Container */}
            <Box sx={{ flex: 1, pl: { md: 4 }, pt: { xs: 3, md: 0 }, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <BusinessIcon sx={{ color: '#cbd5e1', fontSize: 18 }} />
                        <Typography
                            variant="caption"
                            sx={{
                                fontWeight: 700,
                                color: '#94a3b8',
                                letterSpacing: 1.5,
                                textTransform: 'uppercase'
                            }}
                        >
                            {item.companyName || "XYZ INDUSTRIES"}
                        </Typography>
                    </Box>
                    {item.inStock !== false && (
                        <Chip
                            label="IN STOCK"
                            size="small"
                            sx={{
                                bgcolor: '#f0fff4',
                                color: '#38a169',
                                fontWeight: 800,
                                fontSize: '0.65rem',
                                height: '22px',
                                borderRadius: 1.5,
                                letterSpacing: 0.5
                            }}
                        />
                    )}
                </Box>

                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 800,
                        color: '#1a202c',
                        mb: 1.5,
                        lineHeight: 1.2,
                        fontSize: '1.5rem'
                    }}
                >
                    {item.title || "Modern Minimalist Photo Frame"}
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        color: '#718096',
                        mb: 3,
                        lineHeight: 1.6,
                        maxWidth: '90%',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}
                >
                    {item.description || "Hand-crafted wooden finish with premium glass protector. Available in multiple finishes."}
                </Typography>

                {/* Price and Details Grid */}
                <Box
                    sx={{
                        display: 'flex',
                        gap: { xs: 2, md: 6 },
                        mb: 4,
                        p: 2.5,
                        bgcolor: '#f8fafc',
                        borderRadius: 3,
                        border: '1px solid #f1f5f9'
                    }}
                >

                    <Box>
                        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, display: 'block', mb: 0.8, letterSpacing: 0.5 }}>
                            PACK SIZE
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 800, color: '#1a202c' }}>
                            {item.packSize || 12} Units
                        </Typography>
                    </Box>
                </Box>

                {/* Location and Contact */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationOnIcon sx={{ color: '#cbd5e1', fontSize: 18 }} />
                        <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                            {item.location || "Erode, Tamil Nadu"}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <EmailIcon sx={{ color: '#cbd5e1', fontSize: 18 }} />
                        <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                            {item.email || "sales@xyz-corp.com"}
                        </Typography>
                    </Box>
                </Box>

                {/* Action Buttons */}
                <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Button
                        variant="contained"
                        startIcon={<PhoneIcon />}
                        sx={{
                            flex: 1,
                            height: '54px',
                            bgcolor: '#adc9d1', // Soft teal from image
                            color: '#1a202c',
                            textTransform: 'none',
                            fontWeight: 800,
                            borderRadius: '12px',
                            boxShadow: 'none',
                            fontSize: '1rem',
                            '&:hover': {
                                bgcolor: '#9bbec9',
                                boxShadow: '0 4px 12px rgba(173, 201, 209, 0.4)'
                            }
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            window.location.href = `tel:${item.phoneNumber || "+919876543210"}`;
                        }}
                    >
                        Call Now
                    </Button>

                    <Button
                        variant="outlined"
                        startIcon={<ShoppingCartOutlinedIcon />}
                        sx={{
                            flex: 1,
                            height: '54px',
                            borderColor: '#e2e8f0',
                            color: '#1a202c',
                            textTransform: 'none',
                            fontWeight: 800,
                            borderRadius: '12px',
                            fontSize: '1rem',
                            borderWidth: '1.5px',
                            '&:hover': {
                                bgcolor: '#f8fafc',
                                borderColor: '#cbd5e1',
                                borderWidth: '1.5px'
                            }
                        }}
                        onClick={async (e) => {
                            e.stopPropagation();
                            try {
                                await CartService.addToCart({
                                    productId: item._id,
                                    quantity: item.packSize || 1,
                                    type: 'Wholesale'
                                });
                                toast.success('Added to Wholesale Cart!');
                            } catch (error) {
                                toast.error('Login to add to cart');
                            }
                        }}
                    >
                        Add to Cart
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default WholesaleFeed;
