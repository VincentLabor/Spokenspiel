import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import {
  clearMsgs,
  setCurrentChatroomId,
  getMessagesFromDB,
  enterGeneralChat,
  removeChatroomfromSight,
  getUsersChatrooms,
  getUnreadCount,
  clearUnreadAndLastUserSent,
  clearChatState,
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
  unreadMsgs,
  getUnreadCount,
  lastUserToSend,
  clearUnreadAndLastUserSent,
  clearChatState,
}) => {
  const [room, setRoomName] = useState("");
  const [isShown, setIsShown] = useState(false);
  const [currentConversation, setCurrentConversation] = useState(null);

  useEffect(() => {
    getUnreadCount(conversation._id);
  }, [conversation._id]);

  const fixer = (conversation) => {
    //This prevents the users from
    setRoomName(conversation);
    getMessagesFromDB(conversation);
    setCurrentChatroomId(conversation);
    setCurrentConversation(conversation);
    // console.log(lastUserToSend);

    if (lastUserToSend !== user._id) {
      //This triggers properly
      clearUnreadAndLastUserSent(conversation);
    }
  };

  const removeConvoRoom = () => {
    removeChatroomfromSight(conversation._id); //Check if anything else needs to be cleared
    clearChatState();
    getUsersChatrooms();
  };

  return (
    <div>
      {conversation.isHidden === false ? (
        <Fragment>
          <div
            className={
              currentChatroomId === conversation._id
                ? "convoContainer convoContainerSelect"
                : "convoContainer"
            }
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
          >
            <div
              className="convoContainer"
              onClick={() => fixer(conversation._id)}
            >
              <div className="columnFlex">
                <p className="convoContainer cursorChg convoNames ">
                  {(user && user.userName) === conversation.user1Name
                    ? conversation.user2Name
                    : conversation.user1Name}
                </p>
                <p className="smallFontsize">
                  {unreadMsgs && lastUserToSend !== user._id
                    ? unreadMsgs + " unread messages"
                    : null}
                </p>
              </div>
            </div>
            <div>
              {" "}
              {isShown ? (
                <i
                  className="fas fa-times closeConversation"
                  onClick={removeConvoRoom}
                ></i>
              ) : null}
            </div>
          </div>
        </Fragment>
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
  getUnreadCount,
  clearUnreadAndLastUserSent,
  clearChatState,
})(ConversationItems);
