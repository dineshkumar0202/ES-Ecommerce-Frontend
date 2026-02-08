import { Box, Typography, Paper, Stack, Button, IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, InputAdornment, Alert, Avatar, Divider, Chip } from '@mui/material';
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
import { useState } from 'react';

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

    return (
        <Stack spacing={3}>    {/* Seller / Freelancer Access Card */}
            <Paper
                elevation={0}
                sx={{
                    bgcolor: 'white',
                    p: 3,
                    borderRadius: 4,
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
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
                            label="Verification Pending"
                            color="success"
                            variant="outlined"
                            size="small"
                            sx={{ alignSelf: 'flex-start', mb: 3, fontWeight: 600 }}
                        />

                        <Stack spacing={2}>
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

                        <Divider sx={{ my: 3 }} />
                        <Box>
                            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                                <Box sx={{
                                    bgcolor: 'black',
                                    color: '#bef264',
                                    borderRadius: 1,
                                    px: 1,
                                    py: 0.5,
                                    fontWeight: 800,
                                    fontSize: '0.75rem',
                                    letterSpacing: 1
                                }}>
                                    AI
                                </Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Image Generator</Typography>
                            </Stack>

                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                placeholder="Describe the image you want to generate..."
                                variant="outlined"
                                sx={{
                                    mb: 2,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        bgcolor: '#f8fafc',
                                        fontSize: '0.875rem'
                                    }
                                }}
                            />

                            <Stack direction="row" spacing={1}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        bgcolor: '#bef264',
                                        color: 'black',
                                        fontWeight: 700,
                                        textTransform: 'none',
                                        borderRadius: 2,
                                        '&:hover': { bgcolor: '#a3e635' }
                                    }}
                                >
                                    Auto Genrate
                                </Button>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        minWidth: 'auto',
                                        px: 2,
                                        borderRadius: 2,
                                        borderColor: '#e2e8f0',
                                        color: '#64748b',
                                        '&:hover': { borderColor: '#cbd5e1', bgcolor: '#f8fafc' }
                                    }}
                                >
                                    <CloudUploadIcon fontSize="small" />
                                </Button>
                            </Stack>
                        </Box>


                    </>
                )}
            </Paper>

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
                        onClick={() => {
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

                                alert("Registration Successful! Your verification is pending.");
                                setIsRegistered(true);
                                setOpenRegisterDialog(false);
                                setStep(1); // Reset
                                setRegisterData({
                                    name: '', email: '', phone: '', password: '', category: '', portfolio: '',
                                    panNumber: '', panFile: null, freelancerId: '', freelancerIdFile: null,
                                    taskLink: '', taskFile: null, answers: ['', '', '', '', '']
                                });
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
