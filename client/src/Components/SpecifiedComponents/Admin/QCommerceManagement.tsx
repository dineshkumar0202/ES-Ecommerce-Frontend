import { useEffect, useState } from 'react';
import { Box, Typography, Paper, Stack, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Chip, CircularProgress, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@mui/material';
import { toast } from 'react-toastify';
import {
    Dashboard as DashboardIcon,
    Store as StoreIcon,
    Warehouse as WarehouseIcon,
    FlashOn as FlashOnIcon,
    Autorenew as AutorenewIcon,
    WorkOutline as WorkOutlineIcon,
    ExitToApp as ExitToAppIcon,
    Delete as DeleteIcon,
    Add as AddIcon,
    Edit as EditIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { QProductService, UploadService } from '../../../services/api';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const QCommerceManagement = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        title: '', price: '', brand: '', unit: '', discount: '0', category: '', stock: '', image: '', images: '', description: ''
    });
    const [isUploading, setIsUploading] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await QProductService.getAll();
            setProducts(data);
        } catch (error) {
            console.error("Failed to fetch Q-products", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setIsUploading(true);
        try {
            const uploadPromises = Array.from(files).map(async (file) => {
                const { data } = await UploadService.uploadImage(file);
                return data.url;
            });

            const uploadedUrls = await Promise.all(uploadPromises);
            setNewProduct(prev => {
                const existingImages = prev.images ? prev.images.split(',').map(img => img.trim()).filter(img => img !== '') : [];
                const newImages = [...existingImages, ...uploadedUrls];
                return {
                    ...prev,
                    image: newImages[0] || '',
                    images: newImages.join(', ')
                };
            });
            toast.success(`${uploadedUrls.length} image(s) uploaded successfully!`);
        } catch (error) {
            console.error("Upload failed", error);
            toast.error('Upload failed');
        } finally {
            setIsUploading(false);
        }
    };

    const removeImage = (urlToRemove: string) => {
        setNewProduct(prev => {
            const currentImages = prev.images.split(',').map(img => img.trim()).filter(img => img !== '');
            const filteredImages = currentImages.filter(url => url !== urlToRemove);
            return {
                ...prev,
                image: filteredImages[0] || '',
                images: filteredImages.join(', ')
            };
        });
    };

    const handleAddProduct = async () => {
        try {
            const imageList = newProduct.images.split(',').map(img => img.trim()).filter(img => img !== '');
            const productData = {
                ...newProduct,
                price: Number(newProduct.price),
                discount: Number(newProduct.discount),
                stock: Number(newProduct.stock),
                image: imageList[0] || '',
                images: imageList
            };

            if (editingId) {
                const { data } = await QProductService.update(editingId, productData);
                setProducts(products.map(p => p._id === editingId ? data : p));
                toast.success('Product updated successfully!');
            } else {
                const { data } = await QProductService.create(productData);
                setProducts([data, ...products]);
                toast.success('Product created successfully!');
            }

            setIsModalOpen(false);
            setEditingId(null);
            setNewProduct({ title: '', price: '', brand: '', unit: '', discount: '0', category: '', stock: '', image: '', images: '', description: '' });
        } catch (error: any) {
            console.error("Failed to save Q-commerce product:", error.response?.data || error.message);
            toast.error(`Failed to save product: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleEditClick = (product: any) => {
        setEditingId(product._id);
        setNewProduct({
            title: product.title || product.name || '',
            price: product.price?.toString() || '',
            brand: product.brand || '',
            unit: product.unit || '',
            discount: product.discount?.toString() || '0',
            category: product.category || '',
            stock: product.stock?.toString() || '',
            image: product.image || '',
            images: product.images?.join(', ') || product.image || '',
            description: product.description || ''
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Delete this Q-commerce product?")) {
            try {
                await QProductService.delete(id);
                setProducts(products.filter(p => p._id !== id));
                toast.success("Product deleted successfully");
            } catch (error) {
                toast.error("Failed to delete product");
            }
        }
    };

    const menuItems = [
        { name: 'Overview', icon: <DashboardIcon />, path: '/admin/dashboard' },
        { name: 'Retail', icon: <StoreIcon />, path: '/admin/retail' },
        { name: 'Wholesale', icon: <WarehouseIcon />, path: '/admin/wholesale' },
        { name: 'Q-Commerce', icon: <FlashOnIcon />, path: '/admin/quick', active: true },
        { name: 'Resale', icon: <AutorenewIcon />, path: '/admin/resale' },
        { name: 'Freelance', icon: <WorkOutlineIcon />, path: '/admin/freelance' },
    ];

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'white' }}>
            {/* Sidebar */}
            <Box sx={{ width: 260, bgcolor: 'white', borderRight: '1px solid #e2e8f0', p: 3, display: 'flex', flexDirection: 'column', height: '100vh', position: 'sticky', top: 0 }}>
                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 5, px: 2 }}>
                    <Box sx={{ bgcolor: '#bef264', p: 0.5, borderRadius: 1, display: 'flex' }}>
                        <FlashOnIcon sx={{ color: 'black' }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>q-commerce</Typography>
                </Stack>

                <List disablePadding>
                    {menuItems.map((item) => (
                        <ListItemButton
                            key={item.name}
                            onClick={() => item.path !== '/admin/quick' && navigate(item.path)}
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
                    <Typography variant="h4" sx={{ fontWeight: 800 }}>Q-Commerce Management</Typography>
                    <Button variant="contained" onClick={() => setIsModalOpen(true)} startIcon={<AddIcon />} sx={{ bgcolor: 'black', color: 'white', borderRadius: 2, '&:hover': { bgcolor: '#333' } }}>
                        Quick Add
                    </Button>
                </Stack>

                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress sx={{ color: '#bef264' }} /></Box>
                ) : (
                    <Box>
                        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: '#94a3b8', letterSpacing: 1, display: 'block' }}>INVENTORY STATUS ({products.length} Items)</Typography>
                        </Stack>

                        <Stack direction="row" flexWrap="wrap" spacing={3}>
                            {products.map((product) => (
                                <Box key={product._id} sx={{ width: { xs: '100%', md: 'calc(50% - 12px)' } }}>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 2,
                                            borderRadius: 3,
                                            border: '1px solid #f1f5f9',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            bgcolor: '#f8fafc'
                                        }}
                                    >
                                        <Stack direction="row" alignItems="center" spacing={2}>
                                            <Box
                                                component="img"
                                                src={product.image}
                                                alt={product.title}
                                                sx={{ width: 64, height: 64, borderRadius: 2, objectFit: 'cover', bgcolor: '#f1f5f9' }}
                                            />
                                            <Box>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{product.title}</Typography>
                                                <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>{product.category} • {product.unit}</Typography>
                                            </Box>
                                        </Stack>
                                        <Stack direction="row" alignItems="center" spacing={3}>
                                            <Box sx={{ textAlign: 'right' }}>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 900 }}>₹{product.price}</Typography>
                                                {product.discount > 0 && (
                                                    <Chip label={`${product.discount}% OFF`} size="small" sx={{ height: 18, fontSize: '0.6rem', bgcolor: '#bef264', color: 'black', fontWeight: 800 }} />
                                                )}
                                            </Box>
                                            <IconButton size="small" onClick={() => handleEditClick(product)} sx={{ color: '#64748b' }}>
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton size="small" onClick={() => handleDelete(product._id)} sx={{ color: '#ef4444' }}>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Stack>
                                    </Paper>
                                </Box>
                            ))}
                            {products.length === 0 && <Typography sx={{ m: 2 }}>No quick commerce products found.</Typography>}
                        </Stack>
                    </Box>
                )}

                {/* Add Product Modal */}
                <Dialog open={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingId(null); }} maxWidth="sm" fullWidth>
                    <DialogTitle sx={{ fontWeight: 800 }}>{editingId ? 'Edit Quick Item' : 'Quick Add Item'}</DialogTitle>
                    <DialogContent dividers>
                        <Stack spacing={2.5} sx={{ py: 1 }}>
                            <TextField fullWidth label="Product Title" value={newProduct.title} onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })} />

                            <Stack direction="row" spacing={2}>
                                <TextField fullWidth type="number" label="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
                                <TextField fullWidth label="Unit (e.g. 500g, 1L)" value={newProduct.unit} onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })} />
                            </Stack>

                            <Stack direction="row" spacing={2}>
                                <TextField fullWidth type="number" label="Discount %" value={newProduct.discount} onChange={(e) => setNewProduct({ ...newProduct, discount: e.target.value })} />
                                <TextField fullWidth type="number" label="Stock" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} />
                            </Stack>
                            <TextField fullWidth select label="Category" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}>
                                {['Fruits & Veg', 'Dairy & Eggs', 'Bakery', 'Snacks', 'Beverages', 'Instant Food'].map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
                            </TextField>
                            <TextField fullWidth label="Brand" value={newProduct.brand} onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })} />
                            <Box sx={{ mt: 1 }}>
                                <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b', mb: 1, display: 'block' }}>
                                    QUICK ITEM IMAGES ({newProduct.images ? newProduct.images.split(',').length : 0}/3)
                                </Typography>
                                <Stack direction="row" spacing={2} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
                                    {newProduct.images.split(',').map((img, idx) => {
                                        const trimmedImg = img.trim();
                                        if (!trimmedImg) return null;
                                        return (
                                            <Box key={idx} sx={{ position: 'relative', width: 80, height: 80, borderRadius: 2, overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                                                <Box component="img" src={trimmedImg} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                <IconButton
                                                    size="small"
                                                    onClick={() => removeImage(trimmedImg)}
                                                    sx={{ position: 'absolute', top: 2, right: 2, bgcolor: 'rgba(255,255,255,0.8)', '&:hover': { bgcolor: 'white' }, p: 0.5 }}
                                                >
                                                    <DeleteIcon sx={{ fontSize: 14, color: '#ef4444' }} />
                                                </IconButton>
                                            </Box>
                                        );
                                    })}
                                </Stack>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    fullWidth
                                    startIcon={isUploading ? <CircularProgress size={20} /> : <CloudUploadIcon />}
                                    disabled={isUploading || (newProduct.images ? newProduct.images.split(',').length >= 3 : false)}
                                    sx={{ borderRadius: 2, textTransform: 'none', py: 1.5, borderStyle: 'dashed', borderWidth: 2 }}
                                >
                                    {isUploading ? 'Uploading...' : 'Upload Images (Max 3)'}
                                    <input type="file" hidden accept="image/*" multiple onChange={handleFileUpload} />
                                </Button>
                                <Typography variant="caption" sx={{ color: '#94a3b8', mt: 1, display: 'block' }}>
                                    Tip: Q-commerce items support up to 3 images.
                                </Typography>
                            </Box>
                            <TextField fullWidth multiline rows={2} label="Short Description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
                        </Stack>
                    </DialogContent>
                    <DialogActions sx={{ p: 2.5 }}>
                        <Button onClick={() => { setIsModalOpen(false); setEditingId(null); }} sx={{ color: '#64748b' }}>Cancel</Button>
                        <Button variant="contained" onClick={handleAddProduct} sx={{ bgcolor: 'black', color: 'white', borderRadius: 2 }}>
                            {editingId ? 'Save Changes' : 'Confirm Add'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
};

export default QCommerceManagement;
