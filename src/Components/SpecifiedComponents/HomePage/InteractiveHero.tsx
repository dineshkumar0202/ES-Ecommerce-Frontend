import React, { useState } from 'react';
import { Box, Typography, Button, Avatar, Container } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { keyframes } from '@emotion/react';

// Animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 105, 180, 0.7); }
  70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(255, 105, 180, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 105, 180, 0); }
`;

const gradientText = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const stories = [
    { id: 1, label: 'New In', img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80', color: '#FF6B6B' },
    { id: 2, label: 'Best Sellers', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80', color: '#4ECDC4' },
    { id: 3, label: 'Flash Sale', img: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80', color: '#FFE66D' },
    { id: 4, label: 'Trending', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80', color: '#FF8ED4' },
    { id: 5, label: 'Community', img: 'https://images.unsplash.com/photo-1529139574466-a302c27e3119?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80', color: '#546E7A' },
];

const InteractiveHero = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [activeStory, setActiveStory] = useState(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        // Calculate normalized mouse position (-1 to 1)
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = (e.clientY / window.innerHeight) * 2 - 1;
        setMousePos({ x, y });
    };

    return (
        <Box
            onMouseMove={handleMouseMove}
            sx={{
                position: 'relative',
                minHeight: '85vh',
                overflow: 'hidden',
                bgcolor: '#0f0c29',
                background: 'linear-gradient(to right, #24243e, #302b63, #0f0c29)',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                pt: { xs: 4, md: 8 },
                mb: 6,
                borderRadius: { xs: 0, md: '0 0 50px 50px' }, // Unique curve at bottom
            }}
        >
            {/* Animated Background Blobs */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '-10%',
                    right: '-5%',
                    width: '600px',
                    height: '600px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255,105,180,0.2) 0%, rgba(0,0,0,0) 70%)',
                    transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -30}px)`,
                    transition: 'transform 0.2s ease-out',
                    pointerEvents: 'none',
                    zIndex: 0
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '-10%',
                    left: '-5%',
                    width: '500px',
                    height: '500px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(78,205,196,0.2) 0%, rgba(0,0,0,0) 70%)',
                    transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
                    transition: 'transform 0.2s ease-out',
                    pointerEvents: 'none',
                    zIndex: 0
                }}
            />

            <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>

                {/* 1. Story Highlights with Glassmorphism */}
                <Box
                    sx={{
                        display: 'flex',
                        gap: 3,
                        mb: 6,
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        py: 2,
                        px: 4,
                        borderRadius: 100,
                        alignSelf: 'center',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}
                >
                    {stories.map((story, index) => (
                        <Box
                            key={story.id}
                            onClick={() => setActiveStory(index)}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                cursor: 'pointer',
                                transition: 'transform 0.2s',
                                '&:hover': { transform: 'translateY(-5px)' }
                            }}
                        >
                            <Box
                                sx={{
                                    p: 0.3,
                                    borderRadius: '50%',
                                    background: story.id === activeStory + 1 ? `linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)` : 'transparent',
                                    mb: 1
                                }}
                            >
                                <Avatar
                                    src={story.img}
                                    sx={{
                                        width: 65,
                                        height: 65,
                                        border: '3px solid #0f0c29',
                                    }}
                                />
                            </Box>
                            <Typography variant="caption" sx={{ fontWeight: 600, letterSpacing: 0.5 }}>
                                {story.label}
                            </Typography>
                        </Box>
                    ))}
                </Box>

                {/* 2. Main Hero Content */}
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', flex: 1, gap: 6 }}>

                    {/* Text Section */}
                    <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
                        <Typography
                            variant="overline"
                            sx={{
                                color: '#4ECDC4',
                                fontWeight: 800,
                                fontSize: '1.2rem',
                                letterSpacing: 4,
                                mb: 2,
                                display: 'block',
                                animation: `${float} 3s ease-in-out infinite`
                            }}
                        >
                            FUTURE OF SHOPPING
                        </Typography>
                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: { xs: '3rem', md: '5rem' },
                                fontWeight: 900,
                                lineHeight: 1,
                                mb: 3,
                                background: 'linear-gradient(to right, #fff, #b2bec3, #fff)',
                                backgroundSize: '200% auto',
                                color: '#fff',
                                backgroundClip: 'text',
                                textFillColor: 'transparent',
                                animation: `${gradientText} 5s linear infinite`
                            }}
                        >
                            UNLEASH <br />
                            <span style={{ color: 'transparent', WebkitTextStroke: '2px #FF6B6B' }}>YOUR FIBE</span>
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#b2bec3', mb: 5, maxWidth: '600px', mx: { xs: 'auto', md: 0 }, lineHeight: 1.6 }}>
                            Discover a curated collection of gear that speaks to your personality.
                            Experience shopping like never before with 3D interactions and AI-powered recommendations.
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                            <Button
                                variant="contained"
                                size="large"
                                endIcon={<ArrowForwardIcon />}
                                sx={{
                                    bgcolor: '#FF6B6B',
                                    color: 'white',
                                    px: 5,
                                    py: 2,
                                    fontSize: '1.1rem',
                                    borderRadius: 50,
                                    fontWeight: 800,
                                    boxShadow: '0 10px 30px rgba(255, 107, 107, 0.4)',
                                    animation: `${pulse} 2s infinite`, // Pulsing effect
                                    '&:hover': {
                                        bgcolor: '#FF5252',
                                        transform: 'scale(1.05)'
                                    }
                                }}
                            >
                                Shop Now
                            </Button>
                            <Button
                                startIcon={<PlayArrowIcon />}
                                sx={{
                                    color: 'white',
                                    px: 4,
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                    '&:hover': { color: '#4ECDC4' }
                                }}
                            >
                                Watch Video
                            </Button>
                        </Box>
                    </Box>

                    {/* 3D Visual Section */}
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', perspective: '1000px' }}>
                        <Box
                            component="img"
                            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" // High quality Nike shoe example
                            alt="Hero Product"
                            sx={{
                                width: '100%',
                                maxWidth: '600px',
                                filter: 'drop-shadow(0px 50px 50px rgba(0,0,0,0.5))',
                                transform: `rotateY(${mousePos.x * 10}deg) rotateX(${mousePos.y * -10}deg) scale(1.1)`,
                                transition: 'transform 0.1s ease-out',
                                cursor: 'pointer',
                                zIndex: 2
                            }}
                        />
                        {/* Floating Tag */}
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '20%',
                                right: '10%',
                                bgcolor: 'rgba(255,255,255,0.1)',
                                backdropFilter: 'blur(10px)',
                                p: 2,
                                borderRadius: 4,
                                border: '1px solid rgba(255,255,255,0.2)',
                                transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)`,
                                transition: 'transform 0.2s ease-out',
                            }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: 800 }}>$299</Typography>
                            <Typography variant="caption">Limited Edition</Typography>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default InteractiveHero;
