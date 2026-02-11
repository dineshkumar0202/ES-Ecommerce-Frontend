import { Box, Typography, Paper, Stack, List, ListItemButton, ListItemIcon, ListItemText, Grid } from '@mui/material';
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
        { name: 'Overview', icon: <DashboardIcon sx={{ fontSize: 20 }} />, path: '/admin/dashboard', active: true },
        { name: 'Retail', icon: <StoreIcon sx={{ fontSize: 20 }} />, path: '/admin/retail' },
        { name: 'Wholesale', icon: <WarehouseIcon sx={{ fontSize: 20 }} />, path: '/admin/wholesale' },
        { name: 'Q-Commerce', icon: <FlashOnIcon sx={{ fontSize: 20 }} />, path: '/admin/quick' },
        { name: 'Resale', icon: <AutorenewIcon sx={{ fontSize: 20 }} />, path: '/admin/resale' },
        { name: 'Freelance', icon: <WorkOutlineIcon sx={{ fontSize: 20 }} />, path: '/admin/freelance' },
    ];

    const stats = [
        {
            title: 'Total User',
            value: statsData?.userCount?.toLocaleString() || '0',
            growth: '+12%',
            icon: <GroupIcon sx={{ color: '#1e293b', fontSize: 22 }} />,
            bgColor: '#f1f5f9'
        },
        {
            title: 'Total Order',
            value: statsData?.orderCount?.toLocaleString() || '0',
            growth: '+8%',
            icon: <ShoppingBagIcon sx={{ color: '#1e293b', fontSize: 22 }} />,
            bgColor: '#f1f5f9'
        },
        {
            title: 'Total Selling Amount',
            value: `₹${statsData?.totalSales?.toLocaleString() || '0'}`,
            growth: '+24%',
            icon: <AttachMoneyIcon sx={{ color: '#1e293b', fontSize: 22 }} />,
            bgColor: '#f1f5f9'
        }
    ];

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'white' }}>
            {/* Sidebar */}
            <Box sx={{ width: 260, bgcolor: 'white', borderRight: '1px solid #e2e8f0', p: 3, display: 'flex', flexDirection: 'column', height: '100vh', position: 'sticky', top: 0 }}>
                {/* Logo Area */}
                <Box sx={{ mb: 4 }} />

                <List disablePadding>
                    {menuItems.map((item) => (
                        <ListItemButton
                            key={item.name}
                            onClick={() => item.path !== '/admin/dashboard' && navigate(item.path)}
                            sx={{
                                mb: 1,
                                borderRadius: 3,
                                bgcolor: item.active ? '#CFE8EC' : 'transparent',
                                color: item.active ? '#1e293b' : '#64748b',
                                '&:hover': { bgcolor: item.active ? '#CFE8EC' : '#f8fafc', color: item.active ? '#1e293b' : '#334155' },
                                py: 1.2,
                                px: 2
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 35, color: item.active ? '#1e293b' : '#64748b' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.name}
                                primaryTypographyProps={{ fontWeight: item.active ? 700 : 500, fontSize: '0.95rem' }}
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
                <Box sx={{ mb: 2 }} />

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
                                    <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600, mb: 1.5 }}>{stat.title}</Typography>
                                    <Stack direction="row" alignItems="center" spacing={1.5}>
                                        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b' }}>{stat.value}</Typography>
                                        <Typography variant="caption" sx={{ color: '#166534', fontWeight: 800, bgcolor: '#dcfce7', px: 1, py: 0.3, borderRadius: 1.5 }}>{stat.growth}</Typography>
                                    </Stack>
                                </Box>
                                <Box sx={{ bgcolor: '#f1f5f9', p: 1.2, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                                            <Box sx={{ width: 42, height: 42, bgcolor: '#f1f5f9', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <ShoppingBagIcon sx={{ color: '#1e293b', fontSize: 20, opacity: 0.7 }} />
                                            </Box>
                                            <Box>
                                                <Typography variant="body2" sx={{ fontWeight: 700, color: '#1e293b' }}>Order from {order.user?.username || 'Guest'}</Typography>
                                                <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>ID: {order._id.substring(0, 8).toUpperCase()}</Typography>
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
                                    { label: 'Retail Products', value: statsData?.segments?.retail, icon: <StoreIcon sx={{ fontSize: 18 }} />, color: '#22c55e' },
                                    { label: 'Wholesale Items', value: statsData?.segments?.wholesale, icon: <WarehouseIcon sx={{ fontSize: 18 }} />, color: '#3b82f6' },
                                    { label: 'Q-Commerce', value: statsData?.segments?.qCommerce, icon: <FlashOnIcon sx={{ fontSize: 18 }} />, color: '#eab308' },
                                    { label: 'Resale Items', value: statsData?.segments?.resale, icon: <AutorenewIcon sx={{ fontSize: 18 }} />, color: '#6366f1' },
                                    { label: 'Freelance Posts', value: statsData?.segments?.freelance, icon: <WorkOutlineIcon sx={{ fontSize: 18 }} />, color: '#d946ef' },
                                ].map((seg, i) => (
                                    <Stack key={i} direction="row" alignItems="center" spacing={2} sx={{ py: 0.5 }}>
                                        <Box sx={{ color: seg.color }}>{seg.icon}</Box>
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Typography variant="caption" sx={{ fontWeight: 700, color: '#334155' }}>{seg.label}</Typography>
                                            <Box sx={{ width: '100%', height: 4, bgcolor: '#f1f5f9', borderRadius: 1, mt: 0.5 }}>
                                                <Box sx={{ width: `${Math.min(100, (seg.value || 0) * 10)}%`, height: '100%', bgcolor: seg.color, borderRadius: 1 }} />
                                            </Box>
                                        </Box>
                                        <Typography variant="body2" sx={{ fontWeight: 800, color: '#1e293b' }}>{seg.value || 0}</Typography>
                                    </Stack>
                                ))}
                            </Stack>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box >
    );
};

export default AdminDashboard;
