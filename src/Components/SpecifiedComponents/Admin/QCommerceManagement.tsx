
import { Box, Typography, Paper, Grid, Button, IconButton, TextField, InputAdornment, Avatar, Chip, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, LinearProgress } from '@mui/material';
import {
    Search as SearchIcon,
    Notifications as NotificationsIcon,
    Settings as SettingsIcon,
    Dashboard as DashboardIcon,
    Inventory as InventoryIcon,
    DirectionsBike as DirectionsBikeIcon,
    Timeline as TimelineIcon,
    Help as HelpIcon,
    MoreVert as MoreVertIcon,
    LocalShipping as LocalShippingIcon,
    CheckCircle as CheckCircleIcon,
    AccessTime as AccessTimeIcon,
    ShoppingBag as ShoppingBagIcon,
    Map as MapIcon,
    FlashOn as FlashOnIcon,
    ChevronLeft,
    ChevronRight
} from '@mui/icons-material';

const QCommerceManagement = () => {
    return (
        <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#f4f4f4' }}>
            {/* Sidebar */}
            <Box sx={{ width: 240, bgcolor: '#ffffff', borderRight: '1px solid #e0e0e0', display: 'flex', flexDirection: 'column', p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, px: 1 }}>
                    <Box sx={{ bgcolor: '#ccff00', p: 0.5, borderRadius: 1, mr: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FlashOnIcon sx={{ color: '#000' }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Q-Admin</Typography>
                </Box>

                <Box sx={{ mb: 3, pl: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Management V103</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#ccff00' }} />
                        <Typography variant="caption" color="text.secondary">CENTRAL WAREHOUSE</Typography>
                    </Box>
                </Box>

                <List component="nav">
                    <ListItemButton sx={{ bgcolor: '#ccff00', borderRadius: 2, mb: 1, color: '#000' }}>
                        <ListItemIcon><DashboardIcon sx={{ color: '#000' }} /></ListItemIcon>
                        <ListItemText primary="Dashboard" primaryTypographyProps={{ fontWeight: 'bold' }} />
                    </ListItemButton>
                    <ListItemButton sx={{ mb: 1 }}>
                        <ListItemIcon><InventoryIcon /></ListItemIcon>
                        <ListItemText primary="Inventory" />
                    </ListItemButton>
                    <ListItemButton sx={{ mb: 1 }}>
                        <ListItemIcon><LocalShippingIcon /></ListItemIcon>
                        <ListItemText primary="Couriers" />
                    </ListItemButton>
                    <ListItemButton sx={{ mb: 1 }}>
                        <ListItemIcon><TimelineIcon /></ListItemIcon>
                        <ListItemText primary="Analytics" />
                    </ListItemButton>
                    <ListItemButton sx={{ mb: 1 }}>
                        <ListItemIcon><DirectionsBikeIcon /></ListItemIcon>
                        <ListItemText primary="Riders Fleet" />
                    </ListItemButton>
                </List>

                <Box sx={{ mt: 4 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ pl: 2, mb: 1, display: 'block', fontWeight: 'bold' }}>SUPPORT</Typography>
                    <ListItemButton>
                        <ListItemIcon><HelpIcon /></ListItemIcon>
                        <ListItemText primary="Help Center" />
                    </ListItemButton>
                </Box>

                <Box sx={{ mt: 'auto', p: 2, bgcolor: '#f9f9f9', borderRadius: 2 }}>
                    <Typography variant="caption" display="block" color="text.secondary" gutterBottom>Fleet Load</Typography>
                    <LinearProgress variant="buffer" value={78} valueBuffer={100} sx={{ height: 6, borderRadius: 3, bgcolor: '#e0e0e0', '& .MuiLinearProgress-bar': { bgcolor: '#ccff00' } }} />
                    <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 1 }}>78% capacity utilized</Typography>
                </Box>
            </Box>

            {/* Main Content */}
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                {/* Header */}
                <Box sx={{ height: 64, bgcolor: '#ffffff', borderBottom: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', px: 3, justifyContent: 'space-between' }}>
                    <TextField
                        size="small"
                        placeholder="Search orders, riders, or inventory"
                        InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon color="disabled" /></InputAdornment> }}
                        sx={{ width: 350, bgcolor: '#f4f6f8', borderRadius: 1, '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton><NotificationsIcon /></IconButton>
                        <IconButton><SettingsIcon /></IconButton>
                        <Divider orientation="vertical" flexItem variant="middle" />
                        <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', lineHeight: 1 }}>Alex Morgan</Typography>
                            <Typography variant="caption" color="text.secondary">Ops Manager</Typography>
                        </Box>
                        <Avatar sx={{ bgcolor: '#aed581' }} src="/path/to/image.jpg" />
                    </Box>
                </Box>

                {/* Dashboard Content */}
                <Box sx={{ flexGrow: 1, p: 3, overflow: 'auto' }}>

                    {/* Stats Cards */}
                    <Grid container spacing={3} sx={{ mb: 3 }}>
                        <Grid size={{ xs: 12, md: 3 }}>
                            <Paper sx={{ p: 2, borderRadius: 2, height: '100%', position: 'relative' }} elevation={0}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2" color="text.secondary">Total Orders</Typography>
                                    <ShoppingBagIcon sx={{ color: '#ccff00' }} />
                                </Box>
                                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>1,284 <Chip label="+12.4%" size="small" sx={{ bgcolor: '#ecfce5', color: '#2e7d32', height: 20, fontSize: '0.65rem' }} /></Typography>
                                <Typography variant="caption" color="text.secondary">v.s. last 24h</Typography>
                            </Paper>
                        </Grid>
                        <Grid size={{ xs: 12, md: 3 }}>
                            <Paper sx={{ p: 2, borderRadius: 2, height: '100%' }} elevation={0}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2" color="text.secondary">Pending/On-Process</Typography>
                                    <AccessTimeIcon color="warning" />
                                </Box>
                                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>42 <Chip label="High Volume" size="small" sx={{ bgcolor: '#ffebee', color: '#d32f2f', height: 20, fontSize: '0.65rem' }} /></Typography>
                                <Typography variant="caption" color="text.secondary">Avg. pick time: 4.2 min</Typography>
                            </Paper>
                        </Grid>
                        <Grid size={{ xs: 12, md: 3 }}>
                            <Paper sx={{ p: 2, borderRadius: 2, height: '100%' }} elevation={0}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2" color="text.secondary">Confirmed Orders</Typography>
                                    <CheckCircleIcon color="primary" />
                                </Box>
                                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>850 <Chip label="Ready" size="small" sx={{ bgcolor: '#e3f2fd', color: '#1976d2', height: 20, fontSize: '0.65rem' }} /></Typography>
                                <Typography variant="caption" color="text.secondary">Dispatched: 712</Typography>
                            </Paper>
                        </Grid>
                        <Grid size={{ xs: 12, md: 3 }}>
                            <Paper sx={{ p: 2, borderRadius: 2, height: '100%' }} elevation={0}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2" color="text.secondary">Wishlist Items</Typography>
                                    <Box component="span" sx={{ color: '#e91e63' }}>♥</Box>
                                </Box>
                                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>3,102</Typography>
                                <Typography variant="caption" color="text.secondary">Top Item: <Box component="span" sx={{ fontWeight: 'bold' }}>Energy Drink</Box></Typography>
                            </Paper>
                        </Grid>
                    </Grid>

                    {/* Order Tracker */}
                    <Paper sx={{ p: 0, borderRadius: 2, mb: 3 }} elevation={0}>
                        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f0f0f0' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Live Order Tracker</Typography>
                                <Chip label="● REAL-TIME" size="small" sx={{ bgcolor: '#f9fbe7', color: '#827717', border: '1px solid #cddc39', fontSize: '0.65rem', fontWeight: 'bold', height: 24 }} />
                            </Box>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Box sx={{ display: 'flex', border: '1px solid #e0e0e0', borderRadius: 1 }}>
                                    {['All', 'Picking', 'Transit'].map((tab, i) => (
                                        <Button key={tab} size="small" sx={{ color: i === 0 ? '#000' : 'text.secondary', fontWeight: i === 0 ? 'bold' : 'normal', bgcolor: i === 0 ? '#f5f5f5' : 'transparent', borderRadius: 0 }}>{tab}</Button>
                                    ))}
                                </Box>
                                <Button variant="contained" sx={{ bgcolor: '#ccff00', color: '#000', fontWeight: 'bold', '&:hover': { bgcolor: '#b2d900' }, boxShadow: 'none' }}>Dispatch All</Button>
                            </Box>
                        </Box>
                        <Box sx={{ p: 2 }}>
                            <Grid container sx={{ mb: 1, px: 2 }}>
                                <Grid size={{ xs: 2 }}><Typography variant="caption" color="text.secondary" fontWeight="bold">ORDER ID</Typography></Grid>
                                <Grid size={{ xs: 3 }}><Typography variant="caption" color="text.secondary" fontWeight="bold">CUSTOMER</Typography></Grid>
                                <Grid size={{ xs: 2 }}><Typography variant="caption" color="text.secondary" fontWeight="bold">DURATION</Typography></Grid>
                                <Grid size={{ xs: 2 }}><Typography variant="caption" color="text.secondary" fontWeight="bold">STATUS</Typography></Grid>
                                <Grid size={{ xs: 2 }}><Typography variant="caption" color="text.secondary" fontWeight="bold">ASSIGNED COURIER</Typography></Grid>
                                <Grid size={{ xs: 1 }}><Typography variant="caption" color="text.secondary" fontWeight="bold" align="right">ACTIONS</Typography></Grid>
                            </Grid>
                            {[
                                { id: '#QCR-8821', customer: 'Michael Chen', items: '3 items • $24.50', duration: '12:04', status: 'Picking', courier: 'John D.', color: '#ffe0b2' },
                                { id: '#QCR-8819', customer: 'Sarah Williams', items: '1 item • $12.00', duration: '04:30', status: 'Packing', courier: 'Marcus S.', color: '#bbdefb' },
                                { id: '#QCR-8815', customer: 'Tom Hiddleston', items: '5 items • $62.80', duration: '08:15', status: 'In Transit', courier: 'Kelly P.', color: '#f0f4c3' },
                                { id: '#QCR-8810', customer: 'Julie Vance', items: '2 items • $15.50', duration: '06:55', status: 'Delivered', courier: 'Dan L.', color: '#c8e6c9', delivered: true },
                            ].map((order, i) => (
                                <Paper key={i} sx={{ mb: 1.5, px: 2, py: 2, display: 'flex', alignItems: 'center', '&:hover': { bgcolor: '#fafafa' } }} variant="outlined">
                                    <Grid container alignItems="center">
                                        <Grid size={{ xs: 2 }}>
                                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{order.id}</Typography>
                                            <Typography variant="caption" color="text.secondary">{order.items}</Typography>
                                        </Grid>
                                        <Grid size={{ xs: 3 }}>
                                            <Typography variant="body2">{order.customer}</Typography>
                                            <Typography variant="caption" color="text.secondary">0.8km away</Typography>
                                        </Grid>
                                        <Grid size={{ xs: 2 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                {order.delivered ? <CheckCircleIcon sx={{ fontSize: 16, color: '#bdbdbd' }} /> : <AccessTimeIcon sx={{ fontSize: 16, color: 'error.main' }} />}
                                                <Typography variant="body2" sx={{ fontWeight: 'bold', color: order.delivered ? 'text.secondary' : 'text.primary' }}>{order.duration}</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid size={{ xs: 2 }}>
                                            <Chip label={order.status} size="small" sx={{ bgcolor: order.color, fontWeight: 'bold', color: '#000', borderRadius: 1 }} />
                                        </Grid>
                                        <Grid size={{ xs: 2 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Avatar sx={{ width: 24, height: 24, bgcolor: '#795548' }} />
                                                <Typography variant="body2">{order.courier}</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid size={{ xs: 1 }} sx={{ textAlign: 'right' }}>
                                            <IconButton size="small"><MoreVertIcon /></IconButton>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            ))}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                                <Typography variant="caption" color="text.secondary">Showing 10 of 42 pending orders</Typography>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <IconButton size="small" sx={{ border: '1px solid #e0e0e0', borderRadius: 1 }}><ChevronLeft /></IconButton>
                                    <IconButton size="small" sx={{ border: '1px solid #e0e0e0', borderRadius: 1 }}><ChevronRight /></IconButton>
                                </Box>
                            </Box>
                        </Box>
                    </Paper>

                    {/* Bottom Section: Map and Alerts */}
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                        <Paper sx={{ flex: 2, p: 2, borderRadius: 2, minHeight: 400, display: 'flex', flexDirection: 'column' }} elevation={0}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <MapIcon color="action" />
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Live Rider Map</Typography>
                                </Box>
                                <Button size="small" endIcon={<Box component="span" sx={{ fontSize: '1rem' }}>↗</Box>} sx={{ textTransform: 'none', color: '#ccff00', fontWeight: 'bold' }}>Full View</Button>
                            </Box>
                            <Box sx={{ flexGrow: 1, bgcolor: '#a7b6a4', borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
                                {/* Mock Map */}
                                <svg width="100%" height="100%">
                                    <rect width="100%" height="100%" fill="#90a4ae" />
                                    <path d="M0,50 Q100,100 200,50 T400,150" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                                    <path d="M100,0 Q150,150 200,300" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                                    <circle cx="150" cy="120" r="6" fill="#ccff00" stroke="#fff" strokeWidth="2" />
                                    <circle cx="350" cy="200" r="6" fill="#2196f3" stroke="#fff" strokeWidth="2" />
                                    <circle cx="280" cy="80" r="6" fill="#ccff00" stroke="#fff" strokeWidth="2" />
                                    <circle cx="100" cy="250" r="6" fill="#ccff00" stroke="#fff" strokeWidth="2" />
                                </svg>
                                <Box sx={{ position: 'absolute', bottom: 16, right: 16, bgcolor: 'rgba(255,255,255,0.9)', p: 1, borderRadius: 1 }}>
                                    <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Box component="span" sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#ccff00' }} /> Active Rider</Typography>
                                    <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Box component="span" sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#2196f3' }} /> Hub</Typography>
                                </Box>
                            </Box>
                        </Paper>

                        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <Paper sx={{ p: 3, borderRadius: 2, flex: 1 }} elevation={0}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Inventory Alerts</Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <Box sx={{ borderLeft: '4px solid #f44336', bgcolor: '#ffebee', p: 2, borderRadius: 1 }}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#d32f2f' }}>Stock Critical</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>2% Milk (1L Carton)</Typography>
                                        <Typography variant="caption" color="text.secondary">Only 8 units remaining</Typography>
                                    </Box>
                                    <Box sx={{ borderLeft: '4px solid #ff9800', bgcolor: '#fff3e0', p: 2, borderRadius: 1 }}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#ef6c00' }}>Fast Moving</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Fresh Avocados (Pack 2)</Typography>
                                        <Typography variant="caption" color="text.secondary">24 sold in last 60 mins</Typography>
                                    </Box>
                                </Box>
                            </Paper>

                            <Paper sx={{ p: 3, borderRadius: 2, flex: 1 }} elevation={0}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Top Riders</Typography>
                                <List dense disablePadding>
                                    {[
                                        { name: 'Mike Ross', rating: 4.9, deliveries: 142 },
                                        { name: 'Rachel Zane', rating: 4.8, deliveries: 138 },
                                        { name: 'Harvey Specter', rating: 4.8, deliveries: 135 },
                                    ].map((rider, i) => (
                                        <ListItem key={i} disableGutters>
                                            <ListItemIcon sx={{ minWidth: 40 }}>
                                                <Avatar sx={{ width: 30, height: 30, bgcolor: '#f0f0f0', color: 'text.secondary', fontSize: '0.8rem' }}>{rider.name.charAt(0)}</Avatar>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={<Typography variant="subtitle2" fontWeight="bold">{rider.name}</Typography>}
                                                secondary={`${rider.deliveries} deliveries`}
                                            />
                                            <Box sx={{ textAlign: 'right' }}>
                                                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#fbc02d', display: 'flex', alignItems: 'center' }}>
                                                    ★ {rider.rating}
                                                </Typography>
                                            </Box>
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

export default QCommerceManagement;
