import React from "react";
import {connect} from "react-redux";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ auth:{loading},component: Component, ...rest }) => {
  //Setting component as Component and everything else is destructured into rest
  return (
    <Route {...rest} render={props=> localStorage.getItem("token") && !loading ? (<Component {...props}/>):( <Redirect to="/login" />)}/>
  );
};

const mapStateToProps = state=>({
  auth: state.auth
})

export default connect(mapStateToProps,{})(PrivateRoute);
