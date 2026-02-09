import { TextField, InputAdornment, Button, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

const ResaleSearch = () => {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 2,
                mb: 3,
                borderRadius: 4,
                bgcolor: '#f1f5f9',
                display: 'flex',
                gap: 2,
                border: '1px solid #e2e8f0'
            }}
        >
            <TextField
                fullWidth
                placeholder="Search for used items..."
                variant="outlined"
                size="small"
                sx={{
                    bgcolor: 'white',
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                        '& fieldset': { borderColor: 'transparent' },
                        '&:hover fieldset': { borderColor: '#cbd5e1' },
                        '&.Mui-focused fieldset': { borderColor: '#94a3b8' }
                    }
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon color="action" />
                        </InputAdornment>
                    ),
                }}
            />
            <Button
                variant="contained"
                startIcon={<FilterListIcon />}
                sx={{
                    borderRadius: 3,
                    px: 3,
                    bgcolor: '#0f172a',
                    textTransform: 'none',
                    boxShadow: 'none',
                    '&:hover': { bgcolor: '#1e293b' }
                }}
            >
                Filters
            </Button>
        </Paper>
    );
};

export default ResaleSearch;
