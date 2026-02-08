import { useState } from 'react';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography, Stack, CircularProgress, Alert } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';

interface BuyerRequestModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (request: any) => void;
}

const BuyerRequestModal = ({ open, onClose, onSubmit }: BuyerRequestModalProps) => {
    const [step, setStep] = useState(1); // 1: Generate Image, 2: Details
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);

    const [details, setDetails] = useState({
        name: '',
        productName: '',
        number: '',
        email: '',
        location: ''
    });

    const handleGenerate = async () => {
        if (!prompt) return;
        setIsGenerating(true);

        try {
            console.log('Generating image with prompt:', prompt);

            // Using the provided API key (Freepik)
            const API_KEY = "FPSX9eeb26f1be1427e9773dfd2d7e3f4447";

            console.log('Using Freepik Proxy...');
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
                const errorData = await response.json().catch(() => ({}));
                console.error('API Error Details:', errorData);
                throw new Error(`API request failed with status ${response.status}: ${errorData.message || response.statusText}`);
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

            if (!imageUrl) throw new Error('Could not parse image URL from response');

            setGeneratedImage(imageUrl);
            setStep(2); // Move to details step

        } catch (error: any) {
            console.error('Error generating image:', error);
            alert(`Failed to generate image: ${error.message}\n\nIf you see a CORS error, please RESTART your development server (npm run dev).`);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSubmit = () => {
        const newRequest = {
            id: Date.now(),
            image: generatedImage,
            name: details.name,
            productType: details.productName,
            phoneNumber: details.number,
            email: details.email,
            location: details.location,
            status: 'Pending',
            date: new Date().toLocaleDateString()
        };
        onSubmit(newRequest);
        handleClose();
    };

    const handleClose = () => {
        onClose();
        // Reset state
        setStep(1);
        setPrompt('');
        setGeneratedImage(null);
        setDetails({ name: '', productName: '', number: '', email: '', location: '' });
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
            <DialogTitle sx={{ fontWeight: 800 }}>
                {step === 1 ? 'Generate Product Image' : 'Request Details'}
            </DialogTitle>
            <DialogContent dividers>
                {step === 1 ? (
                    <Stack spacing={3}>
                        <Alert severity="info" icon={<AutoAwesomeIcon />}>
                            Describe the product you are looking for, and our AI will generate a visualization for sellers.
                        </Alert>
                        <TextField
                            label="Product Description"
                            multiline
                            rows={3}
                            placeholder="e.g. Heavy duty steel pipes for industrial construction..."
                            fullWidth
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'center', minHeight: 200, bgcolor: '#f5f5f5', borderRadius: 2, alignItems: 'center', border: '1px dashed #ccc' }}>
                            {isGenerating ? (
                                <CircularProgress />
                            ) : generatedImage ? (
                                <Box component="img" src={generatedImage} sx={{ maxWidth: '100%', maxHeight: 200 }} />
                            ) : (
                                <Stack alignItems="center" color="text.secondary">
                                    <ImageOutlinedIcon sx={{ fontSize: 40, mb: 1 }} />
                                    <Typography variant="caption">Preview will appear here</Typography>
                                </Stack>
                            )}
                        </Box>
                    </Stack>
                ) : (
                    <Stack spacing={2}>
                        {generatedImage && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                                <Box component="img" src={generatedImage} sx={{ width: 100, height: 100, borderRadius: 2, objectFit: 'cover' }} />
                            </Box>
                        )}
                        <TextField
                            label="Your Name"
                            fullWidth
                            value={details.name}
                            onChange={(e) => setDetails({ ...details, name: e.target.value })}
                        />
                        <TextField
                            label="Product Type"
                            fullWidth
                            value={details.productName}
                            onChange={(e) => setDetails({ ...details, productName: e.target.value })}
                        />
                        <TextField
                            label="Phone Number"
                            fullWidth
                            value={details.number}
                            onChange={(e) => setDetails({ ...details, number: e.target.value })}
                        />
                        <TextField
                            label="Email Address"
                            fullWidth
                            value={details.email}
                            onChange={(e) => setDetails({ ...details, email: e.target.value })}
                        />
                        <TextField
                            label="Location"
                            fullWidth
                            value={details.location}
                            onChange={(e) => setDetails({ ...details, location: e.target.value })}
                        />
                    </Stack>
                )}
            </DialogContent>
            <DialogActions sx={{ p: 2.5 }}>
                <Button onClick={handleClose} color="inherit">Cancel</Button>
                {step === 1 ? (
                    <Button
                        onClick={handleGenerate}
                        variant="contained"
                        disabled={!prompt || isGenerating}
                        startIcon={isGenerating ? <CircularProgress size={20} color="inherit" /> : <AutoAwesomeIcon />}
                        sx={{ bgcolor: 'black', '&:hover': { bgcolor: '#333' } }}
                    >
                        {isGenerating ? 'Generating...' : 'Generate & Continue'}
                    </Button>
                ) : (
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        disabled={!details.name || !details.productName || !details.number}
                        sx={{ bgcolor: '#bef264', color: 'black', fontWeight: 700, '&:hover': { bgcolor: '#a3e635' } }}
                    >
                        Post Request
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default BuyerRequestModal;
