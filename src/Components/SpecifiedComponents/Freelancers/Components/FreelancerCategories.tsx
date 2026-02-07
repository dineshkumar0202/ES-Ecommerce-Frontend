import { Box, Typography, Card, CardMedia } from '@mui/material';

const categories = [
    { title: 'WEB DEV', image: 'https://cdn-icons-png.flaticon.com/512/1005/1005141.png' },
    { title: 'MOBILE APP', image: 'https://cdn-icons-png.flaticon.com/512/2906/2906274.png' },
    { title: 'UI/UX DESIGN', image: 'https://cdn-icons-png.flaticon.com/512/1260/1260206.png' },
    { title: 'WRITING', image: 'https://cdn-icons-png.flaticon.com/512/2490/2490315.png' },
    { title: 'MARKETING', image: 'https://cdn-icons-png.flaticon.com/512/1998/1998087.png' },
    { title: 'SEO', image: 'https://cdn-icons-png.flaticon.com/512/2721/2721291.png' }
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

export default FreelancerCategories;
