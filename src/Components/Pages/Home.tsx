import { Box, Container, Stack } from '@mui/material';
import Navbar from '../WrapperComponents/Navbar';
import Footer from '../WrapperComponents/Footer';
import HeroBanner from '../SpecifiedComponents/HomePage/HeroBanner';
import SimpleBanner from '../SpecifiedComponents/HomePage/SimpleBanner';
import QuadCategoryCard from '../SpecifiedComponents/HomePage/QuadCategoryCard';
import ProductGrids from '../SpecifiedComponents/HomePage/ProductGrids';

const Home = () => {
    const gamingItems = [
        { id: 1, title: 'Headsets', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
        { id: 2, title: 'Keyboards', image: 'https://images.unsplash.com/photo-1587829741301-dc798b91a91e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
        { id: 3, title: 'Mice', image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
        { id: 4, title: 'Chairs', image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    ];

    const categoryItems = [
        { id: 1, title: 'Electronics', image: 'https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
        { id: 2, title: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
        { id: 3, title: 'Home', image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
        { id: 4, title: 'Beauty', image: 'https://images.unsplash.com/photo-1596462502278-27bfdd403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    ];

    return (
        <Box sx={{ minHeight: '100vh', pb: 4, bgcolor: '#eaeded' }}>
            <Navbar />

            <Container maxWidth="xl" sx={{ mt: 3 }}>
                <Stack spacing={3}>
                    <HeroBanner />

                    <SimpleBanner text="Spl Day Offers" bgColor="#ffecb3" textColor="#8d6e63" />

                    <SimpleBanner text="Spl Offers" bgColor="#c8e6c9" textColor="#2e7d32" />

                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                        <Box sx={{ flex: 1 }}>
                            <QuadCategoryCard title="Keep shopping for" items={gamingItems} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <QuadCategoryCard title="Shop by Category" items={categoryItems} />
                        </Box>
                    </Box>

                    <ProductGrids />
                </Stack>
            </Container>

            <Footer />
        </Box>
    );
};

export default Home;
