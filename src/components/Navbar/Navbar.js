import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles({
    root: {
        flexGrow: 1
    },
    title: {
        flexGrow: 1
    },
    menu: {
        marginTop: '42px'
    }
});

const Navbar = (props) => {
    const history = useHistory();
    let location = useLocation();

    const [anchorEl, setAnchorEl] = useState(null);
    const [pathName, setPathName] = useState();
    const open = Boolean(anchorEl);

    const classes = useStyles();

    useEffect(() => {
        setPathName(location.pathname.split('/'));
    }, [location.pathname]);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignOut = () => {
        props.firebase.signOutUser();
        handleClose();
    };

    const requestProjects = () => {
        history.push(`/projects`);
    }

    let navBarTitle = 'Project Progress';
    if (pathName?.[1] === 'project') {
        navBarTitle = <ArrowBackIcon />
    }

    let avatar;
    if (props.user) {
        avatar = (
            <Avatar onClick={handleMenu}>
                <PersonIcon />
            </Avatar>
        );
    }

    return (
        <div className={classes.root}>
            <AppBar>
                <Toolbar>
                    <h4 className={classes.title} onClick={requestProjects}>{navBarTitle}</h4>
                    {avatar}
                    <Menu
                        id="menu-navbar"
                        className={classes.menu}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleSignOut}>Log Out</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default withFirebase(Navbar);