import { Box, Typography, Button, IconButton, Paper, List, ListItemButton, ListItemIcon, ListItemText, Avatar, ListItem, Grid } from '@mui/material';
import {
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    Assessment as AssessmentIcon,
    Settings as SettingsIcon,
    Search as SearchIcon,
    Notifications as NotificationsIcon,
    ExitToApp as ExitToAppIcon,
    DeleteForever as DeleteForeverIcon,
    Storefront as StorefrontIcon,
    ShoppingCart as ShoppingCartIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const sections = ['Retail', 'Wholesale', 'Q-Commerce', 'Resale', 'Freelancer'];

    const handleTabClick = (section: string) => {
        // Navigate to specific dashboards based on selection
        switch (section) {
            case 'Retail': navigate('/admin/retail'); break;
            case 'Wholesale': navigate('/admin/wholesale'); break;
            case 'Q-Commerce': navigate('/admin/quick'); break;
            case 'Resale': navigate('/admin/resale'); break;
            case 'Freelancer': navigate('/admin/freelance'); break;
            default: break;
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('isAdminLoggedIn');
        navigate('/admin/login');
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#f8f9fa' }}>
            {/* Sidebar */}
            <Box sx={{ width: 260, bgcolor: '#ffffff', borderRight: '1px solid #e0e0e0', display: 'flex', flexDirection: 'column', p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 5 }}>
                    <Avatar sx={{ bgcolor: '#4caf50', mr: 2 }}>MA</Avatar>
                    <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Master Admin</Typography>
                        <Typography variant="caption" color="text.secondary">GLOBAL OPERATIONS</Typography>
                    </Box>
                </Box>

                <Box sx={{ mb: 4, bgcolor: '#f5f9f5', p: 2, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Current session: <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 'bold' }}>Live</Box></Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>Managing high-scale multi-service operations across 14 territories.</Typography>
                </Box>

                <List component="nav">
                    <ListItemButton sx={{ bgcolor: '#dbfebb', borderRadius: 2, mb: 1, '&:hover': { bgcolor: '#c5e8a5' } }}>
                        <ListItemIcon><DashboardIcon sx={{ color: '#000' }} /></ListItemIcon>
                        <ListItemText primary="Overview" primaryTypographyProps={{ fontWeight: 'bold' }} />
                    </ListItemButton>
                    <ListItemButton sx={{ mb: 1 }}>
                        <ListItemIcon><PeopleIcon /></ListItemIcon>
                        <ListItemText primary="User Management" />
                    </ListItemButton>
                    <ListItemButton sx={{ mb: 1 }}>
                        <ListItemIcon><AssessmentIcon /></ListItemIcon>
                        <ListItemText primary="Global Reports" />
                    </ListItemButton>
                    <ListItemButton sx={{ mb: 1 }}>
                        <ListItemIcon><SettingsIcon /></ListItemIcon>
                        <ListItemText primary="System Config" />
                    </ListItemButton>
                </List>

                <Box sx={{ mt: 'auto' }}>
                    <ListItemButton sx={{ mb: 1 }} onClick={handleLogout}>
                        <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                    <Button
                        variant="contained"
                        color="error"
                        fullWidth
                        startIcon={<DeleteForeverIcon />}
                        sx={{ bgcolor: '#ffebee', color: '#d32f2f', '&:hover': { bgcolor: '#ffcdd2' }, textTransform: 'none', justifyContent: 'flex-start', px: 2 }}
                    >
                        DELETE ACCOUNT
                    </Button>
                </Box>
            </Box>

            {/* Main Content */}
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                {/* Header */}
                <Box sx={{ height: 64, bgcolor: '#ffffff', borderBottom: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', px: 4, justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', gap: 4 }}>
                        {sections.map(section => (
                            <Typography
                                key={section}
                                variant="body2"
                                sx={{
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    color: 'text.secondary',
                                    position: 'relative',
                                    '&:hover': { color: '#000' }
                                }}
                                onClick={() => handleTabClick(section)}
                            >
                                {section}
                            </Typography>
                        ))}
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <IconButton><SearchIcon /></IconButton>
                        <IconButton><NotificationsIcon /></IconButton>
                    </Box>
                </Box>

                {/* Dashboard Content */}
                <Box sx={{ flexGrow: 1, p: 4, overflow: 'auto' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                        <Box>
                            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>User Overview <Box component="span" sx={{ color: '#b2f2bb' }}>V100</Box></Typography>
                            <Typography variant="body1" color="text.secondary">Aggregated data across all global service sectors</Typography>
                        </Box>
                        <Button variant="contained" startIcon={<AssessmentIcon />} sx={{ bgcolor: '#000', '&:hover': { bgcolor: '#333' } }}>Export PDF</Button>
                    </Box>

                    {/* Stats Cards */}
                    {/* Stats Cards */}
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 4 }}>
                        {[
                            { title: 'TOTAL USERS', value: '1.2M', growth: '12%', color: '#b2f2bb', icon: <PeopleIcon /> },
                            { title: 'VERIFIED SELLERS', value: '45K', growth: '5%', color: '#ffecb3', icon: <StorefrontIcon /> },
                            { title: 'ACTIVE BUYERS', value: '1.15M', growth: '15%', color: '#ffe0b2', icon: <ShoppingCartIcon /> },
                        ].map((stat, index) => (
                            <Box key={index} sx={{ flex: 1 }}>
                                <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }} elevation={0}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 'bold' }}>{stat.title}</Typography>
                                        <Box sx={{ bgcolor: '#f5f5f5', p: 0.5, borderRadius: 1 }}>{stat.icon}</Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                                        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>{stat.value}</Typography>
                                        <Typography variant="subtitle2" sx={{ color: '#4caf50' }}>↑{stat.growth}</Typography>
                                    </Box>
                                </Paper>
                            </Box>
                        ))}
                    </Box>

                    {/* Growth & Distribution Section */}
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        <Grid size={{ xs: 12, md: 8 }}>
                            <Paper sx={{ p: 4, borderRadius: 3, height: '100%' }} elevation={0}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                                    <Box>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Growth Trend</Typography>
                                        <Typography variant="caption" color="text.secondary">New Users & Sellers (Last 12 Months)</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        {['DAILY', 'MONTHLY', 'YEARLY'].map(period => (
                                            <Button key={period} size="small" variant={period === 'MONTHLY' ? 'contained' : 'outlined'} sx={{ borderRadius: 2, color: period === 'MONTHLY' ? '#000' : 'text.secondary', bgcolor: period === 'MONTHLY' ? '#cce8a8' : 'transparent', border: 'none', fontWeight: 'bold' }}>{period}</Button>
                                        ))}
                                    </Box>
                                </Box>

                                {/* Mock Line Chart Area */}
                                <Box sx={{ height: 250, bgcolor: '#fcfcfc', borderRadius: 2, position: 'relative', display: 'flex', alignItems: 'flex-end', pb: 2, px: 2, border: '1px dashed #e0e0e0' }}>
                                    <svg viewBox="0 0 100 20" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                                        {/* Grid lines */}
                                        <line x1="0" y1="5" x2="100" y2="5" stroke="#f0f0f0" strokeWidth="0.5" />
                                        <line x1="0" y1="10" x2="100" y2="10" stroke="#f0f0f0" strokeWidth="0.5" />
                                        <line x1="0" y1="15" x2="100" y2="15" stroke="#f0f0f0" strokeWidth="0.5" />

                                        {/* Data Path */}
                                        <path d="M0,15 C10,14 20,16 30,12 S50,8 60,9 S80,4 100,5" fill="none" stroke="#4caf50" strokeWidth="1.5" />
                                        <path d="M0,15 C10,14 20,16 30,12 S50,8 60,9 S80,4 100,5 L100,20 L0,20 Z" fill="linear-gradient(to bottom, #e8f5e9, #ffffff)" opacity="0.6" />

                                        {/* Points */}
                                        <circle cx="30" cy="12" r="1.5" fill="#fff" stroke="#4caf50" strokeWidth="1" />
                                        <circle cx="60" cy="9" r="1.5" fill="#fff" stroke="#4caf50" strokeWidth="1" />
                                        <circle cx="100" cy="5" r="1.5" fill="#fff" stroke="#4caf50" strokeWidth="1" />
                                    </svg>
                                    <Paper sx={{ position: 'absolute', top: '15%', left: '55%', p: 1.5, bgcolor: '#212121', color: '#fff', borderRadius: 2, boxShadow: 3 }}>
                                        <Typography variant="caption" sx={{ color: '#b2dfdb', display: 'block' }}>PEAK ACTIVITY</Typography>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>+12.5% Growth</Typography>
                                    </Paper>
                                </Box>
                            </Paper>
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <Paper sx={{ p: 4, borderRadius: 3, height: '100%' }} elevation={0}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>User Segments</Typography>
                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 4 }}>Distribution across platform roles</Typography>

                                <Box sx={{ position: 'relative', width: 200, height: 200, mx: 'auto', mb: 4 }}>
                                    {/* CSS Conic Gradient Donut Chart */}
                                    <Box sx={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '50%',
                                        background: 'conic-gradient(#ffe0b2 0% 60%, #ffecb3 60% 85%, #b2f2bb 85% 100%)',
                                        position: 'relative',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Box sx={{ width: '70%', height: '70%', bgcolor: '#fff', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>2.4M</Typography>
                                            <Typography variant="caption" color="text.secondary">Total Entities</Typography>
                                        </Box>
                                    </Box>
                                </Box>

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ffe0b2' }} />
                                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Buyers</Typography>
                                        </Box>
                                        <Typography variant="body2">60%</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ffecb3' }} />
                                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Sellers</Typography>
                                        </Box>
                                        <Typography variant="body2">25%</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#b2f2bb' }} />
                                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Others</Typography>
                                        </Box>
                                        <Typography variant="body2">15%</Typography>
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>

                    <Box sx={{ display: 'flex', width: '100%', mb: 4, pt: 2, px: 2 }}>
                        {[
                            { label: 'AVG. ENGAGEMENT', value: '24m 12s' },
                            { label: 'CHURN RATE', value: '2.1%', color: 'error.main' },
                            { label: 'CONVERSION', value: '8.4%' },
                            { label: 'MARKET SHARE', value: '64.5%' },
                        ].map((metric, i) => (
                            <Box key={i} sx={{ width: '25%', textAlign: 'center', borderRight: i !== 3 ? '1px solid #e0e0e0' : 'none' }}>
                                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>{metric.label}</Typography>
                                <Typography variant="h5" sx={{ fontWeight: 'bold', color: metric.color || 'text.primary', mt: 1 }}>{metric.value}</Typography>
                            </Box>
                        ))}
                    </Box>

                    {/* Bottom Section: System Health & Audit Log */}
                    {/* Bottom Section: System Health & Audit Log */}
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                        <Box sx={{ flex: 1 }}>
                            <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }} elevation={0}>
                                <Typography variant="overline" sx={{ fontWeight: 'bold', color: 'text.secondary', display: 'block', mb: 2 }}>⚡ SYSTEM HEALTH</Typography>
                                <Box sx={{ mb: 2, p: 2, border: '1px solid #f0f0f0', borderRadius: 2, display: 'flex', alignItems: 'center' }}>
                                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#4caf50', mr: 2 }} />
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography variant="subtitle2">All Services Operational</Typography>
                                        <Typography variant="caption" color="text.secondary">Latency: 24ms across 8 clusters</Typography>
                                    </Box>
                                    <Typography variant="caption" color="text.secondary">99.9% Uptime</Typography>
                                </Box>
                                <Box sx={{ p: 2, border: '1px solid #f0f0f0', borderRadius: 2, display: 'flex', alignItems: 'center' }}>
                                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#cddc39', mr: 2 }} />
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography variant="subtitle2">Global Database Sync</Typography>
                                        <Typography variant="caption" color="text.secondary">Completed 4 minutes ago</Typography>
                                    </Box>
                                    <Typography variant="caption" color="text.secondary">SUCCESS</Typography>
                                </Box>
                            </Paper>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }} elevation={0}>
                                <Typography variant="overline" sx={{ fontWeight: 'bold', color: 'text.secondary', display: 'block', mb: 2 }}>⏱ RECENT AUDIT LOG</Typography>
                                <List dense>
                                    {[
                                        { action: 'New seller approved: UrbanBazaar', time: '14:22:01' },
                                        { action: 'Policy update: Freelancer Terms v2.4', time: '13:10:45', color: '#cddc39' },
                                        { action: 'Wholesale server spike: 2.4x traffic', time: '11:05:12', color: '#ff5252' },
                                    ].map((log, i) => (
                                        <ListItem key={i} sx={{ borderBottom: '1px solid #f5f5f5', py: 1.5 }}>
                                            <ListItemText
                                                primary={<Typography variant="body2" sx={{ color: log.color ? log.color : 'text.primary', fontWeight: log.color ? 'bold' : 'normal' }}>{log.action}</Typography>}
                                            />
                                            <Typography variant="caption" color="text.secondary">{log.time}</Typography>
                                        </ListItem>
                                    ))}
                                </List>
                            </Paper>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default AdminDashboard;
