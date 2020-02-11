import React, { useState, useEffect } from "react";
import Navbar from "../layout/Navbar";
import { useHistory } from "react-router-dom"; // This allows me to push users to differnt page after registration
import { Link } from "react-router-dom";
import { registerUser, loadUser } from "../../actions/authActions";
import { setAlert } from "../../actions/alertActions";
import Footer from "../layout/Footer";
import { connect } from "react-redux";
import Alert from "../alert/alerts";
// import history from '../history/history';

const Register = ({
  registerUser,
  setAlert,
  alert: { alerts },
  auth: { isAuthenticated, token },
  loadUser
}) => {
  const [user, setUser] = useState({
    email: "",
    userName: "",
    password: "",
    password2: ""
  });

  const history = useHistory();

  const { email, userName, password, password2 } = user;

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/dashboard");
    } else {
      history.push("/register");
    }
  }, [history, isAuthenticated, token, loadUser]);

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (!email || !userName || !password) {
      setAlert("Please fill in all of the fields", "danger");
    } 
    // else if (password.length < 6) {
    //   setAlert("Please enter a password of at least 6 characters");
    // }
     else if (password !== password2) {
      setAlert("The passwords do not match", "danger");
    }

    const newUser = {
      email,
      userName,
      password
    };
    registerUser(newUser);
  };

  return (
    <div className="container pageColor">
      <Navbar />
      <div className="container-form">
        <h1>Register</h1>

        <form className="block" onSubmit={onSubmit}>
          <p className="credText"> EMAIL</p>
          <input
            type="email"
            name="email"
            className="credentials"
            value={email}
            onChange={onChange}
          />
          <p className="credText">USERNAME</p>
          <input
            type="text"
            name="userName"
            className="credentials"
            value={userName}
            onChange={onChange}
          />
          <p className="credText">PASSWORD</p>
          <input
            type="password"
            name="password"
            className="credentials"
            value={password}
            onChange={onChange}
          />
          <p className="credText">CONFIRM PASSWORD</p>
          <input
            type="password"
            name="password2"
            className="credentials"
            value={password2}
            onChange={onChange}
          />

          <button type="submit" className="submitBtn">
            Submit
          </button>
          {alerts && <Alert />}
          <p>
            <Link to="/login" className="credLink">
              Have an account? Click here to login
            </Link>
          </p>
        </form>
      </div>

      <Footer />
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth, //This is based on the index.js file in the root reducer folder.
  alert: state.alert
});

export default connect(mapStateToProps, { registerUser, setAlert, loadUser })(
  Register
);
