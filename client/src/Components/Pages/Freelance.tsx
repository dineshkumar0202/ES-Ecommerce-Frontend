import { Box, Container } from '@mui/material';
import Navbar from '../WrapperComponents/Navbar';
import Footer from '../WrapperComponents/Footer';
import FreelancersFeed from '../SpecifiedComponents/Freelancers/Components/FreelancersFeed';
import FreelancerSidebar from '../SpecifiedComponents/Freelancers/Components/FreelancerSidebarBuyer';
import { useState } from 'react';

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

const initialPosts: Post[] = [
    {
        id: 1,
        title: "Senior UI/UX Designer",
        description: "High-fidelity prototypes with user-centered design and 40-hour turnaround.",
        price: 299.00,
        currency: "$",
        status: "ACTIVE",
        tagColor: "#bef264",
        tagTextColor: "#1a2e05",
        views: "1.2k views",
        time: "2h ago",
        date: "2/8/2026",
        nameDisplay: "Alice Johnson",
        category: "Design",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 2,
        title: "React Frontend Developer",
        description: "Touch-optimized responsive web apps with adjustable layouts and clean code.",
        price: 85.00,
        currency: "$",
        status: "PENDING",
        tagColor: "#e2e8f0",
        tagTextColor: "#475569",
        views: "450 views",
        time: "5h ago",
        date: "2/8/2026",
        nameDisplay: "Michael Chen",
        category: "Development",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 3,
        title: "Professional Photographer",
        description: "Classic 35mm film style photography in excellent condition with original editing.",
        price: 1200.00,
        currency: "$",
        status: "ACTIVE",
        tagColor: "#bef264",
        tagTextColor: "#1a2e05",
        views: "2.8k views",
        time: "1d ago",
        date: "2/7/2026",
        nameDisplay: "Sarah Miller",
        category: "Photography",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 4,
        title: "SEO Marketing Specialist",
        description: "Limited edition marketing strategies designed for marathon growth comfort.",
        price: 180.00,
        currency: "$",
        status: "SOLD",
        tagColor: "#525252",
        tagTextColor: "#ffffff",
        views: "5.1k views",
        time: "3d ago",
        date: "2/5/2026",
        nameDisplay: "David Wilson",
        category: "Marketing",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
    }
];

const Freelance = () => {
    const [posts, setPosts] = useState<Post[]>(initialPosts);

    const handlePost = (newPost: Post) => {
        setPosts([newPost, ...posts]);
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
                        <FreelancerSidebar onPost={handlePost} />
                    </Box>
                </Box>
            </Container>
            <Footer />
        </Box>
    );
};

export default Freelance;
