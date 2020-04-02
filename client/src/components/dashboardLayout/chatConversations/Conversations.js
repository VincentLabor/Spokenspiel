import React, { useEffect, useState } from "react";
import { getMessagesFromDB } from "../../../actions/chatroomActions";
import ConversationalItems from "./ConversationalItems";
import {
  getUsersChatrooms,
  clearMsgs,
  enterGeneralChat
} from "../../../actions/chatroomActions";
import { connect } from "react-redux";

const Conversations = ({
  generalChatStatus,
  chatroom: { chatrooms, currentChatroomId },
  getUsersChatrooms,
  clearMsgs,
  enterGeneralChat,
  getMessagesFromDB
}) => {
  useEffect(() => {
    getUsersChatrooms();
  }, [chatrooms]);

  const enteringGenChat = () => {
    clearMsgs();
    enterGeneralChat();

    getMessagesFromDB(currentChatroomId);

    //here i should change where the messages get posted to?
  };

  return (
    <div>
      Conversations
      <h3 className="cursorChg" onClick={enteringGenChat}>
        General Chat
      </h3>
      {/*TODO CSS class that makes a separate block for discerning different convos  */}
      {chatrooms
        ? chatrooms.map(conversation => (
            <ConversationalItems
              generalChatStatus={generalChatStatus}
              conversation={conversation}
              key={conversation._id}
            />
          ))
        : null}
    </div>
  );
};

const mapStateToProps = state => ({
  chatroom: state.chatroom
});

export default connect(mapStateToProps, {
  getUsersChatrooms,
  clearMsgs,
  enterGeneralChat,
  getMessagesFromDB
})(Conversations);
