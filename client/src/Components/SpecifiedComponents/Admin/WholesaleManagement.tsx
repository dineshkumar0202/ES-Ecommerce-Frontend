import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Stack,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    IconButton,
    CircularProgress,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    InputAdornment,
    Grid
} from '@mui/material';
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
    Search as SearchIcon,
    Visibility as VisibilityIcon
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

    // Mock search state
    const [searchQuery, setSearchQuery] = useState('');

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
                images: filteredImages.join(', ')
            };
        });
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
            toast.success("Wholesale product created successfully!");
        } catch (error) {
            toast.error("Failed to create wholesale product");
        }
    };

    const menuItems = [
        { name: 'Overview', icon: <DashboardIcon sx={{ fontSize: 20 }} />, path: '/admin/dashboard' },
        { name: 'Retail', icon: <StoreIcon sx={{ fontSize: 20 }} />, path: '/admin/retail' },
        { name: 'Wholesale', icon: <WarehouseIcon sx={{ fontSize: 20 }} />, path: '/admin/wholesale', active: true },
        { name: 'Q-Commerce', icon: <FlashOnIcon sx={{ fontSize: 20 }} />, path: '/admin/quick' },
        { name: 'Resale', icon: <AutorenewIcon sx={{ fontSize: 20 }} />, path: '/admin/resale' },
        { name: 'Freelance', icon: <WorkOutlineIcon sx={{ fontSize: 20 }} />, path: '/admin/freelance' },
    ];

    // Mock Pending Wholesale Sellers for UI demonstration (matching Image 2)
    const pendingSellers = [
        {
            id: 1,
            name: "Global Logistics Hub",
            description: "Leading wholesale distributor of high-end electronics and industrial...",
            readyToShip: "1,240 items",
            reliability: "99.2%",
            coverImg: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
            logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=100",
            status: "PENDING"
        },
        {
            id: 2,
            name: "Elite Office Supply",
            description: "Premium office furniture and workspace solutions for tech...",
            readyToShip: "458 items",
            reliability: "94.5%",
            coverImg: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
            logo: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&q=80&w=100",
            status: "PENDING"
        },
        {
            id: 3,
            name: "Nexus Hardware Ltd.",
            description: "Specialized in heavy-duty computing hardware and server...",
            readyToShip: "2,810 items",
            reliability: "98.9%",
            coverImg: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=800",
            logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=100",
            status: "PENDING"
        }
    ];

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'white' }}>
            {/* Sidebar */}
            <Box sx={{
                width: 260,
                bgcolor: 'white',
                borderRight: '1px solid #f1f5f9',
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                position: 'sticky',
                top: 0
            }}>
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
                            onClick={() => item.path !== '/admin/wholesale' && navigate(item.path)}
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
                    <Stack onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('userRole'); navigate('/admin/login'); }} direction="row" alignItems="center" spacing={2} sx={{ px: 2, cursor: 'pointer', color: '#64748b', '&:hover': { color: '#ef4444' } }}>
                        <ExitToAppIcon sx={{ fontSize: 20 }} />
                        <Typography variant="body2" fontWeight={600}>Logout</Typography>
                    </Stack>
                </Box>
            </Box>

            {/* Main Content */}
            <Box sx={{ flexGrow: 1, p: 4, overflow: 'auto', bgcolor: '#fbfcfd' }}>
                {/* Header Section */}
                <Box sx={{ mb: 5 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                        <Box>
                            <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b', mb: 0.5 }}>Wholesale Management</Typography>
                            <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>Track and manage your wholesale bulk ecosystem</Typography>
                        </Box>

                        <Stack direction="row" spacing={2} alignItems="center">
                            <TextField
                                size="small"
                                placeholder="Search orders..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                sx={{
                                    width: 300,
                                    '& .MuiOutlinedInput-root': {
                                        bgcolor: 'white',
                                        borderRadius: 3,
                                        '& fieldset': { borderColor: '#e2e8f0' },
                                    }
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon sx={{ color: '#94a3b8', fontSize: 20 }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Button
                                variant="contained"
                                onClick={() => setIsModalOpen(true)}
                                startIcon={<AddIcon />}
                                sx={{
                                    bgcolor: '#CFE8EC',
                                    color: '#0e172a',
                                    borderRadius: 3,
                                    px: 3,
                                    py: 1,
                                    textTransform: 'none',
                                    fontWeight: 700,
                                    boxShadow: 'none',
                                    '&:hover': { bgcolor: '#b8dbe2', boxShadow: 'none' }
                                }}
                            >
                                Add Bulk Product
                            </Button>
                        </Stack>
                    </Stack>
                </Box>

                {/* Section 1: New Product Posts */}
                <Box sx={{ mb: 6 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                            <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b' }}>New Product Posts</Typography>
                            <Box sx={{ bgcolor: '#e2e8f0', px: 1.5, py: 0.5, borderRadius: 10 }}>
                                <Typography sx={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b' }}>12 Pending</Typography>
                            </Box>
                        </Stack>
                        <Typography variant="subtitle2" sx={{ color: '#94a3b8', fontWeight: 700, cursor: 'pointer' }}>View all</Typography>
                    </Stack>

                    <Grid container spacing={4}>
                        {(products.length > 0 ? products.slice(0, 2) : [{}, {}]).map((product, idx) => (
                            <Grid key={(product as any)._id || idx} size={{ xs: 12, md: 6 }}>
                                <Paper elevation={0} sx={{ p: 2.5, borderRadius: 5, bgcolor: 'white', border: '1px solid #f1f5f9' }}>
                                    <Stack direction="row" spacing={3}>
                                        <Box sx={{ width: 160, height: 160, borderRadius: 4, overflow: 'hidden', flexShrink: 0, bgcolor: '#f8fafc' }}>
                                            <Box
                                                component="img"
                                                src={(product as any).images?.[0] || (idx === 0 ? 'https://images.unsplash.com/photo-1546435770-a3e426ff472b?auto=format&fit=crop&q=80&w=400' : 'https://images.unsplash.com/photo-1544450173-8c879791368a?auto=format&fit=crop&q=80&w=400')}
                                                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        </Box>
                                        <Box sx={{ flexGrow: 1, pt: 1 }}>
                                            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                                                <Box>
                                                    <Typography variant="h6" sx={{ fontWeight: 900, color: '#1e293b', lineHeight: 1.2, mb: 0.5 }}>{(product as any).title || (idx === 0 ? 'Premium Wireless Headphones' : 'Office Ergonomic Chair V2')}</Typography>
                                                    <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700 }}>Model: {(product as any).sku || (idx === 0 ? 'WH-1000XM4-Bulk' : 'OC-77-BLK')}</Typography>
                                                </Box>
                                                <Box sx={{ bgcolor: '#CFE8EC', px: 1.2, py: 0.5, borderRadius: 1.5 }}>
                                                    <Typography sx={{ fontSize: '0.65rem', fontWeight: 900, color: '#1e293b' }}>REVIEW</Typography>
                                                </Box>
                                            </Stack>

                                            <Stack direction="row" spacing={5} sx={{ mt: 4 }}>
                                                <Box>
                                                    <Typography variant="caption" sx={{ color: '#cbd5e1', fontWeight: 800, display: 'block', mb: 0.5, letterSpacing: 1 }}>BULK PRICING</Typography>
                                                    <Typography variant="h5" sx={{ fontWeight: 900, color: '#1e293b' }}>${(product as any).pricePerUnit || (idx === 0 ? '85.50' : '112.50')}<Typography component="span" variant="caption" sx={{ color: '#94a3b8', ml: 0.5 }}>/unit</Typography></Typography>
                                                </Box>
                                                <Box>
                                                    <Typography variant="caption" sx={{ color: '#cbd5e1', fontWeight: 800, display: 'block', mb: 0.5, letterSpacing: 1 }}>MIN. ORDER</Typography>
                                                    <Typography variant="h5" sx={{ fontWeight: 900, color: '#1e293b' }}>{(product as any).minOrderQuantity || (idx === 0 ? '50' : '20')} <Typography component="span" variant="caption" sx={{ color: '#94a3b8' }}>units</Typography></Typography>
                                                </Box>
                                            </Stack>
                                        </Box>
                                    </Stack>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Section 2: Seller Verification (Matching Image 2) */}
                <Box>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b' }}>Seller Verification Requests</Typography>
                        <Typography variant="subtitle2" sx={{ color: '#94a3b8', fontWeight: 700, cursor: 'pointer' }}>Manage All</Typography>
                    </Stack>

                    <Grid container spacing={4}>
                        {pendingSellers.map((seller) => (
                            <Grid key={seller.id} size={{ xs: 12, sm: 6, md: 4 }}>
                                <Paper elevation={0} sx={{
                                    borderRadius: 5,
                                    overflow: 'hidden',
                                    bgcolor: 'white',
                                    border: '1px solid #f1f5f9',
                                    transition: 'all 0.3s ease',
                                    height: '100%',
                                    '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 20px 40px rgba(0,0,0,0.04)' }
                                }}>
                                    <Box sx={{ position: 'relative', height: 180 }}>
                                        <Box
                                            component="img"
                                            src={seller.coverImg}
                                            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                        <Box sx={{ position: 'absolute', top: 15, right: 15, bgcolor: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(8px)', px: 1.5, py: 0.5, borderRadius: 2, border: '1px solid rgba(255,255,255,0.2)' }}>
                                            <Typography sx={{ fontSize: '0.65rem', fontWeight: 900, color: 'white', letterSpacing: 0.5 }}>PENDING</Typography>
                                        </Box>
                                        <Paper elevation={4} sx={{ position: 'absolute', bottom: -24, left: 24, width: 64, height: 64, borderRadius: 3, p: 1, bgcolor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Box
                                                component="img"
                                                src={seller.logo}
                                                sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 2 }}
                                            />
                                        </Paper>
                                    </Box>

                                    <Box sx={{ p: 4, pt: 6 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 900, color: '#1e293b', mb: 1, fontSize: '1.15rem' }}>{seller.name}</Typography>
                                        <Typography variant="body2" sx={{ color: '#64748b', mb: 3.5, height: 40, overflow: 'hidden', lineHeight: 1.5 }}>{seller.description}</Typography>

                                        <Stack direction="row" spacing={4} sx={{ mb: 4, pt: 2, borderTop: '1px solid #f1f5f9' }}>
                                            <Box>
                                                <Typography variant="caption" sx={{ color: '#cbd5e1', fontWeight: 800, display: 'block', mb: 0.5, textTransform: 'uppercase', fontSize: '0.6rem', letterSpacing: 0.5 }}>READY TO SHIP</Typography>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 900, color: '#1e293b' }}>{seller.readyToShip}</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="caption" sx={{ color: '#cbd5e1', fontWeight: 800, display: 'block', mb: 0.5, textTransform: 'uppercase', fontSize: '0.6rem', letterSpacing: 0.5 }}>RELIABILITY</Typography>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 900, color: '#1e293b' }}>{seller.reliability}</Typography>
                                            </Box>
                                        </Stack>

                                        <Stack direction="row" spacing={2}>
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                sx={{
                                                    bgcolor: '#CFE8EC',
                                                    color: '#1e293b',
                                                    borderRadius: 3.5,
                                                    fontWeight: 900,
                                                    boxShadow: 'none',
                                                    textTransform: 'none',
                                                    py: 1.5,
                                                    '&:hover': { bgcolor: '#b8dbe2', boxShadow: 'none' }
                                                }}
                                            >
                                                Approve Seller
                                            </Button>
                                            <IconButton sx={{ bgcolor: '#0f172a', color: 'white', borderRadius: 3.5, width: 48, height: 48, '&:hover': { bgcolor: '#1e293b' } }}>
                                                <VisibilityIcon sx={{ fontSize: 20 }} />
                                            </IconButton>
                                        </Stack>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Loading Indicator */}
                {isLoading && products.length === 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress sx={{ color: '#CFE8EC' }} /></Box>
                )}

                {/* Add Product Modal */}
                <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 4 } }}>
                    <DialogTitle sx={{ fontWeight: 800, px: 3, pt: 3 }}>Add New Bulk Segment Product</DialogTitle>
                    <DialogContent sx={{ px: 3 }}>
                        <Stack spacing={2.5} sx={{ py: 2 }}>
                            <TextField fullWidth label="Wholesale Title" variant="outlined" value={newProduct.title} onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />

                            <Stack direction="row" spacing={2}>
                                <TextField fullWidth type="number" label="Price Per Unit" value={newProduct.pricePerUnit} onChange={(e) => setNewProduct({ ...newProduct, pricePerUnit: e.target.value })} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                                <TextField fullWidth type="number" label="Min Order Qty" value={newProduct.minOrderQuantity} onChange={(e) => setNewProduct({ ...newProduct, minOrderQuantity: e.target.value })} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                            </Stack>

                            <Stack direction="row" spacing={2}>
                                <TextField fullWidth label="Pack Size (e.g. 10 Pcs)" value={newProduct.packSize} onChange={(e) => setNewProduct({ ...newProduct, packSize: e.target.value })} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                                <TextField fullWidth type="number" label="Total Stock Units" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                            </Stack>
                            <TextField fullWidth select label="Category" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}>
                                {['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports', 'Food'].map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
                            </TextField>
                            <TextField fullWidth label="Brand" value={newProduct.brand} onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                            <TextField fullWidth multiline rows={3} label="Description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />

                            <Box sx={{ mt: 1 }}>
                                <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b', mb: 1, display: 'block' }}>
                                    BULK PRODUCT IMAGES ({newProduct.images ? newProduct.images.split(',').length : 0}/3)
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
                            </Box>
                        </Stack>
                    </DialogContent>
                    <DialogActions sx={{ p: 3, pt: 1 }}>
                        <Button onClick={() => setIsModalOpen(false)} sx={{ color: '#64748b', fontWeight: 600 }}>Cancel</Button>
                        <Button variant="contained" onClick={handleAddProduct} sx={{ bgcolor: 'black', color: 'white', borderRadius: 3, px: 4, fontWeight: 700, '&:hover': { bgcolor: '#1e293b' } }}>Confirm Bulk Entry</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
};

export default WholesaleManagement;
