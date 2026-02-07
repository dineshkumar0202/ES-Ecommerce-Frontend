import { Box, Typography, Card, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const categories = [
    { title: 'FRUITS & VEG', image: 'https://cdn-icons-png.flaticon.com/512/3081/3081840.png', slug: 'fruits-veg' },
    { title: 'BAKERY', image: 'https://cdn-icons-png.flaticon.com/512/3081/3081903.png', slug: 'bakery' },
    { title: 'PHARMACY', image: 'https://cdn-icons-png.flaticon.com/512/883/883407.png', slug: 'pharmacy' },
    { title: 'MEAT & FISH', image: 'https://cdn-icons-png.flaticon.com/512/10753/10753545.png', slug: 'meat-fish' }, // Updated Meat & Fish Icon
    { title: 'DAIRY & EGGS', image: 'https://cdn-icons-png.flaticon.com/512/7274/7274128.png', slug: 'dairy-eggs' },
    { title: 'SNACKS', image: 'https://cdn-icons-png.flaticon.com/512/2673/2673620.png', slug: 'snacks' }
];

const QCategories = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
            {categories.map((cat, index) => (
                <Box
                    key={index}
                    onClick={() => navigate(`/quick/category/${cat.slug}`)}
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
                            sx={{ width: 60, height: 60, objectFit: 'contain', mb: 2 }}
                        />
                        <Typography variant="caption" sx={{ fontWeight: 800, fontSize: '0.7rem', color: '#1e293b' }}>
                            {cat.title}
                        </Typography>
                    </Card>
                </Box>
            ))}
        </Box>
    );
};

export default QCategories;
