import React from 'react';
import { Box, Paper, TextField, Button, Typography, MenuItem, Stack, Alert, InputAdornment } from '@mui/material';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import SaveIcon from '@mui/icons-material/Save';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';

import { WholesaleService } from '../../../../services/api';

const WholesaleUploadForm = ({ onPost }: { onPost?: () => void }) => {
    // const navigate = useNavigate();

    const [productName, setProductName] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [quantity, setQuantity] = React.useState('');
    const [companyName, setCompanyName] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [images, setImages] = React.useState<string[]>([]);
    const [activeImageIndex, setActiveImageIndex] = React.useState(0);

    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            Array.from(files).forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImages(prev => [...prev, reader.result as string]);
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handlePost = async () => {
        if (!productName || !quantity || !companyName || !location || !phoneNumber || !email || !startDate || !endDate || images.length === 0) {
            alert('Please fill in all required fields and upload at least one image.');
            return;
        }

        setIsSubmitting(true);

        const newProduct = {
            title: productName,
            description: description || "No description provided.",
            sku: `SKU-${Date.now()}`,
            packSize: parseInt(quantity),
            pricePerUnit: 0,
            images: images,
            image: images[0],
            companyName,
            location,
            phoneNumber,
            email,
            startDate,
            endDate,
            inStock: true
        };

        try {
            await WholesaleService.create(newProduct);
            if (onPost) {
                onPost();
            }
        } catch (error) {
            console.error("Failed to post wholesale product:", error);
            alert("Failed to post product. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box sx={{ maxWidth: '1200px', mx: 'auto', p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a' }}>
                        Add New Wholesale Product
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
                        Populate the fields below to create a new bulk-ready listing.
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                <Box sx={{ width: { xs: '100%', md: '33.33%' } }}>
                    <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0', height: '100%', bgcolor: '#ffffff' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a' }}>Product Imagery</Typography>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: '#cbd5e1' }}>REQUIRED</Typography>
                        </Box>

                        <Box sx={{
                            border: '2px dashed #e2e8f0',
                            borderRadius: 3,
                            p: 4,
                            textAlign: 'center',
                            bgcolor: '#f8fafc',
                            minHeight: '280px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <input
                                type="file"
                                hidden
                                multiple
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                            />

                            {images.length > 0 ? (
                                <Box
                                    component="img"
                                    src={images[activeImageIndex < images.length ? activeImageIndex : 0]}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0
                                    }}
                                />
                            ) : (
                                <>
                                    <Box sx={{ bgcolor: 'white', p: 1.5, borderRadius: '50%', mb: 2, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                                        <CloudUploadOutlinedIcon sx={{ fontSize: 32, color: '#2563eb' }} />
                                    </Box>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
                                        Drop your images here
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2, px: 2 }}>
                                        Supporting JPG, PNG. Max 5MB. Min 800x800px recommended.
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        onClick={() => fileInputRef.current?.click()}
                                        sx={{
                                            bgcolor: '#eff6ff',
                                            color: '#2563eb',
                                            boxShadow: 'none',
                                            textTransform: 'none',
                                            fontWeight: 600,
                                            '&:hover': { bgcolor: '#dbeafe', boxShadow: 'none' }
                                        }}
                                    >
                                        Select Files
                                    </Button>
                                </>
                            )}
                        </Box>

                        <Stack direction="row" spacing={1} sx={{ mt: 2, overflowX: 'auto', pb: 1 }}>
                            {images.map((img, index) => (
                                <Box
                                    key={index}
                                    onClick={() => setActiveImageIndex(index)}
                                    sx={{
                                        width: 60,
                                        height: 60,
                                        bgcolor: '#f1f5f9',
                                        borderRadius: 2,
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        border: activeImageIndex === index ? '2px solid #2563eb' : '1px solid transparent',
                                        flexShrink: 0
                                    }}>
                                    <Box component="img" src={img} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </Box>
                            ))}
                            <Box sx={{
                                width: 60,
                                height: 60,
                                bgcolor: '#eff6ff',
                                borderRadius: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#2563eb',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                                flexShrink: 0
                            }}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                +
                            </Box>
                        </Stack>
                    </Paper>

                    <Alert
                        severity="info"
                        icon={false}
                        sx={{
                            mt: 3,
                            borderRadius: 2,
                            bgcolor: '#eff6ff',
                            color: '#1e40af',
                            border: '1px solid #dbeafe',
                            '& .MuiAlert-message': { width: '100%' }
                        }}
                    >
                        <Box sx={{ display: 'flex', gap: 1.5 }}>
                            <Box sx={{ bgcolor: '#2563eb', color: 'white', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold' }}>i</Box>
                            <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>Listing Optimization</Typography>
                                <Typography variant="caption" sx={{ lineHeight: 1.4, display: 'block' }}>
                                    Detailed descriptions and high-quality images increase wholesale conversion rates by up to 45%.
                                </Typography>
                            </Box>
                        </Box>
                    </Alert>
                </Box>

                <Box sx={{ width: { xs: '100%', md: '66.66%' } }}>
                    <Stack spacing={3}>
                        <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid #e2e8f0' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                                <ArticleOutlinedIcon sx={{ color: '#2563eb' }} />
                                <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>General Information</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <Box>
                                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: '#334155' }}>Product Name</Typography>
                                    <TextField
                                        fullWidth
                                        placeholder="e.g. Premium Cotton Crew T-Shirts"
                                        InputProps={{ sx: { borderRadius: 2 } }}
                                        value={productName}
                                        onChange={(e) => setProductName(e.target.value)}
                                    />
                                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: '#334155' }}>Company Name</Typography>
                                    <TextField
                                        fullWidth
                                        placeholder="e.g. Acme Wholesale Ltd."
                                        InputProps={{ sx: { borderRadius: 2 } }}
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: '#334155' }}>Category</Typography>
                                        <TextField
                                            select
                                            fullWidth
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            placeholder="Select category"
                                            InputProps={{ sx: { borderRadius: 2 } }}
                                        >
                                            <MenuItem value="industrial">Industrial & Machinery</MenuItem>
                                            <MenuItem value="electronics">Electronics & Gadgets</MenuItem>
                                            <MenuItem value="fashion">Clothing & Fashion</MenuItem>
                                            <MenuItem value="automotive">Automotive Parts</MenuItem>
                                            <MenuItem value="home">Home & Garden</MenuItem>
                                            <MenuItem value="construction">Construction Materials</MenuItem>
                                        </TextField>
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: '#334155' }}>Start Date</Typography>
                                        <TextField
                                            fullWidth
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            InputProps={{
                                                sx: { borderRadius: 2 },
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <CalendarTodayOutlinedIcon sx={{ color: '#94a3b8', fontSize: 20 }} />
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: '#334155' }}>End Date</Typography>
                                        <TextField
                                            fullWidth
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            InputProps={{
                                                sx: { borderRadius: 2 },
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <CalendarTodayOutlinedIcon sx={{ color: '#94a3b8', fontSize: 20 }} />
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </Box>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: '#334155' }}>Description</Typography>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={4}
                                        placeholder="Describe the quality, material, and bulk packaging details..."
                                        InputProps={{ sx: { borderRadius: 2 } }}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Box>
                            </Box>
                        </Paper>

                        <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid #e2e8f0' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                                <Inventory2OutlinedIcon sx={{ color: '#2563eb' }} />
                                <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>Inventory & Contact</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: '#334155' }}>Fixed Quantity (Bulk)</Typography>
                                        <TextField
                                            fullWidth
                                            type="number"
                                            InputProps={{
                                                sx: { borderRadius: 2 },
                                                endAdornment: <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>UNITS</Typography>
                                            }}
                                            value={quantity}
                                            onChange={(e) => setQuantity(e.target.value)}
                                        />
                                    </Box>
                                </Box>

                                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: '#334155' }}>Phone Number</Typography>
                                        <TextField
                                            fullWidth
                                            placeholder="+91 98765 43210"
                                            InputProps={{ sx: { borderRadius: 2 } }}
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                        />
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: '#334155' }}>Email</Typography>
                                        <TextField
                                            fullWidth
                                            type="email"
                                            placeholder="contact@company.com"
                                            InputProps={{ sx: { borderRadius: 2 } }}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Box>
                                </Box>

                                <Box>
                                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: '#334155' }}>Location</Typography>
                                    <TextField
                                        fullWidth
                                        placeholder="e.g. Mumbai, Maharashtra"
                                        InputProps={{ sx: { borderRadius: 2 } }}
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                    />
                                </Box>
                            </Box>
                        </Paper>
                    </Stack>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
                <Button
                    variant="outlined"
                    sx={{
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        color: '#64748b',
                        borderColor: '#e2e8f0',
                        textTransform: 'none',
                        fontWeight: 600,
                        '&:hover': { bgcolor: 'white', borderColor: '#cbd5e1' }
                    }}
                    onClick={onPost}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handlePost}
                    sx={{
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        bgcolor: '#2563eb',
                        textTransform: 'none',
                        fontWeight: 600,
                        boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)',
                        '&:hover': { bgcolor: '#1d4ed8' }
                    }}
                >
                    {isSubmitting ? 'Posting...' : 'Post'}
                </Button>
            </Box>

            <Box sx={{ height: '200px' }} />
        </Box >
    );
};

export default WholesaleUploadForm;
