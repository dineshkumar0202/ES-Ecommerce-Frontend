import React, { useState } from 'react';
import { Box, Container, Typography, Tab, Tabs, Paper, Stack, Button } from '@mui/material';
import Navbar from '../WrapperComponents/Navbar';
import Footer from '../WrapperComponents/Footer';
import FreelancerDashboard from '../SpecifiedComponents/Freelancers/Components/FreelancerSidebar';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import WorkIcon from '@mui/icons-material/Work';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

// Mock Data for Dashboard
const dashboardStats = {
    totalSales: 15430,
    totalOrders: 45,
    pendingOrders: 3,
    rating: 4.8
};

const SellerProfile = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const handlePost = (post: any) => {
        console.log('Post created from Seller Profile:', post);
        // Logic to refresh or update UI
    };

    // Render Functions for Tabs
    const renderDashboard = () => (
        <Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
                <Box sx={{ flex: '1 1 250px' }}>
                    <Paper elevation={0} sx={{ p: 3, borderRadius: 4, bgcolor: '#eff6ff', border: '1px solid #dbeafe' }}>
                        <Typography variant="subtitle2" sx={{ color: '#1e40af', fontWeight: 600 }}>Total Sales</Typography>
                        <Typography variant="h4" sx={{ fontWeight: 800, color: '#172554', mt: 1 }}>₹{dashboardStats.totalSales.toLocaleString()}</Typography>
                    </Paper>
                </Box>
                <Box sx={{ flex: '1 1 250px' }}>
                    <Paper elevation={0} sx={{ p: 3, borderRadius: 4, bgcolor: '#f0fdf4', border: '1px solid #dcfce7' }}>
                        <Typography variant="subtitle2" sx={{ color: '#166534', fontWeight: 600 }}>Total Orders</Typography>
                        <Typography variant="h4" sx={{ fontWeight: 800, color: '#052e16', mt: 1 }}>{dashboardStats.totalOrders}</Typography>
                    </Paper>
                </Box>
                <Box sx={{ flex: '1 1 250px' }}>
                    <Paper elevation={0} sx={{ p: 3, borderRadius: 4, bgcolor: '#fef3c7', border: '1px solid #fde68a' }}>
                        <Typography variant="subtitle2" sx={{ color: '#92400e', fontWeight: 600 }}>Pending Orders</Typography>
                        <Typography variant="h4" sx={{ fontWeight: 800, color: '#451a03', mt: 1 }}>{dashboardStats.pendingOrders}</Typography>
                    </Paper>
                </Box>
                <Box sx={{ flex: '1 1 250px' }}>
                    <Paper elevation={0} sx={{ p: 3, borderRadius: 4, bgcolor: '#f3e8ff', border: '1px solid #e9d5ff' }}>
                        <Typography variant="subtitle2" sx={{ color: '#6b21a8', fontWeight: 600 }}>Rating</Typography>
                        <Typography variant="h4" sx={{ fontWeight: 800, color: '#3b0764', mt: 1 }}>{dashboardStats.rating} ★</Typography>
                    </Paper>
                </Box>
            </Box>

            {/* Recent Activity or Charts could go here */}
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Recent Activity</Typography>
            <Paper elevation={0} sx={{ p: 4, textAlign: 'center', bgcolor: 'white', borderRadius: 4, border: '1px solid #e2e8f0' }}>
                <Typography sx={{ color: '#94a3b8' }}>No recent activity to show.</Typography>
            </Paper>
        </Box>
    );

    const renderProducts = () => (
        <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>My Products</Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/seller/add-product')} sx={{ bgcolor: '#0f172a', textTransform: 'none' }}>
                    Add New Product
                </Button>
            </Stack>

            {/* Placeholder for Product List */}
            <Paper elevation={0} sx={{ p: 6, textAlign: 'center', bgcolor: 'white', borderRadius: 4, border: '1px solid #e2e8f0' }}>
                <InventoryIcon sx={{ fontSize: 48, color: '#cbd5e1', mb: 2 }} />
                <Typography sx={{ color: '#94a3b8', fontWeight: 500 }}>You haven't listed any products yet.</Typography>
                <Button variant="outlined" sx={{ mt: 2, textTransform: 'none' }}>List your first item</Button>
            </Paper>
        </Box>
    );

    const renderOrders = () => (
        <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 4 }}>Order Management</Typography>
            {/* Placeholder for Order List */}
            <Paper elevation={0} sx={{ p: 6, textAlign: 'center', bgcolor: 'white', borderRadius: 4, border: '1px solid #e2e8f0' }}>
                <ShoppingBagIcon sx={{ fontSize: 48, color: '#cbd5e1', mb: 2 }} />
                <Typography sx={{ color: '#94a3b8', fontWeight: 500 }}>No active orders to process.</Typography>
            </Paper>
        </Box>
    );


    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            <Box sx={{ bgcolor: 'white', borderBottom: '1px solid #e2e8f0', pt: 4, pb: 0 }}>
                <Container maxWidth="xl">
                    <Typography variant="h4" sx={{ fontWeight: 900, mb: 4 }}>Seller Dashboard</Typography>
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{
                            '& .MuiTab-root': { textTransform: 'none', fontWeight: 700, fontSize: '1rem', minHeight: 60 },
                            '& .Mui-selected': { color: '#0f172a' },
                            '& .MuiTabs-indicator': { bgcolor: '#bef264', height: 4 }
                        }}
                    >
                        <Tab icon={<DashboardIcon />} iconPosition="start" label="Overview" />
                        <Tab icon={<InventoryIcon />} iconPosition="start" label="Products" />
                        <Tab icon={<ShoppingBagIcon />} iconPosition="start" label="Orders" />
                        <Tab icon={<WorkIcon />} iconPosition="start" label="Freelance" />
                    </Tabs>
                </Container>
            </Box>

            <Container maxWidth="xl" sx={{ flex: 1, py: 6 }}>
                {activeTab === 0 && renderDashboard()}
                {activeTab === 1 && renderProducts()}
                {activeTab === 2 && renderOrders()}
                {activeTab === 3 && (
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 800, mb: 4 }}>Freelancer Profile & Gigs</Typography>
                        <FreelancerDashboard onPost={handlePost} />
                    </Box>
                )}
            </Container>

            <Footer />
        </Box>
    );
};

export default SellerProfile;
