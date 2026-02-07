import { Box, Typography, Paper, Stack, Button, IconButton, TextField, CircularProgress, Fade } from '@mui/material';
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

    const handleGenerate = () => {
        if (!prompt) return;
        setIsGenerating(true);
        // Simulate AI delay
        setTimeout(() => {
            // Using a random tech/design related image from Unsplash
            const randomId = Math.floor(Math.random() * 1000);
            setGeneratedImage(`https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80&random=${randomId}`);
            setIsGenerating(false);
        }, 2000);
    };

    const handlePost = () => {
        if (!generatedImage || !prompt) return;

        const newPost = {
            id: Date.now(),
            title: prompt.length > 20 ? prompt.substring(0, 20) + "..." : prompt,
            description: `AI Generated Concept based on: "${prompt}". Ready for implementation.`,
            price: Math.floor(Math.random() * 200) + 50,
            currency: "$",
            unit: "/hr",
            status: "NEW",
            tagColor: "#3b82f6",
            tagTextColor: "white",
            views: "0 views",
            time: "Just now",
            image: generatedImage
        };

        onPost(newPost);

        // Reset
        setPrompt('');
        setGeneratedImage(null);
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

                <Box
                    sx={{
                        bgcolor: '#1e1e1e',
                        borderRadius: 3,
                        p: 2,
                        mb: 2,
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: 1,
                        minHeight: 300
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
                                    borderRadius: 2,
                                    position: 'absolute',
                                    top: 0,
                                    left: 0
                                }}
                            />
                        </Fade>
                    ) : (
                        <TextField
                            multiline
                            fullWidth
                            placeholder="Describe the image you want to generate for your next post..."
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            variant="standard"
                            InputProps={{
                                disableUnderline: true,
                                sx: {
                                    color: '#aaa',
                                    fontSize: '1.1rem',
                                    lineHeight: 1.6,
                                    height: '100%',
                                    alignItems: 'flex-start'
                                }
                            }}
                            sx={{
                                flexGrow: 1,
                                zIndex: 1,
                                '& .MuiInputBase-root': { height: '100%' },
                                '& .MuiInputBase-input': { height: '100% !important' }
                            }}
                        />
                    )}

                    {isGenerating && (
                        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'rgba(0,0,0,0.7)', zIndex: 5, borderRadius: 2 }}>
                            <CircularProgress sx={{ color: '#d9f99d' }} />
                        </Box>
                    )}

                    <Box sx={{ mt: 'auto', alignSelf: 'flex-end', zIndex: 2, pt: 2 }}>
                        {generatedImage ? (
                            <IconButton size="small" onClick={() => setGeneratedImage(null)} sx={{ bgcolor: 'rgba(0,0,0,0.5)', color: 'white', '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' } }}>
                                <ImageOutlinedIcon fontSize="small" />
                            </IconButton>
                        ) : (
                            <IconButton size="small" sx={{ bgcolor: '#333', color: '#aaa', '&:hover': { bgcolor: '#444' } }}>
                                <ImageOutlinedIcon fontSize="small" />
                            </IconButton>
                        )}
                    </Box>
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
                        onClick={handlePost}
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


        </Stack>
    );
};

export default FreelancerSidebar;
