import React from 'react';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FilterListIcon from '@mui/icons-material/FilterList';

const WholesaleFilterBar = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Button
                variant="outlined"
                endIcon={<KeyboardArrowDownIcon />}
                onClick={handleClick}
                sx={{
                    color: 'text.primary',
                    borderColor: '#e2e8f0',
                    textTransform: 'none',
                    bgcolor: 'white',
                    px: 2,
                    borderRadius: 2
                }}
            >
                All Categories
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Electronics</MenuItem>
                <MenuItem onClick={handleClose}>Fashion</MenuItem>
                <MenuItem onClick={handleClose}>Home & Garden</MenuItem>
            </Menu>

            <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                sx={{
                    color: 'text.primary',
                    borderColor: '#e2e8f0',
                    textTransform: 'none',
                    bgcolor: 'white',
                    px: 2,
                    borderRadius: 2
                }}
            >
                More Filters
            </Button>
        </Box>
    );
};

export default WholesaleFilterBar;
