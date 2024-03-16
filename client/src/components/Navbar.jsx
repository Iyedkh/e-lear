import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles'; // Import makeStyles from @mui/styles

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: 'auto', // Aligns menu button to the left
    },
    title: {
        flexGrow: 1,
        display: 'none',
        '@media (min-width: 600px)': {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: 4,
        backgroundColor: '#ffffff',
        '&:hover': {
            backgroundColor: '#f1f1f1',
        },
        marginLeft: 'auto', // Aligns search bar to the right
        marginRight: 20, // Add some right margin for spacing
        width: 'auto',
    },
    searchIcon: {
        padding: 4,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: '4px 4px 4px 24px',
        transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        width: 100,
        '&:focus': {
            width: 150,
        },
    },
    navLinks: {
        display: 'flex',
        justifyContent: 'center', // Aligns nav-links to the center
        listStyleType: 'none',
        padding: 0,
        margin: 0,
    },
    navItem: {
        marginLeft: 20,
    },
});

const NavBar = () => {
    const classes = useStyles();
    const [searchQuery, setSearchQuery] = useState('');

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSubmit = () => {
        // Handle search functionality here
        console.log('Search Query:', searchQuery);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        E-Learning Platform
                    </Typography>
                    <ul className={classes.navLinks}>
                        <li className={classes.navItem}><Link to="/">Home</Link></li>
                        <li className={classes.navItem}><Link to="/courses">Courses</Link></li>
                        <li className={classes.navItem}><Link to="/about">About</Link></li>
                    </ul>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={handleChange}
                        />
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Search
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default NavBar;
