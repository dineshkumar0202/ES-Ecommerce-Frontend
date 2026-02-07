import React from 'react';
import { Box, Typography, Paper, Grid, Button, IconButton, TextField, InputAdornment, Avatar, Chip, Divider, List, ListItem, ListItemText, ListItemAvatar } from '@mui/material';
import {
    Search as SearchIcon,
    Notifications as NotificationsIcon,
    Settings as SettingsIcon,
    Add as AddIcon,
    GetApp as GetAppIcon,
    ShoppingCart as ShoppingCartIcon,
    Favorite as FavoriteIcon,
    Description as DescriptionIcon,
    MoreVert as MoreVertIcon,
    Edit as EditIcon,
    Update as UpdateIcon,
    Inventory as InventoryIcon
} from '@mui/icons-material';

const WholesaleManagement = () => {
    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f4f6f8', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <Paper elevation={0} sx={{ height: 64, px: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e0e0e0' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ bgcolor: '#e3f2fd', p: 0.5, borderRadius: 1 }}>
                        <InventoryIcon color="primary" />
                    </Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Admin: Wholesale Management V102</Typography>
                </Box>
                <TextField
                    size="small"
                    placeholder="Search sellers, products, or SKUs"
                    InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
                    sx={{ width: 400, bgcolor: '#f9fafb', borderRadius: 1, '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton><NotificationsIcon /></IconButton>
                    <IconButton><SettingsIcon /></IconButton>
                    <Divider orientation="vertical" flexItem variant="middle" />
                    <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', lineHeight: 1 }}>Alex Rivera</Typography>
                        <Typography variant="caption" color="text.secondary">Global Admin</Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: '#bbdefb', color: '#1976d2', fontWeight: 'bold' }}>AR</Avatar>
                </Box>
            </Paper>

            <Box sx={{ p: 3, flexGrow: 1 }}>

                {/* Stats Row */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {[
                        { title: 'Total Wholesale Posts', value: '1,284', change: '+12%', icon: <DescriptionIcon />, color: '#bbdefb' },
                        { title: 'Add to Cart Frequency', value: '8,432', change: '+5%', icon: <ShoppingCartIcon />, color: '#bbdefb' },
                        { title: 'Total Wishlists', value: '2,105', change: '-2.4%', icon: <FavoriteIcon />, color: '#ffcdd2', changeColor: 'error' },
                    ].map((stat, i) => (
                        <Grid size={{ xs: 12, md: 4 }} key={i}>
                            <Paper sx={{ p: 3, borderRadius: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} elevation={0}>
                                <Box>
                                    <Typography variant="body2" color="text.secondary">{stat.title}</Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{stat.value}</Typography>
                                        <Typography variant="body2" sx={{ color: stat.changeColor === 'error' ? 'error.main' : 'success.main', fontWeight: 'bold' }}>↗ {stat.change}</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ bgcolor: stat.color === '#ffcdd2' ? '#ffebee' : '#e3f2fd', p: 1, borderRadius: '50%' }}>
                                    {React.cloneElement(stat.icon as any, { color: stat.changeColor === 'error' ? 'error' : 'primary' })}
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                {/* Main Content Area */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button sx={{ borderBottom: '2px solid #1976d2', borderRadius: 0, px: 2, color: '#1976d2', fontWeight: 'bold' }}>Wholesale Product Details</Button>
                        <Button sx={{ color: 'text.secondary', px: 2 }}>Seller Posted Products</Button>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button variant="outlined" startIcon={<GetAppIcon />} sx={{ borderColor: '#e0e0e0', color: 'text.primary' }}>Export CSV</Button>
                        <Button variant="contained" startIcon={<AddIcon />} sx={{ bgcolor: '#1976d2' }}>Create New Post</Button>
                    </Box>
                </Box>

                <Grid container spacing={3}>
                    {/* Left Column: Product Details */}
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }} elevation={0}>
                            <Grid container spacing={4}>
                                <Grid size={{ xs: 12, md: 5 }}>
                                    <Box sx={{ width: '100%', height: 300, bgcolor: '#e0e0e0', borderRadius: 2, mb: 2 }} component="img" src="https://via.placeholder.com/300" alt="Product" />
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        {[1, 2, 3].map(i => (
                                            <Box key={i} sx={{ width: 60, height: 60, bgcolor: '#f0f0f0', borderRadius: 1 }} />
                                        ))}
                                        <Box sx={{ width: 60, height: 60, bgcolor: '#f0f0f0', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+5</Box>
                                    </Box>
                                </Grid>
                                <Grid size={{ xs: 12, md: 7 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <Chip label="Active Post" color="success" size="small" sx={{ bgcolor: '#e8f5e9', color: '#2e7d32', fontWeight: 'bold' }} />
                                        <IconButton size="small"><MoreVertIcon /></IconButton>
                                    </Box>
                                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>Premium Cotton Bulk T-Shirts</Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>SKU: WH-CTN-001</Typography>

                                    <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 'bold', display: 'block', mb: 1 }}>WHOLESALE PRICING TIERS</Typography>
                                    <Box sx={{ bgcolor: '#f8f9fa', borderRadius: 2 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, borderBottom: '1px solid #e0e0e0' }}>
                                            <Typography>100 - 499 Units</Typography>
                                            <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>$5.50 / unit</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, borderBottom: '1px solid #e0e0e0' }}>
                                            <Typography>500 - 999 Units</Typography>
                                            <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>$4.80 / unit</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, bgcolor: '#f0f7ff' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Typography color="primary" fontWeight="bold">1,000+ Units</Typography>
                                                <Chip label="BEST VALUE" size="small" color="primary" sx={{ height: 20, fontSize: '0.65rem' }} />
                                            </Box>
                                            <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>$4.25 / unit</Typography>
                                        </Box>
                                    </Box>

                                    <Grid container sx={{ mt: 3, pt: 3, borderTop: '1px solid #f0f0f0' }}>
                                        <Grid size={{ xs: 6 }}>
                                            <Typography variant="caption" color="text.secondary">Seller Info</Typography>
                                            <Typography variant="subtitle2">Global Fabrics Inc.</Typography>
                                        </Grid>
                                        <Grid size={{ xs: 6 }} sx={{ textAlign: 'right' }}>
                                            <Typography variant="caption" color="text.secondary">Min. Order Qty (MOQ)</Typography>
                                            <Typography variant="subtitle2">100 Units</Typography>
                                        </Grid>
                                        <Grid size={{ xs: 6 }} sx={{ mt: 2 }}>
                                            <Typography variant="caption" color="text.secondary">Inventory Status</Typography>
                                            <Typography variant="subtitle2">14,200 In Stock</Typography>
                                        </Grid>
                                        <Grid size={{ xs: 6 }} sx={{ mt: 2, textAlign: 'right' }}>
                                            <Typography variant="caption" color="text.secondary">Post Date</Typography>
                                            <Typography variant="subtitle2">Oct 24, 2023</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3, borderTop: '1px solid #f0f0f0', pt: 3 }}>
                                <Button variant="outlined" startIcon={<EditIcon />}>Edit Details</Button>
                                <Button variant="contained" startIcon={<UpdateIcon />}>Update Stock Levels</Button>
                            </Box>
                        </Paper>

                        {/* Bulk Order Trends & Analytics */}
                        <Paper sx={{ p: 3, borderRadius: 2 }} elevation={0}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Bulk Order Trends</Typography>
                                    <Typography variant="body2" color="text.secondary">Volume analysis over last 30 days</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Button size="small" variant="contained" sx={{ bgcolor: '#1976d2', boxShadow: 'none' }}>Volume</Button>
                                    <Button size="small" sx={{ color: 'text.secondary' }}>Value</Button>
                                </Box>
                            </Box>

                            <Box sx={{ height: 200, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', px: 1, pb: 2, borderBottom: '1px solid #f0f0f0' }}>
                                {[35, 50, 45, 70, 60, 85, 90, 75, 65, 80, 55, 95].map((h, i) => (
                                    <Box key={i} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, width: '7%' }}>
                                        <Box sx={{ width: '100%', height: `${h}%`, bgcolor: i % 2 === 0 ? '#1976d2' : '#90caf9', borderRadius: '4px 4px 0 0', position: 'relative', '&:hover': { opacity: 0.8 } }}>
                                            {i === 11 && (
                                                <Paper sx={{ position: 'absolute', top: -35, left: '50%', transform: 'translateX(-50%)', bgcolor: '#000', color: '#fff', px: 1, py: 0.5, borderRadius: 1, fontSize: '0.7rem', whiteSpace: 'nowrap' }}>
                                                    Top Vol
                                                </Paper>
                                            )}
                                        </Box>
                                    </Box>
                                ))}
                            </Box>

                            <Grid container spacing={2} sx={{ mt: 3 }}>
                                <Grid size={{ xs: 6, md: 3 }}>
                                    <Typography variant="caption" color="text.secondary">TOTAL VOLUME</Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>42.5K</Typography>
                                    <Typography variant="caption" sx={{ color: 'success.main' }}>↑ 12% vs last month</Typography>
                                </Grid>
                                <Grid size={{ xs: 6, md: 3 }}>
                                    <Typography variant="caption" color="text.secondary">AVG ORDER SIZE</Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>450 Units</Typography>
                                    <Typography variant="caption" sx={{ color: 'success.main' }}>↑ 5% vs last month</Typography>
                                </Grid>
                                <Grid size={{ xs: 6, md: 3 }}>
                                    <Typography variant="caption" color="text.secondary">CONVERSION</Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>3.2%</Typography>
                                    <Typography variant="caption" sx={{ color: 'error.main' }}>↓ 0.4% vs last month</Typography>
                                </Grid>
                                <Grid size={{ xs: 6, md: 3 }}>
                                    <Typography variant="caption" color="text.secondary">RETURN RATE</Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>1.1%</Typography>
                                    <Typography variant="caption" sx={{ color: 'success.main' }}>-0.2% vs last month</Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    {/* Right Column: Related Posts */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Paper sx={{ p: 0, borderRadius: 2, overflow: 'hidden' }} elevation={0}>
                            <Box sx={{ p: 2, borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'text.secondary', letterSpacing: 1 }}>RELATED SELLER POSTS</Typography>
                                <Typography variant="caption" color="primary" sx={{ cursor: 'pointer', fontWeight: 'bold' }}>View All</Typography>
                            </Box>
                            <List>
                                {[
                                    { title: 'Raw Denim Rolls (12oz)', company: 'Global Fabrics Inc.', price: '$12.00 - $14.50', moq: 50 },
                                    { title: 'Ceramic Mugs Bulk Set', company: 'Office Supplies Co.', price: '$0.85 - $1.20', moq: 500 },
                                    { title: 'Mens Oxford Leather Shoes', company: 'Luxe Footwear Ltd.', price: '$45.00 - $55.00', moq: 24 },
                                    { title: 'Bamboo To-Go Containers', company: 'EcoPack Solutions', price: '$0.45 - $0.60', moq: 1000 },
                                ].map((item, i) => (
                                    <ListItem key={i} alignItems="flex-start" sx={{ borderBottom: '1px solid #f5f5f5', py: 2 }}>
                                        <ListItemAvatar sx={{ minWidth: 64, mr: 2 }}>
                                            <Avatar variant="rounded" sx={{ width: 56, height: 56, bgcolor: '#eceff1' }} src="" />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={<Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>{item.title}</Typography>}
                                            secondary={
                                                <Box>
                                                    <Typography variant="caption" display="block" color="text.secondary">{item.company}</Typography>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                                        <Typography variant="body2" color="primary" sx={{ fontWeight: 'bold' }}>{item.price}</Typography>
                                                        <Chip label={`MOQ: ${item.moq}`} size="small" sx={{ height: 20, fontSize: '0.6rem', bgcolor: '#f5f5f5' }} />
                                                    </Box>
                                                </Box>
                                            }
                                        />
                                    </ListItem>
                                ))}
                            </List>
                            <Box sx={{ p: 2, bgcolor: '#f5f5f5', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'text.secondary' }} />
                                <Typography variant="caption" color="text.secondary">Total 48 active posts for this category</Typography>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default WholesaleManagement;
