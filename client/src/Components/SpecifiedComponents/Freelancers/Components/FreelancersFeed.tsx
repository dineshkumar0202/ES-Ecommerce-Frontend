// Forces refresh
import { Box, Typography, Paper, Stack, Button, IconButton } from '@mui/material';
import Chip from '@mui/material/Chip';
import PsychologyIcon from '@mui/icons-material/Psychology';
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
    contact?: string;
    email?: string;
    location?: string;
}

interface FreelancersFeedProps {
    posts: Post[];
    onInterestClick?: (postId: string | number) => void;
    showInterestButton?: boolean;
    showContactInfo?: boolean;
}

const FreelancersFeed = ({ posts, onInterestClick, showInterestButton = true, showContactInfo = false }: FreelancersFeedProps) => {
    const filterDescription = (text: string) => {
        if (showContactInfo) return text;
        // Mask phone numbers (8-12 digits) and "Contact: [numbers]" and emails
        return text
            .replace(/Contact:\s*[\d\s-]{8,}/gi, 'Contact: [Protected]')
            .replace(/[\d\s-]{8,15}/g, (match) => match.trim().length >= 8 ? ' [Contact Locked] ' : match)
            .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[Email Protected]');
    };

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
                            p: { xs: 2.5, sm: 2 },
                            borderRadius: 4,
                            bgcolor: 'white',
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: { xs: 'stretch', sm: 'flex-start' },
                            gap: 3,
                            border: '1px solid #e2e8f0',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            '&:hover': {
                                boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
                                borderColor: 'transparent',
                                transform: 'translateY(-4px)'
                            }
                        }}
                    >
                        {/* Image - Slightly larger for 'Product Image' emphasis */}
                        <Box
                            component="img"
                            src={item.image}
                            alt={item.title}
                            sx={{
                                width: { xs: '100%', sm: 100 },
                                height: { xs: 200, sm: 100 },
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
                                {filterDescription(item.description)}
                            </Typography>

                            {/* Additional Info (Only for Authorized) */}
                            {showContactInfo && (
                                <Stack spacing={0.5} sx={{ mb: 1.5, p: 1.5, bgcolor: '#f8fafc', borderRadius: 2 }}>
                                    {item.location && <Typography variant="caption" sx={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: 1 }}>📍 {item.location}</Typography>}
                                    {item.contact && <Typography variant="caption" sx={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: 1 }}>📞 {item.contact}</Typography>}
                                    {item.email && <Typography variant="caption" sx={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: 1 }}>✉️ {item.email}</Typography>}
                                </Stack>
                            )}

                            {/* Date */}
                            <Typography variant="body2" sx={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 500 }}>
                                {item.date || item.time}
                            </Typography>
                        </Box>

                        {/* Right Side - Status and Action */}
                        <Box sx={{
                            textAlign: { xs: 'left', sm: 'right' },
                            minWidth: { xs: '100%', sm: 180 },
                            display: 'flex',
                            flexDirection: { xs: 'row', sm: 'column' },
                            gap: 1.5,
                            alignItems: 'center',
                            justifyContent: { xs: 'space-between', sm: 'flex-start' },
                            mt: { xs: 1, sm: 0 }
                        }}>
                            <Chip
                                label={item.status === 'APPROVED' ? 'Approved' : item.status === 'REJECTED' ? 'Rejected' : 'Pending'}
                                sx={{
                                    bgcolor: item.status === 'APPROVED' ? '#dcfce7' : item.status === 'REJECTED' ? '#fee2e2' : '#f1f5f9',
                                    color: item.status === 'APPROVED' ? '#166534' : item.status === 'REJECTED' ? '#991b1b' : '#64748b',
                                    fontWeight: 700,
                                    borderRadius: 1.5,
                                    px: 1,
                                    height: 24,
                                    fontSize: '0.65rem'
                                }}
                            />
                            <Box sx={{ position: 'relative' }}>
                                {showInterestButton && (
                                    <Button
                                        variant="contained"
                                        size="medium"
                                        startIcon={<PsychologyIcon sx={{ fontSize: '1.2rem !important' }} />}
                                        onClick={() => onInterestClick?.(item.id)}
                                        sx={{
                                            background: 'linear-gradient(135deg, #0f172a 0%, #172554 100%) !important',
                                            color: '#ffffff !important',
                                            fontWeight: 700,
                                            borderRadius: '8px !important',
                                            textTransform: 'none',
                                            px: 3,
                                            py: 1,
                                            fontSize: '0.9rem',
                                            width: { xs: '100%', sm: 'auto' },
                                            minWidth: 140,
                                            flexShrink: 0,
                                            border: '1px solid rgba(255,255,255,0.1) !important',
                                            boxShadow: '0 4px 12px rgba(15, 23, 42, 0.2)',
                                            '&:hover': {
                                                background: 'linear-gradient(135deg, #1e293b 0%, #1e3a8a 100%) !important',
                                                transform: 'translateY(-2px)',
                                                boxShadow: '0 8px 20px rgba(15, 23, 42, 0.3)',
                                            },
                                            transition: 'all 0.2s ease',
                                            opacity: '1 !important',
                                            visibility: 'visible !important',
                                            zIndex: 999
                                        }}
                                    >
                                        Interested
                                    </Button>
                                )}
                            </Box>
                        </Box>
                    </Paper>
                ))}
            </Stack>
        </Box>
    );
};

export default FreelancersFeed;
