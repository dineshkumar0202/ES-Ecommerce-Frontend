import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Divider, Alert } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';

import Navbar from './Navbar';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [userType, setUserType] = useState(location.pathname.includes('/admin') ? 2 : 0); // 0 = Seller, 1 = Buyer, 2 = Admin

    // Form State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setError('');

        if (userType === 2) {
            // Admin Logic
            if (email === 'admin@example.com' && password === 'admin123') {
                localStorage.setItem('userRole', 'Admin');
                localStorage.setItem('isAdminLoggedIn', 'true');
                localStorage.setItem('userName', 'Master Admin');
                localStorage.setItem('userProfileImage', 'https://ui-avatars.com/api/?name=Master+Admin&background=0D8ABC&color=fff');
                navigate('/admin', { replace: true });
            } else {
                setError('Invalid admin credentials');
            }
        } else {
            // Standard User Logic (Seller/Buyer)
            let role = 'Seller';
            if (userType === 1) role = 'Buyer';

            // Mock Validation
            if (!name) {
                setError('Please enter your name');
                return;
            }

            localStorage.setItem('userRole', role);
            localStorage.setItem('userName', name);
            localStorage.setItem('userProfileImage', `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`);

            // Navigate to profile page
            navigate('/profile', { replace: true });
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#f5f5f5' }}>
            <Navbar />
            <Box sx={{ flex: 1, display: 'flex' }}>
                {/* Left Side - Dark Branding */}
                <Box
                    sx={{
                        width: '50%',
                        bgcolor: '#0a0a0a',
                        color: 'white',
                        display: { xs: 'none', md: 'flex' },
                        flexDirection: 'column',
                        justifyContent: 'center',
                        p: 8,
                        position: 'relative'
                    }}
                >
                    {/* Logo */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 6 }}>
                        <Box
                            sx={{
                                width: 40,
                                height: 40,
                                bgcolor: '#bef264',
                                borderRadius: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 900,
                                color: 'black',
                                fontSize: '1.2rem'
                            }}
                        >
                            AZ
                        </Box>
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                            AtoZ
                        </Typography>
                    </Box>

                    {/* Headline */}
                    <Typography variant="h2" sx={{ fontWeight: 800, mb: 3, lineHeight: 1.2 }}>
                        Join the
                        <br />
                        <Box component="span" sx={{ color: '#bef264' }}>Marketplace &</Box>
                        <br />
                        <Box component="span" sx={{ color: '#bef264' }}>AI</Box> ecosystem.
                    </Typography>

                    {/* Description */}
                    <Typography variant="body1" sx={{ color: '#94a3b8', maxWidth: 400, lineHeight: 1.8 }}>
                        Create your account to access your personalized workspace, manage your assets, and leverage powerful AI-driven tools.
                    </Typography>

                    {/* Footer */}
                    <Typography variant="caption" sx={{ position: 'absolute', bottom: 40, color: '#64748b' }}>
                        © 2024 AtoZ Technologies Inc. All rights reserved.
                    </Typography>
                </Box>

                {/* Right Side - Form */}
                <Box
                    sx={{
                        width: { xs: '100%', md: '50%' },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 4
                    }}
                >
                    <Paper
                        elevation={0}
                        sx={{
                            width: '100%',
                            maxWidth: 480,
                            p: 5,
                            borderRadius: 3,
                            bgcolor: 'white',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                        }}
                    >
                        {/* Header */}
                        <Box sx={{ mb: 4 }}>
                            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0a0a0a', mb: 1 }}>
                                {userType === 2 ? 'Admin Portal' : 'Create Account'}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#64748b' }}>
                                {userType === 2 ? 'Restricted access for Global Operations' : 'Select your account type and fill in your details to get started.'}
                            </Typography>
                        </Box>

                        {/* Role Selection */}
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="caption" sx={{ display: 'block', mb: 1.5, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                Select User Type
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                {/* Seller */}
                                <Box
                                    onClick={() => setUserType(0)}
                                    sx={{
                                        flex: 1,
                                        border: userType === 0 ? '2px solid #bef264' : '1px solid #e5e7eb',
                                        borderRadius: 2,
                                        p: 2.5,
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        bgcolor: userType === 0 ? '#f7fee7' : 'white',
                                        transition: 'all 0.2s',
                                        '&:hover': {
                                            borderColor: '#bef264',
                                            bgcolor: '#f7fee7'
                                        }
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 48,
                                            height: 48,
                                            borderRadius: '50%',
                                            bgcolor: userType === 0 ? '#bef264' : '#f3f4f6',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mx: 'auto',
                                            mb: 1.5,
                                            color: '#0a0a0a'
                                        }}
                                    >
                                        <StorefrontOutlinedIcon sx={{ fontSize: '1.5rem' }} />
                                    </Box>
                                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#0a0a0a' }}>
                                        Seller
                                    </Typography>
                                </Box>

                                {/* Buyer */}
                                <Box
                                    onClick={() => setUserType(1)}
                                    sx={{
                                        flex: 1,
                                        border: userType === 1 ? '2px solid #bef264' : '1px solid #e5e7eb',
                                        borderRadius: 2,
                                        p: 2.5,
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        bgcolor: userType === 1 ? '#f7fee7' : 'white',
                                        transition: 'all 0.2s',
                                        '&:hover': {
                                            borderColor: '#bef264',
                                            bgcolor: '#f7fee7'
                                        }
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 48,
                                            height: 48,
                                            borderRadius: '50%',
                                            bgcolor: userType === 1 ? '#bef264' : '#f3f4f6',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mx: 'auto',
                                            mb: 1.5,
                                            color: '#0a0a0a'
                                        }}
                                    >
                                        <ShoppingCartOutlinedIcon sx={{ fontSize: '1.5rem' }} />
                                    </Box>
                                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#0a0a0a' }}>
                                        Buyer
                                    </Typography>
                                </Box>

                                {/* Admin */}
                                <Box
                                    onClick={() => setUserType(2)}
                                    sx={{
                                        flex: 1,
                                        border: userType === 2 ? '2px solid #bef264' : '1px solid #e5e7eb',
                                        borderRadius: 2,
                                        p: 2.5,
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        bgcolor: userType === 2 ? '#f7fee7' : 'white',
                                        transition: 'all 0.2s',
                                        '&:hover': {
                                            borderColor: '#bef264',
                                            bgcolor: '#f7fee7'
                                        }
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 48,
                                            height: 48,
                                            borderRadius: '50%',
                                            bgcolor: userType === 2 ? '#bef264' : '#f3f4f6',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mx: 'auto',
                                            mb: 1.5,
                                            color: '#0a0a0a'
                                        }}
                                    >
                                        <AdminPanelSettingsOutlinedIcon sx={{ fontSize: '1.5rem' }} />
                                    </Box>
                                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#0a0a0a' }}>
                                        Admin
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                        {error && userType === 2 && (
                            <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
                        )}

                        {/* Form Fields */}
                        <Box component="form" onSubmit={handleLogin} noValidate>
                            {/* Admin: Email + Password */}
                            {userType === 2 ? (
                                <>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        placeholder="admin@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        sx={{
                                            mb: 2,
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 2,
                                                bgcolor: '#f9fafb'
                                            }
                                        }}
                                    />

                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        sx={{
                                            mb: 1,
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 2,
                                                bgcolor: '#f9fafb'
                                            }
                                        }}
                                    />
                                </>
                            ) : (
                                /* Seller/Buyer: Name + Phone + Password */
                                <>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="name"
                                        label="Full Name"
                                        name="name"
                                        autoComplete="name"
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        sx={{
                                            mb: 2,
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 2,
                                                bgcolor: '#f9fafb'
                                            }
                                        }}
                                    />

                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="phone"
                                        label="Phone Number"
                                        name="phone"
                                        autoComplete="tel"
                                        placeholder="+1 (555) 000-0000"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        sx={{
                                            mb: 2,
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 2,
                                                bgcolor: '#f9fafb'
                                            }
                                        }}
                                    />

                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        sx={{
                                            mb: 1,
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 2,
                                                bgcolor: '#f9fafb'
                                            }
                                        }}
                                    />
                                </>
                            )}

                            <Typography variant="caption" sx={{ display: 'block', mb: 3, color: '#64748b' }}>
                                Must be at least 8 characters long
                            </Typography>

                            {/* Terms */}
                            <Typography variant="caption" sx={{ display: 'block', mb: 3, color: '#64748b' }}>
                                I agree to the <Box component="span" sx={{ color: '#2563eb', cursor: 'pointer', fontWeight: 600 }}>Terms of Service</Box> and <Box component="span" sx={{ color: '#2563eb', cursor: 'pointer', fontWeight: 600 }}>Privacy Policy</Box>
                            </Typography>

                            {/* Register Button */}
                            <Button
                                fullWidth
                                variant="contained"
                                size="large"
                                onClick={handleLogin}
                                sx={{
                                    py: 1.5,
                                    bgcolor: '#bef264',
                                    color: '#0a0a0a',
                                    fontWeight: 700,
                                    mb: 3,
                                    textTransform: 'none',
                                    borderRadius: 2,
                                    fontSize: '1rem',
                                    boxShadow: 'none',
                                    '&:hover': {
                                        bgcolor: '#a3e635',
                                        boxShadow: 'none'
                                    }
                                }}
                            >
                                {userType === 2 ? 'Authenticate Admin' : 'Register Account 🚀'}
                            </Button>

                            {/* Already have account */}
                            <Typography variant="body2" align="center" sx={{ mb: 3, color: '#64748b' }}>
                                Already have an account? <Box component="span" onClick={handleLogin} sx={{ color: '#2563eb', cursor: 'pointer', fontWeight: 600 }}>Sign In Instead</Box>
                            </Typography>

                            <Divider sx={{ mb: 3, color: '#94a3b8', fontSize: '0.85rem' }}>Or register with</Divider>

                            {/* Social Login Buttons */}
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    startIcon={<GoogleIcon />}
                                    sx={{
                                        py: 1.5,
                                        color: '#0a0a0a',
                                        borderColor: '#e5e7eb',
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        borderRadius: 2,
                                        bgcolor: '#f9fafb',
                                        '&:hover': {
                                            bgcolor: '#f3f4f6',
                                            borderColor: '#d1d5db'
                                        }
                                    }}
                                >
                                    Google
                                </Button>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    startIcon={<AppleIcon />}
                                    sx={{
                                        py: 1.5,
                                        color: '#0a0a0a',
                                        borderColor: '#e5e7eb',
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        borderRadius: 2,
                                        bgcolor: '#f9fafb',
                                        '&:hover': {
                                            bgcolor: '#f3f4f6',
                                            borderColor: '#d1d5db'
                                        }
                                    }}
                                >
                                    Apple
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
};

export default Login;
