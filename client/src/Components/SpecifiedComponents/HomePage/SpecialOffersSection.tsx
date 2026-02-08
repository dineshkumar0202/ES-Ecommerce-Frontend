import { Box, Typography, Button, Paper, Grid } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { allProducts } from '../../../data/productsData';

const SpecialOffersSection = () => {
    const navigate = useNavigate();
    const [time, setTime] = useState({ hours: 12, minutes: 30, seconds: 12 });
    const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

    const heroOffers = [
        {
            id: 1,
            tag: 'TopDeal | Apple',
            title: 'UpTo 60% Off',
            subtitle: 'Mobiles & Laptops',
            bg: 'linear-gradient(135deg, #2E3192 0%, #1BFFFF 100%)',
            img: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=400&fit=crop&q=80'
        },
        {
            id: 2,
            tag: 'New Season | Nike',
            title: 'Min 40% Off',
            subtitle: 'Premium Sportswear',
            bg: 'linear-gradient(135deg, #D4145A 0%, #FBB03B 100%)',
            img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&fit=crop&q=80'
        },
        {
            id: 3,
            tag: 'Modern Living',
            title: 'Flat 30% Off',
            subtitle: 'Furniture & Decor',
            bg: 'linear-gradient(135deg, #009245 0%, #FCEE21 100%)',
            img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&fit=crop&q=80'
        }
    ];

    // Carousel Auto-Play
    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentHeroSlide((prev) => (prev + 1) % heroOffers.length);
        }, 5000);
        return () => clearInterval(slideInterval);
    }, []);

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
            {/* Top Promotional Banner - Dynamic Carousel */}
            <Box sx={{ position: 'relative', mb: 4, borderRadius: 4, overflow: 'hidden', minHeight: { xs: '300px', md: '400px' } }}>
                {heroOffers.map((offer, index) => (
                    <Paper
                        key={offer.id}
                        elevation={0}
                        sx={{
                            background: offer.bg,
                            borderRadius: 4,
                            p: { xs: 4, md: 8 },
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            opacity: currentHeroSlide === index ? 1 : 0,
                            visibility: currentHeroSlide === index ? 'visible' : 'hidden',
                            transition: 'opacity 0.8s ease-in-out, visibility 0.8s',
                            zIndex: currentHeroSlide === index ? 2 : 1,
                        }}
                    >
                        <Box sx={{ flex: 1, zIndex: 1, maxWidth: '600px' }}>
                            <Box
                                sx={{
                                    display: 'inline-block',
                                    bgcolor: 'rgba(255,255,255,0.2)',
                                    backdropFilter: 'blur(10px)',
                                    px: 2,
                                    py: 0.5,
                                    borderRadius: 50,
                                    mb: 3,
                                    border: '1px solid rgba(255,255,255,0.3)'
                                }}
                            >
                                <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>
                                    {offer.tag}
                                </Typography>
                            </Box>
                            <Typography
                                variant="h2"
                                sx={{
                                    fontWeight: 900,
                                    color: 'white',
                                    mb: 2,
                                    fontSize: { xs: '2.5rem', md: '4.5rem' },
                                    lineHeight: 1.1,
                                    textShadow: '0 4px 20px rgba(0,0,0,0.2)',
                                    transform: currentHeroSlide === index ? 'translateY(0)' : 'translateY(20px)',
                                    opacity: currentHeroSlide === index ? 1 : 0,
                                    transition: 'all 0.8s ease 0.2s'
                                }}
                            >
                                {offer.title}
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{
                                    color: 'rgba(255,255,255,0.9)',
                                    mb: 4,
                                    fontWeight: 500,
                                    transform: currentHeroSlide === index ? 'translateY(0)' : 'translateY(20px)',
                                    opacity: currentHeroSlide === index ? 1 : 0,
                                    transition: 'all 0.8s ease 0.4s'
                                }}
                            >
                                {offer.subtitle}
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={() => navigate('/products/all')}
                                sx={{
                                    bgcolor: 'white',
                                    color: 'text.primary', // Dark text for contrast
                                    fontWeight: 800,
                                    px: 5,
                                    py: 2,
                                    borderRadius: 50,
                                    textTransform: 'none',
                                    fontSize: '1.1rem',
                                    boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                                    transform: currentHeroSlide === index ? 'translateY(0)' : 'translateY(20px)',
                                    opacity: currentHeroSlide === index ? 1 : 0,
                                    transition: 'all 0.8s ease 0.6s',
                                    '&:hover': {
                                        transform: 'translateY(-3px)',
                                        boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
                                        bgcolor: 'white'
                                    },
                                }}
                            >
                                Shop Now
                            </Button>
                        </Box>

                        <Box
                            component="img"
                            src={offer.img}
                            alt={offer.title}
                            sx={{
                                height: { xs: 200, md: 350 },
                                width: 'auto',
                                maxHeight: '100%',
                                maxWidth: '100%',
                                objectFit: 'contain',
                                zIndex: 1,
                                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))',
                                display: { xs: 'none', md: 'block' },
                                transform: currentHeroSlide === index ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
                                transition: 'all 0.8s ease-out',
                                opacity: currentHeroSlide === index ? 1 : 0,
                            }}
                        />
                    </Paper>
                ))}

                {/* Carousel Indicators */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 20,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        gap: 1.5,
                        zIndex: 3
                    }}
                >
                    {heroOffers.map((_, index) => (
                        <Box
                            key={index}
                            onClick={() => setCurrentHeroSlide(index)}
                            sx={{
                                width: currentHeroSlide === index ? 32 : 10,
                                height: 10,
                                borderRadius: 5,
                                bgcolor: 'white',
                                opacity: currentHeroSlide === index ? 1 : 0.5,
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                            }}
                        />
                    ))}
                </Box>
            </Box>

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
