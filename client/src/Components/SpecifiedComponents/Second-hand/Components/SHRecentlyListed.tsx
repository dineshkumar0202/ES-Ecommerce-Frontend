import React from 'react';
import { Box, Typography, Button, Paper, Chip, IconButton, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TuneIcon from '@mui/icons-material/Tune';
import { ResaleService } from '../../../../services/api';

const defaultProducts = [
    {
        id: 1,
        title: "iPhone 13 Pro, 256GB",
        price: "599",
        condition: "CERTIFIED REFURBISHED",
        location: "San Francisco, CA",
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=400&q=80",
        images: [
            "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80"
        ],
        description: "Pristine condition iPhone 13 Pro. Battery health 98%. Comes with original box and cable. No scratches or dents. Unlocked for all carriers.",
        seller: "TechResale Pro",
        mobile: "+1 555-0123",
        tagColor: "#bef264" // Lime
    },
    {
        id: 2,
        title: "Herman Miller Aeron",
        price: "850",
        condition: "LIKE NEW",
        location: "Austin, TX",
        image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=400&q=80",
        images: [
            "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1688578713636-234b4c65e884?auto=format&fit=crop&w=800&q=80"
        ],
        description: "Fully loaded Herman Miller Aeron size B. PostureFit SL, tilt limiter, fully adjustable arms. Manufactured 2023. Barely used in a home office environment.",
        seller: "Office Furniture Outlet",
        mobile: "+1 555-0124",
        tagColor: "#f1f5f9" // White/Grey
    },
    {
        id: 3,
        title: "Nike Air Max 270",
        price: "120",
        condition: "GREAT VALUE",
        location: "Brooklyn, NY",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80",
        images: [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80"
        ],
        description: "Only worn twice. Great value for the price. Size 10 US. Original box included. No signs of wear on the sole.",
        seller: "SneakerHead NYC",
        mobile: "+1 555-0125",
        tagColor: "#bef264"
    },
    {
        id: 4,
        title: "MacBook Pro M1 13\"",
        price: "950",
        condition: "CERTIFIED REFURBISHED",
        location: "Seattle, WA",
        image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=400&q=80",
        images: [
            "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
        ],
        description: "Factory refurbished M1 MacBook Pro with 1 year warranty. 8GB RAM, 256GB SSD. Cycle count: 12. Looks brand new.",
        seller: "Apple Certified Refurb",
        mobile: "+1 555-0126",
        tagColor: "#bef264"
    },

];

const moreProducts = [
    {
        id: 6,
        title: "Dyson V15 Detect",
        price: "450",
        condition: "LIKE NEW",
        location: "Chicago, IL",
        image: "https://images.unsplash.com/photo-1558317374-a35c202f4369?auto=format&fit=crop&w=400&q=80",
        images: [
            "https://images.unsplash.com/photo-1558317374-a35c202f4369?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?auto=format&fit=crop&w=800&q=80"
        ],
        description: "Powerful cordless vacuum. Includes all attachments and wall mount. Laser slim fluffy cleaner head reveals microscopic dust.",
        seller: "Home Goods Resale",
        mobile: "+1 555-0127",
        tagColor: "#f1f5f9"
    },
    {
        id: 7,
        title: "Canon EOS R6 Body",
        price: "1800",
        condition: "USED - GOOD",
        location: "Miami, FL",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80",
        images: [
            "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80"
        ],
        description: "Low shutter count (<5000). Perfect for photography enthusiasts. Minor scuff on bottom plate, otherwise perfect working condition.",
        seller: "Camera Exchange",
        mobile: "+1 555-0128",
        tagColor: "#bef264"
    },
    {
        id: 8,
        title: "PS5 Disc Edition",
        price: "400",
        condition: "OPEN BOX",
        location: "Houston, TX",
        image: "https://images.unsplash.com/photo-1606318548125-527137a54139?auto=format&fit=crop&w=400&q=80",
        images: [
            "https://images.unsplash.com/photo-1606318548125-527137a54139?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1621259182906-5d9b7c4a1702?auto=format&fit=crop&w=800&q=80"
        ],
        description: "Unused PS5 console. Box opened only to check contents. Includes God of War Ragnarok voucher code (unused).",
        seller: "Gamer's Paradise",
        mobile: "+1 555-0129",
        tagColor: "#f1f5f9"
    },
    {
        id: 9,
        title: "iPad Air 5th Gen",
        price: "480",
        condition: "CERTIFIED REFURBISHED",
        location: "Boston, MA",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=400&q=80",
        images: [
            "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1585790050230-5dd28404f8f3?auto=format&fit=crop&w=800&q=80"
        ],
        description: "Sleek and powerful tablet. Perfect for creativity and productivity. M1 Chip. 64GB WiFi model. Starlight color.",
        seller: "Tech Deals",
        mobile: "+1 555-0130",
        tagColor: "#bef264"
    },
    {
        id: 10,
        title: "Samsung Galaxy S23 Ultra",
        price: "800",
        condition: "LIKE NEW",
        location: "New York, NY",
        image: "https://images.unsplash.com/photo-1610945265078-3858a082d2fc?auto=format&fit=crop&w=400&q=80",
        images: [
            "https://images.unsplash.com/photo-1610945265078-3858a082d2fc?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1678911820864-e2c567c655d7?auto=format&fit=crop&w=800&q=80"
        ],
        description: "Pristine Samsung Galaxy S23 Ultra. 10/10 condition, used with case/screen protector. Features 200MP camera, Snapdragon 8 Gen 2, and 5000mAh battery. Includes S-Pen, original box, charging cable, and 3 premium covers.",
        seller: "Galaxy Fan",
        mobile: "+1 555-0131",
        tagColor: "#f1f5f9"
    }
];

const SHRecentlyListed = () => {
    const navigate = useNavigate();
    const [displayProducts, setDisplayProducts] = React.useState<any[]>([]);
    const [hasMore, setHasMore] = React.useState(true);

    React.useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await ResaleService.getAll();
                // Normalize data if needed
                const formatted = data.map((p: any) => ({
                    ...p,
                    id: p._id, // Map _id to id for compatibility
                    tagColor: p.tagColor || "#bef264"
                }));
                setDisplayProducts(formatted);
            } catch (error) {
                console.error("Failed to fetch resale products", error);
            }
        };
        fetchProducts();
    }, []);

    const handleLoadMore = () => {
        setDisplayProducts(prev => [...prev, ...moreProducts]);
        setHasMore(false); // Disable after loading one batch for this demo
    };

    return (
        <Box sx={{ mb: 8 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>Recently Listed Items</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>Discover handpicked pre-owned items from trusted sellers.</Typography>
                </Box>
                <Stack direction="row" spacing={1}>
                    <Button variant="outlined" startIcon={<TuneIcon />} sx={{ textTransform: 'none', color: 'black', borderColor: '#e2e8f0' }}>Refine</Button>
                    <Button variant="outlined" sx={{ textTransform: 'none', color: 'black', borderColor: '#e2e8f0' }}>Latest</Button>
                </Stack>
            </Stack>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                {displayProducts.map((item) => (
                    <Box key={item.id} sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(25% - 18px)' }, flexGrow: 0, flexShrink: 0 }}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 1.5,
                                borderRadius: 3,
                                bgcolor: 'white',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'all 0.2s',
                                border: '1px solid transparent',
                                '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', borderColor: '#e2e8f0' }
                            }}
                        >
                            <Box
                                onClick={() => navigate(`/resale/product/${item.id}`, { state: { product: item } })}
                                sx={{ position: 'relative', mb: 2, height: 200, bgcolor: '#f8fafc', borderRadius: 2, overflow: 'hidden', cursor: 'pointer' }}
                            >
                                <Chip
                                    label={item.condition}
                                    size="small"
                                    sx={{
                                        position: 'absolute',
                                        top: 8,
                                        left: 8,
                                        bgcolor: item.tagColor,
                                        color: '#0f172a',
                                        fontWeight: 700,
                                        fontSize: '0.6rem',
                                        height: '20px',
                                        zIndex: 1
                                    }}
                                />
                                <IconButton
                                    size="small"
                                    sx={{
                                        position: 'absolute',
                                        top: 8,
                                        right: 8,
                                        bgcolor: 'white',
                                        zIndex: 1,
                                        '&:hover': { bgcolor: 'white' }
                                    }}
                                >
                                    <FavoriteBorderIcon sx={{ fontSize: 16 }} />
                                </IconButton>
                                <Box
                                    component="img"
                                    src={item.image}
                                    sx={{ width: '100%', height: '100%', objectFit: 'contain', p: 2 }}
                                />
                            </Box>

                            <Stack spacing={0.5} sx={{ mb: 2, flex: 1 }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                                    <Typography variant="subtitle2" sx={{ fontWeight: 800, lineHeight: 1.2, maxWidth: '70%' }}>
                                        {item.title}
                                    </Typography>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                                        ₹{item.price}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" alignItems="center" spacing={0.5}>
                                    <LocationOnIcon sx={{ fontSize: 14, color: '#94a3b8' }} />
                                    <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 500 }}>
                                        {item.location}
                                    </Typography>
                                </Stack>
                            </Stack>

                            <Button
                                fullWidth
                                variant="contained"
                                startIcon={<WhatsAppIcon />}
                                sx={{
                                    bgcolor: '#bef264',
                                    color: 'black',
                                    fontWeight: 700,
                                    textTransform: 'none',
                                    fontSize: '0.75rem',
                                    boxShadow: 'none',
                                    py: 1,
                                    '&:hover': { bgcolor: '#afd057', boxShadow: 'none' }
                                }}
                            >
                                WhatsApp Seller
                            </Button>
                        </Paper>
                    </Box>
                ))}
            </Box>

            {hasMore && (
                <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
                    <Button
                        variant="outlined"
                        onClick={handleLoadMore}
                        sx={{
                            color: 'black',
                            borderColor: '#e2e8f0',
                            textTransform: 'none',
                            fontWeight: 700,
                            px: 4,
                            py: 1.5,
                            borderRadius: 2
                        }}
                    >
                        Load More Items
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default SHRecentlyListed;
