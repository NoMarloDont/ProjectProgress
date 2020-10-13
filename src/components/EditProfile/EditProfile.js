import React, { useState } from 'react';
import { withFirebase } from '../Firebase';

import { classes } from './EditProfile.css';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    root: {
        '& .MuiTextField-root': {
            margin: '5px'
        },
        '& .MuiButton-root': {
            margin: '5px'
        }
    }
});

const EditProfile = (props) => {
    const [name, setUserName] = useState(props.name);

    const nameChangedHandler = (event) => {
        setUserName(event.target.value);
    }

    const handleEditProfile = () => {
        props.firebase.editUserProfile(props.user.uid, name).then((resp) => {
            props.handleClose();
            props.getUserInfo(props.user.uid);
        });
    }

    const classes = useStyles();
    return (
        <div className="edit-profile__container">
            <div className="edit-profile__title">
                Profile Details
            </div>
            <form className={classes.root + ' edit-profile__form'}>
                <TextField
                    type="text"
                    id="username"
                    label="Username"
                    variant="outlined"
                    size="small"
                    onChange={nameChangedHandler}
                    value={name}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleEditProfile}
                >
                    Submit Updates
                </Button>
            </form>
        </div>
    )
}

export default withFirebase(EditProfile);