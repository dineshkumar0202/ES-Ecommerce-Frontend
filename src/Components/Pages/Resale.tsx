import React, { useState } from 'react';
import { Box, Container, Typography, Button, Dialog, DialogContent, IconButton, Snackbar, Alert } from '@mui/material';
import Navbar from '../WrapperComponents/Navbar';
import Footer from '../WrapperComponents/Footer';
import ResaleSearch from '../SpecifiedComponents/Second-hand/Components/ResaleSearch';
import ResaleFeed from '../SpecifiedComponents/Second-hand/Components/ResaleFeed';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import WholesaleUploadForm from '../SpecifiedComponents/WholeSale/Components/WholesaleUploadForm';
// Reusing WholesaleUploadForm but adapting it for Resale context via props or direct modification is cleaner.
// For now, I will create a dedicated ResaleUploadForm based on WholesaleUploadForm to avoid mixing contexts too much, 
// or I can reuse it if the fields are identical. The user asked to "convert this uploading to resale", 
// implying the upload functionality should exist on Resale page.
// I will create a new component `ResaleUploadForm` by copying `WholesaleUploadForm` logic but customized for Resale.

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

    const handleOpenUpload = () => {
        setOpenUpload(true);
    };

    const handleCloseUpload = () => {
        setOpenUpload(false);
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#fcfcfc' }}>
            <Navbar />
            <Container maxWidth="xl" sx={{ mt: 3 }}>

                {/* Header with Upload Button */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b' }}>Resale Market</Typography>
                        <Typography variant="body2" color="text.secondary">Buy and sell pre-loved quality items</Typography>
                    </Box>
                    <Button
                        variant="contained"
                        onClick={handleOpenUpload}
                        startIcon={<AddCircleOutlineIcon />}
                        sx={{
                            bgcolor: '#10b981',
                            textTransform: 'none',
                            fontWeight: 700,
                            px: 3,
                            py: 1,
                            borderRadius: 2,
                            boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.1), 0 2px 4px -1px rgba(16, 185, 129, 0.06)',
                            '&:hover': { bgcolor: '#059669' }
                        }}
                    >
                        Sell Item
                    </Button>
                </Box>

                <ResaleSearch />
                <ResaleFeed key={refreshToken} />
            </Container>

            {/* Upload Dialog */}
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
