import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Button, IconButton, Chip, Stack, Paper, Divider } from '@mui/material';
import Navbar from '../../../WrapperComponents/Navbar';
import Footer from '../../../WrapperComponents/Footer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import InventoryIcon from '@mui/icons-material/Inventory';

// Consolidated Mock Data for Q-Commerce
const allQProducts = [
    // Best Sellers (QProductFeed)
    { id: 1, name: "Fresh Organic Vegetable Basket", brand: "Farm Fresh", unit: "1 Basket", price: 350, mrp: 499, image: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80", discount: 30, category: "Fruits & Veg" },
    { id: 2, name: "Premium Fruit Selection", brand: "Farm Fresh", unit: "1 Pack", price: 400, mrp: 550, image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80", discount: 27, category: "Fruits & Veg" },
    { id: 3, name: "Exotic Berries Pack", brand: "Berry World", unit: "250g", price: 450, mrp: 600, image: "https://images.unsplash.com/photo-1571575173700-afb9492e6a50?auto=format&fit=crop&w=800&q=80", discount: 25, category: "Fruits & Veg" },
    { id: 4, name: "Green Leafy Bundle", brand: "Farm Fresh", unit: "1 Bundle", price: 300, mrp: 400, image: "https://images.unsplash.com/photo-1573246123716-6b1782bfc499?auto=format&fit=crop&w=800&q=80", discount: 25, category: "Fruits & Veg" },

    // Fruits & Veg (QCategoryPage mocks)
    { id: 101, name: "Fresh Organic Bananas", brand: "Farm Fresh", unit: "1 Dozen", price: 60, mrp: 80, image: "https://images.unsplash.com/photo-1603833665858-e61d17a8622e?auto=format&fit=crop&w=800&q=80", discount: 25, category: "Fruits & Veg" },
    { id: 102, name: "Red Apples (Kashmir)", brand: "Farm Fresh", unit: "1 kg", price: 180, mrp: 220, image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80", discount: 18, category: "Fruits & Veg" },
    { id: 103, name: "Fresh Spinach (Palak)", brand: "Farm Fresh", unit: "250g", price: 30, mrp: 40, image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80", discount: 25, category: "Fruits & Veg" },
    { id: 104, name: "Orange - Imported", brand: "Citrus World", unit: "1 kg", price: 120, mrp: 150, image: "https://images.unsplash.com/photo-1580052614034-c55d20bfee8b?auto=format&fit=crop&w=800&q=80", discount: 20, category: "Fruits & Veg" },

    // Bakery
    { id: 201, name: "Fresh Sourdough Bread", brand: "Bakery Fresh", unit: "1 Loaf", price: 120, mrp: 150, image: "https://images.unsplash.com/photo-1585478259506-8e159d6eb39d?auto=format&fit=crop&w=800&q=80", discount: 20, category: "Bakery" },
    { id: 202, name: "Chocolate Croissants (4pcs)", brand: "Bakery Fresh", unit: "1 Box", price: 240, mrp: 300, image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80", discount: 20, category: "Bakery" },
    { id: 203, name: "Whole Wheat Buns", brand: "Healthy Bake", unit: "1 Pack", price: 60, mrp: 80, image: "https://images.unsplash.com/photo-1623334044303-241021148842?auto=format&fit=crop&w=800&q=80", discount: 25, category: "Bakery" },
    { id: 204, name: "Blueberry Muffin Box", brand: "Sweet Treats", unit: "1 Box", price: 180, mrp: 220, image: "https://images.unsplash.com/photo-1558401391-7899b4bd5bbf?auto=format&fit=crop&w=800&q=80", discount: 15, category: "Bakery" },

    // Pharmacy
    { id: 301, name: "Digital Thermometer", brand: "HealthSense", unit: "1 Unit", price: 299, mrp: 499, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80", discount: 40, category: "Pharmacy" },
    { id: 302, name: "Multivitamin Tablets (60s)", brand: "NutriLife", unit: "1 Bottle", price: 599, mrp: 899, image: "https://images.unsplash.com/photo-1584362917165-526a968f79ff?auto=format&fit=crop&w=800&q=80", discount: 33, category: "Pharmacy" },
    { id: 303, name: "First Aid Kit - Compact", brand: "SafetyFirst", unit: "1 Kit", price: 450, mrp: 600, image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=800&q=80", discount: 25, category: "Pharmacy" },
    { id: 304, name: "N95 Protective Masks (Pack of 5)", brand: "MedGuard", unit: "1 Pack", price: 199, mrp: 399, image: "https://images.unsplash.com/photo-1585776245991-cf79dd8fc1f3?auto=format&fit=crop&w=800&q=80", discount: 50, category: "Pharmacy" },

    // Meat & Fish
    { id: 401, name: "Fresh Chicken Breast (500g)", brand: "Farm Fresh", unit: "500g", price: 280, mrp: 350, image: "https://images.unsplash.com/photo-1604503468506-a8da13d82725?auto=format&fit=crop&w=800&q=80", discount: 20, category: "Meat & Fish" },
    { id: 402, name: "Premium Salmon Fillet", brand: "Sea Catch", unit: "250g", price: 850, mrp: 1200, image: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=800&q=80", discount: 30, category: "Meat & Fish" },
    { id: 403, name: "Lamb Curry Cut (500g)", brand: "Meat Masters", unit: "500g", price: 650, mrp: 800, image: "https://images.unsplash.com/photo-1603360946369-dc9bb6f54262?auto=format&fit=crop&w=800&q=80", discount: 15, category: "Meat & Fish" },
    { id: 404, name: "Fresh Prawns (Cleaned)", brand: "Sea Catch", unit: "500g", price: 450, mrp: 600, image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=800&q=80", discount: 25, category: "Meat & Fish" },

    // Dairy & Eggs
    { id: 501, name: "Full Cream Milk (1L)", brand: "Farm Fresh", unit: "1 L", price: 75, mrp: 85, image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80", discount: 10, category: "Dairy & Eggs" },
    { id: 502, name: "Free Range Eggs (Pack of 6)", brand: "Happy Hens", unit: "6 pcs", price: 90, mrp: 120, image: "https://images.unsplash.com/photo-1569254994521-dd684b67fa9d?auto=format&fit=crop&w=800&q=80", discount: 25, category: "Dairy & Eggs" },
    { id: 503, name: "Greek Yogurt (Set of 2)", brand: "Dairy Pure", unit: "2 x 100g", price: 150, mrp: 200, image: "https://images.unsplash.com/photo-1584286595398-a59f21d313f5?auto=format&fit=crop&w=800&q=80", discount: 25, category: "Dairy & Eggs" },
    { id: 504, name: "Salted Butter Block (500g)", brand: "Dairy Pure", unit: "500g", price: 280, mrp: 320, image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=800&q=80", discount: 12, category: "Dairy & Eggs" },

    // Snacks
    { id: 601, name: "Potato Chips - Classic Salted", brand: "Crunchies", unit: "150g", price: 40, mrp: 50, image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=800&q=80", discount: 20, category: "Snacks" },
    { id: 602, name: "Mixed Nuts Pack (200g)", brand: "Nature's Best", unit: "200g", price: 350, mrp: 500, image: "https://images.unsplash.com/photo-1606756672323-af3c3ec52bf8?auto=format&fit=crop&w=800&q=80", discount: 30, category: "Snacks" },
    { id: 603, name: "Dark Chocolate Bar", brand: "Cocoa Luxe", unit: "100g", price: 150, mrp: 200, image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=80", discount: 25, category: "Snacks" },
    { id: 604, name: "Popcorn - Butter Lovers", brand: "Movie Night", unit: "150g", price: 85, mrp: 120, image: "https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=800&q=80", discount: 30, category: "Snacks" },
];

const QProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // Find product
    const product = allQProducts.find(p => p.id === Number(id));

    if (!product) {
        return (
            <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ mb: 2 }}>Product Not Found</Typography>
                    <Button variant="contained" onClick={() => navigate('/quick')}>Go Back</Button>
                </Container>
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#fafafa' }}>
            <Navbar />

            <Container maxWidth="lg" sx={{ mt: 16, mb: 10 }}>
                <Box sx={{ mb: 2 }}>
                    <IconButton onClick={() => navigate(-1)} sx={{ mr: 1, bgcolor: 'white', border: '1px solid #e2e8f0' }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="caption" sx={{ color: '#64748b' }} component="span">
                        Home / Quick Commerce / {product.category} / {product.name}
                    </Typography>
                </Box>

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
                    {/* Left Column: Image */}
                    <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                        <Paper
                            elevation={0}
                            sx={{
                                bgcolor: 'white',
                                border: '1px solid #e2e8f0',
                                borderRadius: 4,
                                p: 4,
                                height: '500px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <Box
                                component="img"
                                src={product.image}
                                alt={product.name}
                                sx={{
                                    maxHeight: '100%',
                                    maxWidth: '100%',
                                    objectFit: 'contain'
                                }}
                            />
                            {product.discount > 0 && (
                                <Chip
                                    label={`${product.discount}% OFF`}
                                    sx={{
                                        position: 'absolute',
                                        top: 24,
                                        left: 24,
                                        bgcolor: '#ef4444',
                                        color: 'white',
                                        fontWeight: 800,
                                        borderRadius: 1
                                    }}
                                />
                            )}
                        </Paper>
                    </Box>

                    {/* Right Column: Details */}
                    <Box sx={{ width: { xs: '100%', md: '50%' }, p: 1 }}>
                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700, fontSize: '0.9rem' }}>
                            {product.brand}
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 900, color: '#1e293b', mt: 1, mb: 2 }}>
                            {product.name}
                        </Typography>

                        {/* Delivery Time */}
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ bgcolor: '#f0fdf4', display: 'inline-flex', px: 1.5, py: 0.5, borderRadius: 2, mb: 3 }}>
                            <AccessTimeIcon sx={{ fontSize: '1rem', color: '#16a34a' }} />
                            <Typography variant="caption" sx={{ color: '#16a34a', fontWeight: 800 }}>
                                14 MINS
                            </Typography>
                        </Stack>

                        <Divider sx={{ mb: 3 }} />

                        {/* Unit Selection (Mocked) */}
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#64748b', mb: 2 }}>
                            Select Unit
                        </Typography>
                        <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                            <Box sx={{
                                border: '2px solid #22c55e',
                                bgcolor: '#f0fdf4',
                                borderRadius: 3,
                                px: 2,
                                py: 1,
                                cursor: 'pointer',
                                minWidth: '100px',
                                textAlign: 'center'
                            }}>
                                <Typography variant="body2" sx={{ fontWeight: 800, color: '#1e293b' }}>{product.unit}</Typography>
                                <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#000' }}>₹{product.price}</Typography>
                                    {product.mrp > product.price && (
                                        <Typography variant="caption" sx={{ textDecoration: 'line-through', color: '#94a3b8' }}>₹{product.mrp}</Typography>
                                    )}
                                </Stack>
                            </Box>
                            {/* Mock inactive unit */}
                            <Box sx={{
                                border: '1px solid #e2e8f0',
                                borderRadius: 3,
                                px: 2,
                                py: 1,
                                cursor: 'pointer',
                                minWidth: '100px',
                                textAlign: 'center',
                                opacity: 0.6
                            }}>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#64748b' }}>2 x {product.unit}</Typography>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#64748b' }}>₹{product.price * 2 - 20}</Typography>
                            </Box>
                        </Stack>

                        {/* Price and Add Button */}
                        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 6 }}>
                            <Box>
                                <Typography variant="h4" sx={{ fontWeight: 900, color: '#1e293b' }}>
                                    ₹{product.price}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#64748b' }}>
                                    (Inclusive of all taxes)
                                </Typography>
                            </Box>
                            <Button
                                variant="contained"
                                size="large"
                                startIcon={<AddIcon />}
                                sx={{
                                    bgcolor: '#22c55e',
                                    color: 'black',
                                    fontWeight: 800,
                                    px: 6,
                                    py: 1.5,
                                    borderRadius: 2,
                                    '&:hover': { bgcolor: '#16a34a' }
                                }}
                            >
                                ADD TO CART
                            </Button>
                        </Stack>

                        {/* Trust Badges */}
                        <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Why shop from {product.brand}?</Typography>

                        <Stack spacing={3}>
                            <Stack direction="row" spacing={2} alignItems="flex-start">
                                <Box sx={{ p: 1, bgcolor: '#eff6ff', borderRadius: '50%' }}>
                                    <LocalShippingIcon sx={{ color: '#3b82f6' }} />
                                </Box>
                                <Box>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Round The Clock Delivery</Typography>
                                    <Typography variant="body2" sx={{ color: '#64748b' }}>Get items delivered to your doorstep from dark stores near you.</Typography>
                                </Box>
                            </Stack>
                            <Stack direction="row" spacing={2} alignItems="flex-start">
                                <Box sx={{ p: 1, bgcolor: '#fefce8', borderRadius: '50%' }}>
                                    <VerifiedUserIcon sx={{ color: '#eab308' }} />
                                </Box>
                                <Box>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Best Prices & Offers</Typography>
                                    <Typography variant="body2" sx={{ color: '#64748b' }}>Best price destination with offers directly from the manufacturers.</Typography>
                                </Box>
                            </Stack>
                            <Stack direction="row" spacing={2} alignItems="flex-start">
                                <Box sx={{ p: 1, bgcolor: '#f0fdf4', borderRadius: '50%' }}>
                                    <InventoryIcon sx={{ color: '#22c55e' }} />
                                </Box>
                                <Box>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Wide Assortment</Typography>
                                    <Typography variant="body2" sx={{ color: '#64748b' }}>Choose from 30,000+ products across food, personal care, and more.</Typography>
                                </Box>
                            </Stack>
                        </Stack>

                    </Box>
                </Stack>
            </Container>

            <Footer />
        </Box>
    );
};

export default QProductDetails;
