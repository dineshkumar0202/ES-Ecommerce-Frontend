import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Container, InputAdornment, IconButton } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Navbar from '../WrapperComponents/Navbar';
import Footer from '../WrapperComponents/Footer';

const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

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
                            background: 'linear-gradient(135deg, #00c853 0%, #009624 100%)', // Different color for Register (Green)
                            color: 'white',
                            p: 6,
                            position: 'relative'
                        }}
                    >
                        {/* Decorative Circles */}
                        <Box sx={{ position: 'absolute', top: -50, left: -50, width: 200, height: 200, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.05)' }} />
                        <Box sx={{ position: 'absolute', bottom: -50, right: -50, width: 300, height: 300, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.05)' }} />

                        <Typography variant="h3" sx={{ fontWeight: 900, mb: 2, zIndex: 1 }}>Join Us.</Typography>
                        <Typography variant="h6" sx={{ textAlign: 'center', opacity: 0.8, zIndex: 1 }}>
                            Create your account and start your journey with ATOZ today.
                        </Typography>
                    </Box>

                    {/* Right Side - Form */}
                    <Box sx={{ width: { xs: '100%', md: '50%' }, p: { xs: 4, md: 6 }, bgcolor: 'white' }}>
                        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: '#333' }}>
                            Create Account
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
                            Enter your details below to create your account
                        </Typography>

                        <Box component="form" noValidate>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    name="firstName"
                                    autoFocus
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    sx={{ mb: 2 }}
                                />
                            </Box>

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
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
                                autoComplete="new-password"
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
                                sx={{ mb: 4 }}
                            />

                            <Button
                                fullWidth
                                variant="contained"
                                size="large"
                                onClick={() => navigate('/')}
                                sx={{
                                    py: 1.5,
                                    bgcolor: '#00c853',
                                    fontWeight: 'bold',
                                    mb: 3,
                                    '&:hover': { bgcolor: '#009624' }
                                }}
                            >
                                Sign Up
                            </Button>

                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="body2" color="text.secondary">
                                    Already have an account? {' '}
                                    <Link to="/login" style={{ textDecoration: 'none', fontWeight: 'bold', color: '#00c853' }}>
                                        Log In
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

export default Register;
