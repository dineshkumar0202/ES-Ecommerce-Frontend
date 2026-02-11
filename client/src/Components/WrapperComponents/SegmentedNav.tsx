import { Box, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const SegmentedNav = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const sections = [
        { name: 'Retail', path: '/retail' },
        { name: 'Wholesale', path: '/wholesale' },
        { name: 'Q-Commerce', path: '/quick' },
        { name: 'Resale', path: '/resale' },
        { name: 'Freelancer', path: '/freelance' }
    ];

    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            py: 2,
            px: { xs: 2, md: 0 },
            position: 'sticky',
            top: 0,
            bgcolor: 'rgba(248, 250, 252, 0.8)',
            backdropFilter: 'blur(10px)',
            zIndex: 1100
        }}>
            <Box sx={{
                bgcolor: 'white',
                borderRadius: '100px',
                p: 0.5,
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 0.25, sm: 0.5 },
                border: '1px solid #f1f5f9',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                maxWidth: 'fit-content',
                overflowX: 'auto',
                '&::-webkit-scrollbar': { display: 'none' }
            }}>
                {sections.map((section) => {
                    const isActive = location.pathname === section.path ||
                        (section.path === '/profile' && location.pathname.startsWith('/profile'));

                    return (
                        <Button
                            key={section.name}
                            onClick={() => navigate(section.path)}
                            sx={{
                                borderRadius: '100px',
                                px: { xs: 1.5, sm: 2.5 },
                                py: { xs: 0.5, sm: 1 },
                                minWidth: 'auto',
                                textTransform: 'none',
                                bgcolor: isActive ? 'black' : 'transparent',
                                color: isActive ? 'white' : '#64748b',
                                fontWeight: isActive ? 800 : 700,
                                fontSize: { xs: '0.65rem', sm: '0.75rem' },
                                letterSpacing: 0.5,
                                '&:hover': {
                                    bgcolor: isActive ? 'black' : '#f8fafc',
                                    color: isActive ? 'white' : 'black',
                                }
                            }}
                        >
                            {section.name}
                        </Button>
                    );
                })}
            </Box>
        </Box>
    );
};

export default SegmentedNav;
