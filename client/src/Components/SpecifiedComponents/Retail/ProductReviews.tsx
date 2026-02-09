import { useState } from 'react';
import {
    Box,
    Typography,
    Rating,
    TextField,
    Button,
    Stack,
    Avatar,
    LinearProgress,
    Paper,
    Alert
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
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
    averageRating: number;
    totalReviews: number;
    onReviewAdded: () => void;
}

const ProductReviews = ({ productId, reviews, averageRating, totalReviews, onReviewAdded }: ProductReviewsProps) => {
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

    // Calculate rating distribution
    const ratingDistribution = [5, 4, 3, 2, 1].map(star => {
        const count = reviews.filter(r => r.rating === star).length;
        const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
        return { star, count, percentage };
    });

    return (
        <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 4 }}>Customer Reviews</Typography>

            {/* Rating Summary */}
            <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#f8fafc' }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems={{ xs: 'flex-start', md: 'center' }}>
                    <Box sx={{ textAlign: { xs: 'left', md: 'center' } }}>
                        <Typography variant="h2" sx={{ fontWeight: 900, mb: 1 }}>{averageRating.toFixed(1)}</Typography>
                        <Rating value={averageRating} precision={0.1} readOnly size="large" />
                        <Typography variant="body2" sx={{ color: '#64748b', mt: 1 }}>
                            Based on {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
                        </Typography>
                    </Box>

                    <Box sx={{ flex: 1, width: '100%' }}>
                        {ratingDistribution.map(({ star, count, percentage }) => (
                            <Stack key={star} direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
                                <Typography variant="body2" sx={{ minWidth: 60, fontWeight: 600 }}>
                                    {star} <StarIcon sx={{ fontSize: 14, color: '#fbbf24', verticalAlign: 'middle' }} />
                                </Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={percentage}
                                    sx={{
                                        flex: 1,
                                        height: 8,
                                        borderRadius: 4,
                                        bgcolor: '#e2e8f0',
                                        '& .MuiLinearProgress-bar': { bgcolor: '#fbbf24' }
                                    }}
                                />
                                <Typography variant="body2" sx={{ minWidth: 40, color: '#64748b' }}>
                                    {count}
                                </Typography>
                            </Stack>
                        ))}
                    </Box>
                </Stack>
            </Paper>

            {/* Write a Review */}
            {isLoggedIn ? (
                <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 4, border: '1px solid #e2e8f0' }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Write a Review</Typography>

                    {success && (
                        <Alert severity="success" sx={{ mb: 3 }}>
                            Review submitted successfully!
                        </Alert>
                    )}

                    {error && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {error}
                        </Alert>
                    )}

                    <Stack spacing={3}>
                        <Box>
                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Your Rating</Typography>
                            <Rating
                                value={rating}
                                onChange={(_, newValue) => setRating(newValue || 5)}
                                size="large"
                            />
                        </Box>

                        <Box>
                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Your Review</Typography>
                            <TextField
                                multiline
                                rows={4}
                                fullWidth
                                placeholder="Share your experience with this product..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                variant="outlined"
                            />
                        </Box>

                        <Button
                            variant="contained"
                            onClick={handleSubmitReview}
                            disabled={isSubmitting}
                            sx={{
                                bgcolor: '#000',
                                color: 'white',
                                py: 1.5,
                                borderRadius: 3,
                                fontWeight: 800,
                                textTransform: 'none',
                                '&:hover': { bgcolor: '#1e293b' },
                                width: { xs: '100%', sm: 'auto' }
                            }}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Review'}
                        </Button>
                    </Stack>
                </Paper>
            ) : (
                <Alert severity="info" sx={{ mb: 4 }}>
                    Please log in to write a review
                </Alert>
            )}

            {/* Reviews List */}
            <Stack spacing={3}>
                {reviews.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 6, bgcolor: '#f8fafc', borderRadius: 4 }}>
                        <Typography sx={{ color: '#94a3b8' }}>No reviews yet. Be the first to review!</Typography>
                    </Box>
                ) : (
                    reviews.map((review) => (
                        <Paper key={review._id} elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0' }}>
                            <Stack direction="row" spacing={2}>
                                <Avatar sx={{ bgcolor: '#bef264', color: 'black', fontWeight: 800 }}>
                                    {review.name.charAt(0).toUpperCase()}
                                </Avatar>
                                <Box sx={{ flex: 1 }}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
                                        <Box>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                                                {review.name}
                                            </Typography>
                                            <Rating value={review.rating} readOnly size="small" />
                                        </Box>
                                        <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                                            {new Date(review.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </Typography>
                                    </Stack>
                                    <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.6 }}>
                                        {review.comment}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Paper>
                    ))
                )}
            </Stack>
        </Box>
    );
};

export default ProductReviews;
