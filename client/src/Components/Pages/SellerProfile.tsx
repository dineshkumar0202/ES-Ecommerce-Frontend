import { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Paper,
    Stack,
    Button,
    Avatar,
    Chip,
    IconButton,
    Divider,
    CircularProgress,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import {
    Business as BusinessIcon,
    Payments as PayoutsIcon,
    Notifications as NotificationsIcon,
    CameraAlt as CameraIcon,
    Edit as EditIcon,
    Verified as VerifiedIcon,
    AccountBalance as BankIcon,
    LocationOn as LocationIcon,
    Add as AddIcon,
    CheckCircle as CheckCircleIcon,
    Description as FileIcon,
    Launch as LaunchIcon,
    Download as DownloadIcon,
    AttachMoney as AttachMoneyOutlinedIcon,
    ShoppingBag as ShoppingBagOutlinedIcon,
    Inventory2 as Inventory2OutlinedIcon,
    TrendingUp as TrendingUpIcon,
    EditOutlined as EditOutlinedIcon,
    DeleteOutline as DeleteOutlineIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { WholesaleService, OrderService, AuthService } from '../../services/api';

const SellerProfile = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Business Profile');
    const [products, setProducts] = useState<any[]>([]);
    const [orders, setOrders] = useState<any[]>([]);
    const [sellerProfile, setSellerProfile] = useState<any>(null);

    const name = sellerProfile?.username || sellerProfile?.profile?.name || 'Seller Name';
    const avatar = sellerProfile?.profile?.avatar || '';
    const uniqueId = sellerProfile?.uniqueId || sellerProfile?.freelancer?.freelancerId || 'LOADING...';
    // const navItems = ['Dashboard', 'Business Profile', 'Orders', 'Inventory'];
    const navItems = ['Business Profile', 'Dashboard', 'Orders', 'Inventory']; // Reordered to match likely user preference if Profile is the main view in HEAD

    // Mock Data for Dashboard
    const stats = {
        totalSales: '₹1,24,500',
        orders: 45,
        products: products.length || 0,
        rating: 4.8
    };

    useEffect(() => {
        fetchSellerData();
    }, []);

    const fetchSellerData = async () => {
        try {
            const { data } = await AuthService.getMe();
            setSellerProfile(data);

            const prodRes = await WholesaleService.getMyProducts();
            setProducts(prodRes.data || []);

            const ordersRes = await OrderService.getSellerOrders();
            setOrders(ordersRes.data.map((o: any) => ({
                id: o._id,
                product: o.orderItems.map((i: any) => i.title).join(', '),
                customer: o.user?.username || 'Guest',
                date: new Date(o.createdAt).toLocaleDateString(),
                status: o.status,
                amount: `₹${o.totalPrice}`
            })) || []);

        } catch (error) {
            console.error("Error loading dashboard:", error);
        }
    };

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        try {
            await OrderService.updateStatus(id, newStatus);
            fetchSellerData();
        } catch (e) {
            console.error("Status update failed:", e);
        }
    };

    const StatusChip = ({ status }: { status: string }) => {
        let color = '#e2e8f0';
        let textColor = '#475569';

        switch (status) {
            case 'Ordered': color = '#fef3c7'; textColor = '#b45309'; break;
            case 'Processing': color = '#dbeafe'; textColor = '#1e40af'; break;
            case 'Shipped': color = '#f3e8ff'; textColor = '#6b21a8'; break;
            case 'Out for Delivery': color = '#ffedd5'; textColor = '#9a3412'; break;
            case 'Delivered': color = '#dcfce7'; textColor = '#166534'; break;
            case 'Cancelled': color = '#fee2e2'; textColor = '#991b1b'; break;
        }

        return <Chip label={status} size="small" sx={{ bgcolor: color, color: textColor, fontWeight: 800, borderRadius: 2 }} />;
    };

    // --- Component Renders ---

    const renderBusinessProfile = () => (
        <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', lg: 'row' } }}>
            {/* Left Column */}
            <Box sx={{ flex: { lg: 8.5 }, width: '100%' }}>
                {/* Hero Header Card */}
                <Paper elevation={0} sx={{ borderRadius: 6, overflow: 'hidden', mb: 4, position: 'relative' }}>
                    <Box sx={{ height: 200, bgcolor: '#d1d5db', position: 'relative' }}>
                        <Box
                            component="img"
                            src="https://images.unsplash.com/photo-1542332213-31f87348057f?auto=format&fit=crop&q=80&w=1500"
                            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <Button
                            startIcon={<CameraIcon />}
                            sx={{
                                position: 'absolute',
                                bottom: 16,
                                right: 16,
                                bgcolor: 'rgba(0,0,0,0.5)',
                                color: 'white',
                                textTransform: 'none',
                                borderRadius: 2,
                                backdropFilter: 'blur(4px)',
                                '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' }
                            }}
                        >
                            Change Cover
                        </Button>
                    </Box>

                    <Box sx={{ p: 4, pt: 0, mt: -6, display: 'flex', alignItems: 'flex-end', gap: 3 }}>
                        <Box sx={{ position: 'relative' }}>
                            <Avatar
                                variant="rounded"
                                src={avatar || "https://img.logo.com/outputs/7438183/1000x1000.png"}
                                sx={{ width: 140, height: 140, borderRadius: 5, border: '6px solid white', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', bgcolor: '#f8fafc' }}
                            />
                            <IconButton size="small" sx={{ position: 'absolute', top: -10, right: -10, bgcolor: '#CFE8EC', color: '#1e293b', border: '3px solid white', '&:hover': { bgcolor: '#b8dbe2' } }}>
                                <EditIcon sx={{ fontSize: 16 }} />
                            </IconButton>
                        </Box>

                        <Box sx={{ pb: 1, flexGrow: 1 }}>
                            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 0.5 }}>
                                <Typography variant="h4" sx={{ fontWeight: 900, color: '#0f172a' }}>{name}</Typography>
                                <Chip
                                    icon={<VerifiedIcon sx={{ fontSize: '1rem !important' }} />}
                                    label="VERIFIED ENTERPRISE SELLER"
                                    size="small"
                                    sx={{ bgcolor: '#eff6ff', color: '#1d4ed8', fontWeight: 800, px: 1 }}
                                />
                            </Stack>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600 }}>ID: {uniqueId}</Typography>
                                <Stack direction="row" alignItems="center" spacing={0.5}>
                                    <Box sx={{ width: 6, height: 6, bgcolor: '#22c55e', borderRadius: '50%' }} />
                                    <Typography variant="caption" sx={{ color: '#22c55e', fontWeight: 800, textTransform: 'uppercase' }}>Active Compliance</Typography>
                                </Stack>
                            </Stack>
                        </Box>
                    </Box>
                </Paper>

                {/* Info Sections */}
                <Stack spacing={4}>
                    {/* General Info */}
                    <Paper elevation={0} sx={{ p: 4, borderRadius: 6, border: '1px solid #e2e8f0' }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                            <Stack direction="row" alignItems="center" spacing={1.5}>
                                <BusinessIcon sx={{ color: '#94a3b8' }} />
                                <Typography variant="h6" sx={{ fontWeight: 800 }}>General Info</Typography>
                            </Stack>
                            <Button startIcon={<EditIcon />} sx={{ textTransform: 'none', fontWeight: 800, color: '#64748b' }}>EDIT</Button>
                        </Stack>
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 4 }}>
                            <Box>
                                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Legal Business Name</Typography>
                                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1e293b' }}>{sellerProfile?.businessName || name}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Business Type</Typography>
                                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1e293b' }}>Private Limited Company</Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Incorporation Date</Typography>
                                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1e293b' }}>12 Oct 2018</Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Primary Category</Typography>
                                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1e293b' }}>Electronics & Office Supplies</Typography>
                            </Box>
                        </Box>
                    </Paper>

                    {/* Compliance & GST */}
                    <Paper elevation={0} sx={{ p: 4, borderRadius: 6, border: '1px solid #e2e8f0' }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                            <Stack direction="row" alignItems="center" spacing={1.5}>
                                <VerifiedIcon sx={{ color: '#94a3b8' }} />
                                <Typography variant="h6" sx={{ fontWeight: 800 }}>Compliance & GST</Typography>
                            </Stack>
                            <Button startIcon={<EditIcon />} sx={{ textTransform: 'none', fontWeight: 800, color: '#64748b' }}>EDIT</Button>
                        </Stack>
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 4, mb: 4 }}>
                            <Box>
                                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>GSTIN</Typography>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1e293b' }}>29AAAAA0000A1Z5</Typography>
                                    <Chip label="Verified" size="small" icon={<CheckCircleIcon sx={{ fontSize: '12px !important' }} />} sx={{ height: 20, fontSize: '10px', fontWeight: 900, bgcolor: '#f0fdf4', color: '#16a34a' }} />
                                </Stack>
                            </Box>
                            <Box>
                                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>PAN Number</Typography>
                                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1e293b' }}>ABCDE1234F</Typography>
                            </Box>
                        </Box>
                        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', display: 'block', mb: 2 }}>Uploaded Documents</Typography>
                        <Stack direction="row" spacing={2}>
                            {[
                                { name: 'GST_Certificate.pdf', size: '2.4 MB', date: 'Aug 24' },
                                { name: 'PAN_Card_Corp.pdf', size: '1.1 MB', date: 'Aug 24' }
                            ].map((doc, i) => (
                                <Paper key={i} elevation={0} sx={{ p: 2, borderRadius: 3, border: '1px solid #f1f5f9', bgcolor: '#f8fafc', flexGrow: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Box sx={{ p: 1, bgcolor: '#fee2e2', color: '#ef4444', borderRadius: 1.5 }}>
                                        <FileIcon />
                                    </Box>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{doc.name}</Typography>
                                        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>{doc.size} • Uploaded on {doc.date}</Typography>
                                    </Box>
                                    <IconButton size="small"><DownloadIcon sx={{ fontSize: 18 }} /></IconButton>
                                </Paper>
                            ))}
                        </Stack>
                    </Paper>

                    {/* Bank Details */}
                    <Paper elevation={0} sx={{ p: 4, borderRadius: 6, border: '1px solid #e2e8f0' }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                            <Stack direction="row" alignItems="center" spacing={1.5}>
                                <BankIcon sx={{ color: '#94a3b8' }} />
                                <Typography variant="h6" sx={{ fontWeight: 800 }}>Bank Details for Payouts</Typography>
                            </Stack>
                            <Button startIcon={<EditIcon />} sx={{ textTransform: 'none', fontWeight: 800, color: '#64748b' }}>EDIT</Button>
                        </Stack>
                        <Box sx={{ p: 3, borderRadius: 4, bgcolor: '#f8fafc', border: '1px solid #f1f5f9' }}>
                            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
                                <Box>
                                    <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Bank Name</Typography>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1e293b' }}>International Finance Bank</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Account Number</Typography>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1e293b' }}>**** **** 8920</Typography>
                                        <Chip label="Verified" size="small" sx={{ height: 20, fontSize: '10px', fontWeight: 900, bgcolor: '#eff6ff', color: '#1d4ed8' }} />
                                    </Stack>
                                </Box>
                                <Box>
                                    <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>IFSC Code</Typography>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1e293b' }}>IFBK0009122</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Paper>

                    {/* Warehouse Addresses */}
                    <Paper elevation={0} sx={{ p: 4, borderRadius: 6, border: '1px solid #e2e8f0' }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                            <Stack direction="row" alignItems="center" spacing={1.5}>
                                <LocationIcon sx={{ color: '#94a3b8' }} />
                                <Typography variant="h6" sx={{ fontWeight: 800 }}>Warehouse Addresses</Typography>
                            </Stack>
                            <Button variant="contained" startIcon={<AddIcon />} sx={{ bgcolor: '#CFE8EC', color: '#1e293b', fontWeight: 800, textTransform: 'none', borderRadius: 2, boxShadow: 'none', '&:hover': { bgcolor: '#b8dbe2', boxShadow: 'none' } }}>ADD ADDRESS</Button>
                        </Stack>
                        <Stack spacing={2}>
                            {[
                                { name: 'Main Distribution Center', tag: 'PRIMARY', address: '402, Trade Tower, Sector 45, Bangalore, Karnataka - 560001' },
                                { name: 'East Zone Hub', tag: '', address: 'Plot 12-B, Industrial Estate, Kolkata, West Bengal - 700091' }
                            ].map((wh, i) => (
                                <Paper key={i} elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #f1f5f9', bgcolor: 'white' }}>
                                    <Stack direction="row" justifyContent="space-between">
                                        <Stack direction="row" spacing={2}>
                                            <Box sx={{ p: 1, bgcolor: '#f1f5f9', borderRadius: 2, height: 'fit-content' }}>
                                                <LocationIcon sx={{ color: '#94a3b8' }} />
                                            </Box>
                                            <Box>
                                                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                                                    <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>{wh.name}</Typography>
                                                    {wh.tag && <Chip label={wh.tag} size="small" sx={{ height: 18, fontSize: '9px', fontWeight: 900, bgcolor: '#eff6ff', color: '#1d4ed8' }} />}
                                                </Stack>
                                                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>{wh.address}</Typography>
                                            </Box>
                                        </Stack>
                                        <Stack direction="row" spacing={1}>
                                            <IconButton size="small" sx={{ border: '1px solid #f1f5f9' }}><EditIcon sx={{ fontSize: 16 }} /></IconButton>
                                            <IconButton size="small" sx={{ border: '1px solid #f1f5f9' }}><PayoutsIcon sx={{ fontSize: 16 }} /></IconButton>
                                        </Stack>
                                    </Stack>
                                </Paper>
                            ))}
                        </Stack>
                    </Paper>
                </Stack>
            </Box>

            {/* Right Column */}
            <Box sx={{ flex: { lg: 3.5 }, width: '100%' }}>
                <Stack spacing={4}>
                    {/* Profile Completion */}
                    <Paper elevation={0} sx={{ p: 4, borderRadius: 6, border: '1px solid #e2e8f0', textAlign: 'center' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 4 }}>Profile Completion</Typography>
                        <Box sx={{ position: 'relative', display: 'inline-flex', mb: 4 }}>
                            <CircularProgress variant="determinate" value={85} size={140} thickness={4} sx={{ color: '#CFE8EC' }} />
                            <Box sx={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                <Typography variant="h3" sx={{ fontWeight: 900, lineHeight: 1 }}>85%</Typography>
                                <Typography variant="caption" sx={{ fontWeight: 800, color: '#94a3b8' }}>COMPLETE</Typography>
                            </Box>
                        </Box>
                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, display: 'block', mb: 4, px: 2 }}>
                            Just a few more steps to reach 100% and unlock premium seller benefits.
                        </Typography>
                        <List dense>
                            {[
                                { label: 'GST Verification', status: 'DONE', done: true },
                                { label: 'Bank Setup', status: 'DONE', done: true },
                                { label: 'Business Logo', status: 'FINISH', done: false }
                            ].map((step, i) => (
                                <ListItem key={i} sx={{ px: 0, py: 1.5 }}>
                                    <ListItemIcon sx={{ minWidth: 28 }}>
                                        {step.done ? <CheckCircleIcon sx={{ color: '#CFE8EC', fontSize: 20 }} /> : <Box sx={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid #cbd5e1' }} />}
                                    </ListItemIcon>
                                    <ListItemText primary={step.label} primaryTypographyProps={{ fontWeight: 700, fontSize: '0.85rem', color: '#1e293b' }} />
                                    <Typography variant="caption" sx={{ fontWeight: 900, color: step.done ? '#22c55e' : '#94a3b8' }}>{step.status}</Typography>
                                </ListItem>
                            ))}
                        </List>
                        <Divider sx={{ my: 3 }} />
                        <Stack spacing={2}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography variant="caption" sx={{ fontWeight: 700, color: '#94a3b8' }}>VERIFICATION STATUS</Typography>
                                <Chip label="APPROVED" size="small" sx={{ bgcolor: '#dcfce7', color: '#166534', fontWeight: 900, fontSize: '10px' }} />
                            </Stack>
                            <Button fullWidth startIcon={<LaunchIcon sx={{ fontSize: 16 }} />} sx={{ bgcolor: '#f8fafc', color: '#1e293b', fontWeight: 800, textTransform: 'none', border: '1px solid #f1f5f9', borderRadius: 3, py: 1 }}>View Public Profile</Button>
                            <Button fullWidth startIcon={<DownloadIcon sx={{ fontSize: 16 }} />} sx={{ bgcolor: '#f8fafc', color: '#1e293b', fontWeight: 800, textTransform: 'none', border: '1px solid #f1f5f9', borderRadius: 3, py: 1 }}>Download Certificate</Button>
                        </Stack>
                    </Paper>

                    {/* Need Assistance */}
                    <Paper elevation={0} sx={{ p: 4, borderRadius: 6, bgcolor: '#f8fafc', border: '1px solid #f1f5f9' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>Need Assistance?</Typography>
                        <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500, mb: 3 }}>
                            Our dedicated account managers are available to help you with business documentation.
                        </Typography>
                        <Button
                            endIcon={<LaunchIcon sx={{ fontSize: 14 }} />}
                            sx={{ textTransform: 'none', fontWeight: 900, p: 0, color: '#1e293b', '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' } }}
                        >
                            Contact Support
                        </Button>
                    </Paper>
                </Stack>
            </Box>
        </Box>
    );

    const renderDashboard = () => (
        <Box>
            <Typography variant="h5" sx={{ fontWeight: 900, mb: 3 }}>Dashboard Overview</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
                {[
                    { label: 'Total Sales', value: stats.totalSales, icon: <AttachMoneyOutlinedIcon />, color: '#bef264' },
                    { label: 'Total Orders', value: stats.orders, icon: <ShoppingBagOutlinedIcon />, color: '#B4D5DC' },
                    { label: 'Active Listings', value: stats.products, icon: <Inventory2OutlinedIcon />, color: '#fca5a5' },
                    { label: 'Seller Rating', value: stats.rating, icon: <TrendingUpIcon />, color: '#c4b5fd' }
                ].map((stat, i) => (
                    <Paper key={i} elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #f1f5f9', bgcolor: 'white' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                            <Box sx={{ p: 1.5, borderRadius: 3, bgcolor: stat.color, color: 'black' }}>
                                {stat.icon}
                            </Box>
                            <Chip label="+12%" size="small" sx={{ bgcolor: '#f1f5f9', fontWeight: 800, fontSize: '0.65rem' }} />
                        </Box>
                        <Typography variant="h4" sx={{ fontWeight: 900, mb: 0.5 }}>{stat.value}</Typography>
                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700 }}>{stat.label}</Typography>
                    </Paper>
                ))}
            </Box>

            {/* Recent Orders Table */}
            <Paper elevation={0} sx={{ p: 4, borderRadius: 6, border: '1px solid #f1f5f9', bgcolor: 'white' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>Recent Orders</Typography>
                    <Button sx={{ fontWeight: 800, textTransform: 'none' }} onClick={() => setActiveTab('Orders')}>View All</Button>
                </Box>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 800, color: '#94a3b8' }}>ORDER ID</TableCell>
                                <TableCell sx={{ fontWeight: 800, color: '#94a3b8' }}>PRODUCT</TableCell>
                                <TableCell sx={{ fontWeight: 800, color: '#94a3b8' }}>CUSTOMER</TableCell>
                                <TableCell sx={{ fontWeight: 800, color: '#94a3b8' }}>STATUS</TableCell>
                                <TableCell sx={{ fontWeight: 800, color: '#94a3b8' }}>AMOUNT</TableCell>
                                <TableCell sx={{ fontWeight: 800, color: '#94a3b8' }}>ACTION</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.slice(0, 5).map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell sx={{ fontWeight: 700 }}>{order.id}</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>{order.product}</TableCell>
                                    <TableCell sx={{ fontWeight: 600, color: '#64748b' }}>{order.customer}</TableCell>
                                    <TableCell><StatusChip status={order.status} /></TableCell>
                                    <TableCell sx={{ fontWeight: 800 }}>{order.amount}</TableCell>
                                    <TableCell>
                                        <IconButton size="small"><EditOutlinedIcon fontSize="small" /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );

    const renderOrders = () => (
        <Box>
            <Typography variant="h5" sx={{ fontWeight: 900, mb: 3 }}>Order Management</Typography>
            <Paper elevation={0} sx={{ p: 0, borderRadius: 6, border: '1px solid #f1f5f9', bgcolor: 'white', overflow: 'hidden' }}>
                <TableContainer>
                    <Table>
                        <TableHead sx={{ bgcolor: '#f8fafc' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 800 }}>Order Detail</TableCell>
                                <TableCell sx={{ fontWeight: 800 }}>Date</TableCell>
                                <TableCell sx={{ fontWeight: 800 }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 800 }}>Update Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id} hover>
                                    <TableCell>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{order.id}</Typography>
                                        <Typography variant="body2" sx={{ color: '#64748b' }}>{order.product}</Typography>
                                        <Typography variant="caption" sx={{ color: '#94a3b8' }}>Customer: {order.customer}</Typography>
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 600, color: '#64748b' }}>{order.date}</TableCell>
                                    <TableCell><StatusChip status={order.status} /></TableCell>
                                    <TableCell>
                                        <Stack direction="row" spacing={1}>
                                            <Button size="small" variant="contained" color="primary" disabled={order.status === 'Shipped'} onClick={() => handleStatusUpdate(order.id, 'Shipped')} sx={{ boxShadow: 'none', borderRadius: 2 }}>Ship</Button>
                                            <Button size="small" variant="contained" color="success" disabled={order.status === 'Delivered'} onClick={() => handleStatusUpdate(order.id, 'Delivered')} sx={{ boxShadow: 'none', borderRadius: 2 }}>Deliver</Button>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {orders.length === 0 && <TableRow><TableCell colSpan={4} align="center">No orders found.</TableCell></TableRow>}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );

    const renderInventory = () => (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 900 }}>Product Inventory</Typography>
                <Button variant="contained" startIcon={<AddIcon />} sx={{ bgcolor: 'black', color: 'white', fontWeight: 800, borderRadius: 3, textTransform: 'none' }} onClick={() => navigate('/wholesale', { state: { view: 'upload' } })}>
                    Add New Product
                </Button>
            </Box>

            <Paper elevation={0} sx={{ p: 4, borderRadius: 6, border: '1px solid #f1f5f9', bgcolor: 'white' }}>
                {products.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 5 }}>
                        <Inventory2OutlinedIcon sx={{ fontSize: 48, color: '#e2e8f0', mb: 2 }} />
                        <Typography sx={{ color: '#94a3b8' }}>No products found in your inventory.</Typography>
                    </Box>
                ) : (
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 800 }}>PRODUCT</TableCell>
                                    <TableCell sx={{ fontWeight: 800 }}>CATEGORY</TableCell>
                                    <TableCell sx={{ fontWeight: 800 }}>STOCK</TableCell>
                                    <TableCell sx={{ fontWeight: 800 }}>PRICE</TableCell>
                                    <TableCell sx={{ fontWeight: 800 }}>ACTIONS</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products.map((p) => (
                                    <TableRow key={p._id}>
                                        <TableCell sx={{ display: 'flex', gap: 2, alignItems: 'center', borderBottom: 'none' }}>
                                            <Avatar src={p.images?.[0]} variant="rounded" sx={{ width: 50, height: 50 }} />
                                            <Box>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{p.title}</Typography>
                                                <Typography variant="caption" sx={{ color: '#64748b' }}>ID: {p._id.slice(-6).toUpperCase()}</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>{p.category || 'Retail'}</TableCell>
                                        <TableCell>
                                            <Chip label="In Stock" size="small" color="success" variant="outlined" sx={{ fontWeight: 800 }} />
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 800 }}>₹{p.price || p.pricePerUnit}</TableCell>
                                        <TableCell>
                                            <IconButton size="small"><EditOutlinedIcon /></IconButton>
                                            <IconButton size="small" color="error"><DeleteOutlineIcon /></IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Paper>
        </Box>
    );

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f1f5f9', pb: 8 }}>
            {/* Seller Portal Header */}
            <Box sx={{ bgcolor: '#CFE8EC', py: 1.5, borderBottom: '1px solid rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 1100 }}>
                <Container maxWidth="xl">
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" alignItems="center" spacing={4}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 900,
                                    color: '#1e293b',
                                    letterSpacing: 1,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                }}
                                onClick={() => navigate('/')}
                            >
                                <BusinessIcon sx={{ fontSize: 28 }} />
                                SELLERPORTAL
                            </Typography>

                            <Stack direction="row" spacing={0.5}>
                                {navItems.map((item) => (
                                    <Button
                                        key={item}
                                        onClick={() => setActiveTab(item)}
                                        sx={{
                                            color: activeTab === item ? '#1e293b' : '#64748b',
                                            fontWeight: 700,
                                            textTransform: 'none',
                                            fontSize: '0.9rem',
                                            px: 2,
                                            position: 'relative',
                                            '&::after': activeTab === item ? {
                                                content: '""',
                                                position: 'absolute',
                                                bottom: -15,
                                                left: 0,
                                                right: 0,
                                                height: 3,
                                                bgcolor: 'white',
                                                borderRadius: '3px 3px 0 0'
                                            } : {}
                                        }}
                                    >
                                        {item}
                                    </Button>
                                ))}
                            </Stack>
                        </Stack>

                        <Stack direction="row" spacing={2} alignItems="center">
                            <IconButton><NotificationsIcon sx={{ color: '#64748b' }} /></IconButton>
                            <Avatar sx={{ width: 32, height: 32, bgcolor: '#0f172a', fontSize: '0.8rem', fontWeight: 800 }}>{name[0]}</Avatar>
                        </Stack>
                    </Stack>
                </Container>
            </Box>

            <Container maxWidth="xl" sx={{ mt: 4 }}>
                {activeTab === 'Business Profile' && renderBusinessProfile()}
                {activeTab === 'Dashboard' && renderDashboard()}
                {activeTab === 'Orders' && renderOrders()}
                {activeTab === 'Inventory' && renderInventory()}
                {/* Fallback for other tabs not yet implemented with new UI */}
                {/* {activeTab === 'Payouts' && renderBusinessProfile()} Using Business Profile as placeholder */}
            </Container>

            {/* Seller Footer */}
            <Box sx={{ mt: 10, py: 6, borderTop: '1px solid #e2e8f0' }}>
                <Container maxWidth="xl">
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                            <Box sx={{ bgcolor: '#1e293b', p: 0.5, borderRadius: 1 }}>
                                <BusinessIcon sx={{ color: 'white', fontSize: 18 }} />
                            </Box>
                            <Typography variant="caption" sx={{ fontWeight: 800, color: '#94a3b8' }}>SELLERPORTAL</Typography>
                        </Stack>
                        <Stack direction="row" spacing={4}>
                            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700 }}>PRIVACY POLICY</Typography>
                            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700 }}>TERMS OF SERVICE</Typography>
                            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700 }}>HELP CENTER</Typography>
                        </Stack>
                        <Typography variant="caption" sx={{ color: '#cbd5e1', fontWeight: 600 }}>© 2024 LUMINA TECH SOLUTIONS. ALL RIGHTS RESERVED.</Typography>
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
};

export default SellerProfile;
