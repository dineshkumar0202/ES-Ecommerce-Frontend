import { Box, Container } from '@mui/material';
import Navbar from '../WrapperComponents/Navbar';
import Footer from '../WrapperComponents/Footer';
import ResaleSearch from '../SpecifiedComponents/Second-hand/Components/ResaleSearch';
import ResaleFeed from '../SpecifiedComponents/Second-hand/Components/ResaleFeed';

const Resale = () => {
    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#fcfcfc' }}>
            <Navbar />
            <Container maxWidth="xl" sx={{ mt: 3 }}>
                <ResaleSearch />
                <ResaleFeed />
            </Container>
            <Footer />
        </Box>
    );
};

export default Resale;
