import React, { useState } from 'react';
import { withFirebase } from '../Firebase'
import './SignUp.css';

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

const SignUp = (props) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const emailChangedHandler = (event) => {
        setEmail(event.target.value);
    }

    const passwordChangedHandler = (event) => {
        setPassword(event.target.value);
    }

    const confirmPasswordChangedHandler = (event) => {
        setConfirmPassword(event.target.value);
    }

    let isDisabled = !(email && password && password === confirmPassword);

    const handleSignUp = () => {
        props.firebase.createUser(email, password);
    }

    const classes = useStyles();

    return (
        <div className="SignUp__Container">
            <h3 className="SignUp__Title">Project Progress</h3>
            <form className={classes.root + " SignUp__Form"}>
                <TextField
                    type="text"
                    id="email"
                    label="Email"
                    variant="outlined"
                    size="small"
                    onChange={emailChangedHandler}
                />
                <TextField
                    type="text"
                    id="password"
                    label="Password"
                    variant="outlined"
                    size="small"
                    onChange={passwordChangedHandler}
                />
                <TextField
                    type="text"
                    id="confirmPassword"
                    label="Confirm Password"
                    variant="outlined"
                    size="small"
                    onChange={confirmPasswordChangedHandler}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSignUp}
                    disabled={isDisabled}
                >
                    Sign Up
                </Button>
            </form>

            <div className="SignUp__RequestSignUp">
                Already have an account? <Link to="/signin">Sign In</Link>
            </div>
        </div>
    );
};

export default withFirebase(SignUp);