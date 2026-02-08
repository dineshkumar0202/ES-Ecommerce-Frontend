import { useState } from 'react';
import { Box, Container, Typography, Snackbar, Alert, Button } from '@mui/material';
import Navbar from '../WrapperComponents/Navbar';
import Footer from '../WrapperComponents/Footer';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

import WholesaleFeed from '../SpecifiedComponents/WholeSale/Components/WholesaleFeed';
import WholesaleFilterBar from '../SpecifiedComponents/WholeSale/Components/WholesaleFilterBar';
import WholesaleUploadForm from '../SpecifiedComponents/WholeSale/Components/WholesaleUploadForm';
import BuyerRequestModal from '../SpecifiedComponents/WholeSale/Components/BuyerRequestModal';
import BuyerRequestsFeed from '../SpecifiedComponents/WholeSale/Components/BuyerRequestsFeed';
import CloseIcon from '@mui/icons-material/Close';

const Wholesale = () => {
    const [view, setView] = useState<'feed' | 'upload' | 'requests'>('feed');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [refreshToken, setRefreshToken] = useState(0);
    const [openRequestDialog, setOpenRequestDialog] = useState(false);

    const handleProductPosted = () => {
        setView('feed');
        setRefreshToken(prev => prev + 1);
        setSnackbarOpen(true);
    };

    const handleRequestSubmit = (request: any) => {
        const existingRequests = JSON.parse(localStorage.getItem('wholesale_requests') || '[]');
        localStorage.setItem('wholesale_requests', JSON.stringify([...existingRequests, request]));
        setRefreshToken(prev => prev + 1);
        setSnackbarOpen(true);
        // If needed, switch to requests view or just notify
        if (localStorage.getItem('userRole') === 'Seller') {
            setView('requests');
        }
    };

    const handleCancelUpload = () => {
        setView('feed');
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const userRole = localStorage.getItem('userRole');

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
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
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

                            {userRole === 'Seller' ? (
                                <>
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
                                    <Button
                                        variant="text"
                                        onClick={() => setView('requests')}
                                        startIcon={<AssignmentIcon />}
                                        sx={{ color: '#e2e8f0', textTransform: 'none', fontWeight: 600 }}
                                    >
                                        View Requests
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    variant="outlined"
                                    onClick={() => setOpenRequestDialog(true)}
                                    startIcon={<AutoAwesomeIcon />}
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
                                    AI Request & Post
                                </Button>
                            )}
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
                    ) : view === 'upload' ? (
                        <Box sx={{ bgcolor: 'white', borderRadius: 2, p: 4 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Button onClick={handleCancelUpload} startIcon={<CloseIcon />} sx={{ color: '#64748b' }}>Back to Feed</Button>
                            </Box>
                            <WholesaleUploadForm onPost={handleProductPosted} />
                        </Box>
                    ) : (
                        // Requests Feed View
                        <Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Button onClick={() => setView('feed')} startIcon={<CloseIcon />} sx={{ color: '#64748b' }}>Back to Feed</Button>
                            </Box>
                            <BuyerRequestsFeed key={refreshToken} />
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
                    Request posted successfully!
                </Alert>
            </Snackbar>

            <BuyerRequestModal
                open={openRequestDialog}
                onClose={() => setOpenRequestDialog(false)}
                onSubmit={handleRequestSubmit}
            />
            <Footer />
        </Box >
    );
};

export default Wholesale;
