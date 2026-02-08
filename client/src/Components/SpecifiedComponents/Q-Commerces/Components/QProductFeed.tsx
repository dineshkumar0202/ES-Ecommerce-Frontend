import { Box, Typography, Paper, Button, Chip, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const products = [
    {
        id: 1,
        title: "Fresh Organic Vegetable Basket",
        unit: "PER BASKET",
        price: 350,
        oldPrice: 499,
        image: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=400&q=80",
        discount: "30% OFF",
        tagColor: "#ef4444"
    },
    {
        id: 2,
        title: "Premium Fruit Selection",
        unit: "PER PACK",
        price: 400,
        oldPrice: 550,
        image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=400&q=80",
        discount: "FRESH",
        tagColor: "#000000"
    },
    {
        id: 3,
        title: "Exotic Berries Pack",
        unit: "250G",
        price: 450,
        oldPrice: 600,
        image: "https://images.unsplash.com/photo-1571575173700-afb9492e6a50?auto=format&fit=crop&w=400&q=80",
        discount: "BOGO",
        tagColor: "#ef4444"
    },
    {
        id: 4,
        title: "Green Leafy Bundle",
        unit: "PER BUNDLE",
        price: 300,
        oldPrice: 400,
        image: "https://images.unsplash.com/photo-1573246123716-6b1782bfc499?auto=format&fit=crop&w=400&q=80",
        discount: "SAVE ₹100",
        tagColor: "#22c55e"
    }
];

const QProductFeed = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ mb: 6 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 800 }}>Best Sellers</Typography>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                {products.map((item) => (
                    <Box key={item.id} sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(25% - 18px)' }, flexGrow: 0, flexShrink: 0 }}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 2,
                                borderRadius: 3,
                                bgcolor: 'white',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'relative',
                                transition: 'transform 0.2s',
                                '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }
                            }}
                        >
                            {item.discount && (
                                <Chip
                                    label={item.discount}
                                    size="small"
                                    sx={{
                                        position: 'absolute',
                                        top: 16,
                                        left: 16,
                                        bgcolor: item.tagColor,
                                        color: 'white',
                                        fontWeight: 800,
                                        fontSize: '0.65rem',
                                        height: '22px',
                                        borderRadius: 1
                                    }}
                                />
                            )}

                            <Box
                                onClick={() => navigate(`/quick/product/${item.id}`)}
                                sx={{
                                    height: 180,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mb: 2,
                                    overflow: 'hidden',
                                    borderRadius: 2,
                                    cursor: 'pointer' // Add cursor pointer to indicate clickability
                                }}
                            >
                                <Box component="img" src={item.image} alt={item.title} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </Box>

                            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0f172a' }}>{item.title}</Typography>
                            </Stack>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', mb: 2, display: 'block' }}>{item.unit}</Typography>

                            <Stack direction="row" spacing={1} alignItems="baseline" sx={{ mb: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 900, color: '#0f172a' }}>₹{item.price}</Typography>
                                {item.oldPrice && (
                                    <Typography variant="caption" sx={{ textDecoration: 'line-through', color: '#94a3b8', fontWeight: 600 }}>₹{item.oldPrice}</Typography>
                                )}
                            </Stack>

                            <Stack direction="column" spacing={1} sx={{ mt: 'auto' }}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={() => navigate('/quick/category/fruits-veg')}
                                    sx={{
                                        bgcolor: 'black',
                                        color: 'white',
                                        fontWeight: 800,
                                        textTransform: 'none',
                                        boxShadow: 'none',
                                        '&:hover': { bgcolor: '#333', boxShadow: 'none' }
                                    }}
                                >
                                    BUY NOW
                                </Button>

                                <Button
                                    fullWidth
                                    variant="outlined"
                                    startIcon={<AddIcon />}
                                    sx={{
                                        bgcolor: 'transparent',
                                        borderColor: '#22c55e',
                                        color: '#16a34a',
                                        fontWeight: 800,
                                        textTransform: 'none',
                                        boxShadow: 'none',
                                        '&:hover': {
                                            bgcolor: '#f0fdf4',
                                            borderColor: '#16a34a',
                                            boxShadow: 'none'
                                        }
                                    }}
                                >
                                    ADD TO CART
                                </Button>
                            </Stack>
                        </Paper>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default QProductFeed;
