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

    // Seller Specific State
    const [sellerData, setSellerData] = useState({
        businessName: '',
        gst: '',
        accountNumber: '',
        ifsc: '',
        bankName: ''
    });

    const [errors, setErrors] = useState<any>({});

    const validate = () => {
        let tempErrors: any = {};

        // Name validation
        if (!formData.name.trim()) {
            tempErrors.name = "Full Name is required";
        } else if (formData.name.length < 3) {
            tempErrors.name = "Name must be at least 3 characters";
        }

        // Email validation (optional but must be valid if provided)
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            tempErrors.email = "Please enter a valid email address";
        }

        // Mobile validation - exactly 10 digits, Indian format (6-9 followed by 9 digits)
        const mobileDigits = formData.mobile.replace(/\D/g, '');
        if (!formData.mobile.trim()) {
            tempErrors.mobile = "Mobile number is required";
        } else if (mobileDigits.length !== 10) {
            tempErrors.mobile = "Mobile number must be exactly 10 digits";
        } else if (!/^[6-9]\d{9}$/.test(mobileDigits)) {
            tempErrors.mobile = "Enter a valid 10-digit mobile number (must start with 6, 7, 8 or 9)";
        }

        // Password validation - Strong requirements
        if (!formData.password) {
            tempErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            tempErrors.password = "Password must be at least 8 characters";
        } else if (!/[A-Z]/.test(formData.password)) {
            tempErrors.password = "Password must contain at least one uppercase letter";
        } else if (!/[a-z]/.test(formData.password)) {
            tempErrors.password = "Password must contain at least one lowercase letter";
        } else if (!/[0-9]/.test(formData.password)) {
            tempErrors.password = "Password must contain at least one number";
        }

        // Confirm password validation
        if (!formData.confirmPassword) {
            tempErrors.confirmPassword = "Please confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
            tempErrors.confirmPassword = "Passwords do not match";
        }

        // Seller-specific validation
        if (userType === 0) {
            if (!sellerData.businessName.trim()) {
                tempErrors.businessName = "Business name is required for sellers";
            }
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (['businessName', 'gst', 'accountNumber', 'ifsc', 'bankName'].includes(name)) {
            setSellerData((prev: any) => ({ ...prev, [name]: value }));
        } else {
            setFormData((prev: any) => ({ ...prev, [name]: value }));
        }
        if (errors[name]) setErrors((prev: any) => ({ ...prev, [name]: '' }));
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) {
            toast.error("Please fix the validation errors");
            return;
        }

        setIsLoading(true);

        try {
            const mobileNormalized = formData.mobile.replace(/\D/g, '').slice(0, 10);
            const payload = {
                username: formData.name,
                mobile: mobileNormalized,
                email: formData.email || undefined,
                password: formData.password,
                ...(userType === 0 && {
                    businessDetails: {
                        businessName: sellerData.businessName,
                        gst: sellerData.gst
                    },
                    bankDetails: {
                        accountNumber: sellerData.accountNumber,
                        ifsc: sellerData.ifsc,
                        bankName: sellerData.bankName
                    }
                })
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
                navigate('/freelance');
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
                                required
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
                                    required
                                    name="mobile"
                                    label="Mobile (10 digits)"
                                    placeholder="9876543210"
                                    value={formData.mobile}
                                    onChange={(e) => {
                                        const v = e.target.value.replace(/\D/g, '').slice(0, 10);
                                        setFormData((prev: any) => ({ ...prev, mobile: v }));
                                        if (errors.mobile) setErrors((prev: any) => ({ ...prev, mobile: '' }));
                                    }}
                                    error={!!errors.mobile}
                                    helperText={errors.mobile || "Exactly 10 digits, starting with 6–9"}
                                    inputProps={{ maxLength: 10, inputMode: 'numeric', pattern: '[0-9]*' }}
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

                            {userType === 0 && (
                                <>
                                    <TextField
                                        fullWidth
                                        name="businessName"
                                        label="Business Name"
                                        placeholder="My Awesome Store"
                                        value={sellerData.businessName}
                                        onChange={handleInputChange}
                                        error={!!errors.businessName}
                                        helperText={errors.businessName}
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                                    />
                                    <TextField
                                        fullWidth
                                        name="gst"
                                        label="GST Number (Optional for Retail)"
                                        placeholder="22AAAAA0000A1Z5"
                                        value={sellerData.gst}
                                        onChange={handleInputChange}
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                                    />
                                    <Typography variant="subtitle2" sx={{ fontWeight: 800, mt: 1 }}>Bank Details for Payouts</Typography>
                                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                                        <TextField
                                            fullWidth
                                            name="accountNumber"
                                            label="Account Number"
                                            value={sellerData.accountNumber}
                                            onChange={handleInputChange}
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                                        />
                                        <TextField
                                            fullWidth
                                            name="ifsc"
                                            label="IFSC Code"
                                            value={sellerData.ifsc}
                                            onChange={handleInputChange}
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                                        />
                                    </Box>
                                    <TextField
                                        fullWidth
                                        name="bankName"
                                        label="Bank Name"
                                        value={sellerData.bankName}
                                        onChange={handleInputChange}
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                                    />
                                </>
                            )}

                            <TextField
                                fullWidth
                                required
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={handleInputChange}
                                error={!!errors.password}
                                helperText={errors.password || "Min 8 characters, 1 uppercase, 1 lowercase, 1 number"}
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
                                required
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
