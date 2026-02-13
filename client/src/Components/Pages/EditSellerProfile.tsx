import { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Paper,
    Stack,
    Button,
    TextField,
    Avatar,
    IconButton,
    CircularProgress
} from '@mui/material';
import { Save as SaveIcon, ArrowBack as ArrowBackIcon, CameraAlt as CameraIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/api';

const EditSellerProfile = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        businessName: '',
        businessType: 'Private Limited Company',
        incorporationDate: '',
        primaryCategory: '',
        gstin: '',
        pan: '',
        bankName: '',
        accountNumber: '',
        ifscCode: '',
        warehouseAddress: ''
    });

    const [logoPreview, setLogoPreview] = useState<string>('');
    const [coverPreview, setCoverPreview] = useState<string>('');
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [coverFile, setCoverFile] = useState<File | null>(null);

    useEffect(() => {
        fetchSellerData();
    }, []);

    const fetchSellerData = async () => {
        try {
            const { data } = await AuthService.getMe();
            // Map existing data to form state
            setFormData({
                businessName: data.businessName || data.username || '',
                businessType: data.businessType || 'Private Limited Company',
                incorporationDate: data.incorporationDate || '2018-10-12',
                primaryCategory: data.primaryCategory || 'Electronics & Office Supplies',
                gstin: data.gstin || '29AAAAA0000A1Z5',
                pan: data.pan || 'ABCDE1234F',
                bankName: data.bankName || 'International Finance Bank',
                accountNumber: data.accountNumber || '**** **** 8920',
                ifscCode: data.ifscCode || 'IFBK0009122',
                warehouseAddress: data.warehouseAddress || '402, Trade Tower, Sector 45, Bangalore'
            });
            setLogoPreview(data.profile?.avatar || "https://img.logo.com/outputs/7438183/1000x1000.png");
            setCoverPreview("https://images.unsplash.com/photo-1542332213-31f87348057f?auto=format&fit=crop&q=80&w=1500");
            setLoading(false);
        } catch (error) {
            console.error("Error loading profile:", error);
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'cover') => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                if (type === 'logo') {
                    setLogoPreview(reader.result as string);
                    setLogoFile(file);
                } else {
                    setCoverPreview(reader.result as string);
                    setCoverFile(file);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        setSaving(true);
        try {
            console.log("Updating profile with:", formData, logoFile, coverFile);

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            alert("Profile updated successfully!");
            navigate('/seller/profile');
        } catch (error) {
            console.error("Update failed:", error);
            alert("Failed to update profile.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f1f5f9', pb: 8 }}>
            {/* Header */}
            <Box sx={{ bgcolor: '#CFE8EC', py: 2, borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                <Container maxWidth="md">
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <IconButton onClick={() => navigate('/seller/profile')}>
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography variant="h6" sx={{ fontWeight: 900, color: '#1e293b' }}>
                            EDIT SELLER PROFILE
                        </Typography>
                    </Stack>
                </Container>
            </Box>

            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Paper elevation={0} sx={{ p: 0, borderRadius: 6, border: '1px solid #e2e8f0', overflow: 'hidden' }}>

                    {/* Cover Image Edit */}
                    <Box sx={{ height: 200, bgcolor: '#d1d5db', position: 'relative' }}>
                        <Box
                            component="img"
                            src={coverPreview}
                            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="cover-upload"
                            type="file"
                            onChange={(e) => handleImageChange(e, 'cover')}
                        />
                        <label htmlFor="cover-upload">
                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: 16,
                                    right: 16,
                                    bgcolor: 'rgba(0,0,0,0.5)',
                                    color: 'white',
                                    padding: '8px 16px',
                                    borderRadius: 2,
                                    backdropFilter: 'blur(4px)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' }
                                }}
                            >
                                <CameraIcon fontSize="small" />
                                <Typography variant="button" sx={{ textTransform: 'none', fontWeight: 600 }}>Change Cover</Typography>
                            </Box>
                        </label>
                    </Box>

                    {/* Avatar Edit */}
                    <Box sx={{ px: 4, pb: 4, mt: -6, textAlign: 'left', display: 'flex', alignItems: 'flex-end' }}>
                        <Box sx={{ position: 'relative', display: 'inline-block' }}>
                            <Avatar
                                sx={{ width: 140, height: 140, border: '4px solid white', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', bgcolor: '#f8fafc' }}
                                src={logoPreview}
                            />
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="logo-upload"
                                type="file"
                                onChange={(e) => handleImageChange(e, 'logo')}
                            />
                            <label htmlFor="logo-upload">
                                <IconButton
                                    component="span"
                                    sx={{
                                        position: 'absolute', bottom: 10, right: 10,
                                        bgcolor: '#CFE8EC', color: '#1e293b',
                                        border: '2px solid white',
                                        '&:hover': { bgcolor: '#b8dbe2' }
                                    }}
                                    size="small"
                                >
                                    <CameraIcon fontSize="small" />
                                </IconButton>
                            </label>
                        </Box>
                        <Box sx={{ mb: 2, ml: 3 }}>
                            <Typography variant="h5" sx={{ fontWeight: 800 }}>{formData.businessName || 'Business Name'}</Typography>
                            <Typography variant="body2" sx={{ color: '#64748b' }}>Update your visual identity</Typography>
                        </Box>
                    </Box>

                    <Box sx={{ p: 4, pt: 0 }}>
                        <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>General Information</Typography>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 4 }}>
                            <Box>
                                <TextField
                                    fullWidth
                                    label="Business Name"
                                    name="businessName"
                                    value={formData.businessName}
                                    onChange={handleChange}
                                />
                            </Box>
                            <Box>
                                <TextField
                                    fullWidth
                                    label="Business Type"
                                    name="businessType"
                                    value={formData.businessType}
                                    onChange={handleChange}
                                />
                            </Box>
                            <Box>
                                <TextField
                                    fullWidth
                                    label="Incorporation Date"
                                    name="incorporationDate"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    value={formData.incorporationDate}
                                    onChange={handleChange}
                                />
                            </Box>
                            <Box>
                                <TextField
                                    fullWidth
                                    label="Primary Category"
                                    name="primaryCategory"
                                    value={formData.primaryCategory}
                                    onChange={handleChange}
                                />
                            </Box>
                        </Box>

                        <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Compliance & Bank Details</Typography>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 4 }}>
                            <Box>
                                <TextField
                                    fullWidth
                                    label="GSTIN"
                                    name="gstin"
                                    value={formData.gstin}
                                    onChange={handleChange}
                                />
                            </Box>
                            <Box>
                                <TextField
                                    fullWidth
                                    label="PAN Number"
                                    name="pan"
                                    value={formData.pan}
                                    onChange={handleChange}
                                />
                            </Box>
                            <Box>
                                <TextField
                                    fullWidth
                                    label="Bank Name"
                                    name="bankName"
                                    value={formData.bankName}
                                    onChange={handleChange}
                                />
                            </Box>
                            <Box>
                                <TextField
                                    fullWidth
                                    label="Account Number"
                                    name="accountNumber"
                                    value={formData.accountNumber}
                                    onChange={handleChange}
                                />
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
                            <Button
                                variant="outlined"
                                onClick={() => navigate('/seller/profile')}
                                sx={{ fontWeight: 700, textTransform: 'none', borderRadius: 2 }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                                onClick={handleSubmit}
                                disabled={saving}
                                sx={{
                                    bgcolor: '#1e293b',
                                    color: 'white',
                                    fontWeight: 800,
                                    textTransform: 'none',
                                    borderRadius: 2,
                                    px: 4,
                                    '&:hover': { bgcolor: '#334155' }
                                }}
                            >
                                {saving ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default EditSellerProfile;
