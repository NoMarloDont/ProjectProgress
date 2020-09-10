import React, { useEffect, useState } from 'react';
import SignIn from './components/SignIn/SignIn';
import { withFirebase } from './components/Firebase';
import './App.css';

const App = (props) => {
  const [authUser, setAuthUser] = useState();
  useEffect(() => {
    const updateAuthUser = (resp) => {
      resp ? setAuthUser(resp) : setAuthUser(null);
      console.log(resp);
    }
    props.firebase.auth.onAuthStateChanged(updateAuthUser);
  });

  return (
    <div className="App">
      <SignIn />
    </div>
  );
}

export default withFirebase(App);
