import React, { useState, useEffect } from "react";
import Navbar from "../layout/Navbar";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setAlert } from "../../actions/alertActions";
import Footer from "../layout/Footer";
import { loginUser, loadUser } from "../../actions/authActions";
import Alert from "../alert/alerts";
import { useHistory } from "react-router-dom";

const Login = ({
  loginUser,
  alert: { alerts },
  setAlert,
  auth: { isAuthenticated,user,token },
  loadUser
}) => {

  const [userAcct, setUserAcct] = useState({
    userName: "",
    password: ""
  });
  const history = useHistory();

  useEffect(() => {
    if (alerts) {
      console.log(alerts);
      setAlert(alerts[0].msg);
    }
    if (isAuthenticated) {
      history.push("/dashboard");
    } else {
      history.push("/login");
    }
    // if(token&&isAuthenticated){
    //   loadUser();
    // }

  }, [history, isAuthenticated, user, loadUser, alerts, setAlert, token]);

  const { userName, password } = userAcct;

  const onChange = e => {
    setUserAcct({ ...userAcct, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    const userCreds = { userName, password };
    loginUser(userCreds);
  };

  return (
    <div className="container pageColor">
      <Navbar />
      <div className="container-form">
        <h1>Login</h1>

        <form onSubmit={onSubmit}>
          <p className="credText">USERNAME</p>
          <input
            type="text"
            name="userName"
            className="credentials"
            onChange={onChange}
            value={userName}
            autoFocus
          />
          <p className="credText">PASSWORD</p>
          <input
            type="password"
            name="password"
            className="credentials"
            onChange={onChange}
            value={password}
          />
          {alerts && <Alert />}
          <button type="submit" className="submitBtn">
            Submit
          </button>
        </form>
        <p>
          <Link to="/register" className="credLink">
            Don't have an account? Click here to register
          </Link>
        </p>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = state => ({
  alert: state.alert,
  auth: state.auth
});

export default connect(mapStateToProps, { loginUser, setAlert, loadUser })(Login);
