import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Card, CardContent, CardMedia, Button, Stack, Chip, IconButton } from '@mui/material';
import Navbar from '../WrapperComponents/Navbar';
import Footer from '../WrapperComponents/Footer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import { allProducts } from '../../data/productsData';

// Helper to get products (mocking Q-Commerce specific logic)
const getQProducts = (category: string) => {
    // For 'fruits-veg', return the specific items we added (101-104)
    if (category === 'fruits-veg' || category === 'fruits & veg') {
        const specificIds = [101, 102, 103, 104];
        return allProducts.filter(p => specificIds.includes(p.id));
    }

    // Dynamic mock generation for other Q-Commerce categories to ensure consistent 4-item grid
    const categoryMocks: Record<string, any[]> = {
        'bakery': [
            { id: 201, name: "Fresh Sourdough Bread", brand: "Bakery Fresh", price: 120, mrp: 150, image: "https://images.unsplash.com/photo-1585478259506-8e159d6eb39d?auto=format&fit=crop&w=400&q=80", discount: 20 },
            { id: 202, name: "Chocolate Croissants (4pcs)", brand: "Bakery Fresh", price: 240, mrp: 300, image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80", discount: 20 },
            { id: 203, name: "Whole Wheat Buns", brand: "Healthy Bake", price: 60, mrp: 80, image: "https://images.unsplash.com/photo-1623334044303-241021148842?auto=format&fit=crop&w=400&q=80", discount: 25 },
            { id: 204, name: "Blueberry Muffin Box", brand: "Sweet Treats", price: 180, mrp: 220, image: "https://images.unsplash.com/photo-1558401391-7899b4bd5bbf?auto=format&fit=crop&w=400&q=80", discount: 15 }
        ],
        'pharmacy': [
            { id: 301, name: "Digital Thermometer", brand: "HealthSense", price: 299, mrp: 499, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80", discount: 40 },
            { id: 302, name: "Multivitamin Tablets (60s)", brand: "NutriLife", price: 599, mrp: 899, image: "https://images.unsplash.com/photo-1584362917165-526a968f79ff?auto=format&fit=crop&w=400&q=80", discount: 33 },
            { id: 303, name: "First Aid Kit - Compact", brand: "SafetyFirst", price: 450, mrp: 600, image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=400&q=80", discount: 25 },
            { id: 304, name: "N95 Protective Masks (Pack of 5)", brand: "MedGuard", price: 199, mrp: 399, image: "https://images.unsplash.com/photo-1585776245991-cf79dd8fc1f3?auto=format&fit=crop&w=400&q=80", discount: 50 }
        ],
        'meat-fish': [
            { id: 401, name: "Fresh Chicken Breast (500g)", brand: "Farm Fresh", price: 280, mrp: 350, image: "https://images.unsplash.com/photo-1604503468506-a8da13d82725?auto=format&fit=crop&w=400&q=80", discount: 20 },
            { id: 402, name: "Premium Salmon Fillet", brand: "Sea Catch", price: 850, mrp: 1200, image: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=400&q=80", discount: 30 },
            { id: 403, name: "Lamb Curry Cut (500g)", brand: "Meat Masters", price: 650, mrp: 800, image: "https://images.unsplash.com/photo-1603360946369-dc9bb6f54262?auto=format&fit=crop&w=400&q=80", discount: 15 },
            { id: 404, name: "Fresh Prawns (Cleaned)", brand: "Sea Catch", price: 450, mrp: 600, image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=400&q=80", discount: 25 }
        ],
        'dairy-eggs': [
            { id: 501, name: "Full Cream Milk (1L)", brand: "Farm Fresh", price: 75, mrp: 85, image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80", discount: 10 },
            { id: 502, name: "Free Range Eggs (Pack of 6)", brand: "Happy Hens", price: 90, mrp: 120, image: "https://images.unsplash.com/photo-1569254994521-dd684b67fa9d?auto=format&fit=crop&w=400&q=80", discount: 25 },
            { id: 503, name: "Greek Yogurt (Set of 2)", brand: "Dairy Pure", price: 150, mrp: 200, image: "https://images.unsplash.com/photo-1584286595398-a59f21d313f5?auto=format&fit=crop&w=400&q=80", discount: 25 },
            { id: 504, name: "Salted Butter Block (500g)", brand: "Dairy Pure", price: 280, mrp: 320, image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=400&q=80", discount: 12 }
        ],
        'snacks': [
            { id: 601, name: "Potato Chips - Classic Salted", brand: "Crunchies", price: 40, mrp: 50, image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=400&q=80", discount: 20 },
            { id: 602, name: "Mixed Nuts Pack (200g)", brand: "Nature's Best", price: 350, mrp: 500, image: "https://images.unsplash.com/photo-1606756672323-af3c3ec52bf8?auto=format&fit=crop&w=400&q=80", discount: 30 },
            { id: 603, name: "Dark Chocolate Bar", brand: "Cocoa Luxe", price: 150, mrp: 200, image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=400&q=80", discount: 25 },
            { id: 604, name: "Popcorn - Butter Lovers", brand: "Movie Night", price: 85, mrp: 120, image: "https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=400&q=80", discount: 30 }
        ]
    };

    if (categoryMocks[category]) {
        return categoryMocks[category];
    }

    // Fallback logic for other categories (mock)
    return allProducts.slice(0, 4);
};

const QCategoryPage = () => {
    const { categoryName } = useParams<{ categoryName: string }>();
    const navigate = useNavigate();

    const term = categoryName?.toLowerCase() || '';
    const products = getQProducts(term);

    // Title mapping
    const titleMap: Record<string, string> = {
        'fruits-veg': 'Fresh Fruits & Vegetables',
        'bakery': 'Fresh Bakery',
        'pharmacy': 'Pharmacy & Wellness',
        'meat-fish': 'Fresh Meat & Fish',
        'dairy-eggs': 'Dairy, Bread & Eggs',
        'snacks': 'Snacks & Munchies'
    };

    const displayTitle = titleMap[term] || categoryName?.toUpperCase();

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
            <Navbar />

            <Container maxWidth="xl" sx={{ mt: 4, mb: 8 }}>
                {/* Header */}
                <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton onClick={() => navigate('/quick')} sx={{ bgcolor: 'white', border: '1px solid #e2e8f0' }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b' }}>
                            {displayTitle}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#64748b' }}>
                            {products.length} Products Found
                        </Typography>
                    </Box>
                </Box>

                {/* Product Grid - STRICT SIZING */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                    {products.map((item) => (
                        <Box
                            key={item.id}
                            sx={{
                                width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(25% - 18px)' },
                                flexGrow: 0,
                                flexShrink: 0
                            }}
                        >
                            <Card
                                elevation={0}
                                sx={{
                                    height: '420px', // STRICT HEIGHT
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderRadius: 3,
                                    border: '1px solid #e2e8f0',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 10px 20px rgba(0,0,0,0.05)'
                                    }
                                }}
                            >
                                {/* Image Container - STRICT HEIGHT */}
                                <Box sx={{
                                    height: '200px',
                                    width: '100%',
                                    position: 'relative',
                                    bgcolor: '#ffffff',
                                    p: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderBottom: '1px solid #f1f5f9',
                                    cursor: 'pointer' // Add visual cue
                                }}
                                    onClick={() => navigate(`/quick/product/${item.id}`)}
                                >
                                    {item.discount > 0 && (
                                        <Chip
                                            label={`${item.discount}% OFF`}
                                            size="small"
                                            sx={{
                                                position: 'absolute',
                                                top: 12,
                                                left: 12,
                                                bgcolor: '#ef4444',
                                                color: 'white',
                                                fontWeight: 800,
                                                fontSize: '0.7rem',
                                                height: '24px',
                                                borderRadius: 1
                                            }}
                                        />
                                    )}
                                    <CardMedia
                                        component="img"
                                        image={item.image}
                                        alt={item.name}
                                        sx={{
                                            maxWidth: '100%',
                                            maxHeight: '100%',
                                            objectFit: 'contain' // Ensures image fits within the box
                                        }}
                                    />
                                </Box>

                                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
                                    <Typography variant="overline" sx={{ color: '#94a3b8', lineHeight: 1.2, fontWeight: 700 }}>
                                        {item.brand}
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a', mb: 1, lineHeight: 1.3 }}>
                                        {item.name}
                                    </Typography>

                                    {/* Price Section */}
                                    <Stack direction="row" spacing={1} alignItems="baseline" sx={{ mt: 'auto', mb: 2 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 900, color: '#0f172a' }}>
                                            ₹{item.price.toLocaleString()}
                                        </Typography>
                                        {item.mrp > item.price && (
                                            <Typography variant="caption" sx={{ textDecoration: 'line-through', color: '#94a3b8', fontWeight: 600 }}>
                                                ₹{item.mrp.toLocaleString()}
                                            </Typography>
                                        )}
                                    </Stack>

                                    <Stack direction="row" spacing={1} sx={{ mt: 'auto' }}>
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            startIcon={<AddIcon />}
                                            sx={{
                                                borderColor: '#22c55e',
                                                color: '#16a34a',
                                                fontWeight: 800,
                                                textTransform: 'none',
                                                fontSize: '0.8rem',
                                                '&:hover': { bgcolor: '#f0fdf4', borderColor: '#16a34a' }
                                            }}
                                        >
                                            Add
                                        </Button>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            sx={{
                                                bgcolor: '#22c55e',
                                                color: 'black',
                                                fontWeight: 800,
                                                textTransform: 'none',
                                                boxShadow: 'none',
                                                fontSize: '0.8rem',
                                                '&:hover': { bgcolor: '#16a34a', boxShadow: 'none' }
                                            }}
                                        >
                                            Buy Now
                                        </Button>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Box>
                    ))
                    }
                </Box >
            </Container >

            <Footer />
        </Box >
    );
};

export default QCategoryPage;
