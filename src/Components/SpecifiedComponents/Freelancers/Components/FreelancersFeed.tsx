// Forces refresh
import { Box, Typography, Paper, Chip, Stack, Button, IconButton } from '@mui/material';
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
                            p: 2,
                            borderRadius: 4,
                            bgcolor: 'white',
                            display: 'flex',
                            alignItems: 'flex-start', // Align start to handle description height
                            gap: 3,
                            border: '1px solid #e2e8f0',
                            transition: 'all 0.2s',
                            '&:hover': { boxShadow: '0 8px 25px rgba(0,0,0,0.05)', borderColor: 'transparent', transform: 'translateY(-2px)' }
                        }}
                    >
                        {/* Image - Slightly larger for 'Product Image' emphasis */}
                        <Box
                            component="img"
                            src={item.image}
                            alt={item.title}
                            sx={{
                                width: 100, // Increased size
                                height: 100,
                                borderRadius: 3,
                                objectFit: 'cover',
                                bgcolor: '#f1f5f9'
                            }}
                        />

                        {/* Middle Content - Product Details */}
                        <Box sx={{ flexGrow: 1 }}>
                            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                                <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1rem', color: '#0f172a' }}>
                                    {item.title}
                                </Typography>
                                <Chip
                                    label={item.status === 'ACTIVE' ? 'CONFIRMED' : item.status}
                                    size="small"
                                    sx={{
                                        height: 20,
                                        fontSize: '0.65rem',
                                        fontWeight: 800,
                                        borderRadius: 1,
                                        bgcolor: item.status === 'ACTIVE' || item.status === 'CONFIRMED' || item.status === 'NEW' ? '#bef264' : (item.status === 'PENDING' ? '#f1f5f9' : '#fee2e2'),
                                        color: item.status === 'ACTIVE' || item.status === 'CONFIRMED' || item.status === 'NEW' ? '#1a2e05' : (item.status === 'PENDING' ? '#64748b' : '#991b1b')
                                    }}
                                />
                            </Stack>
                            
                            {/* Product Details / Description */}
                            <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.85rem', mb: 1, lineHeight: 1.5 }}>
                                {item.description}
                            </Typography>

                            <Typography variant="body2" sx={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 600 }}>
                                Posted {item.time} • {item.nameDisplay || 'Service'}
                            </Typography>
                        </Box>

                        {/* Right Side - Removed Price, Kept Action */}
                        <Box sx={{ textAlign: 'right', minWidth: 80 }}>
                            <Typography 
                                variant="caption" 
                                sx={{ 
                                    color: '#94a3b8', 
                                    fontSize: '0.7rem', 
                                    fontWeight: 700, 
                                    textDecoration: 'underline', 
                                    cursor: 'pointer',
                                    display: 'block',
                                    mt: 0.5,
                                    '&:hover': { color: '#64748b' }
                                }}
                            >
                                EDIT POST
                            </Typography>
                        </Box>
                    </Paper>
                ))}
            </Stack>
        </Box>
    );
};

export default FreelancersFeed;
