import React from "react";
import { connect } from "react-redux";
import Message from "./Message"; //This is to move to Message.js

import { getMessagesFromDB } from "../../../actions/chatroomActions";

const ChatMessages = ({ chatroom: { msgs } }) => {
  return (
    <div>
      {!msgs
        ? null
        : msgs.map((message, i) => (
            <div key={i}>
              <Message message={message} />
            </div>
          ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  chatroom: state.chatroom,
});

export default connect(mapStateToProps, { getMessagesFromDB })(ChatMessages);
