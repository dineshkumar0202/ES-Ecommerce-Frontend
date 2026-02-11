import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { toast } from 'react-toastify';

const AuthSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get('token');
        const role = searchParams.get('role');
        const name = searchParams.get('name');

        if (token && role) {
            // Store token and user info
            localStorage.setItem('token', token);
            localStorage.setItem('userRole', role);

            // Show success message
            toast.success(`Welcome back, ${name || 'User'}! 🎉`);

            // Redirect based on role
            setTimeout(() => {
                if (role === 'Seller') {
                    navigate('/seller/profile');
                } else if (role === 'Admin') {
                    navigate('/admin');
                } else {
                    navigate('/retail');
                }
            }, 1500);
        } else {
            // Handle error
            const error = searchParams.get('error');
            toast.error(`Authentication failed: ${error || 'Unknown error'}`);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        }
    }, [searchParams, navigate]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                bgcolor: '#f8f9fa'
            }}
        >
            <CircularProgress size={60} sx={{ mb: 2, color: '#1976d2' }} />
            <Typography variant="h6" sx={{ color: '#64748b', fontWeight: 600 }}>
                Logging you in...
            </Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8', mt: 1 }}>
                Please wait while we set up your account
            </Typography>
        </Box>
    );
};

export default AuthSuccess;
