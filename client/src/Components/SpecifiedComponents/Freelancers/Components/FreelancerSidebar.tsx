import { Box, Typography, Paper, Stack, Button, IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, InputAdornment, Avatar, Chip, Fade, CircularProgress, Collapse, Link } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserService, AuthService, UploadService } from '../../../../services/api';




const FreelancerSidebar = () => {
    const navigate = useNavigate();
    // Register State
    const [openRegisterDialog, setOpenRegisterDialog] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [status, setStatus] = useState<string>('Pending');
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        const fetchUserStatus = async () => {
            try {
                const { data: user } = await AuthService.getMe();
                if (user?.freelancer?.isRegistered) {
                    setIsRegistered(true);
                    setStatus(user.freelancer.status || 'Pending');
                    setRegisterData(prev => ({
                        ...prev,
                        name: user.profile?.name || user.username || '',
                        email: user.email || '',
                        phone: user.phone || user.profile?.phone || '',
                        category: user.freelancer.category || '',
                        portfolio: user.freelancer.portfolio || '',
                        panNumber: user.freelancer.panNumber || '',
                        freelancerId: user.freelancer.freelancerId || '',
                        taskLink: user.freelancer.taskLink || '',
                        taskDescription: user.freelancer.taskDescription || '',
                        categoryType: user.freelancer.categoryType || 'Quest',
                        timeline: user.freelancer.timeline || '5 days',
                        question: user.freelancer.question || '',
                        answers: user.freelancer.answers || ['', '', '', '', '']
                    }));
                    if (user.freelancer.question) setShowInputs(true);
                }
            } catch (error: any) {
                if (error.response?.status !== 401) {
                    console.error("Failed to fetch user status", error);
                }
            }
        };
        fetchUserStatus();
    }, []);
    const [step, setStep] = useState(1);
    const [panError, setPanError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showInputs, setShowInputs] = useState(false);
    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        category: '',
        portfolio: '',
        panNumber: '',
        panFile: null as File | null,
        freelancerId: '',
        freelancerIdFile: null as File | null,
        taskLink: '',
        taskFile: null as File | null,
        answers: ['', '', '', '', ''],
        timeline: '5 days',
        categoryType: 'Quest',
        question: '',
        taskDescription: '',
        extraImagesFiles: [] as File[]
    });

    const fillRandomData = () => {
        const profiles = [
            {
                category: 'Creative & Design',
                categoryType: 'Premium',
                question: 'How do you handle complex brand style guides?',
                timeline: '4 days',
                taskDescription: 'Designed a 50-page brand identity manual for an AI startup.',
                answers: [
                    'Mastery of Figma, Photoshop, and Illustrator.',
                    '7+ years working with Fortune 500 tech companies.',
                    'Developed proprietary "Grid-First" design systems.',
                    'User-centric approach with heavy focus on accessibility.',
                    'Available 30hrs/week for high-priority projects.'
                ]
            },
            {
                category: 'Technology & IT',
                categoryType: 'Enterprise',
                question: 'What is your stack for building scalable real-time apps?',
                timeline: '7 days',
                taskDescription: 'Developed a real-time trading dashboard using Socket.io and Redis.',
                answers: [
                    'MERN Stack specialist with advanced AWS knowledge.',
                    'Built 10+ production-grade enterprise SaaS platforms.',
                    'Terraform, Docker, and Kubernetes for orchestration.',
                    'Clean Architecture and TDD principles strictly followed.',
                    'Full-time availability with 24/7 support for critical bugs.'
                ]
            },
            {
                category: 'Marketing & Business',
                categoryType: 'Strategy',
                question: 'Describe your process for A/B testing high-traffic landing pages.',
                timeline: '3 days',
                taskDescription: 'Conducted conversion rate optimization for a major E-commerce checkout flow.',
                answers: [
                    'Expert in Google Analytics 4 and HubSpot.',
                    'Increased conversions by average 45% for past 3 clients.',
                    'Hotjar, Optimizely, and custom Python tracking scripts.',
                    'Data-driven decision making based on heatmaps.',
                    'Flexible project-based scheduling.'
                ]
            }
        ];

        const randomProfile = profiles[Math.floor(Math.random() * profiles.length)];

        setRegisterData({
            ...registerData,
            panNumber: 'ABCDE1234F',
            category: randomProfile.category,
            categoryType: randomProfile.categoryType,
            question: randomProfile.question,
            timeline: randomProfile.timeline,
            taskDescription: randomProfile.taskDescription,
            taskLink: 'https://github.com/freelancer/sample-project',
            answers: randomProfile.answers
        });
        setShowInputs(true);
    };

    const validatePan = (pan: string) => {
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        return panRegex.test(pan);
    };

    const handlePanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.toUpperCase();
        setRegisterData({ ...registerData, panNumber: val });
        if (val.length === 10) {
            setPanError(!validatePan(val));
        } else {
            setPanError(false);
        }
    };



    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setRegisterData({ ...registerData, panFile: event.target.files[0] });
        }
    };

    const handleExtraImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files);
            setRegisterData({ ...registerData, extraImagesFiles: [...registerData.extraImagesFiles, ...filesArray] });
        }
    };





    // AI Generation State
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!prompt) return;
        setIsGenerating(true);
        try {
            const API_KEY = "FPSX9eeb26f1be1427e9773dfd2d7e3f4447"; // Freepik Key
            const response = await fetch('/freepik-api/v1/ai/text-to-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-freepik-api-key': API_KEY, 'Accept': 'application/json' },
                body: JSON.stringify({ prompt: prompt, aspect_ratio: "square", num_images: 1 })
            });
            if (!response.ok) throw new Error('API Failed');
            const data = await response.json();
            let imageUrl = null;
            if (data.data?.length > 0) imageUrl = data.data[0].base64 ? `data:image/png;base64,${data.data[0].base64}` : data.data[0].url;
            if (!imageUrl && data.url) imageUrl = data.url;
            if (imageUrl) setGeneratedImage(imageUrl);
        } catch (error: any) {
            console.error('Error generating image:', error);
            alert(`Failed: ${error.message}`);
        } finally {
            setIsGenerating(false);
        }
    };

    const userRole = localStorage.getItem('userRole');

    return (
        <Stack spacing={3}>
            {/* User Profile Card */}
            {userRole !== 'Buyer' && (
                <Paper
                    elevation={0}
                    sx={{
                        bgcolor: 'white',
                        p: 3,
                        borderRadius: 4,
                        border: '1px solid #e2e8f0',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative' // For the 'interesting' brain button
                    }}
                >
                    {/* Floating Brain Button (The "Interesting" Button) */}
                    <Box
                        sx={{
                            position: 'absolute',
                            right: -12,
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
                            border: '1px solid #e2e8f0',
                            borderRight: 'none',
                            cursor: 'pointer',
                            zIndex: 10,
                            '&:hover': { width: 42 }
                        }}
                    >
                        <Box
                            sx={{
                                width: 20,
                                height: 20,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #FF8ED4)',
                                color: 'white',
                                fontSize: '10px'
                            }}
                        >
                            🧠
                        </Box>
                    </Box>

                    {!isRegistered ? (
                        <>
                            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                                <PersonOutlineIcon sx={{ color: 'black' }} />
                                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem' }}>For Freelancers & Sellers</Typography>
                            </Stack>

                            <Typography variant="body2" sx={{ color: '#64748b', mb: 3, lineHeight: 1.5 }}>
                                Log in to view exclusive buyer requests, manage your profile, and bid on projects.
                            </Typography>

                            <Stack spacing={2}>
                                <Button
                                    fullWidth
                                    onClick={() => setOpenRegisterDialog(true)}
                                    sx={{
                                        bgcolor: '#f1f5f9',
                                        color: 'black',
                                        borderRadius: 2,
                                        fontWeight: 700,
                                        textTransform: 'none',
                                        py: 1.5,
                                        '&:hover': { bgcolor: '#e2e8f0' }
                                    }}
                                >
                                    Register as Freelancer
                                </Button>
                            </Stack>
                        </>
                    ) : (
                        <>
                            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                                <Avatar
                                    sx={{
                                        bgcolor: '#bef264',
                                        color: 'black',
                                        fontWeight: 700,
                                        width: 56,
                                        height: 56,
                                        fontSize: '1.25rem'
                                    }}
                                >
                                    {registerData.name.charAt(0).toUpperCase()}
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                                        {registerData.name || "User Name"}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#64748b' }}>
                                        {registerData.category || "Freelancer"}
                                    </Typography>
                                </Box>
                            </Stack>

                            <Chip
                                icon={<CheckCircleIcon sx={{ fontSize: '1rem !important' }} />}
                                label={status === 'Approved' ? "Verified Freelancer" : (status === 'Rejected' ? "Application Rejected" : "Verification Pending")}
                                color={status === 'Approved' ? "success" : (status === 'Rejected' ? "error" : "warning")}
                                variant="outlined"
                                size="small"
                                sx={{ alignSelf: 'flex-start', mb: 3, fontWeight: 600 }}
                            />


                            <Stack spacing={2}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    onClick={() => setShowDetails(!showDetails)}
                                    endIcon={<ExpandMoreIcon sx={{ transform: showDetails ? 'rotate(180deg)' : 'none', transition: '0.3s' }} />}
                                    sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600, color: '#64748b', borderColor: '#e2e8f0' }}
                                >
                                    Registration Details
                                </Button>

                                <Collapse in={showDetails}>
                                    <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 3, mb: 2, border: '1px solid #e2e8f0' }}>
                                        <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', display: 'block', mb: 1 }}>IDENTITY INFO</Typography>
                                        <Stack spacing={1} sx={{ mb: 2 }}>
                                            <Typography variant="caption" sx={{ display: 'block' }}><strong>Email:</strong> {registerData.email || 'N/A'}</Typography>
                                            <Typography variant="caption" sx={{ display: 'block' }}><strong>Phone:</strong> {registerData.phone || 'N/A'}</Typography>
                                            <Typography variant="caption" sx={{ display: 'block' }}><strong>PAN:</strong> {registerData.panNumber || 'N/A'}</Typography>
                                            <Typography variant="caption" sx={{ display: 'block' }}><strong>ID:</strong> {registerData.freelancerId || 'N/A'}</Typography>
                                            <Typography variant="caption" sx={{ display: 'block' }}><strong>Type:</strong> {registerData.categoryType || 'N/A'}</Typography>
                                            <Typography variant="caption" sx={{ display: 'block' }}><strong>Timeline:</strong> {registerData.timeline || 'N/A'}</Typography>
                                        </Stack>

                                        <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', display: 'block', mb: 1 }}>SPECIALTY QUESTION</Typography>
                                        <Typography variant="caption" sx={{ display: 'block', mb: 2, bgcolor: '#eff6ff', p: 1, borderRadius: 1 }}>
                                            {registerData.question || 'No question provided'}
                                        </Typography>

                                        <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', display: 'block', mb: 1 }}>PORTFOLIO & LINKS</Typography>
                                        <Stack spacing={0.5} sx={{ mb: 2 }}>
                                            {registerData.portfolio && <Link href={registerData.portfolio} target="_blank" sx={{ fontSize: '0.75rem', display: 'block' }}>My Portfolio</Link>}
                                        </Stack>


                                    </Box>
                                </Collapse>

                                <Button
                                    fullWidth
                                    variant="outlined"
                                    onClick={() => navigate('/seller/edit-profile')}
                                    sx={{
                                        borderRadius: 2,
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        borderColor: '#e2e8f0',
                                        color: '#475569',
                                        '&:hover': { borderColor: '#cbd5e1', bgcolor: '#f8fafc' }
                                    }}
                                >
                                    Edit Profile
                                </Button>
                                <Button
                                    fullWidth
                                    onClick={() => navigate('/seller/profile')}
                                    sx={{
                                        bgcolor: '#0f172a',
                                        color: 'white',
                                        borderRadius: 2,
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        py: 1.5,
                                        '&:hover': { bgcolor: '#334155' }
                                    }}
                                >
                                    Dashboard
                                </Button>
                            </Stack>




                        </>
                    )}
                </Paper>
            )}

            {/* AI Image Generation Tool - PREMIUM REDESIGN */}
            {userRole !== 'Seller' && (
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
                    {/* Header */}
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
                        <Box sx={{
                            width: 40,
                            height: 40,
                            bgcolor: '#0f172a',
                            borderRadius: 2.5,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white'
                        }}>
                            <AutoFixHighIcon sx={{ fontSize: 20 }} />
                        </Box>
                        <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 900, lineHeight: 1.1, color: '#0f172a' }}>
                                AI Visual Studio
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800, letterSpacing: 1.5, fontSize: '0.6rem' }}>
                                PRO GENERATOR
                            </Typography>
                        </Box>
                    </Stack>

                    {/* Image Preview Area */}
                    <Box
                        sx={{
                            bgcolor: '#f8fafc',
                            borderRadius: 5,
                            mb: 3,
                            position: 'relative',
                            aspectRatio: '1/1',
                            overflow: 'hidden',
                            display: 'flex',
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
                            <Stack alignItems="center" spacing={1.5} sx={{ color: '#cbd5e1' }}>
                                <ImageOutlinedIcon sx={{ fontSize: 32 }} />
                                <Typography variant="caption" sx={{ fontWeight: 700 }}>Preview Area</Typography>
                            </Stack>
                        )}

                        {isGenerating && (
                            <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'rgba(255,255,255,0.8)', zIndex: 5, backdropFilter: 'blur(4px)' }}>
                                <CircularProgress sx={{ color: '#adc9d1' }} />
                            </Box>
                        )}
                    </Box>

                    {/* Prompt Input */}
                    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', mb: 3 }}>
                        <Typography variant="caption" sx={{ color: '#94a3b8', mb: 1, fontWeight: 800 }}>PROMPT</Typography>
                        <TextField
                            multiline
                            rows={3}
                            placeholder="Describe the image..."
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            fullWidth
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    bgcolor: '#f8fafc',
                                    borderRadius: 3,
                                    fontSize: '0.85rem',
                                    '& fieldset': { borderColor: '#e2e8f0' },
                                    '&:hover fieldset': { borderColor: '#cbd5e1' },
                                    '&.Mui-focused fieldset': { borderColor: '#adc9d1' },
                                }
                            }}
                        />
                    </Box>

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
                            letterSpacing: 1,
                            fontSize: '0.95rem',
                            boxShadow: '0 10px 20px rgba(173, 201, 209, 0.2)',
                            '&:hover': { bgcolor: '#9bbec9', boxShadow: '0 15px 25px rgba(173, 201, 209, 0.3)' },
                            '&:disabled': { bgcolor: '#f1f5f9', color: '#cbd5e1' }
                        }}
                    >
                        {isGenerating ? 'Synthesizing...' : 'Generate Masterpiece'}
                    </Button>
                </Paper>
            )}



            {/* Freelancer Registration Dialog */}
            <Dialog
                open={openRegisterDialog}
                onClose={() => setOpenRegisterDialog(false)}
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        bgcolor: 'white',
                        minWidth: 500,
                        maxWidth: 550,
                        p: 2
                    }
                }}
            >
                <DialogTitle sx={{ pb: 0 }}>
                    <Stack spacing={1}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            {step === 2 && (
                                <IconButton size="small" onClick={() => setStep(1)} sx={{ ml: -1 }}>
                                    <ArrowBackIcon fontSize="small" />
                                </IconButton>
                            )}
                            <Box sx={{ bgcolor: '#bef264', width: 20, height: 20, borderRadius: 1 }} />
                            <Typography variant="overline" sx={{ fontWeight: 700, color: '#94a3b8', letterSpacing: 1 }}>
                                ADMIN PANEL SETUP
                            </Typography>
                        </Stack>

                        <Typography variant="h4" sx={{ fontWeight: 800 }}>
                            Freelancer Registration
                        </Typography>

                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography variant="body2" sx={{ color: step === 1 ? '#84cc16' : '#94a3b8', fontWeight: 600 }}>
                                Step 1: Account Details
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#cbd5e1' }}>/</Typography>
                            <Typography variant="body2" sx={{ color: step === 2 ? '#84cc16' : '#94a3b8', fontWeight: 600 }}>
                                Step 2: Profile Setup
                            </Typography>
                        </Stack>
                    </Stack>
                </DialogTitle>

                <DialogContent sx={{ mt: 2 }}>
                    <Stack spacing={3}>
                        {step === 1 ? (
                            <>


                                <Box>
                                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Full Name</Typography>
                                    <TextField
                                        fullWidth
                                        placeholder="e.g. Alex Rivera"
                                        variant="outlined"
                                        value={registerData.name}
                                        onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonOutlineIcon sx={{ color: '#94a3b8' }} />
                                                </InputAdornment>
                                            ),
                                            sx: { bgcolor: '#f8fafc', borderRadius: 2 }
                                        }}
                                    />
                                </Box>

                                <Stack direction="row" spacing={2}>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Email Address</Typography>
                                        <TextField
                                            fullWidth
                                            placeholder="alex@example.com"
                                            variant="outlined"
                                            value={registerData.email}
                                            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <EmailOutlinedIcon sx={{ color: '#94a3b8' }} />
                                                    </InputAdornment>
                                                ),
                                                sx: { bgcolor: '#f8fafc', borderRadius: 2 }
                                            }}
                                        />
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Phone Number</Typography>
                                        <TextField
                                            fullWidth
                                            placeholder="+1 (555) 000-0000"
                                            variant="outlined"
                                            value={registerData.phone}
                                            onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PhoneOutlinedIcon sx={{ color: '#94a3b8' }} />
                                                    </InputAdornment>
                                                ),
                                                sx: { bgcolor: '#f8fafc', borderRadius: 2 }
                                            }}
                                        />
                                    </Box>
                                </Stack>

                                <Box>
                                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Password</Typography>
                                    <TextField
                                        fullWidth
                                        placeholder="Min. 8 characters"
                                        type={showPassword ? 'text' : 'password'}
                                        variant="outlined"
                                        value={registerData.password}
                                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockOutlinedIcon sx={{ color: '#94a3b8' }} />
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                            sx: { bgcolor: '#f8fafc', borderRadius: 2 }
                                        }}
                                    />
                                </Box>

                                <Box>
                                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Category</Typography>
                                    <TextField
                                        select
                                        fullWidth
                                        placeholder="Select your role"
                                        variant="outlined"
                                        value={registerData.category}
                                        onChange={(e) => setRegisterData({ ...registerData, category: e.target.value })}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <WorkOutlineIcon sx={{ color: '#94a3b8' }} />
                                                </InputAdornment>
                                            ),
                                            sx: { bgcolor: '#f8fafc', borderRadius: 2 }
                                        }}
                                    >
                                        <MenuItem value="Technology & IT">Technology & IT</MenuItem>
                                        <MenuItem value="Creative & Design">Creative & Design</MenuItem>
                                        <MenuItem value="Marketing & Business">Marketing & Business</MenuItem>
                                        <MenuItem value="Manufacturing">Manufacturing</MenuItem>
                                        <MenuItem value="Administration">Administration</MenuItem>
                                        <MenuItem value="Writing & Translation">Writing & Translation</MenuItem>
                                    </TextField>
                                </Box>

                                <Box>
                                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Portfolio Link</Typography>
                                    <TextField
                                        fullWidth
                                        placeholder="https://dribbble.com/alex"
                                        variant="outlined"
                                        value={registerData.portfolio}
                                        onChange={(e) => setRegisterData({ ...registerData, portfolio: e.target.value })}
                                        InputProps={{
                                            sx: { bgcolor: '#f8fafc', borderRadius: 2 }
                                        }}
                                    />
                                </Box>
                            </>
                        ) : (
                            <>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                    <Box>
                                        <Typography variant="h6" sx={{ fontWeight: 700 }}>Identity Verification</Typography>
                                        <Typography variant="body2" sx={{ color: '#64748b', mb: 2 }}>
                                            To ensure safety and authenticity, please provide your professional details.
                                        </Typography>
                                    </Box>
                                    <Button
                                        size="small"
                                        startIcon={<AutoFixHighIcon />}
                                        onClick={fillRandomData}
                                        sx={{
                                            bgcolor: '#bef264',
                                            color: 'black',
                                            fontWeight: 700,
                                            '&:hover': { bgcolor: '#a3e635' },
                                            borderRadius: 2,
                                            textTransform: 'none'
                                        }}
                                    >
                                        Magic Fill
                                    </Button>
                                </Box>

                                <Box>
                                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>PAN Card Number</Typography>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        placeholder="ABCDE1234F"
                                        inputProps={{ maxLength: 10, style: { textTransform: 'uppercase' } }}
                                        value={registerData.panNumber}
                                        onChange={handlePanChange}
                                        error={panError}
                                        helperText={panError ? "Invalid PAN Format (e.g. ABCDE1234F)" : ""}
                                        InputProps={{
                                            sx: { bgcolor: '#f8fafc', borderRadius: 2 }
                                        }}
                                    />
                                </Box>

                                <Box>
                                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Upload PAN Card</Typography>
                                    <Box
                                        component="label"
                                        sx={{
                                            border: '2px dashed #e2e8f0',
                                            borderRadius: 2,
                                            p: 4,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                            bgcolor: registerData.panFile ? '#f0fdf4' : '#f8fafc',
                                            transition: 'all 0.2s',
                                            '&:hover': { bgcolor: '#f1f5f9', borderColor: '#cbd5e1' }
                                        }}
                                    >
                                        <input
                                            type="file"
                                            hidden
                                            accept="image/*,application/pdf"
                                            onChange={handleFileChange}
                                        />
                                        {registerData.panFile ? (
                                            <>
                                                <CheckCircleIcon sx={{ fontSize: 48, color: '#22c55e', mb: 1 }} />
                                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>File Selected</Typography>
                                                <Typography variant="caption" sx={{ color: '#64748b' }}>{registerData.panFile.name}</Typography>
                                            </>
                                        ) : (
                                            <>
                                                <CloudUploadIcon sx={{ fontSize: 48, color: '#94a3b8', mb: 1 }} />
                                                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#475569' }}>Upload PAN Card</Typography>
                                                <Typography variant="caption" sx={{ color: '#94a3b8' }}>Supports JPG, PNG, PDF</Typography>
                                            </>
                                        )}
                                    </Box>
                                </Box>

                                <Box sx={{ my: 2, borderBottom: '1px solid #e2e8f0' }} />

                                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Category Type</Typography>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            value={registerData.categoryType}
                                            onChange={(e) => setRegisterData({ ...registerData, categoryType: e.target.value })}
                                            InputProps={{ sx: { bgcolor: '#f8fafc', borderRadius: 2 } }}
                                        />
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Timeline</Typography>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            value={registerData.timeline}
                                            onChange={(e) => setRegisterData({ ...registerData, timeline: e.target.value })}
                                            InputProps={{ sx: { bgcolor: '#f8fafc', borderRadius: 2 } }}
                                        />
                                    </Box>
                                </Box>

                                <Button
                                    fullWidth
                                    variant="outlined"
                                    onClick={fillRandomData}
                                    startIcon={<AutoFixHighIcon />}
                                    sx={{
                                        py: 1.5,
                                        borderRadius: 2,
                                        textTransform: 'none',
                                        fontWeight: 700,
                                        borderColor: '#bef264',
                                        color: '#65a30d',
                                        '&:hover': { bgcolor: '#f7fee7', borderColor: '#a3e635' }
                                    }}
                                >
                                    Get Random Questions
                                </Button>

                                {showInputs && (
                                    <>
                                        <Box>
                                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Specialty Question</Typography>
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                placeholder="Enter your specialty question"
                                                value={registerData.question}
                                                onChange={(e) => setRegisterData({ ...registerData, question: e.target.value })}
                                                InputProps={{ sx: { bgcolor: '#f8fafc', borderRadius: 2 } }}
                                            />
                                        </Box>

                                        <Box>
                                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Task Description</Typography>
                                            <TextField
                                                fullWidth
                                                multiline
                                                rows={2}
                                                variant="outlined"
                                                placeholder="Briefly describe your recent task..."
                                                value={registerData.taskDescription}
                                                onChange={(e) => setRegisterData({ ...registerData, taskDescription: e.target.value })}
                                                InputProps={{ sx: { bgcolor: '#f8fafc', borderRadius: 2 } }}
                                            />
                                        </Box>

                                        <Box>
                                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Skill Assessment (5 Questions)</Typography>
                                            <Stack spacing={2}>
                                                {registerData.answers.map((answer, index) => (
                                                    <TextField
                                                        key={index}
                                                        fullWidth
                                                        size="small"
                                                        variant="outlined"
                                                        placeholder={`Question ${index + 1}: ${index === 0 ? "Expertise" :
                                                            index === 1 ? "Experience" :
                                                                index === 2 ? "Tools" :
                                                                    index === 3 ? "Approach" : "Availability"
                                                            }`}
                                                        value={answer}
                                                        onChange={(e) => {
                                                            const newAnswers = [...registerData.answers];
                                                            newAnswers[index] = e.target.value;
                                                            setRegisterData({ ...registerData, answers: newAnswers });
                                                        }}
                                                        InputProps={{ sx: { bgcolor: '#f8fafc', borderRadius: 2 } }}
                                                    />
                                                ))}
                                            </Stack>
                                        </Box>

                                        <Box>
                                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Task Link</Typography>
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                placeholder="https://github.com/alex/task"
                                                value={registerData.taskLink}
                                                onChange={(e) => setRegisterData({ ...registerData, taskLink: e.target.value })}
                                                InputProps={{ sx: { bgcolor: '#f8fafc', borderRadius: 2 } }}
                                            />
                                        </Box>
                                    </>
                                )}

                                <Box>
                                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Extra Images</Typography>
                                    <Box
                                        component="label"
                                        sx={{
                                            border: '2px dashed #e2e8f0',
                                            borderRadius: 2,
                                            p: 3,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                            bgcolor: '#f8fafc',
                                            '&:hover': { bgcolor: '#f1f5f9' }
                                        }}
                                    >
                                        <input type="file" hidden multiple accept="image/*" onChange={handleExtraImagesChange} />
                                        <CloudUploadIcon sx={{ fontSize: 32, color: '#94a3b8', mb: 1 }} />
                                        <Typography variant="caption" sx={{ color: '#475569', fontWeight: 600 }}>Click to upload multiple images</Typography>
                                        {registerData.extraImagesFiles.length > 0 && (
                                            <Typography variant="caption" sx={{ color: '#22c55e', mt: 1 }}>
                                                {registerData.extraImagesFiles.length} images selected
                                            </Typography>
                                        )}
                                    </Box>
                                </Box>
                            </>
                        )}
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 4, pt: 2, justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Button
                        variant="contained"
                        endIcon={<ArrowForwardIcon />}
                        onClick={async () => {
                            if (step === 1) {
                                setStep(2);
                            } else {
                                // Check PAN (optional)
                                if (registerData.panNumber || registerData.panFile) {
                                    // User is providing PAN, validate both number and file
                                    if (!registerData.panNumber) {
                                        alert("Please enter PAN Number");
                                        return;
                                    }
                                    if (panError || !validatePan(registerData.panNumber)) {
                                        alert("Invalid PAN Number");
                                        return;
                                    }
                                    if (!registerData.panFile) {
                                        alert("Please upload PAN Card document");
                                        return;
                                    }
                                }
                                // Check Task or Freelancer ID
                                // Validation finished for Step 2

                                try {
                                    let panUrl = '';
                                    if (registerData.panFile) {
                                        const res = await UploadService.uploadImage(registerData.panFile);
                                        panUrl = res.data?.url || res.data?.secure_url || '';
                                        if (!panUrl) throw new Error(res.data?.message || 'PAN upload failed');
                                    }
                                    let idUrl = '';
                                    if (registerData.freelancerIdFile) {
                                        const res = await UploadService.uploadImage(registerData.freelancerIdFile);
                                        idUrl = res.data?.url || res.data?.secure_url || '';
                                        if (!idUrl) throw new Error(res.data?.message || 'ID document upload failed');
                                    }

                                    const extraImagesUrls: string[] = [];
                                    for (const file of registerData.extraImagesFiles) {
                                        const res = await UploadService.uploadImage(file);
                                        const url = res.data?.url || res.data?.secure_url || '';
                                        if (url) extraImagesUrls.push(url);
                                    }

                                    await UserService.registerFreelancer({
                                        panNumber: registerData.panNumber,
                                        panFile: panUrl,
                                        freelancerId: registerData.freelancerId,
                                        freelancerIdFile: idUrl,
                                        category: registerData.category,
                                        portfolio: registerData.portfolio,
                                        taskLink: registerData.taskLink,
                                        taskDescription: registerData.taskDescription,
                                        timeline: registerData.timeline,
                                        categoryType: registerData.categoryType,
                                        question: registerData.question,
                                        extraImages: extraImagesUrls,
                                        answers: registerData.answers
                                    });

                                    alert("Registration Successful! Your verification is pending.");
                                    setIsRegistered(true);
                                    setStatus('Pending');
                                    setOpenRegisterDialog(false);
                                    setStep(1);
                                    setRegisterData({
                                        name: '', email: '', phone: '', password: '', category: '', portfolio: '',
                                        panNumber: '', panFile: null, freelancerId: '', freelancerIdFile: null,
                                        taskLink: '', taskFile: null, answers: ['', '', '', '', ''],
                                        timeline: '5 days', categoryType: 'Quest', question: '', taskDescription: '', extraImagesFiles: [] as File[]
                                    });
                                } catch (err: any) {
                                    alert(err.response?.data?.message || err.message || "Registration failed");
                                }
                            }
                        }}
                        sx={{
                            bgcolor: '#bef264',
                            color: 'black',
                            fontWeight: 700,
                            px: 4,
                            py: 1.5,
                            borderRadius: 2,
                            textTransform: 'none',
                            fontSize: '1rem',
                            '&:hover': { bgcolor: '#a3e635' }
                        }}
                    >
                        {step === 1 ? 'NEXT' : 'Register Now'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Stack>
    );
};

export default FreelancerSidebar;
