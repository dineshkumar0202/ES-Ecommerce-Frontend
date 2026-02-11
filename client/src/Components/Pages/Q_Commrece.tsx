import { Box } from '@mui/material';
import Navbar from '../WrapperComponents/Navbar';
import Footer from '../WrapperComponents/Footer';
import QBanner from '../SpecifiedComponents/Q-Commerces/Q-Banner';
import QCategory from '../SpecifiedComponents/Q-Commerces/Q-Category';
import QProduct from '../SpecifiedComponents/Q-Commerces/Q-Procduct';

const QCommerce = () => {
    return (
        <Box sx={{ bgcolor: '#ffffff', minHeight: '100vh' }}>
            <Navbar />

            <QBanner />

            <QCategory />

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
    );
};

export default QCommerce;
