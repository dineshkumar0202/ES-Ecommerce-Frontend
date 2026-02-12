import { Box, Container } from '@mui/material';
import Navbar from '../WrapperComponents/Navbar';
import Footer from '../WrapperComponents/Footer';
import FreelancersFeed from '../SpecifiedComponents/Freelancers/Components/FreelancersFeed';
import FreelancerSidebar from '../SpecifiedComponents/Freelancers/Components/FreelancerSidebar';
import FreelancerSidebarBuyer from '../SpecifiedComponents/Freelancers/Components/FreelancerSidebarBuyer';
import FreelanceBanner from '../SpecifiedComponents/Freelancers/Components/FreelanceBanner';
import { useState, useEffect } from 'react';
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
    const [posts, setPosts] = useState<Post[]>([]);
    const [isFreelancerRegistered, setIsFreelancerRegistered] = useState(false);

    const [interestDialog, setInterestDialog] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
    const [interestForm, setInterestForm] = useState({ price: '', days: '' });

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

    useEffect(() => {
        fetchPosts();
        fetchUserStatus();
    }, []);

    const handleInterestClick = async (postId: string | number) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Please login first to show interest");
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
            await FreelanceService.submitInterest(selectedPostId, {
                proposedPrice: Number(interestForm.price),
                estimatedDuration: interestForm.days
            });
            alert("Success! Your interest has been recorded. The admin will review your request shortly.");
            setInterestDialog(false);
            setInterestForm({ price: '', days: '' });
        } catch (error: any) {
            alert(error.response?.data?.message || "Failed to submit interest");
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
                            showInterestButton={!isBuyer}
                        />
                    </Box>
                    <Box sx={{ width: { xs: '100%', md: 340, lg: 380 }, flexShrink: 0, position: { md: 'sticky' }, top: 20 }}>
                        {isBuyer ? (
                            <FreelancerSidebarBuyer onPost={handlePost} />
                        ) : (
                            <FreelancerSidebar />
                        )}
                    </Box>
                </Box>
            </Container>

            {/* Interest Dialog */}
            {interestDialog && (
                <Box sx={{ position: 'fixed', inset: 0, bgcolor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box sx={{ bgcolor: 'white', p: 4, borderRadius: 2, width: 400, maxWidth: '90%' }}>
                        <h2 style={{ marginTop: 0 }}>Submit Interest</h2>
                        <Box sx={{ mb: 2 }}>
                            <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Proposed Price (₹)</label>
                            <input
                                type="number"
                                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                                value={interestForm.price}
                                onChange={(e) => setInterestForm({ ...interestForm, price: e.target.value })}
                                placeholder="Enter your price"
                            />
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Estimated Duration (Days)</label>
                            <input
                                type="text"
                                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                                value={interestForm.days}
                                onChange={(e) => setInterestForm({ ...interestForm, days: e.target.value })}
                                placeholder="e.g. 5 days"
                            />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                            <button
                                onClick={() => setInterestDialog(false)}
                                style={{ padding: '8px 16px', borderRadius: '4px', border: '1px solid #ccc', background: 'white', cursor: 'pointer' }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={submitInterestForm}
                                style={{ padding: '8px 16px', borderRadius: '4px', border: 'none', background: '#bef264', color: 'black', fontWeight: 'bold', cursor: 'pointer' }}
                            >
                                Submit
                            </button>
                        </Box>
                    </Box>
                </Box>
            )}

            <Footer />
        </Box>
    );
};

export default Freelance;
