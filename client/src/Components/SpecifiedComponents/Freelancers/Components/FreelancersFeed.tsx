// Forces refresh
import { Box, Typography, Paper, Stack, Button, IconButton } from '@mui/material';
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
    date?: string;
    currency: string;
    unit?: string;
    nameDisplay?: string;
    category?: string;
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
                            {/* Name (Buyer) and Category */}
                            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                                <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, display: 'block', mb: 0.5 }}>
                                    {item.nameDisplay || 'Anonymous Buyer'}
                                </Typography>
                                {item.category && (
                                    <Box sx={{ bgcolor: '#f1f5f9', px: 1, py: 0.5, borderRadius: 1 }}>
                                        <Typography variant="caption" sx={{ color: '#475569', fontWeight: 600 }}>
                                            {item.category}
                                        </Typography>
                                    </Box>
                                )}
                            </Stack>

                            {/* Product Name (Title) */}
                            <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.1rem', color: '#0f172a', mb: 0.5 }}>
                                {item.title}
                            </Typography>

                            {/* Product Details / Description */}
                            <Typography variant="body2" sx={{ color: '#475569', fontSize: '0.9rem', mb: 1, lineHeight: 1.5 }}>
                                {item.description}
                            </Typography>

                            {/* Date */}
                            <Typography variant="body2" sx={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 500 }}>
                                {item.date || item.time}
                            </Typography>
                        </Box>

                        {/* Right Side - Removed Price, Kept Action */}
                        <Box sx={{ textAlign: 'right', minWidth: 80 }}>
                            <Button
                                variant="contained"
                                size="small"
                                sx={{
                                    bgcolor: '#0f172a',
                                    color: 'white',
                                    textTransform: 'none',
                                    fontWeight: 700,
                                    fontSize: '0.8rem',
                                    borderRadius: 2,
                                    px: 2,
                                    py: 0.8,
                                    boxShadow: 'none',
                                    '&:hover': { bgcolor: '#334155', boxShadow: 'none' }
                                }}
                            >
                                Interested
                            </Button>
                        </Box>
                    </Paper>
                ))}
            </Stack>
        </Box>
    );
};

export default FreelancersFeed;
