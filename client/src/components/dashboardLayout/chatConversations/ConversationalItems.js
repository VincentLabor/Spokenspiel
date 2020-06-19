import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  clearMsgs,
  setCurrentChatroomId,
  getMessagesFromDB,
  enterGeneralChat,
  removeChatroomfromSight,
  getUsersChatrooms,
} from "../../../actions/chatroomActions";

//Conversation may also refer to the chatrooms from the reducer
const ConversationItems = ({
  conversation,
  auth: { user },
  // chatroom: { currentChatroomId },
  // clearMsgs,
  setCurrentChatroomId,
  getMessagesFromDB,
  // generalChatStatus,
  // enterGeneralChat,
  getUsersChatrooms,
  removeChatroomfromSight,
}) => {
  const [room, setRoomName] = useState("");
  const [isShown, setIsShown] = useState(false);

  const onClick = () => {
    //This prevents the users from
    setRoomName(conversation._id);
    getMessagesFromDB(conversation._id);
    setCurrentChatroomId(conversation._id);
  };

  const removeConvoRoom = () => {
    removeChatroomfromSight(conversation._id);
    getUsersChatrooms();
  };

  return (
    <div>
      {conversation.isHidden === false ? (
        <div
          className="convoContainer"
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
        >
          {" "}
          <p className="cursorChg convoNames" onClick={onClick}>
            {(user && user.userName) === conversation.user1Name
              ? conversation.user2Name
              : conversation.user1Name}
          </p>
          {isShown ? (
            <i
              className="fas fa-times closeConversation"
              onClick={removeConvoRoom}
            ></i>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  chatroom: state.chatroom,
});

export default connect(mapStateToProps, {
  clearMsgs,
  setCurrentChatroomId,
  getMessagesFromDB,
  enterGeneralChat,
  removeChatroomfromSight,
  getUsersChatrooms,
})(ConversationItems);
