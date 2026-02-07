import React, { useState } from 'react';
import { Box, Typography, Paper, Button, IconButton, TextField, InputAdornment, Avatar, Chip, List, ListItemButton, ListItemIcon, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tab, Tabs, Divider } from '@mui/material';
import {
    Search as SearchIcon,
    Notifications as NotificationsIcon,
    Dashboard as DashboardIcon,
    List as ListIcon,
    People as PeopleIcon,
    Work as WorkIcon,
    Assessment as AssessmentIcon,
    MoreVert as MoreVertIcon,
    CheckCircle as CheckCircleIcon,
    Cancel as CancelIcon,
    VerifiedUser as VerifiedUserIcon,
    GppBad as GppBadIcon,
    Visibility as VisibilityIcon
} from '@mui/icons-material';

const FreelanceManagement = () => {
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const users = [
        { id: '#FRE-1024', name: 'John Doe', role: 'Developer', verified: true, posts: 12, status: 'Active' },
        { id: '#FRE-1025', name: 'Jane Smith', role: 'Designer', verified: false, posts: 8, status: 'Pending' },
        { id: '#FRE-1026', name: 'Bob Johnson', role: 'Writer', verified: true, posts: 25, status: 'Active' },
        { id: '#FRE-1027', name: 'Alice Brown', role: 'Marketer', verified: false, posts: 3, status: 'Rejected' },
    ];

    const posts = [
        { id: '#PST-5501', title: 'React JS Developer Needed', client: 'Tech Solutions', budget: '$500 - $1000', status: 'Approved' },
        { id: '#PST-5502', title: 'Logo Design for Startup', client: 'Green Earth', budget: '$200', status: 'Pending' },
        { id: '#PST-5503', title: 'Content Writer for Blog', client: 'Travel Diary', budget: '$50/article', status: 'Rejected' },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active': return 'success';
            case 'Approved': return 'success';
            case 'Pending': return 'warning';
            case 'Rejected': return 'error';
            default: return 'default';
        }
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#f4f6f8' }}>
            {/* Sidebar */}
            <Box sx={{ width: 260, bgcolor: '#ffffff', borderRight: '1px solid #e0e0e0', display: 'flex', flexDirection: 'column', p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, px: 1 }}>
                    <Box sx={{ bgcolor: '#4caf50', p: 0.5, borderRadius: 1, mr: 1.5 }}>
                        <WorkIcon sx={{ color: '#fff' }} />
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', lineHeight: 1.2 }}>FREELANCE ADMIN</Typography>
                        <Typography variant="caption" color="text.secondary">Version 1.0.0</Typography>
                    </Box>
                </Box>

                <List component="nav">
                    <ListItemButton sx={{ bgcolor: '#e8f5e9', borderRadius: 2, mb: 1, color: '#2e7d32' }}>
                        <ListItemIcon><DashboardIcon sx={{ color: '#2e7d32' }} /></ListItemIcon>
                        <ListItemText primary="Overview" primaryTypographyProps={{ fontWeight: 'bold' }} />
                    </ListItemButton>
                    <ListItemButton sx={{ mb: 1 }}>
                        <ListItemIcon><PeopleIcon /></ListItemIcon>
                        <ListItemText primary="Freelancers" />
                    </ListItemButton>
                    <ListItemButton sx={{ mb: 1 }}>
                        <ListItemIcon><ListIcon /></ListItemIcon>
                        <ListItemText primary="Posted Jobs" />
                    </ListItemButton>
                    <ListItemButton sx={{ mb: 1 }}>
                        <ListItemIcon><AssessmentIcon /></ListItemIcon>
                        <ListItemText primary="Analytics" />
                    </ListItemButton>
                </List>
            </Box>

            {/* Main Content */}
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                {/* Header */}
                <Box sx={{ height: 64, bgcolor: '#ffffff', borderBottom: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', px: 3, justifyContent: 'space-between' }}>
                    <TextField
                        size="small"
                        placeholder="Search freelancers, jobs..."
                        InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon color="disabled" /></InputAdornment> }}
                        sx={{ width: 400, bgcolor: '#f4f6f8', borderRadius: 1, '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton><NotificationsIcon /></IconButton>
                        <Divider orientation="vertical" flexItem variant="middle" />
                        <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', lineHeight: 1 }}>Admin User</Typography>
                            <Typography variant="caption" color="text.secondary">Freelance Manager</Typography>
                        </Box>
                        <Avatar sx={{ bgcolor: '#81c784' }}>FM</Avatar>
                    </Box>
                </Box>

                <Box sx={{ p: 4, overflow: 'auto', flexGrow: 1 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>Freelance Management</Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>Manage users, job posts, and approvals.</Typography>

                    {/* Stats Cards */}
                    <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
                        <Box sx={{ flex: 1, minWidth: 280 }}>
                            <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }} elevation={0}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Box sx={{ bgcolor: '#e8f5e9', p: 1, borderRadius: 1 }}><PeopleIcon color="success" /></Box>
                                    <Chip label="+8.5%" size="small" sx={{ bgcolor: '#e8f5e9', color: '#2e7d32', fontWeight: 'bold' }} />
                                </Box>
                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>TOTAL FREELANCERS</Typography>
                                <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>4,520</Typography>
                                <Typography variant="body2" color="text.secondary">Registered across 15 skills</Typography>
                            </Paper>
                        </Box>
                        <Box sx={{ flex: 1, minWidth: 280 }}>
                            <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }} elevation={0}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Box sx={{ bgcolor: '#e3f2fd', p: 1, borderRadius: 1 }}><WorkIcon color="primary" /></Box>
                                    <Chip label="+12%" size="small" sx={{ bgcolor: '#e3f2fd', color: '#1565c0', fontWeight: 'bold' }} />
                                </Box>
                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>TOTAL JOB POSTS</Typography>
                                <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>8,950</Typography>
                                <Typography variant="body2" color="text.secondary">Active listings this month</Typography>
                            </Paper>
                        </Box>
                        <Box sx={{ flex: 1, minWidth: 280 }}>
                            <Paper sx={{ p: 3, borderRadius: 3, height: '100%', borderLeft: '4px solid #4caf50' }} elevation={0}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Box sx={{ bgcolor: '#fff3e0', p: 1, borderRadius: 1 }}><VerifiedUserIcon color="warning" /></Box>
                                    <Chip label="Action Needed" size="small" sx={{ bgcolor: '#fff3e0', color: '#e65100', fontWeight: 'bold' }} />
                                </Box>
                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>PENDING APPROVALS</Typography>
                                <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>145</Typography>
                                <Typography variant="body2" color="text.secondary">Profiles & Posts awaiting review</Typography>
                            </Paper>
                        </Box>
                    </Box>

                    {/* Platform Analytics: Skills & Memberships */}
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 4 }}>
                        <Paper sx={{ flex: 2, p: 3, borderRadius: 3 }} elevation={0}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Top Skill Demand</Typography>
                                <Button size="small" endIcon={<Box component="span">▼</Box>} sx={{ color: 'text.secondary', textTransform: 'none' }}>This Month</Button>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {[
                                    { skill: 'React / Frontend', value: 85, color: '#4caf50' },
                                    { skill: 'UI/UX Design', value: 70, color: '#81c784' },
                                    { skill: 'Content Writing', value: 60, color: '#a5d6a7' },
                                    { skill: 'Digital Marketing', value: 45, color: '#c8e6c9' },
                                ].map((item, i) => (
                                    <Box key={i}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{item.skill}</Typography>
                                            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>{item.value}% Rentention</Typography>
                                        </Box>
                                        <Box sx={{ width: '100%', height: 8, bgcolor: '#f5f5f5', borderRadius: 4, overflow: 'hidden' }}>
                                            <Box sx={{ width: `${item.value}%`, height: '100%', bgcolor: item.color }} />
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Paper>

                        <Paper sx={{ flex: 1, p: 3, borderRadius: 3, bgcolor: '#2e7d32', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} elevation={0}>
                            <Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff' }}>Premium<br />Memberships</Typography>
                                    <Box sx={{ bgcolor: 'rgba(255,255,255,0.2)', p: 1, borderRadius: '50%' }}><VerifiedUserIcon sx={{ color: '#fff' }} /></Box>
                                </Box>
                                <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>854</Typography>
                                <Typography variant="body2" sx={{ opacity: 0.8 }}>Active Pro Freelancers</Typography>
                            </Box>
                            <Box>
                                <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)', my: 2 }} />
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="body2" sx={{ opacity: 0.8 }}>Completion Rate</Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>94.2%</Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Box>

                    {/* Tabs for Lists */}
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                        <Tabs value={tabValue} onChange={handleTabChange} aria-label="freelancetabs">
                            <Tab label="Freelancer List" />
                            <Tab label="Total Job Posts" />
                        </Tabs>
                    </Box>

                    {/* Freelancer List Tab */}
                    {tabValue === 0 && (
                        <Paper sx={{ borderRadius: 3, overflow: 'hidden' }} elevation={0}>
                            <TableContainer>
                                <Table>
                                    <TableHead sx={{ bgcolor: '#fcfcfc' }}>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 'bold' }}>USER ID</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>NAME & ROLE</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>VERIFICATION</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>TOTAL POSTS</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>STATUS</TableCell>
                                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>ACTIONS</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {users.map((user) => (
                                            <TableRow key={user.id} hover>
                                                <TableCell>{user.id}</TableCell>
                                                <TableCell>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <Avatar sx={{ width: 32, height: 32 }}>{user.name.charAt(0)}</Avatar>
                                                        <Box>
                                                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{user.name}</Typography>
                                                            <Typography variant="caption" color="text.secondary">{user.role}</Typography>
                                                        </Box>
                                                    </Box>
                                                </TableCell>
                                                <TableCell>
                                                    {user.verified ? (
                                                        <Chip icon={<VerifiedUserIcon />} label="Verified" size="small" color="success" variant="outlined" />
                                                    ) : (
                                                        <Chip icon={<GppBadIcon />} label="Unverified" size="small" color="default" variant="outlined" />
                                                    )}
                                                </TableCell>
                                                <TableCell>{user.posts}</TableCell>
                                                <TableCell>
                                                    <Chip label={user.status} size="small" color={getStatusColor(user.status) as any} />
                                                </TableCell>
                                                <TableCell align="right">
                                                    <IconButton size="small"><VisibilityIcon /></IconButton>
                                                    <IconButton size="small"><MoreVertIcon /></IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    )}

                    {/* Job Posts Tab */}
                    {tabValue === 1 && (
                        <Paper sx={{ borderRadius: 3, overflow: 'hidden' }} elevation={0}>
                            <TableContainer>
                                <Table>
                                    <TableHead sx={{ bgcolor: '#fcfcfc' }}>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 'bold' }}>POST ID</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>TITLE</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>CLIENT</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>BUDGET</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>STATUS</TableCell>
                                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>APPROVAL</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {posts.map((post) => (
                                            <TableRow key={post.id} hover>
                                                <TableCell>{post.id}</TableCell>
                                                <TableCell sx={{ fontWeight: 'bold' }}>{post.title}</TableCell>
                                                <TableCell>{post.client}</TableCell>
                                                <TableCell>{post.budget}</TableCell>
                                                <TableCell>
                                                    <Chip label={post.status} size="small" color={getStatusColor(post.status) as any} />
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                                                        <Button size="small" variant="contained" color="success" startIcon={<CheckCircleIcon />}>Approve</Button>
                                                        <Button size="small" variant="outlined" color="error" startIcon={<CancelIcon />}>Reject</Button>
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default FreelanceManagement;
