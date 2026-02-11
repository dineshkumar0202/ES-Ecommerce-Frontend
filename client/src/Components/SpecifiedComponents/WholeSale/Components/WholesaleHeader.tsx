import { useState, useEffect, useRef } from 'react';
import { Box, Container, Stack, Typography, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const suppliers = [
    {
        id: 1,
        title: "Industrial Craft Collective",
        tag: "ESTABLISHED 1994",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: 2,
        title: "The Atelier Studio",
        tag: "LUXE TEXTILES",
        image: "https://images.unsplash.com/photo-1558444448-6015f502ec70?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: 3,
        title: "Global Logistics Ops",
        tag: "SUPPLY CHAIN",
        image: "https://images.unsplash.com/photo-1494412574743-01947f15b6b4?auto=format&fit=crop&w=1200&q=80",
    }
];

const WholesaleHeader = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current);
        }
    };

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = window.setTimeout(
            () => setCurrentIndex((prevIndex) => (prevIndex === suppliers.length - 1 ? 0 : prevIndex + 1)),
            5000
        );

        return () => {
            resetTimeout();
        };
    }, [currentIndex]);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === suppliers.length - 1 ? 0 : prevIndex + 1));
    };

    const handleBack = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? suppliers.length - 1 : prevIndex - 1));
    };

    return (
        <Box sx={{ bgcolor: 'white', pt: 4, pb: 8 }}>
            <Container maxWidth="xl">
                {/* Header Section */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontFamily: 'serif',
                            fontStyle: 'italic',
                            fontWeight: 400,
                            color: '#1a1a1a'
                        }}
                    >
                        Featured Suppliers
                    </Typography>

                    <Stack direction="row" spacing={1.5}>
                        <IconButton
                            onClick={handleBack}
                            sx={{
                                border: '1px solid #e0e0e0',
                                p: 1.5,
                                '&:hover': { bgcolor: '#f5f5f5' }
                            }}
                        >
                            <ArrowBackIosNewIcon sx={{ fontSize: 18, color: '#1a1a1a' }} />
                        </IconButton>
                        <IconButton
                            onClick={handleNext}
                            sx={{
                                border: '1px solid #e0e0e0',
                                p: 1.5,
                                '&:hover': { bgcolor: '#f5f5f5' }
                            }}
                        >
                            <ArrowForwardIosIcon sx={{ fontSize: 18, color: '#1a1a1a' }} />
                        </IconButton>
                    </Stack>
                </Stack>

                {/* Slider Component */}
                <Box sx={{ overflow: 'hidden', position: 'relative', borderRadius: 0 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                            transform: `translateX(-${currentIndex * 100}%)`,
                            gap: 0
                        }}
                    >
                        {suppliers.map((supplier) => (
                            <Box
                                key={supplier.id}
                                sx={{
                                    minWidth: '100%',
                                    height: { xs: '300px', md: '450px' },
                                    position: 'relative',
                                    pr: { md: 2 } // Small gap for visual separation if needed, but the image shows full width
                                }}
                            >
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        bgcolor: '#f5f5f5',
                                        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url(${supplier.image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-end',
                                        p: { xs: 4, md: 6 },
                                        color: 'white'
                                    }}
                                >
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            letterSpacing: 3,
                                            fontWeight: 700,
                                            mb: 1,
                                            opacity: 0.8,
                                            textTransform: 'uppercase',
                                            fontSize: '0.75rem'
                                        }}
                                    >
                                        {supplier.tag}
                                    </Typography>
                                    <Typography
                                        variant="h2"
                                        sx={{
                                            fontFamily: 'serif',
                                            fontWeight: 400,
                                            maxWidth: '800px',
                                            lineHeight: 1.1,
                                            fontSize: { xs: '2.5rem', md: '4rem' }
                                        }}
                                    >
                                        {supplier.title}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Container>

            {/* Narrow Category Bar (Old Content Integrated) */}
            <Box sx={{ bgcolor: '#000000', color: 'white', py: 1.5, mt: 4 }}>
                <Container maxWidth="xl">
                    <Stack direction="row" spacing={3} alignItems="center" sx={{ overflowX: 'auto', whiteSpace: 'nowrap', '&::-webkit-scrollbar': { display: 'none' } }}>
                        <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer', transition: 'opacity 0.2s', '&:hover': { opacity: 1 } }}>Industrial Machinery</Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer', transition: 'opacity 0.2s', '&:hover': { opacity: 1 } }}>Electronics & Electrical</Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer', transition: 'opacity 0.2s', '&:hover': { opacity: 1 } }}>Construction & Material</Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer', transition: 'opacity 0.2s', '&:hover': { opacity: 1 } }}>Packaging Machines</Typography>
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
};

export default WholesaleHeader;
