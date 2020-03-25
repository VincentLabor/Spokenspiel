import React, { useEffect, useState } from "react";

import ConversationalItems from "./ConversationalItems";
import {
  getUsersChatrooms,
  clearMsgs,
  enterGeneralChat
} from "../../../actions/chatroomActions";
import { connect } from "react-redux";

const Conversations = ({
  generalChatStatus,
  chatroom: { chatrooms,currentChatroomId },
  getUsersChatrooms,
  clearMsgs,
  enterGeneralChat
}) => {

  useEffect(() => {
    getUsersChatrooms();
  }, [chatrooms]);

  const enteringGenChat = () => {
    clearMsgs();
    enterGeneralChat();

    //here i should change where the messages get posted to?
  };

if(!currentChatroomId){
  enterGeneralChat();
}

  return (
    <div>
      Conversations
      {generalChatStatus ? (
        <h3 className="cursorChg" onClick={enteringGenChat}>
          General Chat
        </h3>
      ) : null}
      {/*TODO CSS class that makes a separate block for discerning different convos  */}
      {chatrooms
        ? chatrooms.map(conversation => (
            <ConversationalItems
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
  enterGeneralChat
})(Conversations);
