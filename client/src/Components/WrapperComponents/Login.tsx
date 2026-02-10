import { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Divider, Alert } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import Navbar from './Navbar';
import { AuthService } from '../../services/api';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // 0 = Seller, 1 = Buyer, 2 = Admin
    const [userType, setUserType] = useState(location.pathname.includes('/admin') ? 2 : 1); // Default to Buyer (1)
    const [isLogin, setIsLogin] = useState(false); // Toggle between Login and Register

    // Form State
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAuth = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const trimmedName = name.trim();
            const trimmedMobile = mobile.trim();
            const trimmedEmail = email.trim();

            let response;
            if (isLogin) {
                // Login API
                if (userType === 2) {
                    if (!trimmedEmail || !password) {
                        setError('Email and Password are required');
                        setIsLoading(false);
                        return;
                    }
                    response = await AuthService.loginAdmin({ email: trimmedEmail, password });
                } else if (userType === 0) {
                    if (!trimmedMobile || !password) {
                        setError('Mobile and Password are required');
                        setIsLoading(false);
                        return;
                    }
                    response = await AuthService.loginSeller({ mobile: trimmedMobile, password });
                } else {
                    if (!trimmedMobile || !password) {
                        setError('Mobile and Password are required');
                        setIsLoading(false);
                        return;
                    }
                    response = await AuthService.loginBuyer({ mobile: trimmedMobile, password });
                }
            } else {
                // Register API
                if (userType === 2) {
                    setError('Admin registration is not allowed');
                    setIsLoading(false);
                    return;
                }

                if (!trimmedName || !trimmedMobile || !password) {
                    setError('Name, Mobile, and Password are required');
                    setIsLoading(false);
                    return;
                }

                const registerPayload: any = {
                    username: trimmedName,
                    mobile: trimmedMobile,
                    password,
                    email: trimmedEmail || undefined
                };

                if (userType === 0) {
                    response = await AuthService.registerSeller(registerPayload);
                } else {
                    response = await AuthService.registerBuyer(registerPayload);
                }
            }

            const { token, username, role: userRole } = response.data;

            // Store in LocalStorage
            localStorage.setItem('token', token);
            localStorage.setItem('userRole', userRole);
            localStorage.setItem('userName', username);
            // Optional: Profile image fallback
            localStorage.setItem('userProfileImage', `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=random`);

            // Redirect
            toast.success(`Welcome back, ${username}!`);
            if (userRole === 'Admin') {
                navigate('/admin', { replace: true });
            } else if (userRole === 'Seller') {
                navigate('/seller/profile', { replace: true });
            } else {
                navigate('/profile', { replace: true });
            }

        } catch (err: any) {
            console.error("Auth Error Details:", err.response?.data || err.message);
            console.error("Auth Error Full:", err);
            setError(err.response?.data?.message || 'Authentication failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#f5f5f5' }}>
            <Navbar />
            <Box sx={{ flex: 1, display: 'flex' }}>
                {/* Left Side - Dark Branding (Keep as is) */}
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
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 6 }}>
                        <Box sx={{ width: 40, height: 40, bgcolor: '#bef264', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: 'black', fontSize: '1.2rem' }}>AZ</Box>
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>AtoZ</Typography>
                    </Box>
                    <Typography variant="h2" sx={{ fontWeight: 800, mb: 3, lineHeight: 1.2 }}>
                        Join the<br />
                        <Box component="span" sx={{ color: '#bef264' }}>Marketplace &</Box><br />
                        <Box component="span" sx={{ color: '#bef264' }}>AI</Box> ecosystem.
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#94a3b8', maxWidth: 400, lineHeight: 1.8 }}>
                        Create your account to access your personalized workspace, manage your assets, and leverage powerful AI-driven tools.
                    </Typography>
                    <Typography variant="caption" sx={{ position: 'absolute', bottom: 40, color: '#64748b' }}>
                        © 2024 AtoZ Technologies Inc. All rights reserved.
                    </Typography>
                </Box>

                {/* Right Side - Form */}
                <Box sx={{ width: { xs: '100%', md: '50%' }, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4 }}>
                    <Paper elevation={0} sx={{ width: '100%', maxWidth: 480, p: 5, borderRadius: 3, bgcolor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>

                        {/* Header */}
                        <Box sx={{ mb: 4 }}>
                            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0a0a0a', mb: 1 }}>
                                {isLogin ? 'Welcome Back' : 'Create Account'}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#64748b' }}>
                                {isLogin ? 'Enter your credentials to access your account.' : 'Select your account type and fill in your details to get started.'}
                            </Typography>
                        </Box>

                        {/* Role Selection */}
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="caption" sx={{ display: 'block', mb: 1.5, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                Select User Type
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                {[
                                    { id: 1, label: 'Buyer', icon: <ShoppingCartOutlinedIcon /> },
                                    { id: 0, label: 'Seller', icon: <StorefrontOutlinedIcon /> },
                                    { id: 2, label: 'Admin', icon: <AdminPanelSettingsOutlinedIcon /> }
                                ].map((type) => (
                                    <Box
                                        key={type.id}
                                        onClick={() => {
                                            setUserType(type.id);
                                            setError('');
                                            if (type.id === 2) setIsLogin(true);
                                        }}
                                        sx={{
                                            flex: 1,
                                            border: userType === type.id ? '2px solid #bef264' : '1px solid #e5e7eb',
                                            borderRadius: 2,
                                            p: 2,
                                            textAlign: 'center',
                                            cursor: 'pointer',
                                            bgcolor: userType === type.id ? '#f7fee7' : 'white',
                                            transition: 'all 0.2s',
                                            '&:hover': { borderColor: '#bef264', bgcolor: '#f7fee7' }
                                        }}
                                    >
                                        <Box sx={{ color: '#0a0a0a', mb: 0.5 }}>{type.icon}</Box>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{type.label}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>

                        {error && (<Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>)}

                        {/* Standard Login/Register for Buyer/Seller/Admin */}
                        <Box component="form" onSubmit={handleAuth} noValidate>
                            {/* Name - Only for Register */}
                            {!isLogin && (
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Full Name"
                                    name="name"
                                    autoComplete="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: '#f9fafb' } }}
                                />
                            )}

                            {/* Mobile or Email - Primary ID */}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label={userType === 2 ? "Email Address" : "Mobile Number"}
                                name={userType === 2 ? "email" : "mobile"}
                                type={userType === 2 ? "email" : "tel"}
                                autoComplete={userType === 2 ? "email" : "tel"}
                                value={userType === 2 ? email : mobile}
                                onChange={(e) => userType === 2 ? setEmail(e.target.value) : setMobile(e.target.value)}
                                sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: '#f9fafb' } }}
                            />


                            {/* Password */}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: '#f9fafb' } }}
                            />

                            {!isLogin && (
                                <Typography variant="caption" sx={{ display: 'block', mb: 3, color: '#64748b' }}>
                                    I agree to the <Box component="span" sx={{ color: '#2563eb', cursor: 'pointer', fontWeight: 600 }}>Terms of Service</Box>
                                </Typography>
                            )}

                            <Button
                                fullWidth
                                variant="contained"
                                size="large"
                                onClick={handleAuth}
                                disabled={isLoading}
                                sx={{
                                    py: 1.5, bgcolor: '#bef264', color: '#0a0a0a', fontWeight: 700, mb: 3,
                                    textTransform: 'none', borderRadius: 2, fontSize: '1rem',
                                    boxShadow: 'none', '&:hover': { bgcolor: '#a3e635', boxShadow: 'none' }
                                }}
                            >
                                {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Register Account 🚀')}
                            </Button>

                            <Typography variant="body2" align="center" sx={{ mb: 3, color: '#64748b' }}>
                                {isLogin ? "Don't have an account? " : "Already have an account? "}
                                <Box component="span" onClick={() => setIsLogin(!isLogin)} sx={{ color: '#2563eb', cursor: 'pointer', fontWeight: 600 }}>
                                    {isLogin ? 'Register Here' : 'Sign In Instead'}
                                </Box>
                            </Typography>

                            <Divider sx={{ mb: 3, color: '#94a3b8', fontSize: '0.85rem' }}>Or continue with</Divider>

                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Button fullWidth variant="outlined" startIcon={<GoogleIcon />} sx={{ py: 1.5, color: '#0a0a0a', borderColor: '#e5e7eb', textTransform: 'none', borderRadius: 2 }}>Google</Button>
                                <Button fullWidth variant="outlined" startIcon={<AppleIcon />} sx={{ py: 1.5, color: '#0a0a0a', borderColor: '#e5e7eb', textTransform: 'none', borderRadius: 2 }}>Apple</Button>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
};

export default Login;
