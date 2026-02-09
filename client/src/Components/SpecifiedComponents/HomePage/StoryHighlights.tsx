import { Box, Typography } from '@mui/material';
import { keyframes } from '@mui/system';

const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(223, 228, 234, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(223, 228, 234, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(223, 228, 234, 0); }
`;

const stories = [
    { id: 1, label: "New Arrivals", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&q=80" },
    { id: 2, label: "Flash Sale", img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=200&q=80", isLive: true },
    { id: 3, label: "Best Sellers", img: "https://images.unsplash.com/photo-1550614000-4b9519e07502?w=200&q=80" },
    { id: 4, label: "Celeb Style", img: "https://images.unsplash.com/photo-1534030347209-7147fd69a398?w=200&q=80" },
    { id: 5, label: "Gadgets", img: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=200&q=80" },
    { id: 6, label: "Beauty", img: "https://images.unsplash.com/photo-1596462502278-27bfdd403348?w=200&q=80" },
    { id: 7, label: "Sneakers", img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=200&q=80" },
    { id: 8, label: "Home", img: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=200&q=80" },
];

const StoryHighlights = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                gap: 3,
                py: 2,
                px: 2,
                overflowX: 'auto',
                bgcolor: 'white',
                // Hide scrollbar
                '&::-webkit-scrollbar': { display: 'none' },
                scrollbarWidth: 'none',
                mb: 2,
                borderBottom: '1px solid rgba(0,0,0,0.05)'
            }}
        >
            {stories.map((story) => (
                <Box
                    key={story.id}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1,
                        flexShrink: 0,
                        cursor: 'pointer'
                    }}
                >
                    <Box
                        sx={{
                            p: 0.3,
                            borderRadius: '50%',
                            background: story.isLive
                                ? 'linear-gradient(45deg, #ff0050, #00f2ea)'
                                : 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                            animation: story.isLive ? `${pulse} 2s infinite` : 'none'
                        }}
                    >
                        <Box
                            component="img"
                            src={story.img}
                            sx={{
                                width: 70,
                                height: 70,
                                borderRadius: '50%',
                                border: '3px solid white',
                                objectFit: 'cover',
                                transition: 'transform 0.2s',
                                '&:hover': { transform: 'scale(0.95)' }
                            }}
                        />
                    </Box>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: '#2d3436' }}>
                        {story.label}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
};

export default StoryHighlights;
