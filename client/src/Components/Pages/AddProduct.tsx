import { Box, Container, Typography, Paper, TextField, Button, Stack, Divider, MenuItem } from '@mui/material';
import Navbar from '../WrapperComponents/Navbar';
import Footer from '../WrapperComponents/Footer';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const categories = ['Electronics', 'Fashion', 'Home & Garden', 'Tools', 'Automotive', 'Sports'];

const AddProduct = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        category: '',
        description: '',
        stock: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Product Data:', formData);
        // Add API call here
        alert('Product listed successfully! (Demo)');
        navigate('/seller/profile');
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <Container maxWidth="md" sx={{ flex: 1, py: 6 }}>
                <Typography variant="h4" sx={{ fontWeight: 900, mb: 4, textAlign: 'center' }}>List a New Product</Typography>

                <Paper elevation={0} component="form" onSubmit={handleSubmit} sx={{ p: 4, borderRadius: 4, bgcolor: 'white', border: '1px solid #e2e8f0' }}>
                    <Stack spacing={3}>
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Product Details</Typography>
                            <TextField fullWidth label="Product Title" name="title" value={formData.title} onChange={handleChange} required variant="outlined" />
                        </Box>

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                            <TextField fullWidth label="Price (₹)" name="price" type="number" value={formData.price} onChange={handleChange} required variant="outlined" InputProps={{ startAdornment: <Typography sx={{ mr: 1 }}>₹</Typography> }} />
                            <TextField select fullWidth label="Category" name="category" value={formData.category} onChange={handleChange} required variant="outlined">
                                {categories.map((option) => (
                                    <MenuItem key={option} value={option}>{option}</MenuItem>
                                ))}
                            </TextField>
                        </Stack>

                        <TextField fullWidth label="Stock Quantity" name="stock" type="number" value={formData.stock} onChange={handleChange} required variant="outlined" />

                        <TextField fullWidth label="Description" name="description" multiline rows={4} value={formData.description} onChange={handleChange} required variant="outlined" />

                        <Box sx={{ border: '2px dashed #cbd5e1', borderRadius: 2, p: 4, textAlign: 'center', bgcolor: '#f8fafc', cursor: 'pointer', '&:hover': { borderColor: '#94a3b8' } }}>
                            <CloudUploadIcon sx={{ fontSize: 40, color: '#94a3b8', mb: 1 }} />
                            <Typography variant="body1" sx={{ fontWeight: 600, color: '#475569' }}>Click to upload product images</Typography>
                            <Typography variant="caption" sx={{ color: '#94a3b8' }}>PNG, JPG up to 5MB</Typography>
                        </Box>
                    </Stack>

                    <Divider sx={{ my: 4 }} />

                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button variant="outlined" onClick={() => navigate('/seller/profile')} sx={{ textTransform: 'none', borderRadius: 2 }}>Cancel</Button>
                        <Button type="submit" variant="contained" sx={{ bgcolor: '#0f172a', textTransform: 'none', borderRadius: 2, px: 4 }}>List Product</Button>
                    </Stack>
                </Paper>
            </Container>
            <Footer />
        </Box>
    );
};

export default AddProduct;
