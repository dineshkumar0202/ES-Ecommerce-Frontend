import { useState, useEffect } from 'react';
import { Box, Typography, Button, Avatar, Paper, Chip, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Navbar from '../WrapperComponents/Navbar';

const Profile = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Retail');
    const [role, setRole] = useState('Seller');

    const [name, setName] = useState('User');
    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        const savedRole = localStorage.getItem('userRole');
        const savedName = localStorage.getItem('userName');
        const savedAvatar = localStorage.getItem('userProfileImage');

        if (savedRole) setRole(savedRole);
        if (savedName) setName(savedName);
        if (savedAvatar) setAvatar(savedAvatar);
    }, []);

    const tabs = ['Retail', 'Wholesale', 'Q-Commerce', 'Resale', 'Freelance'];

    const quickActions = [
        { label: 'Add To Cart', icon: <ShoppingCartOutlinedIcon fontSize="large" />, color: '#dcfce7' },
        { label: 'Wishlist', icon: <FavoriteBorderOutlinedIcon fontSize="large" />, color: '#dcfce7' },
        { label: 'Buy Order', icon: <ReceiptLongOutlinedIcon fontSize="large" />, color: '#dcfce7' },
        { label: 'Create Order', icon: <AddCircleOutlineOutlinedIcon fontSize="large" />, color: '#dcfce7' },
    ];

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <Box sx={{ flex: 1, p: { xs: 2, md: 4 }, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Paper
                    elevation={0}
                    sx={{
                        width: '100%',
                        maxWidth: 1200,
                        borderRadius: 4,
                        bgcolor: 'white',
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        overflow: 'hidden',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                    }}
                >
                    {/* Left Sidebar */}
                    <Box
                        sx={{
                            width: { xs: '100%', md: 320 },
                            p: 4,
                            borderRight: { xs: 'none', md: '1px solid #f1f5f9' },
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center'
                        }}
                    >
                        <Box sx={{ position: 'relative', mb: 2 }}>
                            <Box
                                sx={{
                                    width: 120,
                                    height: 120,
                                    borderRadius: '50%',
                                    border: '4px solid #bef264',
                                    p: 0.5,
                                    mb: 2
                                }}
                            >
                                <Avatar
                                    src={avatar || "https://placehold.co/200x200/ffedd5/333?text=AT"}
                                    sx={{ width: '100%', height: '100%', bgcolor: '#ffedd5', color: '#fb923c' }}
                                />
                            </Box>
                        </Box>

                        <Typography variant="h6" sx={{ fontWeight: 800, color: '#0a0a0a' }}>
                            {name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#64748b', mb: 4 }}>
                            {role} Account
                        </Typography>

                        <Box sx={{ width: '100%', textAlign: 'left', mb: 'auto' }}>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: '#94a3b8', display: 'block', mb: 1.5, letterSpacing: 0.5 }}>
                                ABOUT
                            </Typography>
                            <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
                                <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.6 }}>
                                    Passionate about sustainable retail and innovative e-commerce solutions. Active contributor since 2022. Focused on high-quality freelance partnerships and wholesale distribution.
                                </Typography>
                            </Box>
                        </Box>

                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<LogoutIcon />}
                            onClick={() => navigate('/')}
                            sx={{
                                mt: 4,
                                mb: 2,
                                color: '#0a0a0a',
                                borderColor: '#e2e8f0',
                                borderRadius: 2,
                                textTransform: 'none',
                                fontWeight: 600,
                                py: 1.5,
                                '&:hover': {
                                    borderColor: '#cbd5e1',
                                    bgcolor: '#f8fafc'
                                }
                            }}
                        >
                            Logout
                        </Button>

                        <Button
                            fullWidth
                            startIcon={<DeleteIcon sx={{ fontSize: '1.1rem' }} />}
                            sx={{
                                color: '#ef4444',
                                textTransform: 'none',
                                fontWeight: 600,
                                '&:hover': {
                                    bgcolor: '#fef2f2'
                                }
                            }}
                        >
                            Delete Account
                        </Button>
                    </Box>

                    {/* Main Content */}
                    <Box sx={{ flex: 1, p: 4, bgcolor: 'white' }}>
                        {/* Header Nav */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
                            <Box sx={{ display: 'flex', gap: 1, bgcolor: '#f8fafc', p: 0.5, borderRadius: 3 }}>
                                {tabs.map((tab) => (
                                    <Chip
                                        key={tab}
                                        label={tab}
                                        onClick={() => setActiveTab(tab)}
                                        sx={{
                                            bgcolor: activeTab === tab ? '#bef264' : 'transparent',
                                            color: '#0a0a0a',
                                            fontWeight: activeTab === tab ? 700 : 500,
                                            borderRadius: 2.5,
                                            cursor: 'pointer',
                                            '&:hover': {
                                                bgcolor: activeTab === tab ? '#bef264' : '#f1f5f9'
                                            }
                                        }}
                                    />
                                ))}
                            </Box>

                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <IconButton sx={{ border: '1px solid #f1f5f9', borderRadius: '50%' }}>
                                    <NotificationsNoneIcon sx={{ color: '#64748b' }} />
                                </IconButton>
                                <IconButton sx={{ border: '1px solid #f1f5f9', borderRadius: '50%' }}>
                                    <DarkModeOutlinedIcon sx={{ color: '#64748b' }} />
                                </IconButton>
                            </Box>
                        </Box>

                        {/* Quick Actions */}
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr 1fr' }, gap: 2, mb: 6 }}>
                            {quickActions.map((action, index) => (
                                <Paper
                                    key={index}
                                    elevation={0}
                                    sx={{
                                        bgcolor: action.color,
                                        borderRadius: 3,
                                        p: 3,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: 140,
                                        cursor: 'pointer',
                                        transition: 'transform 0.2s',
                                        '&:hover': {
                                            transform: 'translateY(-4px)'
                                        }
                                    }}
                                >
                                    <Box sx={{ mb: 1.5, color: '#0a0a0a' }}>
                                        {action.icon}
                                    </Box>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0a0a0a' }}>
                                        {action.label}
                                    </Typography>
                                </Paper>
                            ))}
                        </Box>


                    </Box>
                </Paper>
            </Box>
        </Box>
    );
};

export default Profile;
