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

const ResaleManagement = () => {
    const navigate = useNavigate();

    const menuItems = [
        { name: 'Overview', icon: <DashboardIcon />, path: '/admin/dashboard' },
        { name: 'Retail', icon: <StoreIcon />, path: '/admin/retail' },
        { name: 'Wholesale', icon: <WarehouseIcon />, path: '/admin/wholesale' },
        { name: 'Q-Commerce', icon: <FlashOnIcon />, path: '/admin/quick' },
        { name: 'Resale', icon: <AutorenewIcon />, path: '/admin/resale', active: true },
        { name: 'Freelance', icon: <WorkOutlineIcon />, path: '/admin/freelance' },
    ];

    const resaleProducts = [
        { id: 1, name: 'Vintage Polaroid', price: '$45.00', condition: 'Condition: Good', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=200' },
        { id: 2, name: 'Leather Satchel', price: '$85.00', condition: 'Condition: Like New', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=200' },
        { id: 3, name: 'Mechanical Watch', price: '$120.00', condition: 'Condition: Fair', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=200' },
        { id: 4, name: 'Denim Jacket', price: '$35.00', condition: 'Condition: Good', image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=200' },
        { id: 5, name: 'Classic Ray-Bans', price: '$60.00', condition: 'Condition: Like New', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=200' },
        { id: 6, name: 'Gaming Console', price: '$200.00', condition: 'Condition: Good', image: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?auto=format&fit=crop&q=80&w=200' },
        { id: 7, name: 'Office Chair', price: '$90.00', condition: 'Condition: Like New', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=200' },
        { id: 8, name: 'Typewriter', price: '$150.00', condition: 'Condition: Vintage', image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&q=80&w=200' },
    ];

    return (
        <Box sx={{ display: 'flex', height: '100vh', bgcolor: 'white' }}>
            {/* Sidebar */}
            <Box sx={{ width: 260, bgcolor: 'white', borderRight: '1px solid #e2e8f0', p: 3, display: 'flex', flexDirection: 'column', height: '100vh', position: 'sticky', top: 0 }}>
                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 5, px: 2 }}>
                    <Box sx={{ bgcolor: '#bef264', p: 0.5, borderRadius: 1, display: 'flex' }}>
                        <AutorenewIcon sx={{ color: 'black' }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>resale</Typography>
                </Stack>

                <List disablePadding>
                    {menuItems.map((item) => (
                        <ListItemButton
                            key={item.name}
                            onClick={() => item.path !== '/admin/resale' && navigate(item.path)}
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
                        <Typography variant="caption" sx={{ fontWeight: 700, color: '#94a3b8', letterSpacing: 1 }}>RESALE LISTINGS</Typography>
                        <Stack direction="row" spacing={2}>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', cursor: 'pointer' }}>Filter</Typography>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', cursor: 'pointer' }}>View All</Typography>
                        </Stack>
                    </Stack>

                    <Grid container spacing={3}>
                        {resaleProducts.map((product) => (
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
                                    <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.65rem', fontWeight: 600 }}>{product.condition}</Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Resale Trends Section */}
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
                            <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5 }}>Resale Market Trends</Typography>
                            <Typography variant="body2" sx={{ color: '#94a3b8' }}>Transaction volume over the last 12 months</Typography>
                        </Box>
                        <Box sx={{ bgcolor: '#f8fafc', px: 1.5, py: 0.5, borderRadius: 1 }}>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569' }}>2023-2024</Typography>
                        </Box>
                    </Stack>

                    <Box sx={{ height: 250, width: '100%', position: 'relative', mb: 4 }}>
                        <svg viewBox="0 0 1000 250" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                            <defs>
                                <linearGradient id="resaleGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#bef264" stopOpacity="0.4" />
                                    <stop offset="100%" stopColor="#bef264" stopOpacity="0" />
                                </linearGradient>
                            </defs>

                            {/* Grid Lines */}
                            {[0, 1, 2, 3].map((i) => (
                                <line key={i} x1="0" y1={i * 80} x2="1000" y2={i * 80} stroke="#f1f5f9" strokeWidth="1" />
                            ))}

                            {/* Smooth Chart Curve - Slightly different shape than wholesale for variety */}
                            <path
                                d="M0,180 C100,180 200,120 300,140 S500,80 600,60 S800,90 1000,70 V250 H0 Z"
                                fill="url(#resaleGradient)"
                            />
                            <path
                                d="M0,180 C100,180 200,120 300,140 S500,80 600,60 S800,90 1000,70"
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
                            <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, letterSpacing: 0.5, display: 'block', mb: 0.5 }}>TOTAL LISTINGS</Typography>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Typography variant="h5" sx={{ fontWeight: 800 }}>8.4K</Typography>
                                <Typography variant="caption" sx={{ color: '#84cc16', fontWeight: 700 }}>+8%</Typography>
                            </Stack>
                        </Box>
                        <Box>
                            <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, letterSpacing: 0.5, display: 'block', mb: 0.5 }}>AVG. RESALE PRICE</Typography>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Typography variant="h5" sx={{ fontWeight: 800 }}>$65.00</Typography>
                                <Typography variant="caption" sx={{ color: '#84cc16', fontWeight: 700 }}>+2.5%</Typography>
                            </Stack>
                        </Box>
                        <Box>
                            <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, letterSpacing: 0.5, display: 'block', mb: 0.5 }}>USER RETENTION</Typography>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Typography variant="h5" sx={{ fontWeight: 800 }}>82.1%</Typography>
                                <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700 }}>Stable</Typography>
                            </Stack>
                        </Box>
                        {/* Spacer */}
                        <Box sx={{ flexGrow: 1 }} />
                    </Stack>
                </Paper>
            </Box>
        </Box>
    );
};

export default ResaleManagement;
