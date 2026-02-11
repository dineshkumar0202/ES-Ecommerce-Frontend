import { useState } from 'react';
import { Box, Container, Snackbar, Alert, Button } from '@mui/material';
import Navbar from '../WrapperComponents/Navbar';
import Footer from '../WrapperComponents/Footer';

import WholesaleFeed from '../SpecifiedComponents/WholeSale/Components/WholesaleFeed';
import WholesaleUploadForm from '../SpecifiedComponents/WholeSale/Components/WholesaleUploadForm';
import BuyerRequestModal from '../SpecifiedComponents/WholeSale/Components/BuyerRequestModal';
import BuyerRequestsFeed from '../SpecifiedComponents/WholeSale/Components/BuyerRequestsFeed';
import WholesaleHeader from '../SpecifiedComponents/WholeSale/Components/WholesaleHeader';
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



    // Reverting to the "Old Type" look: Smaller banner, "Explore Products" button
    // But keeping functionality clean

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
            <Navbar />

            {/* Wholesale Header & Featured Suppliers Slider */}
            <WholesaleHeader />

            <Container maxWidth="xl" sx={{ mt: 0, mb: 8 }}>


                {
                    view === 'feed' ? (
                        <>
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
