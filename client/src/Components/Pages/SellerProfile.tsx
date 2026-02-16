import React, { useState, useEffect } from 'react';
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
    TableRow,
    TextField
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
    WorkOutline as WorkIcon,
    Warehouse as WarehouseIcon,
    Delete as DeleteIcon,
    Search as SearchIcon,
    FilterList as FilterIcon,
    FileUpload as ExportIcon,
    MoreVert as MoreVertIcon,
    TrendingUp as TrendingUpIcon,
    BarChart as BarChartIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { AuthService, FreelanceService, WholesaleService } from '../../services/api';

const SellerProfile = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Business Profile');
    const [myInterests, setMyInterests] = useState<any[]>([]);
    const [wholesaleProducts, setWholesaleProducts] = useState<any[]>([]);
    const [sellerProfile, setSellerProfile] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const name = sellerProfile?.username || sellerProfile?.profile?.name || 'Seller Name';
    const avatar = sellerProfile?.profile?.avatar || '';
    const uniqueId = sellerProfile?.uniqueId || sellerProfile?.freelancer?.freelancerId || 'LOADING...';

    const navItems = ['Business Profile', 'Wholesale', 'Freelance'];

    useEffect(() => {
        fetchSellerData();
    }, []);

    const fetchSellerData = async () => {
        try {
            const { data } = await AuthService.getMe();
            setSellerProfile(data);

            try {
                const interestRes = await FreelanceService.getMyInterests();
                setMyInterests(interestRes.data || []);
            } catch (error) {
                console.error("Error fetching interests", error);
            }

            try {
                const prodRes = await WholesaleService.getMyProducts();
                setWholesaleProducts(prodRes.data || []);
            } catch (error) {
                console.error("Error fetching wholesale products", error);
            }

        } catch (error) {
            console.error("Error loading seller profile:", error);
        }
    };

    const handleDeleteWholesale = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this listing?")) return;
        try {
            await WholesaleService.delete(id);
            setWholesaleProducts(prev => prev.filter(p => p._id !== id));
        } catch (error) {
            console.error("Failed to delete wholesale product:", error);
            alert("Failed to delete product.");
        }
    };

    const handleDownload = (url: string, fileName: string) => {
        if (!url) {
            alert(`Document "${fileName}" has not been uploaded yet. Please click "EDIT" to upload your documents.`);
            return;
        }
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        link.setAttribute('target', '_blank');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
                            src={sellerProfile?.profile?.cover || "https://images.unsplash.com/photo-1542332213-31f87348057f?auto=format&fit=crop&q=80&w=1500"}
                            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <Button
                            startIcon={<CameraIcon />}
                            onClick={() => navigate('/seller/edit-profile')}
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
                            <IconButton
                                size="small"
                                onClick={() => navigate('/seller/edit-profile')}
                                sx={{ position: 'absolute', top: -10, right: -10, bgcolor: '#CFE8EC', color: '#1e293b', border: '3px solid white', '&:hover': { bgcolor: '#b8dbe2' } }}
                            >
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
                            <Button startIcon={<EditIcon />} sx={{ textTransform: 'none', fontWeight: 800, color: '#64748b' }} onClick={() => navigate('/seller/edit-profile')}>EDIT</Button>
                        </Stack>
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 4 }}>
                            <Box>
                                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Legal Business Name</Typography>
                                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1e293b' }}>{sellerProfile?.businessDetails?.businessName || sellerProfile?.username || 'N/A'}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Business Type</Typography>
                                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1e293b' }}>Private Limited Company</Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Incorporation Date</Typography>
                                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1e293b' }}>{new Date(sellerProfile?.createdAt).toLocaleDateString('en-GB') || 'N/A'}</Typography>
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
                            <Button startIcon={<EditIcon />} sx={{ textTransform: 'none', fontWeight: 800, color: '#64748b' }} onClick={() => navigate('/seller/edit-profile')}>EDIT</Button>
                        </Stack>
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 4, mb: 4 }}>
                            <Box>
                                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>GSTIN</Typography>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1e293b' }}>{sellerProfile?.businessDetails?.gst || 'N/A'}</Typography>
                                    {sellerProfile?.businessDetails?.gst && (
                                        <Chip label="Verified" size="small" icon={<CheckCircleIcon sx={{ fontSize: '12px !important' }} />} sx={{ height: 20, fontSize: '10px', fontWeight: 900, bgcolor: '#f0fdf4', color: '#16a34a' }} />
                                    )}
                                </Stack>
                            </Box>
                            <Box>
                                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>PAN Number</Typography>
                                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1e293b' }}>{sellerProfile?.freelancer?.panNumber || 'N/A'}</Typography>
                            </Box>
                        </Box>
                        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', display: 'block', mb: 2 }}>Uploaded Documents</Typography>
                        <Stack direction="row" spacing={2} flexWrap="wrap">
                            {[
                                { name: 'GST Certificate', url: sellerProfile?.businessDetails?.idProof },
                                { name: 'PAN Card', url: sellerProfile?.freelancer?.panFile }
                            ].map((doc, i) => (
                                doc.url ? (
                                    <Paper key={i} elevation={0} sx={{ p: 2, borderRadius: 3, border: '1px solid #f1f5f9', bgcolor: '#f8fafc', flexGrow: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Box sx={{ p: 1, bgcolor: '#fee2e2', color: '#ef4444', borderRadius: 1.5 }}>
                                            <FileIcon />
                                        </Box>
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Typography variant="body2" sx={{ fontWeight: 700 }}>{doc.name}</Typography>
                                            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>Uploaded</Typography>
                                        </Box>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleDownload(doc.url, doc.name)}
                                            sx={{ color: '#1e293b' }}
                                        >
                                            <DownloadIcon sx={{ fontSize: 18 }} />
                                        </IconButton>
                                    </Paper>
                                ) : null
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
                            <Button startIcon={<EditIcon />} sx={{ textTransform: 'none', fontWeight: 800, color: '#64748b' }} onClick={() => navigate('/seller/edit-profile')}>EDIT</Button>
                        </Stack>
                        <Box sx={{ p: 3, borderRadius: 4, bgcolor: '#f8fafc', border: '1px solid #f1f5f9' }}>
                            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
                                <Box>
                                    <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Bank Name</Typography>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1e293b' }}>{sellerProfile?.bankDetails?.bankName || 'N/A'}</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Account Number</Typography>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1e293b' }}>
                                            {sellerProfile?.bankDetails?.accountNumber ? `**** **** ${sellerProfile.bankDetails.accountNumber.slice(-4)}` : 'N/A'}
                                        </Typography>
                                        {sellerProfile?.bankDetails?.accountNumber && (
                                            <Chip label="Verified" size="small" sx={{ height: 20, fontSize: '10px', fontWeight: 900, bgcolor: '#eff6ff', color: '#1d4ed8' }} />
                                        )}
                                    </Stack>
                                </Box>
                                <Box>
                                    <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>IFSC Code</Typography>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1e293b' }}>{sellerProfile?.bankDetails?.ifsc || 'N/A'}</Typography>
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
                            {sellerProfile?.profile?.address ? (
                                <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #f1f5f9', bgcolor: 'white' }}>
                                    <Stack direction="row" justifyContent="space-between">
                                        <Stack direction="row" spacing={2}>
                                            <Box sx={{ p: 1, bgcolor: '#f1f5f9', borderRadius: 2, height: 'fit-content' }}>
                                                <LocationIcon sx={{ color: '#94a3b8' }} />
                                            </Box>
                                            <Box>
                                                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                                                    <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>Main Registered Address</Typography>
                                                    <Chip label="PRIMARY" size="small" sx={{ height: 18, fontSize: '9px', fontWeight: 900, bgcolor: '#eff6ff', color: '#1d4ed8' }} />
                                                </Stack>
                                                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>{sellerProfile.profile.address}</Typography>
                                            </Box>
                                        </Stack>
                                        <Stack direction="row" spacing={1}>
                                            <IconButton size="small" sx={{ border: '1px solid #f1f5f9' }} onClick={() => navigate('/seller/edit-profile')}><EditIcon sx={{ fontSize: 16 }} /></IconButton>
                                        </Stack>
                                    </Stack>
                                </Paper>
                            ) : (
                                <Typography variant="body2" sx={{ color: '#64748b' }}>No address added yet.</Typography>
                            )}
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
                            <Button
                                fullWidth
                                startIcon={<DownloadIcon sx={{ fontSize: 16 }} />}
                                sx={{ bgcolor: '#f8fafc', color: '#1e293b', fontWeight: 800, textTransform: 'none', border: '1px solid #f1f5f9', borderRadius: 3, py: 1 }}
                                onClick={() => handleDownload(sellerProfile?.businessDetails?.idProof || sellerProfile?.freelancer?.freelancerIdFile, 'GST_Certificate.pdf')}
                                disabled={!sellerProfile?.businessDetails?.idProof && !sellerProfile?.freelancer?.freelancerIdFile}
                            >
                                Download Certificate
                            </Button>
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

    const renderWholesale = () => {


        const filteredProducts = wholesaleProducts.filter(p =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.sku?.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return (
            <Box>
                {/* Overview Section */}
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 3, mb: 4 }}>
                    {/* Wholesale Overview Card */}
                    <Paper elevation={0} sx={{ p: 3.5, borderRadius: 6, border: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between' }}>
                        <Box>
                            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800, letterSpacing: 1 }}>WHOLESALE OVERVIEW</Typography>
                            <Stack direction="row" alignItems="baseline" spacing={1.5} sx={{ mt: 1, mb: 2 }}>
                                <Typography variant="h3" sx={{ fontWeight: 900, color: '#0f172a' }}>{wholesaleProducts.length}</Typography>
                                <Typography variant="h6" sx={{ color: '#adc9d1', fontWeight: 700 }}>Active Listings</Typography>
                            </Stack>

                            <Stack direction="row" spacing={4}>
                                <Box>
                                    <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700 }}>Total Stock Value</Typography>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0f172a' }}>₹{wholesaleProducts.reduce((sum, p) => sum + (p.pricePerUnit || 0) * (p.packSize || 1), 0).toLocaleString()}</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700 }}>Growth (Monthly)</Typography>
                                    <Stack direction="row" alignItems="center" spacing={0.5}>
                                        <TrendingUpIcon sx={{ fontSize: 16, color: '#22c55e' }} />
                                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#22c55e' }}>+12.5%</Typography>
                                    </Stack>
                                </Box>
                            </Stack>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', opacity: 0.1 }}>
                            <BarChartIcon sx={{ fontSize: 120, color: '#adc9d1' }} />
                        </Box>
                    </Paper>

                    {/* Pending Approvals Card */}
                    <Paper elevation={0} sx={{ p: 3.5, borderRadius: 6, bgcolor: '#0f172a', color: 'white', display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                            <Box sx={{ p: 1, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
                                <NotificationsIcon sx={{ fontSize: 24, color: '#adc9d1' }} />
                            </Box>
                        </Box>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 800, letterSpacing: 1 }}>PENDING APPROVALS</Typography>
                        <Typography variant="h3" sx={{ fontWeight: 900, mt: 0.5, mb: 'auto' }}>
                            {wholesaleProducts.filter(p => !p.isApproved).length || 0} Items
                        </Typography>
                        <Button
                            endIcon={<LaunchIcon sx={{ fontSize: 16 }} />}
                            sx={{ color: '#adc9d1', textTransform: 'none', fontWeight: 800, justifyContent: 'flex-start', p: 0, '&:hover': { bgcolor: 'transparent', color: 'white' } }}
                        >
                            View Details
                        </Button>
                    </Paper>
                </Box>

                {/* Filters and Actions Bar */}
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }} alignItems="center" justifyContent="space-between">
                    <TextField
                        placeholder="Search wholesale items..."
                        size="small"
                        value={searchQuery}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                        InputProps={{
                            startAdornment: <SearchIcon sx={{ color: '#94a3b8', mr: 1 }} />,
                            sx: { borderRadius: 3, bgcolor: 'white', minWidth: { sm: 320 } }
                        }}
                    />
                    <Stack direction="row" spacing={1.5}>
                        <Button startIcon={<FilterIcon />} variant="outlined" sx={{ borderRadius: 3, textTransform: 'none', fontWeight: 700, borderColor: '#e2e8f0', color: '#64748b' }}>Filters</Button>
                        <Button startIcon={<ExportIcon />} variant="outlined" sx={{ borderRadius: 3, textTransform: 'none', fontWeight: 700, borderColor: '#e2e8f0', color: '#64748b' }}>Export</Button>
                        <Button
                            startIcon={<AddIcon />}
                            variant="contained"
                            onClick={() => navigate('/wholesale', { state: { view: 'upload' } })}
                            sx={{ borderRadius: 3, textTransform: 'none', fontWeight: 900, bgcolor: '#0f172a', '&:hover': { bgcolor: '#1e293b' } }}
                        >
                            Post New
                        </Button>
                    </Stack>
                </Stack>

                {/* Products Grid/List */}
                <Stack spacing={2.5}>
                    {filteredProducts.map((product) => (
                        <Paper
                            key={product._id}
                            elevation={0}
                            sx={{
                                p: 2,
                                borderRadius: 5,
                                border: '1px solid #f1f5f9',
                                bgcolor: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 3,
                                transition: 'all 0.2s',
                                '&:hover': { border: '1px solid #adc9d1', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }
                            }}
                        >
                            {/* Product Image */}
                            <Box
                                component="img"
                                src={product.images?.[0] || 'https://images.unsplash.com/photo-1581094751197-2732481323b0?auto=format&fit=crop&q=80&w=200'}
                                sx={{ width: 100, height: 100, borderRadius: 4, objectFit: 'cover', bgcolor: '#f8fafc' }}
                            />

                            {/* Info Section */}
                            <Box sx={{ flexGrow: 1 }}>
                                <Stack direction="row" alignItems="center" spacing={1.5}>
                                    <Typography variant="h6" sx={{ fontWeight: 900, color: '#0f172a' }}>{product.title}</Typography>
                                    <Chip
                                        label={product.category?.toUpperCase() || 'UNCLASSIFIED'}
                                        size="small"
                                        sx={{ height: 20, fontSize: '0.65rem', fontWeight: 800, bgcolor: '#f1f5f9', color: '#64748b', letterSpacing: 0.5 }}
                                    />
                                </Stack>
                                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, display: 'block', mt: 0.5 }}>SKU: {product.sku || 'N/A'}</Typography>
                            </Box>

                            {/* Stats in Middle */}
                            <Box sx={{ textAlign: 'center', minWidth: 100, p: 1.5, borderRadius: 3, bgcolor: '#f8fafc' }}>
                                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800, fontSize: '0.6rem', letterSpacing: 1, display: 'block', mb: 0.5 }}>MIN ORDER</Typography>
                                <Typography variant="subtitle2" sx={{ fontWeight: 900, color: '#0f172a' }}>{product.packSize} Units</Typography>
                            </Box>

                            <Box sx={{ textAlign: 'center', minWidth: 120, p: 1.5, borderRadius: 3, bgcolor: (product.stock > 0 || product.inStock) ? '#f0fdf4' : '#fef2f2' }}>
                                <Typography variant="caption" sx={{ color: (product.stock > 0 || product.inStock) ? '#16a34a' : '#ef4444', fontWeight: 800, fontSize: '0.6rem', letterSpacing: 1, display: 'block', mb: 0.5 }}>STOCK STATUS</Typography>
                                <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="center">
                                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: (product.stock > 0 || product.inStock) ? '#16a34a' : '#ef4444' }} />
                                    <Typography variant="subtitle2" sx={{ fontWeight: 900, color: (product.stock > 0 || product.inStock) ? '#16a34a' : '#ef4444' }}>
                                        {(product.stock > 0 || product.inStock) ? 'In Stock' : 'Out of Stock'}
                                    </Typography>
                                </Stack>
                            </Box>

                            {/* Actions Right */}
                            <Stack direction="row" spacing={1}>
                                <IconButton
                                    size="small"
                                    sx={{ bgcolor: '#f8fafc', '&:hover': { bgcolor: '#f1f5f9' } }}
                                    onClick={() => navigate('/wholesale', { state: { view: 'upload', editProduct: product } })}
                                >
                                    <EditIcon sx={{ fontSize: 18 }} />
                                </IconButton>
                                <IconButton
                                    size="small"
                                    sx={{ bgcolor: '#f8fafc', '&:hover': { bgcolor: '#fee2e2', color: '#ef4444' } }}
                                    onClick={() => handleDeleteWholesale(product._id)}
                                >
                                    <DeleteIcon sx={{ fontSize: 18 }} />
                                </IconButton>
                                <IconButton size="small" sx={{ bgcolor: '#f8fafc' }}>
                                    <MoreVertIcon sx={{ fontSize: 18 }} />
                                </IconButton>
                            </Stack>
                        </Paper>
                    ))}

                    {filteredProducts.length === 0 && (
                        <Box sx={{ textAlign: 'center', py: 10, bgcolor: 'white', borderRadius: 6, border: '2px dashed #e2e8f0' }}>
                            <WarehouseIcon sx={{ fontSize: 48, color: '#e2e8f0', mb: 2 }} />
                            <Typography variant="h6" sx={{ color: '#94a3b8', fontWeight: 800 }}>No products found</Typography>
                            <Typography variant="body2" sx={{ color: '#cbd5e1', mt: 1 }}>Try adjusting your search or add a new listing.</Typography>
                        </Box>
                    )}
                </Stack>
            </Box>
        );
    };

    const renderFreelance = () => {
        const freelancer = sellerProfile?.freelancer;
        const isRegistered = freelancer?.isRegistered;
        const status = freelancer?.status;

        return (
            <Box>
                <Typography variant="h5" sx={{ fontWeight: 900, mb: 3 }}>Freelance Profile</Typography>

                <Paper elevation={0} sx={{ p: 4, borderRadius: 6, border: '1px solid #f1f5f9', bgcolor: 'white', mb: 4 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 800 }}>Registration Status</Typography>
                        {isRegistered ? (
                            <Chip label={status?.toUpperCase() || 'PENDING'} color={status === 'Approved' ? 'success' : 'warning'} sx={{ fontWeight: 800 }} />
                        ) : (
                            <Button variant="contained" size="small" onClick={() => navigate('/freelance')} sx={{ bgcolor: 'black' }}>Register Now</Button>
                        )}
                    </Stack>
                    {isRegistered && (
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
                            <Box>
                                <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700 }}>Category</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>{freelancer.category || 'N/A'}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700 }}>Freelancer ID</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>{freelancer.freelancerId || 'N/A'}</Typography>
                            </Box>
                            <Box sx={{ gridColumn: { sm: 'span 2' } }}>
                                <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700 }}>Portfolio</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>{freelancer.portfolio ? <a href={freelancer.portfolio} target="_blank" rel="noopener noreferrer">View Portfolio</a> : 'N/A'}</Typography>
                            </Box>
                        </Box>
                    )}
                </Paper>

                <Typography variant="h6" sx={{ fontWeight: 900, mb: 2 }}>My Submitted Interests</Typography>
                <Paper elevation={0} sx={{ p: 0, borderRadius: 6, border: '1px solid #f1f5f9', bgcolor: 'white', overflow: 'hidden' }}>
                    <TableContainer>
                        <Table>
                            <TableHead sx={{ bgcolor: '#f8fafc' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 800 }}>Post Title</TableCell>
                                    <TableCell sx={{ fontWeight: 800 }}>Proposed Price</TableCell>
                                    <TableCell sx={{ fontWeight: 800 }}>Duration</TableCell>
                                    <TableCell sx={{ fontWeight: 800 }}>Status</TableCell>
                                    <TableCell sx={{ fontWeight: 800 }}>My Proposal</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {myInterests.map((interest: any) => (
                                    <TableRow key={interest._id} hover>
                                        <TableCell>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{interest.post?.title || 'Unknown'}</Typography>
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 700 }}>₹{interest.proposedPrice}</TableCell>
                                        <TableCell>{interest.estimatedDuration}</TableCell>
                                        <TableCell>
                                            <Chip size="small" label={interest.status} color={interest.status === 'Approved' ? 'success' : interest.status === 'Rejected' ? 'error' : 'default'} sx={{ fontWeight: 800 }} />
                                        </TableCell>
                                        <TableCell sx={{ maxWidth: 300 }}>
                                            <Typography variant="body2" sx={{ color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{interest.details}</Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {myInterests.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                                            <WorkIcon sx={{ fontSize: 40, color: '#e2e8f0', mb: 1 }} />
                                            <Typography variant="body2" sx={{ color: '#94a3b8' }}>You haven't expressed interest in any freelance posts yet.</Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        );
    };

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
                {activeTab === 'Wholesale' && renderWholesale()}
                {activeTab === 'Freelance' && renderFreelance()}
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
