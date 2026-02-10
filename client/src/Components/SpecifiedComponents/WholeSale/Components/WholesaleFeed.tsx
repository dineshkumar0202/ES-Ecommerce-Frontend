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
                setProducts(formatted);
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
        <Stack spacing={3}>
            {displayedProducts.map((item) => (
                <ProductCard key={item.id} item={item} />
            ))}

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
    );
};

const ProductCard = ({ item }: { item: any }) => {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const navigate = useNavigate();

    const imagesList = item.images || [item.image || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80"];

    useEffect(() => {
        if (imagesList.length <= 1 || isHovered) return;
        const interval = setInterval(() => {
            setActiveImageIndex((prev) => (prev + 1) % imagesList.length);
        }, 3000);
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
                p: 0,
                borderRadius: 2,
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                position: 'relative',
                '&:hover': {
                    boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)',
                    borderColor: '#cbd5e1'
                }
            }}
        >
            <IconButton
                onClick={handleWishlist}
                sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    zIndex: 2,
                    bgcolor: 'white',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    '&:hover': { bgcolor: '#f1f5f9' }
                }}
            >
                {isWishlisted ? <FavoriteIcon sx={{ color: '#ef4444' }} /> : <FavoriteBorderIcon />}
            </IconButton>

            <Box
                sx={{
                    width: { xs: '100%', md: '300px' },
                    bgcolor: '#f8fafc',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 2,
                    borderRight: { md: '1px solid #e2e8f0' },
                    borderBottom: { xs: '1px solid #e2e8f0', md: 'none' }
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        height: '220px',
                        borderRadius: 2,
                        overflow: 'hidden',
                        border: '1px solid #e2e8f0',
                        position: 'relative',
                        bgcolor: 'white'
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <Box
                        component="img"
                        src={activeImage}
                        alt={item.title}
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            transition: 'opacity 0.3s'
                        }}
                    />
                    {imagesList.length > 1 && (
                        <Box sx={{ position: 'absolute', bottom: 10, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                            {imagesList.map((_: any, index: number) => (
                                <Box
                                    key={index}
                                    sx={{
                                        width: 6,
                                        height: 6,
                                        borderRadius: '50%',
                                        bgcolor: activeImageIndex === index ? '#bef264' : 'rgba(0,0,0,0.2)',
                                        transition: 'background-color 0.3s'
                                    }}
                                />
                            ))}
                        </Box>
                    )}
                </Box>
            </Box>

            <Box sx={{ flex: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <BusinessIcon sx={{ color: '#2563eb', fontSize: 18 }} />
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#2563eb' }}>
                            {item.companyName || "Verified Seller"}
                        </Typography>
                    </Box>
                    {item.inStock && (
                        <Chip
                            label="IN STOCK"
                            size="small"
                            sx={{
                                bgcolor: '#dcfce7',
                                color: '#166534',
                                fontWeight: 700,
                                fontSize: '0.7rem',
                                height: '24px',
                                borderRadius: 1
                            }}
                        />
                    )}
                </Box>

                <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', mb: 1, lineHeight: 1.3 }}>
                    {item.title}
                </Typography>

                <Typography variant="body2" sx={{ color: '#64748b', mb: 2, lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {item.description}
                </Typography>

                <Box sx={{ display: 'flex', gap: 4, mb: 3, p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
                    <Box>
                        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, display: 'block', mb: 0.5 }}>
                            PRICE PER UNIT
                        </Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 900, color: '#0f172a' }}>
                            ₹{item.pricePerUnit || item.price || 0}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, display: 'block', mb: 0.5 }}>
                            PACK SIZE
                        </Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0f172a' }}>
                            {item.packSize || 1} Units
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <LocationOnIcon sx={{ color: '#94a3b8', fontSize: 16 }} />
                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                            {item.location}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <EmailIcon sx={{ color: '#94a3b8', fontSize: 16 }} />
                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                            {item.email || "N/A"}
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Button
                        variant="contained"
                        startIcon={<PhoneIcon />}
                        sx={{
                            flex: 1,
                            height: '50px',
                            bgcolor: '#bef264',
                            color: 'black',
                            textTransform: 'none',
                            fontWeight: 900,
                            borderRadius: '12px',
                            boxShadow: '0 4px 14px 0 rgba(190, 242, 100, 0.39)',
                            '&:hover': { bgcolor: '#d9f99d', boxShadow: '0 6px 20px rgba(190, 242, 100, 0.5)' }
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
                            height: '50px',
                            borderColor: '#e2e8f0',
                            color: '#0f172a',
                            textTransform: 'none',
                            fontWeight: 900,
                            borderRadius: '12px',
                            '&:hover': { bgcolor: '#f8fafc', borderColor: '#cbd5e1' }
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
