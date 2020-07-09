import React, { useEffect } from "react";
import { connect } from "react-redux";
import { saveSentMsgs } from "../../../actions/chatroomActions";
//we have to import users username here later
const Message = ({ message, auth: { user } }) => {
  let currentUserName = () => {
    let name = message.toString().slice();
    for (let i = 0; i < message.length; i++) {
      if (name[i] === ":") {
        return message.slice(0, i);
      }
    }
  };
  
  let currentUserNamesMsgs = () => {
    let name = message.toString().slice();
    for (let i = 0; i < message.length; i++) {
      if (name[i] === ":") {
        return name.slice(i+1 , name.length);
      }
    }
  };

  return (
    //  <div className=" messageContainer alignRight"> {/*Depending on user, the message will be left aligned or right aligned */}
    <div
      className={
        user.userName === currentUserName()
          ? "messageContainer alignRight"
          : "messageContainer"
      }
    >
      {" "}
      {/*Depending on user, the message will be left aligned or right aligned */}
      <p
        className={
          user.userName === currentUserName()
            ? "userColor userTextRight"
            : "otherUserColor userText "
        }
      >
        {" "}
        {/* Depending on who sent the msg will affect CSS of the msg */}
        {/* {currentUserName()}  This used to be the username but I removed*/}
        {currentUserNamesMsgs()}
      </p>
      <p></p>
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  chatroom: state.chatroom,
});
export default connect(mapStateToProps, { saveSentMsgs })(Message);
