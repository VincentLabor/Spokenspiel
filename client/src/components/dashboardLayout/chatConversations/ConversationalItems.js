import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import { Link } from "react-router-dom";
import { getChatroomName, clearMsgs } from "../../../actions/chatroomActions";

let socket;

const ConversationItems = ({ conversation, auth: { user }, clearMsgs }) => {
  const endpoint = "localhost:5000";
  const [room, setRoomName] = useState("");
  const [userName, setUsername] = useState("");
  const [chatName, setChatName] = useState("");

  useEffect(() => {
    socket = io(endpoint);
    socket.emit("join", (name, room) => {
      // console.log(room);
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [endpoint]);

  useEffect(() => {
    console.log(room); //On first click, it's already established
  }, [room]);

  const onClick = () => {
    setUsername(user.userName);
    setRoomName(conversation._id);
    getChatroomName(
      user.userName === conversation.user1Name
        ? conversation.user2Name
        : conversation.user1Name
    );
    socket.emit("join room");
      //This should clear the current chatroom
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

export default connect(mapStateToProps, { getChatroomName, clearMsgs })(ConversationItems);
