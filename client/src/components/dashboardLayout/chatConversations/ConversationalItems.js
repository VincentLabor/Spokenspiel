import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import {
  getChatroomName,
  clearMsgs,
  setCurrentChatroomId,
  getMessagesFromDB,
  enterGeneralChat
} from "../../../actions/chatroomActions";

//Conversation may also refer to the chatrooms from the reducer
const ConversationItems = ({
  conversation,
  auth: { user },
  clearMsgs,
  setCurrentChatroomId,
  getMessagesFromDB,
  generalChatStatus,
  enterGeneralChat
}) => {
  const [room, setRoomName] = useState("");
  const [currentRoom, setCurrentRoom] = useState("");


  useEffect(() => {
    setCurrentChatroomId(room);
    if (user) {
      getChatroomName(
        user.userName === conversation.user1Name
          ? conversation.user2Name
          : conversation.user1Name
      );
        
    }
  }, [room]);

  const onClick = () => {
    clearMsgs();
    setRoomName(conversation._id);
    getMessagesFromDB(conversation._id);
  };

  const enteringGenChat = () => {
    clearMsgs();
   if(conversation){
    enterGeneralChat();
    getMessagesFromDB(conversation._id);
   }
    //here i should change where the messages get posted to?
  };


  return (
    <div>
      {generalChatStatus ? (
        <h3 className="cursorChg" onClick={enteringGenChat}>
          General Chat
        </h3>
      ) : null}
      {conversation ? (
        <h3 className="cursorChg convoItem" onClick={onClick}>
          {(user && user.userName) === conversation.user1Name
            ? conversation.user2Name
            : conversation.user1Name}
        </h3>
      ) : null}
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  chatroom: state.chatroom
});

export default connect(mapStateToProps, {
  getChatroomName,
  clearMsgs,
  setCurrentChatroomId,
  getMessagesFromDB,
  enterGeneralChat
})(ConversationItems);
