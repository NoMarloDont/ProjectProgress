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
  const [userProfile, setUserProfile] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authStateChangeListener = props.firebase.auth.onAuthStateChanged((resp) => {
      if (resp) {
        setAuthUser(resp);
        getUserInfo(resp.uid);
      } else {
        clearUser();
      }

      setIsLoading(false);
    });

    return function cleanup() {
      authStateChangeListener();
    }
  }, []);

  const getUserInfo = (uid) => {
      props.firebase.getUserProfile(uid).then((resp) => {
      setUserProfile(resp);
    });
  }

  const clearUser = () => {
    setAuthUser(null);
    setUserProfile(null);
  }

  return (
    <Router>
      <div className="App">
        <Navbar user={authUser} userName={userProfile?.name} getUserInfo={getUserInfo} />
        {isLoading ? (<div className="App__Loader">Loading ...</div>) : (
          <Switch>
            <Route exact path="/">
              <Redirect to="/signin" />
            </Route>
            <Route exact path="/projects">
              {authUser ?
                <Projects userId={authUser.uid} userName={userProfile?.name} /> :
                <Redirect to="/signin" />
              }
            </Route>
            <Route path="/project/:projectId" >
              {authUser ? 
                <Updates userId={authUser.uid} userName={userProfile?.name} /> :
                <SignIn />
              }
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
    </Router>
  );
}

export default withFirebase(App);
