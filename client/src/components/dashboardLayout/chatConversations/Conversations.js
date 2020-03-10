import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ConversationalItems from "./ConversationalItems";
import {getUsersChatrooms} from "../../../actions/chatroomActions";
import { connect } from "react-redux";

const Conversations = ({
  generalChatStatus,
  setGeneralChatStatus,
  chatroom: { chatrooms },
  getUsersChatrooms
}) => {

  const [name, setName] = useState("");
  const [conversation, setConversation] = useState("");

  useEffect(()=>{
    getUsersChatrooms();
    
  },[]);

useEffect(()=>{
  // console.log(chatrooms);
})

  return (
    <div>
      Conversations
      {generalChatStatus ? <h3 className="cursorChg">General Chat</h3> : null}
      {/*TODO CSS class that makes a separate block for discerning different convos  */}
      {chatrooms
        ? chatrooms.map(conversation =>( 
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

export default connect(mapStateToProps, {getUsersChatrooms})(Conversations);
