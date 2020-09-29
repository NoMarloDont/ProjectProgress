import React, { useEffect, useState } from 'react';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Navbar from './components/Navbar/Navbar';
import Projects from './components/Projects/Projects';
import Updates from './components/Updates/Updates';
import { withFirebase } from './components/Firebase';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

const App = (props) => {
  const [authUser, setAuthUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authStateChangeListener = props.firebase.auth.onAuthStateChanged((resp) => {
      resp ? setAuthUser(resp) : setAuthUser(null);
      setIsLoading(false);
    });

    return function cleanup() {
      authStateChangeListener();
    }
  });

  return (
    <Router>
      <div className="App">
        <Navbar user={authUser} />
        {isLoading ? (<div className="App__Loader">Loading ...</div>) : (
          <Switch>
            <Route exact path="/">
              <Redirect to="/signin" />
            </Route>
            <Route exact path="/projects">
              {authUser ?
                <Projects userId={authUser.uid} /> :
                <Redirect to="/signin" />
              }
            </Route>
            <Route path="/project/:projectId" >
              {authUser ? <Updates userId={authUser.uid} /> : <SignIn />}
            </Route>
            <Route path="/signin">
              {authUser ? <Redirect to="/projects" /> : <SignIn />}
            </Route>
            <Route path="/signup">
              {authUser ? <Redirect to="/projects" /> : <SignUp />}
            </Route>
          </Switch>
        )}
      </div>
    </Router >
  );
}

export default withFirebase(App);
