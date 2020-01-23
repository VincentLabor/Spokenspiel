import React, { Fragment } from "react";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import "./App.css";

function App() {
  return (
    <Fragment>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path ="/register" component={Register}/>
          <Route exact path ="/login" component={Login} />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;


// /api/users",
// /api/auth", 
// /api/friends