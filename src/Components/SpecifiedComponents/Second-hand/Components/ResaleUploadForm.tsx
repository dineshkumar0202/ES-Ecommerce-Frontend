import React from 'react';
import { Box, Paper, TextField, Button, Typography, MenuItem, Checkbox, FormControlLabel, Stack, Alert } from '@mui/material';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import SellIcon from '@mui/icons-material/Sell';
import SaveIcon from '@mui/icons-material/Save';

const ResaleUploadForm = ({ onPost }: { onPost?: () => void }) => {
    const [productName, setProductName] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [condition, setCondition] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [image, setImage] = React.useState<string | null>(null);

    const fileInputRef = React.useRef<HTMLInputElement>(null);

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
        if (!productName || !price || !condition) {
            alert('Please fill in the required fields.');
            return;
        }

        const newProduct = {
            id: Date.now(),
            title: productName,
            price: `₹${price}`,
            image: image || "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80",
            condition: condition,
            seller: 'You',
            time: 'Just now'
        };

        const existingProducts = JSON.parse(localStorage.getItem('resaleProducts') || '[]');
        localStorage.setItem('resaleProducts', JSON.stringify([newProduct, ...existingProducts]));

        if (onPost) {
            onPost();
        }
    };

    return (
        <Box sx={{ maxWidth: '1200px', mx: 'auto', p: 4 }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a' }}>
                    List Item for Resale
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
                    Sell your pre-loved items to a new home.
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                {/* Left Column - Imagery */}
                <Box sx={{ width: { xs: '100%', md: '33.33%' } }}>
                    <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0', height: '100%', bgcolor: '#ffffff' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a' }}>Photos</Typography>
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
                                        Add Photos
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
                                            mt: 1,
                                            '&:hover': { bgcolor: '#dbeafe', boxShadow: 'none' }
                                        }}
                                    >
                                        Select File
                                    </Button>
                                </>
                            )}
                        </Box>
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
                        <Typography variant="caption" sx={{ lineHeight: 1.4, display: 'block', fontWeight: 500 }}>
                            Tip: Clean items and good lighting help items sell 2x faster.
                        </Typography>
                    </Alert>
                </Box>

                {/* Right Column - Info */}
                <Box sx={{ width: { xs: '100%', md: '66.66%' } }}>
                    <Stack spacing={3}>
                        <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid #e2e8f0' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                                <ArticleOutlinedIcon sx={{ color: '#2563eb' }} />
                                <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>Item Details</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <Box>
                                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: '#334155' }}>Item Title</Typography>
                                    <TextField
                                        fullWidth
                                        placeholder="e.g. iPhone 13 Pro - 128GB"
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
                                            <MenuItem value="electronics">Electronics</MenuItem>
                                            <MenuItem value="fashion">Fashion</MenuItem>
                                            <MenuItem value="furniture">Furniture</MenuItem>
                                            <MenuItem value="books">Books</MenuItem>
                                            <MenuItem value="other">Other</MenuItem>
                                        </TextField>
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: '#334155' }}>Condition</Typography>
                                        <TextField
                                            select
                                            fullWidth
                                            value={condition}
                                            onChange={(e) => setCondition(e.target.value)}
                                            InputProps={{ sx: { borderRadius: 2 } }}
                                        >
                                            <MenuItem value="New">New</MenuItem>
                                            <MenuItem value="Like New">Like New</MenuItem>
                                            <MenuItem value="Good">Good</MenuItem>
                                            <MenuItem value="Fair">Fair</MenuItem>
                                            <MenuItem value="Poor">Poor</MenuItem>
                                        </TextField>
                                    </Box>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: '#334155' }}>Description</Typography>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={4}
                                        placeholder="Describe the item's condition, age, and any defects..."
                                        InputProps={{ sx: { borderRadius: 2 } }}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Box>
                            </Box>
                        </Paper>

                        <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid #e2e8f0' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                                <SellIcon sx={{ color: '#2563eb' }} />
                                <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>Pricing</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', gap: 3 }}>
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: '#334155' }}>Selling Price</Typography>
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
                                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', pt: 3 }}>
                                    <FormControlLabel
                                        control={<Checkbox defaultChecked />}
                                        label="Negotiable"
                                        sx={{ color: '#475569' }}
                                    />
                                </Box>
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
                    Post Listing
                </Button>
            </Box>
        </Box>
    );
};

export default ResaleUploadForm;
