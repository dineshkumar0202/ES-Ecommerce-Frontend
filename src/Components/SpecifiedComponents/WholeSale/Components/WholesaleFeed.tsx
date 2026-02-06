import { useEffect, useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Paper, Box, Typography, Button, Pagination, Chip, Avatar } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';

// Mock Data adapted with multiple images, removed price, added phone and email
const wholesaleProducts = [
    {
        id: 1,
        title: "Industrial Grade Steel Bolts - Box of 500",
        description: "High-tensile strength 316 stainless steel bolts. Specifically engineered for extreme load-bearing environments in automotive and heavy-duty structural construction. Each box contains 500 units with matching zinc-plated washers.",
        sku: "WHS-99283-BLT",
        packSize: 500,
        phoneNumber: "+91 98765 43210",
        email: "sales@steelparts.com",
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
        description: "Premium chrome steel bearings with ABEC-7 rating for high-speed applications. Pre-lubricated and sealed for maintenance-free operation in industrial machinery.",
        sku: "BRG-100-PK",
        packSize: 100,
        phoneNumber: "+91 99887 76655",
        email: "contact@bearingspro.com",
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
        description: "Series-X cast iron hydraulic pump designed for industrial presses and lifts. Features high-pressure output and durable aluminum housing for heat dissipation.",
        sku: "HYD-552-PMP",
        packSize: 1,
        phoneNumber: "+91 91234 56789",
        email: "support@hydrosystems.com",
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
        description: "Level 5 cut-resistant Kevlar/Latex gloves for maximum hand protection. Breathable fabric back with reinforced grip coating. Ideal for construction and metalworking.",
        sku: "SFT-GLV-50",
        packSize: 50,
        phoneNumber: "+91 88990 01122",
        email: "safety@gearmasters.com",
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
        const storedProducts = localStorage.getItem('wholesaleProducts');
        if (storedProducts) {
            setProducts(JSON.parse(storedProducts));
        } else {
            // Initialize with mock data if empty
            localStorage.setItem('wholesaleProducts', JSON.stringify(wholesaleProducts));
            setProducts(wholesaleProducts);
        }
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
    const [activeImage, setActiveImage] = useState(item.images ? item.images[0] : item.image);
    const navigate = useNavigate();

    // Fallback if images array isn't present in stored/old data
    const imagesList = item.images || [item.image || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80"];

    return (
        <Paper
            elevation={0}
            onClick={() => navigate(`/wholesale/product/${item.id}`)}
            sx={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                p: 0,
                borderRadius: 3,
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                '&:hover': {
                    boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)',
                    transform: 'translateY(-2px)'
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
                {/* Main Image */}
                <Box
                    sx={{
                        width: '100%',
                        height: '220px',
                        borderRadius: 2,
                        overflow: 'hidden',
                        mb: 2,
                        border: '1px solid #e2e8f0'
                    }}
                >
                    <Box
                        component="img"
                        src={activeImage}
                        alt={item.title}
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                </Box>

                {/* Thumbnails */}
                <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: 0.5 }}>
                    {imagesList.slice(0, 4).map((img: string, index: number) => (
                        <Box
                            key={index}
                            onClick={(e) => {
                                e.stopPropagation();
                                setActiveImage(img);
                            }}
                            sx={{
                                width: 50,
                                height: 50,
                                borderRadius: 1.5,
                                overflow: 'hidden',
                                border: activeImage === img ? '2px solid #2563eb' : '1px solid #e2e8f0',
                                cursor: 'pointer',
                                flexShrink: 0,
                                opacity: activeImage === img ? 1 : 0.7,
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
                    {imagesList.length > 4 && (
                        <Box sx={{
                            width: 50,
                            height: 50,
                            borderRadius: 1.5,
                            bgcolor: '#f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            color: '#64748b'
                        }}>
                            +{imagesList.length - 4}
                        </Box>
                    )}
                </Stack>
            </Box>

            {/* Content Section */}
            <Box sx={{ flex: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', pr: 2 }}>
                        {item.title}
                    </Typography>
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

                <Typography variant="body2" sx={{ color: '#64748b', mb: 2, lineHeight: 1.6 }}>
                    {item.description}
                </Typography>

                {/* Details Grid: Quantity, Email, Phone */}
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ my: 2, p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
                    <Box>
                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, display: 'block', mb: 0.5 }}>
                            QUANTITY (PACK SIZE)
                        </Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0f172a' }}>
                            {item.packSize} Units
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, display: 'block', mb: 0.5 }}>
                            CONTACT INFO
                        </Typography>
                        <Stack spacing={0.5}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <PhoneIcon sx={{ fontSize: 16, color: '#64748b' }} />
                                <Typography variant="body2" sx={{ fontWeight: 500, color: '#334155' }}>{item.phoneNumber || "+91 98765 43210"}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <EmailIcon sx={{ fontSize: 16, color: '#64748b' }} />
                                <Typography variant="body2" sx={{ fontWeight: 500, color: '#334155' }}>{item.email || "seller@example.com"}</Typography>
                            </Box>
                        </Stack>
                    </Box>
                </Stack>

                <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Button
                        variant="outlined"
                        startIcon={<PhoneIcon />}
                        sx={{
                            flex: 1,
                            height: '42px',
                            borderColor: '#0f172a',
                            color: '#0f172a',
                            textTransform: 'none',
                            fontWeight: 700,
                            borderRadius: 1.5,
                            '&:hover': {
                                bgcolor: '#f1f5f9',
                                borderColor: '#0f172a'
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
                        variant="contained"
                        startIcon={<WhatsAppIcon />}
                        sx={{
                            flex: 1,
                            height: '42px',
                            bgcolor: '#bef264', // Lime Green
                            color: 'black',
                            textTransform: 'none',
                            fontWeight: 700,
                            borderRadius: 1.5,
                            boxShadow: 'none',
                            '&:hover': {
                                bgcolor: '#d9f99d',
                                boxShadow: '0 4px 6px -1px rgba(180, 240, 100, 0.3)'
                            }
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            window.open(`https://wa.me/${(item.phoneNumber || "919876543210").replace(/\D/g, '')}?text=Hi, I'm interested in ${item.title}`, '_blank');
                        }}
                    >
                        WhatsApp Now
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default WholesaleFeed;
