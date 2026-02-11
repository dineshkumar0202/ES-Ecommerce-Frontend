import { useState } from 'react';
import {
    Box, Typography, TextField, Button, Paper, Divider, Alert,
    Stack, Container, IconButton, Fade, Checkbox, FormControlLabel,
    CircularProgress, Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import GoogleIcon from '@mui/icons-material/Google';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Navbar from './Navbar'; 
import { AuthService } from '../../services/api';
import GoogleAuthButton from './GoogleAuthButton';

type AuthStep = 'SELECT' | 'USER_AUTH' | 'SELLER_REG';

const Login = () => {
    const navigate = useNavigate();

    const [authStep, setAuthStep] = useState<AuthStep>('SELECT');
    const [userType, setUserType] = useState<number>(1); // 1 = Buyer/User, 0 = Seller
    const [isLogin, setIsLogin] = useState(true);

    // Form State for User
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');

    // Form State for Seller (Detailed)
    const [sellerData, setSellerData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        designation: '',
        businessName: '',
        businessAddress: '',
        taxId: '',
        websiteUrl: '',

        password: ''
    });

    const [registrationSuccess, setRegistrationSuccess] = useState<{ id: string, pass: string } | null>(null);

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validateMobile = (mobile: string) => {
        return /^\d{10}$/.test(mobile);
    };

    // Simple check for PAN (10 chars) or GST (15 chars)
    const validateTaxId = (id: string) => {
        return id.length >= 10;
    };

    const handleAuth = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setError('');

        // --- VALIDATION ---
        if (isLogin) {
            // LOGIN VALIDATION
            if (!mobile.trim()) {
                setError('Please enter your login credential (Mobile/Email/ID).');
                return;
            }
            if (!password) {
                setError('Please enter your password.');
                return;
            }
        } else {
            // BUYER REGISTRATION VALIDATION
            if (!name.trim()) {
                setError('Full Name is required.');
                return;
            }
            if (!validateMobile(mobile.trim())) {
                setError('Please enter a valid 10-digit mobile number.');
                return;
            }
            if (password.length < 6) {
                setError('Password must be at least 6 characters long.');
                return;
            }
        }

        setIsLoading(true);

        try {
            let response;
            if (isLogin) {
                if (userType === 0) {
                    // Seller Login: Detect if input is email, unique ID, or mobile
                    const input = mobile.trim();
                    const loginPayload: any = { password };

                    if (input.includes('@')) {
                        loginPayload.email = input;
                    } else if (/^\d{10}$/.test(input)) { // Simple check for mobile number (10 digits)
                        loginPayload.mobile = input;
                    } else {
                        loginPayload.uniqueId = input;
                    }
                    console.log('Seller Login Payload:', loginPayload);
                    response = await AuthService.loginSeller(loginPayload);
                } else if (userType === 2) {
                    // Admin Login
                    response = await AuthService.loginAdmin({ email: mobile.trim(), password });
                } else {
                    response = await AuthService.loginBuyer({ mobile: mobile.trim(), password });
                }
            } else {
                response = await AuthService.registerBuyer({ username: name.trim(), mobile: mobile.trim(), password });
            }

            const { token, username, role, _id } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('userRole', role);
            localStorage.setItem('userName', username);
            if (_id) localStorage.setItem('userId', _id);

            toast.success(`Welcome, ${username}!`);

            // Explicit routing for admin
            if (role === 'Admin') {
                navigate('/admin');
            } else if (role === 'Seller') {
                navigate('/seller/profile');
            } else {
                navigate('/freelance');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Authentication failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSellerSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // --- SELLER REGISTRATION VALIDATION ---
        if (!sellerData.fullName.trim()) {
            setError('Full Name is required.');
            return;
        }
        if (!validateEmail(sellerData.email)) {
            setError('Please enter a valid email address.');
            return;
        }
        if (!validateMobile(sellerData.phoneNumber)) {
            setError('Please enter a valid 10-digit phone number.');
            return;
        }
        if (sellerData.password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }
        if (!sellerData.businessName.trim()) {
            setError('Business Name is required.');
            return;
        }
        if (!sellerData.businessAddress.trim()) {
            setError('Business Address is required.');
            return;
        }
        if (!validateTaxId(sellerData.taxId)) {
            setError('Please enter a valid Tax ID / PAN (min 10 characters).');
            return;
        }

        setIsLoading(true);

        try {
            const response = await AuthService.registerSeller({
                username: sellerData.fullName,
                mobile: sellerData.phoneNumber,
                email: sellerData.email,
                password: sellerData.password,
                businessDetails: {
                    name: sellerData.businessName,
                    address: sellerData.businessAddress,
                    taxId: sellerData.taxId
                }
            });

            console.log('Seller Registration Response:', response.data);

            // Use Unique ID returned from backend (handle both cases if structure varies)
            // It should be 'uniqueId' per backend, but let's be safe
            const generatedId = response.data.uniqueId || response.data._id; // Fallback to _id if uniqueId is missing

            console.log('Generated ID for display:', generatedId);

            const generatedPass = sellerData.password;

            if (!generatedId) {
                console.error("Unique ID missing from response:", response.data);
                toast.error("Account created, but Unique ID not received. Please login with Email/Mobile.");
            }

            setRegistrationSuccess({ id: generatedId || "CHECK EMAIL", pass: generatedPass });
            // toast.success("Seller registration successful! Credentials generated.");
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    // Render Selection Step
    if (authStep === 'SELECT') {
        return (
            <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
                <Navbar />
                <Container maxWidth="md" sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', py: 8 }}>
                    <Typography variant="h4" align="center" sx={{ fontWeight: 900, mb: 1, color: '#0f172a' }}>
                        Join ATOZ.IN community <Box component="span" onClick={() => {
                            setUserType(2);
                            setAuthStep('USER_AUTH');
                            setIsLogin(true);
                        }} sx={{ cursor: 'pointer', display: 'inline-block', '&:hover': { transform: 'scale(1.2)' }, transition: '0.2s' }}>👋</Box>
                    </Typography>
                    <Typography variant="body1" align="center" sx={{ color: '#64748b', mb: 8 }}>
                        Select how you want to use the platform to get started
                    </Typography>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} justifyContent="center" alignItems="stretch">
                        {/* USER Choice */}
                        <Paper
                            onClick={() => setUserType(1)}
                            elevation={0}
                            sx={{
                                flex: 1,
                                p: 5,
                                borderRadius: 6,
                                cursor: 'pointer',
                                border: '2px solid',
                                borderColor: userType === 1 ? '#B4D5DC' : 'transparent',
                                bgcolor: 'white',
                                transition: 'all 0.3s ease',
                                position: 'relative',
                                '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }
                            }}
                        >
                            {userType === 1 && <CheckCircleIcon sx={{ position: 'absolute', top: 20, right: 20, color: '#B4D5DC' }} />}
                            <Stack alignItems="center" spacing={3}>
                                <Box sx={{ width: 80, height: 80, bgcolor: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <PersonOutlineIcon sx={{ fontSize: 40, color: '#0f172a' }} />
                                </Box>
                                <Box textAlign="center">
                                    <Typography variant="h6" sx={{ fontWeight: 900, mb: 1, textTransform: 'uppercase', letterSpacing: 1 }}>User</Typography>
                                    <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.6 }}>
                                        Shop curated collections and manage your personal orders.
                                    </Typography>
                                </Box>
                                {userType === 1 && (
                                    <Box sx={{ display: 'flex', alignItems: 'center', color: '#B4D5DC', fontWeight: 900 }}>
                                        <Typography variant="caption" sx={{ fontWeight: 900, textTransform: 'uppercase' }}>SELECTED</Typography>
                                        <CheckCircleIcon sx={{ fontSize: 16, ml: 0.5 }} />
                                    </Box>
                                )}
                            </Stack>
                        </Paper>

                        {/* SELLER Choice */}
                        <Paper
                            onClick={() => setUserType(0)}
                            elevation={0}
                            sx={{
                                flex: 1,
                                p: 5,
                                borderRadius: 6,
                                cursor: 'pointer',
                                border: '2px solid',
                                borderColor: userType === 0 ? '#B4D5DC' : 'transparent',
                                bgcolor: 'white',
                                transition: 'all 0.3s ease',
                                position: 'relative',
                                '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }
                            }}
                        >
                            {userType === 0 && <CheckCircleIcon sx={{ position: 'absolute', top: 20, right: 20, color: '#B4D5DC' }} />}
                            <Stack alignItems="center" spacing={3}>
                                <Box sx={{ width: 80, height: 80, bgcolor: '#e0f2f1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <StorefrontIcon sx={{ fontSize: 40, color: '#00695c' }} />
                                </Box>
                                <Box textAlign="center">
                                    <Typography variant="h6" sx={{ fontWeight: 900, mb: 1, textTransform: 'uppercase', letterSpacing: 1 }}>Seller</Typography>
                                    <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.6 }}>
                                        Grow your brand and manage global inventory seamlessly.
                                    </Typography>
                                </Box>
                                {userType === 0 && (
                                    <Box sx={{ display: 'flex', alignItems: 'center', color: '#B4D5DC', fontWeight: 900 }}>
                                        <Typography variant="caption" sx={{ fontWeight: 900, textTransform: 'uppercase' }}>SELECTED</Typography>
                                        <CheckCircleIcon sx={{ fontSize: 16, ml: 0.5 }} />
                                    </Box>
                                )}
                            </Stack>
                        </Paper>
                    </Stack>

                    <Button
                        variant="contained"
                        fullWidth
                        onClick={() => {
                            if (userType === 0) {
                                // For seller, if they click continue, we show reg form
                                setAuthStep('SELLER_REG');
                                setIsLogin(false);
                            } else {
                                setAuthStep('USER_AUTH');
                            }
                        }}
                        sx={{
                            mt: 8,
                            py: 2,
                            bgcolor: '#0f172a',
                            color: 'white',
                            fontWeight: 900,
                            borderRadius: 4,
                            '&:hover': { bgcolor: '#1e293b' }
                        }}
                    >
                        Continue to {userType === 1 ? 'Login / Register' : 'Seller Registration'}
                    </Button>

                    {userType === 0 && (
                        <Typography
                            variant="body2"
                            align="center"
                            onClick={() => {
                                setAuthStep('USER_AUTH');
                                setIsLogin(true);
                            }}
                            sx={{ mt: 3, color: '#64748b', cursor: 'pointer', fontWeight: 700, '&:hover': { color: '#0f172a' } }}
                        >
                            Already a seller? Login with Unique ID
                        </Typography>
                    )}
                </Container>
            </Box>
        );
    }

    // Render User Auth Step (Split Layout)
    if (authStep === 'USER_AUTH') {
        return (
            <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Navbar />
                <Box sx={{ flex: 1, display: 'flex' }}>
                    {/* Left: Branding Image */}
                    <Box sx={{
                        flex: 1.2,
                        display: { xs: 'none', lg: 'block' },
                        position: 'relative',
                        backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}>
                        <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.4)', p: 8, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                            <Box sx={{ width: 40, height: 4, bgcolor: 'white', mb: 4 }} />
                            <Typography variant="h2" sx={{ color: 'white', fontWeight: 900, mb: 2, lineHeight: 1.1 }}>
                                Welcome Back to <br /> the Community.
                            </Typography>
                            <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.8)', mb: 4, fontWeight: 500, maxWidth: 460 }}>
                                Connect, collaborate, and create with professionals around the globe.
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'grey.400' }}>
                                © {new Date().getFullYear()} ATOZ.IN • Privacy Policy
                            </Typography>
                        </Box>
                    </Box>

                    {/* Right: Auth Form */}
                    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4, bgcolor: 'white' }}>
                        <Box sx={{ width: '100%', maxWidth: 440 }}>
                            <Button
                                onClick={() => setAuthStep('SELECT')}
                                sx={{ mb: 4, color: '#64748b', fontWeight: 700, textTransform: 'none' }}
                                startIcon={<span>←</span>}
                            >
                                Back to selection
                            </Button>

                            <Typography variant="h4" sx={{ fontWeight: 900, mb: 1, color: '#0f172a' }}>
                                {isLogin ? 'Login' : 'Create Account'}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#64748b', mb: 6 }}>
                                {isLogin ? 'Please enter your details to access your account.' : 'Join thousands of users in our community.'}
                            </Typography>

                            {error && <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>{error}</Alert>}

                            <Stack spacing={3} component="form" onSubmit={handleAuth}>
                                {!isLogin && (
                                    <Box>
                                        <Typography variant="caption" sx={{ fontWeight: 800, color: '#64748b', mb: 1, display: 'block' }}>FULL NAME</Typography>
                                        <TextField
                                            fullWidth variant="standard"
                                            placeholder="Enter your name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            InputProps={{ disableUnderline: true, sx: { py: 1, borderBottom: '1px solid #e2e8f0' } }}
                                        />
                                    </Box>
                                )}
                                <Box>
                                    <Typography variant="caption" sx={{ fontWeight: 800, color: '#64748b', mb: 1, display: 'block' }}>
                                        {userType === 0 ? 'SELLER LOGIN (Unique ID / Email / Mobile)' : userType === 2 ? 'ADMIN ID' : 'MOBILE NUMBER'}
                                    </Typography>
                                    <TextField
                                        fullWidth variant="standard"
                                        placeholder={userType === 0 ? "Unique ID, Email or Mobile" : userType === 2 ? "Enter Admin Email" : "Enter your mobile"}
                                        value={mobile}
                                        onChange={(e) => setMobile(e.target.value)}
                                        InputProps={{ disableUnderline: true, sx: { py: 1, borderBottom: '1px solid #e2e8f0' } }}
                                    />
                                </Box>
                                <Box>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography variant="caption" sx={{ fontWeight: 800, color: '#64748b', mb: 1, display: 'block' }}>PASSWORD</Typography>
                                        {isLogin && <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700, cursor: 'pointer' }}>Forgot Password?</Typography>}
                                    </Stack>
                                    <TextField
                                        fullWidth variant="standard"
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        InputProps={{ disableUnderline: true, sx: { py: 1, borderBottom: '1px solid #e2e8f0' } }}
                                    />
                                </Box>

                                <Button
                                    fullWidth
                                    variant="contained"
                                    type="submit"
                                    disabled={isLoading}
                                    sx={{
                                        py: 2, mt: 2, bgcolor: '#B4D5DC', color: '#0f172a',
                                        fontWeight: 900, borderRadius: 3, boxShadow: 'none',
                                        '&:hover': { bgcolor: '#9bbec9', boxShadow: 'none' }
                                    }}
                                >
                                    {isLoading ? <CircularProgress size={24} color="inherit" /> : (isLogin ? 'Login' : 'Create Account')}
                                </Button>

                                {userType !== 2 && (
                                    <>
                                        <Divider sx={{ my: 2 }}><Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700 }}>OR CONTINUE WITH</Typography></Divider>

                                        <GoogleAuthButton />
                                    </>
                                )}

                                <Typography variant="body2" sx={{ textAlign: 'center', mt: 4, color: '#64748b' }}>
                                    {isLogin ? "Don't have an account?" : "Already have an account?"} <Box component="span" onClick={() => setIsLogin(!isLogin)} sx={{ color: '#0f172a', fontWeight: 900, cursor: 'pointer' }}>{isLogin ? 'Sign up for free' : 'Login instead'}</Box>
                                </Typography>
                            </Stack>
                        </Box>
                    </Box>
                </Box>
            </Box>
        );
    }

    // Render Success Screen for Seller
    if (registrationSuccess) {
        return (
            <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
                <Navbar />
                <Container maxWidth="sm" sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', py: 8 }}>
                    <Paper elevation={0} sx={{ p: 6, borderRadius: 8, border: '1px solid #adc9d1', textAlign: 'center', width: '100%' }}>
                        <Box sx={{ width: 80, height: 80, bgcolor: '#ecfdf5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 4 }}>
                            <CheckCircleIcon sx={{ fontSize: 40, color: '#10b981' }} />
                        </Box>
                        <Typography variant="h4" sx={{ fontWeight: 900, mb: 2, color: '#0f172a' }}>Registration Successful!</Typography>
                        <Typography variant="body1" sx={{ color: '#64748b', mb: 6 }}>
                            Your seller account has been created. A copy of these credentials has been sent to <strong>{sellerData.email}</strong>.
                        </Typography>

                        <Stack spacing={3} sx={{ mb: 6 }}>
                            <Box sx={{ p: 3, bgcolor: '#f8fafc', borderRadius: 4, border: '1px dashed #adc9d1' }}>
                                <Typography variant="caption" sx={{ fontWeight: 800, color: '#64748b', display: 'block', mb: 1 }}>YOUR UNIQUE SELLER ID</Typography>
                                <Typography variant="h5" sx={{ fontWeight: 900, color: '#0f172a', letterSpacing: 2 }}>{registrationSuccess.id}</Typography>
                            </Box>
                            <Box sx={{ p: 3, bgcolor: '#f8fafc', borderRadius: 4, border: '1px dashed #adc9d1' }}>
                                <Typography variant="caption" sx={{ fontWeight: 800, color: '#64748b', display: 'block', mb: 1 }}>YOUR PASSWORD</Typography>
                                <Typography variant="h5" sx={{ fontWeight: 900, color: '#0f172a', letterSpacing: 2 }}>{registrationSuccess.pass}</Typography>
                            </Box>
                        </Stack>

                        <Button
                            fullWidth
                            variant="contained"
                            onClick={() => {
                                setAuthStep('USER_AUTH');
                                setIsLogin(true);
                                setMobile(registrationSuccess.id); // Autofill with Unique ID
                                setRegistrationSuccess(null);
                            }}
                            sx={{ py: 2, bgcolor: '#0f172a', color: 'white', fontWeight: 900, borderRadius: 4 }}
                        >
                            Proceed to Login
                        </Button>
                    </Paper>
                </Container>
            </Box>
        );
    }

    // Render Seller Registration (Detailed Form)
    return (
        <Fade in={true}>
            <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
                <Navbar />
                <Container maxWidth="md" sx={{ py: 10 }}>
                    <Button
                        onClick={() => setAuthStep('SELECT')}
                        sx={{ mb: 4, color: '#64748b', fontWeight: 700, textTransform: 'none' }}
                        startIcon={<span>←</span>}
                    >
                        Back to selection
                    </Button>
                    <Box sx={{ mb: 6, textAlign: 'center' }}>
                        <Typography variant="h4" sx={{ fontWeight: 900, mb: 1, color: '#0f172a' }}>Become a Verified Seller</Typography>
                        <Typography variant="body1" sx={{ color: '#64748b' }}>Join thousands of merchants growing their business on our multi-channel platform.</Typography>
                    </Box>

                    <Paper elevation={0} sx={{ p: 6, borderRadius: 6, border: '1px solid #f1f5f9' }}>
                        <Stack spacing={6} component="form" onSubmit={handleSellerSubmit}>
                            {/* Section 1: Personal Information */}
                            <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 900, mb: 3, pb: 1, borderBottom: '1.5px solid #adc9d1', display: 'inline-block' }}>Personal Information</Typography>
                                <Grid container spacing={3}>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Typography variant="caption" sx={{ fontWeight: 800, color: '#64748b', mb: 1, display: 'block' }}>FULL NAME *</Typography>
                                        <TextField fullWidth placeholder="John Doe" variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} value={sellerData.fullName} onChange={(e) => setSellerData({ ...sellerData, fullName: e.target.value })} />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Typography variant="caption" sx={{ fontWeight: 800, color: '#64748b', mb: 1, display: 'block' }}>EMAIL ADDRESS *</Typography>
                                        <TextField fullWidth placeholder="john@example.com" variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} value={sellerData.email} onChange={(e) => setSellerData({ ...sellerData, email: e.target.value })} />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Typography variant="caption" sx={{ fontWeight: 800, color: '#64748b', mb: 1, display: 'block' }}>PHONE NUMBER *</Typography>
                                        <TextField fullWidth placeholder="+1 123 456 7890" variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} value={sellerData.phoneNumber} onChange={(e) => setSellerData({ ...sellerData, phoneNumber: e.target.value })} />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Typography variant="caption" sx={{ fontWeight: 800, color: '#64748b', mb: 1, display: 'block' }}>PASSWORD *</Typography>
                                        <TextField fullWidth type="password" placeholder="••••••••" variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} value={sellerData.password} onChange={(e) => setSellerData({ ...sellerData, password: e.target.value })} />
                                    </Grid>
                                </Grid>
                            </Box>

                            {/* Section 2: Business Details */}
                            <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 900, mb: 3, pb: 1, borderBottom: '1.5px solid #adc9d1', display: 'inline-block' }}>Business Details</Typography>
                                <Grid container spacing={3}>
                                    <Grid size={{ xs: 12 }}>
                                        <Typography variant="caption" sx={{ fontWeight: 800, color: '#64748b', mb: 1, display: 'block' }}>REGISTERED BUSINESS NAME *</Typography>
                                        <TextField fullWidth placeholder="Acme Corporation LLC" variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} value={sellerData.businessName} onChange={(e) => setSellerData({ ...sellerData, businessName: e.target.value })} />
                                    </Grid>
                                    <Grid size={{ xs: 12 }}>
                                        <Typography variant="caption" sx={{ fontWeight: 800, color: '#64748b', mb: 1, display: 'block' }}>BUSINESS ADDRESS *</Typography>
                                        <TextField fullWidth multiline rows={2} placeholder="Street, City, State, ZIP" variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} value={sellerData.businessAddress} onChange={(e) => setSellerData({ ...sellerData, businessAddress: e.target.value })} />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Typography variant="caption" sx={{ fontWeight: 800, color: '#64748b', mb: 1, display: 'block' }}>GST / TAX IDENTIFICATION NUMBER *</Typography>
                                        <TextField fullWidth placeholder="GSTIN-123456789" variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} value={sellerData.taxId} onChange={(e) => setSellerData({ ...sellerData, taxId: e.target.value })} />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Typography variant="caption" sx={{ fontWeight: 800, color: '#64748b', mb: 1, display: 'block' }}>WEBSITE URL (OPTIONAL)</Typography>
                                        <TextField fullWidth placeholder="https://www.yourstore.com" variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} value={sellerData.websiteUrl} onChange={(e) => setSellerData({ ...sellerData, websiteUrl: e.target.value })} />
                                    </Grid>
                                </Grid>
                            </Box>

                            <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 900, mb: 3, pb: 1, borderBottom: '1.5px solid #adc9d1', display: 'inline-block' }}>Verification</Typography>
                                <Grid container spacing={3}>
                                    <Grid size={{ xs: 12 }}>
                                        <Paper variant="outlined" sx={{ p: 4, borderRadius: 3, textAlign: 'center', borderStyle: 'dashed' }}>
                                            <CloudUploadIcon sx={{ color: '#adc9d1', mb: 2, fontSize: 32 }} />
                                            <Typography variant="body2" fontWeight="bold">PAN Card / Tax ID</Typography>
                                            <Typography variant="caption" color="textSecondary">PDF, JPG, PNG (Max 5MB)</Typography>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Box>



                            {error && <Alert severity="error">{error}</Alert>}

                            <FormControlLabel
                                control={<Checkbox defaultChecked sx={{ color: '#B4D5DC', '&.Mui-checked': { color: '#B4D5DC' } }} />}
                                label={<Typography variant="caption" color="textSecondary">I hereby certify that the information provided above is true and accurate. I agree to the <Box component="span" sx={{ color: '#0f172a', fontWeight: 900 }}>Seller Agreement</Box> and <Box component="span" sx={{ color: '#0f172a', fontWeight: 900 }}>Privacy Policy</Box>.</Typography>}
                            />

                            <Stack direction="row" spacing={3} sx={{ pt: 4 }}>
                                <Button fullWidth variant="contained" type="submit" disabled={isLoading} sx={{ py: 2, bgcolor: '#B4D5DC', color: '#0f172a', fontWeight: 900, borderRadius: 3, boxShadow: 'none', '&:hover': { bgcolor: '#9bbec9' } }}>
                                    {isLoading ? <CircularProgress size={24} color="inherit" /> : 'SUBMIT FOR VERIFICATION'}
                                </Button>
                                <Button fullWidth variant="outlined" sx={{ py: 2, color: '#64748b', borderColor: '#e2e8f0', fontWeight: 900, borderRadius: 3 }}>SAVE AS DRAFT</Button>
                            </Stack>

                            <Typography
                                variant="body2"
                                align="center"
                                onClick={() => {
                                    setAuthStep('USER_AUTH');
                                    setIsLogin(true);
                                }}
                                sx={{ mt: 3, color: '#64748b', cursor: 'pointer', fontWeight: 700, '&:hover': { color: '#0f172a' } }}
                            >
                                Already registered? <Box component="span" sx={{ color: '#0f172a', fontWeight: 900 }}>Login instead</Box>
                            </Typography>
                        </Stack>
                    </Paper>

                    <Stack direction="row" justifyContent="center" spacing={6} sx={{ mt: 8, color: '#64748b' }}>
                        <Stack direction="row" alignItems="center" spacing={1}><CheckCircleIcon sx={{ fontSize: 16 }} /><Typography variant="caption" fontWeight="bold">Enterprise Security</Typography></Stack>
                        <Stack direction="row" alignItems="center" spacing={1}><CheckCircleIcon sx={{ fontSize: 16 }} /><Typography variant="caption" fontWeight="bold">Quick Approval</Typography></Stack>
                        <Stack direction="row" alignItems="center" spacing={1}><CheckCircleIcon sx={{ fontSize: 16 }} /><Typography variant="caption" fontWeight="bold">24/7 Seller Support</Typography></Stack>
                    </Stack>
                </Container>
            </Box>
        </Fade>
    );
};

export default Login;