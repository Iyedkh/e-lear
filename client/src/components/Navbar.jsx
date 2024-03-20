import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme, Button, InputBase } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

const NavBar = () => {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <>
        
            <AppBar position="static" style={{ backgroundColor: '#6c757d' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Navbar Offcanvas
                    </Typography>
                    {!isMobile && (
                        <>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Button color="inherit" component={Link} to="/">Home</Button>
                                <Button color="inherit" component={Link} to="/course">Courses</Button>
                                <Button color="inherit" component={Link} to="/about">About</Button>
                            </div>
                            <div style={{ flexGrow: 1 }} />
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                            <div style={{
                                        padding: 8,
                                        borderRadius: 4,
                                        backgroundColor: '#ffffff',
                                        '&:hover': {
                                            backgroundColor: '#f1f1f1',
                                        },
                                    }}>
                                        <SearchIcon style={{ color: 'black' }} />
                                    </div>
                                <InputBase
                                    placeholder="Search…"
                                    style={{
                                        padding: '8px 12px',
                                        marginLeft: 8,
                                        borderRadius: 4,
                                        width: 200,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </div>
                        </>
                    )}
                    {isMobile && (
                        <IconButton
                            size="large"
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleDrawerOpen}
                            style={{ marginLeft: 'auto' }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="right"
                open={open}
                onClose={handleDrawerClose}
            >
                <div style={{ width: 250 }}>
                    <List>
                        <ListItem button component={Link} to="/">
                            <ListItemText primary="Home" />
                        </ListItem>
                        <ListItem button component={Link} to="/courses">
                            <ListItemText primary="Courses" />
                        </ListItem>
                        <ListItem button component={Link} to="/about">
                            <ListItemText primary="About" />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
        </>
    );
}

export default NavBar;
