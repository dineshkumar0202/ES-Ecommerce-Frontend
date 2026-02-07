import { useState } from 'react';
import { Box, Container, Typography, Dialog, DialogContent, IconButton, Snackbar, Alert, Button, Paper, InputBase } from '@mui/material';
import Navbar from '../WrapperComponents/Navbar';
import Footer from '../WrapperComponents/Footer';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SearchIcon from '@mui/icons-material/Search';

import WholesaleFeed from '../SpecifiedComponents/WholeSale/Components/WholesaleFeed';
import WholesaleFilterBar from '../SpecifiedComponents/WholeSale/Components/WholesaleFilterBar';
import WholesaleUploadForm from '../SpecifiedComponents/WholeSale/Components/WholesaleUploadForm';
import CloseIcon from '@mui/icons-material/Close';

const Wholesale = () => {
    const [openUpload, setOpenUpload] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [refreshToken, setRefreshToken] = useState(0);
    const [searchQuery, setSearchQuery] = useState(''); // Added search state

    const handleProductPosted = () => {
        setOpenUpload(false);
        setRefreshToken(prev => prev + 1);
        setSnackbarOpen(true);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleCloseUpload = () => {
        setOpenUpload(false);
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
                        <Button
                            variant="contained"
                            size="medium"
                            endIcon={<ArrowForwardIcon />}
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

                {/* Filter Bar */}
                <WholesaleFilterBar />

                {/* Feed */}
                <WholesaleFeed key={refreshToken} />
            </Container>

            <Dialog
                open={openUpload}
                onClose={handleCloseUpload}
                maxWidth="md"
                fullWidth
            >
                <Box sx={{ position: 'relative' }}>
                    <IconButton
                        onClick={handleCloseUpload}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                            zIndex: 1
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent sx={{ p: 0 }}>
                        <WholesaleUploadForm onPost={handleProductPosted} />
                    </DialogContent>
                </Box>
            </Dialog>

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
        </Box>
    );
};

export default Wholesale;
