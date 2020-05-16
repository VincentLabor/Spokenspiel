import React, { useEffect, useState } from "react";
import {
  getMessagesFromDB,
  setCurrentChatroomId
} from "../../../actions/chatroomActions";
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
  enterGeneralChat,
  getMessagesFromDB,
}) => {

   useEffect(() => {
     getUsersChatrooms();
   }, [currentChatroomId]); //Will refresh the chatrooms if opens a new chatroom

  //  useEffect(() => {
  //    enterGeneralChat();
  //  }, [currentChatroomId]);
  //Will load the genchat id and will only reload if the other chat ID's are loaded in the state

  //Find a way to load general chat first using useEffect

  const selectGeneralChat = () => {
    // enterGeneralChat();
    getMessagesFromDB(currentChatroomId); //On click, the general Chat should now load properly
    
  };

  return (
    <div>
      <h2>Conversations</h2>
      <p className="cursorChg convoItem" onClick={selectGeneralChat}>
        General Chat
      </p>
      {/*TODO CSS class that makes a separate block for discerning different convos*/}
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
  getMessagesFromDB,
  setCurrentChatroomId
})(Conversations);
