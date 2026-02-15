import { useEffect, useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Box, Typography, Button, Pagination, Chip, IconButton, Stack } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CallIcon from '@mui/icons-material/Call';

import { WholesaleService, WishlistService, CartService } from '../../../../services/api';
import { toast } from 'react-toastify';

const CATEGORIES = ["All Supplies", "Construction", "Industrial", "Hardware"];

const WholesaleFeed = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState("All Supplies");
    const itemsPerPage = 7; // 1 featured + 6 grid items

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await WholesaleService.getAll();
                const formatted = data.map((p: any) => ({
                    ...p,
                    id: p._id
                }));
                // Mock filtering if API doesn't support it yet, or just display all
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

    // Filter products based on category (mock logic)
    const filteredProducts = selectedCategory === "All Supplies"
        ? products
        : products.filter(p => p.category?.toLowerCase() === selectedCategory.toLowerCase());

    const count = Math.ceil(filteredProducts.length / itemsPerPage);
    const displayedProducts = filteredProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const featuredProduct = displayedProducts[0];
    const gridProducts = displayedProducts.slice(1);

    return (
        <Box sx={{ py: 6, px: { xs: 2, md: 4 }, maxWidth: '1400px', mx: 'auto' }}>
            {/* Header Section */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { md: 'flex-end' }, mb: 6, gap: 3 }}>
                <Box>
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 800,
                            color: '#0f172a',
                            mb: 1,
                            fontSize: { xs: '1.75rem', md: '2.25rem' }
                        }}
                    >
                        Wholesale Product Feed
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: '#64748b',
                            fontSize: '1rem'
                        }}
                    >
                        Discover premium supplies for your retail business.
                    </Typography>
                </Box>

                <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: 1 }}>
                    {CATEGORIES.map((cat) => (
                        <Chip
                            key={cat}
                            label={cat}
                            onClick={() => setSelectedCategory(cat)}
                            sx={{
                                bgcolor: selectedCategory === cat ? '#0f172a' : 'transparent',
                                color: selectedCategory === cat ? 'white' : '#64748b',
                                border: '1px solid',
                                borderColor: selectedCategory === cat ? '#0f172a' : '#e2e8f0',
                                fontWeight: 600,
                                px: 1,
                                '&:hover': {
                                    bgcolor: selectedCategory === cat ? '#1e293b' : '#f8fafc'
                                }
                            }}
                        />
                    ))}
                </Stack>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4 }}>
                {/* Left Column: Featured Product */}
                {featuredProduct && (
                    <Box sx={{ width: { xs: '100%', lg: '35%' }, minWidth: { lg: '380px' } }}>
                        <FeaturedProductCard item={featuredProduct} />
                    </Box>
                )}

                {/* Right Column: Grid */}
                <Box sx={{ flex: 1, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', xl: 'repeat(2, 1fr)' }, gap: 3, alignContent: 'start' }}>
                    {gridProducts.length > 0 ? (
                        gridProducts.map((item) => (
                            <StandardProductCard key={item.id} item={item} />
                        ))
                    ) : (
                        !featuredProduct && (
                            <Box sx={{ textAlign: 'center', py: 10, gridColumn: '1 / -1' }}>
                                <Typography variant="h6" color="text.secondary">No products found</Typography>
                            </Box>
                        )
                    )}
                </Box>
            </Box>

            {count > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', pt: 8 }}>
                    <Pagination
                        count={count}
                        page={page}
                        onChange={handleChange}
                        shape="rounded"
                        sx={{
                            '& .MuiPaginationItem-root': {
                                fontWeight: 700,
                                border: '1px solid #e2e8f0',
                                '&.Mui-selected': { bgcolor: '#94a3b8', color: 'white', borderColor: '#94a3b8' }
                            }
                        }}
                    />
                </Box>
            )}
        </Box>
    );
};

// --- Sub-Components ---

const FeaturedProductCard = ({ item }: { item: any }) => {
    const navigate = useNavigate();
    const [isWishlisted, setIsWishlisted] = useState(false);
    const image = (item.images && item.images[0]) || item.image || "https://placehold.co/600x600?text=No+Image";

    const handleWishlist = async (e: any) => {
        e.stopPropagation();
        try {
            if (isWishlisted) {
                setIsWishlisted(false);
            } else {
                await WishlistService.addToWishlist({ productId: item._id || item.id, type: 'Wholesale' });
                setIsWishlisted(true);
                toast.success('Added to Wishlist!');
            }
        } catch (error) { toast.error('Login to add to wishlist'); }
    };

    return (
        <Paper
            elevation={0}
            onClick={() => navigate(`/wholesale/product/${item._id || item.id}`)}
            sx={{
                p: 3,
                borderRadius: 4,
                bgcolor: 'white',
                border: '1px solid #f1f5f9',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: 1, color: '#0f172a' }}>DEAL OF THE DAY</Typography>
                <Typography variant="caption" sx={{ fontWeight: 800, color: '#16a34a' }}>● IN STOCK</Typography>
            </Box>

            <Box sx={{ position: 'relative', borderRadius: 4, overflow: 'hidden', mb: 3, height: '320px', bgcolor: '#fff' }}>
                <Box
                    component="img"
                    src={image}
                    alt={item.title}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <IconButton
                    onClick={handleWishlist}
                    sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        bgcolor: 'white',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        '&:hover': { bgcolor: '#f8fafc' }
                    }}
                >
                    {isWishlisted ? <FavoriteIcon sx={{ color: '#ef4444' }} /> : <FavoriteBorderIcon />}
                </IconButton>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <BusinessIcon sx={{ fontSize: 16, color: '#94a3b8' }} />
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
                    {item.companyName || "PREMIUM STEEL"}
                </Typography>
            </Box>

            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a', mb: 1.5, lineHeight: 1.3 }}>
                {item.title}
            </Typography>

            <Typography variant="body2" sx={{ color: '#64748b', mb: 3, lineHeight: 1.6 }}>
                {item.description || "Superior quality material perfect for extensive applications. Bulk pricing usually available."}
            </Typography>

            <Box sx={{ bgcolor: '#f8fafc', p: 2, borderRadius: 2, mb: 3 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#94a3b8', display: 'block', mb: 0.5, fontSize: '0.65rem' }}>PACK SIZE</Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0f172a' }}>{item.packSize || 50} Units / Bundle</Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
                <LocationOnIcon sx={{ fontSize: 18, color: '#94a3b8' }} />
                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                    {item.location || "Location Available"}
                </Typography>
            </Box>

            <Box sx={{ mt: 'auto', display: 'flex', gap: 2 }}>
                <Button
                    variant="contained"
                    fullWidth
                    startIcon={<CallIcon />}
                    sx={{
                        bgcolor: '#bfdbdb', // Muted teal
                        color: '#0f172a',
                        fontWeight: 800,
                        py: 1.5,
                        boxShadow: 'none',
                        borderRadius: 2,
                        textTransform: 'none',
                        '&:hover': { bgcolor: '#a7cece', boxShadow: 'none' }
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (item.phoneNumber) window.location.href = `tel:${item.phoneNumber}`;
                    }}
                >
                    Call
                </Button>
                <Button
                    variant="outlined"
                    fullWidth
                    sx={{
                        borderColor: '#e2e8f0',
                        color: '#0f172a',
                        fontWeight: 800,
                        py: 1.5,
                        borderRadius: 2,
                        textTransform: 'none',
                        '&:hover': { bgcolor: '#f8fafc', borderColor: '#cbd5e1' }
                    }}
                    onClick={async (e) => {
                        e.stopPropagation();
                        try {
                            await CartService.addToCart({ productId: item._id, quantity: item.packSize || 1, type: 'Wholesale' });
                            toast.success('Added!');
                        } catch (err) { toast.error('Login first'); }
                    }}
                >
                    Add to Cart
                </Button>
            </Box>
        </Paper>
    );
};

const StandardProductCard = ({ item }: { item: any }) => {
    const navigate = useNavigate();
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const image = (item.images && item.images[0]) || item.image || "https://placehold.co/400x300?text=Product";

    const handleWishlist = async (e: any) => {
        e.stopPropagation();
        try {
            if (isWishlisted) {
                setIsWishlisted(false);
            } else {
                await WishlistService.addToWishlist({ productId: item._id || item.id, type: 'Wholesale' });
                setIsWishlisted(true);
                toast.success('Added!');
            }
        } catch (error) { toast.error('Login to add'); }
    };

    return (
        <Paper
            elevation={0}
            onClick={() => navigate(`/wholesale/product/${item._id || item.id}`)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            sx={{
                p: 2,
                borderRadius: 3,
                bgcolor: 'white',
                border: '1px solid #f1f5f9',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }
            }}
        >
            <Box sx={{ position: 'relative', height: '180px', borderRadius: 3, overflow: 'hidden', mb: 2 }}>
                <Chip
                    label="IN STOCK"
                    size="small"
                    sx={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        zIndex: 2,
                        bgcolor: '#22c55e',
                        color: 'white',
                        fontWeight: 800,
                        fontSize: '0.65rem',
                        height: '22px',
                        borderRadius: 1
                    }}
                />
                <IconButton
                    onClick={handleWishlist}
                    size="small"
                    sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        zIndex: 2,
                        bgcolor: 'white',
                        width: 28,
                        height: 28,
                        '&:hover': { bgcolor: '#f8fafc' }
                    }}
                >
                    {isWishlisted ? <FavoriteIcon sx={{ color: '#ef4444', fontSize: 16 }} /> : <FavoriteBorderIcon sx={{ fontSize: 16 }} />}
                </IconButton>

                <Box
                    component="img"
                    src={image}
                    alt={item.title}
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                        transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                    }}
                />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <BusinessIcon sx={{ fontSize: 14, color: '#94a3b8' }} />
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', fontSize: '0.65rem' }}>
                    {item.companyName || "VENDOR"}
                </Typography>
            </Box>

            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0f172a', mb: 1.5, lineHeight: 1.3, fontSize: '1rem' }}>
                {item.title}
            </Typography>

            <Box sx={{ bgcolor: '#f8fafc', p: 1.5, borderRadius: 2, mb: 2 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#94a3b8', display: 'block', mb: 0.2, fontSize: '0.6rem' }}>PACK SIZE</Typography>
                <Typography variant="body2" sx={{ fontWeight: 800, color: '#0f172a' }}>{item.packSize || 10} Units</Typography>
            </Box>

            <Box sx={{ mt: 'auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
                <Button
                    variant="contained"
                    sx={{
                        bgcolor: '#f1f5f9',
                        color: '#0f172a',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        boxShadow: 'none',
                        textTransform: 'none',
                        '&:hover': { bgcolor: '#e2e8f0', boxShadow: 'none' }
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (item.phoneNumber) window.location.href = `tel:${item.phoneNumber}`;
                    }}
                >
                    Call
                </Button>
                <Button
                    variant="outlined"
                    sx={{
                        borderColor: '#e2e8f0',
                        color: '#0f172a',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        textTransform: 'none',
                        '&:hover': { bgcolor: '#f8fafc', borderColor: '#cbd5e1' }
                    }}
                    onClick={async (e) => {
                        e.stopPropagation();
                        try {
                            await CartService.addToCart({ productId: item._id, quantity: item.packSize || 1, type: 'Wholesale' });
                            toast.success('Added!');
                        } catch (err) { toast.error('Login first'); }
                    }}
                >
                    Add
                </Button>
            </Box>
        </Paper>
    );
};

export default WholesaleFeed;

