import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { clearChatState } from "../../../actions/chatroomActions";
import { clearAll } from "../../../actions/friendActions";
import { clearState } from "../../../actions/authActions";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const LoggedInMenu = ({
  setSideMenu,
  auth: { token },
  clearState,
  clearAll,
  clearChatState,
}) => {

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

  const history = useHistory();

  return (
    <div className="">
      <div className=" hideOnLargeMedia styledMenu ">
        <div>
          <i
            className="fas fa-times closeConversation"
            onClick={() => setSideMenu(false)}
          ></i>
          <ul className="flexText">
            <li>
              <Link
                to="/"
                className="clear"
                onClick={() => {
                  setSideMenu(false);
                }}
              >
                Home
              </Link>
            </li>
            <li>
              {" "}
              <Link to="/about" className="clear ">
                About
              </Link>
            </li>
            <li onClick={onClick} className="clear">
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    chatroom: state.chatroom,
  });

export default connect(mapStateToProps, {
  clearChatState,
  clearAll,
  clearState,
})(LoggedInMenu);
