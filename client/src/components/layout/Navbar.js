import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { clearState, loadUser } from "../../actions/authActions";
import { clearAllChatroomState } from "../../actions/chatroomActions";
import { getChatroomName, findChatroom } from "../../actions/chatroomActions";
import { clearAll } from "../../actions/friendActions";

const Navbar = ({
  auth: { token, user, isAuthenticated },
  clearState,
  loadUser,
  clearAll,
  clearAllChatroomState,
  chatroom: { currentChatroomName, currentChatroomId, currentSelectChatroom },
  findChatroom,
}) => {
  const history = useHistory();

  const onClick = (e) => {
    if (token) {
      clearState();
      clearAll();
      clearAllChatroomState();
      history.push("/login");
    } else {
      console.log("nothing happened");
    }
  };

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

  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/login" className="clear">
          Login
        </Link>
      </li>
      <li>
        <Link to="/register" className="clear">
          Register
        </Link>
      </li>
    </Fragment>
  );

  const redirected = () => {
    history.push("/");
    window.location.reload();
  };

  return (
    <nav className={!token ? "nav pd-2_5": " nav pd-2_5 navDash"}>
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
        <li>
          <Link to="/about" className="clear">
            About
          </Link>
        </li>

        {!token ? guestLinks : null}
        {!token ? null : (
          <li onClick={onClick} className="clear">
            Logout
          </li>
        )}
      </ul>
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
  clearAllChatroomState,
  getChatroomName,
  findChatroom,
})(Navbar);
