import React, { useState } from 'react';
import { withFirebase } from '../Firebase'
import classes from './SignIn.css';

const SignIn = (props) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const emailChangedHandler = (event) => {
        setEmail(event.target.value)
    }

    const passwordChangedHandler = (event) => {
        setPassword(event.target.value)
    }

    const handleSignIn = () => {
        props.firebase.signInUser(email, password).then(resp => {
            alert("Signed in with " + resp);
        }).catch(err => console.error(err));

    }

    return (
        <div>
            <h1>SignIn</h1>
            <form>
                <label for="email">email:</label>
                <input type="text" id="email" name="email" onChange={emailChangedHandler} />
                <label for="password">password:</label>
                <input type="text" id="password" name="password" onChange={passwordChangedHandler} />
                <button type="button" onClick={handleSignIn}>Sign In</button>
            </form>
        </div>
    );
};

export default withFirebase(SignIn);