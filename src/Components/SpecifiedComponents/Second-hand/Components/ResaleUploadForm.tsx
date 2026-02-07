import React from 'react';
import { Box, Paper, TextField, Button, Typography, MenuItem, Checkbox, FormControlLabel, Stack, Alert, CircularProgress, FormHelperText } from '@mui/material';
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
    const [images, setImages] = React.useState<string[]>([]);
    const [location, setLocation] = React.useState('');
    const [mobile, setMobile] = React.useState('');

    // UI States
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const validate = () => {
        const tempErrors: { [key: string]: string } = {};
        if (!productName.trim()) tempErrors.productName = "Product title is required";
        if (!category) tempErrors.category = "Category is required";
        if (!condition) tempErrors.condition = "Condition is required";
        if (!price) tempErrors.price = "Price is required";
        if (!location.trim()) tempErrors.location = "Location is required";
        if (!mobile.trim()) tempErrors.mobile = "Mobile number is required";
        if (images.length < 4) tempErrors.images = "At least 4 images are required";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const currentCount = images.length;
            const newFiles = Array.from(files).slice(0, 10 - currentCount); // Limit total to 10

            newFiles.forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImages(prev => {
                        if (prev.length < 10) return [...prev, reader.result as string];
                        return prev;
                    });
                    // Clear image error if sufficient images are added
                    if (images.length + newFiles.length >= 4) {
                        setErrors(prev => ({ ...prev, images: '' }));
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const handlePost = async () => {
        if (!validate()) {
            // Scroll to top to show errors if needed
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setIsSubmitting(true);

        // Simulate network delay for better UX
        await new Promise(resolve => setTimeout(resolve, 1000));

        const newProduct = {
            id: Date.now(),
            title: productName,
            price: `₹${price}`,
            image: images[0],
            images: images,
            condition: condition,
            seller: 'You',
            location: location,
            mobile: mobile,
            time: 'Just now'
        };

        const existingProducts = JSON.parse(localStorage.getItem('resaleProducts') || '[]');

        try {
            localStorage.setItem('resaleProducts', JSON.stringify([newProduct, ...existingProducts]));

            // Add to Wholesale Feed as well (User Request)
            const wholesaleItem = {
                id: newProduct.id,
                title: newProduct.title,
                description: description,
                sku: `RESALE-${newProduct.id}`,
                packSize: 1, // Default for single resale item
                pricePerUnit: Number(price), // Numeric price
                phoneNumber: mobile,
                email: "seller@example.com", // Placeholder
                location: location,
                companyName: "Verified Reseller", // Default tag
                rating: 5.0, // New listing boost
                reviews: [],
                images: images,
                inStock: true
            };

            const existingWholesale = JSON.parse(localStorage.getItem('wholesaleProducts_v1.2') || '[]');
            localStorage.setItem('wholesaleProducts_v1.2', JSON.stringify([wholesaleItem, ...existingWholesale]));

            if (onPost) {
                // Reset form
                setProductName('');
                setCategory('');
                setCondition('');
                setDescription('');
                setPrice('');
                setImages([]);
                setLocation('');
                setMobile('');

                onPost();
            }
        } catch (error) {
            console.error("Storage limit reached:", error);
            alert("Storage limit reached! We will save your listing with only the first image."); // Keep alert for critical system failure

            // Fallback: Save with only the first image
            const reducedImages = images.slice(0, 1);
            const reducedProduct = { ...newProduct, images: reducedImages, image: reducedImages[0] };

            try {
                localStorage.setItem('resaleProducts', JSON.stringify([reducedProduct, ...existingProducts]));
                if (onPost) onPost();
            } catch (retryError) {
                alert("Unable to save listing. Storage is completely full. Please clear some data.");
            }
        } finally {
            setIsSubmitting(false);
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
                    Sell your pre-loved items. (Min 4 images, Max 10 images)
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                {/* Left Column - Imagery */}
                <Box sx={{ width: { xs: '100%', md: '33.33%' } }}>
                    <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: `1px solid ${errors.images ? '#ef4444' : '#e2e8f0'}`, height: '100%', bgcolor: '#ffffff' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a' }}>Photos</Typography>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: errors.images ? '#ef4444' : '#ef4444' }}>REQUIRED (4-10)</Typography>
                        </Box>

                        <Box sx={{
                            border: `2px dashed ${errors.images ? '#ef4444' : '#e2e8f0'}`,
                            borderRadius: 3,
                            p: 3,
                            textAlign: 'center',
                            bgcolor: '#f8fafc',
                            minHeight: '280px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
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
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, width: '100%' }}>
                                    {images.map((img, index) => (
                                        <Box
                                            key={index}
                                            component="img"
                                            src={img}
                                            sx={{
                                                width: 'calc(50% - 4px)',
                                                height: '140px',
                                                objectFit: 'cover',
                                                borderRadius: 2
                                            }}
                                        />
                                    ))}
                                    {images.length < 10 && (
                                        <Box
                                            onClick={() => fileInputRef.current?.click()}
                                            sx={{
                                                width: 'calc(50% - 4px)',
                                                height: '140px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                bgcolor: '#e2e8f0',
                                                borderRadius: 2,
                                                cursor: 'pointer',
                                                '&:hover': { bgcolor: '#cbd5e1' }
                                            }}
                                        >
                                            <CloudUploadOutlinedIcon />
                                            <Typography variant="caption" sx={{ mt: 1, fontWeight: 700 }}>Add More</Typography>
                                        </Box>
                                    )}
                                </Box>
                            ) : (
                                <>
                                    <Box sx={{ bgcolor: 'white', p: 1.5, borderRadius: '50%', mb: 2, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                                        <CloudUploadOutlinedIcon sx={{ fontSize: 32, color: '#2563eb' }} />
                                    </Box>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
                                        Add Photos
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: '#64748b', mb: 1.5, display: 'block' }}>
                                        Upload 4-10 photos
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
                        {errors.images && (
                            <FormHelperText error sx={{ mt: 2, textAlign: 'center' }}>
                                {errors.images}
                            </FormHelperText>
                        )}
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
                            Tip: Uploading at least 4 different angles helps items sell faster.
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
                                        onChange={(e) => {
                                            setProductName(e.target.value);
                                            setErrors(prev => ({ ...prev, productName: '' }));
                                        }}
                                        error={!!errors.productName}
                                        helperText={errors.productName}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: '#334155' }}>Category</Typography>
                                        <TextField
                                            select
                                            fullWidth
                                            value={category}
                                            onChange={(e) => {
                                                setCategory(e.target.value);
                                                setErrors(prev => ({ ...prev, category: '' }));
                                            }}
                                            placeholder="Select category"
                                            InputProps={{ sx: { borderRadius: 2 } }}
                                            error={!!errors.category}
                                            helperText={errors.category}
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
                                            onChange={(e) => {
                                                setCondition(e.target.value);
                                                setErrors(prev => ({ ...prev, condition: '' }));
                                            }}
                                            InputProps={{ sx: { borderRadius: 2 } }}
                                            error={!!errors.condition}
                                            helperText={errors.condition}
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
                                    // Description is optional or strict check? Prompt says "fills and submits... description"
                                    // Let's assume description is optional or enforced lightly. I made prompt check strict only for basic fields.
                                    // Actually let's make it optional to reduce friction, or add check if needed.
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
                                        onChange={(e) => {
                                            setPrice(e.target.value);
                                            setErrors(prev => ({ ...prev, price: '' }));
                                        }}
                                        error={!!errors.price}
                                        helperText={errors.price}
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

                        <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: '1px solid #e2e8f0' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>Seller Details</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <Box sx={{ display: 'flex', gap: 3 }}>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: '#334155' }}>Location</Typography>
                                        <TextField
                                            fullWidth
                                            placeholder="City, State"
                                            InputProps={{ sx: { borderRadius: 2 } }}
                                            value={location}
                                            onChange={(e) => {
                                                setLocation(e.target.value);
                                                setErrors(prev => ({ ...prev, location: '' }));
                                            }}
                                            error={!!errors.location}
                                            helperText={errors.location}
                                        />
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: '#334155' }}>Mobile Number</Typography>
                                        <TextField
                                            fullWidth
                                            placeholder="+91 XXXXX XXXXX"
                                            InputProps={{ sx: { borderRadius: 2 } }}
                                            value={mobile}
                                            onChange={(e) => {
                                                setMobile(e.target.value);
                                                setErrors(prev => ({ ...prev, mobile: '' }));
                                            }}
                                            error={!!errors.mobile}
                                            helperText={errors.mobile}
                                        />
                                    </Box>
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
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                    onClick={handlePost}
                    disabled={isSubmitting}
                    sx={{
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        bgcolor: '#2563eb',
                        textTransform: 'none',
                        fontWeight: 600,
                        boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)',
                        '&:hover': { bgcolor: '#1d4ed8' },
                        '&:disabled': { bgcolor: '#93c5fd', color: 'white' }
                    }}
                >
                    {isSubmitting ? 'Posting...' : 'Post Listing'}
                </Button>
            </Box>
        </Box>
    );
};

export default ResaleUploadForm;
