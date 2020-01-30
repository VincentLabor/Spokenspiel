import React, { useState, useEffect } from "react";
import NavbarStandard from "../layout/NavbarStandard";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setAlert} from '../../actions/alertActions';
import Footer from "../layout/Footer";
import { loginUser } from "../../actions/authActions";
import Alert from '../alert/alerts';

const Login = ({ loginUser, alert: {alerts}, setAlert }) => {
  const [userAcct, setUserAcct] = useState({
    userName: "",
    password: ""
  });

  const { userName, password } = userAcct;

  const onChange = e => {
    setUserAcct({ ...userAcct, [e.target.name]: e.target.value });
    console.log(userName, password)
  };

  const onSubmit = e => {
    e.preventDefault();
    // if(userName === "" || password === ""){
    //   setAlert("Please enter a valid Username and Password")
    // }

    const userCreds = {userName, password};
    loginUser(userCreds);

  };

  useEffect(()=>{
    if (alerts){
      console.log(alerts)
      setAlert(alerts[0].msg)
    }
  }, [alert])

  return (
    <div className="container pageColor">
      <NavbarStandard />
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
          />
          <p className="credText">PASSWORD</p>
          <input
            type="password"
            name="password"
            className="credentials"
            onChange={onChange}
            value = {password}
          />
              {alerts && <Alert/>}
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

const mapStateToProps = state =>({
  alert: state.alert
})

export default connect(mapStateToProps, { loginUser, setAlert })(Login);
