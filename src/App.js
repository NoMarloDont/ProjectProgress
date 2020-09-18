import React, { useEffect, useState } from 'react';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Navbar from './components/Navbar/Navbar';
import { withFirebase } from './components/Firebase';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const App = (props) => {
  const [authUser, setAuthUser] = useState();
  useEffect(() => {
    const updateAuthUser = (resp) => {
      resp ? setAuthUser(resp) : setAuthUser(null);
      console.log(resp);
    }

    const authStateChangeListener = props.firebase.auth.onAuthStateChanged(updateAuthUser);

    return function cleanup () {
      authStateChangeListener();
    }
  });

  return (
    <Router>
      <div className="App">
        <Navbar user={authUser}/>
        <Switch>
          <Route exact path="/signin">
            <SignIn />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default withFirebase(App);
