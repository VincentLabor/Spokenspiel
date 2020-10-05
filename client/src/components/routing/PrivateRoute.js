import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Redirect, Route } from "react-router-dom";

const PrivateRoute = ({
  auth: { loading },
  auth: { token },
  component: Component,
  ...rest
}) => {
  //Setting component as Component and everything else is destructured into rest
  return (
    <Route
      {...rest}
      render={(props) => {
        if(!token){
          return <Redirect to="/login" />
        }
        if (localStorage.getItem("token") && !loading && token) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(PrivateRoute);
