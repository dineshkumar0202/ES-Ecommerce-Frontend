import { Box, Typography, Paper, Button } from '@mui/material';

const QEssentials = () => {
    return (
        <Box sx={{ mb: 6 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, letterSpacing: -0.5 }}>TOP ESSENTIALS</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                {/* 1. Gourmet Bakery */}
                <Box sx={{ width: { xs: '100%', md: 'calc(33.33% - 16px)' }, flexGrow: 0, flexShrink: 0 }}>
                    <Paper sx={{
                        p: 4,
                        bgcolor: 'black',
                        color: 'white',
                        borderRadius: 4,
                        height: '320px',
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start'
                    }}>
                        <Typography variant="overline" sx={{ color: '#22c55e', fontWeight: 800, letterSpacing: 1 }}>LIMITED SUPPLY</Typography>
                        <Typography variant="h4" sx={{ fontWeight: 900, fontStyle: 'italic', mb: 1, lineHeight: 0.9 }}>GOURMET<br />BAKERY<br />BUNDLE</Typography>

                        <Button variant="contained" sx={{ mt: 'auto', bgcolor: '#22c55e', color: 'black', fontWeight: 800 }}>GET NOW</Button>

                        <Box
                            component="img"
                            src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80"
                            sx={{
                                position: 'absolute',
                                right: -40,
                                bottom: -40,
                                width: '200px',
                                height: '200px',
                                objectFit: 'cover',
                                borderRadius: '50%',
                                border: '8px solid #333'
                            }}
                        />
                    </Paper>
                </Box>

                {/* 2. Green Detox Box */}
                <Box sx={{ width: { xs: '100%', md: 'calc(33.33% - 16px)' }, flexGrow: 0, flexShrink: 0 }}>
                    <Paper sx={{
                        p: 4,
                        bgcolor: '#22c55e',
                        color: 'black',
                        borderRadius: 4,
                        height: '320px',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <Typography variant="overline" sx={{ color: '#000', fontWeight: 800, letterSpacing: 1 }}>HEALTHY CHOICE</Typography>
                        <Typography variant="h4" sx={{ fontWeight: 900, fontStyle: 'italic', mb: 1, lineHeight: 0.9 }}>GREEN DETOX<br />BOX</Typography>

                        <Button variant="contained" sx={{ mt: 3, bgcolor: 'black', color: 'white', fontWeight: 800 }}>ADD ALL</Button>

                        <Box
                            component="img"
                            src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80"
                            sx={{
                                position: 'absolute',
                                right: -30,
                                bottom: -30,
                                width: '220px',
                                height: '220px',
                                objectFit: 'cover',
                                borderRadius: '50%'
                            }}
                        />
                    </Paper>
                </Box>

                {/* 3. Premium Meat */}
                <Box sx={{ width: { xs: '100%', md: 'calc(33.33% - 16px)' }, flexGrow: 0, flexShrink: 0 }}>
                    <Paper sx={{
                        p: 4,
                        bgcolor: '#f8fafc',
                        color: 'black',
                        borderRadius: 4,
                        height: '320px',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <Typography variant="overline" sx={{ color: '#22c55e', fontWeight: 800, letterSpacing: 1 }}>NEW ARRIVAL</Typography>
                        <Typography variant="h4" sx={{ fontWeight: 900, fontStyle: 'italic', mb: 1, lineHeight: 0.9 }}>PREMIUM MEAT<br />SELECTION</Typography>

                        <Button variant="contained" sx={{ mt: 3, bgcolor: 'black', color: 'white', fontWeight: 800 }}>BROWSE</Button>

                        <Box
                            component="img"
                            src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=500&q=80"
                            sx={{
                                position: 'absolute',
                                right: -20,
                                bottom: -20,
                                width: '220px',
                                height: '220px',
                                objectFit: 'contain'
                            }}
                        />
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
};

export default QEssentials;
