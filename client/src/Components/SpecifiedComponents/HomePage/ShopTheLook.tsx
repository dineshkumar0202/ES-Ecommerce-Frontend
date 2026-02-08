import { Box, Typography, Button, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';

const posts = [
    { id: 1, img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80', likes: '2.4k' },
    { id: 2, img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80', likes: '1.8k' },
    { id: 3, img: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=400&q=80', likes: '3.1k' },
    { id: 4, img: 'https://images.unsplash.com/photo-1550614000-4b9519e07502?w=400&q=80', likes: '956' },
];

const ShopTheLook = () => {
    return (
        <Box sx={{ mt: 8, mb: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="overline" sx={{ color: '#e91e63', fontWeight: 700, letterSpacing: 2 }}>
                    #ESStyle
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
                    As Seen On You
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    Tag @ES_Style to be featured in our gallery
                </Typography>
            </Box>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                    gap: 2
                }}
            >
                {posts.map((post) => (
                    <Box
                        key={post.id}
                        sx={{
                            position: 'relative',
                            aspectRatio: '1/1',
                            overflow: 'hidden',
                            borderRadius: 4,
                            cursor: 'pointer',
                            group: 'true', // For simpler hover logic targeting if needed, but styling below works better
                            '&:hover .overlay': {
                                opacity: 1,
                            },
                            '&:hover .bg-image': {
                                transform: 'scale(1.1)',
                            }
                        }}
                    >
                        <Box
                            className="bg-image"
                            component="img"
                            src={post.img}
                            alt="Instagram Post"
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                transition: 'transform 0.5s ease',
                            }}
                        />
                        <Box
                            className="overlay"
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                bgcolor: 'rgba(0,0,0,0.4)',
                                backdropFilter: 'blur(2px)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: 0,
                                transition: 'opacity 0.3s ease',
                            }}
                        >
                            <IconButton sx={{ color: 'white', mb: 1 }}>
                                <InstagramIcon fontSize="large" />
                            </IconButton>
                            <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>
                                Shop Look
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                                ❤️ {post.likes}
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Box>

            <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Button
                    variant="outlined"
                    startIcon={<InstagramIcon />}
                    sx={{
                        borderRadius: 50,
                        px: 4,
                        py: 1,
                        color: '#C13584',
                        borderColor: '#C13584',
                        '&:hover': {
                            bgcolor: '#fce4ec',
                            borderColor: '#C13584'
                        }
                    }}
                >
                    Follow Us @ES_Style
                </Button>
            </Box>
        </Box>
    );
};

export default ShopTheLook;
