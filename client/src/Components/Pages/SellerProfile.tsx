import { useState } from 'react';
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
    Grid,
    Divider,
    CircularProgress,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
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
    Download as DownloadIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SellerProfile = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Business Profile');

    const navItems = ['Dashboard', 'Business Profile', 'Inventory', 'Payouts'];

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
                            <Avatar sx={{ width: 32, height: 32, bgcolor: '#0f172a', fontSize: '0.8rem', fontWeight: 800 }}>LT</Avatar>
                        </Stack>
                    </Stack>
                </Container>
            </Box>

            <Container maxWidth="xl" sx={{ mt: 4 }}>
                <Grid container spacing={4}>
                    {/* Left Column */}
                    <Grid size={{ xs: 12, lg: 8.5 }}>
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
                                        src="https://img.logo.com/outputs/7438183/1000x1000.png"
                                        sx={{ width: 140, height: 140, borderRadius: 5, border: '6px solid white', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', bgcolor: '#f8fafc' }}
                                    />
                                    <IconButton size="small" sx={{ position: 'absolute', top: -10, right: -10, bgcolor: '#CFE8EC', color: '#1e293b', border: '3px solid white', '&:hover': { bgcolor: '#b8dbe2' } }}>
                                        <EditIcon sx={{ fontSize: 16 }} />
                                    </IconButton>
                                </Box>

                                <Box sx={{ pb: 1, flexGrow: 1 }}>
                                    <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 0.5 }}>
                                        <Typography variant="h4" sx={{ fontWeight: 900, color: '#0f172a' }}>Lumina Tech Solutions Pvt Ltd</Typography>
                                        <Chip
                                            icon={<VerifiedIcon sx={{ fontSize: '1rem !important' }} />}
                                            label="VERIFIED ENTERPRISE SELLER"
                                            size="small"
                                            sx={{ bgcolor: '#eff6ff', color: '#1d4ed8', fontWeight: 800, px: 1 }}
                                        />
                                    </Stack>
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600 }}>Enterprise Account #ETS-9920</Typography>
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
                                <Grid container spacing={4}>
                                    <Grid size={{ xs: 6 }}>
                                        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Legal Business Name</Typography>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1e293b' }}>Lumina Tech Solutions Private Limited</Typography>
                                    </Grid>
                                    <Grid size={{ xs: 6 }}>
                                        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Business Type</Typography>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1e293b' }}>Private Limited Company</Typography>
                                    </Grid>
                                    <Grid size={{ xs: 6 }}>
                                        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Incorporation Date</Typography>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1e293b' }}>12 Oct 2018</Typography>
                                    </Grid>
                                    <Grid size={{ xs: 6 }}>
                                        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Primary Category</Typography>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1e293b' }}>Electronics & Office Supplies</Typography>
                                    </Grid>
                                </Grid>
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
                                <Grid container spacing={4} sx={{ mb: 4 }}>
                                    <Grid size={{ xs: 6 }}>
                                        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>GSTIN</Typography>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1e293b' }}>29AAAAA0000A1Z5</Typography>
                                            <Chip label="Verified" size="small" icon={<CheckCircleIcon sx={{ fontSize: '12px !important' }} />} sx={{ height: 20, fontSize: '10px', fontWeight: 900, bgcolor: '#f0fdf4', color: '#16a34a' }} />
                                        </Stack>
                                    </Grid>
                                    <Grid size={{ xs: 6 }}>
                                        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>PAN Number</Typography>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1e293b' }}>ABCDE1234F</Typography>
                                    </Grid>
                                </Grid>
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
                                    <Grid container spacing={4}>
                                        <Grid size={{ xs: 4 }}>
                                            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Bank Name</Typography>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1e293b' }}>International Finance Bank</Typography>
                                        </Grid>
                                        <Grid size={{ xs: 4 }}>
                                            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Account Number</Typography>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1e293b' }}>**** **** 8920</Typography>
                                                <Chip label="Verified" size="small" sx={{ height: 20, fontSize: '10px', fontWeight: 900, bgcolor: '#eff6ff', color: '#1d4ed8' }} />
                                            </Stack>
                                        </Grid>
                                        <Grid size={{ xs: 4 }}>
                                            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>IFSC Code</Typography>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1e293b' }}>IFBK0009122</Typography>
                                        </Grid>
                                    </Grid>
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
                    </Grid>

                    {/* Right Column */}
                    <Grid size={{ xs: 12, lg: 3.5 }}>
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
                    </Grid>
                </Grid>
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
