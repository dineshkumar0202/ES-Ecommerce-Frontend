import { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Stack,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Button,
    TextField,
    CircularProgress,
    InputAdornment,
    Grid,
    Chip,
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import StoreIcon from '@mui/icons-material/Store';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from 'react-router-dom';
import { ResaleService, UploadService } from '../../../services/api';
import { toast } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import MenuItem from '@mui/material/MenuItem';

const ResaleManagement = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    // Add/Edit Product State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        condition: 'LIKE NEW',
        location: '',
        description: '',
        images: '',
        mobile: ''
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await ResaleService.getAll();
            setProducts(data);
        } catch (error) {
            console.error("Failed to fetch resale products", error);
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
                const { data } = await UploadService.uploadImagePublic(file);
                return data.url;
            });

            const uploadedUrls = await Promise.all(uploadPromises);
            setFormData(prev => {
                const existingImages = prev.images ? prev.images.split(',').map(img => img.trim()).filter(img => img !== '') : [];
                const newImages = [...existingImages, ...uploadedUrls];
                return {
                    ...prev,
                    images: newImages.join(', ')
                };
            });
            toast.success(`${uploadedUrls.length} image(s) uploaded successfully!`);
        } catch (error: any) {
            console.error("Upload failed", error);
            toast.error('Upload failed');
        } finally {
            setIsUploading(false);
        }
    };

    const removeImage = (urlToRemove: string) => {
        setFormData(prev => {
            const currentImages = prev.images.split(',').map(img => img.trim()).filter(img => img !== '');
            const filteredImages = currentImages.filter(url => url !== urlToRemove);
            return {
                ...prev,
                images: filteredImages.join(', ')
            };
        });
    };

    const handleAddProduct = async () => {
        if (!formData.title || !formData.price || !formData.condition || !formData.location || !formData.description) {
            toast.error("Please fill all required fields");
            return;
        }

        try {
            const imagesArr = formData.images.split(',').map(img => img.trim()).filter(img => img !== '');
            const payload = {
                ...formData,
                price: Number(formData.price),
                images: imagesArr,
                image: imagesArr[0] || 'https://via.placeholder.com/300',
                sellerName: 'Admin'
            };

            if (editingProduct) {
                const { data } = await ResaleService.update(editingProduct._id, payload);
                setProducts(products.map(p => p._id === editingProduct._id ? data : p));
                toast.success("Listing updated successfully!");
            } else {
                const { data } = await ResaleService.create(payload);
                setProducts([data, ...products]);
                toast.success("Resale listing created successfully!");
            }

            handleCloseModal();
        } catch (error: any) {
            console.error(error);
            toast.error(editingProduct ? "Failed to update listing" : "Failed to create listing");
        }
    };

    const handleDeleteProduct = async (id: string) => {
        if (window.confirm("Delete this listing?")) {
            try {
                await ResaleService.delete(id);
                setProducts(products.filter(p => p._id !== id));
                toast.success("Listing deleted successfully");
            } catch (error) {
                toast.error("Failed to delete listing");
            }
        }
    };

    const handleEditProduct = (product: any) => {
        setEditingProduct(product);
        setFormData({
            title: product.title || '',
            price: product.price?.toString() || '',
            condition: product.condition || 'LIKE NEW',
            location: product.location || '',
            description: product.description || '',
            images: Array.isArray(product.images) ? product.images.join(', ') : '',
            mobile: product.mobile || ''
        });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
        setFormData({
            title: '',
            price: '',
            condition: 'LIKE NEW',
            location: '',
            description: '',
            images: '',
            mobile: ''
        });
    };

    const menuItems = [
        { name: 'Overview', icon: <DashboardIcon sx={{ fontSize: 20 }} />, path: '/admin/dashboard' },
        { name: 'Retail', icon: <StoreIcon sx={{ fontSize: 20 }} />, path: '/admin/retail' },
        { name: 'Wholesale', icon: <WarehouseIcon sx={{ fontSize: 20 }} />, path: '/admin/wholesale' },
        { name: 'Q-Commerce', icon: <FlashOnIcon sx={{ fontSize: 20 }} />, path: '/admin/quick' },
        { name: 'Resale', icon: <AutorenewIcon sx={{ fontSize: 20 }} />, path: '/admin/resale', active: true },
        { name: 'Freelance', icon: <WorkOutlineIcon sx={{ fontSize: 20 }} />, path: '/admin/freelance' },
    ];

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'white' }}>
            {/* Sidebar */}
            <Box sx={{ width: 260, bgcolor: 'white', borderRight: '1px solid #f1f5f9', p: 3, display: 'flex', flexDirection: 'column', height: '100vh', position: 'sticky', top: 0 }}>
                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 5, px: 1 }}>
                    <Box sx={{ bgcolor: 'black', p: 0.8, borderRadius: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box component="span" sx={{ color: 'white', fontWeight: 900, fontSize: '1.2rem', lineHeight: 1 }}>R</Box>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.25rem', color: '#1e293b' }}>retails</Typography>
                </Stack>

                <List disablePadding sx={{ flexGrow: 1 }}>
                    {menuItems.map((item) => (
                        <ListItemButton
                            key={item.name}
                            onClick={() => !item.active && navigate(item.path)}
                            sx={{
                                mb: 1,
                                borderRadius: 3,
                                bgcolor: item.active ? '#CFE8EC' : 'transparent',
                                color: item.active ? '#1e293b' : '#64748b',
                                '&:hover': { bgcolor: item.active ? '#CFE8EC' : '#f8fafc' },
                                py: 1.2,
                                px: 2
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 35, color: item.active ? '#1e293b' : '#64748b' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.name}
                                primaryTypographyProps={{ fontWeight: item.active ? 700 : 500, fontSize: '0.95rem' }}
                            />
                        </ListItemButton>
                    ))}
                </List>

                <Box sx={{ mt: 'auto', pt: 2 }}>

                    <Stack onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('userRole'); navigate('/admin/login'); }} direction="row" alignItems="center" spacing={2} sx={{ px: 2, cursor: 'pointer', color: '#ef4444' }}>
                        <ExitToAppIcon sx={{ fontSize: 20 }} />
                        <Typography variant="body2" fontWeight={600}>Leave</Typography>
                    </Stack>
                </Box>
            </Box>

            {/* Main Content */}
            <Box sx={{ flexGrow: 1, p: 4, bgcolor: '#f8fafc', overflow: 'auto' }}>
                {/* Header */}
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 4 }}>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b', mb: 0.5 }}>Resale Management</Typography>
                        <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>Track and manage your community resale marketplace.</Typography>
                    </Box>
                    <Stack direction="row" spacing={2}>

                        <Button
                            variant="contained"
                            onClick={() => setIsModalOpen(true)}
                            startIcon={<AddIcon />}
                            sx={{
                                bgcolor: '#CFE8EC',
                                color: '#1e293b',
                                borderRadius: 3,
                                px: 3,
                                fontWeight: 700,
                                textTransform: 'none',
                                boxShadow: 'none',
                                '&:hover': { bgcolor: '#b8dbe2', boxShadow: 'none' }
                            }}
                        >
                            Add Listing
                        </Button>
                    </Stack>
                </Stack>

                {/* Recently Listed Items */}
                <Box sx={{ mb: 6 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b' }}>Recently Listed Items</Typography>
                            <Chip label={`${products.length} Items`} size="small" sx={{ bgcolor: '#f1f5f9', fontWeight: 800, color: '#64748b' }} />
                        </Stack>
                        <Button onClick={fetchProducts} variant="text" sx={{ color: '#64748b', fontWeight: 700, cursor: 'pointer', textTransform: 'none' }}>Refresh</Button>
                    </Stack>

                    <Grid container spacing={3}>
                        {products.map((item, i) => (
                            <Grid key={item._id || i} size={{ xs: 12, md: 4 }}>
                                <Paper elevation={0} sx={{ p: 2, borderRadius: 5, bgcolor: 'white', border: '1px solid #f1f5f9' }}>
                                    <Stack direction="row" spacing={2}>
                                        <Box sx={{ width: 100, height: 100, borderRadius: 4, overflow: 'hidden', bgcolor: '#f8fafc' }}>
                                            <Box component="img" src={item.images?.[0] || 'https://via.placeholder.com/150'} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </Box>
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 0.5 }}>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1e293b' }}>{item.title}</Typography>
                                                <Stack direction="row" spacing={1}>
                                                    <IconButton size="small" onClick={() => handleEditProduct(item)} sx={{ color: '#94a3b8' }}><EditIcon sx={{ fontSize: 16 }} /></IconButton>
                                                    <IconButton size="small" onClick={() => handleDeleteProduct(item._id)} sx={{ color: '#ef4444' }}><DeleteIcon sx={{ fontSize: 16 }} /></IconButton>
                                                </Stack>
                                            </Stack>
                                            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                                                <Chip label={item.condition || 'Used'} size="small" sx={{ height: 18, fontSize: '0.6rem', fontWeight: 900, bgcolor: '#f1f5f9' }} />
                                                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700 }}>{item.location}</Typography>
                                            </Stack>
                                            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, display: 'block', mb: 1 }}>{item.description ? item.description.substring(0, 30) + '...' : 'No description'}</Typography>
                                            <Stack direction="row" alignItems="baseline" spacing={1}>
                                                <Typography variant="h6" sx={{ fontWeight: 900, color: '#1e293b' }}>₹{item.price}</Typography>
                                            </Stack>
                                        </Box>
                                    </Stack>
                                </Paper>
                            </Grid>
                        ))}
                        {products.length === 0 && !isLoading && <Typography sx={{ p: 2, color: '#94a3b8' }}>No resale items found.</Typography>}
                    </Grid>
                </Box>

                {/* Loading Indicator */}
                {isLoading && products.length === 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress sx={{ color: '#CFE8EC' }} /></Box>
                )}
            </Box>

            {/* Add Product Modal */}
            <Dialog open={isModalOpen} onClose={handleCloseModal} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 4 } }}>
                <DialogTitle sx={{ fontWeight: 800, px: 3, pt: 3 }}>{editingProduct ? 'Edit Resale Listing' : 'Add New Resale Listing'}</DialogTitle>
                <DialogContent sx={{ px: 3 }}>
                    <Stack spacing={2.5} sx={{ py: 2 }}>
                        <TextField fullWidth label="Title" variant="outlined" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />

                        <Stack direction="row" spacing={2}>
                            <TextField fullWidth type="number" label="Price (₹)" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                            <TextField fullWidth select label="Condition" value={formData.condition} onChange={(e) => setFormData({ ...formData, condition: e.target.value })} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}>
                                {['NEW', 'LIKE NEW', 'GOOD', 'FAIR'].map(cond => <MenuItem key={cond} value={cond}>{cond}</MenuItem>)}
                            </TextField>
                        </Stack>

                        <Stack direction="row" spacing={2}>
                            <TextField fullWidth label="Location" placeholder="e.g. San Francisco, CA" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                            <TextField fullWidth label="Contact Mobile" value={formData.mobile} onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                        </Stack>
                        <TextField fullWidth multiline rows={3} label="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />

                        <Box sx={{ mt: 1 }}>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b', mb: 1, display: 'block' }}>
                                PRODUCT IMAGES ({formData.images ? formData.images.split(',').length : 0}/3)
                            </Typography>
                            <Stack direction="row" spacing={2} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
                                {formData.images.split(',').map((img, idx) => {
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
                                disabled={isUploading || (formData.images ? formData.images.split(',').length >= 3 : false)}
                                sx={{ borderRadius: 2, textTransform: 'none', py: 1.5, borderStyle: 'dashed', borderWidth: 2 }}
                            >
                                {isUploading ? 'Uploading...' : 'Upload Images (Max 3)'}
                                <input type="file" hidden accept="image/*" multiple onChange={handleFileUpload} />
                            </Button>
                        </Box>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 3, pt: 1 }}>
                    <Button onClick={handleCloseModal} sx={{ color: '#64748b', fontWeight: 600 }}>Cancel</Button>
                    <Button variant="contained" onClick={handleAddProduct} sx={{ bgcolor: 'black', color: 'white', borderRadius: 3, px: 4, fontWeight: 700, '&:hover': { bgcolor: '#1e293b' } }}>{editingProduct ? 'Update Listing' : 'Confirm Entry'}</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ResaleManagement;
