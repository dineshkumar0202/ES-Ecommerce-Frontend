import { useEffect, useState } from 'react';
import { Box, Typography, Paper, Stack, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Grid, Chip, Avatar, CircularProgress, Tabs, Tab, Button, Link } from '@mui/material';
import { toast } from 'react-toastify';
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
    const [verifiedFreelancers, setVerifiedFreelancers] = useState<any[]>([]);
    const [interests, setInterests] = useState<any[]>([]);

    useEffect(() => {
        fetchPosts();
        fetchPendingFreelancers();
        fetchVerifiedFreelancers();
        fetchInterests();
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

    const fetchVerifiedFreelancers = async () => {
        try {
            const { data } = await AdminService.getVerifiedFreelancers();
            setVerifiedFreelancers(data);
        } catch (error) {
            console.error("Failed to fetch verified freelancers", error);
        }
    };

    const fetchInterests = async () => {
        try {
            const { data } = await AdminService.getInterests();
            setInterests(data);
        } catch (error) {
            console.error("Failed to fetch freelance interests", error);
        }
    };

    const handleFreelancerStatus = async (id: string, status: string) => {
        try {
            await AdminService.updateFreelancerStatus(id, status);
            setPendingFreelancers(pendingFreelancers.filter(f => f._id !== id));
            toast.success(`Freelancer ${status} successfully`);
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const handleInterestStatus = async (id: string, status: string) => {
        try {
            await AdminService.updateInterestStatus(id, status);
            setInterests(interests.map(i => i._id === id ? { ...i, status } : i));
            toast.success(`Interest request ${status} successfully`);
        } catch (error) {
            toast.error("Failed to update interest status");
        }
    };

    const handleUpdateStatus = async (id: string, status: string) => {
        try {
            await FreelanceService.updateStatus(id, status);
            setPosts(posts.map(p => p._id === id ? { ...p, status } : p));
            toast.success(`Post ${status} successfully`);
        } catch (error) {
            toast.error("Failed to update post status");
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Delete this freelance post?")) {
            try {
                await FreelanceService.delete(id);
                setPosts(posts.filter(p => p._id !== id));
                toast.success("Post deleted successfully");
            } catch (error) {
                toast.error("Failed to delete post");
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
                        <Tab label="Verified Freelancers" />
                        <Tab label="Interest Requests" />
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

                                            {post.image && (
                                                <Box component="img" src={post.image} sx={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 2, mb: 2 }} />
                                            )}

                                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, fontSize: '1.1rem' }}>{post.title}</Typography>

                                            <Stack spacing={0.5} sx={{ mb: 2 }}>
                                                {post.location && <Typography variant="caption" sx={{ color: '#64748b' }}>📍 {post.location}</Typography>}
                                                {post.contact && <Typography variant="caption" sx={{ color: '#64748b' }}>📞 {post.contact}</Typography>}
                                                {post.email && <Typography variant="caption" sx={{ color: '#64748b' }}>✉️ {post.email}</Typography>}
                                            </Stack>

                                            <Typography variant="body2" sx={{ color: '#334155', mb: 1, fontWeight: 600 }}>Description:</Typography>
                                            <Typography variant="body2" sx={{ color: '#64748b', mb: 2 }}>{post.description}</Typography>

                                            {post.requirements && (
                                                <Box sx={{ mb: 2, p: 1.5, bgcolor: '#f8fafc', borderRadius: 2, border: '1px dashed #cbd5e1' }}>
                                                    <Typography variant="caption" sx={{ fontWeight: 700, display: 'block', mb: 0.5 }}>Requirements:</Typography>
                                                    <Typography variant="caption" sx={{ color: '#475569' }}>{post.requirements}</Typography>
                                                </Box>
                                            )}

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
                                                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>Identity Info:</Typography>
                                                <Stack spacing={1} sx={{ p: 1.5, bgcolor: '#f8fafc', borderRadius: 2 }}>
                                                    <Typography variant="caption" sx={{ color: '#64748b' }}><strong>PAN:</strong> {user.freelancer?.panNumber || 'N/A'}</Typography>
                                                    <Typography variant="caption" sx={{ color: '#64748b' }}><strong>ID:</strong> {user.freelancer?.freelancerId || 'N/A'}</Typography>
                                                </Stack>
                                            </Box>

                                            <Box sx={{ mb: 2 }}>
                                                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>Documents & Links:</Typography>
                                                <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                                                    {user.freelancer?.panFile && (
                                                        <Button component={Link} href={user.freelancer.panFile} target="_blank" variant="outlined" size="small" sx={{ borderRadius: 2, textTransform: 'none' }}>PAN Card</Button>
                                                    )}
                                                    {user.freelancer?.freelancerIdFile && (
                                                        <Button component={Link} href={user.freelancer.freelancerIdFile} target="_blank" variant="outlined" size="small" sx={{ borderRadius: 2, textTransform: 'none' }}>ID Card</Button>
                                                    )}
                                                    {user.freelancer?.taskFile && (
                                                        <Button component={Link} href={user.freelancer.taskFile} target="_blank" variant="outlined" size="small" sx={{ borderRadius: 2, textTransform: 'none' }}>Task File</Button>
                                                    )}
                                                    {user.freelancer?.taskLink && (
                                                        <Button component={Link} href={user.freelancer.taskLink} target="_blank" variant="outlined" size="small" sx={{ borderRadius: 2, textTransform: 'none' }}>Task Link</Button>
                                                    )}
                                                    {user.freelancer?.portfolio && (
                                                        <Button component={Link} href={user.freelancer.portfolio} target="_blank" variant="outlined" size="small" sx={{ borderRadius: 2, textTransform: 'none' }}>Portfolio</Button>
                                                    )}
                                                </Stack>
                                            </Box>

                                            {user.freelancer?.answers && user.freelancer.answers.length > 0 && (
                                                <Box sx={{ mb: 3 }}>
                                                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>Skill Assessment:</Typography>
                                                    <Stack spacing={1} sx={{ p: 1.5, bgcolor: '#f1f5f9', borderRadius: 2 }}>
                                                        {user.freelancer.answers.map((answer: string, idx: number) => (
                                                            <Typography key={idx} variant="caption" sx={{ color: '#475569', display: 'block' }}>
                                                                <strong>Q{idx + 1}:</strong> {answer}
                                                            </Typography>
                                                        ))}
                                                    </Stack>
                                                </Box>
                                            )}

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
                        {tab === 2 && (
                            <Grid container spacing={3}>
                                {verifiedFreelancers.map((user) => (
                                    <Grid size={{ xs: 12, sm: 12, md: 6 }} key={user._id}>
                                        <Paper sx={{ p: 3, bgcolor: 'white', borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
                                            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                                                <Typography variant="h6" sx={{ fontWeight: 700 }}>{user.freelancer?.category || "Unknown Category"}</Typography>
                                                <Chip label="VERIFIED" size="small" color="success" sx={{ fontWeight: 800, fontSize: '0.65rem', borderRadius: 1 }} />
                                            </Stack>
                                            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                                                <Avatar sx={{ width: 32, height: 32, bgcolor: '#bef264', color: 'black' }}>{user.profile?.name?.[0] || user.username?.[0]}</Avatar>
                                                <Box>
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{user.profile?.name || user.username}</Typography>
                                                    <Typography variant="caption" sx={{ color: '#64748b' }}>{user.email}</Typography>
                                                </Box>
                                            </Stack>

                                            <Box sx={{ mb: 2 }}>
                                                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>Identity Info:</Typography>
                                                <Stack spacing={1} sx={{ p: 1.5, bgcolor: '#f8fafc', borderRadius: 2 }}>
                                                    <Typography variant="caption" sx={{ color: '#64748b' }}><strong>PAN:</strong> {user.freelancer?.panNumber || 'N/A'}</Typography>
                                                    <Typography variant="caption" sx={{ color: '#64748b' }}><strong>ID:</strong> {user.freelancer?.freelancerId || 'N/A'}</Typography>
                                                </Stack>
                                            </Box>

                                            <Box sx={{ mb: 2 }}>
                                                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>Documents & Portfolio:</Typography>
                                                <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                                                    {user.freelancer?.panFile && <Button component={Link} href={user.freelancer.panFile} target="_blank" variant="outlined" size="small" sx={{ borderRadius: 2, textTransform: 'none' }}>PAN</Button>}
                                                    {user.freelancer?.freelancerIdFile && <Button component={Link} href={user.freelancer.freelancerIdFile} target="_blank" variant="outlined" size="small" sx={{ borderRadius: 2, textTransform: 'none' }}>ID</Button>}
                                                    {user.freelancer?.portfolio && <Button component={Link} href={user.freelancer.portfolio} target="_blank" variant="outlined" size="small" sx={{ borderRadius: 2, textTransform: 'none' }}>Portfolio</Button>}
                                                </Stack>
                                            </Box>

                                            <Button
                                                variant="outlined"
                                                color="error"
                                                size="small"
                                                onClick={() => handleFreelancerStatus(user._id, 'Rejected')}
                                                sx={{ mt: 'auto', borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
                                            >
                                                Revoke Verification
                                            </Button>
                                        </Paper>
                                    </Grid>
                                ))}
                                {verifiedFreelancers.length === 0 && <Typography sx={{ m: 2 }}>No verified freelancers found.</Typography>}
                            </Grid>
                        )}
                        {tab === 3 && (
                            <Grid container spacing={3}>
                                {interests.map((interest) => (
                                    <Grid size={{ xs: 12, sm: 12, md: 6 }} key={interest._id}>
                                        <Paper sx={{ p: 3, bgcolor: 'white', borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
                                            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                                                <Typography variant="overline" sx={{ fontWeight: 800, color: '#64748b' }}>Interest Request</Typography>
                                                <Chip
                                                    label={interest.status || 'Pending'}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: interest.status === 'Approved' ? '#ecfccb' : interest.status === 'Rejected' ? '#fef2f2' : '#f1f5f9',
                                                        color: interest.status === 'Approved' ? '#84cc16' : interest.status === 'Rejected' ? '#ef4444' : '#64748b',
                                                        fontWeight: 800, borderRadius: 1, fontSize: '0.65rem'
                                                    }}
                                                />
                                            </Stack>

                                            <Box sx={{ mb: 2 }}>
                                                <Typography variant="body2" sx={{ color: '#94a3b8' }}>Post Title:</Typography>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{interest.post?.title || 'Unknown Post'}</Typography>
                                            </Box>

                                            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2, p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
                                                <Avatar sx={{ width: 40, height: 40 }}>{interest.user?.profile?.name?.[0] || interest.user?.username?.[0]}</Avatar>
                                                <Box>
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{interest.user?.profile?.name || interest.user?.username}</Typography>
                                                    <Typography variant="caption" sx={{ color: '#64748b', display: 'block', fontWeight: 600 }}>ID: {interest.user?.freelancer?.freelancerId || interest.user?._id}</Typography>
                                                    <Typography variant="caption" sx={{ color: '#84cc16', display: 'block', fontSize: '0.7rem', fontWeight: 700 }}>{interest.user?.freelancer?.category || 'No Category'}</Typography>
                                                    <Typography variant="caption" sx={{ color: '#94a3b8' }}>{interest.user?.email}</Typography>
                                                </Box>
                                            </Stack>

                                            {interest.status === 'Pending' && (
                                                <Stack direction="row" spacing={2} sx={{ mt: 'auto' }}>
                                                    <Button
                                                        variant="contained"
                                                        color="success"
                                                        size="small"
                                                        onClick={() => handleInterestStatus(interest._id, 'Approved')}
                                                        fullWidth
                                                        sx={{ py: 1, fontWeight: 700 }}
                                                    >
                                                        Approve
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        color="error"
                                                        size="small"
                                                        onClick={() => handleInterestStatus(interest._id, 'Rejected')}
                                                        fullWidth
                                                        sx={{ py: 1, fontWeight: 700 }}
                                                    >
                                                        Reject
                                                    </Button>
                                                </Stack>
                                            )}
                                        </Paper>
                                    </Grid>
                                ))}
                                {interests.length === 0 && <Typography sx={{ m: 2 }}>No interest requests found.</Typography>}
                            </Grid>
                        )}
                    </>
                )}
            </Box>
        </Box>
    );
};

export default FreelanceManagement;
