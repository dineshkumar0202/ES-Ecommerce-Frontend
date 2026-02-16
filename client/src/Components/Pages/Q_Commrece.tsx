import { useRef, useState, useEffect } from 'react';
import { Box, CircularProgress, Container } from '@mui/material';
import Navbar from '../WrapperComponents/Navbar';
import Footer from '../WrapperComponents/Footer';
import QBanner from '../SpecifiedComponents/Q-Commerces/Q-Banner';
import QCategory from '../SpecifiedComponents/Q-Commerces/Q-Category';
import QProduct from '../SpecifiedComponents/Q-Commerces/Q-Product';
import { QProductService } from '../../services/api';

const QCommerce = () => {
    const categoryRef = useRef<HTMLDivElement>(null);
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const scrollToCategories = () => {
        categoryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const { data } = await QProductService.getAll();
                setProducts(data || []);
            } catch (error) {
                console.error("Failed to fetch Q-Commerce products", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAllProducts();
    }, []);

    // Unique distribution: each product appears only once across sections
    // This solves the user's issue of seeing the same product multiple times
    const trendingProducts = products.slice(0, 10); // First 10 items
    const flashProducts = products.slice(10, 20);   // Next 10 items
    const newArrivals = products.slice(20, 30);     // Following 10 items

    return (
        <Box sx={{ bgcolor: '#ffffff', minHeight: '100vh' }}>
            <Navbar />

            <Box sx={{ maxWidth: '1440px', mx: 'auto', px: { xs: 2, md: 4 } }}>
                <QBanner onShopByCategoryClick={scrollToCategories} />

                <Box ref={categoryRef} sx={{ scrollMarginTop: '100px' }}>
                    <QCategory />
                </Box>

                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                        <CircularProgress sx={{ color: '#B4D5DC' }} />
                    </Box>
                ) : (
                    <>
                        {trendingProducts.length > 0 && (
                            <QProduct
                                title="TRENDING NEAR YOU"
                                badge="HOT"
                                viewAllLink="/quick/all"
                                items={trendingProducts}
                            />
                        )}

                        {flashProducts.length > 0 && (
                            <QProduct
                                title="FLASH DEALS"
                                badge="⚡ 2 HRS"
                                viewAllLink="/quick/all"
                                items={flashProducts}
                            />
                        )}

                        {newArrivals.length > 0 && (
                            <QProduct
                                title="NEW ARRIVALS"
                                viewAllLink="/quick/all"
                                items={newArrivals}
                            />
                        )}

                        {products.length === 0 && (
                            <Container sx={{ py: 8, textAlign: 'center' }}>
                                <Box sx={{ color: '#94a3b8', fontWeight: 600 }}>No products available yet.</Box>
                            </Container>
                        )}
                    </>
                )}

                <Footer />
            </Box>
        </Box>
    );
};

export default QCommerce;
