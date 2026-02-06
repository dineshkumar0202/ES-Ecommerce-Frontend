import React from 'react';
import { Box, Container, Typography, Button, Paper, Stack, Divider, Chip } from '@mui/material';
import Navbar from '../WrapperComponents/Navbar';
import Footer from '../WrapperComponents/Footer';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

// Mock B2B Data
const wholesaleProducts = [
    {
        id: 1,
        title: "Industrial Heavy Duty Knitting Machine",
        price: "₹1,25,000",
        unit: "Piece",
        minOrder: "1 Piece",
        company: "TexTech Industries",
        location: "Ludhiana, Punjab",
        verified: true,
        image: "https://images.unsplash.com/photo-1605117882275-bf5d5016c681?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 2,
        title: "Bulk Organic Cotton Fabric Rolls",
        price: "₹450",
        unit: "Meter",
        minOrder: "100 Meters",
        company: "Green Weaves Pvt Ltd",
        location: "Ahmedabad, Gujarat",
        verified: true,
        image: "https://images.unsplash.com/photo-1596462502278-27bfdd403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 3,
        title: "Commercial Grade Steel Pipes",
        price: "₹65",
        unit: "Kilogram",
        minOrder: "500 Kilograms",
        company: "MetalWorks Corp",
        location: "Mumbai, Maharashtra",
        verified: false,
        image: "https://images.unsplash.com/photo-1535063406560-6495d4e6904e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 4,
        title: "Solar Panels 500W Monocrystalline",
        price: "₹12,000",
        unit: "Piece",
        minOrder: "50 Pieces",
        company: "SolarSys Energy",
        location: "Bangalore, Karnataka",
        verified: true,
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
];

const Wholesale = () => {
    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
            <Navbar />

            {/* Sub-Header for B2B Context */}
            <Box sx={{ bgcolor: '#2e3b55', color: 'white', py: 1 }}>
                <Container maxWidth="xl">
                    <Stack direction="row" spacing={3} alignItems="center">
                        <Typography variant="subtitle2" fontWeight="bold">ATOZ Business</Typography>
                        <Divider orientation="vertical" flexItem sx={{ bgcolor: 'rgba(255,255,255,0.3)' }} />
                        <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer' }}>Industrial Machinery</Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer' }}>Electronics & Electrical</Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer' }}>Construction & Material</Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer' }}>Packaging Machines</Typography>
                    </Stack>
                </Container>
            </Box>

            <Container maxWidth="xl" sx={{ mt: 3, mb: 8 }}>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, color: '#333' }}>
                    Wholesale Marketplace
                </Typography>

                <Stack spacing={2}>
                    {wholesaleProducts.map((item) => (
                        <Paper
                            key={item.id}
                            elevation={0}
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: { xs: 'column', md: 'row' },
                                gap: 3,
                                border: '1px solid #e0e0e0',
                                borderRadius: 2,
                                transition: 'box-shadow 0.2s',
                                '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }
                            }}
                        >
                            {/* Product Image */}
                            <Box
                                sx={{
                                    width: { xs: '100%', md: '250px' },
                                    height: '200px',
                                    borderRadius: 1,
                                    overflow: 'hidden',
                                    flexShrink: 0
                                }}
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </Box>

                            {/* Product Details */}
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#1a237e' }}>
                                    {item.title}
                                </Typography>

                                <Typography variant="h5" sx={{ fontWeight: 800, color: '#333', mb: 0.5 }}>
                                    {item.price} <Typography component="span" variant="body1" color="text.secondary">/ {item.unit}</Typography>
                                </Typography>

                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    Min. Order: {item.minOrder}
                                </Typography>

                                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{item.company}</Typography>
                                    {item.verified && (
                                        <Chip
                                            icon={<VerifiedUserIcon sx={{ fontSize: '1rem !important' }} />}
                                            label="Verified Supplier"
                                            size="small"
                                            color="success"
                                            variant="outlined"
                                            sx={{ height: 20, fontSize: '0.7rem' }}
                                        />
                                    )}
                                </Box>

                                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', gap: 0.5 }}>
                                    <LocationOnIcon fontSize="small" /> {item.location}
                                </Typography>
                            </Box>

                            {/* Action Buttons */}
                            <Box sx={{
                                width: { xs: '100%', md: '250px' },
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                gap: 2,
                                borderLeft: { md: '1px solid #f0f0f0' },
                                pl: { md: 2 }
                            }}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    startIcon={<CallIcon />}
                                    sx={{ bgcolor: '#00b0ff', fontWeight: 'bold' }}
                                >
                                    Contact Seller
                                </Button>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    sx={{ fontWeight: 'bold', borderColor: '#333', color: '#333' }}
                                >
                                    Get Best Price
                                </Button>
                            </Box>
                        </Paper>
                    ))}
                </Stack>
            </Container>

            <Footer />
        </Box>
    );
};

export default Wholesale;
