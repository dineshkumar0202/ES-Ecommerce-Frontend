import { Box, Container } from '@mui/material';
import Navbar from '../WrapperComponents/Navbar';
import Footer from '../WrapperComponents/Footer';

// Retail Specified Components
import RetailBanner from '../SpecifiedComponents/Retail/RetailBanner';
import RetailCategories from '../SpecifiedComponents/Retail/RetailCategories';
import Products from '../SpecifiedComponents/Retail/Products';

const Retail = () => {
    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'white' }}>
            <Navbar />

            <Container maxWidth="xl" sx={{ mt: 4, mb: 12 }}>
                {/* Hero Section */}
                <RetailBanner />

                {/* Categories Section */}
                <RetailCategories />

                {/* Featured Products Grid */}
                <Products />
            </Container>

            <Footer />
        </Box>
    );
};

export default Retail;
