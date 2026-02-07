// Forces refresh
import { Box, Typography, Paper, Chip, Stack, Button, IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ViewListIcon from '@mui/icons-material/ViewList';
import GridViewIcon from '@mui/icons-material/GridView';

// Interface for the post data
export interface Post {
    id: number | string;
    title: string;
    description: string;
    price: number;
    image: string;
    status: string;
    tagColor: string;
    tagTextColor: string;
    views: string;
    time: string;
    currency: string;
    unit?: string;
    nameDisplay?: string;
}

interface FreelancersFeedProps {
    posts: Post[];
}

const FreelancersFeed = ({ posts }: FreelancersFeedProps) => {
    return (
        <Box>
            {/* Header Controls */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Button
                    endIcon={<KeyboardArrowDownIcon />}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        color: 'black',
                        fontWeight: 700,
                        bgcolor: 'white',
                        py: 1,
                        px: 2,
                        borderRadius: 3,
                        textTransform: 'none',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                    }}
                >
                    All Categories
                </Button>

                <Stack direction="row" spacing={1}>
                    <IconButton size="small" sx={{ bgcolor: '#f1f5f9' }}>
                        <ViewListIcon fontSize="small" sx={{ color: 'black' }} />
                    </IconButton>
                    <IconButton size="small">
                        <GridViewIcon fontSize="small" sx={{ color: '#94a3b8' }} />
                    </IconButton>
                </Stack>
            </Stack>

            {/* List Feed */}
            <Stack spacing={2}>
                {posts.map((item) => (
                    <Paper
                        key={item.id}
                        elevation={0}
                        sx={{
                            p: 2.5,
                            borderRadius: 4,
                            bgcolor: 'white',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 3,
                            transition: 'all 0.2s',
                            '&:hover': { boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }
                        }}
                    >
                        {/* Image */}
                        <Box
                            sx={{
                                width: 100,
                                height: 100,
                                borderRadius: 3,
                                overflow: 'hidden',
                                flexShrink: 0,
                                bgcolor: '#f1f5f9'
                            }}
                        >
                            <Box component="img" src={item.image} alt={item.title} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </Box>

                        {/* Content */}
                        <Box sx={{ flexGrow: 1 }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                                <Box>
                                    <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.1rem' }}>
                                            {item.title}
                                        </Typography>
                                        <Chip
                                            label={item.status}
                                            size="small"
                                            sx={{
                                                bgcolor: item.tagColor,
                                                color: item.tagTextColor,
                                                fontWeight: 800,
                                                fontSize: '0.65rem',
                                                height: 22,
                                                borderRadius: 1
                                            }}
                                        />
                                    </Stack>
                                    <Typography variant="body2" sx={{ color: '#64748b', mb: 2, maxWidth: '90%' }}>
                                        {item.description}
                                    </Typography>

                                    <Stack direction="row" spacing={3} alignItems="center">
                                        <Stack direction="row" spacing={0.5} alignItems="center">
                                            <VisibilityOutlinedIcon sx={{ fontSize: 16, color: '#94a3b8' }} />
                                            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>{item.views}</Typography>
                                        </Stack>
                                        <Stack direction="row" spacing={0.5} alignItems="center">
                                            <AccessTimeOutlinedIcon sx={{ fontSize: 16, color: '#94a3b8' }} />
                                            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>{item.time}</Typography>
                                        </Stack>
                                    </Stack>
                                </Box>

                                {/* Right Side Price & Action */}
                                <Stack alignItems="flex-end" justifyContent="space-between" sx={{ height: '100%', minHeight: 100 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 900 }}>
                                        {item.currency}{item.price.toFixed(2)}
                                    </Typography>
                                    <IconButton size="small" sx={{ color: '#94a3b8' }}>
                                        <MoreHorizIcon />
                                    </IconButton>
                                </Stack>
                            </Stack>
                        </Box>
                    </Paper>
                ))}
            </Stack>
        </Box>
    );
};

export default FreelancersFeed;
