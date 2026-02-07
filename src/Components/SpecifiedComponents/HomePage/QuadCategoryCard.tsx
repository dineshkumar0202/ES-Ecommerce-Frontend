import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface QuadCategoryItem {
    id: number;
    title: string;
    image: string;
    path?: string;
}

interface QuadCategoryCardProps {
    title: string;
    items: QuadCategoryItem[];
    linkText?: string;
}

const QuadCategoryCard: React.FC<QuadCategoryCardProps> = ({ title, items, linkText = 'See more' }) => {
    const navigate = useNavigate();

    const handleItemClick = (item: QuadCategoryItem) => {
        if (item.path) {
            navigate(item.path);
        } else {
            navigate(`/product/${item.id}`);
        }
    };

    // Simplified Styles - removed custom backgrounds
    const cardBg = 'background.paper';
    const textColor = '#2d3436';
    const subTextColor = '#636e72';
    const linkColor = '#007185';

    return (
        <Paper
            elevation={0}
            sx={{
                p: { xs: 2, md: 3 },
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: cardBg, // Changed from background to bgcolor
                borderRadius: 4,
                transition: 'transform 0.3s ease',
                border: '1px solid #eaeded',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.05)'
                }
            }}
        >
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, fontSize: '1.4rem', color: textColor, letterSpacing: 0.5 }}>
                {title}
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, flexGrow: 1 }}>
                {items.slice(0, 4).map((item) => (
                    <Box
                        key={item.id}
                        onClick={() => handleItemClick(item)}
                        sx={{
                            width: 'calc(50% - 8px)',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                        }}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                aspectRatio: '1/1',
                                mb: 1,
                                borderRadius: 2,
                                overflow: 'hidden',
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                }
                            }}
                        >
                            <Box
                                component="img"
                                src={item.image}
                                alt={item.title}
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </Box>
                        <Typography
                            variant="caption"
                            sx={{
                                fontSize: '0.85rem',
                                lineHeight: 1.2,
                                display: 'block',
                                color: subTextColor,
                                fontWeight: 500,
                                textAlign: 'left',
                            }}
                        >
                            {item.title}
                        </Typography>
                    </Box>
                ))}
            </Box>

            <Box
                component="span"
                onClick={() => {
                    if (title === "Keep shopping for") {
                        navigate('/products/keep-shopping');
                    } else if (title === "Shop by Category") {
                        navigate('/products/categories');
                    }
                }}
                sx={{
                    mt: 3,
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    color: linkColor,
                    cursor: 'pointer',
                    display: 'inline-block',
                    transition: 'all 0.2s',
                    '&:hover': {
                        textDecoration: 'none',
                        transform: 'translateX(4px)',
                        filter: 'brightness(1.2)'
                    }
                }}
            >
                {linkText} →
            </Box>
        </Paper>
    );
};

export default QuadCategoryCard;
