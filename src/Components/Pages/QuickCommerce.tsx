import { Box, Container } from '@mui/material';
import Navbar from '../WrapperComponents/Navbar';
import Footer from '../WrapperComponents/Footer';
import QHero from '../SpecifiedComponents/Q-Commerces/Components/QHero';
import QCategories from '../SpecifiedComponents/Q-Commerces/Components/QCategories';

const QuickCommerce = () => {
    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#fff' }}>
            <Navbar />
            <Container maxWidth="lg" sx={{ mt: 3, mb: 5 }}>
                <QHero />
                <QCategories />
                {/* Additional product rows can be added here */}
            </Container>
            <Footer />
        </Box>
    );
};

export default QuickCommerce;
