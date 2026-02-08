import { useState } from 'react';
import { Box, Typography, Paper, Stack, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Grid, Chip, Button, Avatar, Dialog, DialogContent, Drawer } from '@mui/material';
import {
    Dashboard as DashboardIcon,
    Store as StoreIcon,
    Warehouse as WarehouseIcon,
    FlashOn as FlashOnIcon,
    Autorenew as AutorenewIcon,
    WorkOutline as WorkOutlineIcon,
    DarkModeOutlined as DarkModeIcon,
    ExitToApp as ExitToAppIcon,
    VerifiedUser as VerifiedUserIcon,
    Article as ArticleIcon,
    Description as DescriptionIcon,
    CreditCard as CreditCardIcon,
    Badge as BadgeIcon,
    Verified as VerifiedIcon,
    Menu as MenuIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const FreelanceManagement = () => {
    const navigate = useNavigate();
    const [openVerification, setOpenVerification] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleOpenVerification = () => setOpenVerification(true);
    const handleCloseVerification = () => setOpenVerification(false);
    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

    const menuItems = [
        { name: 'Overview', icon: <DashboardIcon />, path: '/admin/dashboard' },
        { name: 'Retail', icon: <StoreIcon />, path: '/admin/retail' },
        { name: 'Wholesale', icon: <WarehouseIcon />, path: '/admin/wholesale' },
        { name: 'Q-Commerce', icon: <FlashOnIcon />, path: '/admin/quick' },
        { name: 'Resale', icon: <AutorenewIcon />, path: '/admin/resale' },
        { name: 'Freelance', icon: <WorkOutlineIcon />, path: '/admin/freelance', active: true },
    ];

    const buyerPosts = [
        {
            category: 'UI DESIGN',
            time: '2 hours ago',
            title: 'Mobile App Redesign for FinTech',
            desc: 'Looking for an experienced UI designer to refresh our mobile banking interface...',
            company: 'Digital Dynamics Inc.',
            price: '$2,400',
            icon: <DashboardIcon sx={{ color: '#64748b' }} />
        },
        {
            category: 'DEVELOPMENT',
            time: '5 hours ago',
            title: 'Full-Stack React/Node Developer',
            desc: 'Require a senior developer for a 3-month contract to build our internal...',
            company: 'CloudScale Solutions',
            price: '$45/hr',
            icon: <FlashOnIcon sx={{ color: '#64748b' }} />
        },
        {
            category: 'CONTENT',
            time: '1 day ago',
            title: 'SaaS Technical Writer Needed',
            desc: 'We need help documentation and weekly blog posts for our upcoming...',
            company: 'SecureNode',
            price: '$800/mo',
            icon: <ArticleIcon sx={{ color: '#64748b' }} />
        }
    ];

    const verificationQueue = [
        {
            id: 'AR',
            name: 'Alex Rivera',
            email: 'alex.rivera@example.com',
            date: 'Oct 24, 2023',
            docs: ['PAN CARD', 'FREELANCE ID'],
            role: 'Graphic Designer',
            roleColor: '#3f6212', // dark green bg for badge
            roleText: '#d9f99d', // light lime text
            avatarColor: '#1e293b'
        },
        {
            id: 'SC',
            name: 'Sarah Chen',
            email: 's.chen@devmail.io',
            date: 'Oct 23, 2023',
            docs: ['PASSPORT', 'TAX CERT'],
            role: 'JS Architect',
            roleColor: '#1e3a8a', // dark blue
            roleText: '#bfdbfe', // light blue
            avatarColor: '#172554'
        },
        {
            id: 'MK',
            name: 'Marcus King',
            email: 'm.king@writer.net',
            date: 'Oct 22, 2023',
            docs: ['ID CARD'],
            role: 'Copywriter',
            roleColor: '#7c2d12', // dark orange/brown
            roleText: '#fed7aa', // light orange
            avatarColor: '#431407'
        }
    ];

    const interests = [
        {
            name: 'Jordan Smith',
            action: 'expressed interest in',
            target: 'Web Development for E-commerce Platform',
            bid: '$3,200',
            initials: 'JS'
        },
        {
            name: 'Elena Rodriguez',
            action: 'expressed interest in',
            target: 'Branding & Logo Design for Startup',
            bid: '$1,500',
            initials: 'ER'
        },
        {
            name: 'Thomas Miller',
            action: 'expressed interest in',
            target: 'Content Strategy for Tech Blog',
            bid: '$40/hr',
            initials: 'TM'
        }
    ];

    const drawerWidth = 260;

    const drawerContent = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 3 }}>
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 5, px: 2 }}>
                <Box sx={{ bgcolor: '#bef264', p: 0.5, borderRadius: 1, display: 'flex' }}>
                    <WorkOutlineIcon sx={{ color: 'black' }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: 'white' }}>freelance</Typography>
            </Stack>

            <List disablePadding>
                {menuItems.map((item) => (
                    <ListItemButton
                        key={item.name}
                        onClick={() => item.path !== '/admin/freelance' && navigate(item.path)}
                        sx={{
                            mb: 1,
                            borderRadius: 3,
                            bgcolor: item.active ? '#bef264' : 'transparent',
                            color: item.active ? 'black' : '#94a3b8',
                            '&:hover': { bgcolor: item.active ? '#bef264' : '#1e293b', color: item.active ? 'black' : 'white' },
                            py: 1.5
                        }}
                    >
                        <ListItemIcon sx={{ minWidth: 40, color: item.active ? 'black' : '#64748b' }}>
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
    );

    return (
        <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#0f172a', overflow: 'hidden' }}>
            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: '#0f172a', borderRight: '1px solid #1e293b' },
                }}
            >
                {drawerContent}
            </Drawer>

            {/* Desktop Sidebar */}
            <Box
                sx={{
                    width: drawerWidth,
                    bgcolor: '#0f172a',
                    borderRight: '1px solid #1e293b',
                    display: { xs: 'none', md: 'block' },
                    flexShrink: 0
                }}
            >
                {drawerContent}
            </Box>

            {/* Main Content (Dark Mode) */}
            <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, overflow: 'auto', bgcolor: 'white', width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` } }}>

                <Stack direction="row" alignItems="center" sx={{ mb: 2, display: { md: 'none' } }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ color: 'white' }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>Freelance Management</Typography>
                </Stack>

                {/* Buyer Posts Section */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Box sx={{ p: 1, bgcolor: '#1e293b', borderRadius: 1, color: '#38bdf8' }}><ArticleIcon fontSize="small" /></Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'white' }}>Buyer Posts</Typography>
                    </Stack>
                    <Typography variant="body2" sx={{ color: '#bef264', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        View All Posts →
                    </Typography>
                </Stack>

                <Grid container spacing={3} sx={{ mb: 5 }}>
                    {buyerPosts.map((post, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                            <Paper sx={{ p: 3, bgcolor: '#1e293b', borderRadius: 3, color: 'white', height: '100%', display: 'flex', flexDirection: 'column', border: '1px solid #334155' }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                                    <Chip label={post.category} size="small" sx={{ bgcolor: '#334155', color: '#94a3b8', fontWeight: 700, fontSize: '0.65rem', borderRadius: 1 }} />
                                    <Typography variant="caption" sx={{ color: '#64748b' }}>{post.time}</Typography>
                                </Stack>
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, fontSize: '1.1rem', lineHeight: 1.3 }}>{post.title}</Typography>
                                <Typography variant="body2" sx={{ color: '#94a3b8', mb: 3, flexGrow: 1 }}>{post.desc}</Typography>

                                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 'auto', pt: 2, borderTop: '1px solid #334155' }}>
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <Box sx={{ width: 24, height: 24, borderRadius: '50%', bgcolor: 'white' }} />
                                        <Typography variant="caption" sx={{ color: 'white', fontWeight: 500 }}>{post.company}</Typography>
                                    </Stack>
                                    <Typography variant="subtitle2" sx={{ color: '#bef264', fontWeight: 700 }}>{post.price}</Typography>
                                </Stack>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                {/* Verification Queue Section */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Box sx={{ p: 1, bgcolor: '#422006', borderRadius: 1, color: '#facc15' }}><VerifiedUserIcon fontSize="small" /></Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'white' }}>Freelancer Verification Queue</Typography>
                    </Stack>
                    <Chip label="12 PENDING" size="small" sx={{ bgcolor: '#ef4444', color: 'white', fontWeight: 800, fontSize: '0.65rem' }} />
                </Stack>

                <Paper sx={{ bgcolor: '#1e293b', borderRadius: 3, overflow: 'hidden', mb: 5, border: '1px solid #334155', overflowX: 'auto' }}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 2fr 1.5fr 1fr', gap: 2, p: 2, borderBottom: '1px solid #334155', bgcolor: '#1e293b', minWidth: 800 }}>
                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 800 }}>APPLICANT</Typography>
                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 800 }}>SUBMISSION DATE</Typography>
                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 800 }}>DOCUMENTS</Typography>
                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 800 }}>CATEGORY</Typography>
                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 800, textAlign: 'right' }}>ACTION</Typography>
                    </Box>
                    {verificationQueue.map((user, index) => (
                        <Box key={index} sx={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 2fr 1.5fr 1fr', gap: 2, p: 2, alignItems: 'center', borderBottom: index !== verificationQueue.length - 1 ? '1px solid #334155' : 'none', '&:hover': { bgcolor: '#273548' }, minWidth: 800 }}>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Avatar sx={{ bgcolor: user.avatarColor, color: user.roleText, fontWeight: 700, fontSize: '0.9rem' }}>{user.id}</Avatar>
                                <Box>
                                    <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 700 }}>{user.name}</Typography>
                                    <Typography variant="caption" sx={{ color: '#64748b' }}>{user.email}</Typography>
                                </Box>
                            </Stack>
                            <Typography variant="body2" sx={{ color: '#94a3b8' }}>{user.date}</Typography>
                            <Stack direction="row" spacing={1}>
                                {user.docs.map(doc => (
                                    <Chip key={doc} label={doc} size="small" sx={{ bgcolor: '#334155', color: '#94a3b8', borderRadius: 1, fontSize: '0.65rem', fontWeight: 700, height: 20 }} />
                                ))}
                            </Stack>
                            <Box>
                                <Chip label={user.role} size="small" sx={{ bgcolor: user.roleColor, color: user.roleText, fontWeight: 700, borderRadius: 4, border: `1px solid ${user.roleColor}` }} />
                            </Box>
                            <Box sx={{ textAlign: 'right' }}>
                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={handleOpenVerification}
                                    sx={{ bgcolor: '#bef264', color: 'black', fontWeight: 800, fontSize: '0.7rem', '&:hover': { bgcolor: '#a3e635' } }}
                                >
                                    VERIFY NOW
                                </Button>
                            </Box>
                        </Box>
                    ))}
                </Paper>

                {/* Expressions of Interest Section */}
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
                    <Box sx={{ p: 1, bgcolor: '#14532d', borderRadius: 1, color: '#4ade80' }}><VerifiedUserIcon fontSize="small" /></Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'white' }}>Freelance Expressions of Interest</Typography>
                </Stack>

                <Stack spacing={2}>
                    {interests.map((interest, index) => (
                        <Paper key={index} sx={{ p: 2, bgcolor: '#1e293b', borderRadius: 3, border: '1px solid #334155', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'flex-start', md: 'center' }, justifyContent: 'space-between', gap: 2 }}>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Avatar sx={{ bgcolor: '#f1f5f9', color: '#64748b' }} src={`/path-to-image-${index}.jpg`}>
                                    <Box sx={{ width: '100%', height: '100%', bgcolor: 'white' }} />
                                </Avatar>
                                <Box>
                                    <Typography variant="body2" sx={{ color: 'white' }}>
                                        <Box component="span" sx={{ fontWeight: 800, fontSize: '1rem' }}>{interest.name}</Box> <Box component="span" sx={{ color: '#64748b' }}>{interest.action}</Box>
                                    </Typography>
                                    <Typography variant="subtitle2" sx={{ color: '#bef264', fontWeight: 600 }}>{interest.target}</Typography>
                                </Box>
                            </Stack>
                            <Stack direction="row" alignItems="center" spacing={3} sx={{ width: { xs: '100%', md: 'auto' }, justifyContent: { xs: 'space-between', md: 'end' } }}>
                                <Box sx={{ textAlign: 'right' }}>
                                    <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>Bid Amount</Typography>
                                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 800 }}>{interest.bid}</Typography>
                                </Box>
                                <Stack direction="row" spacing={1}>
                                    <IconButton sx={{ border: '1px solid #334155', borderRadius: 2 }}>
                                        <DescriptionIcon sx={{ color: '#94a3b8', fontSize: 20 }} />
                                    </IconButton>
                                    <Button variant="contained" sx={{ bgcolor: 'white', color: 'black', fontWeight: 800 }}>REVIEW</Button>
                                </Stack>
                            </Stack>
                        </Paper>
                    ))}
                </Stack>

                {/* Verification Modal */}
                <Dialog
                    open={openVerification}
                    onClose={handleCloseVerification}
                    maxWidth="lg"
                    fullWidth
                    scroll="paper"
                    PaperProps={{
                        sx: {
                            bgcolor: '#000000',
                            borderRadius: 4,
                            border: '1px solid #334155',
                            height: 'auto',
                            maxHeight: '90vh',
                            m: 2
                        }
                    }}
                >
                    <DialogContent sx={{ p: 4, color: 'white' }}>
                        {/* Header */}
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 4 }}>
                            <Stack direction="row" spacing={3} alignItems="center">
                                <Avatar
                                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
                                    sx={{ width: 80, height: 80, border: '3px solid #bef264' }}
                                />
                                <Box>
                                    <Typography variant="h3" sx={{ fontWeight: 900, fontSize: '2.5rem', fontStyle: 'italic', lineHeight: 1, mb: 0.5 }}>ALEX RIVERA</Typography>
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <Typography variant="caption" sx={{ color: '#bef264', fontWeight: 700 }}>ALEX.RIVERA@FREELANCER.ID</Typography>
                                        <Typography variant="caption" sx={{ color: '#64748b' }}>•</Typography>
                                        <Typography variant="caption" sx={{ color: '#94a3b8' }}>VERIFIED PHONE: +1 (555) 212-0034</Typography>
                                    </Stack>
                                </Box>
                            </Stack>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Stack alignItems="flex-end" sx={{ mr: 2 }}>
                                    <Chip label="DETAILED REVIEW MODE" sx={{ bgcolor: '#bef264', color: 'black', fontWeight: 800, borderRadius: 1 }} />
                                </Stack>
                                <Button variant="outlined" sx={{ color: '#94a3b8', borderColor: '#334155', fontWeight: 700 }}>REQUEST INFO</Button>
                                <Button variant="contained" sx={{ bgcolor: '#ef4444', color: 'white', fontWeight: 700, '&:hover': { bgcolor: '#dc2626' } }}>ESCALATE</Button>
                            </Stack>
                        </Stack>

                        {/* Cards Grid */}
                        <Grid container spacing={4} sx={{ mb: 4 }}>
                            {/* Pan Card */}
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Paper sx={{ p: 3, bgcolor: '#0f172a', borderRadius: 3, border: '1px solid #1e293b' }}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            <CreditCardIcon sx={{ color: '#bef264' }} />
                                            <Typography variant="h6" sx={{ fontWeight: 800 }}>PAN CARD</Typography>
                                        </Stack>
                                        <Chip label="READY TO REVIEW" size="small" sx={{ bgcolor: '#3f6212', color: '#d9f99d', fontWeight: 700, borderRadius: 1 }} />
                                    </Stack>

                                    <Box sx={{ width: '100%', height: 260, bgcolor: '#cbd5e1', borderRadius: 2, mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                                        <Box sx={{ position: 'absolute', top: 20, left: 20, opacity: 0.5 }}>
                                            <VerifiedUserIcon sx={{ fontSize: 40, color: '#475569' }} />
                                        </Box>
                                        <Typography variant="h4" sx={{ color: '#64748b', fontWeight: 900, opacity: 0.2 }}>PAN CARD</Typography>
                                    </Box>

                                    <Grid container spacing={2} sx={{ mb: 4 }}>
                                        <Grid size={{ xs: 6 }}>
                                            <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700, display: 'block', mb: 0.5 }}>DOCUMENT NO.</Typography>
                                            <Typography variant="h6" sx={{ fontWeight: 800 }}>ABKRI1234M</Typography>
                                        </Grid>
                                        <Grid size={{ xs: 6 }}>
                                            <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700, display: 'block', mb: 0.5 }}>FULL NAME</Typography>
                                            <Typography variant="h6" sx={{ fontWeight: 800 }}>ALEX RIVERA</Typography>
                                        </Grid>
                                    </Grid>

                                    <Stack direction="row" spacing={2}>
                                        <Button fullWidth variant="contained" sx={{ bgcolor: '#bef264', color: 'black', fontWeight: 800, py: 1.5, '&:hover': { bgcolor: '#a3e635' } }}>APPROVE</Button>
                                        <Button fullWidth variant="outlined" sx={{ color: '#94a3b8', borderColor: '#334155', fontWeight: 700, py: 1.5 }}>REJECT</Button>
                                    </Stack>
                                </Paper>
                            </Grid>

                            {/* Freelance ID */}
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Paper sx={{ p: 3, bgcolor: '#0f172a', borderRadius: 3, border: '1px solid #1e293b' }}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            <BadgeIcon sx={{ color: '#bef264' }} />
                                            <Typography variant="h6" sx={{ fontWeight: 800 }}>FREELANCE ID</Typography>
                                        </Stack>
                                        <Chip label="MANUAL CHECK" size="small" sx={{ bgcolor: '#78350f', color: '#fcd34d', fontWeight: 700, borderRadius: 1 }} />
                                    </Stack>

                                    <Box sx={{
                                        width: '100%',
                                        height: 260,
                                        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                                        borderRadius: 2,
                                        mb: 3,
                                        p: 3,
                                        position: 'relative'
                                    }}>
                                        <Box sx={{ position: 'absolute', top: 20, left: 20, bgcolor: 'rgba(255,255,255,0.3)', p: 1, borderRadius: 1 }}>
                                            <FlashOnIcon sx={{ color: 'white' }} />
                                        </Box>
                                        <Typography sx={{ position: 'absolute', top: 20, right: 20, color: 'white', textAlign: 'right', fontSize: '0.75rem', fontWeight: 700 }}>
                                            MEMBER SINCE<br />JANUARY 2021
                                        </Typography>

                                        <Box sx={{ position: 'absolute', bottom: 20, left: 20, display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Box sx={{ width: 48, height: 48, bgcolor: 'white', borderRadius: 1, overflow: 'hidden' }}>
                                                <Typography variant="caption" sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706', fontWeight: 900 }}>AR</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 900, lineHeight: 1 }}>ALEX RIVERA</Typography>
                                                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>SENIOR BRAND STRATEGIST</Typography>
                                            </Box>
                                        </Box>

                                        <VerifiedIcon sx={{ position: 'absolute', bottom: 20, right: 20, fontSize: 80, color: 'rgba(255,255,255,0.1)' }} />
                                    </Box>

                                    <Grid container spacing={2} sx={{ mb: 4 }}>
                                        <Grid size={{ xs: 6 }}>
                                            <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700, display: 'block', mb: 0.5 }}>COMPANY</Typography>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#e2e8f0' }}>Global Design Hub</Typography>
                                        </Grid>
                                        <Grid size={{ xs: 6 }}>
                                            <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700, display: 'block', mb: 0.5 }}>STATUS</Typography>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#f59e0b' }}>Active Professional</Typography>
                                        </Grid>
                                    </Grid>

                                    <Stack direction="row" spacing={2}>
                                        <Button fullWidth variant="contained" sx={{ bgcolor: '#bef264', color: 'black', fontWeight: 800, py: 1.5, '&:hover': { bgcolor: '#a3e635' } }}>APPROVE</Button>
                                        <Button fullWidth variant="outlined" sx={{ color: '#94a3b8', borderColor: '#334155', fontWeight: 700, py: 1.5 }}>REJECT</Button>
                                    </Stack>
                                </Paper>
                            </Grid>
                        </Grid>

                        {/* Footer */}
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Stack direction="row" spacing={4}>
                                <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700, cursor: 'pointer', '&:hover': { color: 'white' } }}>Approve All</Typography>
                                <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700, cursor: 'pointer', '&:hover': { color: 'white' } }}>Reject All</Typography>
                                <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700, cursor: 'pointer', '&:hover': { color: 'white' } }}>Skip</Typography>
                            </Stack>
                            <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 800, letterSpacing: 1 }}>PROCESSING 1 OF 24 APPLICATIONS</Typography>
                        </Stack>
                    </DialogContent>
                </Dialog>

            </Box>
        </Box>
    );
};

export default FreelanceManagement;
