import { Box, Typography, Stack, Rating, TextField, Button, Avatar, Divider, Paper, IconButton } from '@mui/material';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { useState } from 'react';

interface Review {
    _id: string;
    userName: string;
    rating: number;
    comment: string;
    createdAt: string;
}

interface ProductReviewsProps {
    productId: string;
    reviews: Review[];
    averageRating: number;
    totalReviews: number;
    onReviewAdded: () => void;
}

const ProductReviews = ({ reviews, averageRating, totalReviews }: ProductReviewsProps) => {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState<number | null>(5);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Box sx={{ mt: 8 }}>
            <Typography variant="h5" sx={{ fontWeight: 900, mb: 6, color: '#1a202c' }}>
                CUSTOMER REVIEWS ({totalReviews})
            </Typography>

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={8} alignItems="flex-start">
                {/* Review Stats */}
                <Box sx={{ width: { xs: '100%', md: '300px' } }}>
                    <Box sx={{
                        p: 6,
                        bgcolor: '#f8fafc',
                        borderRadius: 4,
                        textAlign: 'center',
                        border: '1px solid #f1f5f9'
                    }}>
                        <Typography variant="h1" sx={{ fontWeight: 900, mb: 1, color: '#1a202c', fontSize: '4.5rem' }}>
                            {averageRating.toFixed(1)}
                        </Typography>
                        <Rating value={averageRating} readOnly precision={0.1} sx={{ color: '#fbbf24', mb: 1.5, fontSize: '1.5rem' }} />
                        <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                            Based on {totalReviews} reviews
                        </Typography>
                    </Box>

                    {/* Simple Message if no reviews */}
                    {reviews.length === 0 && (
                        <Typography sx={{ mt: 4, color: '#94a3b8', fontStyle: 'italic', textAlign: 'center' }}>
                            No reviews yet. Be the first to review!
                        </Typography>
                    )}
                </Box>

                {/* Right Side: Review Form & List */}
                <Box sx={{ flex: 1, width: '100%' }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 4,
                            border: '1px solid #f1f5f9',
                            borderRadius: 4,
                            bgcolor: 'white',
                            mb: 8,
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)'
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 900, mb: 4, color: '#1a202c' }}>WRITE A REVIEW</Typography>
                        <Stack spacing={4}>
                            <Box>
                                <Typography variant="caption" sx={{ fontWeight: 800, display: 'block', mb: 1.5, color: '#94a3b8' }}>RATING</Typography>
                                <Rating
                                    value={rating}
                                    onChange={(_event, newValue) => setRating(newValue)}
                                    sx={{ color: '#fbbf24', fontSize: '2rem' }}
                                />
                            </Box>
                            <Box sx={{ position: 'relative' }}>
                                <Typography variant="caption" sx={{ fontWeight: 800, display: 'block', mb: 1.5, color: '#94a3b8' }}>YOUR COMMENT</Typography>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    placeholder="Share your thoughts about this product..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 3,
                                            bgcolor: '#f8fafc',
                                            pb: 6, // Space for the image preview
                                            '& fieldset': { borderColor: '#f1f5f9' },
                                            '&:hover fieldset': { borderColor: '#e2e8f0' },
                                        }
                                    }}
                                />

                                {/* Photo Upload Logic */}
                                <Box sx={{ position: 'absolute', bottom: 12, right: 12, display: 'flex', alignItems: 'center', gap: 2 }}>
                                    {selectedImage && (
                                        <Box
                                            component="img"
                                            src={selectedImage}
                                            alt="Review Preview"
                                            sx={{ width: 40, height: 40, borderRadius: 2, objectFit: 'cover', border: '1px solid #e2e8f0' }}
                                        />
                                    )}
                                    <input
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        id="icon-button-file"
                                        type="file"
                                        onChange={handleImageUpload}
                                    />
                                    <label htmlFor="icon-button-file">
                                        <IconButton color="primary" aria-label="upload picture" component="span" sx={{ color: '#64748b' }}>
                                            <CameraAltOutlinedIcon />
                                        </IconButton>
                                    </label>
                                </Box>
                            </Box>
                            <Button
                                variant="contained"
                                fullWidth
                                sx={{
                                    bgcolor: 'black',
                                    color: 'white',
                                    py: 2,
                                    borderRadius: 3,
                                    fontWeight: 900,
                                    fontSize: '1rem',
                                    '&:hover': { bgcolor: '#1a1a1a' }
                                }}
                            >
                                SUBMIT REVIEW
                            </Button>
                        </Stack>
                    </Paper>

                    {/* Reviews List */}
                    <Stack spacing={6}>
                        {reviews.map((review) => (
                            <Box key={review._id}>
                                <Stack direction="row" spacing={3} sx={{ mb: 2 }} alignItems="center">
                                    <Avatar sx={{
                                        bgcolor: '#f1f5f9',
                                        color: '#1a202c',
                                        fontWeight: 800,
                                        width: 50,
                                        height: 50
                                    }}>
                                        {review.userName?.[0] || 'U'}
                                    </Avatar>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 900, color: '#1a202c' }}>{review.userName}</Typography>
                                        <Rating value={review.rating} readOnly size="small" sx={{ color: '#fbbf24' }} />
                                    </Box>
                                    <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>
                                        {new Date(review.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </Typography>
                                </Stack>
                                <Typography sx={{ color: '#4a5568', lineHeight: 1.8, pl: { md: 9 } }}>
                                    {review.comment}
                                </Typography>
                                <Divider sx={{ mt: 5, borderColor: '#f1f5f9' }} />
                            </Box>
                        ))}
                    </Stack>
                </Box>
            </Stack>
        </Box>
    );
};

export default ProductReviews;
