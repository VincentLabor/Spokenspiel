import React, { Fragment, useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
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
import { set } from "mongoose";
import LoggedInMenu from "./menu/LoggedInMenu";

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

  useEffect(() => {
    console.log(sideMenu);
  });

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

  // const sideMenuElements = () => {
  //   return sideMenu ? (
  //     <Menu sideMenu={sideMenu} setSideMenu={setSideMenu} />
  //   ) : null;
  // };

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
        <li>
          {" "}
          {user ? (
            <h4 className="hideOnSmallMedia">Greetings, {user.userName}</h4>
          ) : null}
        </li>
        <div className="centerHeadings">
          <li className="hideOnSmallMedia">
            <Link to="/about" className="clear ">
              About
            </Link>
          </li>

          {!token ? guestLinks : null}
          {!token ? null : (
            <li onClick={onClick} className="clear hideOnSmallMedia">
              Logout
            </li>
          )}
          <li>
            <i
              className="fas fa-bars hideOnLargeMedia"
              onClick={() => {
                setSideMenu(true);
              }}
            ></i>
          </li>
        </div>
      </ul>

      <CSSTransition
        in={sideMenu}
        timeout={300}
        classNames="moveIn"
        unmountOnExit
      >
        {!token ? <Menu sideMenu={sideMenu} setSideMenu={setSideMenu} />: <LoggedInMenu sideMenu={sideMenu} setSideMenu={setSideMenu} />}
      </CSSTransition>
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
