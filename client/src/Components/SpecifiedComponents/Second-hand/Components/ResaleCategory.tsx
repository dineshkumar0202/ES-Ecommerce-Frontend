import { Box, Container, Typography, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const categories = [
    { name: 'Vintage Fashion', icon: '👜', color: '#fef3c7' },
    { name: 'Electronics', icon: '📱', color: '#dbeafe' },
    { name: 'Books', icon: '📚', color: '#fce7f3' },
    { name: 'Collectibles', icon: '🎨', color: '#d1fae5' },
    { name: 'Home Decor', icon: '🪑', color: '#ffe4e6' },
    { name: 'Luxury', icon: '💎', color: '#fef3c7' },
    { name: 'Sports', icon: '⚽', color: '#e0e7ff' }
];

const ResaleCategory = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="xl" sx={{ mb: 6 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '0.9rem', color: '#1f2937' }}>
                    Shop by Category
                </Typography>
                <Typography
                    onClick={() => navigate('/resale/categories')}
                    sx={{
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: '#3b82f6',
                        cursor: 'pointer',
                        '&:hover': { textDecoration: 'underline' }
                    }}
                >
                    View All Categories →
                </Typography>
            </Box>

            <Stack direction="row" spacing={3} sx={{ overflowX: 'auto', pb: 2, '::-webkit-scrollbar': { display: 'none' } }}>
                {categories.map((category) => (
                    <Box
                        key={category.name}
                        onClick={() => navigate(`/resale/category/${category.name.toLowerCase().replace(' ', '-')}`)}
                        sx={{
                            minWidth: '120px',
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: 'transform 0.2s',
                            '&:hover': { transform: 'translateY(-4px)' }
                        }}
                    >
                        <Box sx={{
                            width: 100,
                            height: 100,
                            borderRadius: '50%',
                            bgcolor: category.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '2.5rem',
                            mb: 1.5,
                            mx: 'auto',
                            border: '3px solid white',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                            '&:hover': { boxShadow: '0 8px 20px rgba(0,0,0,0.12)' }
                        }}>
                            {category.icon}
                        </Box>
                        <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: '#1f2937' }}>
                            {category.name}
                        </Typography>
                    </Box>
                ))}
            </Stack>
        </Container>
    );
};

export default ResaleCategory;
