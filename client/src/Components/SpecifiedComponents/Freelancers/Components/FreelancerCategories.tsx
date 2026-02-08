import { Box, Typography, Card, CardMedia } from '@mui/material';

const categories = [
    { title: 'Headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=150&q=80' },
    { title: 'Gaming', image: 'https://images.unsplash.com/photo-1593118943729-22a466c9bb3e?auto=format&fit=crop&w=150&q=80' },
    { title: 'Cameras', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=150&q=80' },
    { title: 'Watches', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=150&q=80' },
    { title: 'Sneakers', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=150&q=80' },
    { title: 'Glasses', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=150&q=80' }
];

const FreelancerCategories = () => {
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
            {categories.map((cat, index) => (
                <Box
                    key={index}
                    sx={{
                        width: { xs: 'calc(50% - 8px)', sm: 'calc(33.33% - 11px)', md: 'calc(16.66% - 14px)' },
                        flexGrow: 0,
                        flexShrink: 0
                    }}
                >
                    <Card
                        sx={{
                            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                            borderRadius: 4,
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            aspectRatio: '1/1',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 8px 25px rgba(0,0,0,0.08)' }
                        }}
                    >
                        <CardMedia
                            component="img"
                            image={cat.image}
                            alt={cat.title}
                            sx={{
                                width: 80,
                                height: 80,
                                objectFit: 'cover',
                                mb: 1.5,
                                borderRadius: 3
                            }}
                        />
                        <Typography variant="caption" sx={{ fontWeight: 800, fontSize: '0.8rem', color: '#1e293b' }}>
                            {cat.title}
                        </Typography>
                    </Card>
                </Box>
            ))}
        </Box>
    );
};

export default FreelancerCategories;
