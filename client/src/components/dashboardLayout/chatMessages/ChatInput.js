import React,{useState} from "react";
import { connect } from "react-redux";
import {saveSentMsgs} from '../../../actions/chatroomActions';

const ChatInput = ({
  auth: { user },
  currentMsg,
  setCurrentMsg,
  sendMessage,
  chatroom:{currentChatroomId},
  saveSentMsgs
}) => {

  const [currentMsgSent, setCurrentMsgSent] = useState("")

  const onChange = e => {
    setCurrentMsg(e.target.value);
    setCurrentMsgSent(user.userName + " : "+ e.target.value)
  };

  const onSubmit = e => {
    e.preventDefault();
    // sendMessage(e);
    sendMessage(user.userName + " : " + e);
     let msgPacket = {
       currentMsgSent,
       currentChatroomId
     };

     if (currentMsgSent !== null && currentChatroomId !== null) {
      saveSentMsgs(msgPacket);
    }

  };

  return (
    <div className="wrapper">
      <div className="chatboxDisplay">
        <form onSubmit={onSubmit}>
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

const mapStateToProps = state => ({
  auth: state.auth,
  chatroom: state.chatroom
});

export default connect(mapStateToProps, {saveSentMsgs})(ChatInput);
