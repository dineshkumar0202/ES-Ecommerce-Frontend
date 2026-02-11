import { Box, Container, Typography, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const categories = [
    { name: 'Fresh Fruits', icon: '🍎' },
    { name: 'Dairy Eggs', icon: '🥛' },
    { name: 'Snacks', icon: '🍪' },
    { name: 'Personal', icon: '🧴' },
    { name: 'Beverages', icon: '🥤' },
    { name: 'Household', icon: '🧹' }
];

const QCategory = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="xl" sx={{ mb: 6 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, fontSize: '0.75rem', letterSpacing: 1, color: '#6b7280' }}>
                SHOP BY CATEGORY
            </Typography>

            <Stack direction="row" spacing={3} sx={{ overflowX: 'auto', pb: 2, '::-webkit-scrollbar': { display: 'none' } }}>
                {categories.map((category) => (
                    <Box
                        key={category.name}
                        onClick={() => navigate(`/quick/category/${category.name.toLowerCase().replace(' ', '-')}`)}
                        sx={{
                            minWidth: '100px',
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: 'transform 0.2s',
                            '&:hover': { transform: 'translateY(-4px)' }
                        }}
                    >
                        <Box sx={{
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            bgcolor: '#f3f4f6',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '2rem',
                            mb: 1.5,
                            mx: 'auto',
                            border: '2px solid transparent',
                            '&:hover': { borderColor: '#B4D5DC' }
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

export default QCategory;
