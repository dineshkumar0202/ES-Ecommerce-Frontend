import { Box, Container } from '@mui/material';
import Navbar from '../WrapperComponents/Navbar';
import Footer from '../WrapperComponents/Footer';
import FreelancerDashboard from '../SpecifiedComponents/Freelancers/Components/FreelancerSidebar';

const SellerProfile = () => {
    const handlePost = (post: any) => {
        console.log('Post created:', post);
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <Container maxWidth="xl" sx={{ flex: 1, py: 6 }}>
                <FreelancerDashboard onPost={handlePost} /> 
            </Container>
            <Footer />
        </Box>
    );
};

export default SellerProfile;
