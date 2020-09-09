import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  saveSentMsgs,
  unreadMsgsCount,
  getUnreadCount,
} from "../../../actions/chatroomActions";

const ChatInput = ({
  auth: { user },
  currentMsg,
  setCurrentMsg,
  sendMessage,
  unreadMsgsCount,
  chatroom: { currentChatroomId, unreadMsgs, lastUserToSendMsg },
  saveSentMsgs,
}) => {
  const [currentMsgSent, setCurrentMsgSent] = useState();
  const [msgCounter, setMsgCounter] = useState(0);

  useEffect(() => {
    //Function that sends into database. An if statement that checks for currentconvo_id
    if (currentChatroomId && msgCounter > 0) {
      let unreadPackage = {
        msgCounter,
        currentChatroomId,
      };

      unreadMsgsCount(unreadPackage);
      //At this point, I can grab theglobal count here and add it while still checking if the last user sent is still the same.
    }

    // console.log(msgCounter);
    // console.log(unreadMsgs);
  }, [msgCounter]);

  const onChange = (e) => {
    e.preventDefault();
      setCurrentMsg(e.target.value); //Adding a prefix here will break the program
      setCurrentMsgSent(user.userName + ": " + e.target.value);

  };

  const sendMsgToChatroom = async (e) => {
    e.preventDefault(); //Prevents page from opening after sending message
      sendMessage(user.userName + ": " + e);

    let msgPacket = {
      currentMsgSent,
      currentChatroomId,
    };
    if (currentMsgSent !== null && currentChatroomId !== null && currentMsgSent !== undefined) {
      saveSentMsgs(msgPacket);
    }
    setCurrentMsg(""); //This clears the input bar

    if(currentMsgSent !== undefined){
      if (msgCounter === 0 && unreadMsgs) {
        setMsgCounter(msgCounter + unreadMsgs + 1);
      } else {
        setMsgCounter(msgCounter + 1);
      }
    } else {
      return null;
    }


    //  await sendInfo();
  };

  let sendInfo = () => {
    let unreadPackage = {
      msgCounter,
      currentChatroomId,
    };

    unreadMsgsCount(unreadPackage);
    console.log(msgCounter);
  };

  return (
    <div className="wrapper ">
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

export default connect(mapStateToProps, { saveSentMsgs, unreadMsgsCount })(
  ChatInput
);


