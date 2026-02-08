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

const AdminDashboard = () => {
    const navigate = useNavigate();

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
            value: '12,543',
            growth: '+12%',
            icon: <GroupIcon sx={{ color: 'black', fontSize: 28 }} />,
            bgColor: '#bef264'
        },
        {
            title: 'Total Order',
            value: '1,280',
            growth: '+8%',
            icon: <ShoppingBagIcon sx={{ color: 'black', fontSize: 28 }} />,
            bgColor: '#bef264'
        },
        {
            title: 'Total Selling Amount',
            value: '$45,230',
            growth: '+24%',
            icon: <AttachMoneyIcon sx={{ color: 'black', fontSize: 28 }} />,
            bgColor: '#bef264'
        }
    ];

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'white' }}>
            {/* Sidebar */}
            <Box sx={{ width: 260, bgcolor: 'white', borderRight: '1px solid #e2e8f0', p: 3, display: 'flex', flexDirection: 'column', height: '100vh', position: 'sticky', top: 0 }}>
                {/* Logo Area / Title */}
                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 5, px: 2 }}>
                    {/* Placeholder for logo or app name if needed, matching other pages */}
                    {/* <Box sx={{ bgcolor: '#bef264', p: 0.5, borderRadius: 1, display: 'flex' }}>
                        <DashboardIcon sx={{ color: 'black' }} />
                    </Box> */}
                    {/* The image shows just the button "Overview", effectively serving as the header in this context or just the first item. 
                        We'll standardise with the other pages' header style if we want consistency, but let's stick to the list for now. */}
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
                    <Stack onClick={() => { localStorage.removeItem('isAdminLoggedIn'); navigate('/admin/login'); }} direction="row" alignItems="center" spacing={2} sx={{ px: 2, cursor: 'pointer', color: '#ef4444' }}>
                        <ExitToAppIcon fontSize="small" />
                        <Typography variant="body2" fontWeight={600}>Leave</Typography>
                    </Stack>
                </Box>
            </Box>

            {/* Main Content */}
            <Box sx={{ flexGrow: 1, p: 4, overflow: 'auto', bgcolor: '#f8fafc' }}>
                {/* Header (Optional, but good for navigation/context) */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 800, visibility: 'hidden' }}>Overview</Typography> {/* Hidden title to maintain spacing alignment */}
                    <Stack direction="row" spacing={2}>
                        <IconButton sx={{ bgcolor: 'white' }}><SearchIcon /></IconButton>
                        <IconButton sx={{ bgcolor: 'white' }}><NotificationsIcon /></IconButton>
                        <IconButton sx={{ bgcolor: 'white' }}><AccountCircleIcon /></IconButton>
                    </Stack>
                </Stack>

                {/* Stats Cards */}
                <Grid container spacing={4} sx={{ mb: 5 }}>
                    {stats.map((stat, index) => (
                        <Grid size={{ xs: 12, md: 4 }} key={index}>
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
                                <Box sx={{
                                    bgcolor: '#f7fee7', // very light lime
                                    p: 1.5,
                                    borderRadius: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    {stat.icon}
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                {/* Performance Analytics Chart */}
                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        borderRadius: 4,
                        bgcolor: 'white',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
                    }}
                >
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 4 }}>
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 800 }}>Performance Analytics</Typography>
                            <Typography variant="body2" sx={{ color: '#94a3b8' }}>Monthly overview of sales and engagement</Typography>
                        </Box>
                        <Stack direction="row" spacing={1} sx={{ bgcolor: '#f1f5f9', p: 0.5, borderRadius: 2 }}>
                            <ButtonBase label="Day" />
                            <ButtonBase label="Month" active />
                            <ButtonBase label="Year" />
                        </Stack>
                    </Stack>

                    <Box sx={{ height: 350, width: '100%', position: 'relative' }}>
                        <svg viewBox="0 0 1000 350" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                            <defs>
                                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#bef264" stopOpacity="0.6" />
                                    <stop offset="100%" stopColor="#bef264" stopOpacity="0" />
                                </linearGradient>
                            </defs>

                            {/* Grid Lines */}
                            {[0, 1, 2, 3].map((i) => (
                                <line key={i} x1="0" y1={100 + i * 80} x2="1000" y2={100 + i * 80} stroke="#f8fafc" strokeWidth="2" />
                            ))}

                            {/* Chart Area */}
                            <path
                                d="M0,280 C150,260 250,200 400,180 C550,160 650,100 800,90 S1000,100 1000,100 V350 H0 Z"
                                fill="url(#chartGradient)"
                            />

                            {/* Chart Line */}
                            <path
                                d="M0,280 C150,260 250,200 400,180 C550,160 650,100 800,90 S1000,100 1000,100"
                                fill="none"
                                stroke="#bef264"
                                strokeWidth="6"
                                strokeLinecap="round"
                            />

                            {/* X-Axis Labels */}
                            {['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL'].map((label, i) => (
                                <text key={i} x={i * 150 + 20} y="340" fontSize="12" fill="#94a3b8" fontWeight="600">{label}</text>
                            ))}
                        </svg>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
};

// Simple helper for the toggle buttons
const ButtonBase = ({ label, active = false }: { label: string, active?: boolean }) => (
    <Box sx={{
        px: 2,
        py: 0.5,
        borderRadius: 1.5,
        bgcolor: active ? '#bef264' : 'transparent',
        cursor: 'pointer',
        transition: 'all 0.2s'
    }}>
        <Typography variant="caption" sx={{ fontWeight: 700, color: active ? 'black' : '#64748b' }}>{label}</Typography>
    </Box>
);

export default AdminDashboard;
