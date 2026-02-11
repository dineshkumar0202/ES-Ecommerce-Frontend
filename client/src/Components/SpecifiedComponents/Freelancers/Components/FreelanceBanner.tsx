import { Box, Typography, Paper, Stack, Button } from '@mui/material';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import DiamondIcon from '@mui/icons-material/Diamond';

const FreelanceBanner = () => {
    return (
        <Paper
            elevation={0}
            sx={{
                bgcolor: '#adc9d1', // Light teal from design
                borderRadius: 8,
                p: { xs: 4, md: 6 },
                mb: 6,
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                gap: 4,
                width: '100%'
            }}
        >
            <Box sx={{ flex: 1, zIndex: 2 }}>
                <Box sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    bgcolor: 'black',
                    color: 'white',
                    px: 2,
                    py: 0.8,
                    borderRadius: 50,
                    mb: 3
                }}>
                    <ElectricBoltIcon sx={{ fontSize: 14, mr: 1, color: '#adc9d1' }} />
                    <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: 1 }}>
                        NEW SUBSCRIPTION PLANS
                    </Typography>
                </Box>

                <Typography variant="h2" sx={{
                    fontWeight: 900,
                    color: '#0f172a',
                    mb: 2,
                    lineHeight: 1.1,
                    fontSize: { xs: '2.5rem', md: '3.5rem' }
                }}>
                    Unlock Premium <br /> Features AI Generations
                </Typography>

                <Typography variant="body1" sx={{ color: '#475569', mb: 4, maxWidth: 500, lineHeight: 1.6, fontWeight: 500 }}>
                    Get access to unlimited AI generations, priority client matching, and advanced portfolio analytics to scale your freelance business.
                </Typography>

                <Stack direction="row" spacing={2}>
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: 'black',
                            color: 'white',
                            px: 4,
                            py: 1.8,
                            borderRadius: 3,
                            fontWeight: 800,
                            textTransform: 'none',
                            '&:hover': { bgcolor: '#1e293b' }
                        }}
                    >
                        Upgrade Now
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: 'rgba(255,255,255,0.3)',
                            color: '#0f172a',
                            px: 4,
                            py: 1.8,
                            borderRadius: 3,
                            fontWeight: 800,
                            textTransform: 'none',
                            boxShadow: 'none',
                            backdropFilter: 'blur(10px)',
                            '&:hover': { bgcolor: 'rgba(255,255,255,0.4)', boxShadow: 'none' }
                        }}
                    >
                        View Features
                    </Button>
                </Stack>
            </Box>

            {/* Floating Icon Box (3D effect) */}
            <Box sx={{
                position: 'relative',
                width: { xs: 200, md: 280 },
                height: { xs: 200, md: 280 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Box sx={{
                    width: '80%',
                    height: '80%',
                    bgcolor: 'rgba(255,255,255,0.4)',
                    borderRadius: 6,
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gridTemplateRows: '1fr 1fr',
                    gap: 1.5,
                    p: 2,
                    transform: 'rotate(-10deg) skew(5deg)',
                    boxShadow: '20px 20px 60px rgba(0,0,0,0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.5)'
                }}>
                    <Box sx={{ bgcolor: 'black', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}><RocketLaunchIcon /></Box>
                    <Box sx={{ bgcolor: 'white', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black' }}><ElectricBoltIcon /></Box>
                    <Box sx={{ bgcolor: 'white', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black' }}><StarOutlineIcon /></Box>
                    <Box sx={{ bgcolor: 'black', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#adc9d1' }}><DiamondIcon /></Box>
                </Box>
            </Box>
        </Paper>
    );
};

export default FreelanceBanner;
