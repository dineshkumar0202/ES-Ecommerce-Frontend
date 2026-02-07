import { Box, Typography, Paper, Stack, Button, IconButton, TextField, CircularProgress, Fade, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { useState } from 'react';

interface FreelancerSidebarProps {
    onPost: (newPost: any) => void;
}

const FreelancerSidebar = ({ onPost }: FreelancerSidebarProps) => {
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [openPostDialog, setOpenPostDialog] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        productName: '',
        contact: '',
        location: ''
    });

    const handleGenerate = async () => {
        if (!prompt) return;
        setIsGenerating(true);

        try {
            console.log('Generating image with prompt:', prompt);

            // Use placehold.co - reliable placeholder service
            const promptText = encodeURIComponent(prompt.substring(0, 30));

            // Using placehold.co - modern, reliable service
            const imageUrl = `https://placehold.co/300x300/1e1e1e/bef264?text=${promptText}&font=roboto`;

            console.log('Image URL:', imageUrl);

            // Simulate generation time
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Set the generated image
            setGeneratedImage(imageUrl);

        } catch (error: any) {
            console.error('Error generating image:', error);
            alert(`Failed to generate image: ${error.message}\n\nPlease try again.`);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleOpenPostDialog = () => {
        if (!generatedImage) return;
        setOpenPostDialog(true);
        setFormData({ ...formData, productName: prompt.substring(0, 30) });
    };

    const handleConfirmPost = () => {
        const newPost = {
            id: Date.now(),
            title: formData.productName || "New Service",
            description: `${formData.name} is offering services in ${formData.location}. Contact: ${formData.contact}.`,
            price: Math.floor(Math.random() * 200) + 50,
            currency: "$",
            unit: "/hr",
            status: "NEW",
            tagColor: "#3b82f6",
            tagTextColor: "white",
            views: "0 views",
            time: "Just now",
            image: generatedImage,
            nameDisplay: formData.name
        };

        onPost(newPost);
        setOpenPostDialog(false);

        // Reset
        setPrompt('');
        setGeneratedImage(null);
        setFormData({ name: '', productName: '', contact: '', location: '' });
    };

    return (
        <Stack spacing={3}>
            {/* AI Image Generation Card */}
            <Paper
                elevation={0}
                sx={{
                    bgcolor: 'black',
                    color: 'white',
                    p: 3,
                    borderRadius: 4,
                    overflow: 'hidden',
                    minHeight: 'calc(100vh - 40px)',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
                    <AutoAwesomeIcon sx={{ color: '#d9f99d' }} />
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>AI Image Generation</Typography>
                </Stack>

                {/* 1. Image Area (Top) */}
                <Box
                    sx={{
                        bgcolor: '#1e1e1e',
                        borderRadius: 3,
                        mb: 2,
                        position: 'relative',
                        height: 300,
                        flexShrink: 0,
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px dashed #333'
                    }}
                >
                    {generatedImage ? (
                        <Fade in={true}>
                            <Box
                                component="img"
                                src={generatedImage}
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </Fade>
                    ) : (
                        <Stack alignItems="center" spacing={1} sx={{ color: '#444' }}>
                            <ImageOutlinedIcon sx={{ fontSize: 40 }} />
                            <Typography variant="caption">Preview Area</Typography>
                        </Stack>
                    )}

                    {isGenerating && (
                        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'rgba(0,0,0,0.7)', zIndex: 5 }}>
                            <CircularProgress sx={{ color: '#d9f99d' }} />
                        </Box>
                    )}

                    {generatedImage && (
                        <Box sx={{ position: 'absolute', top: 10, right: 10, zIndex: 2 }}>
                            <IconButton size="small" onClick={() => setGeneratedImage(null)} sx={{ bgcolor: 'rgba(0,0,0,0.5)', color: 'white', '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' } }}>
                                <ImageOutlinedIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    )}
                </Box>

                {/* 2. Text Input Area (Bottom, Small) */}
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', mb: 2 }}>
                    <Typography variant="caption" sx={{ color: '#888', mb: 1, fontWeight: 600 }}>PROMPT</Typography>
                    <TextField
                        multiline
                        placeholder="Describe the image..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        variant="outlined"
                        fullWidth
                        sx={{
                            bgcolor: '#111',
                            borderRadius: 2,
                            '& .MuiOutlinedInput-root': {
                                color: 'white',
                                '& fieldset': { borderColor: '#333' },
                                '&:hover fieldset': { borderColor: '#555' },
                                '&.Mui-focused fieldset': { borderColor: '#bef264' },
                            },
                            '& .MuiInputBase-input': {
                                fontSize: '0.95rem',
                                lineHeight: 1.5,
                            }
                        }}
                    />
                </Box>

                <Stack direction="row" spacing={2}>
                    <Button
                        fullWidth
                        onClick={handleGenerate}
                        disabled={isGenerating || !prompt}
                        sx={{
                            bgcolor: '#333',
                            color: 'white',
                            borderRadius: 2,
                            fontWeight: 700,
                            textTransform: 'none',
                            py: 1.5,
                            '&:hover': { bgcolor: '#444' },
                            '&:disabled': { bgcolor: '#222', color: '#555' }
                        }}
                    >
                        {isGenerating ? 'GENERATING...' : 'GENERATE'}
                    </Button>
                    <Button
                        fullWidth
                        onClick={handleOpenPostDialog}
                        disabled={!generatedImage}
                        sx={{
                            bgcolor: '#bef264',
                            color: 'black',
                            borderRadius: 2,
                            fontWeight: 800,
                            textTransform: 'none',
                            py: 1.5,
                            '&:hover': { bgcolor: '#a3e635' },
                            '&:disabled': { bgcolor: '#333', color: '#555' }
                        }}
                    >
                        POST
                    </Button>
                </Stack>
            </Paper>

            {/* Post Details Dialog */}
            <Dialog
                open={openPostDialog}
                onClose={() => setOpenPostDialog(false)}
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        bgcolor: 'white',
                        minWidth: 400,
                        p: 1
                    }
                }}
            >
                <DialogTitle sx={{ fontWeight: 800 }}>Complete Your Post</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <TextField
                            label="Your Name"
                            fullWidth
                            variant="outlined"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <TextField
                            label="Product/Service Name"
                            fullWidth
                            variant="outlined"
                            value={formData.productName}
                            onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                        />
                        <TextField
                            label="Contact Info (Email/Phone)"
                            fullWidth
                            variant="outlined"
                            value={formData.contact}
                            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        />
                        <TextField
                            label="Location"
                            fullWidth
                            variant="outlined"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={() => setOpenPostDialog(false)} sx={{ color: '#64748b' }}>Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={handleConfirmPost}
                        disabled={!formData.name || !formData.productName}
                        sx={{
                            bgcolor: 'black',
                            color: 'white',
                            fontWeight: 700,
                            px: 3,
                            '&:hover': { bgcolor: '#333' }
                        }}
                    >
                        Post Now
                    </Button>
                </DialogActions>
            </Dialog>
        </Stack>
    );
};

export default FreelancerSidebar;
