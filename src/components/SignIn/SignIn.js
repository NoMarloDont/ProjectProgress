import React, { useState } from 'react';
import { withFirebase } from '../Firebase';
import './SignIn.css';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

import { Link } from "react-router-dom";

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

const SignIn = (props) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const emailChangedHandler = (event) => {
        setEmail(event.target.value)
    }

    const passwordChangedHandler = (event) => {
        setPassword(event.target.value)
    }

    let isDisabled = !(email && password);

    const handleSignIn = () => {
        props.firebase.signInUser(email, password).then(resp => {
            
        }).catch(err => console.error(err));
    }

    const classes = useStyles();

    return (
        <div className="SignIn__Container">
            <h3 className="SignIn__Title">Project Progress</h3>
            <form className={classes.root + " SignIn__Form"}>
                <TextField
                    type="text"
                    id="email"
                    label="Email"
                    variant="outlined"
                    size="small"
                    onChange={emailChangedHandler}
                />
                <TextField
                    type="password"
                    id="password"
                    label="Password"
                    variant="outlined"
                    size="small"
                    onChange={passwordChangedHandler}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSignIn}
                    disabled={isDisabled}
                >
                    Login
                </Button>
            </form>

            <div className="SignIn__RequestSignUp">
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
        </div>
    );
};

export default withFirebase(SignIn);