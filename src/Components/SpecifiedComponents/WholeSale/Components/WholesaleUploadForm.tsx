import React from 'react';
import { Box, Paper, TextField, Button, Typography, MenuItem, Checkbox, FormControlLabel, Stack, IconButton, Alert } from '@mui/material';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import SaveIcon from '@mui/icons-material/Save';
import ListAltIcon from '@mui/icons-material/ListAlt';

const WholesaleUploadForm = ({ onPost }: { onPost?: () => void }) => {
    // const navigate = useNavigate(); // Navigation handled by parent/onPost now

    const [productName, setProductName] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [availableFrom, setAvailableFrom] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [quantity, setQuantity] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [image, setImage] = React.useState<string | null>(null);

    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const totalPrice = (parseFloat(quantity || '0') * parseFloat(price || '0')).toFixed(2);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePost = () => {
        if (!productName || !price || !quantity) {
            alert('Please fill in the required fields.');
            return;
        }

        const newProduct = {
            id: Date.now(),
            title: productName,
            description: description || "No description provided.",
            sku: `SKU-${Date.now()}`,
            pricePerUnit: parseFloat(price),
            packSize: parseInt(quantity),
            image: image || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80",
            inStock: true
        };

        const existingProducts = JSON.parse(localStorage.getItem('wholesaleProducts') || '[]');
        localStorage.setItem('wholesaleProducts', JSON.stringify([...existingProducts, newProduct]));

        if (onPost) {
            onPost();
        }
    };

    return (
        <Box sx={{ maxWidth: '1200px', mx: 'auto', p: 2 }}>
            {/* Header */}
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
                {/* Left Column - Imagery */}
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
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                            />

                            {image ? (
                                <Box
                                    component="img"
                                    src={image}
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
                                        Drop your image here
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
                                        Select File
                                    </Button>
                                </>
                            )}
                        </Box>

                        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                            {[1, 2, 3, 4].map((i) => (
                                <Box key={i} sx={{
                                    width: 60,
                                    height: 60,
                                    bgcolor: i === 1 ? '#eff6ff' : '#f1f5f9',
                                    borderRadius: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#94a3b8',
                                    fontSize: '1.5rem',
                                    cursor: 'pointer'
                                }}>
                                    {i === 1 ? '+' : ''}
                                </Box>
                            ))}
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

                {/* Right Column - Info & Pricing */}
                <Box sx={{ width: { xs: '100%', md: '66.66%' } }}>
                    <Stack spacing={3}>
                        {/* General Info Card */}
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
                                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: '#334155' }}>Available From</Typography>
                                        <TextField
                                            fullWidth
                                            type="date"
                                            value={availableFrom}
                                            onChange={(e) => setAvailableFrom(e.target.value)}
                                            InputProps={{ sx: { borderRadius: 2 } }}
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

                        {/* Pricing Card */}
                        <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid #e2e8f0' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                                <Inventory2OutlinedIcon sx={{ color: '#2563eb' }} />
                                <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>Inventory & Pricing</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 3 }}>
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
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: '#334155' }}>Unit Price</Typography>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        InputProps={{
                                            sx: { borderRadius: 2 },
                                            startAdornment: <Typography sx={{ mr: 1, color: '#64748b' }}>₹</Typography>
                                        }}
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: '#334155' }}>Total Price</Typography>
                                    <Box sx={{
                                        p: '16.5px 14px',
                                        bgcolor: '#eff6ff',
                                        border: '1px solid #bfdbfe',
                                        borderRadius: 2,
                                        color: '#2563eb',
                                        fontWeight: 700
                                    }}>
                                        ₹ {totalPrice}
                                    </Box>
                                </Box>
                            </Box>

                            <Box sx={{ bgcolor: '#f8fafc', p: 2, borderRadius: 2 }}>
                                <FormControlLabel
                                    control={<Checkbox sx={{ '&.Mui-checked': { color: '#2563eb' } }} />}
                                    label={<Typography variant="body2" sx={{ fontWeight: 500, color: '#475569' }}>Enable tiered pricing for larger quantities</Typography>}
                                />
                            </Box>
                        </Paper>
                    </Stack>
                </Box>
            </Box>

            {/* Footer Actions */}
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
                    onClick={onPost} // Also close on cancel if desired, or handle separately
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
                    Post
                </Button>
            </Box>

            {/* Empty scrolling space */}
            <Box sx={{ height: '200px' }} />
        </Box >
    );
};

export default WholesaleUploadForm;
