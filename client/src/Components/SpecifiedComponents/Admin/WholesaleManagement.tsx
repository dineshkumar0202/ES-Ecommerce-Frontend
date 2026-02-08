import { Box, Typography, Paper, Stack, List, ListItemButton, ListItemIcon, ListItemText, Grid } from '@mui/material';
import {
    Dashboard as DashboardIcon,
    Store as StoreIcon,
    Warehouse as WarehouseIcon,
    FlashOn as FlashOnIcon,
    Autorenew as AutorenewIcon,
    WorkOutline as WorkOutlineIcon,
    ExitToApp as ExitToAppIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const WholesaleManagement = () => {
    const navigate = useNavigate();

    const menuItems = [
        { name: 'Overview', icon: <DashboardIcon />, path: '/admin/dashboard' },
        { name: 'Retail', icon: <StoreIcon />, path: '/admin/retail' },
        { name: 'Wholesale', icon: <WarehouseIcon />, path: '/admin/wholesale', active: true },
        { name: 'Q-Commerce', icon: <FlashOnIcon />, path: '/admin/quick' },
        { name: 'Resale', icon: <AutorenewIcon />, path: '/admin/resale' },
        { name: 'Freelance', icon: <WorkOutlineIcon />, path: '/admin/freelance' },
    ];

    const products = [
        { id: 1, name: 'Neo-Tech Quartz', price: '$12.50/UNIT', minOrder: 'MIN. ORDER: 50 UNITS', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=200' },
        { id: 2, name: 'Aural Studio Gen-X', price: '$45.00/UNIT', minOrder: 'MIN. ORDER: 20 UNITS', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=200' },
        { id: 3, name: 'InstaSnap Retro 8', price: '$28.20/UNIT', minOrder: 'MIN. ORDER: 40 UNITS', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=200' },
        { id: 4, name: 'Velocity Runner X', price: '$18.90/UNIT', minOrder: 'MIN. ORDER: 100 UNITS', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=200' },
        { id: 5, name: 'ClickPro Silent', price: '$5.40/UNIT', minOrder: 'MIN. ORDER: 250 UNITS', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=200' },
        { id: 6, name: 'TabCore 10" Pro', price: '$112.00/UNIT', minOrder: 'MIN. ORDER: 10 UNITS', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=200' },
        { id: 7, name: 'Eclipse Shades', price: '$9.99/UNIT', minOrder: 'MIN. ORDER: 80 UNITS', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=200' },
        { id: 8, name: 'Canvas Classic Hi', price: '$14.50/UNIT', minOrder: 'MIN. ORDER: 80 UNITS', image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=200' },
    ];

    return (
        <Box sx={{ display: 'flex', height: '100vh', bgcolor: 'white' }}>
            {/* Sidebar */}
            <Box sx={{ width: 260, bgcolor: 'white', borderRight: '1px solid #e2e8f0', p: 3, display: 'flex', flexDirection: 'column', height: '100vh', position: 'sticky', top: 0 }}>
                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 5, px: 2 }}>
                    <Box sx={{ bgcolor: '#bef264', p: 0.5, borderRadius: 1, display: 'flex' }}>
                        <WarehouseIcon sx={{ color: 'black' }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>wholesale</Typography>
                </Stack>

                <List disablePadding>
                    {menuItems.map((item) => (
                        <ListItemButton
                            key={item.name}
                            onClick={() => item.path !== '/admin/wholesale' && navigate(item.path)}
                            sx={{
                                mb: 1,
                                borderRadius: 3,
                                bgcolor: item.active ? '#bef264' : 'transparent',
                                color: item.active ? 'black' : '#64748b',
                                '&:hover': { bgcolor: item.active ? '#bef264' : '#f1f5f9' },
                                py: 1.5
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40, color: item.active ? 'black' : '#94a3b8' }}>
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
                    <Stack onClick={() => { localStorage.removeItem('isAdminLoggedIn'); navigate('/admin/login'); }} direction="row" alignItems="center" spacing={2} sx={{ px: 2, cursor: 'pointer', color: '#ef4444' }}>
                        <ExitToAppIcon fontSize="small" />
                        <Typography variant="body2" fontWeight={600}>Leave</Typography>
                    </Stack>
                </Box>
            </Box>

            {/* Main Content */}
            <Box sx={{ flexGrow: 1, p: 4, overflow: 'auto', bgcolor: 'white' }}>
                {/* Product Pool Section */}
                <Box sx={{ mb: 4 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: '#94a3b8', letterSpacing: 1 }}>PRODUCT POOL</Typography>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', cursor: 'pointer' }}>View All</Typography>
                    </Stack>

                    <Grid container spacing={3}>
                        {products.map((product) => (
                            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={product.id}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 2,
                                        borderRadius: 3,
                                        bgcolor: 'white',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        transition: 'all 0.2s',
                                        '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }
                                    }}
                                >
                                    <Box sx={{ position: 'relative', mb: 2, pt: '100%', borderRadius: 2, overflow: 'hidden', bgcolor: '#f1f5f9' }}>
                                        <Box
                                            component="img"
                                            src={product.image}
                                            alt={product.name}
                                            sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: 10,
                                                right: 10,
                                                bgcolor: '#bef264',
                                                px: 1,
                                                py: 0.5,
                                                borderRadius: 1,
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                            }}
                                        >
                                            <Typography variant="caption" sx={{ fontWeight: 800, fontSize: '0.6rem', color: 'black' }}>
                                                {product.price}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 0.5 }}>{product.name}</Typography>
                                    <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.65rem', fontWeight: 600 }}>{product.minOrder}</Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Wholesale Trends Section */}
                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        borderRadius: 3,
                        bgcolor: 'white'
                    }}
                >
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 4 }}>
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5 }}>Wholesale Trends</Typography>
                            <Typography variant="body2" sx={{ color: '#94a3b8' }}>Volume distribution over the last 12 months</Typography>
                        </Box>
                        <Box sx={{ bgcolor: '#f8fafc', px: 1.5, py: 0.5, borderRadius: 1 }}>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569' }}>2023-2024</Typography>
                        </Box>
                    </Stack>

                    <Box sx={{ height: 250, width: '100%', position: 'relative', mb: 4 }}>
                        <svg viewBox="0 0 1000 250" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                            <defs>
                                <linearGradient id="wholesaleGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#bef264" stopOpacity="0.4" />
                                    <stop offset="100%" stopColor="#bef264" stopOpacity="0" />
                                </linearGradient>
                            </defs>

                            {/* Grid Lines */}
                            {[0, 1, 2, 3].map((i) => (
                                <line key={i} x1="0" y1={i * 80} x2="1000" y2={i * 80} stroke="#f1f5f9" strokeWidth="1" />
                            ))}

                            {/* Smooth Chart Curve */}
                            <path
                                d="M0,200 C150,190 250,140 350,100 S600,60 700,90 S900,100 1000,120 V250 H0 Z"
                                fill="url(#wholesaleGradient)"
                            />
                            <path
                                d="M0,200 C150,190 250,140 350,100 S600,60 700,90 S900,100 1000,120"
                                fill="none"
                                stroke="#bef264"
                                strokeWidth="4"
                                strokeLinecap="round"
                            />

                            {/* X-Axis Labels */}
                            {['JAN', 'MAR', 'MAY', 'JUL', 'SEP', 'NOV'].map((label, i) => (
                                <text key={i} x={50 + i * 180} y="270" fontSize="10" fill="#94a3b8" fontWeight="600" textAnchor="middle">{label}</text>
                            ))}
                        </svg>
                    </Box>

                    <Stack direction="row" justifyContent="space-between" spacing={4}>
                        <Box>
                            <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, letterSpacing: 0.5, display: 'block', mb: 0.5 }}>TOTAL VOLUME</Typography>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Typography variant="h5" sx={{ fontWeight: 800 }}>14.2M</Typography>
                                <Typography variant="caption" sx={{ color: '#84cc16', fontWeight: 700 }}>+12%</Typography>
                            </Stack>
                        </Box>
                        <Box>
                            <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, letterSpacing: 0.5, display: 'block', mb: 0.5 }}>ACTIVE VENDORS</Typography>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Typography variant="h5" sx={{ fontWeight: 800 }}>1,482</Typography>
                                <Typography variant="caption" sx={{ color: '#84cc16', fontWeight: 700 }}>+4.5%</Typography>
                            </Stack>
                        </Box>
                        <Box>
                            <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, letterSpacing: 0.5, display: 'block', mb: 0.5 }}>FULFILLMENT RATE</Typography>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Typography variant="h5" sx={{ fontWeight: 800 }}>99.4%</Typography>
                                <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700 }}>Stable</Typography>
                            </Stack>
                        </Box>
                        {/* Spacer to push content left if needed, or match layout */}
                        <Box sx={{ flexGrow: 1 }} />
                    </Stack>
                </Paper>
            </Box>
        </Box>
    );
};

export default WholesaleManagement;
