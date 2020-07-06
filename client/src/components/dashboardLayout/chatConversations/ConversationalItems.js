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
  chatroom: { currentChatroomId },
  setCurrentChatroomId,
  getMessagesFromDB,
  getUsersChatrooms,
  removeChatroomfromSight,
  key,
}) => {
  const [room, setRoomName] = useState("");
  const [isShown, setIsShown] = useState(false);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [active, setActive] = useState();

  // useEffect(() => {});

  const fixer = (conversation) => {
    //This prevents the users from
    setRoomName(conversation);
    getMessagesFromDB(conversation);
    setCurrentChatroomId(conversation);
    setCurrentConversation(conversation);
  };

  const removeConvoRoom = () => {
    removeChatroomfromSight(conversation._id);
    getUsersChatrooms();
  };

  return (
    <div>
      {conversation.isHidden === false ? (
        <div
          onClick={() => fixer(conversation._id)}
          className="convoContainer"
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
        >
          <p
            className={
              currentChatroomId === conversation._id
                ? "convoContainer cursorChg convoNames convoBorder"
                : "convoNames cursorChg convoContainer "
            }
          >
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
