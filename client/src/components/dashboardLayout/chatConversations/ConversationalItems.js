import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import {
  getChatroomName,
  clearMsgs,
  setCurrentChatroomId
} from "../../../actions/chatroomActions";

//Conversation may also refer to the chatrooms from the reducer
const ConversationItems = ({
  conversation,
  auth: { user },
  clearMsgs,
  setCurrentChatroomId
}) => {
  const [room, setRoomName] = useState("");

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
    setRoomName(conversation._id);

    clearMsgs();
  };

  return (
    <div>
      {conversation ? (
        <h3 className="cursorChg convoItem" onClick={onClick}>
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
  setCurrentChatroomId
})(ConversationItems);
