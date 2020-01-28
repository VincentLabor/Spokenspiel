import React, { useState } from "react";
import NavbarStandard from "../layout/NavbarStandard";
import { Link } from "react-router-dom";
import { registerUser } from "../../actions/authActions";
import Footer from "../layout/Footer";
import { connect } from "react-redux";

const Register = ({ registerUser }) => {
  const [user, setUser] = useState({
    email: "",
    userName: "",
    password: "",
    password2: ""
  });

  const { email, userName, password, password2 } = user;

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    //  if (!email || !userName || !password) {
    //    console.log(
    //      "Please fill in all of the forms to complete the registration"
    //    );
    //  }
    // if (password !== password2) {
    //   console.log("The passwords do not match");
    // }

    const newUser = {
      email,userName,password
    }

     registerUser(newUser);

    console.log(newUser);
    

  };

  return (
    <div className="container pageColor">
      <NavbarStandard />
      <div className="container-form">
        <h1>Register</h1>
        <form className="block" onSubmit={onSubmit}>
          <p className="credText"> EMAIL</p>
          <input
            type="text"
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

// const mapStateToProps = state => ({
//   auth: state.user
// });

export default connect(null, { registerUser })(Register);
