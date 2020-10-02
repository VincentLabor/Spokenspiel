import React, { useEffect} from "react";
import ConversationalItems from "./ConversationalItems";
import {
  getUsersChatrooms,
  clearMsgs,
  enterGeneralChat,
  getMessagesFromDB,
  setCurrentChatroomId,
} from "../../../actions/chatroomActions";
import { connect } from "react-redux";

const Conversations = ({
  generalChatStatus,
  chatroom: { chatrooms, currentChatroomId },
  getUsersChatrooms,
}) => {
  
  useEffect(() => {
    getUsersChatrooms();
  }, [currentChatroomId]); //Will refresh the chatrooms if opens a new chatroom


  return (
    <div className="convoPadding">
      <h2 className="padLeft appBlue">Conversations</h2>
      <p className="convoSubHeading padLeft">Current Conversations</p>
      {chatrooms
        ? chatrooms.map((conversation, index) => (
            <ConversationalItems
              generalChatStatus={generalChatStatus}
              conversation={conversation}
              unreadMsgs = {conversation.msgCount}
              lastUserToSend = {conversation.lastUserToSendMsg}
              key={conversation._id}

            />
          ))
        : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  chatroom: state.chatroom,
});

export default connect(mapStateToProps, {
  getUsersChatrooms,
  clearMsgs,
  enterGeneralChat,
  getMessagesFromDB,
  setCurrentChatroomId,
})(Conversations);
