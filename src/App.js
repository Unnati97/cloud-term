import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./web-pages/login";
import Welcome from "./web-pages/welcome";
import Register from "./web-pages/register";
import Home from "./web-pages/home";
import JobDetail from "./web-pages/job-detail";
import Profile from "./web-pages/profile";
import Bookmark from "./web-pages/bookmark";
import LexUi from "./web-pages/lex-ui";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    setSession();
  }, []);

  const setSession = async () => {
    try {
      setIsAuthenticated(true);
    } catch (error) {
      if (error !== "No current user") {
        console.log(error);
      }
    }
    setIsAuthenticating(false);
  };

  return (
    <BrowserRouter>
      {!isAuthenticating && (
        <div className="App">
          <Switch>
            <Route
              exact
              path="/login"
              component={(props) => (
                <Login
                  {...props}
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                />
              )}
            />
            <Route exact path="/register" component={Register} />
            <Route
              exact
              path="/home"
              component={(props) => (
                <Home
                  {...props}
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                />
              )}
            />
            <Route
              exact
              path="/job-detail"
              component={(props) => (
                <JobDetail
                  {...props}
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                />
              )}
            />
            <Route
              exact
              path="/profile"
              component={(props) => (
                <Profile
                  {...props}
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                />
              )}
            />
            <Route
              exact
              path="/bookmark"
              component={(props) => (
                <Bookmark
                  {...props}
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                />
              )}
            />
            <Route exact path="/" component={Welcome} />
            <Route exact path="/welcome" component={Welcome} />
            <Route exact path="/chat" component={LexUi} />
          </Switch>
        </div>
      )}
      )
    </BrowserRouter>
  );
}

export default App;
