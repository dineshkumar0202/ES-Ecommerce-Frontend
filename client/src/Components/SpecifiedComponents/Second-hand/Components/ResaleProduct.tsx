import { Box, Container, Typography, IconButton, Chip } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ResaleService, WishlistService } from '../../../../services/api';
import { toast } from 'react-toastify';

interface Product {
    _id: string;
    title: string;
    image: string;
    images?: string[];
    price: number;
    condition?: string;
    category?: string;
    location?: string;
}

interface ResaleProductProps {
    title: string;
    viewAllLink?: string;
    category?: string;
}

const getConditionColor = (condition: string) => {
    const c = condition.toLowerCase();
    if (c.includes('new') || c.includes('like')) return '#0f766e'; // Dark teal
    if (c.includes('excellent')) return '#15803d'; // Dark green
    if (c.includes('good')) return '#dbeafe'; // Light blue
    return '#f3f4f6'; // Light gray default
};

const getConditionTextColor = (condition: string) => {
    const c = condition.toLowerCase();
    if (c.includes('new') || c.includes('like')) return '#ffffff'; // White
    if (c.includes('excellent')) return '#ffffff'; // White
    if (c.includes('good')) return '#1e40af'; // Dark blue
    return '#374151'; // Dark gray default
};

const ResaleProduct = ({ title, viewAllLink, category }: ResaleProductProps) => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [favorites, setFavorites] = useState<Set<string>>(new Set());

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const { data } = await ResaleService.getAll();

                // Filter by category if specified
                let filteredProducts = data;
                if (category) {
                    filteredProducts = data.filter((p: Product) =>
                        p.category?.toLowerCase() === category.toLowerCase()
                    );
                }

                // Limit to 4 products for display (matching the design)
                setProducts(filteredProducts.slice(0, 4));
            } catch (error) {
                console.error('Error fetching resale products:', error);
                toast.error('Failed to load products');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [category]);

    const handleToggleFavorite = async (product: Product, e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            if (!favorites.has(product._id)) {
                await WishlistService.addToWishlist({
                    productId: product._id,
                    type: 'Resale'
                });
                setFavorites(prev => new Set(prev).add(product._id));
                toast.success('Added to wishlist!');
            }
        } catch (error) {
            console.error('Error with wishlist:', error);
            toast.error('Please login to add to wishlist');
        }
    };

    if (isLoading) {
        return (
            <Container maxWidth="xl" sx={{ mb: 8 }}>
                <Typography sx={{ textAlign: 'center', py: 4, color: '#94a3b8' }}>
                    Loading products...
                </Typography>
            </Container>
        );
    }

    if (products.length === 0) {
        return null;
    }

    return (
        <Container maxWidth="xl" sx={{ mb: 8 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.1rem', color: '#1f2937' }}>
                    {title}
                </Typography>
                {viewAllLink && (
                    <Typography
                        onClick={() => navigate(viewAllLink)}
                        sx={{
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            color: '#3b82f6',
                            cursor: 'pointer',
                            '&:hover': { textDecoration: 'underline' }
                        }}
                    >
                        View All →
                    </Typography>
                )}
            </Box>

            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                gap: 3
            }}>
                {products.map((product) => (
                    <Box
                        key={product._id}
                        sx={{
                            bgcolor: '#f8f9fa',
                            borderRadius: 3,
                            overflow: 'hidden',
                            cursor: 'pointer',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            border: '1px solid #e5e7eb',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: '0 12px 24px rgba(0,0,0,0.1)'
                            }
                        }}
                        onClick={() => navigate(`/resale/product/${product._id}`)}
                    >
                        <Box sx={{ position: 'relative', bgcolor: '#f1f5f9', height: '260px', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4 }}>
                            <img
                                src={product.images?.[0] || product.image}
                                alt={product.title}
                                style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }}
                            />
                            <IconButton
                                onClick={(e) => handleToggleFavorite(product, e)}
                                sx={{
                                    position: 'absolute',
                                    top: 12,
                                    right: 12,
                                    bgcolor: 'white',
                                    width: 32,
                                    height: 32,
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                    '&:hover': { bgcolor: '#f8fafc' }
                                }}
                            >
                                {favorites.has(product._id) ?
                                    <FavoriteIcon sx={{ color: '#ef4444', fontSize: 18 }} /> :
                                    <FavoriteBorderIcon sx={{ fontSize: 18, color: '#94a3b8' }} />
                                }
                            </IconButton>
                            {product.condition && (
                                <Chip
                                    label={product.condition}
                                    size="small"
                                    sx={{
                                        position: 'absolute',
                                        top: 12,
                                        left: 12,
                                        bgcolor: getConditionColor(product.condition),
                                        color: getConditionTextColor(product.condition),
                                        fontWeight: 800,
                                        fontSize: '0.65rem',
                                        height: '24px',
                                        borderRadius: 1,
                                        textTransform: 'uppercase',
                                        letterSpacing: 0.5
                                    }}
                                />
                            )}
                        </Box>
                        <Box sx={{ p: 2.5, bgcolor: '#ffffff' }}>
                            <Typography sx={{
                                fontSize: '0.9rem',
                                fontWeight: 700,
                                mb: 0.5,
                                color: '#1f2937',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}>
                                {product.title}
                            </Typography>
                            {product.location && (
                                <Typography sx={{ fontSize: '0.7rem', color: '#94a3b8', mb: 2, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <LocationOnIcon sx={{ fontSize: 14 }} /> {product.location}
                                </Typography>
                            )}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography sx={{ fontSize: '1.25rem', fontWeight: 900, color: '#1f2937' }}>
                                    ₹{product.price.toLocaleString()}
                                </Typography>
                                <IconButton
                                    size="small"
                                    sx={{
                                        bgcolor: '#f1f5f9',
                                        color: '#334155',
                                        width: 36,
                                        height: 36,
                                        borderRadius: 2,
                                        '&:hover': { bgcolor: '#e2e8f0', color: '#0f172a' }
                                    }}
                                >
                                    <ShoppingCartOutlinedIcon sx={{ fontSize: 20 }} />
                                </IconButton>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Container>
    );
};

export default ResaleProduct;
