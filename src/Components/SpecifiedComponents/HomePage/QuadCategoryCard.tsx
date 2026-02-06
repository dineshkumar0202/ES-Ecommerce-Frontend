import React from 'react';
import { Paper, Typography, Box, Link } from '@mui/material';

interface QuadCategoryItem {
    id: number;
    title: string;
    image: string;
}

interface QuadCategoryCardProps {
    title: string;
    items: QuadCategoryItem[];
    linkText?: string;
}

const QuadCategoryCard: React.FC<QuadCategoryCardProps> = ({ title, items, linkText = 'See more' }) => {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'background.paper',
                borderRadius: 1, // boxy look like amazon
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, fontSize: '1.2rem' }}>
                {title}
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, flexGrow: 1 }}>
                {items.slice(0, 4).map((item) => (
                    <Box key={item.id} sx={{ width: 'calc(50% - 8px)', cursor: 'pointer' }}>
                        <Box
                            component="img"
                            src={item.image}
                            alt={item.title}
                            sx={{
                                width: '100%',
                                aspectRatio: '1/1',
                                objectFit: 'cover',
                                mb: 0.5,
                                borderRadius: 0.5,
                            }}
                        />
                        <Typography variant="caption" sx={{ fontSize: '0.75rem', lineHeight: 1.2, display: 'block' }}>
                            {item.title}
                        </Typography>
                    </Box>
                ))}
            </Box>

            <Link href="#" sx={{ mt: 2, textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500, color: '#007185' }}>
                {linkText}
            </Link>
        </Paper>
    );
};

export default QuadCategoryCard;
