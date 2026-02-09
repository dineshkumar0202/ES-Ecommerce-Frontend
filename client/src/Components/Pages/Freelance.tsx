import { Box, Container } from '@mui/material';
import Navbar from '../WrapperComponents/Navbar';
import Footer from '../WrapperComponents/Footer';
import FreelancersFeed from '../SpecifiedComponents/Freelancers/Components/FreelancersFeed';
import FreelancerSidebar from '../SpecifiedComponents/Freelancers/Components/FreelancerSidebar';
import FreelancerSidebarBuyer from '../SpecifiedComponents/Freelancers/Components/FreelancerSidebarBuyer';
import { useState, useEffect } from 'react';
import { FreelanceService } from '../../services/api';

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
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const isBuyer = user?.role === 'Buyer';
    const [posts, setPosts] = useState<Post[]>([]);

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
                nameDisplay: p.nameDisplay || p.username || "Anonymous",
                category: p.category || "General",
                unit: p.unit || "/hr",
                image: p.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
            }));
            setPosts(formattedPosts);
        } catch (error) {
            console.error("Failed to fetch posts", error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

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
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column-reverse', md: 'row' }, gap: 4, alignItems: 'flex-start' }}>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <FreelancersFeed posts={posts} />
                    </Box>
                    <Box sx={{ width: { xs: '100%', md: 340, lg: 380 }, flexShrink: 0, position: { md: 'sticky' }, top: 20 }}>
                        {isBuyer ? (
                            <FreelancerSidebarBuyer onPost={handlePost} />
                        ) : (
                            <FreelancerSidebar onPost={handlePost} />
                        )}
                    </Box>
                </Box>
            </Container>
            <Footer />
        </Box>
    );
};

export default Freelance;
