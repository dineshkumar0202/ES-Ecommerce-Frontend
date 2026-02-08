import { Box, Container } from '@mui/material';
import Navbar from '../WrapperComponents/Navbar';
import Footer from '../WrapperComponents/Footer';
import QCategories from '../SpecifiedComponents/Q-Commerces/Components/QCategories';
import QFlashDeals from '../SpecifiedComponents/Q-Commerces/Components/QFlashDeals';
import QProductFeed from '../SpecifiedComponents/Q-Commerces/Components/QProductFeed';
import QEssentials from '../SpecifiedComponents/Q-Commerces/Components/QEssentials';
import QHeroBanner from '../SpecifiedComponents/Q-Commerces/Components/QHeroBanner';

const QuickCommerce = () => {
    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
            <Navbar />
            <Container maxWidth="xl" sx={{ mt: 4, mb: 8 }}>
                <QHeroBanner />
                <QCategories />
                <QFlashDeals />
                <QProductFeed />
                <QEssentials />
            </Container>
            <Footer />
        </Box>
    );
};

export default QuickCommerce;
