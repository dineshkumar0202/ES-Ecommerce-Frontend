import { Box, Grid, Card, CardMedia, CardContent, Typography, Chip, Avatar } from '@mui/material';

const items = [
    {
        title: 'iPhone 13 Pro',
        price: '$650',
        image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&w=600&q=80',
        condition: 'Like New',
        seller: 'John D.',
        time: '2h ago'
    },
    {
        title: 'Sony WH-1000XM4',
        price: '$200',
        image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=600&q=80',
        condition: 'Used',
        seller: 'Sarah M.',
        time: '5h ago'
    },
    {
        title: 'MacBook Air M1',
        price: '$700',
        image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=600&q=80',
        condition: 'Good',
        seller: 'Mike R.',
        time: '1d ago'
    },
    {
        title: 'Vintage Camera',
        price: '$150',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80',
        condition: 'Vintage',
        seller: 'Emma W.',
        time: '2d ago'
    },
    {
        title: 'Gaming Chair',
        price: '$120',
        image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=600&q=80',
        condition: 'Good',
        seller: 'Alex K.',
        time: '3d ago'
    },
    {
        title: 'DSLR Lens',
        price: '$300',
        image: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=600&q=80',
        condition: 'Like New',
        seller: 'Lisa P.',
        time: '1w ago'
    }
];

const ResaleFeed = () => {
    return (
        <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, color: '#1e293b' }}>Fresh Finds</Typography>
            <Grid container spacing={3}>
                {items.map((item, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card
                            sx={{
                                borderRadius: 4,
                                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                border: '1px solid #f1f5f9',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 12px 24px rgba(0,0,0,0.1)'
                                }
                            }}
                        >
                            <Box sx={{ position: 'relative' }}>
                                <CardMedia
                                    component="img"
                                    height="220"
                                    image={item.image}
                                    alt={item.title}
                                />
                                <Chip
                                    label={item.condition}
                                    size="small"
                                    sx={{
                                        position: 'absolute',
                                        top: 12,
                                        right: 12,
                                        bgcolor: 'rgba(255,255,255,0.95)',
                                        fontWeight: 700,
                                        backdropFilter: 'blur(4px)',
                                        color: '#334155'
                                    }}
                                />
                            </Box>
                            <CardContent sx={{ p: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                    <Typography variant="subtitle1" fontWeight="700" sx={{ lineHeight: 1.2 }}>{item.title}</Typography>
                                    <Typography variant="subtitle1" fontWeight="800" color="primary">{item.price}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar sx={{ width: 24, height: 24, mr: 1, bgcolor: '#e2e8f0', color: '#64748b', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                            {item.seller[0]}
                                        </Avatar>
                                        <Typography variant="caption" color="text.secondary" fontWeight="500">{item.seller}</Typography>
                                    </Box>
                                    <Typography variant="caption" color="text.disabled">{item.time}</Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ResaleFeed;
