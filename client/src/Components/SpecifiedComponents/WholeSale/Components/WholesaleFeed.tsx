import { useEffect, useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Paper, Box, Typography, Button, Pagination, Chip } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import { WholesaleService } from '../../../../services/api';

// Mock Data adapted with pricePerUnit
const wholesaleProducts = [
    {
        id: 1,
        title: "Industrial Grade Steel Bolts - Box of 500",
        description: "High-tensile strength 316 stainless steel bolts. Specifically engineered for extreme load-bearing environments.",
        sku: "WHS-99283-BLT",
        packSize: 500,
        pricePerUnit: 12, // Added price
        phoneNumber: "+91 98765 43210",
        email: "sales@steelparts.com",
        location: "Mumbai, Maharashtra",
        companyName: "Steel Parts India Pvt Ltd",
        rating: 4.8,
        reviews: [],
        images: [
            "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1535813547-99c456a41963?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1649232811467-31f415309199?auto=format&fit=crop&w=400&q=80"
        ],
        inStock: true
    },
    {
        id: 2,
        title: "Precision Ball Bearing Set - Pack of 100",
        description: "Premium chrome steel bearings with ABEC-7 rating for high-speed applications. Pre-lubricated and sealed.",
        sku: "BRG-100-PK",
        packSize: 100,
        pricePerUnit: 150,
        phoneNumber: "+91 99887 76655",
        email: "contact@bearingspro.com",
        location: "Pune, Maharashtra",
        companyName: "Bearings Pro Ltd",
        rating: 4.5,
        reviews: [],
        images: [
            "https://images.unsplash.com/photo-1535813547-99c456a41963?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1649232811467-31f415309199?auto=format&fit=crop&w=400&q=80"
        ],
        inStock: true
    },
    {
        id: 3,
        title: "Heavy Duty Hydraulic Pump - Single Unit",
        description: "Series-X cast iron hydraulic pump designed for industrial presses and lifts. Features high-pressure output.",
        sku: "HYD-552-PMP",
        packSize: 1,
        pricePerUnit: 15000,
        phoneNumber: "+91 91234 56789",
        email: "support@hydrosystems.com",
        location: "Chennai, Tamil Nadu",
        companyName: "Hydro Systems Inc",
        rating: 4.9,
        reviews: [],
        images: [
            "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1649232811467-31f415309199?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1535813547-99c456a41963?auto=format&fit=crop&w=400&q=80"
        ],
        inStock: true
    },
    {
        id: 4,
        title: "Safety Work Gloves - Case of 50 Pairs",
        description: "Level 5 cut-resistant Kevlar/Latex gloves for maximum hand protection. Breathable fabric back.",
        sku: "SFT-GLV-50",
        packSize: 50,
        pricePerUnit: 85,
        phoneNumber: "+91 88990 01122",
        email: "safety@gearmasters.com",
        location: "Delhi, NCR",
        companyName: "Gear Masters Safety",
        rating: 4.2,
        reviews: [],
        images: [
            "https://images.unsplash.com/photo-1649232811467-31f415309199?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1535813547-99c456a41963?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80"
        ],
        inStock: true
    }
];

const WholesaleFeed = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await WholesaleService.getAll();
                // Normalize data if needed
                const formatted = data.map((p: any) => ({
                    ...p,
                    id: p._id // Map _id to id for compatibility
                }));
                setProducts(formatted);
            } catch (error) {
                console.error("Failed to fetch wholesale products", error);
            }
        };
        fetchProducts();
    }, []);

    const handleChange = (event: ChangeEvent<unknown>, value: number) => {
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
    const navigate = useNavigate();

    const imagesList = item.images || [item.image || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80"];

    // Auto-slide functionality (Matching product details)
    useEffect(() => {
        if (imagesList.length <= 1 || isHovered) return;

        const interval = setInterval(() => {
            setActiveImageIndex((prev) => (prev + 1) % imagesList.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [imagesList.length, isHovered]);

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
                '&:hover': {
                    boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)',
                    borderColor: '#cbd5e1'
                }
            }}
        >
            {/* Image Gallery Section */}
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
                {/* Main Image with Auto Slide */}
                <Box
                    sx={{
                        width: '100%',
                        height: '220px',
                        borderRadius: 2,
                        overflow: 'hidden',
                        mb: 0, // Removed bottom margin since thumbnails are gone
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
                    {/* Slide Indicators */}
                    {imagesList.length > 1 && (
                        <Box sx={{ position: 'absolute', bottom: 10, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                            {imagesList.map((_: any, index: number) => (
                                <Box
                                    key={index}
                                    sx={{
                                        width: 6,
                                        height: 6,
                                        borderRadius: '50%',
                                        bgcolor: activeImageIndex === index ? '#bef264' : 'rgba(0,0,0,0.2)', // Changed to Lemon Green
                                        transition: 'background-color 0.3s'
                                    }}
                                />
                            ))}
                        </Box>
                    )}
                </Box>

                {/* Thumbnails REMOVED here */}
            </Box>

            {/* Content Section - Matches ProductDetails UI Style */}
            <Box sx={{ flex: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', items: 'flex-start', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
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

                <Typography variant="body2" sx={{ color: '#64748b', mb: 3, lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {item.description}
                </Typography>

                {/* Details Grid: Price and Pack Size (Matching Details Page) */}
                <Box sx={{ display: 'flex', gap: 4, mb: 3, p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
                    <Box>
                        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, display: 'block', mb: 0.5 }}>
                            PACK SIZE
                        </Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0f172a' }}>
                            {item.packSize} Units
                        </Typography>
                    </Box>
                </Box>

                {/* Contact Details (Mini) */}
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
                            height: '42px',
                            bgcolor: '#bef264', // Lemon Green
                            color: 'black', // Black text for contrast
                            textTransform: 'none',
                            fontWeight: 700,
                            borderRadius: 1.5,
                            boxShadow: 'none',
                            '&:hover': {
                                bgcolor: '#d9f99d'
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
                            height: '42px',
                            borderColor: '#cbd5e1',
                            color: '#334155',
                            textTransform: 'none',
                            fontWeight: 700,
                            borderRadius: 1.5,
                            '&:hover': {
                                bgcolor: '#f1f5f9',
                                borderColor: '#94a3b8'
                            }
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            // Add to cart logic if needed
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
