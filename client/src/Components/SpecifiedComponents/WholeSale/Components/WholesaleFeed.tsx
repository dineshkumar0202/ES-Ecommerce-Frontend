import { useEffect, useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Box, Typography, Button, Pagination, Chip, IconButton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
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
        <Box sx={{ py: 6, px: { xs: 2, md: 4 }, maxWidth: '1200px', mx: 'auto' }}>
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

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: { xs: 1.5, md: 3 }
                }}
            >
                {displayedProducts.length > 0 ? (
                    displayedProducts.map((item) => (
                        <ProductCard key={item.id} item={item} />
                    ))
                ) : (
                    <Box sx={{ textAlign: 'center', py: 10, gridColumn: '1 / -1' }}>
                        <Typography variant="h6" color="text.secondary">No products found</Typography>
                    </Box>
                )}
            </Box>

            {displayedProducts.length > 0 && (
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
            )}
        </Box>
    );
};

const ProductCard = ({ item }: { item: any }) => {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const navigate = useNavigate();

    const imagesList = (item.images && item.images.length > 0) ? item.images : [item.image || "https://placehold.co/400"];

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
                flexDirection: 'column',
                p: { xs: 1, md: 2 },
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
                    width: '100%',
                    height: { xs: '120px', md: '170px' },
                    borderRadius: 3,
                    overflow: 'hidden',
                    position: 'relative',
                    bgcolor: '#f8fafc', // Fixed clean light bg
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 1.5,
                    border: '1px solid #f1f5f9'
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
            <Box sx={{ flex: 1, pt: 2, display: 'flex', flexDirection: 'column' }}>
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
                            {item.companyName || "Unknown Company"}
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
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        color: '#1a202c',
                        mb: 1,
                        lineHeight: 1.3,
                        fontSize: { xs: '1rem', md: '1.25rem' },
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}
                >
                    {item.title || "Untitled Product"}
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        color: '#718096',
                        mb: 2,
                        lineHeight: 1.5,
                        fontSize: { xs: '0.75rem', md: '0.875rem' },
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}
                >
                    {item.description || "No description available."}
                </Typography>

                {/* Price and Details Grid */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 2,
                        p: 1.5,
                        bgcolor: '#f8fafc',
                        borderRadius: 2,
                        border: '1px solid #f1f5f9'
                    }}
                >
                    <Box>
                        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, display: 'block', mb: 0.2, fontSize: '0.65rem' }}>
                            PACK SIZE
                        </Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1a202c', fontSize: '0.9rem' }}>
                            {item.packSize || 1} Units
                        </Typography>
                    </Box>
                </Box>

                {/* Location and Contact */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationOnIcon sx={{ color: '#cbd5e1', fontSize: 14 }} />
                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 500 }}>
                            {item.location || "Location not available"}
                        </Typography>
                    </Box>
                </Box>

                {/* Action Buttons */}
                <Box sx={{ mt: 'auto', display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 1 }}>
                    <Button
                        variant="contained"
                        size="small"
                        disabled={!item.phoneNumber}
                        sx={{
                            flex: 1,
                            height: '40px',
                            bgcolor: '#adc9d1',
                            color: '#1a202c',
                            textTransform: 'none',
                            fontWeight: 800,
                            borderRadius: '8px',
                            boxShadow: 'none',
                            fontSize: '0.8rem',
                            '&:hover': { bgcolor: '#9bbec9' }
                        }}
                        onClick={(e) => {
                            if (item.phoneNumber) {
                                e.stopPropagation();
                                window.location.href = `tel:${item.phoneNumber}`;
                            }
                        }}
                    >
                        Call
                    </Button>

                    <Button
                        variant="outlined"
                        size="small"
                        sx={{
                            flex: 1,
                            height: '40px',
                            borderColor: '#e2e8f0',
                            color: '#1a202c',
                            textTransform: 'none',
                            fontWeight: 800,
                            borderRadius: '8px',
                            fontSize: '0.8rem',
                            '&:hover': { bgcolor: '#f8fafc' }
                        }}
                        onClick={async (e) => {
                            e.stopPropagation();
                            try {
                                await CartService.addToCart({
                                    productId: item._id,
                                    quantity: item.packSize || 1,
                                    type: 'Wholesale'
                                });
                                toast.success('Added!');
                            } catch (error) {
                                toast.error('Login first');
                            }
                        }}
                    >
                        Add
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default WholesaleFeed;
