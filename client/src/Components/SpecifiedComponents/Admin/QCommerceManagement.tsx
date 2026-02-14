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
    InputAdornment,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    LinearProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CircularProgress,
    MenuItem,
    Chip,
    IconButton
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
import RefreshIcon from '@mui/icons-material/Refresh';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import ThemeIcon from '@mui/icons-material/Brightness4';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { QProductService, OrderService, UploadService } from '../../../services/api';
import { toast } from 'react-toastify';

const QCommerceManagement = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<any[]>([]);
    const [orders, setOrders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    // Create Product Modal State (Retail-like)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [newProduct, setNewProduct] = useState({
        title: '',
        brand: '',
        category: '',
        price: '',
        mrp: '',
        discount: '',
        stock: '',
        unit: '',
        description: '',
        images: '' // comma separated URLs
    });
    const [isUploading, setIsUploading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        fetchProducts();
        fetchOrders();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await QProductService.getAll();
            setProducts(data);
        } catch (error) {
            console.error("Failed to fetch Q-commerce products", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchOrders = async () => {
        try {
            const { data } = await OrderService.getAll();
            // Filter or just use all orders for now
            setOrders(data);
        } catch (error) {
            console.error("Failed to fetch orders", error);
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
                const existingImages = prev.images
                    ? prev.images.split(',').map((img: string) => img.trim()).filter((img: string) => img !== '')
                    : [];
                const nextImages = [...existingImages, ...uploadedUrls];
                return { ...prev, images: nextImages.join(', ') };
            });
            toast.success(`${uploadedUrls.length} image(s) uploaded successfully!`);
        } catch (error: any) {
            toast.error(`Upload failed: ${error.response?.data?.message || error.message}`);
        } finally {
            setIsUploading(false);
        }
    };

    const removeImage = (urlToRemove: string) => {
        setNewProduct(prev => {
            const currentImages = prev.images
                .split(',')
                .map((img: string) => img.trim())
                .filter((img: string) => img !== '');
            const filteredImages = currentImages.filter((url: string) => url !== urlToRemove);
            return { ...prev, images: filteredImages.join(', ') };
        });
    };

    const handleDeleteProduct = async (id: string) => {
        if (window.confirm("Delete this Q-Commerce product?")) {
            try {
                await QProductService.delete(id);
                setProducts(products.filter((p: any) => p._id !== id));
                toast.success("Product deleted successfully");
            } catch (error) {
                toast.error("Failed to delete product");
            }
        }
    };

    const handleEditProduct = (product: any) => {
        setEditingProduct(product);
        setNewProduct({
            title: product.title || '',
            brand: product.brand || '',
            category: product.category || '',
            price: product.price?.toString() || '',
            mrp: product.mrp?.toString() || '',
            discount: product.discount?.toString() || '',
            stock: product.stock?.toString() || '',
            unit: product.unit || '',
            description: product.description || '',
            images: Array.isArray(product.images) ? product.images.join(', ') : (product.image || '')
        });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
        setNewProduct({
            title: '', brand: '', category: '', price: '', mrp: '', discount: '', stock: '', unit: '', description: '', images: ''
        });
    };

    const handleUpdateProduct = async () => {
        if (!editingProduct) return;

        // Validate required fields
        if (!newProduct.title.trim()) {
            toast.error('Product title is required');
            return;
        }
        if (!newProduct.brand.trim()) {
            toast.error('Brand is required');
            return;
        }
        if (!newProduct.category.trim()) {
            toast.error('Category is required');
            return;
        }
        if (!newProduct.price || Number(newProduct.price) <= 0) {
            toast.error('Valid price is required');
            return;
        }
        if (!newProduct.mrp || Number(newProduct.mrp) <= 0) {
            toast.error('Valid MRP is required');
            return;
        }

        setIsCreating(true);
        try {
            const images = newProduct.images
                .split(',')
                .map((img: string) => img.trim())
                .filter((img: string) => img !== '');

            const payload = {
                title: newProduct.title.trim(),
                brand: newProduct.brand.trim(),
                category: newProduct.category.trim(),
                price: Number(newProduct.price),
                mrp: Number(newProduct.mrp),
                discount: newProduct.discount === '' ? 0 : Number(newProduct.discount),
                stock: newProduct.stock === '' ? 0 : Number(newProduct.stock),
                unit: newProduct.unit.trim() || undefined,
                description: newProduct.description.trim() || undefined,
                image: images[0] || 'https://via.placeholder.com/600',
                images
            };

            const { data } = await QProductService.update(editingProduct._id, payload);
            setProducts(products.map((p: any) => p._id === editingProduct._id ? data : p));
            handleCloseModal();
            toast.success('Product updated successfully!');
        } catch (error: any) {
            console.error('Failed to update product:', error);
            toast.error(`Failed to update: ${error.response?.data?.message || error.message}`);
        } finally {
            setIsCreating(false);
        }
    };

    const handleCreateProduct = async () => {
        // Validate required fields
        if (!newProduct.title.trim()) {
            toast.error('Product title is required');
            return;
        }
        if (!newProduct.brand.trim()) {
            toast.error('Brand is required');
            return;
        }
        if (!newProduct.category.trim()) {
            toast.error('Category is required');
            return;
        }
        if (!newProduct.price || Number(newProduct.price) <= 0) {
            toast.error('Valid price is required');
            return;
        }
        if (!newProduct.mrp || Number(newProduct.mrp) <= 0) {
            toast.error('Valid MRP is required');
            return;
        }

        setIsCreating(true);
        try {
            const images = newProduct.images
                .split(',')
                .map((img: string) => img.trim())
                .filter((img: string) => img !== '');

            const payload = {
                title: newProduct.title.trim(),
                brand: newProduct.brand.trim(),
                category: newProduct.category.trim(),
                price: Number(newProduct.price),
                mrp: Number(newProduct.mrp),
                discount: newProduct.discount === '' ? 0 : Number(newProduct.discount),
                stock: newProduct.stock === '' ? 0 : Number(newProduct.stock),
                unit: newProduct.unit.trim() || undefined,
                description: newProduct.description.trim() || undefined,
                image: images[0] || 'https://via.placeholder.com/600',
                images
            };

            const { data } = await QProductService.create(payload);
            setProducts([data, ...products]);
            handleCloseModal();
            toast.success('Q-Commerce product created successfully!');
        } catch (error: any) {
            console.error('Failed to create Q-Commerce product:', error);
            toast.error(`Failed to create: ${error.response?.data?.message || error.message}`);
        } finally {
            setIsCreating(false);
        }
    };

    const menuItems = [
        { name: 'Overview', icon: <DashboardIcon sx={{ fontSize: 20 }} />, path: '/admin/dashboard' },
        { name: 'Retail', icon: <StoreIcon sx={{ fontSize: 20 }} />, path: '/admin/retail' },
        { name: 'Wholesale', icon: <WarehouseIcon sx={{ fontSize: 20 }} />, path: '/admin/wholesale' },
        { name: 'Q-Commerce', icon: <FlashOnIcon sx={{ fontSize: 20 }} />, path: '/admin/quick', active: true },
        { name: 'Resale', icon: <AutorenewIcon sx={{ fontSize: 20 }} />, path: '/admin/resale' },
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
                                bgcolor: item.active ? '#B4D5DC' : 'transparent',
                                color: item.active ? 'black' : '#64748b',
                                '&:hover': { bgcolor: item.active ? '#B4D5DC' : '#f8fafc' },
                                py: 1.2,
                                px: 2
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 35, color: item.active ? 'black' : '#64748b' }}>
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
                        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b', mb: 0.5 }}>Q-Commerce Inventory</Typography>
                        <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>Real-time rapid delivery management</Typography>
                    </Box>
                    <Stack direction="row" spacing={2}>

                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => {
                                handleCloseModal(); // Reset state for new product
                                setIsModalOpen(true);
                            }}
                            sx={{
                                bgcolor: '#B4D5DC',
                                color: 'black',
                                borderRadius: 3,
                                px: 3,
                                fontWeight: 700,
                                textTransform: 'none',
                                boxShadow: 'none',
                                '&:hover': { bgcolor: '#9cc8d1', boxShadow: 'none' }
                            }}
                        >
                            Create Entry
                        </Button>
                    </Stack>
                </Stack>

                {/* Stats Cards */}
                <Grid container spacing={3} sx={{ mb: 6 }}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Paper elevation={0} sx={{ p: 3, borderRadius: 5, bgcolor: 'white', display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ p: 1, bgcolor: '#f1f5f9', borderRadius: 2 }}><StoreIcon sx={{ color: '#3b82f6' }} /></Box>
                            <Box sx={{ ml: 2 }}>
                                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, display: 'block', mb: 0.5 }}>Total Products</Typography>
                                <Typography variant="h4" sx={{ fontWeight: 900, color: '#1e293b' }}>{products.length}</Typography>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Paper elevation={0} sx={{ p: 3, borderRadius: 5, bgcolor: 'white', display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ p: 1, bgcolor: '#f0fdf4', borderRadius: 2 }}><ElectricBoltIcon sx={{ color: '#22c55e' }} /></Box>
                            <Box sx={{ ml: 2 }}>
                                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, display: 'block', mb: 0.5 }}>Total Orders</Typography>
                                <Typography variant="h4" sx={{ fontWeight: 900, color: '#1e293b' }}>{orders.length}</Typography>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Instant Inventory */}
                <Box sx={{ mb: 6 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b' }}>Instant Inventory</Typography>
                            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700 }}>{products.length} Items</Typography>
                        </Stack>
                        <Button onClick={fetchProducts} startIcon={<RefreshIcon />} sx={{ color: '#94a3b8', textTransform: 'none', fontWeight: 700 }}>Refresh Feed</Button>
                    </Stack>

                    <Grid container spacing={3}>
                        {(products.length > 0 ? products : [])
                            .filter((p: any) =>
                                !searchQuery
                                    ? true
                                    : String(p.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    String(p.category || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    String(p.brand || '').toLowerCase().includes(searchQuery.toLowerCase())
                            )
                            .map((item, i) => (
                                <Grid key={item._id || i} size={{ xs: 12, sm: 6, md: 3 }}>
                                    <Paper elevation={0} sx={{ borderRadius: 5, overflow: 'hidden', bgcolor: 'white', border: '1px solid #f1f5f9', height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <Box sx={{ position: 'relative', height: 180 }}>
                                            <Box component="img" src={item.image || 'https://via.placeholder.com/300'} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            <Box sx={{ position: 'absolute', top: 12, left: 12, bgcolor: '#22c55e', px: 1, py: 0.5, borderRadius: 1.5 }}>
                                                <Typography sx={{ color: 'white', fontSize: '0.65rem', fontWeight: 900 }}>INSTOCK</Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={{ p: 2.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1e293b', mb: 0.5 }}>{item.title}</Typography>
                                            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, display: 'block', mb: 2 }}>{item.category}</Typography>

                                            <Stack spacing={2} sx={{ mb: 3, mt: 'auto' }}>
                                                <Box>
                                                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                                                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>Stock Level</Typography>
                                                        <Typography variant="caption" sx={{ color: '#1e293b', fontWeight: 800 }}>{item.stock || 'N/A'}</Typography>
                                                    </Stack>
                                                    <LinearProgress variant="determinate" value={item.stock ? Math.min(100, item.stock) : 50} sx={{ height: 6, borderRadius: 3, bgcolor: '#f1f5f9', '& .MuiLinearProgress-bar': { bgcolor: '#22c55e', borderRadius: 3 } }} />
                                                </Box>
                                                <Box>
                                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>Price: ₹{item.price}</Typography>
                                                        <Stack direction="row" spacing={0.5}>
                                                            <IconButton size="small" onClick={() => handleEditProduct(item)} sx={{ color: '#94a3b8', '&:hover': { color: '#1e293b', bgcolor: '#f1f5f9' } }}>
                                                                <EditIcon fontSize="small" />
                                                            </IconButton>
                                                            <IconButton size="small" onClick={() => handleDeleteProduct(item._id)} sx={{ color: '#fee2e2', '&:hover': { color: '#ef4444', bgcolor: '#fef2f2' } }}>
                                                                <DeleteIcon fontSize="small" />
                                                            </IconButton>
                                                        </Stack>
                                                    </Stack>
                                                </Box>
                                            </Stack>
                                        </Box>
                                    </Paper>
                                </Grid>
                            ))}
                        {products.length === 0 && <Typography sx={{ p: 2, color: '#94a3b8' }}>No inventory items found.</Typography>}
                    </Grid>
                </Box>

                {/* Live Order Feed */}
                <Box>
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b' }}>Live Order Feed</Typography>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Box sx={{ width: 8, height: 8, bgcolor: '#22c55e', borderRadius: '50%' }} />
                            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700 }}>Tracking {orders.length} active orders</Typography>
                        </Stack>
                    </Stack>

                    <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 5, border: '1px solid #f1f5f9' }}>
                        <Table>
                            <TableHead sx={{ bgcolor: '#fcfdfe' }}>
                                <TableRow>
                                    <TableCell sx={{ color: '#94a3b8', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', py: 2.5 }}>Order ID</TableCell>
                                    <TableCell sx={{ color: '#94a3b8', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase' }}>Items</TableCell>
                                    <TableCell sx={{ color: '#94a3b8', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase' }}>Total Amount</TableCell>
                                    <TableCell sx={{ color: '#94a3b8', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase' }}>Date</TableCell>
                                    <TableCell sx={{ color: '#94a3b8', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', textAlign: 'right' }}>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map((order, i) => (
                                    <TableRow key={i} sx={{ '&:last-child td': { border: 0 } }}>
                                        <TableCell sx={{ fontWeight: 800, color: '#64748b', fontSize: '0.85rem' }}>{order._id}</TableCell>
                                        <TableCell>
                                            <Typography variant="body2" sx={{ fontWeight: 800, color: '#1e293b' }}>
                                                {order.items?.length || 0} Items
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ color: '#64748b', fontWeight: 600, fontSize: '0.85rem' }}>₹{order.totalAmount}</TableCell>
                                        <TableCell sx={{ color: '#1e293b', fontWeight: 800, fontSize: '0.85rem' }}>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                        <TableCell sx={{ textAlign: 'right' }}>
                                            <Box sx={{ display: 'inline-block', bgcolor: '#f8fafc', px: 1.5, py: 0.5, borderRadius: 2 }}>
                                                <Typography sx={{ color: '#1e293b', fontWeight: 900, fontSize: '0.65rem' }}>{order.status}</Typography>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {orders.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5} sx={{ textAlign: 'center', color: '#94a3b8', py: 3 }}>No recent orders found.</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

                {/* Create Q-Commerce Product Modal (Retail-like) */}
                <Dialog
                    open={isModalOpen}
                    onClose={handleCloseModal}
                    maxWidth="sm"
                    fullWidth
                    PaperProps={{ sx: { borderRadius: 6, p: 1 } }}
                >
                    <DialogTitle sx={{ fontWeight: 900, fontSize: '1.5rem', pb: 1 }}>{editingProduct ? 'Edit Product' : 'Add Q-Commerce Product'}</DialogTitle>
                    <DialogContent>
                        <Typography variant="body2" sx={{ color: '#94a3b8', mb: 3, fontWeight: 500 }}>
                            Fill the details to add a product in Q‑Commerce.
                        </Typography>
                        <Stack spacing={3}>
                            <TextField
                                fullWidth
                                label="Product Title"
                                value={newProduct.title}
                                onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                                variant="outlined"
                                InputProps={{ sx: { borderRadius: 3 } }}
                            />

                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                                <TextField
                                    fullWidth
                                    label="Brand"
                                    value={newProduct.brand}
                                    onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                                    variant="outlined"
                                    InputProps={{ sx: { borderRadius: 3 } }}
                                />
                                <TextField
                                    fullWidth
                                    select
                                    label="Category"
                                    value={newProduct.category}
                                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                    variant="outlined"
                                    InputProps={{ sx: { borderRadius: 3 } }}
                                >
                                    {['Fresh Fruits', 'Dairy Eggs', 'Snacks', 'Personal', 'Beverages', 'Household'].map(cat => (
                                        <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                                    ))}
                                </TextField>
                            </Stack>

                            <Grid container spacing={3}>
                                <Grid size={{ xs: 6 }}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        label="Price (₹)"
                                        value={newProduct.price}
                                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                        variant="outlined"
                                        InputProps={{ sx: { borderRadius: 3 } }}
                                    />
                                </Grid>
                                <Grid size={{ xs: 6 }}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        label="MRP (₹)"
                                        value={newProduct.mrp}
                                        onChange={(e) => setNewProduct({ ...newProduct, mrp: e.target.value })}
                                        variant="outlined"
                                        InputProps={{ sx: { borderRadius: 3 } }}
                                    />
                                </Grid>
                                <Grid size={{ xs: 6 }}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        label="Discount (%)"
                                        value={newProduct.discount}
                                        onChange={(e) => setNewProduct({ ...newProduct, discount: e.target.value })}
                                        variant="outlined"
                                        InputProps={{ sx: { borderRadius: 3 } }}
                                    />
                                </Grid>
                                <Grid size={{ xs: 6 }}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        label="Stock"
                                        value={newProduct.stock}
                                        onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                                        variant="outlined"
                                        InputProps={{ sx: { borderRadius: 3 } }}
                                    />
                                </Grid>
                            </Grid>

                            <TextField
                                fullWidth
                                label="Unit (optional)"
                                placeholder="e.g. 500g, 1L"
                                value={newProduct.unit}
                                onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                                variant="outlined"
                                InputProps={{ sx: { borderRadius: 3 } }}
                            />

                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                label="Description (optional)"
                                value={newProduct.description}
                                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                variant="outlined"
                                InputProps={{ sx: { borderRadius: 3 } }}
                            />

                            <Box sx={{ p: 3, border: '2px dashed #f1f5f9', borderRadius: 4, bgcolor: '#f8fafc', textAlign: 'center' }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1e293b', mb: 2 }}>
                                    Product Images ({newProduct.images ? newProduct.images.split(',').filter((x: string) => x.trim()).length : 0}/3)
                                </Typography>
                                <Stack direction="row" spacing={1.5} sx={{ mb: 2.5, justifyContent: 'center' }}>
                                    {newProduct.images.split(',').map((img: string, idx: number) => {
                                        const trimmedImg = img.trim();
                                        if (!trimmedImg) return null;
                                        return (
                                            <Box key={idx} sx={{ position: 'relative', width: 70, height: 70, borderRadius: 2.5, overflow: 'hidden', border: '1.5px solid #e2e8f0' }}>
                                                <Box component="img" src={trimmedImg} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                <IconButton
                                                    size="small"
                                                    onClick={() => removeImage(trimmedImg)}
                                                    sx={{
                                                        position: 'absolute',
                                                        top: 2,
                                                        right: 2,
                                                        bgcolor: 'rgba(255,255,255,0.9)',
                                                        p: 0.5,
                                                        '&:hover': { bgcolor: 'white' }
                                                    }}
                                                >
                                                    <DeleteIcon sx={{ fontSize: 13, color: '#ef4444' }} />
                                                </IconButton>
                                            </Box>
                                        );
                                    })}
                                </Stack>
                                <Button
                                    variant="text"
                                    component="label"
                                    startIcon={isUploading ? <CircularProgress size={16} /> : <CloudUploadIcon />}
                                    disabled={isUploading || (newProduct.images ? newProduct.images.split(',').filter((x: string) => x.trim()).length >= 3 : false)}
                                    sx={{ textTransform: 'none', fontWeight: 700, borderRadius: 2, color: '#1e293b' }}
                                >
                                    {isUploading ? 'Uploading...' : 'Click to upload images'}
                                    <input type="file" hidden accept="image/*" multiple onChange={handleFileUpload} />
                                </Button>
                            </Box>
                        </Stack>
                    </DialogContent>
                    <DialogActions sx={{ p: 4 }}>
                        <Button onClick={handleCloseModal} sx={{ color: '#94a3b8', textTransform: 'none', fontWeight: 700, mr: 2 }}>Cancel</Button>
                        <Button
                            variant="contained"
                            disabled={isCreating}
                            onClick={editingProduct ? handleUpdateProduct : handleCreateProduct}
                            sx={{ bgcolor: '#1e293b', color: 'white', borderRadius: 3, textTransform: 'none', px: 5, py: 1.2, fontWeight: 800, '&:hover': { bgcolor: '#000' } }}
                        >
                            {isCreating ? <CircularProgress size={24} color="inherit" /> : (editingProduct ? 'Update Product' : 'Create Product')}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
};

export default QCommerceManagement;
