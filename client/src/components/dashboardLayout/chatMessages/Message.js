import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import { saveSentMsgs } from "../../../actions/chatroomActions";
//we have to import users username here later

const Message = ({
  message,
  auth: { user },
  chatroom: { currentChatroomId },
  saveSentMsgs
}) => {
  const [testArray, setTestArray] = useState([]);
  const [currentMsgSent, setCurrentMsgSent] = useState(null);


  useEffect(() => {
    setCurrentMsgSent(user.userName + ": " + message);
  }, [user]); //May need to double check on this one

  useEffect(() => {
    let msgPacket = {
      currentMsgSent,
      currentChatroomId
    };

    if (currentMsgSent !== null && currentChatroomId !== null) {
      saveSentMsgs(msgPacket);
    }
  }, [currentMsgSent]);

  return (
    //This needs to be mapped out like an array
    <div className="messageContainer backgroundBlue">
      <p>This needs</p>;
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  chatroom: state.chatroom
});
export default connect(mapStateToProps, { saveSentMsgs })(Message);
