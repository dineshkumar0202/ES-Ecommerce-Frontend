import { useState } from 'react';
import { Box, Typography, Grid, Button, IconButton, Paper, TextField, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Avatar, List, ListItem, ListItemText } from '@mui/material';
import {
    Search as SearchIcon,
    Notifications as NotificationsIcon,
    Settings as SettingsIcon,
    FilterList as FilterListIcon,
    GetApp as GetAppIcon,
    Favorite as FavoriteIcon,
    ShoppingCart as ShoppingCartIcon,
    Description as DescriptionIcon,
    ChevronLeft,
    ChevronRight,
} from '@mui/icons-material';

const RetailManagement = () => {
    const [activeTab, setActiveTab] = useState('All Orders');

    const orders = [
        { id: '#ORD-9921', customer: 'John Doe', date: 'Oct 24, 2023', status: 'Confirmed', total: '$120.00' },
        { id: '#ORD-9922', customer: 'Alice Smith', date: 'Oct 24, 2023', status: 'Pending', total: '$450.50' },
        { id: '#ORD-9923', customer: 'Bob Johnson', date: 'Oct 23, 2023', status: 'Processing', total: '$89.00' },
        { id: '#ORD-9924', customer: 'Emma Wilson', date: 'Oct 23, 2023', status: 'Confirmed', total: '$210.00' },
        { id: '#ORD-9925', customer: 'Chris Brown', date: 'Oct 22, 2023', status: 'Shipped', total: '$340.00' },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Confirmed': return 'success';
            case 'Pending': return 'warning';
            case 'Processing': return 'info';
            case 'Shipped': return 'default';
            default: return 'default';
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', display: 'flex', flexDirection: 'column' }}>
            {/* Top Navigation */}
            <Paper elevation={0} sx={{ height: 64, px: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e0e0e0' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ bgcolor: '#cddc39', p: 0.5, borderRadius: 1 }}>
                            <StorefrontIcon />
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Retail Management V101</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 3 }}>
                        {['Dashboard', 'Inventory', 'Customers', 'Reports'].map((tab) => (
                            <Typography key={tab} variant="body2" sx={{ cursor: 'pointer', fontWeight: tab === 'Dashboard' ? 'bold' : 'normal', borderBottom: tab === 'Dashboard' ? '2px solid #cddc39' : 'none', pb: tab === 'Dashboard' ? 2.5 : 0 }}>
                                {tab}
                            </Typography>
                        ))}
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <TextField
                        size="small"
                        placeholder="Global Search"
                        InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
                        sx={{ bgcolor: '#f0f2f5', borderRadius: 1, '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
                    />
                    <IconButton><NotificationsIcon /></IconButton>
                    <IconButton><SettingsIcon /></IconButton>
                    <Avatar sx={{ bgcolor: '#ffcc80' }}>A</Avatar>
                </Box>
            </Paper>

            <Box sx={{ p: 4, flexGrow: 1 }}>

                {/* Stats Cards */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {[
                        { title: 'Wishlist Volume', value: '1,240', change: '+12.5%', icon: <FavoriteIcon />, color: '#b2f2bb' },
                        { title: 'Add to Cart Rate', value: '856', change: '+8.2%', icon: <ShoppingCartIcon />, color: '#cddc39' },
                        { title: 'Total Orders', value: '3,420', change: '+15.3%', icon: <DescriptionIcon />, color: '#b2f2bb' },
                    ].map((stat, i) => (
                        <Grid size={{ xs: 12, md: 4 }} key={i}>
                            <Paper sx={{ p: 3, borderRadius: 3, height: '100%', position: 'relative', overflow: 'hidden' }} elevation={0}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Box sx={{ bgcolor: '#f5f5f5', p: 1, borderRadius: 2 }}>{stat.icon}</Box>
                                    <Typography variant="caption" sx={{ color: '#4caf50', fontWeight: 'bold' }}>↗ {stat.change}</Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary">{stat.title}</Typography>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>{stat.value}</Typography>
                                <Box sx={{ height: 4, bgcolor: '#f0f0f0', borderRadius: 2, overflow: 'hidden' }}>
                                    <Box sx={{ width: '60%', height: '100%', bgcolor: stat.color }} />
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                {/* Sales & Orders Chart Section */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }} elevation={0}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Revenue & Order Volume</Typography>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Button size="small" variant="text" sx={{ color: '#cddc39', fontWeight: 'bold' }}>Daily</Button>
                                    <Button size="small" variant="text" color="inherit">Weekly</Button>
                                </Box>
                            </Box>
                            <Box sx={{ height: 250, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', px: 2, pb: 2, borderBottom: '1px solid #f0f0f0' }}>
                                {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                                    <Box key={i} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, width: '10%' }}>
                                        <Box sx={{ width: '100%', height: `${h * 2}px`, bgcolor: i === 5 ? '#cddc39' : '#f0f4c3', borderRadius: '4px 4px 0 0', position: 'relative', transition: 'height 0.3s' }}>
                                            {i === 5 && (
                                                <Box sx={{ position: 'absolute', top: -30, left: '50%', transform: 'translateX(-50%)', bgcolor: '#000', color: '#fff', px: 1, py: 0.5, borderRadius: 1, fontSize: '0.7rem' }}>$4.2k</Box>
                                            )}
                                        </Box>
                                        <Typography variant="caption" color="text.secondary">Day {i + 1}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Paper sx={{ p: 3, borderRadius: 3, height: '100%', bgcolor: '#cddc39' }} elevation={0}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Top Performing</Typography>
                            <Typography variant="body2" sx={{ mb: 4, opacity: 0.8 }}>Items with highest wishlist saves</Typography>

                            <List>
                                {[
                                    { name: 'Wireless Headphones', saves: '1.2k', trend: '↑' },
                                    { name: 'Smart Fitness Watch', saves: '980', trend: '↑' },
                                    { name: 'Organic Cotton Tee', saves: '850', trend: '↓' },
                                    { name: 'Gaming Mouse Pro', saves: '720', trend: '↑' },
                                ].map((item, i) => (
                                    <ListItem key={i} sx={{ bgcolor: 'rgba(255,255,255,0.4)', mb: 1, borderRadius: 2 }}>
                                        <ListItemText primary={item.name} primaryTypographyProps={{ fontWeight: 'bold', fontSize: '0.9rem' }} />
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Typography variant="body2" fontWeight="bold">{item.saves}</Typography>
                                            <Typography variant="caption">{item.trend}</Typography>
                                            <FavoriteIcon sx={{ fontSize: 16, color: '#33691e' }} />
                                        </Box>
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Orders List */}
                <Paper sx={{ borderRadius: 3, mb: 4, overflow: 'hidden' }} elevation={0}>
                    <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f0f0f0' }}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {['All Orders', 'Pending', 'Confirmed', 'Shipped'].map((status) => (
                                <Button
                                    key={status}
                                    variant={activeTab === status ? 'contained' : 'text'}
                                    onClick={() => setActiveTab(status)}
                                    sx={{
                                        bgcolor: activeTab === status ? '#cddc39' : 'transparent',
                                        color: activeTab === status ? '#000' : 'text.secondary',
                                        fontWeight: activeTab === status ? 'bold' : 'normal',
                                        boxShadow: 'none',
                                        '&:hover': { bgcolor: activeTab === status ? '#dce775' : '#f5f5f5' }
                                    }}
                                >
                                    {status}
                                </Button>
                            ))}
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField
                                size="small"
                                placeholder="Filter by ID, Customer..."
                                InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon color="disabled" /></InputAdornment> }}
                                sx={{ bgcolor: '#f9f9f9', borderRadius: 1 }}
                            />
                            <Button variant="contained" startIcon={<FilterListIcon />} sx={{ bgcolor: '#212121', '&:hover': { bgcolor: '#424242' } }}>Filter</Button>
                        </Box>
                    </Box>

                    <TableContainer>
                        <Table>
                            <TableHead sx={{ bgcolor: '#f9f9f9' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary', fontSize: '0.75rem' }}>ORDER ID</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary', fontSize: '0.75rem' }}>CUSTOMER</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary', fontSize: '0.75rem' }}>DATE</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary', fontSize: '0.75rem' }}>STATUS</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary', fontSize: '0.75rem' }}>TOTAL</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary', fontSize: '0.75rem' }} align="right">ACTION</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders
                                    .filter(order => activeTab === 'All Orders' || order.status === activeTab || (activeTab === 'Pending' && order.status === 'Processing'))
                                    .map((order) => (
                                        <TableRow key={order.id} hover>
                                            <TableCell sx={{ fontWeight: 'bold' }}>{order.id}</TableCell>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>{order.customer.charAt(0)}</Avatar>
                                                    {order.customer}
                                                </Box>
                                            </TableCell>
                                            <TableCell>{order.date}</TableCell>
                                            <TableCell>
                                                <Chip label={order.status} size="small" color={getStatusColor(order.status) as any} sx={{ borderRadius: 1, fontWeight: 'bold' }} variant={order.status === 'Confirmed' ? 'filled' : 'outlined'} />
                                            </TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>{order.total}</TableCell>
                                            <TableCell align="right">
                                                <Button size="small" sx={{ color: 'text.primary', fontWeight: 'bold' }}>View Details</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 1 }}>
                        <IconButton size="small"><ChevronLeft /></IconButton>
                        <Box sx={{ width: 24, height: 24, bgcolor: '#cddc39', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 1, fontWeight: 'bold', fontSize: '0.8rem' }}>1</Box>
                        <IconButton size="small"><ChevronRight /></IconButton>
                    </Box>
                </Paper>

                {/* Footer Actions */}
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Paper sx={{ p: 3, bgcolor: '#000', color: '#fff', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%', position: 'relative', overflow: 'hidden' }}>
                            <Box sx={{ position: 'relative', zIndex: 1 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>System Status</Typography>
                                <Typography variant="body2" sx={{ opacity: 0.7 }}>Real-time processing engine is healthy</Typography>
                            </Box>
                            <Chip label="● Live" sx={{ bgcolor: '#333', color: '#cddc39', borderColor: '#cddc39', border: '1px solid' }} />
                        </Paper>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Paper sx={{ p: 3, bgcolor: '#cddc39', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Generate Reports</Typography>
                                <Typography variant="body2">Export full order history (CSV/PDF)</Typography>
                            </Box>
                            <Button variant="contained" startIcon={<GetAppIcon />} sx={{ bgcolor: '#000', color: '#fff', '&:hover': { bgcolor: '#333' } }}>Export Data</Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

// Simple Icon component used inside
const StorefrontIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 12H3C2.45 12 2 12.45 2 13V20C2 20.55 2.45 21 3 21H21C21.55 21 22 20.55 22 20V13C22 12.45 21.55 12 21 12Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 12L5 3H19L21 12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 21V12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 21V12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default RetailManagement;
