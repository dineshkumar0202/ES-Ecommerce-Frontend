import { useState, useEffect, useRef } from 'react';
import {
    Box, Typography, Container, Paper, Stack, Button, IconButton,
    CircularProgress, Fade, Stepper, Step, StepLabel
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import PersonIcon from '@mui/icons-material/Person';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import ImageIcon from '@mui/icons-material/Image';
import Navbar from '../WrapperComponents/Navbar';
import Footer from '../WrapperComponents/Footer';
import { FreelanceService, UploadService } from '../../services/api';
import { toast } from 'react-toastify';

const steps = ['Outfit Image', 'Person Image', 'Virtual Try-On'];

const VirtualTryOn = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // State from navigation
    const garmentImage: string = location.state?.garmentImage || '';
    const originalPrompt: string = location.state?.prompt || '';
    const postFormData: any = location.state?.formData || null;

    // Component state
    const [activeStep, setActiveStep] = useState(garmentImage ? 1 : 0);
    const [personImage, setPersonImage] = useState<string>('');
    const [isUploading, setIsUploading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [tryOnResult, setTryOnResult] = useState<string | null>(null);

    // Redirect if no garment image or not logged in
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Please log in to use Virtual Try-On.');
            navigate('/login');
            return;
        }
        if (!garmentImage) {
            toast.error('No outfit image found. Please generate one first.');
            navigate('/freelance');
        }
    }, [garmentImage, navigate]);

    // Handle person image file upload
    const handlePersonImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);

        try {
            // Upload to Cloudinary via backend
            const { data } = await UploadService.uploadImagePublic(file);
            const uploadedUrl = data.url || data.secure_url || data.imageUrl;
            if (uploadedUrl) {
                setPersonImage(uploadedUrl);
                setActiveStep(2);
                toast.success('Person image uploaded!');
            } else {
                throw new Error('No URL returned from upload');
            }
        } catch (error: any) {
            console.error('Upload failed:', error);
            // Fallback: use local preview
            const reader = new FileReader();
            reader.onload = () => {
                setPersonImage(reader.result as string);
                setActiveStep(2);
            };
            reader.readAsDataURL(file);
            toast.info('Using local preview (upload failed).');
        } finally {
            setIsUploading(false);
        }
    };

    // Start the virtual try-on
    const handleStartTryOn = async () => {
        if (!garmentImage || !personImage) {
            toast.error('Both images are required.');
            return;
        }

        // Auth check
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Please log in to use Virtual Try-On.');
            navigate('/login');
            return;
        }

        setIsProcessing(true);
        setTryOnResult(null);

        try {
            const { data } = await FreelanceService.startTryOn(personImage, garmentImage);

            if (data.isMock) {
                // Mock mode - simulate result
                setTimeout(() => {
                    setTryOnResult(garmentImage);
                    setIsProcessing(false);
                    toast.success('Try-on completed! (Mock Mode)');
                }, 2000);
                return;
            }

            if (data.status === 'completed' && data.output?.length > 0) {
                setTryOnResult(data.output[0]);
                setIsProcessing(false);
                toast.success('Virtual try-on completed!');
            } else if (data.id) {
                // Start polling
                pollForResult(data.id);
            } else {
                throw new Error('Unexpected response from try-on API');
            }
        } catch (error: any) {
            console.error('Try-on failed:', error);
            toast.error(error.response?.data?.message || 'Virtual try-on failed.');
            setIsProcessing(false);
        }
    };

    // Poll for try-on result
    const pollForResult = async (id: string) => {
        let attempts = 0;
        const maxAttempts = 60; // 5 minutes max (5s interval)

        const poll = async () => {
            if (attempts >= maxAttempts) {
                setIsProcessing(false);
                toast.error('Try-on timed out. Please try again.');
                return;
            }

            try {
                const { data } = await FreelanceService.getTryOnStatus(id);

                if (data.status === 'completed' && data.output?.length > 0) {
                    setTryOnResult(data.output[0]);
                    setIsProcessing(false);
                    toast.success('Virtual try-on completed!');
                    return;
                } else if (data.status === 'failed') {
                    setIsProcessing(false);
                    toast.error('Try-on processing failed.');
                    return;
                }

                // Still processing, poll again
                attempts++;
                setTimeout(poll, 5000);
            } catch (error) {
                attempts++;
                setTimeout(poll, 5000);
            }
        };

        setTimeout(poll, 5000);
    };

    // Post the original generated image (outfit)
    const handlePostOriginal = () => {
        navigate('/freelance', {
            state: {
                autoPost: true,
                postImage: garmentImage,
                postPrompt: originalPrompt,
                formData: postFormData
            }
        });
    };

    // Post the try-on result (person + outfit)
    const handlePostResult = () => {
        if (!tryOnResult) return;
        navigate('/freelance', {
            state: {
                autoPost: true,
                postImage: tryOnResult,
                postPrompt: `Virtual Try-On: ${originalPrompt}`,
                formData: {
                    ...postFormData,
                    productName: `${postFormData?.productName || 'Try-On'} (Virtual Look)`,
                    description: `${postFormData?.description || ''} \n\nFeaturing virtual try-on technology.`
                }
            }
        });
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
                {/* Header */}
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
                    <IconButton onClick={() => navigate('/freelance')} sx={{ bgcolor: 'white', border: '1px solid #e2e8f0' }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 900, color: '#0f172a', lineHeight: 1.1 }}>
                            Virtual Try-On Studio
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 600 }}>
                            See how the outfit looks on a person using AI
                        </Typography>
                    </Box>
                </Stack>

                {/* Stepper */}
                <Paper elevation={0} sx={{ p: 3, borderRadius: 4, mb: 4, border: '1px solid #e2e8f0' }}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label, index) => (
                            <Step key={label} completed={index < activeStep}>
                                <StepLabel
                                    StepIconProps={{
                                        sx: {
                                            '&.Mui-active': { color: '#0f172a' },
                                            '&.Mui-completed': { color: '#22c55e' },
                                        }
                                    }}
                                >
                                    <Typography variant="caption" sx={{ fontWeight: 700 }}>{label}</Typography>
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Paper>

                {/* Main Content */}
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>

                    {/* Card 1: Garment/Outfit Image */}
                    <Paper elevation={0} sx={{
                        borderRadius: 6, overflow: 'hidden', border: '1px solid #e2e8f0',
                        display: 'flex', flexDirection: 'column'
                    }}>
                        <Box sx={{ px: 3, py: 2, bgcolor: '#0f172a', color: 'white' }}>
                            <Stack direction="row" alignItems="center" spacing={1.5}>
                                <CheckroomIcon sx={{ fontSize: 20 }} />
                                <Typography variant="subtitle2" sx={{ fontWeight: 800, letterSpacing: 0.5 }}>
                                    OUTFIT IMAGE
                                </Typography>
                                {garmentImage && <CheckCircleIcon sx={{ fontSize: 18, color: '#22c55e', ml: 'auto !important' }} />}
                            </Stack>
                        </Box>
                        <Box sx={{
                            aspectRatio: '3/4', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            bgcolor: '#f1f5f9', position: 'relative'
                        }}>
                            {garmentImage ? (
                                <Fade in>
                                    <Box component="img" src={garmentImage}
                                        sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </Fade>
                            ) : (
                                <Stack alignItems="center" spacing={1} sx={{ color: '#cbd5e1' }}>
                                    <ImageIcon sx={{ fontSize: 48 }} />
                                    <Typography variant="caption" sx={{ fontWeight: 700 }}>No outfit image</Typography>
                                </Stack>
                            )}
                        </Box>
                        <Box sx={{ px: 3, py: 2, bgcolor: 'white' }}>
                            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700 }}>
                                {originalPrompt ? `"${originalPrompt.substring(0, 60)}..."` : 'AI Generated Outfit'}
                            </Typography>
                        </Box>
                    </Paper>

                    {/* Card 2: Person Image Upload */}
                    <Paper elevation={0} sx={{
                        borderRadius: 6, overflow: 'hidden',
                        border: personImage ? '2px solid #22c55e' : '2px dashed #cbd5e1',
                        display: 'flex', flexDirection: 'column', transition: 'all 0.3s'
                    }}>
                        <Box sx={{ px: 3, py: 2, bgcolor: personImage ? '#0f172a' : '#f8fafc', color: personImage ? 'white' : '#475569' }}>
                            <Stack direction="row" alignItems="center" spacing={1.5}>
                                <PersonIcon sx={{ fontSize: 20 }} />
                                <Typography variant="subtitle2" sx={{ fontWeight: 800, letterSpacing: 0.5 }}>
                                    PERSON IMAGE
                                </Typography>
                                {personImage && <CheckCircleIcon sx={{ fontSize: 18, color: '#22c55e', ml: 'auto !important' }} />}
                            </Stack>
                        </Box>
                        <Box
                            onClick={() => !isUploading && fileInputRef.current?.click()}
                            sx={{
                                aspectRatio: '3/4', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                bgcolor: '#f8fafc', cursor: 'pointer', position: 'relative',
                                '&:hover': { bgcolor: '#f1f5f9' }, transition: 'all 0.2s'
                            }}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handlePersonImageUpload}
                            />

                            {isUploading ? (
                                <Stack alignItems="center" spacing={2}>
                                    <CircularProgress sx={{ color: '#0f172a' }} />
                                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b' }}>Uploading...</Typography>
                                </Stack>
                            ) : personImage ? (
                                <Fade in>
                                    <Box component="img" src={personImage}
                                        sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </Fade>
                            ) : (
                                <Stack alignItems="center" spacing={2} sx={{ p: 4 }}>
                                    <Box sx={{
                                        width: 80, height: 80, borderRadius: '50%', bgcolor: 'white',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        border: '2px dashed #cbd5e1', mb: 1
                                    }}>
                                        <CloudUploadIcon sx={{ fontSize: 36, color: '#94a3b8' }} />
                                    </Box>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#475569', textAlign: 'center' }}>
                                        Upload Person Photo
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: '#94a3b8', textAlign: 'center' }}>
                                        Click to upload a clear, full-body photo
                                    </Typography>
                                </Stack>
                            )}
                        </Box>
                        <Box sx={{ px: 3, py: 2, bgcolor: 'white' }}>
                            {personImage ? (
                                <Button size="small" onClick={() => fileInputRef.current?.click()}
                                    sx={{ color: '#64748b', fontWeight: 700, textTransform: 'none' }}>
                                    Change Photo
                                </Button>
                            ) : (
                                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700 }}>
                                    Supports JPG, PNG • Clear full-body recommended
                                </Typography>
                            )}
                        </Box>
                    </Paper>

                    {/* Card 3: Result */}
                    <Paper elevation={0} sx={{
                        borderRadius: 6, overflow: 'hidden',
                        border: tryOnResult ? '2px solid #8b5cf6' : '1px solid #e2e8f0',
                        display: 'flex', flexDirection: 'column',
                        boxShadow: tryOnResult ? '0 20px 40px rgba(139, 92, 246, 0.15)' : 'none'
                    }}>
                        <Box sx={{
                            px: 3, py: 2,
                            background: tryOnResult ? 'linear-gradient(135deg, #8b5cf6, #6d28d9)' : '#f8fafc',
                            color: tryOnResult ? 'white' : '#475569'
                        }}>
                            <Stack direction="row" alignItems="center" spacing={1.5}>
                                <AutoFixHighIcon sx={{ fontSize: 20 }} />
                                <Typography variant="subtitle2" sx={{ fontWeight: 800, letterSpacing: 0.5 }}>
                                    TRY-ON RESULT
                                </Typography>
                            </Stack>
                        </Box>
                        <Box sx={{
                            aspectRatio: '3/4', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            bgcolor: '#faf5ff', position: 'relative'
                        }}>
                            {isProcessing ? (
                                <Stack alignItems="center" spacing={2}>
                                    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                        <CircularProgress size={64} sx={{ color: '#8b5cf6' }} />
                                        <Box sx={{
                                            top: 0, left: 0, bottom: 0, right: 0, position: 'absolute',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        }}>
                                            <Typography variant="caption" sx={{ fontWeight: 800, color: '#8b5cf6' }}>
                                                AI
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#6d28d9' }}>
                                        Processing Try-On...
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>
                                        This may take 30-90 seconds
                                    </Typography>
                                </Stack>
                            ) : tryOnResult ? (
                                <Fade in>
                                    <Box component="img" src={tryOnResult}
                                        sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </Fade>
                            ) : (
                                <Stack alignItems="center" spacing={2} sx={{ color: '#d4d4d8', p: 4 }}>
                                    <AutoFixHighIcon sx={{ fontSize: 48 }} />
                                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#94a3b8', textAlign: 'center' }}>
                                        Result will appear here after processing
                                    </Typography>
                                </Stack>
                            )}
                        </Box>
                        <Box sx={{ px: 3, py: 2, bgcolor: 'white' }}>
                            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700 }}>
                                Powered by FASHN AI
                            </Typography>
                        </Box>
                    </Paper>
                </Box>

                {/* Action Buttons */}
                <Paper elevation={0} sx={{
                    p: 4, borderRadius: 4, mt: 4, border: '1px solid #e2e8f0',
                    display: 'flex', flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center', justifyContent: 'center', gap: 3
                }}>
                    {!tryOnResult ? (
                        <>
                            <Button
                                size="large"
                                variant="contained"
                                onClick={handleStartTryOn}
                                disabled={!garmentImage || !personImage || isProcessing}
                                startIcon={isProcessing ? <CircularProgress size={20} sx={{ color: 'white' }} /> : <AutoFixHighIcon />}
                                sx={{
                                    background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
                                    color: 'white', borderRadius: 4, fontWeight: 900,
                                    textTransform: 'uppercase', py: 2, px: 6,
                                    letterSpacing: 1, fontSize: '1rem',
                                    boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)',
                                    '&:hover': { background: 'linear-gradient(135deg, #7c3aed, #5b21b6)' },
                                    '&:disabled': { bgcolor: '#e2e8f0', color: '#94a3b8' }
                                }}
                            >
                                {isProcessing ? 'Processing...' : 'Start Virtual Try-On'}
                            </Button>

                            <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 600 }}>or</Typography>

                            <Button
                                size="large"
                                variant="outlined"
                                onClick={handlePostOriginal}
                                sx={{
                                    borderColor: '#0f172a', color: '#0f172a', borderRadius: 4,
                                    fontWeight: 800, textTransform: 'none', py: 2, px: 6,
                                    borderWidth: 2, fontSize: '0.95rem',
                                    '&:hover': { borderWidth: 2, bgcolor: '#f8fafc' }
                                }}
                            >
                                Post Original Image Instead
                            </Button>
                        </>
                    ) : (
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} flexWrap="wrap" justifyContent="center">
                            <Button
                                size="large"
                                variant="contained"
                                onClick={handlePostResult}
                                startIcon={<AutoFixHighIcon />}
                                sx={{
                                    bgcolor: '#8b5cf6', color: 'white', borderRadius: 4,
                                    fontWeight: 900, textTransform: 'uppercase', py: 2, px: 4,
                                    letterSpacing: 1, fontSize: '0.9rem',
                                    boxShadow: '0 10px 20px rgba(139, 92, 246, 0.3)',
                                    '&:hover': { bgcolor: '#7c3aed' }
                                }}
                            >
                                Post Try-On Result
                            </Button>

                            <Button
                                size="large"
                                variant="outlined"
                                onClick={handlePostOriginal}
                                startIcon={<CheckCircleIcon />}
                                sx={{
                                    borderColor: '#0f172a', color: '#0f172a', borderRadius: 4,
                                    fontWeight: 800, textTransform: 'none', py: 2, px: 4,
                                    borderWidth: 2, fontSize: '0.9rem',
                                    '&:hover': { borderWidth: 2, bgcolor: '#f1f5f9' }
                                }}
                            >
                                Post Original Outfit
                            </Button>

                            <Button
                                size="large"
                                variant="outlined"
                                onClick={() => {
                                    setPersonImage('');
                                    setTryOnResult(null);
                                    setActiveStep(1);
                                }}
                                sx={{
                                    borderColor: '#94a3b8', color: '#64748b', borderRadius: 4,
                                    fontWeight: 800, textTransform: 'none', py: 2, px: 4,
                                    borderWidth: 1.5, fontSize: '0.9rem',
                                    '&:hover': { borderWidth: 1.5, bgcolor: '#f8fafc', color: '#475569' }
                                }}
                            >
                                Try Another Person
                            </Button>
                        </Stack>
                    )}
                </Paper>
            </Container>

            <Footer />
        </Box>
    );
};

export default VirtualTryOn;
