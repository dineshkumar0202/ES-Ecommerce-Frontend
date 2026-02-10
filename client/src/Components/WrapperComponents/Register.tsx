import { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Container, InputAdornment, IconButton, Tab, Tabs, Alert } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import StorefrontIcon from '@mui/icons-material/Storefront';
import Navbar from './Navbar';
import Footer from './Footer';
import { AuthService } from '../../services/api';

const Register = () => {
    const navigate = useNavigate();

    // 0 = Seller, 1 = User
    const [userType, setUserType] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState<any>({});

    const validate = () => {
        let tempErrors: any = {};
        if (!formData.name.trim()) tempErrors.name = "Full Name is required";
        else if (formData.name.length < 3) tempErrors.name = "Name must be at least 3 characters";

        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = "Email is invalid";
        }

        if (!/^\d{10}$/.test(formData.mobile)) {
            tempErrors.mobile = "Enter a valid 10-digit mobile number";
        }

        if (formData.password.length < 6) {
            tempErrors.password = "Password must be at least 6 characters";
        }

        if (formData.password !== formData.confirmPassword) {
            tempErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev: any) => ({ ...prev, [name]: '' }));
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) {
            toast.error("Please fix the validation errors");
            return;
        }

        setIsLoading(true);

        try {
            const payload = {
                username: formData.name,
                mobile: formData.mobile,
                email: formData.email || undefined,
                password: formData.password
            };

            let response;
            if (userType === 1) {
                response = await AuthService.registerBuyer(payload);
            } else {
                response = await AuthService.registerSeller(payload);
            }

            const { token, username, role: userRole } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('userRole', userRole);
            localStorage.setItem('userName', username);
            localStorage.setItem('userProfileImage', `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=random`);

            toast.success(`Welcome to AtoZ, ${username}!`);

            if (userRole === 'Seller') {
                navigate('/seller/profile');
            } else {
                navigate('/profile');
            }

        } catch (err: any) {
            const serverError = err.response?.data?.message || 'Registration failed. Please try again.';
            setErrors((prev: any) => ({ ...prev, server: serverError }));
            toast.error(serverError);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#f8fafc' }}>
            <Navbar />

            <Container maxWidth="lg" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', py: 8 }}>
                <Paper
                    elevation={0}
                    sx={{
                        display: 'flex',
                        width: '100%',
                        maxWidth: '1100px',
                        borderRadius: 6,
                        overflow: 'hidden',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    {/* Left Side - Info/Brand */}
                    <Box
                        sx={{
                            width: '45%',
                            display: { xs: 'none', md: 'flex' },
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            bgcolor: '#000000',
                            color: 'white',
                            p: 6,
                            textAlign: 'center'
                        }}
                    >
                        <Box sx={{ mb: 6 }}>
                            <Box sx={{ width: 60, height: 60, bgcolor: '#B4D5DC', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: 'black', fontSize: '1.8rem', mx: 'auto', mb: 2 }}>AZ</Box>
                            <Typography variant="h4" sx={{ fontWeight: 800 }}>Start Your Journey</Typography>
                        </Box>

                        <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 500, lineHeight: 1.6, mb: 4 }}>
                            Join thousands of users and sellers in our all-in-one ecosystem designed for the next generation of commerce.
                        </Typography>

                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, width: '100%' }}>
                            <Box sx={{ p: 2, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.1)' }}>
                                <Typography variant="h5" sx={{ fontWeight: 800 }}>10k+</Typography>
                                <Typography variant="caption">Active Users</Typography>
                            </Box>
                            <Box sx={{ p: 2, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.1)' }}>
                                <Typography variant="h5" sx={{ fontWeight: 800 }}>500+</Typography>                                <Typography variant="caption">Verified Sellers</Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* Right Side - Form */}
                    <Box sx={{ flex: 1, p: { xs: 4, md: 8 }, bgcolor: 'white' }}>
                        <Typography variant="h4" sx={{ fontWeight: 900, mb: 1, color: '#111827' }}>
                            Join AtoZ
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#6b7280', mb: 4 }}>
                            Create your account to start buying or selling products
                        </Typography>

                        {/* User Type Tabs */}
                        <Box sx={{ mb: 4 }}>
                            <Tabs
                                value={userType}
                                onChange={(_, v) => { setUserType(v); setErrors({}); }}
                                sx={{
                                    bgcolor: '#f3f4f6',
                                    p: 0.5,
                                    borderRadius: 4,
                                    '& .MuiTabs-indicator': { bgcolor: 'white', borderRadius: 3, height: 'calc(100% - 8px)', mb: '4px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }
                                }}
                            >
                                <Tab label="Regular User" value={1} icon={<PersonOutlineIcon />} iconPosition="start" sx={{ flex: 1, fontWeight: 700, textTransform: 'none', minHeight: 48 }} />
                                <Tab label="Store Seller" value={0} icon={<StorefrontIcon />} iconPosition="start" sx={{ flex: 1, fontWeight: 700, textTransform: 'none', minHeight: 48 }} />
                            </Tabs>
                        </Box>

                        {errors.server && <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>{errors.server}</Alert>}

                        <Box component="form" onSubmit={handleRegister} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                            <TextField
                                fullWidth
                                name="name"
                                label="Full Name"
                                placeholder="e.g. John Doe"
                                value={formData.name}
                                onChange={handleInputChange}
                                error={!!errors.name}
                                helperText={errors.name}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                            />

                            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                                <TextField
                                    fullWidth
                                    name="mobile"
                                    label="Mobile"
                                    placeholder="9876543210"
                                    value={formData.mobile}
                                    onChange={handleInputChange}
                                    error={!!errors.mobile}
                                    helperText={errors.mobile}
                                    InputProps={{ startAdornment: <InputAdornment position="start">+91</InputAdornment> }}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                                />
                                <TextField
                                    fullWidth
                                    name="email"
                                    label="Email (Optional)"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                                />
                            </Box>

                            <TextField
                                fullWidth
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={handleInputChange}
                                error={!!errors.password}
                                helperText={errors.password}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                            />

                            <TextField
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                            />

                            <Typography variant="caption" sx={{ color: '#6b7280', mt: 1 }}>
                                By signing up, you agree to our <Box component="span" sx={{ color: '#000000', fontWeight: 700, cursor: 'pointer' }}>Terms of Service</Box> and <Box component="span" sx={{ color: '#000000', fontWeight: 700, cursor: 'pointer' }}>Privacy Policy</Box>.
                            </Typography>

                            <Button
                                fullWidth
                                variant="contained"
                                type="submit"
                                disabled={isLoading}
                                sx={{
                                    py: 2,
                                    bgcolor: '#B4D5DC',
                                    color: '#000000',
                                    fontWeight: 800,
                                    fontSize: '1.1rem',
                                    borderRadius: 4,
                                    textTransform: 'none',
                                    boxShadow: '0 10px 15px -3px rgba(180, 213, 220, 0.3)',
                                    '&:hover': { bgcolor: '#9cc3cd' }
                                }}
                            >
                                {isLoading ? 'Creating Account...' : 'Join the Community'}
                            </Button>

                            <Box sx={{ textAlign: 'center', mt: 2 }}>
                                <Typography variant="body2" color="text.secondary">
                                    Already have an account? {' '}
                                    <Link to="/login" style={{ textDecoration: 'none', fontWeight: 800, color: '#000000' }}>
                                        Sign In
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
