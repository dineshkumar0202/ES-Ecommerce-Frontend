import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Stack,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    IconButton,
    CircularProgress,
    Button,
    TextField,
    InputAdornment,
    Grid,
    Avatar,
    Divider,
    Chip,
    Badge
} from '@mui/material';
import { toast } from 'react-toastify';
import {
    Dashboard as DashboardIcon,
    Store as StoreIcon,
    Warehouse as WarehouseIcon,
    FlashOn as FlashOnIcon,
    Autorenew as AutorenewIcon,
    WorkOutline as WorkOutlineIcon,
    ExitToApp as ExitToAppIcon,
    Search as SearchIcon,
    Add as AddIcon,
    Star as StarIcon,
    FileDownload as FileDownloadIcon,
    CheckCircleOutline as CheckCircleIcon,
    Brightness4 as ThemeIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ResaleService } from '../../../services/api';

const ResaleManagement = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await ResaleService.getAll();
            setProducts(data);
        } catch (error) {
            console.error("Failed to fetch resale products", error);
        } finally {
            setIsLoading(false);
        }
    };

    const menuItems = [
        { name: 'Overview', icon: <DashboardIcon sx={{ fontSize: 20 }} />, path: '/admin/dashboard' },
        { name: 'Retail', icon: <StoreIcon sx={{ fontSize: 20 }} />, path: '/admin/retail' },
        { name: 'Wholesale', icon: <WarehouseIcon sx={{ fontSize: 20 }} />, path: '/admin/wholesale' },
        { name: 'Q-Commerce', icon: <FlashOnIcon sx={{ fontSize: 20 }} />, path: '/admin/quick' },
        { name: 'Resale', icon: <AutorenewIcon sx={{ fontSize: 20 }} />, path: '/admin/resale', active: true },
        { name: 'Freelance', icon: <WorkOutlineIcon sx={{ fontSize: 20 }} />, path: '/admin/freelance' },
    ];

    const recentlyListed = [
        {
            title: 'Leather Travel Tote',
            image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=400',
            tag: 'NEAR MINT',
            desc: 'Authentic Designer • 2022 Collection',
            price: '$420.00',
            originalPrice: '$850.00'
        },
        {
            title: 'Vintage Film Camera',
            image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400',
            tag: 'GOOD',
            desc: '35mm Classic • Functional',
            price: '$185.00'
        },
        {
            title: 'Retro Run Sneakers',
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400',
            tag: 'BRAND NEW',
            desc: 'Limited Edition • US Size 10',
            price: '$125.00'
        }
    ];

    const topResellers = [
        { name: 'Elena Vintage', niche: 'Expert in Designer Handbags', image: 'https://i.pravatar.cc/150?u=elena', sales: '$14,240', rating: '4.9' },
        { name: 'Marcus Tech', niche: 'Refurbished Electronics', image: 'https://i.pravatar.cc/150?u=marcus', sales: '$8,120', rating: '4.8' },
        { name: 'Urban Threads', niche: 'Premium Streetwear', image: 'https://i.pravatar.cc/150?u=urban', sales: '$5,400', rating: '5.0' },
        { name: 'John\'s Library', niche: 'Rare Books & Prints', image: 'https://i.pravatar.cc/150?u=john', sales: '$3,950', rating: '4.7' }
    ];

    const resaleHistory = [
        { name: 'Smart Tech Exchange', time: 'APPROVED 2 HOURS AGO', id: 'RS-9021', units: '842 Units', status: 'ACTIVE' },
        { name: 'Modern Living Resale', time: 'APPROVED 1 DAY AGO', id: 'RS-8724', units: '1,530 Units', status: 'ACTIVE' }
    ];

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'white' }}>
            {/* Sidebar */}
            <Box sx={{ width: 260, bgcolor: 'white', borderRight: '1px solid #f1f5f9', p: 3, display: 'flex', flexDirection: 'column', height: '100vh', position: 'sticky', top: 0 }}>
                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 5, px: 1 }}>
                    <Box sx={{ bgcolor: 'black', p: 0.8, borderRadius: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box component="span" sx={{ color: 'white', fontWeight: 900, fontSize: '1.2rem', lineHeight: 1 }}>R</Box>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.25rem', color: '#1e293b' }}>retails</Typography>
                </Stack>

                <List disablePadding sx={{ flexGrow: 1 }}>
                    {menuItems.map((item) => (
                        <ListItemButton
                            key={item.name}
                            onClick={() => !item.active && navigate(item.path)}
                            sx={{
                                mb: 1,
                                borderRadius: 3,
                                bgcolor: item.active ? '#CFE8EC' : 'transparent',
                                color: item.active ? '#1e293b' : '#64748b',
                                '&:hover': { bgcolor: item.active ? '#CFE8EC' : '#f8fafc' },
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

                <Box sx={{ mt: 'auto', pt: 2 }}>
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ px: 2, mb: 3, cursor: 'pointer', color: '#64748b' }}>
                        <ThemeIcon sx={{ fontSize: 20 }} />
                        <Typography variant="body2" fontWeight={600}>Theme</Typography>
                    </Stack>
                    <Stack onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('userRole'); navigate('/admin/login'); }} direction="row" alignItems="center" spacing={2} sx={{ px: 2, cursor: 'pointer', color: '#ef4444' }}>
                        <ExitToAppIcon sx={{ fontSize: 20 }} />
                        <Typography variant="body2" fontWeight={600}>Leave</Typography>
                    </Stack>
                </Box>
            </Box>

            {/* Main Content */}
            <Box sx={{ flexGrow: 1, p: 4, bgcolor: '#f8fafc', overflow: 'auto' }}>
                {/* Header */}
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 4 }}>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b', mb: 0.5 }}>Resale Management</Typography>
                        <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>Track and manage your community resale marketplace.</Typography>
                    </Box>
                    <Stack direction="row" spacing={2}>
                        <TextField
                            size="small"
                            placeholder="Search items..."
                            sx={{
                                width: 280,
                                '& .MuiOutlinedInput-root': {
                                    bgcolor: 'white',
                                    borderRadius: 3,
                                    '& fieldset': { border: 'none' },
                                    boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
                                }
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: '#94a3b8', fontSize: 20 }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            sx={{
                                bgcolor: '#CFE8EC',
                                color: '#1e293b',
                                borderRadius: 3,
                                px: 3,
                                fontWeight: 700,
                                textTransform: 'none',
                                boxShadow: 'none',
                                '&:hover': { bgcolor: '#b8dbe2', boxShadow: 'none' }
                            }}
                        >
                            Add Listing
                        </Button>
                    </Stack>
                </Stack>

                {/* Recently Listed Items */}
                <Box sx={{ mb: 6 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b' }}>Recently Listed Items</Typography>
                            <Chip label="12 Pending" size="small" sx={{ bgcolor: '#f1f5f9', fontWeight: 800, color: '#64748b' }} />
                        </Stack>
                        <Typography variant="subtitle2" sx={{ color: '#64748b', fontWeight: 700, cursor: 'pointer' }}>View all</Typography>
                    </Stack>

                    <Grid container spacing={3}>
                        {recentlyListed.map((item, i) => (
                            <Grid key={i} size={{ xs: 12, md: 4 }}>
                                <Paper elevation={0} sx={{ p: 2, borderRadius: 5, bgcolor: 'white', border: '1px solid #f1f5f9' }}>
                                    <Stack direction="row" spacing={2}>
                                        <Box sx={{ width: 100, height: 100, borderRadius: 4, overflow: 'hidden', bgcolor: '#f8fafc' }}>
                                            <Box component="img" src={item.image} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </Box>
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 0.5 }}>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1e293b' }}>{item.title}</Typography>
                                                <Chip label={item.tag} size="small" sx={{ height: 18, fontSize: '0.6rem', fontWeight: 900, bgcolor: '#f1f5f9' }} />
                                            </Stack>
                                            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, display: 'block', mb: 1 }}>{item.desc}</Typography>
                                            <Stack direction="row" alignItems="baseline" spacing={1}>
                                                <Typography variant="h6" sx={{ fontWeight: 900, color: '#1e293b' }}>{item.price}</Typography>
                                                {item.originalPrice && (
                                                    <Typography variant="caption" sx={{ color: '#cbd5e1', fontWeight: 600, textDecoration: 'line-through' }}>{item.originalPrice}</Typography>
                                                )}
                                            </Stack>
                                        </Box>
                                    </Stack>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Top Resellers */}
                <Box sx={{ mb: 6 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b' }}>Top Resellers</Typography>
                            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700 }}>48 Total</Typography>
                        </Stack>
                        <Typography variant="subtitle2" sx={{ color: '#64748b', fontWeight: 700, cursor: 'pointer' }}>View all</Typography>
                    </Stack>

                    <Grid container spacing={3}>
                        {topResellers.map((reseller, i) => (
                            <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
                                <Paper elevation={0} sx={{ p: 4, borderRadius: 5, bgcolor: 'white', textAlign: 'center', border: '1px solid #f1f5f9' }}>
                                    <Box sx={{ mb: 2, position: 'relative', display: 'inline-block' }}>
                                        <Avatar src={reseller.image} sx={{ width: 64, height: 64, border: '3px solid white', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }} />
                                        <Box sx={{ position: 'absolute', bottom: 2, right: 2, width: 14, height: 14, bgcolor: '#22c55e', borderRadius: '50%', border: '2.5px solid white' }} />
                                    </Box>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1e293b' }}>{reseller.name}</Typography>
                                    <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, display: 'block', mb: 2.5 }}>{reseller.niche}</Typography>

                                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 3, px: 1 }}>
                                        <Box>
                                            <Typography variant="caption" sx={{ color: '#cbd5e1', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.6rem' }}>Total Sales</Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 800, color: '#1e293b' }}>{reseller.sales}</Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant="caption" sx={{ color: '#cbd5e1', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.6rem' }}>Rating</Typography>
                                            <Stack direction="row" alignItems="center" spacing={0.5}>
                                                <Typography variant="body2" sx={{ fontWeight: 800, color: '#1e293b' }}>{reseller.rating}</Typography>
                                                <StarIcon sx={{ color: '#f59e0b', fontSize: 14 }} />
                                            </Stack>
                                        </Box>
                                    </Stack>

                                    <Button
                                        fullWidth
                                        variant="contained"
                                        sx={{
                                            bgcolor: '#0f172a',
                                            color: 'white',
                                            boxShadow: 'none',
                                            borderRadius: 2.5,
                                            fontWeight: 800,
                                            textTransform: 'none',
                                            py: 1,
                                            '&:hover': { bgcolor: '#1e293b', boxShadow: 'none' }
                                        }}
                                    >
                                        View Profile
                                    </Button>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Recent Resale History */}
                <Box>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b' }}>Recent Resale History</Typography>
                        <Button startIcon={<FileDownloadIcon />} sx={{ color: '#94a3b8', textTransform: 'none', fontWeight: 800, fontSize: '0.8rem' }}>EXPORT CSV</Button>
                    </Stack>

                    <Stack spacing={2}>
                        {resaleHistory.map((item, i) => (
                            <Paper key={i} elevation={0} sx={{ p: 2.5, borderRadius: 4, bgcolor: 'white', border: '1px solid #f1f5f9' }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Stack direction="row" spacing={3} alignItems="center">
                                        <Box sx={{ width: 44, height: 44, bgcolor: '#f8fafc', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #f1f5f9' }}>
                                            <CheckCircleIcon sx={{ color: '#64748b' }} />
                                        </Box>
                                        <Box>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1e293b' }}>{item.name}</Typography>
                                            <Typography variant="caption" sx={{ color: '#cbd5e1', fontWeight: 700, fontSize: '0.65rem' }}>{item.time} • ID: {item.id}</Typography>
                                        </Box>
                                    </Stack>
                                    <Stack direction="row" spacing={6} alignItems="center">
                                        <Box sx={{ textAlign: 'right' }}>
                                            <Typography variant="caption" sx={{ color: '#cbd5e1', fontWeight: 700, display: 'block', textTransform: 'uppercase', fontSize: '0.6rem' }}>Units Sold</Typography>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 900, color: '#1e293b' }}>{item.units}</Typography>
                                        </Box>
                                        <Chip label={item.status} size="small" sx={{ bgcolor: '#dcfce7', color: '#166534', fontWeight: 900, fontSize: '0.65rem', px: 1 }} />
                                    </Stack>
                                </Stack>
                            </Paper>
                        ))}
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
};

export default ResaleManagement;
