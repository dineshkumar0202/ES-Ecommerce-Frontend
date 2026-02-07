
import { Box, Typography, Paper, Grid, Button, IconButton, TextField, InputAdornment, Avatar, Chip, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Divider } from '@mui/material';
import {
    Search as SearchIcon,
    Notifications as NotificationsIcon,
    Settings as SettingsIcon,
    Dashboard as DashboardIcon,
    List as ListIcon,
    Store as StoreIcon,
    Gavel as GavelIcon,
    Assessment as AssessmentIcon,
    Add as AddIcon,
    GetApp as GetAppIcon,
    MoreVert as MoreVertIcon,
    Favorite as FavoriteIcon,
    ShoppingCart as ShoppingCartIcon,
    Inventory as InventoryIcon,
    SwapHoriz as SwapHorizIcon
} from '@mui/icons-material';

const ResaleManagement = () => {
    const posts = [
        { id: '#RES-88210', title: 'Sony WH-1000XM4', category: 'Electronics', condition: 'MINT', seller: 'Alex Rivera', rating: 4.9, price: '$195.00', original: '$349.00', status: 'ACTIVE', image: '🎧' },
        { id: '#RES-88104', title: 'Nike Air Zoom', category: 'Footwear', condition: 'GOOD', seller: 'Sarah Jenkins', rating: 4.2, price: '$78.00', original: '$120.00', status: 'PENDING', image: '👟' },
        { id: '#RES-87995', title: 'Polaroid Now+', category: 'Photography', condition: 'FAIR', seller: 'Marcus Kim', rating: 3.8, price: '$45.00', original: '$99.00', status: 'SOLD', image: '📷' },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'ACTIVE': return 'success';
            case 'PENDING': return 'info';
            case 'SOLD': return 'default';
            default: return 'default';
        }
    };

    const getConditionColor = (condition: string) => {
        switch (condition) {
            case 'MINT': return '#ccff90';
            case 'GOOD': return '#bbdefb';
            case 'FAIR': return '#ffe0b2';
            default: return '#f5f5f5';
        }
    }

    return (
        <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#f5f7fa' }}>
            {/* Sidebar */}
            <Box sx={{ width: 250, bgcolor: '#ffffff', borderRight: '1px solid #e0e0e0', display: 'flex', flexDirection: 'column', p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, px: 1 }}>
                    <Box sx={{ bgcolor: '#b2ff59', p: 0.5, borderRadius: 1, mr: 1.5 }}>
                        <SwapHorizIcon sx={{ color: '#000' }} />
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', lineHeight: 1.2 }}>RESALE ADMIN</Typography>
                        <Typography variant="caption" color="text.secondary">Version 1.0.4</Typography>
                    </Box>
                </Box>

                <List component="nav">
                    <ListItemButton sx={{ mb: 1 }}>
                        <ListItemIcon><DashboardIcon /></ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                    <ListItemButton sx={{ bgcolor: '#f1f8e9', borderRadius: 2, mb: 1, color: '#33691e' }}>
                        <ListItemIcon><ListIcon sx={{ color: '#33691e' }} /></ListItemIcon>
                        <ListItemText primary="Listings" primaryTypographyProps={{ fontWeight: 'bold' }} />
                    </ListItemButton>
                    <ListItemButton sx={{ mb: 1 }}>
                        <ListItemIcon><StoreIcon /></ListItemIcon>
                        <ListItemText primary="Sellers" />
                    </ListItemButton>
                    <ListItemButton sx={{ mb: 1 }}>
                        <ListItemIcon><GavelIcon /></ListItemIcon>
                        <ListItemText primary="Disputes" />
                    </ListItemButton>
                    <ListItemButton sx={{ mb: 1 }}>
                        <ListItemIcon><AssessmentIcon /></ListItemIcon>
                        <ListItemText primary="Analytics" />
                    </ListItemButton>
                </List>

                <Box sx={{ mt: 'auto' }}>
                    <ListItemButton>
                        <ListItemIcon><SettingsIcon /></ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItemButton>
                </Box>
            </Box>

            {/* Main Content */}
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                {/* Header */}
                <Box sx={{ height: 64, bgcolor: '#ffffff', borderBottom: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', px: 3, justifyContent: 'space-between' }}>
                    <TextField
                        size="small"
                        placeholder="Search orders, sellers, or products..."
                        InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon color="disabled" /></InputAdornment> }}
                        sx={{ width: 400, bgcolor: '#f4f6f8', borderRadius: 1, '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton><NotificationsIcon /></IconButton>
                        <Divider orientation="vertical" flexItem variant="middle" />
                        <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', lineHeight: 1 }}>Admin User</Typography>
                            <Typography variant="caption" color="text.secondary">Super Admin</Typography>
                        </Box>
                        <Avatar sx={{ bgcolor: '#ffab91' }}>AU</Avatar>
                    </Box>
                </Box>

                <Box sx={{ p: 4, overflow: 'auto', flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 4 }}>
                        <Box>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>Resale Management V104</Typography>
                            <Typography variant="body1" color="text.secondary">Monitor C2C marketplace velocity and listing quality.</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button variant="outlined" startIcon={<GetAppIcon />} sx={{ textTransform: 'none', color: 'text.primary', borderColor: '#e0e0e0' }}>Export CSV</Button>
                            <Button variant="contained" startIcon={<AddIcon />} sx={{ bgcolor: '#b2ff59', color: '#000', '&:hover': { bgcolor: '#9eea48' }, textTransform: 'none', fontWeight: 'bold' }}>Create Listing</Button>
                        </Box>
                    </Box>

                    {/* Stats Cards */}
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }} elevation={0}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Box sx={{ bgcolor: '#e3f2fd', p: 1, borderRadius: 1 }}><InventoryIcon color="primary" /></Box>
                                    <Chip label="+12.4%" size="small" sx={{ bgcolor: '#e8f5e9', color: '#2e7d32', fontWeight: 'bold' }} />
                                </Box>
                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>TOTAL RESALE POSTS</Typography>
                                <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>12,840</Typography>
                                <Typography variant="body2" color="text.secondary">Active C2C items across 12 categories</Typography>
                            </Paper>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }} elevation={0}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Box sx={{ bgcolor: '#fce4ec', p: 1, borderRadius: 1 }}><FavoriteIcon color="error" /></Box>
                                    <Chip label="+5.2%" size="small" sx={{ bgcolor: '#e8f5e9', color: '#2e7d32', fontWeight: 'bold' }} />
                                </Box>
                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>WISHLIST ACTIVITY</Typography>
                                <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>45,200</Typography>
                                <Typography variant="body2" color="text.secondary">Cumulative items saved by users</Typography>
                            </Paper>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Paper sx={{ p: 3, borderRadius: 3, height: '100%', borderLeft: '4px solid #b2ff59' }} elevation={0}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Box sx={{ bgcolor: '#f1f8e9', p: 1, borderRadius: 1 }}><ShoppingCartIcon sx={{ color: '#558b2f' }} /></Box>
                                    <Chip label="+2.1%" size="small" sx={{ bgcolor: '#e8f5e9', color: '#2e7d32', fontWeight: 'bold' }} />
                                </Box>
                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>ADD TO CART RATE</Typography>
                                <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>8.5%</Typography>
                                <Typography variant="body2" color="text.secondary">Conversion from view to cart action</Typography>
                            </Paper>
                        </Grid>
                    </Grid>

                    {/* Pricing History & Disputes Section */}
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 4 }}>
                        <Paper sx={{ flex: 2, p: 3, borderRadius: 3 }} elevation={0}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Market Pricing Trends</Typography>
                                    <Typography variant="body2" color="text.secondary">Average resale value across top categories</Typography>
                                </Box>
                                <Button size="small" variant="outlined" sx={{ borderRadius: 2, textTransform: 'none', color: 'text.secondary', borderColor: '#e0e0e0' }}>Last 30 Days</Button>
                            </Box>
                            <Box sx={{ height: 200, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', borderBottom: '1px solid #f0f0f0', pb: 2 }}>
                                {[45, 52, 49, 60, 58, 65, 72, 68, 75, 80, 78, 85].map((h, i) => (
                                    <Box key={i} sx={{ width: '6%', height: '100%', display: 'flex', alignItems: 'flex-end' }}>
                                        <Box sx={{ width: '100%', height: `${h}%`, bgcolor: '#b2ff59', borderRadius: '4px 4px 0 0', opacity: 0.8 }} />
                                    </Box>
                                ))}
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                                <Typography variant="caption" color="text.secondary">Week 1</Typography>
                                <Typography variant="caption" color="text.secondary">Week 2</Typography>
                                <Typography variant="caption" color="text.secondary">Week 3</Typography>
                                <Typography variant="caption" color="text.secondary">Week 4</Typography>
                            </Box>
                        </Paper>

                        <Paper sx={{ flex: 1, p: 3, borderRadius: 3, display: 'flex', flexDirection: 'column' }} elevation={0}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Recent Disputes</Typography>
                                <GavelIcon color="action" />
                            </Box>
                            <List dense disablePadding>
                                {[
                                    { id: '#DIS-9921', issue: 'Item not as described', status: 'Open', time: '2h ago' },
                                    { id: '#DIS-9918', issue: 'Shipping damage claim', status: 'In Review', time: '5h ago' },
                                    { id: '#DIS-9915', issue: 'Authentication failed', status: 'Resolved', time: '1d ago' },
                                ].map((dispute, i) => (
                                    <ListItem key={i} disableGutters sx={{ borderBottom: i !== 2 ? '1px solid #f5f5f5' : 'none', py: 1.5 }}>
                                        <ListItemText
                                            primary={<Typography variant="subtitle2" fontWeight="bold">{dispute.issue}</Typography>}
                                            secondary={`ID: ${dispute.id} • ${dispute.time}`}
                                        />
                                        <Chip label={dispute.status} size="small" sx={{ bgcolor: dispute.status === 'Resolved' ? '#e8f5e9' : '#fff3e0', color: dispute.status === 'Resolved' ? '#2e7d32' : '#ef6c00', fontWeight: 'bold', borderRadius: 1, fontSize: '0.7rem' }} />
                                    </ListItem>
                                ))}
                            </List>
                            <Button variant="text" sx={{ mt: 'auto', color: '#558b2f', fontWeight: 'bold', textTransform: 'none' }}>View All Dispute Logs</Button>
                        </Paper>
                    </Box>

                    {/* Filters */}
                    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                        <Button endIcon={<Box component="span">▼</Box>} sx={{ bgcolor: '#f5f5f5', color: 'text.primary', border: '1px solid #e0e0e0', textTransform: 'none', px: 2 }}>Condition: All</Button>
                        <Button endIcon={<Box component="span">▼</Box>} sx={{ bgcolor: '#f5f5f5', color: 'text.primary', border: '1px solid #e0e0e0', textTransform: 'none', px: 2 }}>Category: Electronics</Button>
                        <Button endIcon={<Box component="span">▼</Box>} sx={{ bgcolor: '#f5f5f5', color: 'text.primary', border: '1px solid #e0e0e0', textTransform: 'none', px: 2 }}>Price Range</Button>
                        <Button sx={{ color: '#b2ff59', textTransform: 'none', fontWeight: 'bold' }}>Clear Filters</Button>
                    </Box>

                    {/* Content Table */}
                    <Paper sx={{ borderRadius: 3, overflow: 'hidden' }} elevation={0}>
                        <Box sx={{ p: 2, borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Total Resale Order Posts</Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>SHOWING 50 OF 12,840</Typography>
                        </Box>
                        <TableContainer>
                            <Table>
                                <TableHead sx={{ bgcolor: '#fcfcfc' }}>
                                    <TableRow>
                                        <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold', fontSize: '0.75rem' }}>PRODUCT INFO</TableCell>
                                        <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold', fontSize: '0.75rem' }}>CONDITION</TableCell>
                                        <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold', fontSize: '0.75rem' }}>SELLER DETAILS</TableCell>
                                        <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold', fontSize: '0.75rem' }}>PRICING</TableCell>
                                        <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold', fontSize: '0.75rem' }}>STATUS</TableCell>
                                        <TableCell align="right" sx={{ color: 'text.secondary', fontWeight: 'bold', fontSize: '0.75rem' }}>ACTIONS</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {posts.map((post) => (
                                        <TableRow key={post.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                    <Box sx={{ width: 48, height: 48, bgcolor: '#f5f5f5', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                                                        <Box component="img" src={post.image} alt={post.title} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                    </Box>
                                                    <Box>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>{post.title}</Typography>
                                                            {post.verified && <Chip label="Verified" size="small" sx={{ height: 16, fontSize: '0.6rem', bgcolor: '#b2ff59', color: '#000', fontWeight: 'bold' }} />}
                                                        </Box>
                                                        <Typography variant="caption" color="text.secondary">ID: {post.id} • {post.category}</Typography>
                                                    </Box>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Chip label={post.condition} size="small" sx={{ bgcolor: getConditionColor(post.condition), fontWeight: 'bold', color: '#000', borderRadius: 1, fontSize: '0.7rem' }} />
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Avatar sx={{ width: 32, height: 32 }} />
                                                    <Box>
                                                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{post.seller}</Typography>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                            <Box component="span" sx={{ color: '#ffb300', fontSize: '0.8rem' }}>★</Box>
                                                            <Typography variant="caption" color="text.secondary">{post.rating}</Typography>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>{post.price}</Typography>
                                                <Typography variant="caption" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>{post.original}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: getStatusColor(post.status) === 'success' ? '#2e7d32' : getStatusColor(post.status) === 'info' ? '#1976d2' : '#bdbdbd' }} />
                                                    <Typography variant="caption" sx={{ fontWeight: 'bold', color: getStatusColor(post.status) === 'success' ? '#2e7d32' : getStatusColor(post.status) === 'info' ? '#1976d2' : '#bdbdbd' }}>{post.status}</Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton size="small"><MoreVertIcon /></IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f0f0f0' }}>
                            <Typography variant="body2" color="text.secondary">Page 1 of 257</Typography>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Button variant="outlined" size="small" disabled sx={{ textTransform: 'none' }}>Previous</Button>
                                <Button variant="outlined" size="small" sx={{ textTransform: 'none', color: 'text.primary', borderColor: '#e0e0e0' }}>Next</Button>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
};

export default ResaleManagement;
