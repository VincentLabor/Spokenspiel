import React from "react";
import NavbarStandard from "../layout/NavbarStandard";
import { Link } from "react-router-dom";
import Footer from "../layout/Footer";

const Register = ()=> {
  return (
    <div className="container pageColor">
      <NavbarStandard />
      <div className="container-form">
        <h1>Register</h1>
        <form className="block">
          <p className="credText"> EMAIL</p>
          <input type="text" name="Email" className="credentials"></input>
          <p className="credText">USERNAME</p>
          <input type="text" name="Username" className="credentials"></input>
          <p className="credText">PASSWORD</p>
          <input type="text" name="Password" className="credentials"></input>
          <p className="credText">CONFIRM PASSWORD</p>
          <input type="text" name="Password" className="credentials"></input>

          <button type="submit" className="submitBtn">
            Submit
          </button>

          <p>
            <Link to="/login" className="credLink">
              Have an account? Click here to login
            </Link>
          </p>
        </form>
      </div>
      <Footer/>
    </div>
  );
}

export default Register;
