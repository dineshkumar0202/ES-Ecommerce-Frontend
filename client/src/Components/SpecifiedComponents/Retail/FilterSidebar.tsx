import { useState } from 'react';
import {
    Box,
    Typography,
    Slider,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Button,
    Divider,
    Rating,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Chip,
    Stack
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';

interface FilterSidebarProps {
    categories: string[];
    brands: string[];
    onFilterChange: (filters: any) => void;
    initialFilters?: any;
}

const FilterSidebar = ({ categories, brands, onFilterChange, initialFilters = {} }: FilterSidebarProps) => {
    const [priceRange, setPriceRange] = useState<number[]>(initialFilters.priceRange || [0, 10000]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>(initialFilters.categories || []);
    const [selectedBrands, setSelectedBrands] = useState<string[]>(initialFilters.brands || []);
    const [minRating, setMinRating] = useState<number>(initialFilters.minRating || 0);

    const handlePriceChange = (_event: Event, newValue: number | number[]) => {
        setPriceRange(newValue as number[]);
    };

    const handleCategoryToggle = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const handleBrandToggle = (brand: string) => {
        setSelectedBrands(prev =>
            prev.includes(brand)
                ? prev.filter(b => b !== brand)
                : [...prev, brand]
        );
    };

    const handleApplyFilters = () => {
        onFilterChange({
            minPrice: priceRange[0],
            maxPrice: priceRange[1],
            categories: selectedCategories.length > 0 ? selectedCategories.join(',') : undefined,
            brands: selectedBrands.length > 0 ? selectedBrands.join(',') : undefined,
            minRating: minRating > 0 ? minRating : undefined
        });
    };

    const handleClearFilters = () => {
        setPriceRange([0, 10000]);
        setSelectedCategories([]);
        setSelectedBrands([]);
        setMinRating(0);
        onFilterChange({});
    };

    const activeFilterCount =
        (selectedCategories.length > 0 ? 1 : 0) +
        (selectedBrands.length > 0 ? 1 : 0) +
        (minRating > 0 ? 1 : 0) +
        (priceRange[0] > 0 || priceRange[1] < 10000 ? 1 : 0);

    return (
        <Box sx={{ width: 280, bgcolor: 'white', borderRadius: 4, p: 3, border: '1px solid #e2e8f0' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FilterListIcon sx={{ fontSize: 20 }} />
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                        Filters
                    </Typography>
                    {activeFilterCount > 0 && (
                        <Chip
                            label={activeFilterCount}
                            size="small"
                            sx={{ bgcolor: '#bef264', color: 'black', fontWeight: 800, height: 20, fontSize: '0.7rem' }}
                        />
                    )}
                </Box>
                {activeFilterCount > 0 && (
                    <Button
                        size="small"
                        startIcon={<ClearIcon />}
                        onClick={handleClearFilters}
                        sx={{ textTransform: 'none', fontSize: '0.75rem', fontWeight: 700 }}
                    >
                        Clear
                    </Button>
                )}
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Price Range */}
            <Accordion defaultExpanded elevation={0} sx={{ '&:before': { display: 'none' } }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0 }}>
                    <Typography sx={{ fontWeight: 700 }}>Price Range</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 0 }}>
                    <Slider
                        value={priceRange}
                        onChange={handlePriceChange}
                        valueLabelDisplay="auto"
                        min={0}
                        max={10000}
                        step={100}
                        sx={{ color: '#000' }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>₹{priceRange[0]}</Typography>
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>₹{priceRange[1]}</Typography>
                    </Box>
                </AccordionDetails>
            </Accordion>

            {/* Categories */}
            {categories.length > 0 && (
                <Accordion defaultExpanded elevation={0} sx={{ '&:before': { display: 'none' } }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0 }}>
                        <Typography sx={{ fontWeight: 700 }}>Categories</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ px: 0, maxHeight: 200, overflowY: 'auto' }}>
                        <FormGroup>
                            {categories.map((category) => (
                                <FormControlLabel
                                    key={category}
                                    control={
                                        <Checkbox
                                            checked={selectedCategories.includes(category)}
                                            onChange={() => handleCategoryToggle(category)}
                                            sx={{ '&.Mui-checked': { color: '#000' } }}
                                        />
                                    }
                                    label={<Typography variant="body2">{category}</Typography>}
                                />
                            ))}
                        </FormGroup>
                    </AccordionDetails>
                </Accordion>
            )}

            {/* Brands */}
            {brands.length > 0 && (
                <Accordion defaultExpanded elevation={0} sx={{ '&:before': { display: 'none' } }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0 }}>
                        <Typography sx={{ fontWeight: 700 }}>Brands</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ px: 0, maxHeight: 200, overflowY: 'auto' }}>
                        <FormGroup>
                            {brands.map((brand) => (
                                <FormControlLabel
                                    key={brand}
                                    control={
                                        <Checkbox
                                            checked={selectedBrands.includes(brand)}
                                            onChange={() => handleBrandToggle(brand)}
                                            sx={{ '&.Mui-checked': { color: '#000' } }}
                                        />
                                    }
                                    label={<Typography variant="body2">{brand}</Typography>}
                                />
                            ))}
                        </FormGroup>
                    </AccordionDetails>
                </Accordion>
            )}

            {/* Rating */}
            <Accordion defaultExpanded elevation={0} sx={{ '&:before': { display: 'none' } }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0 }}>
                    <Typography sx={{ fontWeight: 700 }}>Minimum Rating</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 0 }}>
                    <Stack spacing={1}>
                        {[4, 3, 2, 1].map((rating) => (
                            <Box
                                key={rating}
                                onClick={() => setMinRating(minRating === rating ? 0 : rating)}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    p: 1,
                                    borderRadius: 2,
                                    cursor: 'pointer',
                                    bgcolor: minRating === rating ? '#f8fafc' : 'transparent',
                                    border: minRating === rating ? '1px solid #000' : '1px solid transparent',
                                    '&:hover': { bgcolor: '#f8fafc' }
                                }}
                            >
                                <Rating value={rating} readOnly size="small" />
                                <Typography variant="caption" sx={{ fontWeight: 600 }}>& Up</Typography>
                            </Box>
                        ))}
                    </Stack>
                </AccordionDetails>
            </Accordion>

            <Button
                fullWidth
                variant="contained"
                onClick={handleApplyFilters}
                sx={{
                    mt: 3,
                    bgcolor: '#000',
                    color: 'white',
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 800,
                    textTransform: 'none',
                    '&:hover': { bgcolor: '#1e293b' }
                }}
            >
                Apply Filters
            </Button>
        </Box>
    );
};

export default FilterSidebar;
