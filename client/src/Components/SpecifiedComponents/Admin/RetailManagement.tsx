import { useEffect, useState } from 'react';
import { Box, Typography, Paper, Stack, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Grid, Chip, TextField, InputAdornment, CircularProgress, Button, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem } from '@mui/material';
import {
    Dashboard as DashboardIcon,
    Store as StoreIcon,
    Warehouse as WarehouseIcon,
    FlashOn as FlashOnIcon,
    Autorenew as AutorenewIcon,
    WorkOutline as WorkOutlineIcon,
    ExitToApp as ExitToAppIcon,
    Search as SearchIcon,
    MoreVert as MoreVertIcon,
    Delete as DeleteIcon,
    Add as AddIcon,
    Edit as EditIcon,
    CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { OrderService, ProductService, UploadService } from '../../../services/api';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const RetailManagement = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [view, setView] = useState<'orders' | 'products'>('orders');

    // Add Product Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        title: '', price: '', category: '', brand: '', stock: '', description: '', images: ''
    });
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [ordersRes, productsRes] = await Promise.all([
                OrderService.getAll(),
                ProductService.getAll()
            ]);
            setOrders(ordersRes.data);
            setProducts(productsRes.data.products || productsRes.data);
        } catch (error) {
            console.error("Failed to fetch retail data", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            console.log("Starting upload for file:", file.name);
            const { data } = await UploadService.uploadImage(file);
            console.log("Upload success:", data);
            setNewProduct(prev => ({
                ...prev,
                images: prev.images ? `${prev.images}, ${data.url}` : data.url
            }));
            alert('Image uploaded successfully!');
        } catch (error: any) {
            console.error("Upload failed detailed:", error.response?.data || error.message);
            alert(`Upload failed: ${error.response?.data?.message || error.message}`);
        } finally {
            setIsUploading(false);
        }
    };

    const handleAddProduct = async () => {
        try {
            const productData = {
                ...newProduct,
                price: Number(newProduct.price),
                stock: Number(newProduct.stock),
                images: newProduct.images.split(',').map(img => img.trim()).filter(img => img !== '')
            };
            const { data } = await ProductService.create(productData);
            setProducts([data, ...products]);
            setIsModalOpen(false);
            setNewProduct({ title: '', price: '', category: '', brand: '', stock: '', description: '', images: '' });
        } catch (error: any) {
            console.error("Failed to create product:", error.response?.data || error.message);
            alert(`Failed to create product: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleDeleteProduct = async (id: string) => {
        if (window.confirm("Delete this retail product?")) {
            try {
                await ProductService.delete(id);
                setProducts(products.filter(p => p._id !== id));
            } catch (error) {
                alert("Failed to delete product");
            }
        }
    };

    const menuItems = [
        { name: 'Overview', icon: <DashboardIcon />, path: '/admin/dashboard' },
        { name: 'Retail', icon: <StoreIcon />, path: '/admin/retail', active: true },
        { name: 'Wholesale', icon: <WarehouseIcon />, path: '/admin/wholesale' },
        { name: 'Q-Commerce', icon: <FlashOnIcon />, path: '/admin/quick' },
        { name: 'Resale', icon: <AutorenewIcon />, path: '/admin/resale' },
        { name: 'Freelance', icon: <WorkOutlineIcon />, path: '/admin/freelance' },
    ];

    const filteredOrders = orders.filter(order =>
        order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user?.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const pendingOrders = filteredOrders.filter(o => !o.isPaid);
    const completedOrders = filteredOrders.filter(o => o.isPaid);

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'white' }}>
            {/* Sidebar */}
            <Box sx={{ width: 260, bgcolor: 'white', borderRight: '1px solid #e2e8f0', p: 3, display: 'flex', flexDirection: 'column', height: '100vh', position: 'sticky', top: 0 }}>
                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 5, px: 2 }}>
                    <Box sx={{ bgcolor: '#bef264', p: 0.5, borderRadius: 1, display: 'flex' }}>
                        <StoreIcon sx={{ color: 'black' }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>retails</Typography>
                </Stack>

                <List disablePadding>
                    {menuItems.map((item) => (
                        <ListItemButton
                            key={item.name}
                            onClick={() => item.path !== '/admin/retail' && navigate(item.path)}
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
            <Box sx={{ flexGrow: 1, p: 5, overflow: 'auto', bgcolor: 'white' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 5 }}>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>Retail Management</Typography>
                        <Typography variant="body1" sx={{ color: '#64748b' }}>Manage orders and products</Typography>
                    </Box>
                    <TextField
                        placeholder={`Search ${view}...`}
                        size="small"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#94a3b8' }} /></InputAdornment>
                        }}
                        sx={{
                            width: 300,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 3,
                                bgcolor: '#f8fafc',
                                '& fieldset': { borderColor: '#e2e8f0' }
                            }
                        }}
                    />
                </Stack>

                <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                    <Button
                        variant={view === 'orders' ? 'contained' : 'outlined'}
                        onClick={() => setView('orders')}
                        sx={{ borderRadius: 2, bgcolor: view === 'orders' ? 'black' : 'transparent', color: view === 'orders' ? 'white' : 'black', borderColor: 'black' }}
                    >
                        Orders
                    </Button>
                    <Button
                        variant={view === 'products' ? 'contained' : 'outlined'}
                        onClick={() => setView('products')}
                        sx={{ borderRadius: 2, bgcolor: view === 'products' ? 'black' : 'transparent', color: view === 'products' ? 'white' : 'black', borderColor: 'black' }}
                    >
                        Products
                    </Button>
                </Stack>

                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
                        <CircularProgress sx={{ color: '#bef264' }} />
                    </Box>
                ) : view === 'orders' ? (
                    <>
                        {/* Pending Orders */}
                        <Box sx={{ mb: 5 }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Order List (Pending)</Typography>
                                    <Chip label={`${pendingOrders.length} Pending`} size="small" sx={{ bgcolor: '#fee2e2', color: '#ef4444', fontWeight: 600, borderRadius: 1.5 }} />
                                </Stack>
                            </Stack>

                            <Stack spacing={2}>
                                {pendingOrders.map((order) => (
                                    <Paper
                                        key={order._id}
                                        elevation={0}
                                        sx={{
                                            p: 2,
                                            borderRadius: 3,
                                            border: '1px solid #e2e8f0',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        }}
                                    >
                                        <Stack direction="row" alignItems="center" spacing={3}>
                                            <Box sx={{ width: 48, height: 48, bgcolor: '#f1f5f9', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <StoreIcon sx={{ color: '#94a3b8' }} />
                                            </Box>
                                            <Box>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{order.user?.username || 'Guest'}</Typography>
                                                <Typography variant="caption" sx={{ color: '#94a3b8' }}>ID: {order._id.substring(0, 10)}...</Typography>
                                            </Box>
                                        </Stack>
                                        <Stack direction="row" alignItems="center" spacing={4}>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>₹{order.totalPrice}</Typography>
                                            <Chip
                                                label="PENDING"
                                                size="small"
                                                sx={{
                                                    bgcolor: '#f1f5f9',
                                                    color: '#64748b',
                                                    fontWeight: 800,
                                                    fontSize: '0.65rem',
                                                    height: 24,
                                                    borderRadius: 1.5
                                                }}
                                            />
                                            <IconButton size="small"><MoreVertIcon sx={{ color: '#94a3b8' }} /></IconButton>
                                        </Stack>
                                    </Paper>
                                ))}
                                {pendingOrders.length === 0 && <Typography color="textSecondary">No pending orders.</Typography>}
                            </Stack>
                        </Box>

                        {/* Completed Orders */}
                        <Box>
                            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>Completed Orders</Typography>
                                <Chip label={`${completedOrders.length} Total`} size="small" sx={{ bgcolor: '#e2e8f0', color: '#64748b', fontWeight: 600, borderRadius: 1.5 }} />
                            </Stack>

                            <Stack spacing={2}>
                                {completedOrders.map((order) => (
                                    <Paper
                                        key={order._id}
                                        elevation={0}
                                        sx={{
                                            p: 2,
                                            borderRadius: 3,
                                            border: '1px solid #e2e8f0',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        }}
                                    >
                                        <Stack direction="row" alignItems="center" spacing={3}>
                                            <Box sx={{ width: 48, height: 48, bgcolor: '#f1f5f9', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <CheckCircleIcon sx={{ color: '#84cc16' }} />
                                            </Box>
                                            <Box>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{order.user?.username || 'Guest'}</Typography>
                                                <Typography variant="caption" sx={{ color: '#94a3b8' }}>ID: {order._id.substring(0, 10)}...</Typography>
                                            </Box>
                                        </Stack>
                                        <Stack direction="row" alignItems="center" spacing={4}>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>₹{order.totalPrice}</Typography>
                                            <Chip
                                                label="PAID"
                                                size="small"
                                                sx={{
                                                    bgcolor: '#bef264',
                                                    color: 'black',
                                                    fontWeight: 800,
                                                    fontSize: '0.65rem',
                                                    height: 24,
                                                    borderRadius: 1.5
                                                }}
                                            />
                                            <IconButton size="small"><MoreVertIcon sx={{ color: '#94a3b8' }} /></IconButton>
                                        </Stack>
                                    </Paper>
                                ))}
                                {completedOrders.length === 0 && <Typography color="textSecondary">No completed orders.</Typography>}
                            </Stack>
                        </Box>
                    </>
                ) : (
                    <Box>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 800 }}>Product Inventory</Typography>
                            <Button variant="contained" onClick={() => setIsModalOpen(true)} startIcon={<AddIcon />} sx={{ bgcolor: 'black', color: 'white', borderRadius: 2 }}>
                                New Product
                            </Button>
                        </Stack>
                        <Grid container spacing={3}>
                            {filteredProducts.map((product) => (
                                <Grid key={product._id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                                    <Paper sx={{ p: 2, borderRadius: 3, border: '1px solid #f1f5f9', height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <Box component="img" src={product.images?.[0]} sx={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 2, mb: 2, bgcolor: '#f8fafc' }} />
                                        <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{product.title}</Typography>
                                        <Typography variant="caption" color="textSecondary">{product.brand}</Typography>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 'auto', pt: 2 }}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>₹{product.price}</Typography>
                                            <Stack direction="row" spacing={1}>
                                                <IconButton size="small"><EditIcon fontSize="small" /></IconButton>
                                                <IconButton size="small" color="error" onClick={() => handleDeleteProduct(product._id)}><DeleteIcon fontSize="small" /></IconButton>
                                            </Stack>
                                        </Stack>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}

                {/* Add Product Modal */}
                <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="sm" fullWidth>
                    <DialogTitle sx={{ fontWeight: 800 }}>Add New Product</DialogTitle>
                    <DialogContent dividers>
                        <Stack spacing={2.5} sx={{ py: 1 }}>
                            <TextField fullWidth label="Product Title" value={newProduct.title} onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })} />
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 6 }}>
                                    <TextField fullWidth type="number" label="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
                                </Grid>
                                <Grid size={{ xs: 6 }}>
                                    <TextField fullWidth type="number" label="Stock" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} />
                                </Grid>
                            </Grid>
                            <TextField fullWidth select label="Category" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}>
                                {['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports'].map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
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
                        <Button variant="contained" onClick={handleAddProduct} sx={{ bgcolor: 'black', color: 'white', borderRadius: 2 }}>Create Product</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
};

export default RetailManagement;
