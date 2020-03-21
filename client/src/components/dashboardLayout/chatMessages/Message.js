import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import { saveSentMsgs } from "../../../actions/chatroomActions";
//we have to import users username here later

let socket;

const Message = ({
  message,
  auth: { user },
  chatroom: { currentChatroomId },
  saveSentMsgs
}) => {
  const [testArray, setTestArray] = useState([]);
  const [currentMsgSent, setCurrentMsgSent] = useState(null);
  const endpoint = "localhost:5000";
  socket = io(endpoint);
  const [loading, setLoading] = useState(false);
  
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
    <div className="messageContainer backgroundBlue">
      {!testArray
        ? null
        : testArray.map((separateMsg, i) => {
            return <p key={i}>{separateMsg}</p>;
          })}
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  chatroom: state.chatroom
});
export default connect(mapStateToProps, { saveSentMsgs })(Message);
