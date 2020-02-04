import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { clearState } from "../../actions/authActions";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Navbar = ({ auth: { token, user }, clearState }) => {

  const history = useHistory();

  const onClick = e => {
    if (token) {
      localStorage.removeItem("token");
      clearState();
      history.push("/login");
    } else {
      console.log("nothing happened");
    }
  };

  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/login" className="clear">
          Login
        </Link>
      </li>
      <li>
        <Link to="/register" className="clear">
          Register
        </Link>
      </li>
    </Fragment>
  );

  const Refresh = ({ path = '/' }) => (
    <Route
        path={path}
        component={({ history, location, match }) => {
            history.replace({
                ...location,
                pathname:location.pathname.substring(match.path.length)
            });
            return null;
        }}
    />
);

const redirected = ()=>{
  history.push('/');
  window.location.reload();
}

  return (
    <nav className=" nav pd-2_5">
      <div className="">
        <h1>
          {token ? (
            <Link to="/dashboard" className="clear">
              Spokenspiel
            </Link>
          ) : (
            <p onClick={redirected}>Spokenspiel</p>
            // <Link to="/" className="clear">
            //   Spokenspiel
            // </Link>
          )}
        </h1>
        {!token ? null : <p onClick={onClick}>Logout</p>}
      </div>
      <ul className="flexRight">
        <li>
          <Link to="/about" className="clear">
            About
          </Link>
        </li>
        {!token ? guestLinks : null}
      </ul>
    </nav>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { clearState })(Navbar);
