import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {clearState} from '../../actions/authActions';

const NavbarStandard = ({ auth: { token, user }, clearState }) => {

  // useEffect(()=>{
  //   if (!token){
  //     history.push("/");
  //   }
  // })

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

  return (
    <nav className=" nav pd-2_5">
      <div>
        <h1>
          <Link to="/" className="clear">
            Spokenspiel
          </Link>
        </h1>
       
         {!token ? null :<p onClick={onClick}>Logout</p> }
        {/* {user ? <p>Hi</p> : null} */}
      </div>
    </nav>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {clearState})(NavbarStandard);
