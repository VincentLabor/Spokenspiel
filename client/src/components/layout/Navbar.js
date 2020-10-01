import React, { Fragment, useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { clearState, loadUser } from "../../actions/authActions";
import Menu from "./menu/Menu";
import LogoutModal from "./logoutModal/LogoutModal";

import {
  getChatroomName,
  findChatroom,
  clearChatState,
} from "../../actions/chatroomActions";
import { clearAll } from "../../actions/friendActions";
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
  const [toggleLogoutModal, setToggleLogoutModal] = useState(false);

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

  ////////////////////////////////////////////////////////////
  ///Dectection of page width and changing views for mobile///
  ////////////////////////////////////////////////////////////

  const [pageSize, setPageSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const resizeScreen = (fn, delay) => {
    let timeOutId;

    return function (...args) {
      if (timeOutId) {
        clearTimeout(timeOutId);
      }
      //There needs to be an id for setTimeout so i can cancel it if clicked.
      timeOutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  useEffect(() => {
    window.addEventListener(
      "resize",
      resizeScreen((e) => {
        setPageSize({
          height: window.innerHeight,
          width: window.innerWidth,
        });
      }, 1000)
    );
    // console.log(pageSize.width);
  }, [pageSize.width]);

  useEffect(() => {
    // if (pageSize.width < 321) {
    //   setShowMobileChat(true);
    // } else {
    //   setShowMobileChat(false);
    // }
  }, [pageSize, currentChatroomId]);

  const promptUserLogout = () => {
    setToggleLogoutModal(!toggleLogoutModal);
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
    <Fragment>
      <nav className={!token ? "nav" : " nav navDash"}>
        <div className="">
          <h1>
            {token ? (
              <Link to="/dashboard" className="clear">
                {pageSize.width < 500 ? "SP" : "Spokenspiel"}
              </Link>
            ) : (
              <p onClick={redirected} className="clear royalBlueColor">
                {pageSize.width < 500 ? "SP" : "Spokenspiel"}
              </p>
            )}
          </h1>
        </div>
        <div>
          {token && currentSelectChatroom ? (
            <p className="chatboxHeading whiteText">
              {" "}
              {pageSize.width < 500 ? "@" : "Chatting with "}
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
              <div>
                <h4 className="hideOnSmallMedia whiteText">
                  Greetings, {user.userName}
                </h4>
              </div>
            ) : null}
          </li>
          <div className="centerHeadings">
            <li className="hideOnSmallMedia">
              <Link to="/about" className="clear ">
                About
              </Link>
            </li>
            <div className="hello"></div>
            {!token ? guestLinks : null}
            {!token ? null : (
              <div>
                <li
                  onClick={promptUserLogout}
                  className="clear hideOnSmallMedia"
                >
                  Logout
                </li>
                {toggleLogoutModal ? (
                  <LogoutModal
                    setToggleLogoutModal={setToggleLogoutModal}
                    toggleLogoutModal={toggleLogoutModal}
                  />
                ) : null}
              </div>
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
          {!token ? (
            <Menu sideMenu={sideMenu} setSideMenu={setSideMenu} />
          ) : (
            <LoggedInMenu sideMenu={sideMenu} setSideMenu={setSideMenu} />
          )}
        </CSSTransition>
      </nav>
    </Fragment>
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
