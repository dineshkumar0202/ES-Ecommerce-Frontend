import { useRef } from 'react';
import { Box } from '@mui/material';
import Navbar from '../WrapperComponents/Navbar';
import Footer from '../WrapperComponents/Footer';
import QBanner from '../SpecifiedComponents/Q-Commerces/Q-Banner';
import QCategory from '../SpecifiedComponents/Q-Commerces/Q-Category';
import QProduct from '../SpecifiedComponents/Q-Commerces/Q-Procduct';

const QCommerce = () => {
    const categoryRef = useRef<HTMLDivElement>(null);

    const scrollToCategories = () => {
        categoryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <Box sx={{ bgcolor: '#ffffff', minHeight: '100vh' }}>
            <Navbar />

            <Box sx={{ maxWidth: '1440px', mx: 'auto', px: { xs: 2, md: 4 } }}>
                <QBanner onShopByCategoryClick={scrollToCategories} />

                <Box ref={categoryRef} sx={{ scrollMarginTop: '100px' }}>
                    <QCategory />
                </Box>

                <QProduct
                    title="TRENDING NEAR YOU"
                    badge="HOT"
                    viewAllLink="/quick/all"
                />

                <QProduct
                    title="FLASH DEALS"
                    badge="⚡ 2 HRS"
                    viewAllLink="/quick/all"
                />

                <QProduct
                    title="NEW ARRIVALS"
                    viewAllLink="/quick/all"
                />

                <Footer />
            </Box>
        </Box>
    );
};

export default QCommerce;
