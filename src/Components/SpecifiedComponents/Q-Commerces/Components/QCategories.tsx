import { Box, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';

const categories = [
    { title: 'Vegetables', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=200&q=80' },
    { title: 'Fruits', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=200&q=80' },
    { title: 'Dairy', image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=200&q=80' },
    { title: 'Bakery', image: 'https://images.unsplash.com/photo-1555507036-ab1f40388085?auto=format&fit=crop&w=200&q=80' },
    { title: 'Snacks', image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=200&q=80' },
    { title: 'Drinks', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=200&q=80' }
];

const QCategories = () => {
    return (
        <Box sx={{ py: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Shop by Category</Typography>
            <Grid container spacing={2}>
                {categories.map((cat, index) => (
                    <Grid item xs={4} sm={2} key={index}>
                        <Card sx={{ boxShadow: 'none', bgcolor: '#f5f5f5', textAlign: 'center' }}>
                            <CardMedia
                                component="img"
                                image={cat.image}
                                alt={cat.title}
                                sx={{ height: 80, objectFit: 'contain', p: 1 }}
                            />
                            <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
                                <Typography variant="caption" sx={{ fontWeight: 600 }}>{cat.title}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default QCategories;
