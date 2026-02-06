import { Box, Typography, Button, Paper, Grid } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { allProducts } from '../../../data/productsData';

const SpecialOffersSection = () => {
    const navigate = useNavigate();
    const [time, setTime] = useState({ hours: 12, minutes: 30, seconds: 12 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prev) => {
                let { hours, minutes, seconds } = prev;
                if (seconds > 0) {
                    seconds--;
                } else {
                    seconds = 59;
                    if (minutes > 0) {
                        minutes--;
                    } else {
                        minutes = 59;
                        if (hours > 0) {
                            hours--;
                        }
                    }
                }
                return { hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Get different product categories for One Day Offer (unique products)
    const oneDayOfferProducts = [
        allProducts.find(p => p.id === 2),  // Samsung Galaxy (mobile)
        allProducts.find(p => p.id === 4),  // Elegant Evening Gown (dress)
        allProducts.find(p => p.id === 6),  // Fossil Watch (watch)
        allProducts.find(p => p.id === 7)   // Nike Shoes (shoes)
    ].filter((p): p is NonNullable<typeof p> => p !== undefined);

    // Get T-Shirt products (4 products in 2x2 grid, unique from other sections)
    const tshirtProducts = [
        allProducts.find(p => p.id === 9),   // Men's Premium Cotton T-Shirt
        allProducts.find(p => p.id === 11),  // Men's Polo T-Shirt
        allProducts.find(p => p.id === 12),  // Unisex Oversized T-Shirt
        allProducts.find(p => p.id === 14)   // Men's Sports Performance T-Shirt
    ].filter((p): p is NonNullable<typeof p> => p !== undefined);

    const handleProductClick = (productId: number) => {
        navigate(`/product/${productId}`);
    };

    const handleViewAll = (category: string) => {
        navigate(`/products/${category}`);
    };

    return (
        <Box sx={{ width: '100%', my: 3 }}>
            {/* Top Promotional Banner - UpTo 60% Off */}
            <Paper
                elevation={0}
                sx={{
                    background: 'linear-gradient(135deg, #2E3192 0%, #1BFFFF 100%)',
                    borderRadius: 3,
                    p: { xs: 5, md: 8 },  // Increased padding for more height
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    position: 'relative',
                    overflow: 'hidden',
                    minHeight: { xs: '250px', md: '320px' },  // Added minimum height
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 32px rgba(46, 49, 146, 0.3)',
                    },
                }}
            >
                <Box sx={{ flex: 1, zIndex: 1 }}>
                    <Box
                        sx={{
                            display: 'inline-block',
                            bgcolor: 'rgba(255,255,255,0.2)',
                            backdropFilter: 'blur(10px)',
                            px: 3,  // Increased padding
                            py: 1,  // Increased padding
                            borderRadius: 2,
                            mb: 2,  // Increased margin
                        }}
                    >
                        <Typography variant="caption" sx={{ color: 'white', fontWeight: 600, fontSize: '1rem' }}>  {/* Increased font size */}
                            TopDeal | Apple
                        </Typography>
                    </Box>
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 800,
                            color: 'white',
                            mb: 1.5,  // Increased margin
                            textShadow: '0 2px 8px rgba(0,0,0,0.2)',
                            fontSize: { xs: '3rem', md: '4.5rem' },  // Significantly increased font size
                            lineHeight: 1.2,
                        }}
                    >
                        UpTo 60% Off
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            color: 'rgba(255,255,255,0.95)',
                            mb: 3,  // Increased margin
                            fontWeight: 500,
                            fontSize: { xs: '1.25rem', md: '1.75rem' },  // Increased font size
                        }}
                    >
                        Mobiles & LapTop
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: 'white',
                            color: '#2E3192',
                            fontWeight: 700,
                            px: 5,  // Increased padding
                            py: 1.5,  // Increased padding
                            borderRadius: 2,
                            textTransform: 'none',
                            fontSize: '1.1rem',  // Increased font size
                            '&:hover': {
                                bgcolor: '#f5f5f5',
                                transform: 'scale(1.05)',
                            },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        Shop Now
                    </Button>
                </Box>
                <Box
                    component="img"
                    src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=400&fit=crop&q=80"
                    alt="Mobiles & Laptops"
                    sx={{
                        height: { xs: 150, md: 250 },  // Increased height for more impact
                        width: 'auto',
                        objectFit: 'contain',
                        zIndex: 1,
                        filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.4))',  // Enhanced shadow
                        transform: 'perspective(1000px) rotateY(-5deg)',  // Added 3D effect
                        transition: 'transform 0.3s ease',
                    }}
                />
            </Paper>

            {/* Middle Section: Valentine's Banner & Flash Sales side-by-side */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                {/* Valentine's Day Banner - Dark Theme */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper
                        elevation={4}
                        sx={{
                            background: 'linear-gradient(135deg, #880e4f 0%, #b71c1c 100%)', // Dark Red/Pink Theme
                            borderRadius: 4,
                            p: 4,
                            height: '100%',
                            minHeight: '320px', // Increased Height
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            position: 'relative',
                            overflow: 'hidden',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-6px)',
                                boxShadow: '0 12px 32px rgba(136, 14, 79, 0.4)',
                            },
                        }}
                    >
                        <Box sx={{ flex: 1, zIndex: 1, position: 'relative' }}>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: -20,
                                    left: -20,
                                    width: 100,
                                    height: 100,
                                    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
                                    borderRadius: '50%'
                                }}
                            />
                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight: 900,
                                    color: 'white',
                                    mb: 2,
                                    textShadow: '0 4px 12px rgba(0,0,0,0.3)',
                                    fontSize: { xs: '2rem', md: '2.5rem' },
                                    lineHeight: 1.1,
                                    letterSpacing: 1
                                }}
                            >
                                Valentine's<br />
                                <span style={{ color: '#ff80ab' }}>Offers</span>
                            </Typography>
                            <Button
                                variant="contained"
                                sx={{
                                    bgcolor: 'white',
                                    color: '#880e4f',
                                    fontWeight: 800,
                                    px: 4,
                                    py: 1.2,
                                    borderRadius: 50,
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                    '&:hover': {
                                        bgcolor: '#fce4ec',
                                        transform: 'scale(1.05)',
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                Shop Gifts
                            </Button>
                        </Box>
                        <Box
                            component="img"
                            src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=250&fit=crop"
                            alt="Valentine's Day"
                            sx={{
                                height: { xs: 140, md: 180 },
                                width: 'auto',
                                objectFit: 'contain',
                                zIndex: 1,
                                filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.4))',
                                transform: 'rotate(10deg)',
                            }}
                        />
                    </Paper>
                </Grid>

                {/* Flash Sales Timer - Dark Theme */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper
                        elevation={4}
                        sx={{
                            background: 'linear-gradient(135deg, #004d40 0%, #1b5e20 100%)', // Dark Green/Teal Theme
                            borderRadius: 4,
                            p: 4,
                            height: '100%',
                            minHeight: '320px', // Matches Height
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            position: 'relative',
                            overflow: 'hidden',
                            transition: 'transform 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-6px)',
                                boxShadow: '0 12px 32px rgba(0, 77, 64, 0.4)',
                            },
                        }}
                    >
                        <Box sx={{ flex: 1, zIndex: 1 }}>
                            <Box
                                sx={{
                                    bgcolor: 'rgba(255,255,255,0.1)',
                                    backdropFilter: 'blur(10px)',
                                    borderRadius: 3,
                                    px: 3,
                                    py: 2,
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    mb: 2,
                                    border: '1px solid rgba(255,255,255,0.2)'
                                }}
                            >
                                <AccessTimeIcon sx={{ color: '#69f0ae', fontSize: 32 }} />
                                <Typography variant="h3" sx={{ fontWeight: 800, color: 'white', letterSpacing: 2, fontFamily: 'monospace' }}>
                                    {String(time.hours).padStart(2, '0')}:{String(time.minutes).padStart(2, '0')}:
                                    {String(time.seconds).padStart(2, '0')}
                                </Typography>
                            </Box>
                            <Typography variant="h4" sx={{ color: 'white', fontWeight: 800, letterSpacing: 1 }}>
                                Flash Sale
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#b9f6ca', mt: 1, fontWeight: 500 }}>
                                Ending soon! Don't miss out.
                            </Typography>
                        </Box>
                        <Box
                            component="img"
                            src="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=200&fit=crop"
                            alt="Flash Sale"
                            sx={{
                                height: { xs: 120, md: 160 },
                                width: 'auto',
                                objectFit: 'contain',
                                filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.4))',
                                transform: 'scale(1.1)',
                            }}
                        />
                    </Paper>
                </Grid>
            </Grid>

            {/* Product Grid Offers - Vibrant Theme & Horizontal List Model */}
            <Grid container spacing={3}>
                {/* Valentine's Specials - Purple/Pink Gradient */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper
                        elevation={0}
                        sx={{
                            bgcolor: 'background.paper', // Reset to white
                            borderRadius: 4,
                            p: 4,
                            height: '100%',
                            minHeight: '500px',
                            display: 'flex',
                            flexDirection: 'column',
                            color: 'text.primary', // Reset text color
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-6px)',
                                boxShadow: '0 12px 40px rgba(0, 147, 233, 0.4)',
                            },
                        }}
                    >
                        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <Box>
                                <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, letterSpacing: 0.5 }}>
                                    Valentine's Specials
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                                    Gift them something perfect
                                </Typography>
                            </Box>
                        </Box>

                        <Grid container spacing={2} sx={{ flex: 1 }}>
                            {oneDayOfferProducts.map((product) => (
                                <Grid size={{ xs: 12, sm: 6 }} key={product.id}> {/* Changed to 2 columns on small/desktop */}
                                    <Box
                                        onClick={() => handleProductClick(product.id)}
                                        sx={{
                                            bgcolor: '#f8f9fa', // Light grey inner card
                                            borderRadius: 3,
                                            p: 1.5,
                                            height: '100%',
                                            cursor: 'pointer',
                                            display: 'flex', // Horizontal Layout
                                            alignItems: 'center',
                                            gap: 2,
                                            transition: 'all 0.3s ease',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                            '&:hover': {
                                                bgcolor: 'white',
                                                transform: 'translateX(4px)',
                                            },
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={product.image}
                                            alt={product.name}
                                            sx={{
                                                width: 80,
                                                height: 80,
                                                objectFit: 'cover',
                                                borderRadius: 2,
                                                flexShrink: 0,
                                            }}
                                        />
                                        <Box>
                                            <Typography variant="body2" sx={{ color: '#2d3436', fontWeight: 700, lineHeight: 1.2, mb: 0.5 }}>
                                                {product.name}
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: '#00b894', fontWeight: 800, fontSize: '0.9rem' }}>
                                                ₹{product.price.toLocaleString()}
                                            </Typography>
                                            {product.mrp > product.price && (
                                                <Typography variant="caption" sx={{ color: '#636e72', textDecoration: 'line-through', ml: 1 }}>
                                                    ₹{product.mrp.toLocaleString()}
                                                </Typography>
                                            )}
                                        </Box>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>

                        <Button
                            onClick={() => handleViewAll('one-day-offer')}
                            variant="contained"
                            sx={{
                                mt: 3,
                                bgcolor: '#0093E9', // Keep button colored but solid
                                color: 'white',
                                textTransform: 'none',
                                fontWeight: 700,
                                py: 1.5,
                                borderRadius: 10,
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                '&:hover': {
                                    bgcolor: '#f1f2f6',
                                    transform: 'scale(1.02)'
                                },
                            }}
                        >
                            View All Specials
                        </Button>
                    </Paper>
                </Grid>

                {/* Love Collection - Peach/Red Gradient */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper
                        elevation={0}
                        sx={{
                            bgcolor: 'background.paper', // Reset to white
                            borderRadius: 4,
                            p: 4,
                            height: '100%',
                            minHeight: '500px',
                            display: 'flex',
                            flexDirection: 'column',
                            color: 'text.primary', // Reset text color
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-6px)',
                                boxShadow: '0 12px 40px rgba(200, 80, 192, 0.4)',
                            },
                        }}
                    >
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, letterSpacing: 0.5 }}>
                                The Love Collection
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                                Stylish picks for your loved ones
                            </Typography>
                        </Box>

                        <Grid container spacing={2} sx={{ flex: 1 }}>
                            {tshirtProducts.map((product) => (
                                <Grid size={{ xs: 12, sm: 6 }} key={product.id}>
                                    <Box
                                        onClick={() => handleProductClick(product.id)}
                                        sx={{
                                            bgcolor: '#f8f9fa', // Light grey inner card
                                            borderRadius: 3,
                                            p: 1.5,
                                            height: '100%',
                                            cursor: 'pointer',
                                            display: 'flex', // Horizontal Layout
                                            alignItems: 'center',
                                            gap: 2,
                                            transition: 'all 0.3s ease',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                            '&:hover': {
                                                bgcolor: 'white',
                                                transform: 'translateX(4px)',
                                            },
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={product.image}
                                            alt={product.name}
                                            sx={{
                                                width: 80,
                                                height: 80,
                                                objectFit: 'cover',
                                                borderRadius: 2,
                                                flexShrink: 0,
                                            }}
                                        />
                                        <Box>
                                            <Typography variant="body2" sx={{ color: '#2d3436', fontWeight: 700, lineHeight: 1.2, mb: 0.5 }}>
                                                {product.name}
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: '#d63031', fontWeight: 800, fontSize: '0.9rem' }}>
                                                ₹{product.price.toLocaleString()}
                                            </Typography>
                                            {product.mrp > product.price && (
                                                <Typography variant="caption" sx={{ color: '#636e72', textDecoration: 'line-through', ml: 1 }}>
                                                    ₹{product.mrp.toLocaleString()}
                                                </Typography>
                                            )}
                                        </Box>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>

                        <Button
                            onClick={() => handleViewAll('tshirt')}
                            variant="contained"
                            sx={{
                                mt: 3,
                                bgcolor: '#d63031', // Keep button colored
                                color: 'white',
                                textTransform: 'none',
                                fontWeight: 700,
                                py: 1.5,
                                borderRadius: 10,
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                '&:hover': {
                                    bgcolor: '#f1f2f6',
                                    transform: 'scale(1.02)'
                                },
                            }}
                        >
                            Explore Collection
                        </Button>
                    </Paper>
                </Grid>
            </Grid >
        </Box >
    );
};

export default SpecialOffersSection;
