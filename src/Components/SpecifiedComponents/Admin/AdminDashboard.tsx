import { Box, Typography, Button, IconButton, Paper, ListItemButton, ListItemIcon, ListItemText, Avatar, Grid } from '@mui/material';
import {
    Assessment as AssessmentIcon,
    Search as SearchIcon,
    Notifications as NotificationsIcon,
    ExitToApp as ExitToAppIcon,
    DeleteForever as DeleteForeverIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const sections = ['Retail', 'Wholesale', 'Q-Commerce', 'Resale'];

    const handleTabClick = (section: string) => {
        // Navigate to specific dashboards based on selection
        switch (section) {
            case 'Retail': navigate('/admin/retail'); break;
            case 'Wholesale': navigate('/admin/wholesale'); break;
            case 'Q-Commerce': navigate('/admin/quick'); break;
            case 'Resale': navigate('/admin/resale'); break;

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
                        <Button variant="contained" startIcon={<AssessmentIcon />} sx={{ bgcolor: '#000', '&:hover': { bgcolor: '#333' } }}>EXPORT PDF</Button>
                    </Box>

                    {/* Stats Cards */}
                    {/* Stats Cards */}
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        {[
                            { title: 'TOTAL USERS', value: '128,402', growth: '+4.2%', color: '#4caf50' },
                            { title: 'TOTAL SELLERS', value: '12,850', growth: '+8.1%', color: '#4caf50' },
                            { title: 'TOTAL BUYERS', value: '115,552', growth: '+3.4%', color: '#4caf50' },
                            { title: 'USER GROWTH RATE', value: '24.8%', sub: 'OPTIMAL' },
                        ].map((stat, index) => (
                            <Grid size={{ xs: 12, md: 3 }} key={index}>
                                <Paper sx={{ p: 4, borderRadius: 0, height: '100%', border: '1px solid #e0e0e0', boxShadow: 'none' }}>
                                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold', letterSpacing: 1, display: 'block', mb: 2 }}>{stat.title}</Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                                        <Typography variant="h4" sx={{ fontWeight: '900' }}>{stat.value}</Typography>
                                        {stat.growth && <Typography variant="subtitle2" sx={{ color: stat.color, fontWeight: 'bold' }}>{stat.growth}</Typography>}
                                        {stat.sub && <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 'bold', ml: 1 }}>{stat.sub}</Typography>}
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Growth & Distribution Section */}
                    {/* Acquisition Growth Section */}
                    <Box sx={{ mb: 4, bgcolor: 'white', p: 4, border: '1px solid #e0e0e0' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                            <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>ACQUISITION GROWTH</Typography>
                            <Box sx={{ display: 'flex', gap: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#b2f2bb' }} />
                                    <Typography variant="caption" sx={{ fontWeight: 'bold' }}>BUYERS</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'black' }} />
                                    <Typography variant="caption" sx={{ fontWeight: 'bold' }}>SELLERS</Typography>
                                </Box>
                            </Box>
                        </Box>

                        <Box sx={{ height: 350, position: 'relative', width: '100%' }}>
                            <svg viewBox="0 0 800 300" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                                {/* Y-Axis Grid Lines */}
                                {[0, 1, 2, 3, 4].map((i) => (
                                    <line key={i} x1="0" y1={i * 75} x2="800" y2={i * 75} stroke="#f0f0f0" strokeWidth="1" />
                                ))}

                                {/* X-Axis Labels */}
                                {['WEEK 1', 'WEEK 2', 'WEEK 3', 'WEEK 4', 'WEEK 5'].map((label, i) => (
                                    <text key={i} x={i * 200} y="320" fontSize="12" fill="#9e9e9e" fontWeight="bold">{label}</text>
                                ))}

                                {/* Buyers Line (Green) */}
                                <path
                                    d="M0,250 L100,220 L200,250 L300,180 L400,200 L500,130 L600,150 L700,100 L800,80"
                                    fill="none"
                                    stroke="#b2f2bb"
                                    strokeWidth="4"
                                />

                                {/* Sellers Line (Black) */}
                                <path
                                    d="M0,280 L100,260 L200,270 L300,240 L400,250 L500,200 L600,220 L700,180 L800,200"
                                    fill="none"
                                    stroke="black"
                                    strokeWidth="3"
                                />

                                {/* Annotation Line */}
                                <line x1="600" y1="0" x2="600" y2="300" stroke="#e0e0e0" strokeDasharray="4" strokeWidth="1" />

                                {/* Seller Point */}
                                <circle cx="600" cy="220" r="4" fill="black" stroke="white" strokeWidth="2" />
                                {/* Buyer Point */}
                                <circle cx="600" cy="150" r="4" fill="#b2f2bb" stroke="white" strokeWidth="2" />
                            </svg>
                            {/* Annotation Box Overlay */}
                            <Paper
                                elevation={0}
                                sx={{
                                    position: 'absolute',
                                    top: 80,
                                    left: 'calc((600 / 800) * 100%)', // dynamically position based on svg coordinate 600
                                    transform: 'translateX(-50%)',
                                    p: 1.5,
                                    border: '1px solid #e0e0e0',
                                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                                    bgcolor: 'white',
                                    zIndex: 1
                                }}
                            >
                                <Typography variant="caption" sx={{ fontSize: '10px', color: '#9e9e9e', fontWeight: 'bold', display: 'block', mb: 0.5, textTransform: 'uppercase' }}>
                                    Monthly Peak
                                </Typography>
                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', lineHeight: 1 }}>
                                    +12.4k <Box component="span" sx={{ fontSize: '10px', color: '#9e9e9e', fontWeight: 'normal' }}>New</Box>
                                </Typography>
                            </Paper>
                        </Box>
                    </Box>



                    {/* Bottom Section Placeholder to match implicit structure */}


                </Box>
            </Box>
        </Box >
    );
};

export default AdminDashboard;
