import { useEffect, useState } from 'react';
import { Box, Typography, Paper, Chip, Button } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const BuyerRequestsFeed = () => {
    const [requests, setRequests] = useState<any[]>([]);

    useEffect(() => {
        const storedRequests = localStorage.getItem('wholesale_requests');
        if (storedRequests) {
            setRequests(JSON.parse(storedRequests).reverse());
        }
    }, []);

    if (requests.length === 0) {
        return (
            <Box sx={{ p: 4, textAlign: 'center', color: '#64748b' }}>
                <Typography>No buyer requests found yet.</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Recent Buyer Requests</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {requests.map((request) => (
                    <Paper
                        key={request.id}
                        elevation={0}
                        sx={{
                            p: 2,
                            borderRadius: 3,
                            border: '1px solid #e2e8f0',
                            display: 'flex',
                            gap: 2,
                            transition: 'all 0.3s',
                            '&:hover': {
                                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                                borderColor: '#cbd5e1'
                            }
                        }}
                    >
                        {/* Left: Image */}
                        {request.image && (
                            <Box
                                component="img"
                                src={request.image}
                                sx={{
                                    width: 120,
                                    height: 120,
                                    objectFit: 'cover',
                                    borderRadius: 2,
                                    bgcolor: '#f1f5f9',
                                    flexShrink: 0
                                }}
                            />
                        )}

                        {/* Right: Content */}
                        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            {/* Title Row */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.1rem' }}>
                                        {request.productType}
                                    </Typography>
                                    <Chip
                                        label="NEW"
                                        size="small"
                                        sx={{
                                            bgcolor: '#bef264',
                                            color: '#000',
                                            fontWeight: 800,
                                            fontSize: '0.65rem',
                                            height: 20,
                                            borderRadius: 1
                                        }}
                                    />
                                </Box>
                                <Button
                                    variant="text"
                                    size="small"
                                    sx={{
                                        color: '#94a3b8',
                                        textTransform: 'none',
                                        fontSize: '0.75rem',
                                        minWidth: 'auto'
                                    }}
                                >
                                    EDIT POST
                                </Button>
                            </Box>

                            {/* Description */}
                            <Typography variant="body2" sx={{ color: '#64748b', mb: 1.5, lineHeight: 1.5 }}>
                                {request.name} is looking for this product. Contact: {request.phoneNumber}.
                            </Typography>

                            {/* Meta Info */}
                            <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                                Posted {request.date} • {request.name}
                            </Typography>

                            {/* Additional Details (Expandable) */}
                            <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #f1f5f9', display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <PhoneIcon fontSize="small" sx={{ color: '#94a3b8', fontSize: 16 }} />
                                    <Typography variant="caption" sx={{ color: '#475569', fontWeight: 600 }}>
                                        {request.phoneNumber}
                                    </Typography>
                                </Box>
                                {request.email && (
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <EmailIcon fontSize="small" sx={{ color: '#94a3b8', fontSize: 16 }} />
                                        <Typography variant="caption" sx={{ color: '#475569', fontWeight: 600 }}>
                                            {request.email}
                                        </Typography>
                                    </Box>
                                )}
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <LocationOnIcon fontSize="small" sx={{ color: '#94a3b8', fontSize: 16 }} />
                                    <Typography variant="caption" sx={{ color: '#475569', fontWeight: 600 }}>
                                        {request.location}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                ))}
            </Box>
        </Box>
    );
};

export default BuyerRequestsFeed;
