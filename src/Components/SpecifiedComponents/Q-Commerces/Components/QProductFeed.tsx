import { Box, Typography, Paper, Button, Chip, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const products = [
    {
        id: 1,
        title: "Organic Avocado",
        unit: "2 PCS",
        price: 3.50,
        oldPrice: 5.00,
        image: "https://images.unsplash.com/photo-1523049673856-3dbacfea4594?auto=format&fit=crop&w=400&q=80",
        discount: "30% OFF",
        tagColor: "#ef4444"
    },
    {
        id: 2,
        title: "Whole Milk 2%",
        unit: "1 GALLON",
        price: 4.20,
        oldPrice: 4.80,
        image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80",
        discount: "FLASH",
        tagColor: "#000000"
    },
    {
        id: 3,
        title: "Pure Orange Juice",
        unit: "1.5L",
        price: 2.99,
        oldPrice: null,
        image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=400&q=80",
        discount: "BOGO",
        tagColor: "#ef4444"
    },
    {
        id: 4,
        title: "Mint Lemonade",
        unit: "4 PK",
        price: 5.49,
        oldPrice: 6.99,
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80",
        discount: "SAVE $1.50",
        tagColor: "#22c55e"
    }
];

const QProductFeed = () => {
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 6 }}>
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

                        <Box sx={{
                            height: 180,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 2
                        }}>
                            <Box component="img" src={item.image} alt={item.title} sx={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                        </Box>

                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0f172a' }}>{item.title}</Typography>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>{item.unit}</Typography>
                        </Stack>

                        <Stack direction="row" spacing={1} alignItems="baseline" sx={{ mb: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 900, color: '#0f172a' }}>${item.price.toFixed(2)}</Typography>
                            {item.oldPrice && (
                                <Typography variant="caption" sx={{ textDecoration: 'line-through', color: '#94a3b8', fontWeight: 600 }}>${item.oldPrice.toFixed(2)}</Typography>
                            )}
                        </Stack>

                        <Button
                            fullWidth
                            variant="contained"
                            startIcon={<AddIcon />}
                            sx={{
                                mt: 'auto',
                                bgcolor: '#22c55e',
                                color: 'black',
                                fontWeight: 800,
                                textTransform: 'none',
                                boxShadow: 'none',
                                '&:hover': { bgcolor: '#16a34a', boxShadow: 'none' }
                            }}
                        >
                            ADD TO CART
                        </Button>
                    </Paper>
                </Box>
            ))}
        </Box>
    );
};

export default QProductFeed;
