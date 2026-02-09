import { useState } from 'react';
import { Box, Container, Dialog, DialogContent, IconButton, Snackbar, Alert, Button } from '@mui/material';
import Navbar from '../WrapperComponents/Navbar';
import Footer from '../WrapperComponents/Footer';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

// Imported SH Components
import SHCategories from '../SpecifiedComponents/Second-hand/Components/SHCategories';
import SHHero from '../SpecifiedComponents/Second-hand/Components/SHHero';
import SHPromoStrip from '../SpecifiedComponents/Second-hand/Components/SHPromoStrip';
import SHRecentlyListed from '../SpecifiedComponents/Second-hand/Components/SHRecentlyListed';
import ResaleUploadForm from '../SpecifiedComponents/Second-hand/Components/ResaleUploadForm';

const Resale = () => {
    const [openUpload, setOpenUpload] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [refreshToken, setRefreshToken] = useState(0);

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

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'white' }}>
            <Navbar />

            <Container maxWidth="xl" sx={{ mt: 4, position: 'relative' }}>
                <SHCategories />
                <SHHero />
                <SHPromoStrip />

                {/* Sell Button - OLX Style */}
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<AddIcon />}
                        onClick={() => setOpenUpload(true)}
                        sx={{
                            borderRadius: 50,
                            px: 4,
                            py: 1.5,
                            fontWeight: 800,
                            background: 'linear-gradient(45deg, #84cc16 30%, #a3e635 90%)', // Lemon Green Gradient
                            color: '#1a2e05', // Dark green text for contrast
                            boxShadow: '0 4px 20px rgba(132, 204, 22, 0.4)',
                            border: '4px solid white',
                            fontSize: '1.1rem',
                            textTransform: 'none',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 8px 25px rgba(132, 204, 22, 0.5)',
                            }
                        }}
                    >
                        SELL YOUR ITEM
                    </Button>
                </Box>

                <SHRecentlyListed key={refreshToken} />
            </Container>

            {/* Hidden functionality for now or triggered elsewhere if needed, kept for data integrity */}
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
                        <ResaleUploadForm onPost={handleProductPosted} />
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
                    Item listed for sale successfully!
                </Alert>
            </Snackbar>

            <Footer />
        </Box>
    );
};

export default Resale;

