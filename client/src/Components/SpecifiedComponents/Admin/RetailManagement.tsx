import { useEffect, useState } from 'react';
import { Box, Typography, Paper, Stack, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Grid, Chip, TextField, CircularProgress, Button, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem } from '@mui/material';
import { toast } from 'react-toastify';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StoreIcon from '@mui/icons-material/Store';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import InventoryIcon from '@mui/icons-material/Inventory';
import HeadsetIcon from '@mui/icons-material/Headset';
import ChairIcon from '@mui/icons-material/Chair';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import LaptopIcon from '@mui/icons-material/Laptop';
import MonitorIcon from '@mui/icons-material/Monitor';
import { useNavigate } from 'react-router-dom';
import { OrderService, ProductService, UploadService } from '../../../services/api';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const RetailManagement = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm] = useState('');
    const [view, setView] = useState<'orders' | 'products'>('orders');

    // Add Product Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);
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
                const existingImages = prev.images ? prev.images.split(',').map((img: string) => img.trim()).filter((img: string) => img !== '') : [];
                const newImages = [...existingImages, ...uploadedUrls];
                return {
                    ...prev,
                    images: newImages.join(', ')
                };
            });
            toast.success(`${uploadedUrls.length} image(s) uploaded successfully!`);
        } catch (error: any) {
            console.error("Upload failed detailed:", error.response?.data || error.message);
            toast.error(`Upload failed: ${error.response?.data?.message || error.message}`);
        } finally {
            setIsUploading(false);
        }
    };

    const removeImage = (urlToRemove: string) => {
        setNewProduct(prev => {
            const currentImages = prev.images.split(',').map((img: string) => img.trim()).filter((img: string) => img !== '');
            const filteredImages = currentImages.filter((url: string) => url !== urlToRemove);
            return {
                ...prev,
                images: filteredImages.join(', ')
            };
        });
    };

    const handleAddProduct = async () => {
        // Validate required fields
        if (!newProduct.title.trim()) {
            toast.error('Product name is required');
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
        if (!newProduct.stock || Number(newProduct.stock) < 0) {
            toast.error('Valid stock count is required');
            return;
        }

        try {
            const images = newProduct.images.split(',').map((img: string) => img.trim()).filter((img: string) => img !== '');

            const productData = {
                title: newProduct.title.trim(),
                price: Number(newProduct.price),
                stock: Number(newProduct.stock),
                category: newProduct.category.trim(),
                brand: newProduct.brand.trim(),
                description: newProduct.description.trim() || undefined,
                images,
                image: images[0] || 'https://via.placeholder.com/600'
            };

            console.log('Creating retail product with payload:', productData);

            const { data } = await ProductService.create(productData);
            setProducts([data, ...products]);
            setIsModalOpen(false);
            setNewProduct({ title: '', price: '', category: '', brand: '', stock: '', description: '', images: '' });
            toast.success("Product created successfully!");
        } catch (error: any) {
            console.error("Failed to create product:", error.response?.data || error.message);
            toast.error(`Failed to create product: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleDeleteProduct = async (id: string) => {
        if (window.confirm("Delete this retail product?")) {
            try {
                await ProductService.delete(id);
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
            price: product.price?.toString() || '',
            category: product.category || '',
            brand: product.brand || '',
            stock: product.stock?.toString() || '',
            description: product.description || '',
            images: Array.isArray(product.images) ? product.images.join(', ') : ''
        });
        setIsModalOpen(true);
    };

    const handleUpdateProduct = async () => {
        if (!editingProduct) return;

        // Validate required fields
        if (!newProduct.title.trim()) {
            toast.error('Product name is required');
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
        if (!newProduct.stock || Number(newProduct.stock) < 0) {
            toast.error('Valid stock count is required');
            return;
        }

        try {
            const images = newProduct.images.split(',').map((img: string) => img.trim()).filter((img: string) => img !== '');

            const productData = {
                title: newProduct.title.trim(),
                price: Number(newProduct.price),
                stock: Number(newProduct.stock),
                category: newProduct.category.trim(),
                brand: newProduct.brand.trim(),
                description: newProduct.description.trim() || undefined,
                images,
                image: images[0] || 'https://via.placeholder.com/600'
            };

            console.log('Updating product with payload:', productData);

            const { data } = await ProductService.update(editingProduct._id, productData);
            setProducts(products.map((p: any) => p._id === editingProduct._id ? data : p));
            setIsModalOpen(false);
            setEditingProduct(null);
            setNewProduct({ title: '', price: '', category: '', brand: '', stock: '', description: '', images: '' });
            toast.success("Product updated successfully!");
        } catch (error: any) {
            console.error("Failed to update product:", error.response?.data || error.message);
            toast.error(`Failed to update product: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
        setNewProduct({ title: '', price: '', category: '', brand: '', stock: '', description: '', images: '' });
    };

    const menuItems = [
        { name: 'Overview', icon: <DashboardIcon sx={{ fontSize: 20 }} />, path: '/admin/dashboard' },
        { name: 'Retail', icon: <StoreIcon sx={{ fontSize: 20 }} />, path: '/admin/retail', active: true },
        { name: 'Wholesale', icon: <WarehouseIcon sx={{ fontSize: 20 }} />, path: '/admin/wholesale' },
        { name: 'Q-Commerce', icon: <FlashOnIcon sx={{ fontSize: 20 }} />, path: '/admin/quick' },
        { name: 'Resale', icon: <AutorenewIcon sx={{ fontSize: 20 }} />, path: '/admin/resale' },
        { name: 'Freelance', icon: <WorkOutlineIcon sx={{ fontSize: 20 }} />, path: '/admin/freelance' },
    ];

    const filteredOrders = (orders || []).filter((order: any) =>
        order._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user?.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredProducts = (products || []).filter((product: any) =>
        product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const pendingOrders = filteredOrders.filter((o: any) => !o.isPaid);
    const completedOrders = filteredOrders.filter((o: any) => o.isPaid);

    // Helper to get random tech icon for demo feel
    const getOrderIcon = (index: number) => {
        const icons = [<HeadsetIcon />, <ChairIcon />, <KeyboardIcon />, <LaptopIcon />, <MonitorIcon />];
        return icons[index % icons.length];
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'white' }}>
            {/* Sidebar */}
            <Box sx={{ width: 260, bgcolor: 'white', borderRight: '1px solid #f1f5f9', p: 3, display: 'flex', flexDirection: 'column', height: '100vh', position: 'sticky', top: 0 }}>
                {/* Logo Area */}
                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 6, px: 2 }}>
                    <Box sx={{ bgcolor: '#f1f5f9', p: 1, borderRadius: 2, display: 'flex' }}>
                        <InventoryIcon sx={{ color: '#1e293b', fontSize: 20 }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b' }}>retails</Typography>
                </Stack>

                <List disablePadding>
                    {menuItems.map((item) => (
                        <ListItemButton
                            key={item.name}
                            onClick={() => item.path !== '/admin/retail' && navigate(item.path)}
                            sx={{
                                mb: 1,
                                borderRadius: 3,
                                bgcolor: item.active ? '#CFE8EC' : 'transparent',
                                color: item.active ? '#1e293b' : '#64748b',
                                '&:hover': { bgcolor: item.active ? '#CFE8EC' : '#f8fafc', color: item.active ? '#1e293b' : '#314155' },
                                py: 1.2,
                                px: 2
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 35, color: item.active ? '#1e293b' : '#64748b' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.name}
                                primaryTypographyProps={{ fontWeight: item.active ? 700 : 500, fontSize: '0.9rem' }}
                            />
                        </ListItemButton>
                    ))}
                </List>

                <Box sx={{ mt: 'auto', borderTop: '1px solid #f1f5f9', pt: 3 }}>
                    <Stack onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('userRole'); navigate('/admin/login'); }} direction="row" alignItems="center" spacing={2} sx={{ px: 2, cursor: 'pointer', color: '#ef4444', '&:hover': { color: '#b91c1c' } }}>
                        <ExitToAppIcon sx={{ fontSize: 20 }} />
                        <Typography variant="body2" fontWeight={600}>Leave</Typography>
                    </Stack>
                </Box>
            </Box>

            {/* Main Content */}
            <Box sx={{ flexGrow: 1, p: 4, overflow: 'auto', bgcolor: '#f8fafc' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 6 }}>
                    <Box>
                        <Typography variant="h3" sx={{ fontWeight: 800, color: '#1e293b', letterSpacing: '-0.5px' }}>Retail Management</Typography>
                        <Typography variant="body1" sx={{ color: '#94a3b8', fontWeight: 500, mt: 0.5 }}>Track and manage your retail ecosystem</Typography>
                    </Box>
                    <Button
                        variant="contained"
                        onClick={() => setIsModalOpen(true)}
                        startIcon={<AddIcon />}
                        sx={{
                            bgcolor: '#CFE8EC',
                            color: '#1e293b',
                            borderRadius: 2.5,
                            fontWeight: 700,
                            textTransform: 'none',
                            px: 3.5,
                            py: 1.2,
                            boxShadow: 'none',
                            fontSize: '0.95rem',
                            '&:hover': { bgcolor: '#bde0e5', boxShadow: 'none' }
                        }}
                    >
                        Create Product
                    </Button>
                </Stack>

                {/* Subtle View Switcher */}
                <Stack direction="row" spacing={3} sx={{ mb: 4, px: 1 }}>
                    <Typography
                        onClick={() => setView('orders')}
                        sx={{
                            cursor: 'pointer',
                            fontWeight: 800,
                            color: view === 'orders' ? '#1e293b' : '#94a3b8',
                            fontSize: '1rem',
                            borderBottom: view === 'orders' ? '2.5px solid #1e293b' : 'none',
                            pb: 0.5,
                            transition: '0.2s'
                        }}
                    >
                        Order History
                    </Typography>
                    <Typography
                        onClick={() => setView('products')}
                        sx={{
                            cursor: 'pointer',
                            fontWeight: 800,
                            color: view === 'products' ? '#1e293b' : '#94a3b8',
                            fontSize: '1rem',
                            borderBottom: view === 'products' ? '2.5px solid #1e293b' : 'none',
                            pb: 0.5,
                            transition: '0.2s'
                        }}
                    >
                        Products
                    </Typography>
                </Stack>

                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
                        <CircularProgress sx={{ color: '#1e293b' }} />
                    </Box>
                ) : view === 'orders' ? (
                    <>
                        {/* Pending Orders */}
                        <Box sx={{ mb: 6 }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3, px: 1 }}>
                                <Stack direction="row" alignItems="center" spacing={1.5}>
                                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b' }}>Order List</Typography>
                                    <Box sx={{ bgcolor: '#f1f5f9', px: 1.5, py: 0.4, borderRadius: 2 }}>
                                        <Typography variant="caption" sx={{ color: '#1e293b', fontWeight: 800 }}>{pendingOrders.length} Pending</Typography>
                                    </Box>
                                </Stack>
                                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, cursor: 'pointer', '&:hover': { color: '#1e293b' } }}>View all</Typography>
                            </Stack>

                            <Stack spacing={1.8}>
                                {pendingOrders.map((order: any, idx: number) => (
                                    <Paper
                                        key={order._id}
                                        elevation={0}
                                        sx={{
                                            p: 3,
                                            borderRadius: 5,
                                            bgcolor: 'white',
                                            border: '1.5px solid #f8fafc',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            transition: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                            '&:hover': { boxShadow: '0 10px 25px rgba(0,0,0,0.02)', borderColor: '#f1f5f9' }
                                        }}
                                    >
                                        <Stack direction="row" alignItems="center" spacing={3}>
                                            <Box sx={{ width: 48, height: 48, bgcolor: '#f8fafc', borderRadius: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Box sx={{ color: '#94a3b8' }}>{getOrderIcon(idx)}</Box>
                                            </Box>
                                            <Box>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1e293b', mb: 0.2 }}>Order from {order.user?.username || 'Guest'}</Typography>
                                                <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 600 }}>Order #ORD-{order._id?.substring(order._id?.length - 4).toUpperCase()}</Typography>
                                            </Box>
                                        </Stack>
                                        <Stack direction="row" alignItems="center" spacing={5}>
                                            <Typography variant="h6" sx={{ fontWeight: 900, color: '#1e293b' }}>₹{order.totalPrice}</Typography>
                                            <Chip
                                                label="PENDING"
                                                sx={{
                                                    bgcolor: '#CFE8EC',
                                                    color: '#1e293b',
                                                    fontWeight: 900,
                                                    fontSize: '0.65rem',
                                                    height: 26,
                                                    borderRadius: 2,
                                                    px: 1
                                                }}
                                            />
                                            <IconButton size="small"><MoreVertIcon sx={{ color: '#cbd5e1' }} /></IconButton>
                                        </Stack>
                                    </Paper>
                                ))}
                                {pendingOrders.length === 0 && <Typography variant="body2" sx={{ color: '#94a3b8', textAlign: 'center', py: 5 }}>No pending orders.</Typography>}
                            </Stack>
                        </Box>

                        {/* Completed Orders */}
                        <Box>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3, px: 1 }}>
                                <Stack direction="row" alignItems="center" spacing={1.5}>
                                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b' }}>Completed Orders</Typography>
                                    <Box sx={{ bgcolor: '#f1f5f9', px: 1.5, py: 0.4, borderRadius: 2 }}>
                                        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800 }}>{completedOrders.length} Total</Typography>
                                    </Box>
                                </Stack>
                            </Stack>

                            <Stack spacing={1.8}>
                                {completedOrders.map((order: any, idx: number) => (
                                    <Paper
                                        key={order._id}
                                        elevation={0}
                                        sx={{
                                            p: 3,
                                            borderRadius: 5,
                                            bgcolor: 'white',
                                            border: '1.5px solid #f8fafc',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        }}
                                    >
                                        <Stack direction="row" alignItems="center" spacing={3}>
                                            <Box sx={{ width: 48, height: 48, bgcolor: '#f8fafc', borderRadius: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Box sx={{ color: '#cbd5e1' }}>{getOrderIcon(idx + 10)}</Box>
                                            </Box>
                                            <Box>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1e293b', mb: 0.2 }}>Order from {order.user?.username || 'Guest'}</Typography>
                                                <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 600 }}>Order #ORD-{order._id?.substring(order._id?.length - 4).toUpperCase()}</Typography>
                                            </Box>
                                        </Stack>
                                        <Stack direction="row" alignItems="center" spacing={5}>
                                            <Typography variant="h6" sx={{ fontWeight: 900, color: '#1e293b' }}>₹{order.totalPrice}</Typography>
                                            <Chip
                                                label="COMPLETED"
                                                sx={{
                                                    bgcolor: '#f1f5f9',
                                                    color: '#94a3b8',
                                                    fontWeight: 900,
                                                    fontSize: '0.65rem',
                                                    height: 26,
                                                    borderRadius: 2,
                                                    px: 1
                                                }}
                                            />
                                            <IconButton size="small"><MoreVertIcon sx={{ color: '#cbd5e1' }} /></IconButton>
                                        </Stack>
                                    </Paper>
                                ))}
                                {completedOrders.length === 0 && <Typography variant="body2" sx={{ color: '#94a3b8', textAlign: 'center', py: 5 }}>No completed orders found.</Typography>}
                            </Stack>
                        </Box>
                    </>
                ) : (
                    <Box>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4, px: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b' }}>Product Inventory</Typography>
                        </Stack>
                        <Grid container spacing={3.5}>
                            {filteredProducts.map((product: any) => (
                                <Grid key={product._id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 2.5,
                                            borderRadius: 5,
                                            border: '1.5px solid #f8fafc',
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            bgcolor: 'white',
                                            transition: '0.3s',
                                            '&:hover': { boxShadow: '0 12px 30px rgba(0,0,0,0.03)', transform: 'translateY(-4px)' }
                                        }}
                                    >
                                        <Box sx={{ position: 'relative', width: '100%', height: 180, mb: 2.5 }}>
                                            <Box component="img" src={product.images?.[0]} sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 4, bgcolor: '#f8fafc' }} />
                                            <Chip
                                                label={product.stock > 0 ? "In Stock" : "Out of Stock"}
                                                size="small"
                                                sx={{
                                                    position: 'absolute',
                                                    top: 12,
                                                    right: 12,
                                                    bgcolor: product.stock > 0 ? 'rgba(255,255,255,0.9)' : '#fee2e2',
                                                    color: product.stock > 0 ? '#1e293b' : '#ef4444',
                                                    fontWeight: 800,
                                                    backdropFilter: 'blur(4px)'
                                                }}
                                            />
                                        </Box>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1e293b', mb: 0.5 }}>{product.title}</Typography>
                                        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{product.brand || 'No Brand'}</Typography>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 'auto', pt: 3 }}>
                                            <Typography variant="h6" sx={{ fontWeight: 900, color: '#1e293b' }}>₹{product.price}</Typography>
                                            <Stack direction="row" spacing={0.5}>
                                                <IconButton size="small" onClick={() => handleEditProduct(product)} sx={{ color: '#94a3b8', '&:hover': { color: '#1e293b', bgcolor: '#f1f5f9' } }}><EditIcon fontSize="small" /></IconButton>
                                                <IconButton size="small" sx={{ color: '#fee2e2', '&:hover': { color: '#ef4444', bgcolor: '#fef2f2' } }} onClick={() => handleDeleteProduct(product._id)}><DeleteIcon fontSize="small" /></IconButton>
                                            </Stack>
                                        </Stack>
                                    </Paper>
                                </Grid>
                            ))}
                            {filteredProducts.length === 0 && <Grid size={{ xs: 12 }}><Typography variant="body1" sx={{ color: '#94a3b8', textAlign: 'center', py: 10 }}>No products found in inventory.</Typography></Grid>}
                        </Grid>
                    </Box>
                )}

                {/* Add Product Modal */}
                <Dialog
                    open={isModalOpen}
                    onClose={handleCloseModal}
                    maxWidth="sm"
                    fullWidth
                    PaperProps={{ sx: { borderRadius: 6, p: 1 } }}
                >
                    <DialogTitle sx={{ fontWeight: 900, fontSize: '1.5rem', pb: 1 }}>{editingProduct ? 'Edit Product' : 'List a New Product'}</DialogTitle>
                    <DialogContent>
                        <Typography variant="body2" sx={{ color: '#94a3b8', mb: 3, fontWeight: 500 }}>All fields are required to list a product in the marketplace.</Typography>
                        <Stack spacing={3}>
                            <TextField fullWidth label="Product Name" placeholder="e.g. Wireless Noise Canceling Headphones" value={newProduct.title} onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })} variant="outlined" InputProps={{ sx: { borderRadius: 3 } }} />
                            <Grid container spacing={3}>
                                <Grid size={{ xs: 6 }}>
                                    <TextField fullWidth type="number" label="Price (₹)" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} variant="outlined" InputProps={{ sx: { borderRadius: 3 } }} />
                                </Grid>
                                <Grid size={{ xs: 6 }}>
                                    <TextField fullWidth type="number" label="Stock Count" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} variant="outlined" InputProps={{ sx: { borderRadius: 3 } }} />
                                </Grid>
                            </Grid>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                                <TextField fullWidth select label="Category" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} variant="outlined" InputProps={{ sx: { borderRadius: 3 } }}>
                                    {['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports'].map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
                                </TextField>
                                <TextField fullWidth label="Brand" placeholder="e.g. Sony" value={newProduct.brand} onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })} variant="outlined" InputProps={{ sx: { borderRadius: 3 } }} />
                            </Stack>
                            <TextField fullWidth multiline rows={4} label="Product Description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} variant="outlined" InputProps={{ sx: { borderRadius: 3 } }} />

                            <Box sx={{ p: 3, border: '2px dashed #f1f5f9', borderRadius: 4, bgcolor: '#f8fafc', textAlign: 'center' }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1e293b', mb: 2 }}>Product Images ({newProduct.images.split(',').filter((x: string) => x.trim()).length}/3)</Typography>
                                <Stack direction="row" spacing={1.5} sx={{ mb: 2.5, justifyContent: 'center' }}>
                                    {newProduct.images.split(',').map((img: string, idx: number) => {
                                        const trimmedImg = img.trim();
                                        if (!trimmedImg) return null;
                                        return (
                                            <Box key={idx} sx={{ position: 'relative', width: 70, height: 70, borderRadius: 2.5, overflow: 'hidden', border: '1.5px solid #e2e8f0' }}>
                                                <Box component="img" src={trimmedImg} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                <IconButton size="small" onClick={() => removeImage(trimmedImg)} sx={{ position: 'absolute', top: 2, right: 2, bgcolor: 'rgba(255,255,255,0.9)', p: 0.5, '&:hover': { bgcolor: 'white' } }}>
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
                                    disabled={isUploading || (newProduct.images ? newProduct.images.split(',').length >= 3 : false)}
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
                        <Button variant="contained" onClick={editingProduct ? handleUpdateProduct : handleAddProduct} sx={{ bgcolor: '#1e293b', color: 'white', borderRadius: 3, textTransform: 'none', px: 5, py: 1.2, fontWeight: 800, '&:hover': { bgcolor: '#000' } }}>{editingProduct ? 'Update Product' : 'Publish Product'}</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
};

export default RetailManagement;
