import { Box, Typography, Stack, Avatar } from '@mui/material';

const categories = [
    { name: 'Home Decor', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=200' },
    { name: 'Footwear', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=200' },
    { name: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=200' },
    { name: 'Accessories', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=200' },
    { name: 'Smart Tech', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=200' }, // Replaced with similar
    { name: 'Men\'s Apparel', image: 'https://images.unsplash.com/photo-15162579848b2-7713504ae76d?auto=format&fit=crop&q=80&w=200' },
    { name: 'Bags', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=200' }
];

interface RetailCategoriesProps {
    onCategoryClick: () => void;
}

const RetailCategories = ({ onCategoryClick }: RetailCategoriesProps) => {
    return (
        <Box sx={{ width: '100%', mb: 8, mt: 4 }}>
            {/* Section Header */}
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 6 }}>
                <Box sx={{ width: 40, height: 4, bgcolor: '#B4D5DC', borderRadius: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#2c3e50', letterSpacing: 0.5 }}>
                    Top Categories
                </Typography>
            </Stack>

            {/* Categories List */}
            <Stack
                direction="row"
                spacing={{ xs: 2, md: 4 }}
                sx={{
                    overflowX: 'auto',
                    pb: 2,
                    '&::-webkit-scrollbar': { display: 'none' },
                    msOverflowStyle: 'none',
                    scrollbarWidth: 'none',
                    justifyContent: { xs: 'flex-start', md: 'space-between' }
                }}
            >
                {categories.map((cat, index) => (
                    <Stack
                        key={index}
                        onClick={onCategoryClick}
                        alignItems="center"
                        spacing={2}
                        sx={{
                            minWidth: { xs: 100, md: 140 },
                            cursor: 'pointer',
                            '&:hover .cat-avatar': { borderColor: '#1abc9c', transform: 'scale(1.05)' },
                            '&:hover .cat-name': { color: '#000' }
                        }}
                    >
                        <Box sx={{ position: 'relative' }}>
                            <Avatar
                                className="cat-avatar"
                                src={cat.image}
                                sx={{
                                    width: { xs: 80, md: 120 },
                                    height: { xs: 80, md: 120 },
                                    border: '3px solid #CFE8EF',
                                    bgcolor: '#f1f1f1',
                                    transition: 'all 0.3s ease-in-out',
                                    p: 0.5
                                }}
                            />
                        </Box>
                        <Typography
                            variant="subtitle2"
                            className="cat-name"
                            sx={{
                                fontWeight: 700,
                                fontSize: '0.9rem',
                                color: '#52525b',
                                textAlign: 'center',
                                transition: 'color 0.3s ease'
                            }}
                        >
                            {cat.name}
                        </Typography>
                    </Stack>
                ))}
            </Stack>
        </Box>
    );
};

export default RetailCategories;
