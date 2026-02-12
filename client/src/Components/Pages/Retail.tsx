import { useRef, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../WrapperComponents/Navbar';
import Footer from '../WrapperComponents/Footer';

// Retail Specified Components
import RetailBanner from '../SpecifiedComponents/Retail/RetailBanner';
import RetailCategories from '../SpecifiedComponents/Retail/RetailCategories';
import Products from '../SpecifiedComponents/Retail/Products';

const Retail = () => {
    const productsRef = useRef<HTMLDivElement>(null);
    const [searchParams] = useSearchParams();

    const scrollToProducts = () => {
        productsRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (searchParams.get('search')) {
            scrollToProducts();
        }
    }, [searchParams]);

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'white' }}>
            <Navbar />

            <Container maxWidth="xl" sx={{ mt: 4, mb: 12 }}>
                {/* Hero Section */}
                <RetailBanner />

                {/* Categories Section */}
                <RetailCategories onCategoryClick={scrollToProducts} />

                {/* Featured Products Grid */}
                <Box ref={productsRef} sx={{ scrollMarginTop: '150px' }}>
                    <Products />
                </Box>
            </Container>

            <Footer />
        </Box>
    );
};

export default Retail;
