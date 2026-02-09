import { Box, Typography, Paper, Stack, List, ListItemButton, ListItemIcon, ListItemText, Grid, IconButton } from '@mui/material';
import {
    Dashboard as DashboardIcon,
    Store as StoreIcon,
    Warehouse as WarehouseIcon,
    FlashOn as FlashOnIcon,
    Autorenew as AutorenewIcon,
    WorkOutline as WorkOutlineIcon,
    ExitToApp as ExitToAppIcon,
    Group as GroupIcon,
    ShoppingBag as ShoppingBagIcon,
    AttachMoney as AttachMoneyIcon,
    Search as SearchIcon,
    Notifications as NotificationsIcon,
    AccountCircle as AccountCircleIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { AdminService } from '../../../services/api';
import { useEffect, useState } from 'react';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [statsData, setStatsData] = useState<any>(null);
    const [activities, setActivities] = useState<any>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data: stats } = await AdminService.getStats();
                setStatsData(stats);
                const { data: act } = await AdminService.getActivities();
                setActivities(act);
            } catch (error) {
                console.error("Failed to fetch admin data", error);
            }
        };
        fetchStats();
    }, []);

    const menuItems = [
        { name: 'Overview', icon: <DashboardIcon />, path: '/admin/dashboard', active: true },
        { name: 'Retail', icon: <StoreIcon />, path: '/admin/retail' },
        { name: 'Wholesale', icon: <WarehouseIcon />, path: '/admin/wholesale' },
        { name: 'Q-Commerce', icon: <FlashOnIcon />, path: '/admin/quick' },
        { name: 'Resale', icon: <AutorenewIcon />, path: '/admin/resale' },
        { name: 'Freelance', icon: <WorkOutlineIcon />, path: '/admin/freelance' },
    ];

    const stats = [
        {
            title: 'Total User',
            value: statsData?.userCount?.toLocaleString() || '0',
            growth: '+12%',
            icon: <GroupIcon sx={{ color: 'black', fontSize: 28 }} />,
            bgColor: '#bef264'
        },
        {
            title: 'Total Order',
            value: statsData?.orderCount?.toLocaleString() || '0',
            growth: '+8%',
            icon: <ShoppingBagIcon sx={{ color: 'black', fontSize: 28 }} />,
            bgColor: '#bef264'
        },
        {
            title: 'Total Selling Amount',
            value: `₹${statsData?.totalSales?.toLocaleString() || '0'}`,
            growth: '+24%',
            icon: <AttachMoneyIcon sx={{ color: 'black', fontSize: 28 }} />,
            bgColor: '#bef264'
        }
    ];

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'white' }}>
            {/* Sidebar */}
            <Box sx={{ width: 260, bgcolor: 'white', borderRight: '1px solid #e2e8f0', p: 3, display: 'flex', flexDirection: 'column', height: '100vh', position: 'sticky', top: 0 }}>
                {/* Logo Area */}
                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 5, px: 2 }}>
                    <Box sx={{ bgcolor: '#bef264', p: 0.5, borderRadius: 1, display: 'flex' }}>
                        <DashboardIcon sx={{ color: 'black' }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>admin</Typography>
                </Stack>

                <List disablePadding>
                    {menuItems.map((item) => (
                        <ListItemButton
                            key={item.name}
                            onClick={() => item.path !== '/admin/dashboard' && navigate(item.path)}
                            sx={{
                                mb: 1,
                                borderRadius: 3,
                                bgcolor: item.active ? '#bef264' : 'transparent',
                                color: item.active ? 'black' : '#94a3b8',
                                '&:hover': { bgcolor: item.active ? '#bef264' : '#f1f5f9', color: item.active ? 'black' : '#64748b' },
                                py: 1.5,
                                px: 3
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40, color: item.active ? 'black' : '#94a3b8' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.name}
                                primaryTypographyProps={{ fontWeight: item.active ? 800 : 500, fontSize: '1rem' }}
                            />
                        </ListItemButton>
                    ))}
                </List>

                <Box sx={{ mt: 'auto' }}>
                    <Stack onClick={() => {
                        localStorage.removeItem('token');
                        localStorage.removeItem('userRole');
                        navigate('/admin/login');
                    }} direction="row" alignItems="center" spacing={2} sx={{ px: 2, cursor: 'pointer', color: '#ef4444' }}>
                        <ExitToAppIcon fontSize="small" />
                        <Typography variant="body2" fontWeight={600}>Leave</Typography>
                    </Stack>
                </Box>
            </Box>

            {/* Main Content */}
            <Box sx={{ flexGrow: 1, p: 4, overflow: 'auto', bgcolor: '#f8fafc' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 800 }}>Dashboard Overview</Typography>
                    <Stack direction="row" spacing={2}>
                        <IconButton sx={{ bgcolor: 'white' }}><SearchIcon /></IconButton>
                        <IconButton sx={{ bgcolor: 'white' }}><NotificationsIcon /></IconButton>
                        <IconButton sx={{ bgcolor: 'white' }}><AccountCircleIcon /></IconButton>
                    </Stack>
                </Stack>

                {/* Stats Cards */}
                <Grid container spacing={4} sx={{ mb: 5 }}>
                    {stats.map((stat, index) => (
                        <Grid key={index} size={{ xs: 12, md: 4 }}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3,
                                    borderRadius: 4,
                                    bgcolor: 'white',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    height: '100%'
                                }}
                            >
                                <Box>
                                    <Typography variant="subtitle2" sx={{ color: '#94a3b8', fontWeight: 600, mb: 2 }}>{stat.title}</Typography>
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <Typography variant="h4" sx={{ fontWeight: 800 }}>{stat.value}</Typography>
                                        <Typography variant="caption" sx={{ color: '#84cc16', fontWeight: 700, bgcolor: '#ecfccb', px: 0.5, borderRadius: 0.5 }}>{stat.growth}</Typography>
                                    </Stack>
                                </Box>
                                <Box sx={{ bgcolor: '#f7fee7', p: 1.5, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {stat.icon}
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 8 }}>
                        {/* Recent Activity Table */}
                        <Paper elevation={0} sx={{ p: 4, borderRadius: 4, bgcolor: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', mb: 4 }}>
                            <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Recent Activity</Typography>
                            <Box>
                                {activities?.recentOrders?.map((order: any) => (
                                    <Stack key={order._id} direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 2, borderBottom: '1px solid #f1f5f9' }}>
                                        <Stack direction="row" spacing={2} alignItems="center">
                                            <Box sx={{ width: 40, height: 40, bgcolor: '#f8fafc', borderRadius: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <ShoppingBagIcon sx={{ color: '#94a3b8', fontSize: 20 }} />
                                            </Box>
                                            <Box>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Order from {order.user?.username || 'Guest'}</Typography>
                                                <Typography variant="caption" sx={{ color: '#94a3b8' }}>ID: {order._id.substring(0, 8)}</Typography>
                                            </Box>
                                        </Stack>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>₹{order.totalPrice}</Typography>
                                    </Stack>
                                ))}
                                {(!activities?.recentOrders || activities.recentOrders.length === 0) && (
                                    <Typography variant="body2" color="textSecondary">No recent activity found.</Typography>
                                )}
                            </Box>
                        </Paper>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        {/* Segment Breakdown */}
                        <Paper elevation={0} sx={{ p: 4, borderRadius: 4, bgcolor: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                            <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Segments Activity</Typography>
                            <Stack spacing={3}>
                                {[
                                    { label: 'Retail Products', value: statsData?.segments?.retail, icon: <StoreIcon />, color: '#84cc16' },
                                    { label: 'Wholesale Items', value: statsData?.segments?.wholesale, icon: <WarehouseIcon />, color: '#3b82f6' },
                                    { label: 'Q-Commerce', value: statsData?.segments?.qCommerce, icon: <FlashOnIcon />, color: '#f59e0b' },
                                    { label: 'Resale Items', value: statsData?.segments?.resale, icon: <AutorenewIcon />, color: '#8b5cf6' },
                                    { label: 'Freelance Posts', value: statsData?.segments?.freelance, icon: <WorkOutlineIcon />, color: '#ec4899' },
                                ].map((seg, i) => (
                                    <Stack key={i} direction="row" alignItems="center" spacing={2}>
                                        <Box sx={{ color: seg.color }}>{seg.icon}</Box>
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Typography variant="body2" sx={{ fontWeight: 700 }}>{seg.label}</Typography>
                                            <Box sx={{ width: '100%', height: 6, bgcolor: '#f1f5f9', borderRadius: 1, mt: 0.5 }}>
                                                <Box sx={{ width: `${Math.min(100, (seg.value || 0) * 10)}%`, height: '100%', bgcolor: seg.color, borderRadius: 1 }} />
                                            </Box>
                                        </Box>
                                        <Typography variant="body2" sx={{ fontWeight: 800 }}>{seg.value || 0}</Typography>
                                    </Stack>
                                ))}
                            </Stack>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default AdminDashboard;
