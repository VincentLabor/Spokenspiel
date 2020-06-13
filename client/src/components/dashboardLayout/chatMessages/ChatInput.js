import React, { useState } from "react";
import { connect } from "react-redux";
import { saveSentMsgs } from "../../../actions/chatroomActions";

const ChatInput = ({
  auth: { user },
  currentMsg,
  setCurrentMsg,
  sendMessage,
  chatroom: { currentChatroomId },
  saveSentMsgs,
}) => {
  const [currentMsgSent, setCurrentMsgSent] = useState("");

  const onChange = (e) => {
    setCurrentMsg(e.target.value); //Adding a prefix here will break the program
    setCurrentMsgSent(user.userName + ": " + e.target.value);
  };


  //There's an issue with this specific function
  const sendMsgToChatroom = (e) => {
    e.preventDefault(); //Prevents page from opening after sending message
    sendMessage(user.userName + ": " + e);
    
    let msgPacket = {
      currentMsgSent,
      currentChatroomId,
    };
    if (currentMsgSent !== null && currentChatroomId !== null) {
      saveSentMsgs(msgPacket);
    }
    setCurrentMsg(""); //This clears the input bar
    setCurrentMsgSent("")
  };

  return (
    <div className="wrapper">
      <div className="chatboxDisplay">
        <form onSubmit={sendMsgToChatroom}>
          <input
            type="text"
            className="chatboxInput"
            value={currentMsg}
            onChange={onChange}
            name="msg"
            placeholder="Send a message"
            autoComplete="off"
            autoFocus
          ></input>
          <button type="submit" className="chatboxBtn ">
            Enter
          </button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  chatroom: state.chatroom,
});

export default connect(mapStateToProps, { saveSentMsgs })(ChatInput);
