import { useState } from 'react';
import { Box, Container, Typography, Snackbar, Alert, Button } from '@mui/material';
import Navbar from '../WrapperComponents/Navbar';
import Footer from '../WrapperComponents/Footer';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import WholesaleFeed from '../SpecifiedComponents/WholeSale/Components/WholesaleFeed';
import WholesaleFilterBar from '../SpecifiedComponents/WholeSale/Components/WholesaleFilterBar';
import WholesaleUploadForm from '../SpecifiedComponents/WholeSale/Components/WholesaleUploadForm';
import CloseIcon from '@mui/icons-material/Close';

const Wholesale = () => {
    const [view, setView] = useState<'feed' | 'upload'>('feed');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [refreshToken, setRefreshToken] = useState(0);

    const handleProductPosted = () => {
        setView('feed');
        setRefreshToken(prev => prev + 1);
        setSnackbarOpen(true);
    };

    const handleCancelUpload = () => {
        setView('feed');
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    // Reverting to the "Old Type" look: Smaller banner, "Explore Products" button
    // But keeping functionality clean

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
            <Navbar />

            <Container maxWidth="xl" sx={{ mt: 4, mb: 8 }}>

                {/* Wholesale Hero Banner - Reverted to "Old Type" Style */}
                <Box sx={{
                    bgcolor: 'black',
                    borderRadius: 4,
                    p: { xs: 3, md: 4 },
                    mb: 4,
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    minHeight: '200px' // Back to 200px
                }}>
                    <Box sx={{ position: 'relative', zIndex: 1, maxWidth: '600px' }}>
                        <Typography variant="overline" sx={{ color: '#bef264', fontWeight: 800, letterSpacing: 2, mb: 0.5, display: 'block' }}>
                            B2B PLATFORM
                        </Typography>
                        <Typography variant="h4" sx={{ color: 'white', fontWeight: 900, mb: 1.5, lineHeight: 1.2 }}>
                            Wholesale Marketplace
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#94a3b8', mb: 3, maxWidth: '450px' }}>
                            Source premium B2B products directly from manufacturers. Enjoy bulk savings up to <Box component="span" sx={{ color: '#bef264', fontWeight: 700 }}>25% off</Box> on industrial gear.
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button
                                variant="contained"
                                size="medium"
                                endIcon={<ArrowForwardIcon />}
                                onClick={() => setView('feed')}
                                sx={{
                                    bgcolor: '#bef264',
                                    color: 'black',
                                    px: 3,
                                    py: 1,
                                    borderRadius: 50,
                                    fontWeight: 700,
                                    textTransform: 'none',
                                    '&:hover': { bgcolor: '#d9f99d' }
                                }}
                            >
                                Explore Products
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={() => setView('upload')}
                                sx={{
                                    color: 'white',
                                    borderColor: 'rgba(255,255,255,0.3)',
                                    px: 3,
                                    py: 1,
                                    borderRadius: 50,
                                    fontWeight: 700,
                                    textTransform: 'none',
                                    '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', borderColor: 'white' }
                                }}
                            >
                                List Your Product
                            </Button>
                        </Box>
                    </Box>

                    {/* Background Graphic (Right Side) */}
                    <Box sx={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        bottom: 0,
                        width: '50%',
                        background: 'radial-gradient(circle at center, rgba(50,50,50,0.5) 0%, rgba(0,0,0,1) 70%), url(https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.8,
                        maskImage: 'linear-gradient(to right, transparent, black 20%)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 40%)'
                    }} />
                </Box>

                {
                    view === 'feed' ? (
                        <>
                            {/* Filter Bar */}
                            <WholesaleFilterBar />

                            {/* Feed */}
                            <WholesaleFeed key={refreshToken} />
                        </>
                    ) : (
                        <Box sx={{ bgcolor: 'white', borderRadius: 2, p: 4 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Button onClick={handleCancelUpload} startIcon={<CloseIcon />} sx={{ color: '#64748b' }}>Back to Feed</Button>
                            </Box>
                            <WholesaleUploadForm onPost={handleProductPosted} />
                        </Box>
                    )
                }
            </Container >

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Product posted successfully!
                </Alert>
            </Snackbar>

            <Footer />
        </Box >
    );
};

export default Wholesale;
