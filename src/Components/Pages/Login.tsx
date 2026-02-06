import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Container, Tab, Tabs, InputAdornment, IconButton, Checkbox, FormControlLabel, Link as MuiLink } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Navbar from '../WrapperComponents/Navbar';
import Footer from '../WrapperComponents/Footer';

const Login = () => {
    const navigate = useNavigate();
    const [userType, setUserType] = useState(0); // 0 = User, 1 = Admin
    const [showPassword, setShowPassword] = useState(false);

    const handleUserTypeChange = (_event: React.SyntheticEvent, newValue: number) => {
        setUserType(newValue);
    };

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#f5f5f5' }}>
            <Navbar />

            <Container maxWidth="md" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', py: 8 }}>
                <Paper
                    elevation={0}
                    sx={{
                        display: 'flex',
                        width: '100%',
                        maxWidth: '900px',
                        borderRadius: 4,
                        overflow: 'hidden',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
                    }}
                >
                    {/* Left Side - Image/Brand */}
                    <Box
                        sx={{
                            width: '50%',
                            display: { xs: 'none', md: 'flex' },
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
                            color: 'white',
                            p: 6,
                            position: 'relative'
                        }}
                    >
                        {/* Decorative Circles */}
                        <Box sx={{ position: 'absolute', top: -50, left: -50, width: 200, height: 200, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.05)' }} />
                        <Box sx={{ position: 'absolute', bottom: -50, right: -50, width: 300, height: 300, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.05)' }} />

                        <Typography variant="h3" sx={{ fontWeight: 900, mb: 2, zIndex: 1 }}>ATOZ.</Typography>
                        <Typography variant="h6" sx={{ textAlign: 'center', opacity: 0.8, zIndex: 1 }}>
                            Your one-stop destination for everything. Experience the future of commerce.
                        </Typography>
                    </Box>

                    {/* Right Side - Form */}
                    <Box sx={{ width: { xs: '100%', md: '50%' }, p: { xs: 4, md: 6 }, bgcolor: 'white' }}>
                        <Typography variant="h4" sx={{ fontWeight: 800, mb: 3, color: '#333' }}>
                            Welcome Back
                        </Typography>

                        <Tabs
                            value={userType}
                            onChange={handleUserTypeChange}
                            sx={{ mb: 4, borderBottom: 1, borderColor: 'divider' }}
                            indicatorColor="primary"
                            textColor="primary"
                        >
                            <Tab label="User Login" sx={{ fontWeight: 600 }} />
                            <Tab label="Admin Login" sx={{ fontWeight: 600 }} />
                        </Tabs>

                        <Box component="form" noValidate>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                autoComplete="current-password"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ mb: 1 }}
                            />

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" size="small" />}
                                    label={<Typography variant="body2">Remember me</Typography>}
                                />
                                <MuiLink component="button" variant="body2" sx={{ textDecoration: 'none', fontWeight: 600 }}>
                                    Forgot password?
                                </MuiLink>
                            </Box>

                            <Button
                                fullWidth
                                variant="contained"
                                size="large"
                                onClick={() => navigate('/')}
                                sx={{
                                    py: 1.5,
                                    bgcolor: '#1a237e',
                                    fontWeight: 'bold',
                                    mb: 3,
                                    '&:hover': { bgcolor: '#0d47a1' } // Darker shade on hover
                                }}
                            >
                                Login as {userType === 0 ? 'User' : 'Admin'}
                            </Button>

                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="body2" color="text.secondary">
                                    Don't have an account? {' '}
                                    <Link to="/register" style={{ textDecoration: 'none', fontWeight: 'bold', color: '#1a237e' }}>
                                        Sign Up
                                    </Link>
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            </Container>

            <Footer />
        </Box>
    );
};

export default Login;
