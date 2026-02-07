import { Box, Container, Stack } from '@mui/material';
import Navbar from '../WrapperComponents/Navbar';
import Footer from '../WrapperComponents/Footer';
import QuadCategoryCard from '../SpecifiedComponents/HomePage/QuadCategoryCard';
import ProductGrids from '../SpecifiedComponents/HomePage/ProductGrids';
import SpecialOffersSection from '../SpecifiedComponents/HomePage/SpecialOffersSection';
import ImpressiveOfferGrid from '../SpecifiedComponents/HomePage/ImpressiveOfferGrid';
import ShopByVibe from '../SpecifiedComponents/HomePage/ShopByVibe';
import ServiceFeatures from '../SpecifiedComponents/HomePage/ServiceFeatures';
import NewsletterSection from '../SpecifiedComponents/HomePage/NewsletterSection';
import TrustedBrands from '../SpecifiedComponents/HomePage/TrustedBrands';
import PlatformShowcase from '../SpecifiedComponents/HomePage/PlatformShowcase';
import { allProducts } from '../../data/productsData';

const Home = () => {

    // Get real products for "Keep shopping for" section (unique products with working images)
    const gamingItems = [
        { id: 15, title: allProducts[14]?.name || 'Headphones', image: allProducts[14]?.image || '' },  // Sony Headphones
        { id: 3, title: allProducts[2]?.name || 'Dress', image: allProducts[2]?.image || '' },          // Floral Dress
        { id: 5, title: allProducts[4]?.name || 'Watch', image: allProducts[4]?.image || '' },          // Apple Watch
        { id: 1, title: allProducts[0]?.name || 'Mobile', image: allProducts[0]?.image || '' },         // iPhone
    ];

    const categoryItems = [
        { id: 1, title: 'Electronics', image: 'https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', path: '/category/electronics' },
        { id: 2, title: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', path: '/category/fashion' },
        { id: 3, title: 'Home', image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', path: '/category/home' },
        { id: 4, title: 'Fruits & Veg', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=400&q=80', path: '/category/fruits-veg' },
    ];

    return (
        <Box sx={{ minHeight: '100vh', pb: 4, bgcolor: '#f8fafc' }}>
            <Navbar />

            <Container maxWidth="xl" sx={{ mt: 2 }}>
                <Stack spacing={2}>
                    <SpecialOffersSection />

                    <PlatformShowcase />

                    {/* Exclusive Impressive Grid Section */}
                    <ImpressiveOfferGrid />

                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                        <Box sx={{ flex: 1 }}>
                            <QuadCategoryCard title="Keep shopping for" items={gamingItems} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <QuadCategoryCard title="Shop by Category" items={categoryItems} />
                        </Box>
                    </Box>

                    {/* Vibe Explorer Section - Auto Scrolling Marquee */}
                    <ShopByVibe />

                    <ProductGrids />
                </Stack>
            </Container>

            <TrustedBrands />
            <NewsletterSection />
            <ServiceFeatures />
            <Footer />
        </Box>
    );
};

export default Home;
