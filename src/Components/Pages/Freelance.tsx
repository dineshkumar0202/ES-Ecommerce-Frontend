import { Box, Container, Typography } from '@mui/material';
import Navbar from '../WrapperComponents/Navbar';
import Footer from '../WrapperComponents/Footer';

const Freelance = () => {
    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#fcfcfc' }}>
            <Navbar />
            <Container maxWidth="xl" sx={{ mt: 3 }}>
                <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
                    Freelance Marketplace
                </Typography>
                <Typography variant="body1">
                    Hire Verified Professionals
                </Typography>
                {/* Content will go here */}
            </Container>
            <Footer />
        </Box>
    );
};

export default Freelance;
