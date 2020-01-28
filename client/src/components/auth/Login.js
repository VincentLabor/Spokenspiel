import React, { useState } from "react";
import NavbarStandard from "../layout/NavbarStandard";
import {connect} from 'react-redux';
import { Link } from "react-router-dom";
import Footer from "../layout/Footer";
import { loginUser } from "../../actions/authActions";

const Login = ({ loginUser }) => {
  const [email, setEmail] = useState({
    email: ""
  });
  const [password, setPassword] = useState({
    password: ""
  });

  const onChange = e => {
    e.preventDefault();
    // const formData = {
    //   setEmail({e.})
    // }
  };
  const onSubmit = e => {};

  return (
    <div className="container pageColor">
      <NavbarStandard />
      <div className="container-form">
        <h1>Login</h1>
        <form>
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
          <button type="submit" className="submitBtn" onSubmit={onSubmit}>
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
