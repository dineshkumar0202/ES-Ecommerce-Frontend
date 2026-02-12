import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const GoogleAuthButton = () => {
    const handleGoogleLogin = () => {
        // Redirect to backend Google OAuth route
        window.location.href = '/api/auth/google';
    };

    return (
        <Button
            variant="outlined"
            fullWidth
            startIcon={<GoogleIcon />}
            onClick={handleGoogleLogin}
            sx={{
                py: 1.5,
                borderColor: '#dadce0',
                color: '#3c4043',
                textTransform: 'none',
                fontSize: '0.875rem',
                fontWeight: 500,
                borderRadius: 2,
                '&:hover': {
                    bgcolor: '#f8f9fa',
                    borderColor: '#dadce0',
                },
            }}
        >
            Continue with Google
        </Button>
    );
};

export default GoogleAuthButton;
