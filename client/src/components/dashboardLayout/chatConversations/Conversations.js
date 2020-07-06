import React, { useEffect, useState } from "react";
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

  const [active, setActive] = useState();

  return (
    <div className="convoPadding">
      <h2 className="padLeft">Conversations</h2>
      <p className="convoSubHeading padLeft">Current Conversations</p>
      {/* <p className="cursorChg convoSpacing" onClick={selectGeneralChat}>
        General Chat
      </p> */}
      {/*TODO CSS class that makes a separate block for discerning different convos*/}
      {chatrooms
        ? chatrooms.map((conversation, index) => (
            <ConversationalItems
              generalChatStatus={generalChatStatus}
              conversation={conversation}
              key={conversation._id}
              active={conversation === index}
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
