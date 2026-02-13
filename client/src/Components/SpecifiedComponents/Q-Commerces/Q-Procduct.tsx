import { Box, Container, Typography, Stack, IconButton, Chip, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { QProductService, CartService } from '../../../services/api';
import { toast } from 'react-toastify';

interface Product {
    _id: string;
    name: string;
    image: string;
    images?: string[];
    price: number;
    unit: string;
    discount?: number;
    badge?: string;
    category?: string;
}

interface QProductProps {
    title: string;
    viewAllLink?: string;
    badge?: string;
    category?: string;
}

const QProduct = ({ title, viewAllLink, badge, category }: QProductProps) => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const { data } = await QProductService.getAll();

                // Filter by category if specified
                let filteredProducts = data;
                if (category) {
                    filteredProducts = data.filter((p: Product) =>
                        p.category?.toLowerCase() === category.toLowerCase()
                    );
                }

                // Limit to 8 products for display
                setProducts(filteredProducts.slice(0, 8));
            } catch (error) {
                console.error('Error fetching Q-Commerce products:', error);
                toast.error('Failed to load products');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [category]);

    const handleAddToCart = async (product: Product, e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            await CartService.addToCart({
                productId: product._id,
                quantity: 1,
                type: 'QCommerce'
            });
            toast.success(`${product.name} added to cart!`);
        } catch (error) {
            console.error('Error adding to cart:', error);
            toast.error('Please login to add items to cart');
        }
    };

    if (isLoading) {
        return (
            <Container maxWidth="xl" sx={{ mb: 6, display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress sx={{ color: '#B4D5DC' }} />
            </Container>
        );
    }

    if (products.length === 0) {
        return null;
    }

    return (
        <Container maxWidth="xl" sx={{ mb: 6 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '0.75rem', letterSpacing: 1, color: '#6b7280' }}>
                        {title}
                    </Typography>
                    {badge && (
                        <Chip
                            label={badge}
                            size="small"
                            sx={{
                                bgcolor: 'black',
                                color: 'white',
                                fontWeight: 800,
                                fontSize: '0.65rem',
                                height: '20px'
                            }}
                        />
                    )}
                </Stack>
                {viewAllLink && (
                    <Typography
                        onClick={() => navigate(viewAllLink)}
                        sx={{
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            color: '#1f2937',
                            cursor: 'pointer',
                            '&:hover': { textDecoration: 'underline' }
                        }}
                    >
                        View All →
                    </Typography>
                )}
            </Box>

            <Stack direction="row" spacing={3} sx={{ overflowX: 'auto', pb: 2, '::-webkit-scrollbar': { display: 'none' } }}>
                {products.map((product) => (
                    <Box
                        key={product._id}
                        sx={{
                            minWidth: { xs: '160px', md: '220px' },
                            bgcolor: 'white',
                            borderRadius: 4,
                            overflow: 'hidden',
                            cursor: 'pointer',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            border: '1px solid #f1f5f9',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: '0 12px 24px -10px rgba(0,0,0,0.1)'
                            }
                        }}
                        onClick={() => navigate(`/quick/product/${product._id}`)}
                    >
                        <Box sx={{
                            position: 'relative',
                            bgcolor: '#f8fafc',
                            height: { xs: '140px', md: '180px' },
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            p: 2
                        }}>
                            <img
                                src={product.images?.[0] || product.image}
                                alt={product.name}
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            />
                            {product.badge && (
                                <Chip
                                    label={product.badge}
                                    size="small"
                                    sx={{
                                        position: 'absolute',
                                        top: 12,
                                        left: 12,
                                        bgcolor: '#ef4444',
                                        color: 'white',
                                        fontWeight: 800,
                                        fontSize: '0.65rem',
                                        height: '22px'
                                    }}
                                />
                            )}
                            {product.discount && (
                                <Chip
                                    label={`${product.discount}% OFF`}
                                    size="small"
                                    sx={{
                                        position: 'absolute',
                                        top: 12,
                                        left: 12,
                                        bgcolor: '#ef4444',
                                        color: 'white',
                                        fontWeight: 800,
                                        fontSize: '0.65rem',
                                        height: '22px'
                                    }}
                                />
                            )}
                        </Box>
                        <Box sx={{ p: 1.5 }}>
                            <Typography sx={{
                                fontSize: { xs: '0.8rem', md: '0.9rem' },
                                fontWeight: 700,
                                mb: 0.5,
                                color: '#1f2937',
                                display: '-webkit-box',
                                WebkitLineClamp: 1,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                            }}>
                                {product.name}
                            </Typography>
                            <Typography sx={{ fontSize: '0.7rem', color: '#6b7280', mb: 1 }}>
                                {product.unit}
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography sx={{ fontSize: '1.1rem', fontWeight: 900, color: '#1f2937' }}>
                                    ₹{product.price}
                                </Typography>
                                <IconButton
                                    size="small"
                                    onClick={(e) => handleAddToCart(product, e)}
                                    sx={{
                                        bgcolor: '#B4D5DC',
                                        color: 'black',
                                        width: 32,
                                        height: 32,
                                        '&:hover': { bgcolor: '#9bc4c4' }
                                    }}
                                >
                                    <AddIcon sx={{ fontSize: 18 }} />
                                </IconButton>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Stack>
        </Container>
    );
};

export default QProduct;
