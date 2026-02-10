import { useState } from 'react';
import { Box, Container, Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl, Paper } from '@mui/material';
import Navbar from '../WrapperComponents/Navbar';
import Footer from '../WrapperComponents/Footer';
import { QProductService } from '../../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const QAddProduct = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        price: '',
        mrp: '',
        discount: '',
        category: '',
        image: '' // In a real app this would be a file upload
    });

    const categories = [
        'Fruits & Veg',
        'Bakery',
        'Pharmacy',
        'Meat & Fish',
        'Dairy & Eggs',
        'Snacks'
    ];

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                price: Number(formData.price),
                mrp: Number(formData.mrp),
                discount: Number(formData.discount || 0)
            };
            console.log("Sending Payload:", payload); // Debugging
            await QProductService.create(payload);
            toast.success('Q-Commerce Product Added Successfully!');
            navigate('/quick'); // Redirect to Q-Commerce page
        } catch (error: any) {
            console.error("Add Product Error:", error.response?.data);
            toast.error(error.response?.data?.message || 'Failed to add product');
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
            <Navbar />
            <Container maxWidth="md" sx={{ mt: 15, mb: 10 }}>
                <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid #e2e8f0' }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 4, color: '#1e293b' }}>
                        Add Q-Commerce Product
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3 }}>
                                <TextField
                                    fullWidth
                                    label="Product Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                                <TextField
                                    fullWidth
                                    label="Brand"
                                    name="brand"
                                    value={formData.brand}
                                    onChange={handleChange}
                                    required
                                />
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3 }}>
                                <TextField
                                    fullWidth
                                    label="Price (₹)"
                                    name="price"
                                    type="number"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                />
                                <TextField
                                    fullWidth
                                    label="MRP (₹)"
                                    name="mrp"
                                    type="number"
                                    value={formData.mrp}
                                    onChange={handleChange}
                                    required
                                />
                                <TextField
                                    fullWidth
                                    label="Discount (%)"
                                    name="discount"
                                    type="number"
                                    value={formData.discount}
                                    onChange={handleChange}
                                />
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3 }}>
                                <FormControl fullWidth>
                                    <InputLabel>Category</InputLabel>
                                    <Select
                                        name="category"
                                        value={formData.category}
                                        label="Category"
                                        onChange={handleChange}
                                        required
                                    >
                                        {categories.map((cat) => (
                                            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <TextField
                                    fullWidth
                                    label="Image URL"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    required
                                    helperText="Enter a valid image URL"
                                />
                            </Box>

                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                fullWidth
                                sx={{
                                    bgcolor: 'black',
                                    color: 'white',
                                    py: 1.5,
                                    fontWeight: 800,
                                    '&:hover': { bgcolor: '#333' }
                                }}
                            >
                                ADD PRODUCT
                            </Button>
                        </Box>
                    </form>
                </Paper>
            </Container>
            <Footer />
        </Box>
    );
};

export default QAddProduct;
