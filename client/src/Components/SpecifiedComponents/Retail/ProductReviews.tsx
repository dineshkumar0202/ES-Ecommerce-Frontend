import { Box, Typography, Stack, Rating, TextField, Button, Avatar, Divider } from '@mui/material';
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

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 4, textTransform: 'uppercase' }}>
                Customer Reviews ({totalReviews})
            </Typography>

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={8}>
                {/* Review Stats */}
                <Box sx={{ minWidth: 250 }}>
                    <Box sx={{ p: 4, bgcolor: '#f4f4f5', borderRadius: 4, textAlign: 'center' }}>
                        <Typography variant="h2" sx={{ fontWeight: 900, mb: 1 }}>
                            {averageRating.toFixed(1)}
                        </Typography>
                        <Rating value={averageRating} readOnly precision={0.1} sx={{ color: 'black', mb: 1 }} />
                        <Typography variant="body2" sx={{ color: '#71717a', fontWeight: 600 }}>
                            Based on {totalReviews} reviews
                        </Typography>
                    </Box>
                </Box>

                {/* Reviews List */}
                <Box sx={{ flex: 1 }}>
                    <Stack spacing={4}>
                        {reviews.length > 0 ? reviews.map((review) => (
                            <Box key={review._id}>
                                <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                                    <Avatar sx={{ bgcolor: 'black' }}>{review.userName?.[0] || 'U'}</Avatar>
                                    <Box>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>{review.userName}</Typography>
                                        <Rating value={review.rating} readOnly size="small" sx={{ color: 'black' }} />
                                    </Box>
                                    <Typography variant="caption" sx={{ ml: 'auto', color: '#a1a1aa' }}>
                                        {new Date(review.createdAt).toLocaleDateString()}
                                    </Typography>
                                </Stack>
                                <Typography sx={{ color: '#3f3f46', lineHeight: 1.6 }}>
                                    {review.comment}
                                </Typography>
                                <Divider sx={{ mt: 4 }} />
                            </Box>
                        )) : (
                            <Typography sx={{ color: '#71717a' }}>No reviews yet. Be the first to review!</Typography>
                        )}
                    </Stack>

                    {/* Add Review Form */}
                    <Box sx={{ mt: 8, p: 4, border: '1px solid #e4e4e7', borderRadius: 4 }}>
                        <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>WRITE A REVIEW</Typography>
                        <Stack spacing={3}>
                            <Box>
                                <Typography variant="caption" sx={{ fontWeight: 800, display: 'block', mb: 1 }}>RATING</Typography>
                                <Rating
                                    value={rating}
                                    onChange={(_event, newValue) => setRating(newValue)}
                                    sx={{ color: 'black' }}
                                />
                            </Box>
                            <Box>
                                <Typography variant="caption" sx={{ fontWeight: 800, display: 'block', mb: 1 }}>YOUR COMMENT</Typography>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    placeholder="Share your thoughts about this product..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                />
                            </Box>
                            <Button
                                variant="contained"
                                sx={{
                                    bgcolor: 'black',
                                    color: 'white',
                                    py: 1.5,
                                    fontWeight: 800,
                                    '&:hover': { bgcolor: '#27272a' }
                                }}
                            >
                                SUBMIT REVIEW
                            </Button>
                        </Stack>
                    </Box>
                </Box>
            </Stack>
        </Box>
    );
};

export default ProductReviews;
