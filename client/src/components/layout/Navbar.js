import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { clearState, loadUser } from "../../actions/authActions";
import Menu from "./menu/Menu";
import {
  getChatroomName,
  findChatroom,
  clearChatState,
} from "../../actions/chatroomActions";
import { clearAll } from "../../actions/friendActions";

const Navbar = ({
  auth: { token, user, isAuthenticated },
  clearState,
  loadUser,
  clearAll,
  chatroom: { currentChatroomName, currentChatroomId, currentSelectChatroom },
  findChatroom,
  clearChatState,
}) => {
  const history = useHistory();
  const [sideMenu, setSideMenu] = useState(false);

  useEffect(() => {
    //Temporary code for development. please remove after development
    if (token) {
      loadUser();
    }
  }, [loadUser, isAuthenticated, token]);

  useEffect(() => {
    if (currentChatroomId) {
      findChatroom(currentChatroomId);
    }
  }, [currentChatroomId]);

  const onClick = (e) => {
    if (token) {
      clearState();
      clearAll();
      clearChatState();
      history.push("/login");
    } else {
      console.log("nothing happened");
    }
  };

  const redirected = () => {
    history.push("/");
    window.location.reload();
  };

  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/login" className="clear hideOnSmallMedia">
          Login
        </Link>
      </li>
      <li>
        <Link to="/register" className="clear hideOnSmallMedia">
          Register
        </Link>
      </li>
    </Fragment>
  );

  return (
    <nav className={!token ? "nav" : " nav navDash"}>
      <div className="">
        <h1>
          {token ? (
            <Link to="/dashboard" className="clear">
              Spokenspiel
            </Link>
          ) : (
            <p onClick={redirected} className="clear royalBlueColor">
              Spokenspiel
            </p>
          )}
        </h1>
      </div>
      <div>
        {token && currentSelectChatroom ? (
          <p className="chatboxHeading">
            {" "}
            Chatting with{" "}
            {user.userName === currentSelectChatroom.user1Name
              ? currentSelectChatroom.user2Name
              : currentSelectChatroom.user1Name}
          </p>
        ) : null}
      </div>

      <ul className="flexRight">
        <li> {user ? <h4>Greetings, {user.userName}</h4> : null}</li>
        <div className="centerHeadings">
          <li>
            <Link to="/about" className="clear hideOnSmallMedia">
              About
            </Link>
          </li>

          {!token ? guestLinks : null}
          {!token ? null : (
            <li onClick={onClick} className="clear">
              Logout
            </li>
          )}
          <li>
            <i className="fas fa-bars hideOnLargeMedia" onClick={()=>{setSideMenu(true)}}></i>
          </li>
        </div>
      </ul>
      {sideMenu ? (
        <div className="styledMenu hideOnLargeMedia styledAnimation">
          <div>
            <i
              className="fas fa-times closeConversation"
              onClick={() => setSideMenu(false)}
            ></i>
            <ul className="flexText">
              <li>About</li>
              <li>login</li>
              <li>Register</li>
            </ul>
          </div>
        </div>
      ) : null}
    </nav>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  chatroom: state.chatroom,
});

export default connect(mapStateToProps, {
  clearState,
  loadUser,
  clearAll,

  getChatroomName,
  findChatroom,
  clearChatState,
})(Navbar);
