
import { Box, Typography, Stack, Paper } from '@mui/material';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import ChairIcon from '@mui/icons-material/Chair';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import WeekendIcon from '@mui/icons-material/Weekend';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const categories = [
    { title: 'Tech', icon: <SmartphoneIcon /> },
    { title: 'Fashion', icon: <CheckroomIcon /> },
    { title: 'Home Office', icon: <ChairIcon /> },
    { title: 'Gaming', icon: <SportsEsportsIcon /> },
    { title: 'Furniture', icon: <WeekendIcon /> },
    { title: 'Collectibles', icon: <AutoStoriesIcon /> },
    { title: 'Sporting', icon: <FitnessCenterIcon /> },
];

const SHCategories = () => {
    return (
        <Box sx={{ mb: 4 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box component="span" sx={{ color: '#bef264', fontSize: '1.5em', lineHeight: 0 }}>▲</Box> Top Categories
                </Typography>
                <Typography variant="button" sx={{ textTransform: 'none', fontWeight: 700, color: 'text.secondary', cursor: 'pointer' }}>
                    View All
                </Typography>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', pb: 1 }}>
                {categories.map((cat, index) => (
                    <Stack key={index} alignItems="center" spacing={1} sx={{ minWidth: 80, cursor: 'pointer' }}>
                        <Paper
                            elevation={0}
                            sx={{
                                width: 64,
                                height: 64,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 3,
                                border: '1px solid #e2e8f0',
                                color: '#334155',
                                transition: 'all 0.2s',
                                '&:hover': {
                                    borderColor: '#0f172a',
                                    color: '#0f172a',
                                    transform: 'translateY(-2px)'
                                }
                            }}
                        >
                            {cat.icon}
                        </Paper>
                        <Typography variant="caption" sx={{ fontWeight: 600, color: '#475569' }}>
                            {cat.title}
                        </Typography>
                    </Stack>
                ))}
            </Stack>
        </Box>
    );
};

export default SHCategories;
