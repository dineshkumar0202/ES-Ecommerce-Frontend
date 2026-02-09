import { useEffect, useState } from 'react';
import { Box, Typography, Paper, Stack, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Grid, Chip, Avatar, CircularProgress, Tabs, Tab, Button, Link } from '@mui/material';
import {
    Dashboard as DashboardIcon,
    Store as StoreIcon,
    Warehouse as WarehouseIcon,
    FlashOn as FlashOnIcon,
    Autorenew as AutorenewIcon,
    WorkOutline as WorkOutlineIcon,
    ExitToApp as ExitToAppIcon,
    Delete as DeleteIcon,
    Check as CheckIcon,
    Close as CloseIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { FreelanceService, AdminService } from '../../../services/api';

const FreelanceManagement = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [tab, setTab] = useState(0);
    const [pendingFreelancers, setPendingFreelancers] = useState<any[]>([]);

    useEffect(() => {
        fetchPosts();
        fetchPendingFreelancers();
    }, []);

    const fetchPosts = async () => {
        try {
            const { data } = await FreelanceService.getAll();
            setPosts(data);
        } catch (error) {
            console.error("Failed to fetch freelance posts", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchPendingFreelancers = async () => {
        try {
            const { data } = await AdminService.getPendingFreelancers();
            setPendingFreelancers(data);
        } catch (error) {
            console.error("Failed to fetch pending freelancers", error);
        }
    };

    const handleFreelancerStatus = async (id: string, status: string) => {
        try {
            await AdminService.updateFreelancerStatus(id, status);
            setPendingFreelancers(pendingFreelancers.filter(f => f._id !== id));
        } catch (error) {
            alert("Failed to update status");
        }
    };

    const handleUpdateStatus = async (id: string, status: string) => {
        try {
            await FreelanceService.updateStatus(id, status);
            setPosts(posts.map(p => p._id === id ? { ...p, status } : p));
        } catch (error) {
            alert("Failed to update post status");
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Delete this freelance post?")) {
            try {
                await FreelanceService.delete(id);
                setPosts(posts.filter(p => p._id !== id));
            } catch (error) {
                alert("Failed to delete post");
            }
        }
    };

    const menuItems = [
        { name: 'Overview', icon: <DashboardIcon />, path: '/admin/dashboard' },
        { name: 'Retail', icon: <StoreIcon />, path: '/admin/retail' },
        { name: 'Wholesale', icon: <WarehouseIcon />, path: '/admin/wholesale' },
        { name: 'Q-Commerce', icon: <FlashOnIcon />, path: '/admin/quick' },
        { name: 'Resale', icon: <AutorenewIcon />, path: '/admin/resale' },
        { name: 'Freelance', icon: <WorkOutlineIcon />, path: '/admin/freelance', active: true },
    ];

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8fafc' }}>
            {/* Sidebar */}
            <Box sx={{ width: 260, bgcolor: 'white', borderRight: '1px solid #e2e8f0', p: 3, display: 'flex', flexDirection: 'column', height: '100vh', position: 'sticky', top: 0 }}>
                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 5, px: 2 }}>
                    <Box sx={{ bgcolor: '#bef264', p: 0.5, borderRadius: 1, display: 'flex' }}>
                        <WorkOutlineIcon sx={{ color: 'black' }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>freelance</Typography>
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
                                color: item.active ? 'black' : '#64748b',
                                '&:hover': { bgcolor: item.active ? '#bef264' : '#f1f5f9' },
                                py: 1.5
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40, color: item.active ? 'black' : '#94a3b8' }}>
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
                    <Stack onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('userRole'); navigate('/admin/login'); }} direction="row" alignItems="center" spacing={2} sx={{ px: 2, cursor: 'pointer', color: '#ef4444' }}>
                        <ExitToAppIcon fontSize="small" />
                        <Typography variant="body2" fontWeight={600}>Leave</Typography>
                    </Stack>
                </Box>
            </Box>

            {/* Main Content */}
            <Box sx={{ flexGrow: 1, p: 4, overflow: 'auto' }}>
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>Freelance Posts Management</Typography>

                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                    <Tabs value={tab} onChange={(_, v) => setTab(v)}>
                        <Tab label="Freelance Posts" />
                        <Tab label="Verification Requests" />
                    </Tabs>
                </Box>

                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress sx={{ color: '#bef264' }} /></Box>
                ) : (
                    <>
                        {tab === 0 && (
                            <Grid container spacing={3}>
                                {posts.map((post) => (
                                    <Grid size={{ xs: 12, sm: 12, md: 6 }} key={post._id}>
                                        <Paper sx={{ p: 3, bgcolor: 'white', borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
                                            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                                                <Chip label={post.category || 'General'} size="small" sx={{ bgcolor: '#f1f5f9', color: '#64748b', fontWeight: 700, fontSize: '0.65rem', borderRadius: 1 }} />
                                                <Chip
                                                    label={post.status || 'NEW'}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: post.status === 'APPROVED' ? '#ecfccb' : post.status === 'REJECTED' ? '#fef2f2' : '#eff6ff',
                                                        color: post.status === 'APPROVED' ? '#84cc16' : post.status === 'REJECTED' ? '#ef4444' : '#3b82f6',
                                                        fontWeight: 800,
                                                        fontSize: '0.65rem',
                                                        borderRadius: 1
                                                    }}
                                                />
                                            </Stack>
                                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, fontSize: '1.1rem' }}>{post.title}</Typography>
                                            <Typography variant="body2" sx={{ color: '#64748b', mb: 3, flexGrow: 1 }}>{post.description}</Typography>

                                            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 'auto', pt: 2, borderTop: '1px solid #f1f5f9' }}>
                                                <Stack direction="row" alignItems="center" spacing={1}>
                                                    <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>{post.username?.[0] || 'U'}</Avatar>
                                                    <Typography variant="caption" sx={{ fontWeight: 600 }}>{post.username || 'Anonymous'}</Typography>
                                                </Stack>
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <Typography variant="subtitle2" sx={{ color: '#84cc16', fontWeight: 800 }}>₹{post.price}</Typography>
                                                    <Stack direction="row" spacing={0.5}>
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => handleUpdateStatus(post._id, 'APPROVED')}
                                                            sx={{ color: '#84cc16', border: '1px solid #ecfccb', '&:hover': { bgcolor: '#f7fee7' } }}
                                                        >
                                                            <CheckIcon fontSize="small" />
                                                        </IconButton>
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => handleUpdateStatus(post._id, 'REJECTED')}
                                                            sx={{ color: '#ef4444', border: '1px solid #fef2f2', '&:hover': { bgcolor: '#fff1f2' } }}
                                                        >
                                                            <CloseIcon fontSize="small" />
                                                        </IconButton>
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => handleDelete(post._id)}
                                                            sx={{ color: '#94a3b8', border: '1px solid #f1f5f9', '&:hover': { bgcolor: '#f8fafc' } }}
                                                        >
                                                            <DeleteIcon fontSize="small" />
                                                        </IconButton>
                                                    </Stack>
                                                </Stack>
                                            </Stack>
                                        </Paper>
                                    </Grid>
                                ))}
                                {posts.length === 0 && <Typography sx={{ m: 2 }}>No freelance posts found.</Typography>}
                            </Grid>
                        )}
                        {tab === 1 && (
                            <Grid container spacing={3}>
                                {pendingFreelancers.map((user) => (
                                    <Grid size={{ xs: 12, sm: 12, md: 6 }} key={user._id}>
                                        <Paper sx={{ p: 3, bgcolor: 'white', borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
                                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{user.freelancer?.category || "Unknown Category"}</Typography>
                                            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                                                <Avatar sx={{ width: 32, height: 32 }}>{user.profile?.name?.[0] || user.username?.[0]}</Avatar>
                                                <Box>
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{user.profile?.name || user.username}</Typography>
                                                    <Typography variant="caption" sx={{ color: '#64748b' }}>{user.email}</Typography>
                                                </Box>
                                            </Stack>

                                            <Box sx={{ mb: 2 }}>
                                                <Typography variant="body2" sx={{ fontWeight: 600 }}>Files:</Typography>
                                                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                                                    {user.freelancer?.panFile && (
                                                        <Button component={Link} href={user.freelancer.panFile} target="_blank" variant="outlined" size="small">PAN Card</Button>
                                                    )}
                                                    {user.freelancer?.freelancerIdFile && (
                                                        <Button component={Link} href={user.freelancer.freelancerIdFile} target="_blank" variant="outlined" size="small">ID Card</Button>
                                                    )}
                                                    {user.freelancer?.taskFile && (
                                                        <Button component={Link} href={user.freelancer.taskFile} target="_blank" variant="outlined" size="small">Task</Button>
                                                    )}
                                                </Stack>
                                            </Box>

                                            <Box sx={{ mb: 2 }}>
                                                <Typography variant="body2" sx={{ fontWeight: 600 }}>Portfolio:</Typography>
                                                <Link href={user.freelancer?.portfolio} target="_blank">{user.freelancer?.portfolio || 'None'}</Link>
                                            </Box>

                                            <Stack direction="row" spacing={2} sx={{ mt: 'auto' }}>
                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    onClick={() => handleFreelancerStatus(user._id, 'Approved')}
                                                    fullWidth
                                                >
                                                    Approve
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    onClick={() => handleFreelancerStatus(user._id, 'Rejected')}
                                                    fullWidth
                                                >
                                                    Reject
                                                </Button>
                                            </Stack>
                                        </Paper>
                                    </Grid>
                                ))}
                                {pendingFreelancers.length === 0 && <Typography sx={{ m: 2 }}>No pending verification requests.</Typography>}
                            </Grid>
                        )}
                    </>
                )}
            </Box>
        </Box>
    );
};

export default FreelanceManagement;
