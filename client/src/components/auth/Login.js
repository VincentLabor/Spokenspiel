import React from "react";
import NavbarStandard from "../layout/NavbarStandard";
import { Link } from "react-router-dom";
import Footer from "../layout/Footer"

const Login =()=> {
  return (
    <div className="container pageColor">
      <NavbarStandard />
      <div className="container-form">
        <h1>Login</h1>
        <form>
          <p className="credText">USERNAME</p>
          <input type="text" name="Username" className="credentials"></input>
          <p className="credText">PASSWORD</p>
          <input type="text" name="Password" className="credentials"></input>
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
      <Footer/>
    </div>
  );
}

export default Login;
