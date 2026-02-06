import React from 'react';
import { Box, Typography } from '@mui/material';

interface SimpleBannerProps {
    text: string;
    bgColor?: string;
    textColor?: string;
}

const SimpleBanner: React.FC<SimpleBannerProps> = ({ text, bgColor = '#f0f2f5', textColor = '#333' }) => {
    return (
        <Box
            sx={{
                width: '100%',
                py: 2,
                px: 3,
                bgcolor: bgColor,
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                my: 2,
                border: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: textColor, textTransform: 'uppercase', letterSpacing: 1 }}>
                {text}
            </Typography>
        </Box>
    );
};

export default SimpleBanner;
