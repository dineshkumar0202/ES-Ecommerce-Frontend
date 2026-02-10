import { Box, Typography, Paper, Stack, Button, IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, InputAdornment, Alert, Avatar, Chip, Fade, CircularProgress, Collapse, Link } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useState, useEffect } from 'react';
import { UserService, AuthService, UploadService } from '../../../../services/api';

interface FreelancerSidebarProps {
    onPost: (newPost: any) => void;
}

const SKILL_TESTS: any = {
    "Technology & IT": {
        task: "Create a responsive login form with validation using HTML/CSS/JS or a framework.",
        questions: [
            "What is the difference between specificty in CSS?",
            "Explain the concept of 'Hoisting' in JavaScript.",
            "What is the difference between SQL and NoSQL databases?",
            "Explain the purpose of React hooks.",
            "What is CI/CD?"
        ]
    },
    "Creative & Design": {
        task: "Design a modern landing page hero section for an organic food brand.",
        questions: [
            "What is the difference between RGB and CMYK?",
            "Explain the rule of thirds.",
            "What is kerning?",
            "Differentiate between vector and raster graphics.",
            "What is UI vs UX?"
        ]
    },
    "Marketing & Business": {
        task: "Create a 1-month social media strategy for a new coffee shop.",
        questions: [
            "What is SEO?",
            "Explain the 4 Ps of marketing.",
            "What is ROI?",
            "Difference between B2B and B2C.",
            "What are long-tail keywords?"
        ]
    },
    "default": {
        task: "Complete a general aptitude assessment task.",
        questions: [
            "Describe your work process.",
            "How do you handle tight deadlines?",
            "Give an example of a difficult problem you solved.",
            "What are your strengths?",
            "Where do you see yourself in 5 years?"
        ]
    }
};

const FreelancerSidebar = ({ onPost }: FreelancerSidebarProps) => {
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
                        category: user.freelancer.category || '',
                        portfolio: user.freelancer.portfolio || '',
                        panNumber: user.freelancer.panNumber || '',
                        freelancerId: user.freelancer.freelancerId || '',
                        taskLink: user.freelancer.taskLink || '',
                        answers: user.freelancer.answers || ['', '', '', '', '']
                    }));
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
    const [freelancerIdError, setFreelancerIdError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
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
        answers: ['', '', '', '', '']
    });

    const validatePan = (pan: string) => {
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        return panRegex.test(pan);
    };

    const validateFreelancerId = (id: string) => {
        return id.length >= 5;
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

    const handleFreelancerIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.toUpperCase();
        setRegisterData({ ...registerData, freelancerId: val });
        if (val.length > 0) {
            setFreelancerIdError(!validateFreelancerId(val));
        } else {
            setFreelancerIdError(false);
        }
    };

    const handleAnswerChange = (index: number, value: string) => {
        const newAnswers = [...registerData.answers];
        newAnswers[index] = value;
        setRegisterData({ ...registerData, answers: newAnswers });
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setRegisterData({ ...registerData, panFile: event.target.files[0] });
        }
    };

    const handleFreelancerIdFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setRegisterData({ ...registerData, freelancerIdFile: event.target.files[0] });
        }
    };

    const handleTaskFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setRegisterData({ ...registerData, taskFile: event.target.files[0] });
        }
    };

    const currentTests = SKILL_TESTS[registerData.category] || SKILL_TESTS["default"];

    // AI Generation State
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [openPostDialog, setOpenPostDialog] = useState(false);
    const [formData, setFormData] = useState({ name: '', productName: '', contact: '', location: '' });

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

    const handleOpenPostDialog = () => {
        if (!generatedImage) return;
        setOpenPostDialog(true);
        setFormData({ ...formData, productName: prompt.substring(0, 30), name: registerData.name || '' });
    };

    const userRole = localStorage.getItem('userRole');

    const handleConfirmPost = () => {
        const isBuyer = userRole === 'Buyer';
        const newPost = {
            id: Date.now(),
            title: formData.productName || (isBuyer ? "Looking for Service" : "New Service"),
            description: isBuyer
                ? `${formData.name} is looking for ${formData.productName} services in ${formData.location}. Contact: ${formData.contact}.`
                : `${formData.name} is offering services in ${formData.location}. Contact: ${formData.contact}.`,
            price: Math.floor(Math.random() * 200) + 50,
            currency: "$",
            status: isBuyer ? "REQUEST" : "NEW",
            tagColor: isBuyer ? "#f472b6" : "#3b82f6", // Pink for requests, Blue for services
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
    };

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
                                            <Typography variant="caption" sx={{ display: 'block' }}><strong>PAN:</strong> {registerData.panNumber || 'N/A'}</Typography>
                                            <Typography variant="caption" sx={{ display: 'block' }}><strong>ID:</strong> {registerData.freelancerId || 'N/A'}</Typography>
                                        </Stack>

                                        <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', display: 'block', mb: 1 }}>PORTFOLIO & LINKS</Typography>
                                        <Stack spacing={0.5} sx={{ mb: 2 }}>
                                            {registerData.portfolio && <Link href={registerData.portfolio} target="_blank" sx={{ fontSize: '0.75rem', display: 'block' }}>My Portfolio</Link>}
                                            {registerData.taskLink && <Link href={registerData.taskLink} target="_blank" sx={{ fontSize: '0.75rem', display: 'block' }}>Task Submission</Link>}
                                        </Stack>

                                        {registerData.answers.some(a => a) && (
                                            <>
                                                <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', display: 'block', mb: 1 }}>SKILL ASSESSMENT</Typography>
                                                <Stack spacing={1}>
                                                    {registerData.answers.map((ans, i) => ans && (
                                                        <Typography key={i} variant="caption" sx={{ display: 'block', lineHeight: 1.4 }}>
                                                            <strong>Q{i + 1}:</strong> {ans}
                                                        </Typography>
                                                    ))}
                                                </Stack>
                                            </>
                                        )}
                                    </Box>
                                </Collapse>

                                <Button
                                    fullWidth
                                    variant="outlined"
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

            {/* AI Image Generation Tool - Hidden for Sellers */}
            {userRole !== 'Seller' && (
                <Paper
                    elevation={0}
                    sx={{
                        bgcolor: 'black',
                        color: 'white',
                        p: 3,
                        borderRadius: 4,
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
                        <AutoAwesomeIcon sx={{ color: '#d9f99d' }} />
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>AI Image Generation</Typography>
                    </Stack>

                    {/* Image Preview Area */}
                    <Box
                        sx={{
                            bgcolor: '#1e1e1e',
                            borderRadius: 3,
                            mb: 2,
                            position: 'relative',
                            height: 250,
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
                    </Box>

                    {/* Prompt Input */}
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
                                '& .MuiInputBase-input': { fontSize: '0.95rem', lineHeight: 1.5 }
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
                            {isGenerating ? '...' : 'GENERATE'}
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
            )}

            {/* Post Dialog */}
            <Dialog
                open={openPostDialog}
                onClose={() => setOpenPostDialog(false)}
                PaperProps={{ sx: { borderRadius: 3, bgcolor: 'white', minWidth: 400, p: 1 } }}
            >
                <DialogTitle sx={{ fontWeight: 800 }}>Complete Your Post</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <TextField label="Your Name" fullWidth value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                        <TextField label="Service Name" fullWidth value={formData.productName} onChange={(e) => setFormData({ ...formData, productName: e.target.value })} />
                        <TextField label="Contact" fullWidth value={formData.contact} onChange={(e) => setFormData({ ...formData, contact: e.target.value })} />
                        <TextField label="Location" fullWidth value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={() => setOpenPostDialog(false)} sx={{ color: '#64748b' }}>Cancel</Button>
                    <Button variant="contained" onClick={handleConfirmPost} disabled={!formData.name} sx={{ bgcolor: 'black', color: 'white', fontWeight: 700, px: 3 }}>Post Now</Button>
                </DialogActions>
            </Dialog>

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
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Identity Verification</Typography>
                                    <Typography variant="body2" sx={{ color: '#64748b', mb: 2 }}>
                                        To ensure safety and authenticity on our platform, we require PAN card verification for all sellers.
                                    </Typography>
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

                                <Box>
                                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Freelancer ID (Optional)</Typography>
                                    <Typography variant="caption" sx={{ color: '#64748b', display: 'block', mb: 1 }}>If you have a verified ID, enter it below to skip the skill assessment.</Typography>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        placeholder="Enter ID Number"
                                        value={registerData.freelancerId}
                                        onChange={handleFreelancerIdChange}
                                        error={freelancerIdError}
                                        helperText={freelancerIdError ? "Invalid ID Format" : ""}
                                        InputProps={{
                                            sx: { bgcolor: '#f8fafc', borderRadius: 2 }
                                        }}
                                    />
                                </Box>

                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Upload Freelancer ID</Typography>
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
                                            bgcolor: registerData.freelancerIdFile ? '#f0fdf4' : '#f8fafc',
                                            transition: 'all 0.2s',
                                            '&:hover': { bgcolor: '#f1f5f9', borderColor: '#cbd5e1' }
                                        }}
                                    >
                                        <input
                                            type="file"
                                            hidden
                                            accept="image/*,application/pdf"
                                            onChange={handleFreelancerIdFileChange}
                                        />
                                        {registerData.freelancerIdFile ? (
                                            <>
                                                <CheckCircleIcon sx={{ fontSize: 48, color: '#22c55e', mb: 1 }} />
                                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>File Selected</Typography>
                                                <Typography variant="caption" sx={{ color: '#64748b' }}>{registerData.freelancerIdFile.name}</Typography>
                                            </>
                                        ) : (
                                            <>
                                                <CloudUploadIcon sx={{ fontSize: 48, color: '#94a3b8', mb: 1 }} />
                                                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#475569' }}>Upload ID Document</Typography>
                                                <Typography variant="caption" sx={{ color: '#94a3b8' }}>Supports JPG, PNG, PDF</Typography>
                                            </>
                                        )}
                                    </Box>
                                </Box>

                                {/* Skill Assessment Section - Show only if No Freelancer ID AND No File */}
                                {!registerData.freelancerId && !registerData.freelancerIdFile && (
                                    <Box sx={{ mt: 2 }}>
                                        <Box sx={{ my: 2, borderBottom: '1px solid #e2e8f0' }} />
                                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Skill Assessment</Typography>
                                        <Alert severity="info" sx={{ mb: 2, borderRadius: 2 }}>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Task: {currentTests.task}</Typography>
                                        </Alert>

                                        <Stack spacing={2}>
                                            {currentTests.questions.map((q: string, index: number) => (
                                                <Box key={index}>
                                                    <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 600 }}>{index + 1}. {q}</Typography>
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        placeholder="Your answer..."
                                                        variant="outlined"
                                                        value={registerData.answers[index]}
                                                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                                                        InputProps={{ sx: { bgcolor: '#f8fafc', borderRadius: 1 } }}
                                                    />
                                                </Box>
                                            ))}

                                            <Box>
                                                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Task Live Link</Typography>
                                                <TextField
                                                    fullWidth
                                                    placeholder="https://..."
                                                    variant="outlined"
                                                    value={registerData.taskLink}
                                                    onChange={(e) => setRegisterData({ ...registerData, taskLink: e.target.value })}
                                                    InputProps={{ sx: { bgcolor: '#f8fafc', borderRadius: 2 } }}
                                                />
                                            </Box>

                                            <Box>
                                                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Upload Task Screenshot</Typography>
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
                                                        bgcolor: registerData.taskFile ? '#f0fdf4' : '#f8fafc',
                                                        transition: 'all 0.2s',
                                                        '&:hover': { bgcolor: '#f1f5f9', borderColor: '#cbd5e1' }
                                                    }}
                                                >
                                                    <input
                                                        type="file"
                                                        hidden
                                                        accept="image/*,application/pdf"
                                                        onChange={handleTaskFileChange}
                                                    />
                                                    {registerData.taskFile ? (
                                                        <Stack direction="row" alignItems="center" spacing={1}>
                                                            <CheckCircleIcon sx={{ color: '#22c55e' }} />
                                                            <Typography variant="body2">{registerData.taskFile.name}</Typography>
                                                        </Stack>
                                                    ) : (
                                                        <Stack direction="row" alignItems="center" spacing={1}>
                                                            <CloudUploadIcon sx={{ color: '#94a3b8' }} />
                                                            <Typography variant="body2" sx={{ color: '#64748b' }}>Upload Screenshot</Typography>
                                                        </Stack>
                                                    )}
                                                </Box>
                                            </Box>
                                        </Stack>
                                    </Box>
                                )}
                            </>
                        )}
                    </Stack>
                </DialogContent >
                <DialogActions sx={{ p: 4, pt: 2, justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Button
                        variant="contained"
                        endIcon={<ArrowForwardIcon />}
                        onClick={async () => {
                            if (step === 1) {
                                setStep(2);
                            } else {
                                // Check PAN
                                if (panError || !validatePan(registerData.panNumber) || !registerData.panFile) {
                                    if (!registerData.panNumber) alert("Please enter PAN Number");
                                    else if (panError || !validatePan(registerData.panNumber)) alert("Invalid PAN Number");
                                    else alert("Please upload PAN Card document");
                                    return;
                                }
                                // Check Task or Freelancer ID
                                if (registerData.freelancerId || registerData.freelancerIdFile) {
                                    // Freelancer ID path
                                    if (freelancerIdError || (registerData.freelancerId && !validateFreelancerId(registerData.freelancerId)) || !registerData.freelancerIdFile || !registerData.freelancerId) {
                                        if (!registerData.freelancerId) alert("Please enter Freelancer ID Number");
                                        else if (freelancerIdError || !validateFreelancerId(registerData.freelancerId)) alert("Invalid Freelancer ID");
                                        else alert("Please upload Freelancer ID document");
                                        return;
                                    }
                                } else {
                                    // Skill Assessment path
                                    const allAnswersFilled = registerData.answers.every(a => a.trim() !== '');
                                    if (!allAnswersFilled || !registerData.taskLink || !registerData.taskFile) {
                                        if (!allAnswersFilled) alert("Please answer all skill assessment questions.");
                                        else if (!registerData.taskLink) alert("Please provide the task link.");
                                        else alert("Please upload the task screenshot.");
                                        return;
                                    }
                                }

                                try {
                                    let panUrl = '';
                                    if (registerData.panFile) {
                                        const res = await UploadService.uploadImage(registerData.panFile);
                                        panUrl = res.data.url;
                                    }
                                    let idUrl = '';
                                    if (registerData.freelancerIdFile) {
                                        const res = await UploadService.uploadImage(registerData.freelancerIdFile);
                                        idUrl = res.data.url;
                                    }
                                    let taskUrl = '';
                                    if (registerData.taskFile) {
                                        const res = await UploadService.uploadImage(registerData.taskFile);
                                        taskUrl = res.data.url;
                                    }

                                    await UserService.registerFreelancer({
                                        panNumber: registerData.panNumber,
                                        panFile: panUrl,
                                        freelancerId: registerData.freelancerId,
                                        freelancerIdFile: idUrl,
                                        category: registerData.category,
                                        portfolio: registerData.portfolio,
                                        taskLink: registerData.taskLink,
                                        taskFile: taskUrl,
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
                                        taskLink: '', taskFile: null, answers: ['', '', '', '', '']
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
            </Dialog >
        </Stack >
    );
};

export default FreelancerSidebar;
