import React, { useState } from 'react';
import { withFirebase } from '../Firebase';

import { makeStyles } from '@material-ui/core/styles';

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
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const classes = useStyles();

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
                    <h4 className={classes.title}>Project Progress</h4>
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