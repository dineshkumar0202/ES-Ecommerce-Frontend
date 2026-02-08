import { Box, Typography } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';

const FreelancerHeroBanner = () => {
    return (
        <Box sx={{
            bgcolor: 'black',
            borderRadius: 4,
            p: { xs: 3, md: 5 },
            mb: 4,
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            minHeight: '180px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }}>
            {/* Grid Pattern Background Overlay */}
            <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.1,
                backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                backgroundSize: '20px 20px'
            }} />

            <Box sx={{ position: 'relative', zIndex: 1, maxWidth: '500px' }}>
                <Box sx={{
                    bgcolor: '#3b82f6',
                    color: 'white',
                    py: 0.5,
                    px: 1.5,
                    borderRadius: 50,
                    display: 'inline-block',
                    mb: 2,
                    boxShadow: '0 0 10px rgba(59, 130, 246, 0.3)'
                }}>
                    <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: 0.5 }}>
                        HIRE THE BEST
                    </Typography>
                </Box>
                <Typography variant="h3" sx={{ color: 'white', fontWeight: 900, mb: 1, lineHeight: 1.1 }}>
                    Expert talent at your <Box component="span" sx={{ color: '#3b82f6' }}>fingertips.</Box>
                </Typography>
                <Typography variant="body1" sx={{ color: '#94a3b8', maxWidth: '350px' }}>
                    Zero platform fees for your first 3 hires.
                </Typography>
            </Box>

            {/* Right Graphic - Stylized Icon */}
            <Box sx={{
                position: 'absolute',
                right: { xs: -20, md: 40 },
                top: '50%',
                transform: 'translateY(-50%)',
                width: 120,
                height: 120,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px dashed #3b82f6',
                borderRadius: '50%',
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)'
            }}>
                <Box sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    animation: 'pulse 2s infinite',
                    '@keyframes pulse': {
                        '0%': { transform: 'scale(1)', opacity: 0.5 },
                        '100%': { transform: 'scale(1.2)', opacity: 0 }
                    }
                }} />
                <GroupsIcon sx={{ fontSize: 48, color: '#3b82f6' }} />
            </Box>
        </Box>
    );
};

export default FreelancerHeroBanner;
