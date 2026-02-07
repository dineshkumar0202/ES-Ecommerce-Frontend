
import { Box, Typography, Button, Paper, Chip, IconButton, Stack } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TuneIcon from '@mui/icons-material/Tune';

const products = [
    {
        id: 1,
        title: "iPhone 13 Pro, 256GB",
        price: 599,
        condition: "CERTIFIED REFURBISHED",
        location: "San Francisco, CA",
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=400&q=80",
        tagColor: "#bef264" // Lime
    },
    {
        id: 2,
        title: "Herman Miller Aeron",
        price: 850,
        condition: "LIKE NEW",
        location: "Austin, TX",
        image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=400&q=80",
        tagColor: "#f1f5f9" // White/Grey
    },
    {
        id: 3,
        title: "Nike Air Max 270",
        price: 120,
        condition: "GREAT VALUE",
        location: "Brooklyn, NY",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80",
        tagColor: "#bef264"
    },
    {
        id: 4,
        title: "MacBook Pro M1 13\"",
        price: 950,
        condition: "CERTIFIED REFURBISHED",
        location: "Seattle, WA",
        image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=400&q=80",
        tagColor: "#bef264"
    },
    {
        id: 5,
        title: "Sony WH-1000XM4",
        price: 210,
        condition: "USED - EXCELLENT",
        location: "Los Angeles, CA",
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=400&q=80",
        tagColor: "#f1f5f9"
    }
];

const SHRecentlyListed = () => {
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
                {products.map((item) => (
                    <Box key={item.id} sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(20% - 19.2px)' }, flexGrow: 0, flexShrink: 0 }}>
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
                            <Box sx={{ position: 'relative', mb: 2, height: 200, bgcolor: '#f8fafc', borderRadius: 2, overflow: 'hidden' }}>
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
                                        ${item.price}
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

            <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
                <Button
                    variant="outlined"
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
        </Box>
    );
};

export default SHRecentlyListed;
