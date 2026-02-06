import React from 'react';
import { Box, Typography, Paper, keyframes } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Infinite Scroll Animation
const scrollAnimation = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const categories = [
    {
        id: 1,
        title: "Home Appliances",
        subtitle: "Smart Living",
        image: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?w=600&q=80",
        color: "#636e72"
    },
    {
        id: 2,
        title: "Electronics",
        subtitle: "Future Tech",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80",
        color: "#0984e3"
    },
    {
        id: 3,
        title: "Beauty & Makeup",
        subtitle: "Glow Up",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdd403348?w=600&q=80",
        color: "#d63031"
    },
    {
        id: 4,
        title: "Stationery",
        subtitle: "Creative Space",
        image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600&q=80",
        color: "#6c5ce7"
    },
    {
        id: 5,
        title: "Kitchen",
        subtitle: "Master Chef",
        image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&q=80",
        color: "#e17055"
    },
    {
        id: 6,
        title: "Fitness Gear",
        subtitle: "Stay Fit",
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80",
        color: "#00b894"
    },
    {
        id: 7,
        title: "Watches",
        subtitle: "Timeless Style",
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80",
        color: "#2d3436"
    },
    {
        id: 8,
        title: "Sneakers",
        subtitle: "Street Style",
        image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&q=80",
        color: "#e84393"
    },
    {
        id: 9,
        title: "Toys & Games",
        subtitle: "Fun Time",
        image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&q=80",
        color: "#fdcb6e"
    },
    {
        id: 10,
        title: "Bags & Luggage",
        subtitle: "Travel Light",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
        color: "#B24C63"
    }
];

// Duplicate content for seamless loop
const marqueeItems = [...categories, ...categories];

const ShopByVibe = () => {
    const navigate = useNavigate();

    const handleCategoryClick = (title: string) => {
        // Simple mapping to ensure cleaner URLs or better matching
        let categoryParam = title.toLowerCase();
        if (title === "Home Appliances") categoryParam = "home appliances";
        if (title === "Beauty & Makeup") categoryParam = "makeup";
        if (title === "Bags & Luggage") categoryParam = "bag"; // Singular often triggers partial match better
        if (title === "Toys & Games") categoryParam = "toys";

        navigate(`/category/${categoryParam}`);
    };

    return (
        <Box sx={{ mb: 6, mt: 4, overflow: 'hidden' }}>
            <Box sx={{ px: 2, mb: 3 }}>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 800,
                        background: 'linear-gradient(45deg, #FF9A9E 0%, #FECFEF 99%, #FECFEF 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        width: 'fit-content'
                    }}
                >
                    Trending Categories
                </Typography>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    width: 'max-content',
                    animation: `${scrollAnimation} 60s linear infinite`, // Slower scroll for more items
                    '&:hover': { animationPlayState: 'paused' }
                }}
            >
                {marqueeItems.map((item, index) => (
                    <Box key={`${item.id}-${index}`} sx={{ px: 1.5 }}>
                        <Paper
                            elevation={4}
                            onClick={() => handleCategoryClick(item.title)}
                            sx={{
                                width: '240px', // Fixed Width
                                height: '340px', // Fixed Height for uniformity
                                borderRadius: 6,
                                position: 'relative',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                transition: 'all 0.4s ease',
                                flexShrink: 0,
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                                },
                            }}
                        >
                            {/* Background Image */}
                            <Box
                                component="img"
                                src={item.image}
                                alt={item.title}
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover', // Ensures image fills the fixed dimensions exactly
                                }}
                            />

                            {/* Overlay Gradient */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: `linear-gradient(to top, ${item.color} 0%, transparent 60%)`,
                                    opacity: 0.9
                                }}
                            />

                            {/* Text Content */}
                            <Box sx={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}>
                                <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 700, letterSpacing: 1 }}>
                                    {item.subtitle}
                                </Typography>
                                <Typography variant="h6" sx={{ color: 'white', fontWeight: 800, lineHeight: 1.2 }}>
                                    {item.title}
                                </Typography>
                            </Box>
                        </Paper>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default ShopByVibe;
