import React from 'react';
import { Paper, Typography, List, ListItemButton, ListItemText, Collapse } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const WholesaleSidebar = () => {
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <Paper elevation={0} sx={{ p: 2, bgcolor: 'white', borderRadius: 2, height: 'fit-content' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Categories</Typography>
            <List component="nav">
                <ListItemButton onClick={handleClick} sx={{ borderRadius: 1 }}>
                    <ListItemText primary="Electronics" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4, borderRadius: 1 }}>
                            <ListItemText primary="Mobile Phones" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4, borderRadius: 1 }}>
                            <ListItemText primary="Laptops" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4, borderRadius: 1 }}>
                            <ListItemText primary="Accessories" />
                        </ListItemButton>
                    </List>
                </Collapse>

                <ListItemButton sx={{ borderRadius: 1 }}>
                    <ListItemText primary="Fashion" />
                </ListItemButton>
                <ListItemButton sx={{ borderRadius: 1 }}>
                    <ListItemText primary="Home & Garden" />
                </ListItemButton>
                <ListItemButton sx={{ borderRadius: 1 }}>
                    <ListItemText primary="Automotive" />
                </ListItemButton>
                <ListItemButton sx={{ borderRadius: 1 }}>
                    <ListItemText primary="Industrial" />
                </ListItemButton>
            </List>
        </Paper>
    );
};

export default WholesaleSidebar;
