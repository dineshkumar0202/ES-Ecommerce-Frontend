import { Box, Typography, Card, CardContent, CardMedia, Button, Grid, Chip } from '@mui/material';
import BoltIcon from '@mui/icons-material/Bolt';
import TimerIcon from '@mui/icons-material/Timer';

const flashSaleProducts = [
    {
        id: 1,
        title: "Wireless Headphones",
        price: "$49.99",
        originalPrice: "$99.99",
        discount: "50% OFF",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 2,
        title: "Smart Watch Series 7",
        price: "$199.99",
        originalPrice: "$299.99",
        discount: "33% OFF",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 3,
        title: "Gaming Mouse",
        price: "$29.99",
        originalPrice: "$59.99",
        discount: "50% OFF",
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 4,
        title: "Mechanical Keyboard",
        price: "$79.99",
        originalPrice: "$129.99",
        discount: "40% OFF",
        image: "https://images.unsplash.com/photo-1587829741301-dc798b91a91e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
];

const FlashSales = () => {
    return (
        <Box sx={{ mt: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <BoltIcon sx={{ color: '#ffbd2e', fontSize: 32, mr: 1 }} />
                    <Typography variant="h4" sx={{ fontWeight: 800 }}>
                        Flash Sales
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#f5f5f5', px: 2, py: 1, borderRadius: 2 }}>
                    <TimerIcon sx={{ fontSize: 20, mr: 1, color: '#666' }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#ec407a' }}>
                        Ends in: 02:14:30
                    </Typography>
                </Box>
            </Box>

            <Grid container spacing={3}>
                {flashSaleProducts.map((product) => (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={product.id}>
                        <Card
                            sx={{
                                height: '100%',
                                borderRadius: 3,
                                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                                },
                            }}
                        >
                            <Box sx={{ position: 'relative' }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={product.image}
                                    alt={product.title}
                                    sx={{ bgcolor: '#f5f5f5' }}
                                />
                                <Chip
                                    label={product.discount}
                                    color="secondary"
                                    size="small"
                                    sx={{
                                        position: 'absolute',
                                        top: 10,
                                        left: 10,
                                        fontWeight: 'bold',
                                    }}
                                />
                            </Box>
                            <CardContent>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, height: 48, overflow: 'hidden' }}>
                                    {product.title}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                                    <Box>
                                        <Typography variant="h6" sx={{ fontWeight: 800, color: '#d32f2f' }}>
                                            {product.price}
                                        </Typography>
                                        <Typography variant="caption" sx={{ textDecoration: 'line-through', color: '#999' }}>
                                            {product.originalPrice}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    sx={{
                                        borderRadius: 2,
                                        fontWeight: 'bold',
                                        textTransform: 'none',
                                    }}
                                >
                                    Add to Cart
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default FlashSales;
