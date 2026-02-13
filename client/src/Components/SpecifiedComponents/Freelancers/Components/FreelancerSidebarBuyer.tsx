import { Box, Typography, Paper, Stack, Button, IconButton, TextField, CircularProgress, Fade, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import MicIcon from '@mui/icons-material/Mic';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


interface FreelancerSidebarBuyerProps {
    onPost: (newPost: any) => void;
}

const FreelancerSidebarBuyer = ({ onPost }: FreelancerSidebarBuyerProps) => {
    const navigate = useNavigate();
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [openPostDialog, setOpenPostDialog] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        productName: '',
        contact: '',
        email: '',
        requirements: '',
        description: '',
        location: '',
        price: '',
    });

    const handleGenerate = async () => {
        if (!prompt) return;
        setIsGenerating(true);

        try {
            const API_KEY = "FPSX9eeb26f1be1427e9773dfd2d7e3f4447";
            const response = await fetch('/freepik-api/v1/ai/text-to-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-freepik-api-key': API_KEY,
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    prompt: prompt,
                    aspect_ratio: "square",
                    num_images: 1
                })
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const data = await response.json();
            let imageUrl = null;
            if (data.data && data.data.length > 0) {
                if (data.data[0].base64) {
                    imageUrl = `data:image/png;base64,${data.data[0].base64}`;
                } else if (data.data[0].url) {
                    imageUrl = data.data[0].url;
                }
            }
            if (!imageUrl && data.url) imageUrl = data.url;
            if (!imageUrl) throw new Error('Could not parse image URL');

            setGeneratedImage(imageUrl);
        } catch (error: any) {
            console.error('Error generating image:', error);
            alert(`Failed to generate image. Please try again.`);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleOpenPostDialog = () => {
        if (!generatedImage) return;
        setOpenPostDialog(true);
        setFormData({ ...formData, productName: prompt.substring(0, 30) });
    };

    const handleTryOn = () => {
        if (!generatedImage) return;
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please log in to use Virtual Try-On.');
            navigate('/login');
            return;
        }
        navigate('/freelance/try-on', {
            state: {
                garmentImage: generatedImage,
                prompt: prompt,
                formData: formData
            }
        });
    };

    const handleConfirmPost = () => {
        const newPost = {
            id: Date.now(),
            title: formData.productName || "New Service",
            description: formData.description || `Service offering in ${formData.location}`,
            requirements: formData.requirements,
            contact: formData.contact,
            email: formData.email,
            location: formData.location,
            price: Number(formData.price) || 0,
            currency: "₹",
            unit: "/hr",
            status: "PENDING",
            tagColor: "#10b981",
            tagTextColor: "white",
            views: "0 views",
            time: "Just now",
            image: generatedImage,
            nameDisplay: formData.name
        };

        onPost(newPost);
        setOpenPostDialog(false);
        setPrompt('');
        setGeneratedImage(null);
        setFormData({ name: '', productName: '', contact: '', email: '', requirements: '', description: '', location: '', price: '' });
    };

    return (
        <Stack spacing={3}>
            {/* AI Image Generation Card - PREMIUM REDESIGN */}
            <Paper
                elevation={0}
                sx={{
                    bgcolor: 'white',
                    color: '#1a202c',
                    p: 4,
                    borderRadius: 8,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.05)',
                    border: '1px solid #f1f5f9'
                }}
            >
                {/* Floating Brain Button */}
                <Box
                    sx={{
                        position: 'absolute',
                        right: -1,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        bgcolor: 'white',
                        borderRadius: '50px 0 0 50px',
                        width: 38,
                        height: 44,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '-4px 0 10px rgba(0,0,0,0.05)',
                        cursor: 'pointer',
                        zIndex: 10,
                        transition: 'all 0.2s ease',
                        '&:hover': { width: 44 }
                    }}
                >
                    <Box sx={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(135deg, #FF6B6B 10%, #FF8E53 90%)',
                        color: 'white',
                        fontSize: '12px'
                    }}>🧠</Box>
                </Box>

                {/* Header */}
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
                    <Box sx={{
                        width: 44,
                        height: 44,
                        bgcolor: '#0f172a',
                        borderRadius: 2.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                    }}>
                        <AutoFixHighIcon sx={{ fontSize: 24 }} />
                    </Box>
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 900, lineHeight: 1.1, fontSize: '1.25rem', color: '#0f172a' }}>
                            AI Visual Studio
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800, letterSpacing: 1.5, fontSize: '0.65rem' }}>
                            POWERED BY PRO GEN
                        </Typography>
                    </Box>
                </Stack>

                {/* Preview Area */}
                <Box
                    sx={{
                        bgcolor: '#f8fafc',
                        borderRadius: 6,
                        mb: 4,
                        position: 'relative',
                        aspectRatio: '1/1',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid #f1f5f9'
                    }}
                >
                    {generatedImage ? (
                        <Fade in={true}>
                            <Box
                                component="img"
                                src={generatedImage}
                                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </Fade>
                    ) : (
                        <Stack alignItems="center" spacing={2} sx={{ color: '#cbd5e1' }}>
                            <Box sx={{
                                width: 60,
                                height: 60,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '2px solid #e2e8f0',
                                bgcolor: 'white'
                            }}>
                                <ImageOutlinedIcon sx={{ fontSize: 32 }} />
                            </Box>
                            <Typography variant="body2" sx={{ fontWeight: 700, color: '#94a3b8' }}>
                                Waiting for your vision...
                            </Typography>
                        </Stack>
                    )}

                    {isGenerating && (
                        <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'rgba(255,255,255,0.8)', zIndex: 5, backdropFilter: 'blur(4px)' }}>
                            <CircularProgress sx={{ color: '#adc9d1' }} />
                        </Box>
                    )}
                </Box>

                {/* Prompt Section */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="caption" sx={{ color: '#94a3b8', mb: 1.5, fontWeight: 800, letterSpacing: 1, display: 'block' }}>
                        CREATIVE PROMPT
                    </Typography>
                    <Box sx={{ position: 'relative' }}>
                        <TextField
                            multiline
                            rows={4}
                            placeholder="E.g. Futuristic minimal office space, 8k, soft shadows, teal accents..."
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            fullWidth
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    bgcolor: 'white',
                                    borderRadius: 4,
                                    fontSize: '0.9rem',
                                    color: '#334155',
                                    '& fieldset': { borderColor: '#e2e8f0', borderWidth: '1.5px' },
                                    '&:hover fieldset': { borderColor: '#cbd5e1' },
                                    '&.Mui-focused fieldset': { borderColor: '#adc9d1' },
                                    p: 2.5,
                                    pb: 6
                                }
                            }}
                        />
                        <IconButton sx={{ position: 'absolute', bottom: 12, right: 12, color: '#94a3b8' }}>
                            <MicIcon />
                        </IconButton>
                    </Box>
                </Box>

                {/* Main Action Button */}
                <Button
                    fullWidth
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt}
                    startIcon={!isGenerating && <RocketLaunchIcon />}
                    sx={{
                        bgcolor: '#adc9d1',
                        color: '#0f172a',
                        borderRadius: 4,
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        py: 2.2,
                        mb: 2,
                        letterSpacing: 1,
                        fontSize: '0.95rem',
                        boxShadow: '0 10px 20px rgba(173, 201, 209, 0.2)',
                        '&:hover': { bgcolor: '#9bbec9', boxShadow: '0 15px 25px rgba(173, 201, 209, 0.3)' },
                        '&:disabled': { bgcolor: '#f1f5f9', color: '#cbd5e1' }
                    }}
                >
                    {isGenerating ? 'Synthesizing...' : 'Generate Masterpiece'}
                </Button>

                {/* Post + Try On Buttons (show only when image is generated) */}
                {generatedImage && (
                    <Fade in={true}>
                        <Stack spacing={1.5}>
                            {/* Divider Label */}
                            <Box sx={{ textAlign: 'center', py: 1 }}>
                                <Typography variant="caption" sx={{
                                    color: '#94a3b8', fontWeight: 800, letterSpacing: 1.5,
                                    fontSize: '0.6rem', textTransform: 'uppercase'
                                }}>
                                    Choose your action
                                </Typography>
                            </Box>

                            {/* Two-button row */}
                            <Stack direction="row" spacing={1.5}>
                                {/* POST Button */}
                                <Button
                                    fullWidth
                                    onClick={handleOpenPostDialog}
                                    startIcon={<SendIcon />}
                                    sx={{
                                        bgcolor: '#0f172a',
                                        color: 'white',
                                        borderRadius: 4,
                                        fontWeight: 900,
                                        textTransform: 'uppercase',
                                        py: 2,
                                        letterSpacing: 0.5,
                                        fontSize: '0.85rem',
                                        boxShadow: '0 8px 16px rgba(15, 23, 42, 0.15)',
                                        '&:hover': { bgcolor: '#1e293b', boxShadow: '0 12px 24px rgba(15, 23, 42, 0.25)' },
                                    }}
                                >
                                    Post
                                </Button>

                                {/* TRY ON Button */}
                                <Button
                                    fullWidth
                                    onClick={handleTryOn}
                                    startIcon={<CheckroomIcon />}
                                    sx={{
                                        background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
                                        color: 'white',
                                        borderRadius: 4,
                                        fontWeight: 900,
                                        textTransform: 'uppercase',
                                        py: 2,
                                        letterSpacing: 0.5,
                                        fontSize: '0.85rem',
                                        boxShadow: '0 8px 16px rgba(139, 92, 246, 0.25)',
                                        '&:hover': {
                                            background: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
                                            boxShadow: '0 12px 24px rgba(139, 92, 246, 0.35)'
                                        },
                                    }}
                                >
                                    Try On
                                </Button>
                            </Stack>
                        </Stack>
                    </Fade>
                )}
            </Paper>

            {/* Post Dialog */}
            <Dialog
                open={openPostDialog}
                onClose={() => setOpenPostDialog(false)}
                PaperProps={{ sx: { borderRadius: 6, bgcolor: 'white', minWidth: { xs: '90%', sm: 500 }, p: 1 } }}
            >
                <DialogTitle sx={{ fontWeight: 900, fontSize: '1.5rem', px: 4, pt: 4 }}>Publish Your Project</DialogTitle>
                <DialogContent sx={{ px: 4 }}>
                    <Stack spacing={3} sx={{ mt: 2 }}>
                        <TextField
                            label="Your Name"
                            fullWidth
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            variant="filled"
                            InputProps={{ disableUnderline: true, sx: { borderRadius: 3, bgcolor: '#f8fafc' } }}
                        />
                        <TextField
                            label="Project Title"
                            fullWidth
                            value={formData.productName}
                            onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                            variant="filled"
                            InputProps={{ disableUnderline: true, sx: { borderRadius: 3, bgcolor: '#f8fafc' } }}
                        />
                        <TextField
                            label="Contact Details"
                            fullWidth
                            value={formData.contact}
                            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                            variant="filled"
                            InputProps={{ disableUnderline: true, sx: { borderRadius: 3, bgcolor: '#f8fafc' } }}
                        />
                        <TextField
                            label="Location"
                            fullWidth
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            variant="filled"
                            InputProps={{ disableUnderline: true, sx: { borderRadius: 3, bgcolor: '#f8fafc' } }}
                        />
                        <TextField
                            label="Email Address"
                            fullWidth
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            variant="filled"
                            InputProps={{ disableUnderline: true, sx: { borderRadius: 3, bgcolor: '#f8fafc' } }}
                        />
                        <TextField
                            label="Specific Requirements"
                            fullWidth
                            multiline
                            rows={2}
                            value={formData.requirements}
                            onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                            variant="filled"
                            InputProps={{ disableUnderline: true, sx: { borderRadius: 3, bgcolor: '#f8fafc' } }}
                        />
                        <TextField
                            label="Budget (₹)"
                            fullWidth
                            type="number"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            variant="filled"
                            InputProps={{ disableUnderline: true, sx: { borderRadius: 3, bgcolor: '#f8fafc' } }}
                        />
                        <TextField
                            label="Project Description"
                            fullWidth
                            multiline
                            rows={3}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            variant="filled"
                            InputProps={{ disableUnderline: true, sx: { borderRadius: 3, bgcolor: '#f8fafc' } }}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 4 }}>
                    <Button onClick={() => setOpenPostDialog(false)} sx={{ color: '#64748b', fontWeight: 800 }}>Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={handleConfirmPost}
                        disabled={!formData.name || !formData.contact}
                        sx={{
                            bgcolor: '#adc9d1',
                            color: '#0f172a',
                            fontWeight: 900,
                            borderRadius: 3,
                            px: 4,
                            py: 1.5,
                            '&:hover': { bgcolor: '#9bbec9' }
                        }}
                    >
                        Post To Marketplace
                    </Button>
                </DialogActions>
            </Dialog>
        </Stack>
    );
};

export default FreelancerSidebarBuyer;