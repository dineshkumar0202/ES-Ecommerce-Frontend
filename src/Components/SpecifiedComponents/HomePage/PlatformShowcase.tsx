import { Box, Typography, Button, Container, Grid, Paper } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import BusinessIcon from '@mui/icons-material/Business';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import RecyclingIcon from '@mui/icons-material/Recycling';

const PlatformShowcase = () => {
    const navigate = useNavigate();

    const platforms = [
        {
            title: "WHOLESALE",
            subtitle: "B2B Marketplace",
            description: "Source premium products in bulk directly from manufacturers. Huge savings on large orders.",
            action: "Visit Wholesale",
            path: "/wholesale",
            icon: <BusinessIcon sx={{ fontSize: 40 }} />,
            bg: "#000000",
            color: "#bef264", // Lemon Green
            buttonBg: "#bef264",
            buttonColor: "#000000",
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" // Industrial image
        },
        {
            title: "Q-COMMERCE",
            subtitle: "Flash Delivery",
            description: "Need it now? Get products delivered to your doorstep in minutes. Speed meets quality.",
            action: "Shop Quick",
            path: "/q-commerce",
            icon: <ElectricBoltIcon sx={{ fontSize: 40 }} />,
            bg: "linear-gradient(135deg, #4338ca 0%, #312e81 100%)", // Indigo gradient
            color: "#ffffff",
            buttonBg: "#facc15", // Yellow
            buttonColor: "#312e81",
            image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80" // Shopper/Delivery
        },
        {
            title: "RESALE",
            subtitle: "Second Life",
            description: "Buy and sell pre-loved items. Sustainable shopping that's good for your wallet and the planet.",
            action: "Explore Resale",
            path: "/resale",
            icon: <RecyclingIcon sx={{ fontSize: 40 }} />,
            bg: "#047857", // Emerald Green
            color: "#ffffff",
            buttonBg: "#ffffff",
            buttonColor: "#047857",
            image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80" // Thrift/Clothes
        }
    ];

    return (
        <Box sx={{ py: 6 }}>
            <Container maxWidth="xl">
                <Typography variant="h4" sx={{
                    fontWeight: 800,
                    mb: 4,
                    color: '#0f172a',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    letterSpacing: 1
                }}>
                    Explore Our Ecosystem
                </Typography>

                <Grid container spacing={3}>
                    {platforms.map((platform, index) => (
                        <Grid size={{ xs: 12, md: 4 }} key={index}>
                            <Paper
                                elevation={0}
                                sx={{
                                    height: '100%',
                                    minHeight: '400px',
                                    borderRadius: 4,
                                    overflow: 'hidden',
                                    position: 'relative',
                                    background: platform.bg,
                                    color: platform.color,
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                                    }
                                }}
                            >
                                {/* Background Image with Overlay */}
                                <Box sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundImage: `url(${platform.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    opacity: 0.2,
                                    mixBlendMode: 'overlay'
                                }} />

                                <Box sx={{
                                    position: 'relative',
                                    zIndex: 1,
                                    p: 4,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between'
                                }}>
                                    <Box>
                                        <Box sx={{
                                            display: 'inline-flex',
                                            p: 1.5,
                                            borderRadius: 2,
                                            bgcolor: 'rgba(255,255,255,0.1)',
                                            backdropFilter: 'blur(10px)',
                                            mb: 3
                                        }}>
                                            {platform.icon}
                                        </Box>
                                        <Typography variant="overline" sx={{
                                            display: 'block',
                                            fontWeight: 700,
                                            letterSpacing: 2,
                                            mb: 1,
                                            opacity: 0.9
                                        }}>
                                            {platform.subtitle}
                                        </Typography>
                                        <Typography variant="h3" sx={{
                                            fontWeight: 900,
                                            mb: 2,
                                            lineHeight: 1
                                        }}>
                                            {platform.title}
                                        </Typography>
                                        <Typography variant="body1" sx={{
                                            opacity: 0.8,
                                            lineHeight: 1.6,
                                            maxWidth: '90%'
                                        }}>
                                            {platform.description}
                                        </Typography>
                                    </Box>

                                    <Button
                                        variant="contained"
                                        size="large"
                                        endIcon={<ArrowForwardIcon />}
                                        onClick={() => navigate(platform.path)}
                                        sx={{
                                            mt: 4,
                                            alignSelf: 'flex-start',
                                            bgcolor: platform.buttonBg,
                                            color: platform.buttonColor,
                                            fontWeight: 700,
                                            borderRadius: 50,
                                            px: 4,
                                            py: 1.5,
                                            boxShadow: 'none',
                                            '&:hover': {
                                                bgcolor: platform.buttonBg,
                                                opacity: 0.9,
                                                transform: 'scale(1.02)'
                                            }
                                        }}
                                    >
                                        {platform.action}
                                    </Button>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default PlatformShowcase;
