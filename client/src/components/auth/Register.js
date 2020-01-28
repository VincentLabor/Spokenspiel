import React, { useState } from "react";
import NavbarStandard from "../layout/NavbarStandard";
import { Link } from "react-router-dom";
import { registerUser } from "../../actions/authActions";
import Footer from "../layout/Footer";
import { connect } from "react-redux";

const Register = ({registerUser}) => {
  const [user, setUser] = useState({
    email: "",
    userName: "",
    password: "",
    password2: ""
  });

const {email, userName, password, password2} = user;

  const onChange = e => {
    setUser({ [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    //  if (!email || !userName || !password) {
    //    console.log(
    //      "Please fill in all of the forms to complete the registration"
    //    );
    //  }
     if (password !== password2) {
       console.log("The passwords do not match");
     }

     const newUser = {
       email,
       userName,
       password,
       password2
     }; 

    registerUser(user);
  };

  return (
    <div className="container pageColor">
      <NavbarStandard />
      <div className="container-form">
        <h1>Register</h1>
        <form className="block">
          <p className="credText"> EMAIL</p>
          <input
            type="text"
            name="email"
            className="credentials"
            value={user}
            onChange={onChange}
          />
          <p className="credText">USERNAME</p>
          <input
            type="text"
            name="userName"
            className="credentials"
            value={user}
            onChange={onChange}
          />
          <p className="credText">PASSWORD</p>
          <input
            type="text"
            name="password"
            className="credentials"
            value={user}
            onChange={onChange}
          />
          <p className="credText">CONFIRM PASSWORD</p>
          <input
            type="text"
            name="password2"
            className="credentials"
            value={user}
            onChange={onChange}
          />

          <button type="submit" className="submitBtn" onSubmit={onSubmit}>
            Submit
          </button>

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
  auth: state.user
});

export default connect(mapStateToProps, { registerUser })(Register);
