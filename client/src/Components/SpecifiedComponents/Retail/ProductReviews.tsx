import { useState } from 'react';
import {
    Box,
    Typography,
    Rating,
    TextField,
    Button,
    Stack,
    Avatar,
    Paper,
    Alert
} from '@mui/material';
import { ProductService } from '../../../services/api';

interface Review {
    _id: string;
    name: string;
    rating: number;
    comment: string;
    createdAt: string;
    user: any;
}

interface ProductReviewsProps {
    productId: string;
    reviews: Review[];
    totalReviews: number;
    onReviewAdded: () => void;
    averageRating?: number; // kept optional to avoid breaking parent usage if not updated immediately
}

const ProductReviews = ({ productId, reviews, totalReviews, onReviewAdded }: ProductReviewsProps) => {
    const [rating, setRating] = useState<number>(5);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const isLoggedIn = !!localStorage.getItem('token');

    const handleSubmitReview = async () => {
        if (!comment.trim()) {
            setError('Please write a review comment');
            return;
        }

        setIsSubmitting(true);
        setError('');
        try {
            await ProductService.createReview(productId, { rating, comment });
            setSuccess(true);
            setComment('');
            setRating(5);
            setTimeout(() => {
                setSuccess(false);
                onReviewAdded();
            }, 2000);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to submit review');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 4 }}>Customer Reviews</Typography>

            {/* Write a Review */}
            {isLoggedIn ? (
                <Paper elevation={0} sx={{ p: 4, mb: 6, borderRadius: 3, border: '1px solid #e4e4e7', bgcolor: 'white', maxWidth: 800 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, fontFamily: 'sans-serif' }}>Write a Review</Typography>

                    {success && <Alert severity="success" sx={{ mb: 3 }}>Review submitted successfully!</Alert>}
                    {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

                    <Stack spacing={3}>
                        <Box>
                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700, color: '#71717a', fontSize: '0.85rem' }}>Rating</Typography>
                            <Rating
                                value={rating}
                                onChange={(_, newValue) => setRating(newValue || 5)}
                                size="medium"
                                sx={{ color: '#fbbf24' }}
                            />
                        </Box>

                        <Box>
                            <TextField
                                multiline
                                rows={4}
                                fullWidth
                                placeholder="Your Comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        bgcolor: 'white',
                                        '& fieldset': { borderColor: '#e4e4e7' },
                                        '&:hover fieldset': { borderColor: '#a1a1aa' },
                                        '&.Mui-focused fieldset': { borderColor: 'black' }
                                    },
                                    '& .MuiInputBase-input': { fontSize: '0.95rem' }
                                }}
                            />
                        </Box>

                        <Button
                            variant="contained"
                            onClick={handleSubmitReview}
                            disabled={isSubmitting}
                            disableElevation
                            sx={{
                                bgcolor: 'black',
                                color: 'white',
                                py: 1.8,
                                borderRadius: 2,
                                fontWeight: 800,
                                fontSize: '0.9rem',
                                letterSpacing: 1,
                                textTransform: 'uppercase',
                                width: '100%',
                                '&:hover': { bgcolor: '#27272a' }
                            }}
                        >
                            {isSubmitting ? 'Posting...' : 'POST REVIEW'}
                        </Button>
                    </Stack>
                </Paper>
            ) : (
                <Alert severity="info" sx={{ mb: 4, maxWidth: 800 }}>
                    Please log in to write a review
                </Alert>
            )}

            {/* Reviews List - Minimal Style */}
            <Stack spacing={4} sx={{ maxWidth: 800 }}>
                {reviews.length === 0 ? (
                    <Box sx={{ py: 6, borderTop: '1px solid #f4f4f5' }}>
                        <Typography sx={{ color: '#a1a1aa', fontStyle: 'italic' }}>No reviews yet. Be the first to share your thoughts!</Typography>
                    </Box>
                ) : (
                    reviews.map((review) => (
                        <Box key={review._id} sx={{ borderBottom: '1px solid #f4f4f5', pb: 4 }}>
                            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                                <Avatar sx={{ bgcolor: '#f4f4f5', color: 'black', fontWeight: 700, width: 40, height: 40, fontSize: '0.9rem' }}>
                                    {review.name.charAt(0).toUpperCase()}
                                </Avatar>
                                <Box>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 800, fontSize: '0.9rem' }}>
                                        {review.name}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: '#a1a1aa', fontWeight: 600 }}>
                                        {new Date(review.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </Typography>
                                </Box>
                                <Box sx={{ flex: 1 }} />
                                <Rating value={review.rating} readOnly size="small" sx={{ color: '#fbbf24' }} />
                            </Stack>
                            <Typography variant="body2" sx={{ color: '#52525b', lineHeight: 1.7, fontSize: '0.95rem' }}>
                                {review.comment}
                            </Typography>
                        </Box>
                    ))
                )}
            </Stack>
        </Box>
    );
};

export default ProductReviews;
