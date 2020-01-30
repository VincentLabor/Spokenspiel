import React, { useState } from "react";
import NavbarStandard from "../layout/NavbarStandard";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "../layout/Footer";
import { loginUser } from "../../actions/authActions";

const Login = ({ loginUser }) => {
  const [userAcct, setUserAcct] = useState({
    userName: "",
    password: ""
  });

  const { userName, password } = userAcct;

  const onChange = e => {
    e.preventDefault();
    setUserAcct({ ...userAcct, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    if(!userName || !password){
      console.log("User/pass is incorrect. Please try again")
    }
    const userCreds = {userName, password};
    loginUser(userCreds);
  };

  return (
    <div className="container pageColor">
      <NavbarStandard />
      <div className="container-form">
        <h1>Login</h1>
        <form onSubmit={onSubmit}>
          <p className="credText">USERNAME</p>
          <input
            type="text"
            name="Username"
            className="credentials"
            onChange={onChange}
          />
          <p className="credText">PASSWORD</p>
          <input
            type="text"
            name="Password"
            className="credentials"
            onChange={onChange}
          />
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

export default connect(null, { loginUser })(Login);
