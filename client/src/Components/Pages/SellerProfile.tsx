import { useState, useEffect } from 'react';
import { Box, Container, Typography, Paper, Stack, Button, Avatar, Chip, IconButton, Grid, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Navbar from '../WrapperComponents/Navbar';
import Footer from '../WrapperComponents/Footer';
import LogoutIcon from '@mui/icons-material/Logout';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useNavigate } from 'react-router-dom';
import { WholesaleService, OrderService } from '../../services/api';

const SellerProfile = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Overview');
    const [products, setProducts] = useState<any[]>([]);
    const [orders, setOrders] = useState<any[]>([]);

    const name = localStorage.getItem('userName') || 'Seller Name';
    const avatar = localStorage.getItem('userProfileImage') || '';

    // Mock Data for Dashboard since we might not have full seller backend endpoints
    const stats = {
        totalSales: '₹1,24,500',
        orders: 45,
        products: 12,
        rating: 4.8
    };

    const fetchSellerData = async () => {
        try {
            const prodRes = await WholesaleService.getMyProducts();
            setProducts(prodRes.data || []);

            const ordersRes = await OrderService.getSellerOrders();
            // Transform API data if necessary or use directly
            // Mapping to current UI structure
            setOrders(ordersRes.data.map((o: any) => ({
                id: o._id,
                product: o.orderItems.map((i: any) => i.title).join(', '),
                customer: o.user?.username || 'Guest',
                date: new Date(o.createdAt).toLocaleDateString(),
                status: o.status,
                amount: `₹${o.totalPrice}`
            })) || []);

        } catch (error) {
            console.error("Error loading dashboard:", error);
        }
    };

    useEffect(() => {
        fetchSellerData();
    }, []);

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        try {
            await OrderService.updateStatus(id, newStatus);
            fetchSellerData(); // Refresh data
        } catch (e) {
            console.error("Status update failed:", e);
        }
    };

    const StatusChip = ({ status }: { status: string }) => {
        let color = '#e2e8f0';
        let textColor = '#475569';

        switch (status) {
            case 'Ordered': color = '#fef3c7'; textColor = '#b45309'; break;
            case 'Processing': color = '#dbeafe'; textColor = '#1e40af'; break;
            case 'Shipped': color = '#f3e8ff'; textColor = '#6b21a8'; break;
            case 'Out for Delivery': color = '#ffedd5'; textColor = '#9a3412'; break;
            case 'Delivered': color = '#dcfce7'; textColor = '#166534'; break;
            case 'Cancelled': color = '#fee2e2'; textColor = '#991b1b'; break;
        }

        return <Chip label={status} size="small" sx={{ bgcolor: color, color: textColor, fontWeight: 800, borderRadius: 2 }} />;
    };

    const renderOverview = () => (
        <Box>
            <Typography variant="h5" sx={{ fontWeight: 900, mb: 3 }}>Dashboard Overview</Typography>
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {[
                    { label: 'Total Sales', value: stats.totalSales, icon: <AttachMoneyOutlinedIcon />, color: '#bef264' },
                    { label: 'Total Orders', value: stats.orders, icon: <ShoppingBagOutlinedIcon />, color: '#B4D5DC' },
                    { label: 'Active Listings', value: stats.products, icon: <Inventory2OutlinedIcon />, color: '#fca5a5' },
                    { label: 'Seller Rating', value: stats.rating, icon: <TrendingUpIcon />, color: '#c4b5fd' }
                ].map((stat, i) => (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                        <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #f1f5f9', bgcolor: 'white' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                <Box sx={{ p: 1.5, borderRadius: 3, bgcolor: stat.color, color: 'black' }}>
                                    {stat.icon}
                                </Box>
                                <Chip label="+12%" size="small" sx={{ bgcolor: '#f1f5f9', fontWeight: 800, fontSize: '0.65rem' }} />
                            </Box>
                            <Typography variant="h4" sx={{ fontWeight: 900, mb: 0.5 }}>{stat.value}</Typography>
                            <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700 }}>{stat.label}</Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {/* Recent Orders Table */}
            <Paper elevation={0} sx={{ p: 4, borderRadius: 6, border: '1px solid #f1f5f9', bgcolor: 'white' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>Recent Orders</Typography>
                    <Button sx={{ fontWeight: 800, textTransform: 'none' }} onClick={() => setActiveTab('Orders')}>View All</Button>
                </Box>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 800, color: '#94a3b8' }}>ORDER ID</TableCell>
                                <TableCell sx={{ fontWeight: 800, color: '#94a3b8' }}>PRODUCT</TableCell>
                                <TableCell sx={{ fontWeight: 800, color: '#94a3b8' }}>CUSTOMER</TableCell>
                                <TableCell sx={{ fontWeight: 800, color: '#94a3b8' }}>STATUS</TableCell>
                                <TableCell sx={{ fontWeight: 800, color: '#94a3b8' }}>AMOUNT</TableCell>
                                <TableCell sx={{ fontWeight: 800, color: '#94a3b8' }}>ACTION</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell sx={{ fontWeight: 700 }}>{order.id}</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>{order.product}</TableCell>
                                    <TableCell sx={{ fontWeight: 600, color: '#64748b' }}>{order.customer}</TableCell>
                                    <TableCell><StatusChip status={order.status} /></TableCell>
                                    <TableCell sx={{ fontWeight: 800 }}>{order.amount}</TableCell>
                                    <TableCell>
                                        <IconButton size="small"><EditOutlinedIcon fontSize="small" /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );

    const renderOrders = () => (
        <Box>
            <Typography variant="h5" sx={{ fontWeight: 900, mb: 3 }}>Order Management</Typography>
            <Paper elevation={0} sx={{ p: 0, borderRadius: 6, border: '1px solid #f1f5f9', bgcolor: 'white', overflow: 'hidden' }}>
                <TableContainer>
                    <Table>
                        <TableHead sx={{ bgcolor: '#f8fafc' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 800 }}>Order Detail</TableCell>
                                <TableCell sx={{ fontWeight: 800 }}>Date</TableCell>
                                <TableCell sx={{ fontWeight: 800 }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 800 }}>Update Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id} hover>
                                    <TableCell>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{order.id}</Typography>
                                        <Typography variant="body2" sx={{ color: '#64748b' }}>{order.product}</Typography>
                                        <Typography variant="caption" sx={{ color: '#94a3b8' }}>Customer: {order.customer}</Typography>
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600, color: '#64748b' }}>{order.date}</TableCell>
                                    <TableCell><StatusChip status={order.status} /></TableCell>
                                    <TableCell>
                                        <Stack direction="row" spacing={1}>
                                            <Button size="small" variant="contained" color="primary" disabled={order.status === 'Shipped'} onClick={() => handleStatusUpdate(order.id, 'Shipped')} sx={{ boxShadow: 'none', borderRadius: 2 }}>Ship</Button>
                                            <Button size="small" variant="contained" color="success" disabled={order.status === 'Delivered'} onClick={() => handleStatusUpdate(order.id, 'Delivered')} sx={{ boxShadow: 'none', borderRadius: 2 }}>Deliver</Button>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );

    const renderProducts = () => (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 900 }}>Product Inventory</Typography>
                <Button variant="contained" startIcon={<AddIcon />} sx={{ bgcolor: 'black', color: 'white', fontWeight: 800, borderRadius: 3, textTransform: 'none' }} onClick={() => navigate('/wholesale', { state: { view: 'upload' } })}>
                    Add New Product
                </Button>
            </Box>

            <Paper elevation={0} sx={{ p: 4, borderRadius: 6, border: '1px solid #f1f5f9', bgcolor: 'white' }}>
                {products.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 5 }}>
                        <Inventory2OutlinedIcon sx={{ fontSize: 48, color: '#e2e8f0', mb: 2 }} />
                        <Typography sx={{ color: '#94a3b8' }}>No products found in your inventory.</Typography>
                    </Box>
                ) : (
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 800 }}>PRODUCT</TableCell>
                                    <TableCell sx={{ fontWeight: 800 }}>CATEGORY</TableCell>
                                    <TableCell sx={{ fontWeight: 800 }}>STOCK</TableCell>
                                    <TableCell sx={{ fontWeight: 800 }}>PRICE</TableCell>
                                    <TableCell sx={{ fontWeight: 800 }}>ACTIONS</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products.map((p) => (
                                    <TableRow key={p._id}>
                                        <TableCell sx={{ display: 'flex', gap: 2, alignItems: 'center', borderBottom: 'none' }}>
                                            <Avatar src={p.images?.[0]} variant="rounded" sx={{ width: 50, height: 50 }} />
                                            <Box>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{p.title}</Typography>
                                                <Typography variant="caption" sx={{ color: '#64748b' }}>ID: {p._id.slice(-6).toUpperCase()}</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>{p.category || 'Retail'}</TableCell>
                                        <TableCell>
                                            <Chip label="In Stock" size="small" color="success" variant="outlined" sx={{ fontWeight: 800 }} />
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 800 }}>₹{p.price || p.pricePerUnit}</TableCell>
                                        <TableCell>
                                            <IconButton size="small"><EditOutlinedIcon /></IconButton>
                                            <IconButton size="small" color="error"><DeleteOutlineIcon /></IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Paper>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f8fafc' }}>
            <Navbar />

            <Container maxWidth="xl" sx={{ flex: 1, py: 4 }}>
                <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', lg: 'row' } }}>

                    {/* Sidebar Nav */}
                    <Box sx={{ width: { xs: '100%', lg: 280 }, flexShrink: 0 }}>
                        <Paper elevation={0} sx={{ p: 3, borderRadius: 6, border: '1px solid #e2e8f0', bgcolor: 'white', position: 'sticky', top: 100 }}>
                            <Box sx={{ textAlign: 'center', mb: 4 }}>
                                <Avatar src={avatar} sx={{ width: 90, height: 90, mx: 'auto', mb: 2, border: '4px solid #B4D5DC' }} />
                                <Typography variant="h6" sx={{ fontWeight: 900 }}>{name}</Typography>
                                <Typography variant="caption" sx={{ color: '#64748b' }}>Verified Seller</Typography>
                            </Box>

                            <Stack spacing={1}>
                                {['Overview', 'Products', 'Orders', 'Payments', 'Returns'].map((item) => (
                                    <Button
                                        key={item}
                                        fullWidth
                                        variant={activeTab === item ? 'contained' : 'text'}
                                        onClick={() => setActiveTab(item)}
                                        sx={{
                                            justifyContent: 'flex-start',
                                            textTransform: 'none',
                                            fontWeight: 800,
                                            borderRadius: 3,
                                            px: 3,
                                            py: 1.5,
                                            bgcolor: activeTab === item ? 'black' : 'transparent',
                                            color: activeTab === item ? 'white' : '#64748b',
                                            '&:hover': { bgcolor: activeTab === item ? 'black' : '#f1f5f9' }
                                        }}
                                    >
                                        {item}
                                    </Button>
                                ))}
                            </Stack>

                            <Divider sx={{ my: 3 }} />

                            <Button fullWidth startIcon={<LogoutIcon />} sx={{ color: '#ef4444', fontWeight: 800, textTransform: 'none' }} onClick={() => { localStorage.clear(); navigate('/login'); }}>
                                Log Out
                            </Button>
                        </Paper>
                    </Box>

                    {/* Main Content */}
                    <Box sx={{ flex: 1 }}>
                        {activeTab === 'Overview' && renderOverview()}
                        {activeTab === 'Orders' && renderOrders()}
                        {activeTab === 'Products' && renderProducts()}
                        {['Payments', 'Returns'].includes(activeTab) && (
                            <Paper elevation={0} sx={{ p: 5, textAlign: 'center', borderRadius: 6, bgcolor: 'white' }}>
                                <Inventory2OutlinedIcon sx={{ fontSize: 60, color: '#e2e8f0', mb: 2 }} />
                                <Typography variant="h6" sx={{ color: '#64748b', fontWeight: 700 }}>{activeTab} Module Coming Soon</Typography>
                                <Typography variant="body2" sx={{ color: '#94a3b8' }}>We are streamlining the {activeTab.toLowerCase()} process for you.</Typography>
                            </Paper>
                        )}
                    </Box>
                </Box>
            </Container>

            <Footer />
        </Box>
    );
};

export default SellerProfile;
