import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Container, Tab, Tabs, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../WrapperComponents/Navbar';
import Footer from '../WrapperComponents/Footer';
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {
    const navigate = useNavigate();
    const [userType, setUserType] = useState(0); // 0 = User, 1 = Seller, 2 = Admin

    const handleUserTypeChange = (_event: React.SyntheticEvent, newValue: number) => {
        setUserType(newValue);
    };

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#f1f5f9' }}>
            <Navbar />

            <Container maxWidth="sm" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', py: 8 }}>
                <Paper
                    elevation={0}
                    sx={{
                        width: '100%',
                        borderRadius: 4,
                        overflow: 'hidden',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        bgcolor: 'white',
                        p: { xs: 3, md: 5 }
                    }}
                >
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b', mb: 1 }}>
                            Welcome to AtoZ
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#64748b' }}>
                            Please sign in to your account
                        </Typography>
                    </Box>

                    {/* Role Selection */}
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="caption" sx={{ display: 'block', mb: 1, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                            Select Your Role
                        </Typography>
                        <Tabs
                            value={userType}
                            onChange={handleUserTypeChange}
                            variant="fullWidth"
                            sx={{
                                border: '1px solid #e2e8f0',
                                borderRadius: 2,
                                '& .MuiTabs-indicator': { display: 'none' },
                                '& .MuiTab-root': {
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    zIndex: 1,
                                    transition: 'all 0.2s',
                                    color: '#64748b',
                                    '&.Mui-selected': {
                                        color: 'white',
                                        bgcolor: '#2563eb', // Blue for primary selection
                                        borderRadius: 1.5,
                                        m: 0.5,
                                        boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)'
                                    }
                                }
                            }}
                        >
                            <Tab label="User" disableRipple />
                            <Tab label="Seller" disableRipple />
                            <Tab label="Admin" disableRipple />
                        </Tabs>
                    </Box>

                    <Box component="form" noValidate>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="identifier"
                            label="Phone Number or Email"
                            name="identifier"
                            autoComplete="username"
                            autoFocus
                            sx={{
                                mb: 3,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2
                                }
                            }}
                        />

                        {/* Send OTP Button - Prominent Blue */}
                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            onClick={() => navigate('/')}
                            sx={{
                                py: 1.5,
                                bgcolor: '#2563eb',
                                fontWeight: 700,
                                mb: 3,
                                textTransform: 'none',
                                borderRadius: 2,
                                boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)',
                                '&:hover': { bgcolor: '#1d4ed8' }
                            }}
                        >
                            Send OTP
                        </Button>

                        <Divider sx={{ mb: 3, color: '#94a3b8', fontSize: '0.85rem' }}>OR</Divider>

                        {/* Sign in with Google */}
                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<GoogleIcon />}
                            sx={{
                                py: 1.5,
                                color: '#1e293b',
                                borderColor: '#e2e8f0',
                                textTransform: 'none',
                                fontWeight: 600,
                                borderRadius: 2,
                                mb: 3,
                                '&:hover': {
                                    bgcolor: '#f8fafc',
                                    borderColor: '#cbd5e1'
                                }
                            }}
                        >
                            Sign in with Google
                        </Button>

                        {/* Terms */}
                        <Typography variant="caption" align="center" display="block" sx={{ color: '#94a3b8' }}>
                            By continuing, you agree to our <Box component="span" sx={{ color: '#2563eb', cursor: 'pointer', fontWeight: 600 }}>Terms of Service</Box> and <Box component="span" sx={{ color: '#2563eb', cursor: 'pointer', fontWeight: 600 }}>Privacy Policy</Box>.
                        </Typography>
                    </Box>
                </Paper>
            </Container>

            <Footer />
        </Box>
    );
};

export default Login;
