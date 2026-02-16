import { Box, Container, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Stack, Typography } from '@mui/material';
import Navbar from '../WrapperComponents/Navbar';
import Footer from '../WrapperComponents/Footer';
import FreelancersFeed from '../SpecifiedComponents/Freelancers/Components/FreelancersFeed';
import FreelancerSidebar from '../SpecifiedComponents/Freelancers/Components/FreelancerSidebar';
import FreelancerSidebarBuyer from '../SpecifiedComponents/Freelancers/Components/FreelancerSidebarBuyer';
import FreelanceBanner from '../SpecifiedComponents/Freelancers/Components/FreelanceBanner';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FreelanceService, AuthService } from '../../services/api';

// Define interface locally to avoid 'export not found' issues
interface Post {
    id: number | string;
    title: string;
    description: string;
    price: number;
    image: string;
    status: string;
    tagColor: string;
    tagTextColor: string;
    views: string;
    time: string;
    date?: string;
    currency: string;
    unit?: string;
    nameDisplay?: string;
    category?: string;
}

const Freelance = () => {
    const userRole = localStorage.getItem('userRole');
    const isBuyer = userRole === 'Buyer';
    const isSeller = userRole === 'Seller';
    const [posts, setPosts] = useState<Post[]>([]);
    const [isFreelancerRegistered, setIsFreelancerRegistered] = useState(false);

    const [interestDialog, setInterestDialog] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
    const [interestForm, setInterestForm] = useState({ details: '', price: '', days: '' });
    const [submittingInterest, setSubmittingInterest] = useState(false);

    const fetchPosts = async () => {
        try {
            const { data } = await FreelanceService.getAll();
            const formattedPosts = data.map((p: any) => ({
                id: p._id,
                title: p.title || "No Title",
                description: p.description || "No Description",
                price: p.price || 0,
                currency: p.currency || "$",
                status: p.status || "NEW",
                tagColor: p.tagColor || (p.status === 'APPROVED' ? "#bef264" : "#e2e8f0"),
                tagTextColor: p.tagTextColor || (p.status === 'APPROVED' ? "#1a2e05" : "#475569"),
                views: p.views || "0 views",
                time: p.time || new Date(p.createdAt).toLocaleDateString(),
                date: new Date(p.createdAt).toLocaleDateString(),
                nameDisplay: p.nameDisplay || p.user?.profile?.name || p.user?.username || "Anonymous",
                category: p.category || "General",
                unit: p.unit || "/hr",
                contact: p.contact,
                email: p.email,
                location: p.location,
                image: p.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
            }));
            setPosts(formattedPosts);
        } catch (error) {
            console.error("Failed to fetch posts", error);
        }
    };

    const fetchUserStatus = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const { data: me } = await AuthService.getMe();
                setIsFreelancerRegistered(me?.freelancer?.isRegistered || false);
            }
        } catch (error) {
            console.error("Failed to fetch user status", error);
        }
    };

    const location = useLocation();

    useEffect(() => {
        fetchPosts();
        fetchUserStatus();
    }, []);

    // Clean up location state after reading
    useEffect(() => {
        if (location.state?.autoPost) {
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    const handleInterestClick = async (postId: string | number) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Please login first to show interest");
            return;
        }

        if (!isSeller) {
            alert("Only Seller accounts can submit interest requests.");
            return;
        }

        if (!isFreelancerRegistered) {
            alert("Registration is compulsory! Please register as a freelancer using the sidebar to show interest in this post.");
            return;
        }

        setSelectedPostId(postId.toString());
        setInterestDialog(true);
    };

    const submitInterestForm = async () => {
        if (!selectedPostId) return;

        try {
            setSubmittingInterest(true);
            await FreelanceService.submitInterest(selectedPostId, {
                details: interestForm.details,
                proposedPrice: Number(interestForm.price),
                estimatedDuration: interestForm.days
            });
            alert("Success! Your interest has been recorded. The admin will review your request shortly.");
            setInterestDialog(false);
            setInterestForm({ details: '', price: '', days: '' });
        } catch (error: any) {
            alert(error.response?.data?.message || "Failed to submit interest");
        } finally {
            setSubmittingInterest(false);
        }
    };

    const handlePost = async (newPost: any) => {
        try {
            const { id, ...postData } = newPost;
            await FreelanceService.create(postData);
            fetchPosts();
        } catch (error) {
            console.error("Failed to create post", error);
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f1f5f9' }}>
            <Navbar />
            <Container maxWidth="xl" sx={{ mt: 4, mb: 8 }}>
                <FreelanceBanner />
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'flex-start' }}>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <FreelancersFeed
                            posts={posts}
                            onInterestClick={handleInterestClick}
                            showInterestButton={!isBuyer && isSeller}
                        />
                    </Box>
                    <Box sx={{ width: { xs: '100%', md: 340, lg: 380 }, flexShrink: 0, position: { md: 'sticky' }, top: 20 }}>
                        {isBuyer ? (
                            <FreelancerSidebarBuyer
                                onPost={handlePost}
                                initialData={location.state?.autoPost ? {
                                    image: location.state.postImage,
                                    prompt: location.state.postPrompt,
                                    formData: location.state.formData
                                } : null}
                                autoOpenDialog={location.state?.autoPost}
                            />
                        ) : (
                            <FreelancerSidebar />
                        )}
                    </Box>
                </Box>
            </Container>

            {/* Interest Dialog (Seller -> backend: /posts/:id/interest) */}
            <Dialog open={interestDialog} onClose={() => setInterestDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontWeight: 900 }}>Submit Interest</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" sx={{ color: '#64748b', mb: 2 }}>
                        Fill the details, your proposed price, and delivery days. This request will appear in the Admin panel under <b>Interest Requests</b>.
                    </Typography>
                    <Stack spacing={2.5} sx={{ pt: 1 }}>
                        <TextField
                            label="Details"
                            multiline
                            rows={3}
                            value={interestForm.details}
                            onChange={(e) => setInterestForm({ ...interestForm, details: e.target.value })}
                            placeholder="Explain your plan / what you will deliver"
                            fullWidth
                        />
                        <TextField
                            label="Price (₹)"
                            type="number"
                            value={interestForm.price}
                            onChange={(e) => setInterestForm({ ...interestForm, price: e.target.value })}
                            fullWidth
                        />
                        <TextField
                            label="Delivery days"
                            value={interestForm.days}
                            onChange={(e) => setInterestForm({ ...interestForm, days: e.target.value })}
                            placeholder="e.g. 5"
                            fullWidth
                        />
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={() => setInterestDialog(false)} sx={{ fontWeight: 800, color: '#64748b' }}>
                        Cancel
                    </Button>
                    <Button
                        onClick={submitInterestForm}
                        disabled={submittingInterest}
                        variant="contained"
                        sx={{ bgcolor: 'black', color: 'white', fontWeight: 900, '&:hover': { bgcolor: '#111' } }}
                    >
                        {submittingInterest ? 'Submitting...' : 'Submit'}
                    </Button>
                </DialogActions>
            </Dialog>

            <Footer />
        </Box>
    );
};

export default Freelance;
