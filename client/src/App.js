import React, { Fragment } from "react";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import "./App.css";
import { Provider } from "react-redux";
import store from './store';

const App = () => {
  return (
    <Provider store ={store}>
      <Fragment>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Router>
      </Fragment>
    </Provider>
  );
};

export default App;

// /api/users",
// /api/auth",
// /api/friends
