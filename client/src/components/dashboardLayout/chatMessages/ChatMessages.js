import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Message from "./Message"; //This is to move to Message.js
import io from "../../../../node_modules/socket.io-client/dist/socket.io";
import { getMessagesFromDB } from "../../../actions/chatroomActions";

const ChatMessages = ({
  chatroom: { msgs, currentChatroomId },
  getMessagesFromDB,
}) => {


  //let socket = io("localhost:5000");

  // socket.on("sendTypedMsg", (typedMsg) => {
  //   if (currentChatroomId) {
  //     getMessagesFromDB(currentChatroomId);
  //   }
  //});

  const [currentMsgSent, setCurrentMsgSent] = useState(null);

  return (
    <div>
      {!msgs
        ? null
        : msgs.map((message, i) => (
            <div key={i}>
              <Message message={message} />
            </div>
          ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  chatroom: state.chatroom,
});

export default connect(mapStateToProps, { getMessagesFromDB })(ChatMessages);
