import { Box, Container, Grid, Typography, Paper } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SecurityIcon from '@mui/icons-material/Security';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';

const features = [
    {
        id: 1,
        icon: <LocalShippingIcon sx={{ fontSize: 40, color: '#3f51b5' }} />,
        title: 'Free Shipping',
        description: 'On all orders over ₹499'
    },
    {
        id: 2,
        icon: <SecurityIcon sx={{ fontSize: 40, color: '#4caf50' }} />,
        title: 'Secure Payment',
        description: '100% secure payment'
    },
    {
        id: 3,
        icon: <CurrencyExchangeIcon sx={{ fontSize: 40, color: '#ff9800' }} />,
        title: 'Easy Returns',
        description: '30 Day return policy'
    },
    {
        id: 4,
        icon: <HeadsetMicIcon sx={{ fontSize: 40, color: '#e91e63' }} />,
        title: '24/7 Support',
        description: 'Dedicated support'
    }
];

const ServiceFeatures = () => {
    return (
        <Box sx={{ py: 4, bgcolor: 'white' }}>
            <Container maxWidth="xl">
                <Grid container spacing={4}>
                    {features.map((feature) => (
                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={feature.id}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    bgcolor: '#f8f9fa',
                                    borderRadius: 4,
                                    transition: 'transform 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        bgcolor: '#e3f2fd'
                                    }
                                }}
                            >
                                <Box sx={{ mb: 2, p: 2, bgcolor: 'white', borderRadius: '50%', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                                    {feature.icon}
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                    {feature.title}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {feature.description}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default ServiceFeatures;
