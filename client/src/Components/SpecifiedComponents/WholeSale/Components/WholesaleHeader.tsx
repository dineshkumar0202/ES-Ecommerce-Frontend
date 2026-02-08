import { Box, Container, Stack, Typography } from '@mui/material';

const WholesaleHeader = () => {
    return (
        <Box sx={{ bgcolor: '#000000', color: 'white', py: 1 }}>
            <Container maxWidth="xl">
                <Stack direction="row" spacing={3} alignItems="center">
                    <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer' }}>Industrial Machinery</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer' }}>Electronics & Electrical</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer' }}>Construction & Material</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer' }}>Packaging Machines</Typography>
                </Stack>
            </Container>
        </Box>
    );
};

export default WholesaleHeader;
