import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import { Link } from "react-router-dom";
import {getChatroomName} from '../../../actions/chatroomActions';

let socket;

const ConversationItems = ({ conversation, auth: { user } }) => {
  const endpoint = "localhost:5000";
  const [room, setRoomName] = useState("");
  const [userName, setUsername] = useState("");
  const [chatName, setChatName] = useState("");

  useEffect(
    () => {
      socket = io(endpoint);
      socket.emit("join", (name, room) => {
        // console.log(room);
      });

      return () => {
        socket.emit("disconnect");
        socket.off();
      };
    },
    [endpoint]
  );

  useEffect(() => {
    // console.log(room); //On first click, it's already established
  }, [room]);

  const onClick = () => {
    setUsername(user.userName);
    setRoomName(conversation._id);
    getChatroomName(user.userName === conversation.user1Name
      ? conversation.user2Name
      : conversation.user1Name)
    if (!room || !userName) {
      console.log("There is an error");
    }
    // console.log(room);
  };

  return (
    <div>
      {conversation ? (
        <h3 className="cursorChg convoItem">
          {(user && user.userName) === conversation.user1Name
            ? conversation.user2Name
            : conversation.user1Name}
        </h3>
      ) : null}
    </div>
  );
};

//
const mapStateToProps = state => ({
  auth: state.auth,
  chatroom: state.chatroom
});

export default connect(mapStateToProps, {getChatroomName})(ConversationItems);
