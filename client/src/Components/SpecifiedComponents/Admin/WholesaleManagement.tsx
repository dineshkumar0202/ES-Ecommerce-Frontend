import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Stack, List, ListItemButton, ListItemIcon, ListItemText, IconButton, CircularProgress, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@mui/material';
import {
    Dashboard as DashboardIcon,
    Store as StoreIcon,
    Warehouse as WarehouseIcon,
    FlashOn as FlashOnIcon,
    Autorenew as AutorenewIcon,
    WorkOutline as WorkOutlineIcon,
    ExitToApp as ExitToAppIcon,
    Delete as DeleteIcon,
    Add as AddIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { WholesaleService, UploadService } from '../../../services/api';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const WholesaleManagement = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Add Product State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        title: '', pricePerUnit: '', minOrderQuantity: '', packSize: '', category: '', brand: '', stock: '', description: '', images: ''
    });
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await WholesaleService.getAll();
            setProducts(data);
        } catch (error) {
            console.error("Failed to fetch wholesale products", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const { data } = await UploadService.uploadImage(file);
            setNewProduct(prev => ({
                ...prev,
                images: prev.images ? `${prev.images}, ${data.url}` : data.url
            }));
            alert('Image uploaded successfully!');
        } catch (error) {
            console.error("Upload failed", error);
            alert('Upload failed');
        } finally {
            setIsUploading(false);
        }
    };

    const handleAddProduct = async () => {
        try {
            const productData = {
                ...newProduct,
                pricePerUnit: Number(newProduct.pricePerUnit),
                minOrderQuantity: Number(newProduct.minOrderQuantity),
                stock: Number(newProduct.stock),
                images: newProduct.images.split(',').map(img => img.trim()).filter(img => img !== '')
            };
            const { data } = await WholesaleService.create(productData);
            setProducts([data, ...products]);
            setIsModalOpen(false);
            setNewProduct({ title: '', pricePerUnit: '', minOrderQuantity: '', packSize: '', category: '', brand: '', stock: '', description: '', images: '' });
        } catch (error) {
            alert("Failed to create wholesale product");
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await WholesaleService.delete(id);
                setProducts(products.filter(p => p._id !== id));
            } catch (error) {
                alert("Failed to delete product");
            }
        }
    };

    const menuItems = [
        { name: 'Overview', icon: <DashboardIcon />, path: '/admin/dashboard' },
        { name: 'Retail', icon: <StoreIcon />, path: '/admin/retail' },
        { name: 'Wholesale', icon: <WarehouseIcon />, path: '/admin/wholesale', active: true },
        { name: 'Q-Commerce', icon: <FlashOnIcon />, path: '/admin/quick' },
        { name: 'Resale', icon: <AutorenewIcon />, path: '/admin/resale' },
        { name: 'Freelance', icon: <WorkOutlineIcon />, path: '/admin/freelance' },
    ];

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'white' }}>
            {/* Sidebar */}
            <Box sx={{ width: 260, bgcolor: 'white', borderRight: '1px solid #e2e8f0', p: 3, display: 'flex', flexDirection: 'column', height: '100vh', position: 'sticky', top: 0 }}>
                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 5, px: 2 }}>
                    <Box sx={{ bgcolor: '#bef264', p: 0.5, borderRadius: 1, display: 'flex' }}>
                        <WarehouseIcon sx={{ color: 'black' }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>wholesale</Typography>
                </Stack>

                <List disablePadding>
                    {menuItems.map((item) => (
                        <ListItemButton
                            key={item.name}
                            onClick={() => item.path !== '/admin/wholesale' && navigate(item.path)}
                            sx={{
                                mb: 1,
                                borderRadius: 3,
                                bgcolor: item.active ? '#bef264' : 'transparent',
                                color: item.active ? 'black' : '#64748b',
                                '&:hover': { bgcolor: item.active ? '#bef264' : '#f1f5f9' },
                                py: 1.5
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40, color: item.active ? 'black' : '#94a3b8' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.name}
                                primaryTypographyProps={{ fontWeight: item.active ? 700 : 500, fontSize: '0.95rem' }}
                            />
                        </ListItemButton>
                    ))}
                </List>

                <Box sx={{ mt: 'auto' }}>
                    <Stack onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('userRole'); navigate('/admin/login'); }} direction="row" alignItems="center" spacing={2} sx={{ px: 2, cursor: 'pointer', color: '#ef4444' }}>
                        <ExitToAppIcon fontSize="small" />
                        <Typography variant="body2" fontWeight={600}>Leave</Typography>
                    </Stack>
                </Box>
            </Box>

            {/* Main Content */}
            <Box sx={{ flexGrow: 1, p: 4, overflow: 'auto', bgcolor: 'white' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                    <Typography variant="h4" sx={{ fontWeight: 800 }}>Wholesale Management</Typography>
                    <Button variant="contained" onClick={() => setIsModalOpen(true)} startIcon={<AddIcon />} sx={{ bgcolor: 'black', color: 'white', borderRadius: 2 }}>
                        New Bulk Entry
                    </Button>
                </Stack>

                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress sx={{ color: '#bef264' }} /></Box>
                ) : (
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: '#94a3b8', letterSpacing: 1, display: 'block', mb: 3 }}>PRODUCT POOL ({products.length})</Typography>

                        <Stack direction="row" flexWrap="wrap" spacing={3}>
                            {products.map((product) => (
                                <Box key={product._id} sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(25% - 24px)' } }}>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 2,
                                            borderRadius: 3,
                                            bgcolor: '#f8fafc',
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            position: 'relative',
                                            transition: 'all 0.2s',
                                            '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }
                                        }}
                                    >
                                        <Box sx={{ position: 'relative', mb: 2, pt: '100%', borderRadius: 2, overflow: 'hidden', bgcolor: '#f1f5f9' }}>
                                            <Box
                                                component="img"
                                                src={product.images?.[0] || 'https://via.placeholder.com/200'}
                                                alt={product.title}
                                                sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                            <Box sx={{ position: 'absolute', top: 10, right: 10, bgcolor: '#bef264', px: 1, py: 0.5, borderRadius: 1, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                                                <Typography variant="caption" sx={{ fontWeight: 800, fontSize: '0.6rem', color: 'black' }}>
                                                    ₹{product.pricePerUnit}/UNIT
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 0.5 }}>{product.title}</Typography>
                                        <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.65rem', fontWeight: 600 }}>PACK SIZE: {product.packSize} • MIN ORDER: {product.minOrderQuantity}</Typography>

                                        <Stack direction="row" justifyContent="flex-end" sx={{ mt: 'auto', pt: 1 }}>
                                            <IconButton size="small" onClick={() => handleDelete(product._id)} sx={{ color: '#ef4444' }}>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Stack>
                                    </Paper>
                                </Box>
                            ))}
                            {products.length === 0 && <Typography sx={{ m: 2 }}>No wholesale products found.</Typography>}
                        </Stack>
                    </Box>
                )}

                {/* Add Product Modal */}
                <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="sm" fullWidth>
                    <DialogTitle sx={{ fontWeight: 800 }}>Add New Bulk Segment Product</DialogTitle>
                    <DialogContent dividers>
                        <Stack spacing={2.5} sx={{ py: 1 }}>
                            <TextField fullWidth label="Wholesale Title" value={newProduct.title} onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })} />

                            <Stack direction="row" spacing={2}>
                                <TextField fullWidth type="number" label="Price Per Unit" value={newProduct.pricePerUnit} onChange={(e) => setNewProduct({ ...newProduct, pricePerUnit: e.target.value })} />
                                <TextField fullWidth type="number" label="Min Order Qty" value={newProduct.minOrderQuantity} onChange={(e) => setNewProduct({ ...newProduct, minOrderQuantity: e.target.value })} />
                            </Stack>

                            <Stack direction="row" spacing={2}>
                                <TextField fullWidth label="Pack Size (e.g. 10 Pcs)" value={newProduct.packSize} onChange={(e) => setNewProduct({ ...newProduct, packSize: e.target.value })} />
                                <TextField fullWidth type="number" label="Total Stock Units" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} />
                            </Stack>
                            <TextField fullWidth select label="Category" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}>
                                {['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports', 'Food'].map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
                            </TextField>
                            <TextField fullWidth label="Brand" value={newProduct.brand} onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })} />
                            <TextField fullWidth multiline rows={3} label="Description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
                            <TextField fullWidth label="Image URLs (comma separated)" value={newProduct.images} onChange={(e) => setNewProduct({ ...newProduct, images: e.target.value })} />
                            <Button
                                variant="outlined"
                                component="label"
                                startIcon={isUploading ? <CircularProgress size={20} /> : <CloudUploadIcon />}
                                disabled={isUploading}
                                sx={{ borderRadius: 2, textTransform: 'none', py: 1 }}
                            >
                                {isUploading ? 'Uploading...' : 'Upload Image to Cloud'}
                                <input type="file" hidden accept="image/*" onChange={handleFileUpload} />
                            </Button>
                        </Stack>
                    </DialogContent>
                    <DialogActions sx={{ p: 2.5 }}>
                        <Button onClick={() => setIsModalOpen(false)} sx={{ color: '#64748b' }}>Cancel</Button>
                        <Button variant="contained" onClick={handleAddProduct} sx={{ bgcolor: 'black', color: 'white', borderRadius: 2 }}>Confirm Bulk Entry</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
};

export default WholesaleManagement;
