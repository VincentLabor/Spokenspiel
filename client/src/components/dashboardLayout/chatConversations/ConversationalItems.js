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
  chatroom: { currentChatroomId },
  clearMsgs,
  setCurrentChatroomId,
  getMessagesFromDB,
  generalChatStatus,
  enterGeneralChat
}) => {
  const [room, setRoomName] = useState("");
  const [currentRoom, setCurrentRoom] = useState("");
  const [selected, setSelected] = useState(false);

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
    //This prevents the users from
      setRoomName(conversation._id);
      getMessagesFromDB(conversation._id);
  };

  //What if i changed where actions sent their payloads. like what if all the payloads went to the same state

  return (
    <div>
      {/* <h3 className="cursorChg" onClick={enteringGenChat}>
          General Chat
        </h3> */}
      {conversation ? (
        <h3 className="cursorChg convoItem"  onClick={onClick}>
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


  // const enteringGenChat = () => {
  //   clearMsgs();
  //   if (conversation) {
  //     enterGeneralChat();
  //   }
  //   if(currentChatroomId){
  //     setRoomName(currentChatroomId)
  //     getMessagesFromDB(currentChatroomId);

  //   }
  //   //here i should change where the messages get posted to?
  // };



  // className={
  //   selected ? "cursorChg convoItem highlight" : "cursorChg convoItem"
  // }