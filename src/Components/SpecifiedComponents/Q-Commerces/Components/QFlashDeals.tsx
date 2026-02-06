import { Box, Typography, Button, Stack } from '@mui/material';

const QFlashDeals = () => {
    return (
        <Box sx={{
            bgcolor: '#1a1a1a',
            borderRadius: 3,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: 'white',
            mb: 4,
            borderLeft: '6px solid #22c55e'
        }}>
            <Box>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="h5" sx={{ fontWeight: 900, fontStyle: 'italic', letterSpacing: 1 }}>
                        FLASH DEALS
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#22c55e', fontWeight: 700, letterSpacing: 0.5 }}>
                        ENDS IN 00:15:42
                    </Typography>
                </Stack>
            </Box>
            <Button
                variant="contained"
                sx={{
                    bgcolor: 'white',
                    color: 'black',
                    fontWeight: 800,
                    fontSize: '0.75rem',
                    borderRadius: 1,
                    px: 3,
                    '&:hover': { bgcolor: '#e5e5e5' }
                }}
            >
                GRAB ALL
            </Button>
        </Box>
    );
};

export default QFlashDeals;
