import { Box, Typography } from '@mui/material';

const brands = [
    { id: 1, name: 'Adidas', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg' },
    { id: 2, name: 'Nike', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg' },
    { id: 3, name: 'Puma', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Puma_Logo.png' }, // Use png for transparency if needed or svg
    { id: 4, name: 'Samsung', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg' },
    { id: 5, name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { id: 6, name: 'Sony', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg' },
];

const TrustedBrands = () => {
    return (
        <Box sx={{ py: 6, bgcolor: 'transparent', textAlign: 'center' }}>
            <Typography variant="overline" sx={{ color: '#636e72', fontWeight: 700, letterSpacing: 2, mb: 4, display: 'block' }}>
                TRUSTED BY TOP BRANDS
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: { xs: 4, md: 8 },
                    opacity: 0.7
                }}
            >
                {brands.map((brand) => (
                    <Box
                        key={brand.id}
                        component="img"
                        src={brand.logo}
                        alt={brand.name}
                        sx={{
                            height: { xs: 30, md: 40 },
                            width: 'auto',
                            filter: 'grayscale(100%)',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                            '&:hover': {
                                filter: 'grayscale(0%)',
                                transform: 'scale(1.1)',
                                opacity: 1
                            }
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default TrustedBrands;
