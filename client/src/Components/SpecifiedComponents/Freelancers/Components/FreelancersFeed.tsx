import { Box, Typography, Paper, Stack, Grid, Chip, Link, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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

const FreelancersFeed = ({ posts, showContactInfo = false, showInterestButton = false, onInterestClick }: FreelancersFeedProps) => {

    const filterDescription = (text: string) => {
        if (showContactInfo) return text;
        return text
            .replace(/Contact:\s*[\d\s-]{8,}/gi, 'Contact: [Protected]')
            .replace(/[\d\s-]{8,15}/g, (match) => match.trim().length >= 8 ? ' [Contact Locked] ' : match)
            .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[Email Protected]');
    };

    return (
        <Box>


            {/* 2. FEED HEADER */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4, px: 2 }}>
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 900, color: '#1e293b', mb: 0.5 }}>Active Projects</Typography>
                </Box>

                <Link
                    href="#"
                    underline="none"
                    sx={{
                        color: '#64748b',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        '&:hover': { color: '#0f172a' }
                    }}
                >
                    View all <ArrowForwardIcon sx={{ fontSize: 14 }} />
                </Link>
            </Stack>

            {/* 3. GRID FEED */}
            <Grid container spacing={3}>
                {posts.map((item) => (
                    <Grid key={item.id} size={{ xs: 12, md: 6 }}>
                        <Paper
                            elevation={0}
                            sx={{
                                borderRadius: 8,
                                bgcolor: 'white',
                                overflow: 'hidden',
                                height: '90%',
                                display: 'flex',
                                flexDirection: 'column',
                                border: '1px solid #f1f5f9',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.08)',
                                    borderColor: '#e2e8f0'
                                }
                            }}
                        >
                            {/* Card Media with Badge */}
                            <Box sx={{ p: 2 }}>
                                <Box sx={{
                                    position: 'relative',
                                    width: '100%',
                                    height: 200,
                                    borderRadius: 6,
                                    overflow: 'hidden'
                                }}>
                                    <Box
                                        component="img"
                                        src={item.image}
                                        sx={{
                                            width: '100%',
                                            height: '120%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                    <Chip
                                        label={
                                            item.status === 'APPROVED' ? 'Approved' :
                                                item.status === 'PENDING' ? 'Pending' :
                                                    item.status === 'REJECTED' ? 'Rejected' :
                                                        'In Progress'
                                        }
                                        size="small"
                                        sx={{
                                            position: 'absolute',
                                            top: 12,
                                            left: 12,
                                            bgcolor:
                                                item.status === 'APPROVED' ? '#dcfce7' :
                                                    item.status === 'PENDING' ? '#fef9c3' :
                                                        item.status === 'REJECTED' ? '#fee2e2' :
                                                            '#e0f2f7',
                                            color:
                                                item.status === 'APPROVED' ? '#166534' :
                                                    item.status === 'PENDING' ? '#854d0e' :
                                                        item.status === 'REJECTED' ? '#991b1b' :
                                                            '#0369a1',
                                            fontWeight: 800,
                                            fontSize: '0.7rem',
                                            backdropFilter: 'blur(8px)',
                                            borderRadius: 2.5,
                                            px: 1
                                        }}
                                    />
                                </Box>
                            </Box>

                            {/* Card Content */}
                            <Box sx={{ p: 5, pt: 1, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', mb: 1, fontSize: '1.2rem', letterSpacing: -0.5 }}>
                                    {item.title}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#94a3b8', mb: 4, lineHeight: 1.6, flexGrow: 1, fontSize: '0.9rem', fontWeight: 500 }}>
                                    {filterDescription(item.description).substring(0, 80)}...
                                </Typography>

                                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ pt: 2, borderTop: '1px solid #f1f5f9' }}>
                                    <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 500, fontSize: '0.75rem' }}>
                                        {item.status === 'APPROVED' ? 'Success' : item.status === 'PENDING' ? 'Pending' : item.status === 'REJECTED' ? 'Rejected' : 'Due in 4 days'}
                                    </Typography>
                                    {showInterestButton && onInterestClick && (
                                        <Button
                                            onClick={() => onInterestClick(item.id)}
                                            variant="contained"
                                            size="small"
                                            sx={{
                                                bgcolor: 'black',
                                                color: 'white',
                                                fontWeight: 900,
                                                textTransform: 'none',
                                                borderRadius: 3,
                                                px: 2,
                                                '&:hover': { bgcolor: '#111' }
                                            }}
                                        >
                                            Interested
                                        </Button>
                                    )}
                                </Stack>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default FreelancersFeed;
