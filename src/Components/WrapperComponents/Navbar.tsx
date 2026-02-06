import { AppBar, Toolbar, Typography, IconButton, Badge, Box, InputBase, Select, MenuItem, Stack, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState('All');

    const navItemsBottom = [
        'Fresh', 'MX Player', 'Sell', 'Amazon Pay', 'Today\'s Deals',
        'Bestsellers', 'Buy Again', 'Keep Shopping for', 'Prime',
        'Customer Service', 'Mobiles', 'Gift Cards'
    ];

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="sticky" sx={{ boxShadow: 'none' }}>
                {/* Top Header - Dark Blue #131921 */}
                <Toolbar sx={{
                    bgcolor: '#131921',
                    color: 'white',
                    minHeight: '60px !important',
                    px: '10px !important',
                    gap: 1
                }}>

                    {/* Logo Area */}
                    <Box
                        onClick={() => navigate('/')}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            p: 1,
                            cursor: 'pointer',
                            border: '1px solid transparent',
                            '&:hover': { border: '1px solid white', borderRadius: 1 }
                        }}
                    >
                        <Typography variant="h5" sx={{ fontWeight: 900, letterSpacing: '-1px', lineHeight: 1 }}>
                            amazon<span style={{ fontSize: '14px' }}>.in</span>
                        </Typography>
                    </Box>

                    {/* Location Selector */}
                    <Box sx={{
                        display: { xs: 'none', md: 'flex' },
                        alignItems: 'center',
                        cursor: 'pointer',
                        p: 1,
                        border: '1px solid transparent',
                        '&:hover': { border: '1px solid white', borderRadius: 1 }
                    }}>
                        <LocationOnOutlinedIcon sx={{ mt: 1, fontSize: 20 }} />
                        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 0.5 }}>
                            <Typography variant="caption" sx={{ color: '#ccc', lineHeight: 1 }}>Delivering to Salem 636008</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1 }}>Update location</Typography>
                        </Box>
                    </Box>

                    {/* Search Bar */}
                    <Box sx={{
                        flexGrow: 1,
                        display: 'flex',
                        alignItems: 'center',
                        mx: 2,
                        height: 40,
                        borderRadius: 1,
                        bgcolor: 'white',
                        overflow: 'hidden'
                    }}>
                        <Box sx={{ bgcolor: '#f3f3f3', height: '100%', display: 'flex', alignItems: 'center', borderRight: '1px solid #cdcdcd' }}>
                            <Select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                variant="standard"
                                disableUnderline
                                sx={{
                                    width: 60,
                                    fontSize: 12,
                                    pl: 1,
                                    bgcolor: '#f3f3f3',
                                    color: '#555',
                                    height: '100%',
                                    '& .MuiSelect-select': { display: 'flex', alignItems: 'center' }
                                }}
                                IconComponent={ArrowDropDownIcon}
                            >
                                <MenuItem value="All">All</MenuItem>
                                <MenuItem value="Electronics">Electronics</MenuItem>
                                <MenuItem value="Fashion">Fashion</MenuItem>
                            </Select>
                        </Box>
                        <InputBase
                            placeholder="Search Amazon.in"
                            sx={{ flex: 1, px: 2, fontSize: 15 }}
                        />
                        <Box sx={{
                            width: 45,
                            height: '100%',
                            bgcolor: '#febd69',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            '&:hover': { bgcolor: '#f3a847' }
                        }}>
                            <SearchIcon sx={{ color: '#333' }} />
                        </Box>
                    </Box>

                    {/* Language Selector */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        p: 1,
                        cursor: 'pointer',
                        border: '1px solid transparent',
                        '&:hover': { border: '1px solid white', borderRadius: 1 }
                    }}>
                        <Box component="img" src="https://flagcdn.com/w20/in.png" alt="India" sx={{ width: 20, mr: 0.5 }} />
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>EN</Typography>
                        <ArrowDropDownIcon fontSize="small" sx={{ color: '#a7acb2' }} />
                    </Box>

                    {/* Account & Lists */}
                    <Box
                        onClick={() => navigate('/login')}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            p: 1,
                            cursor: 'pointer',
                            border: '1px solid transparent',
                            '&:hover': { border: '1px solid white', borderRadius: 1 }
                        }}
                    >
                        <Typography variant="caption" sx={{ lineHeight: 1 }}>Hello, DINESH</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1 }}>Account & Lists</Typography>
                            <ArrowDropDownIcon fontSize="small" sx={{ color: '#a7acb2' }} />
                        </Box>
                    </Box>

                    {/* Returns & Orders */}
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        p: 1,
                        cursor: 'pointer',
                        border: '1px solid transparent',
                        '&:hover': { border: '1px solid white', borderRadius: 1 }
                    }}>
                        <Typography variant="caption" sx={{ lineHeight: 1 }}>Returns</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1 }}>& Orders</Typography>
                    </Box>

                    {/* Cart */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        p: 1,
                        cursor: 'pointer',
                        border: '1px solid transparent',
                        '&:hover': { border: '1px solid white', borderRadius: 1 }
                    }}>
                        <Badge badgeContent={1} color="warning" sx={{ '& .MuiBadge-badge': { right: 3, top: 4, color: '#111', fontWeight: 'bold' } }}>
                            <ShoppingCartOutlinedIcon sx={{ fontSize: 32 }} />
                        </Badge>
                        <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.5 }}>Cart</Typography>
                    </Box>
                </Toolbar>

                {/* Bottom Navigation - Darker Blue #232f3e */}
                <Toolbar variant="dense" sx={{
                    bgcolor: '#232f3e',
                    color: 'white',
                    minHeight: '40px !important',
                    gap: 3,
                    overflowX: 'auto',
                    scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': { display: 'none' }
                }}>

                    <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', p: '4px 8px', '&:hover': { border: '1px solid white', borderRadius: 1 } }}>
                        <MenuIcon sx={{ mr: 0.5 }} />
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>All</Typography>
                    </Box>

                    {/* Module Switcher */}
                    <Typography
                        onClick={() => navigate('/')}
                        variant="body2"
                        sx={{ cursor: 'pointer', fontWeight: 600, '&:hover': { color: '#ff9900' } }}
                    >
                        Retail
                    </Typography>

                    <Typography
                        onClick={() => navigate('/wholesale')}
                        variant="body2"
                        sx={{ cursor: 'pointer', fontWeight: 600, '&:hover': { color: '#ff9900' } }}
                    >
                        Wholesale
                    </Typography>

                    <Typography
                        onClick={() => navigate('/quick')}
                        variant="body2"
                        sx={{ cursor: 'pointer', fontWeight: 600, '&:hover': { color: '#ff9900' } }}
                    >
                        Q-Commerce
                    </Typography>

                    <Typography
                        onClick={() => navigate('/resale')}
                        variant="body2"
                        sx={{ cursor: 'pointer', fontWeight: 600, '&:hover': { color: '#ff9900' } }}
                    >
                        Resale
                    </Typography>

                    <Typography
                        onClick={() => navigate('/freelance')}
                        variant="body2"
                        sx={{ cursor: 'pointer', fontWeight: 600, '&:hover': { color: '#ff9900' } }}
                    >
                        Freelance
                    </Typography>

                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;
