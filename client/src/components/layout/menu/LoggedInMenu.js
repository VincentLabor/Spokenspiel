import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  clearChatState,
  returnToMobileFriendslist,
} from "../../../actions/chatroomActions";
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
  returnToMobileFriendslist,
}) => {
  const [swapToMobileChat, setSwapToMobileChat] = useState(false);
  const [checkIfUserWishesToLog, setCheckIfUserWishesToLog] = useState(false);

  const promptUserAboutLogout = () => {
    setCheckIfUserWishesToLog(true);
    // if (token) {
    //   clearState();
    //   clearAll();
    //   clearChatState();
    //   history.push("/login");
    // } else {
    //   console.log("nothing happened");
    // }
  };

   const logUserOut = ()=>{
    if (token) {
      clearState();
      clearAll();
      clearChatState();
      history.push("/login");
    } else {
      console.log("nothing happened");
    }
   }

   

  const viewMobileFriendslist = () => {
    returnToMobileFriendslist();
    clearChatState();
    setSideMenu(false);
  };

  const history = useHistory();

  return (
    <div className="">
      <div className=" hideOnLargeMedia styledMenu backgroundBlue">
        <div>
          <div className="flexBetween mg-left1 sidemenuBotMargin">
            <h2 className="leftAlign">SP</h2>
            <i
              className="fas fa-times closeConversation"
              onClick={() => setSideMenu(false)}
            ></i>
          </div>

          <ul className="flexText leftAlign fontSize20 colorWhite">
            <li className="mg1-bottom">
              <Link
                to="/"
                className="clear"
                onClick={() => {
                  setSideMenu(false);
                }}
              >
                <i class="fas fa-home"></i>
                {"    "}
                Home
              </Link>
            </li>
            <li className="mg1-bottom">
              {" "}
              <Link to="/about" className="clear ">
                <i class="far fa-question-circle"></i>
                {"    "}
                About
              </Link>
            </li>
            <li onClick={viewMobileFriendslist} className="mg1-bottom">
              <i class="fas fa-address-book"></i> {"    "}
              Friends List
            </li>
            <li
              onClick={promptUserAboutLogout}
              className="clear"
              className="mg1-bottom"
            >
              <i class="fas fa-sign-out-alt"></i> {"    "}
              Logout
              {checkIfUserWishesToLog ? (
                <div className="mg1-top ">
                  {" "}
                  <p>Are you sure you want to logout?</p>
                  <button className="btn redBackground colorWhite" onClick={logUserOut}>Yes</button>
                  <button className="btn blackText">No</button>
                </div>
              ) : null}
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
  returnToMobileFriendslist,
})(LoggedInMenu);
